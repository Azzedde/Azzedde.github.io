---
layout: single
title: "Write-up: How we won the Hardcore AI Hackathon in Berlin"
date: 2025-06-09 21:42:59 +0200
categories: technical
excerpt: >
  A deep dive into our winning approach for the "Bit by Bit" challenge at the Hardcore AI Hackathon in Berlin, where we optimized neural network inference using hash-based matrix approximations and analog in-memory computing techniques.
---

When my team first encountered the "Bit by Bit: Hashing Towards Energy-Efficient AI Inference" challenge at the Hardcore AI Hackathon in Berlin, something electric struck between us. This wasn't just another typical hackathon challenge involving API integrations or web applications - this was hardcore AI research with real-world implications that could fundamentally change how we deploy large language models at scale.

<img src="/assets/images/hackathon4-1.jpg" alt="Celebrating our victory at the Hardcore AI Hackathon"> 

The challenge addressed one of the most pressing issues in modern AI: the energy and latency bottleneck in neural network inference. As deep neural networks, especially large language models, continue to expand at unprecedented rates, the principal cost driver has shifted from arithmetic throughput to the energy and latency associated with transferring parameters and activations between processing elements and external memory. The conventional digital trajectory was becoming unsustainable.

The solution proposed was **Analog In-Memory Computing (AIMC)**, which integrates multiply-accumulate (MAC) operations directly within dense memory arrays, minimizing data movement and yielding substantial reductions in both energy consumption and inference latency. However, AIMC introduces a critical constraint: each analog dot-product voltage must be quantized, and the column-parallel analog-to-digital converters (ADCs) often dictate overall power, silicon area, and latency costs.

The genius of this challenge lay in its approach to circumvent the high-resolution ADC bottleneck. Instead of requiring expensive multi-bit ADCs, the challenge proposed using **1-bit ADCs** that produce binary vectors for entire matrix-vector multiplications. The final output would then be reconstructed digitally via an approximate geometric dot product, implemented as a Hamming-distance calculation against pre-encoded weight patterns - a technique rooted in **locality-sensitive hashing (LSH)**.
<img src="/assets/images/hackathon4-2.jpg" alt="Celebrating our victory at the Hardcore AI Hackathon"> 

We spent almost half a day just trying to deeply understand the provided papers, diving into the AIMC technique and the mathematical foundations of the matrix approximation optimization. This learning process itself was incredibly valuable - it reminded us that AI research extends far beyond just using existing LLMs. The challenge represented pure AI and data science techniques applied to solve fundamental computational problems, which was exactly the kind of work that motivated us to pursue more research-oriented challenges.

The organizers at SEMRON had prepared an excellent infrastructure for us, with beautiful scripts for training, evaluation, and submission. However, we made a critical mistake initially: we didn't focus enough on understanding the evaluation metrics and scoring system. It was only after we tried our best approaches and found ourselves stagnating on the leaderboard after the first day that we pivoted to focus 100% on understanding and optimizing for the evaluation criteria.
<img src="/assets/images/hackathon4-3.jpg" alt="Celebrating our victory at the Hardcore AI Hackathon"> 
## Understanding the Scoring System

The scoring function was elegantly designed and surprisingly intuitive once we dissected it:

```python
def _score(
    acc_drop: float,
    hdops: float,
    flops: float,
    *,
    delta: float = 0.125,
    gamma: float = 0.85,
) -> float:
    """
    Parameters
    ----------
    acc_drop : float   Accuracy drop of the compressed model.
    hdops    : float   Hashed-OPs (summed).
    flops    : float   Reference FLOPs (summed).
    delta    : float   Allowed accuracy drop (hyperparameter).
    gamma    : float   Controls how sharply the energy term penalises imbalance.
    """
    A = max(0.0, 1.0 - acc_drop / delta)

    if hdops == 0 or flops == 0:
        return 0.0

    if hdops < flops:
        raise ValueError("hdops must be greater than or equal to flops")

    ratio = flops / hdops
    r_balanced = ratio if ratio <= 1 else 1 / ratio
    r_pow = r_balanced**gamma
    E = 2.0 * r_pow / (1.0 + r_pow)

    return (2 * A * E) / (A + E) if (A + E) > 0 else 0.0
```

The scoring system brilliantly balances two competing objectives:

1. **Accuracy Preservation (A)**: This term penalizes accuracy drops beyond the allowed threshold (`delta = 0.125`). If your model's accuracy drops by more than 12.5%, this component rapidly approaches zero, making your solution unviable.

2. **Energy Efficiency (E)**: This term measures the computational efficiency by comparing hashed operations (hdops) to standard floating-point operations (flops). The key insight here is that longer hash lengths generally provide better approximations but require more hashed operations.

The final score uses a harmonic mean-like combination of these terms, ensuring that both accuracy and efficiency must be optimized simultaneously. You cannot simply sacrifice accuracy for efficiency or vice versa.

This scoring mechanism revealed a crucial strategic insight: to win the challenge, you could play with the hash length parameter (longer hashes generally provide better approximations but increase computational cost) while carefully managing the accuracy drop. The sweet spot lay in finding hash configurations that maximized this delicate balance.

<img src="/assets/images/hackathon4-4.jpg" alt="Celebrating our victory at the Hardcore AI Hackathon"> 

## Our Winning Architecture

After extensive empirical studies and iterations, we converged on an architecture that strategically varied hash lengths across different layers of the ResNet-20 network. Our configuration wasn't uniform - we recognized that different layers in the network have varying sensitivity to approximation errors and different computational characteristics.

Here's our final architecture configuration for CIFAR-10:

```python
submission_config_cifar10 = {
    # Initial conv layer: smaller hash length for stability
    "conv1": {
        "hash_kernel_type": "learned_projection",
        "input_tile_size": 256,
        "output_tile_size": 256,
        "hash_length": 256,
    },
    
    # Layer 1: maintain smaller hash lengths for early feature extraction
    "layer1.0.conv1": {"hash_length": 256, ...},
    "layer1.0.conv2": {"hash_length": 256, ...},
    
    # Layer 2: increase hash length as features become more abstract
    "layer2.0.conv1": {"hash_length": 512, ...},
    "layer2.0.conv2": {"hash_length": 512, ...},
    
    # Layer 3: maximum hash length for most complex features
    "layer3.0.conv1": {"hash_length": 1024, ...},
    "layer3.0.conv2": {"hash_length": 1024, ...},
    
    # Final FC layer: reduced hash length for classification
    "fc": {"hash_length": 256, ...},
}
```

This progressive hash length strategy reflected our understanding that early layers typically learn low-level features that are more sensitive to approximation errors, while deeper layers learn more abstract representations that can tolerate higher levels of approximation in exchange for better computational efficiency.

<img src="/assets/images/hackathon4-5.jpg" alt="Celebrating our victory at the Hardcore AI Hackathon"> 

## The Core Hash Kernel Implementation

At the heart of our solution was the `_HashKernel` base class, which elegantly abstracted the hash-based matrix multiplication concept:

```python
class _HashKernel(nn.Module, ABC):
    def forward(self, x: torch.Tensor, weights: torch.Tensor) -> torch.Tensor:
        current_eps = torch.finfo(x.dtype).eps if x.dtype.is_floating_point else EPS
        
        # Normalize inputs and weights to unit vectors
        x_norms = x.norm(dim=-1, keepdim=True) + current_eps
        x_unit = x / x_norms
        
        w_norms = weights.norm(dim=-1, keepdim=True) + current_eps
        w_unit = weights / w_norms
        
        # Compute hash codes for both inputs and weights
        codes_x = self._compute_codes_internal(x_unit)
        codes_w_prime = self._compute_codes_internal(w_unit)
        codes_w_matmuled = codes_w_prime.transpose(-2, -1)
        
        # Estimate cosine similarity through hash codes
        cos_est = self._estimate_cosine_internal(codes_x, codes_w_matmuled)
        
        # Reconstruct the final result by scaling back with norms
        return (x_norms * w_norms.transpose(-2, -1)) * cos_est
```

This implementation is mathematically beautiful in its simplicity. The key insight is that matrix multiplication can be decomposed into: (1) computing the cosine similarity between normalized vectors, and (2) scaling by the magnitudes. The hash-based approximation focuses on step 1, using locality-sensitive hashing to efficiently estimate cosine similarities without expensive dot products.

The normalization step is crucial - it ensures that the hash functions operate on unit vectors, which is a requirement for the LSH theory to hold. The epsilon term prevents division by zero and maintains numerical stability.

## Learned Projections with Straight-Through Estimation

Our winning approach used `LearnedProjKernel`, which optimizes the projection matrix end-to-end during training. This was far more effective than using fixed random projections because it could adapt the hash functions to the specific data distribution and task requirements.

```python
class LearnedProjKernel(_HashKernel):
    def __init__(self, in_features: int, out_features: int, hash_length: int, **kwargs):
        super().__init__(in_features, out_features, hash_length)
        initial_proj_mat = torch.randn(hash_length, self.in_features)
        self._learnable_projection_matrix = nn.Parameter(initial_proj_mat)
    
    def _compute_codes_internal(self, unit_vectors: torch.Tensor) -> torch.Tensor:
        proj = self.projection_matrix
        z = torch.matmul(unit_vectors, proj.t())
        codes = torch.sign(z)
        
        # Straight-Through Estimator: forward uses binary codes, backward uses continuous z
        return codes.detach() + (z - z.detach())
```

The Straight-Through Estimator (STE) was essential for making this approach trainable. The sign function is non-differentiable, which would normally prevent gradient-based optimization. The STE cleverly bypasses this by using the binary codes in the forward pass (for the hash-based computation) while using the continuous pre-sign values for gradient computation in the backward pass.

This technique effectively tells the optimizer: "pretend the sign function is the identity function when computing gradients, but use the actual binary values for the forward computation." While this is mathematically approximate, it works remarkably well in practice and has become a standard technique in neural network binarization.

<img src="/assets/images/hackathon4-6.jpg" alt="Celebrating our victory at the Hardcore AI Hackathon"> 

## Training Strategy and Optimization

Our training approach evolved significantly as we better understood the challenge dynamics. We discovered that the more we trained the actual model (not just the projection matrices), the better results we achieved. Our best models required approximately 6 hours of intensive training.

We implemented a sophisticated training loop that evaluated and calculated the submission score at the end of each epoch, automatically saving the best-performing models. This allowed us to track our progress against the actual competition metric rather than just training loss or accuracy.

The training process involved several key optimizations:

1. **Dual Learning Rates**: We used different learning rates for the backbone network weights versus the projection matrices, recognizing that these components had different optimization dynamics.

2. **Progressive Hash Length Strategy**: Our layer-wise hash length configuration required careful tuning to balance approximation quality with computational efficiency.

3. **Aggressive Data Augmentation**: Strong augmentations helped the model generalize better despite the approximation errors introduced by the hash-based computations.

4. **Label Smoothing**: This regularization technique proved particularly valuable when working with approximate matrix operations.

The key insight that emerged from our training experiments was that the hash-based approximations were learnable - the network could adapt to compensate for the approximation errors, and the learned projection matrices could optimize themselves to minimize the impact of quantization on the final task performance.

At the end of the day, this hackathon reminded me that Europe is huge, and European countries are genuinely pushing hard in the AI race. What's refreshing is that LLMs aren't everything - though ironically, without electricity, nothing works anyway (yes, everything runs on electricity, groundbreaking stuff).
I learned to work optimally in parallel with my teammates, and met incredible people along the way. Huge thanks to Alexander Lowa and Tilmann Bartsch from SEMRON for guiding us through the challenge, Knarik Avanesyan for helping us maximize our compute resources (shoutout to dstack and Runpod - we really burned through those GPUs), and all the amazing people we connected with: Gustaw Malinowski (his energy was infectious), Luan Wei and her brilliant team, Bernadetta Nycz (winner and super-talented designer), Reza Hedeshi (golden VC advice), Roland Graser (great Berlin tech chats), Ali Alouane and Mohamed Islem Ayari, Leonardo J. and Benjamin Wolba and Bela Wiertz for the flawless organization.



