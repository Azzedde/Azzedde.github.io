import { ResearchCard } from '../store/useStore';

export const definitionsData: ResearchCard[] = [
  {
    id: 'deductive',
    title: 'Deductive Reasoning',
    category: 'Core Types',
    definition: 'Reasoning from general principles to specific conclusions where the conclusion necessarily follows from the premises if they are true.',
    normsTestsMetrics: {
      targetFunction: 'Compute logical consequence: whether Γ ⊨ φ.',
      formalCriterion: 'Validity: no model makes all premises true and the conclusion false. Soundness: validity + true premises.',
      operationalTest: 'Give mixed sets of valid/invalid arguments (e.g., MP, MT vs AC, DA) with content controls (abstract symbols, believable/unbelievable content). Ask: "Does the conclusion necessarily follow?"',
      quantMetrics: [
        'Validity accuracy (% correct) overall and by form',
        'Belief-bias index: Δ in "valid" rate between believable vs unbelievable content on the same logical form',
        'Counterexample rate: % of invalid items where a correct counterexample is produced',
        'RT scaling: reaction time increases with number of models (predictive check for mental-models)'
      ],
      failureProbes: [
        'Material-implication paradox: endorsing "From ¬p infer (p→q)"',
        'Affirming the consequent / Denying the antecedent accepted as valid',
        'Belief bias: calling invalid-but-believable arguments "valid"'
      ]
    },
    formalization: 'Γ ⊨ φ iff every model of Γ is a model of φ',
    microExample: {
      input: 'All ravens are black. This is a raven.',
      conclusion: 'This is black.'
    },
    failureModes: [
      'Affirming the consequent',
      'Denying the antecedent', 
      'Belief bias (content effects on validity judgments)'
    ],
    humanNotes: [
      'Humans show systematic errors in conditional reasoning',
      'Performance varies with content (abstract vs concrete)',
      'Mental models theory explains many deductive reasoning patterns'
    ],
    references: [
      'Rips (1994)',
      'Johnson-Laird & Byrne (2002)',
      'Evans (2002)'
    ],
    related: ['conditional', 'mental-models']
  },
  
  {
    id: 'bayesian',
    title: 'Bayesian Reasoning',
    category: 'Mind Works',
    definition: 'Probabilistic reasoning that updates beliefs using Bayes\' rule, maintaining coherent degrees of belief under uncertainty.',
    normsTestsMetrics: {
      targetFunction: 'Maintain coherent degrees of belief and update by Bayes/Jeffrey.',
      formalCriterion: 'Coherence (Kolmogorov axioms): e.g., P(A)+P(¬A)=1; additivity; no Dutch book. Bayes\' rule for certain E: P(H|E)=P(E|H)P(H)/P(E). Jeffrey update when E is uncertain.',
      operationalTest: 'Elicit P(H), P(E|H), P(E|¬H), then ask for P(H|E) and check against Bayes. Or elicit bets and test Dutch-book exposure.',
      quantMetrics: [
        'Log loss or Brier score for posterior predictions',
        'Calibration: ECE (expected calibration error), reliability curve slope',
        'Coherence violations: sum of absolute additivity errors; Dutch-book margin',
        'Equation check for conditionals: regression of P(if p then q) on P(q|p) (slope≈1, intercept≈0)'
      ],
      failureProbes: [
        'Base-rate neglect (posterior ≈ likelihood)',
        'Sensitivity/posterior confusion in medical test vignettes',
        'Double counting correlated evidence'
      ]
    },
    formalization: 'P(H|E) = P(E|H)P(H)/P(E), with coherence constraints (Dutch book immunity)',
    microExample: {
      input: 'Prior P(disease)=0.01, test sensitivity=0.9, specificity=0.95, positive result',
      conclusion: 'P(disease|+) = 0.154'
    },
    failureModes: [
      'Base rate neglect',
      'Confusion of P(A|B) with P(B|A)',
      'Conjunction fallacy'
    ],
    humanNotes: [
      'Humans systematically deviate from Bayesian updating',
      'Natural frequencies improve performance over probabilities',
      'Expertise and training can improve Bayesian reasoning'
    ],
    references: [
      'Tversky & Kahneman (1974)',
      'Gigerenzer & Hoffrage (1995)',
      'Griffiths & Tenenbaum (2006)'
    ],
    related: ['inductive', 'practical', 'data-selection']
  },

  {
    id: 'conditional',
    title: 'Conditional Reasoning',
    category: 'Practice',
    definition: 'Reasoning with "if-then" statements, involving interpretation of conditionals and evaluation of conditional arguments.',
    normsTestsMetrics: {
      targetFunction: 'Interpret/assess conditionals as constraints on beliefs: typically P(if p then q)=P(q|p) (the Equation) or as possibility sets (mental models).',
      formalCriterion: 'Equation: P(if p then q)=P(q|p). Nonmonotonicity: P(q|p∧r) can decrease (no "strengthening the antecedent"). Relevance: ΔP = P(q|p) - P(q|¬p) should modulate endorsement.',
      operationalTest: 'Elicit P(p), P(q), P(q|p), P(q|¬p) and the judged P(if p then q). Present suppression setups (add an explicit alternative cause) and explaining-away v-structures.',
      quantMetrics: [
        'Equation fit: R² and slope/intercept in P(if p then q) ~ P(q|p)',
        'Suppression effect size: drop in AC endorsement when an alternative cause is introduced',
        'Relevance sensitivity: correlation with ΔP'
      ],
      failureProbes: [
        'Strengthening antecedent endorsed (treating if as material)',
        'Ignorance of alternative causes (no suppression)',
        'Paradoxes: endorsing from ¬p ⇒ (p→q)'
      ]
    },
    formalization: 'P(if p then q) = P(q|p) (Equation); defeasible: additional info can defeat conditional',
    microExample: {
      input: 'If it rains, then the picnic will be cancelled',
      conclusion: 'Rain → cancellation (unless indoor backup available)'
    },
    failureModes: [
      'Affirming the consequent',
      'Ignoring alternative antecedents',
      'Treating conditionals as biconditionals'
    ],
    humanNotes: [
      'Suppression effects show sensitivity to alternatives',
      'Content and context strongly influence conditional reasoning',
      'Pragmatic factors affect conditional interpretation'
    ],
    references: [
      'Byrne (1989)',
      'Evans & Over (2004)',
      'Oaksford & Chater (2007)'
    ],
    related: ['deductive', 'causal']
  },

  {
    id: 'causal',
    title: 'Causal Reasoning',
    category: 'Practice',
    definition: 'Reasoning about cause-effect relationships, including causal discovery, prediction under intervention, and counterfactual reasoning.',
    normsTestsMetrics: {
      targetFunction: 'Recover/use a causal model that predicts interventions P(Y|do(X)), dependencies (e.g., explaining-away), and counterfactuals.',
      formalCriterion: 'Contingency: ΔP = P(e|c) - P(e|¬c). Causal power (Cheng): W=(P(e|c)-P(e|¬c))/(1-P(e|¬c)). Causal Bayes net fit: maximize data likelihood under a graph with noisy-OR/AND. Interventional semantics: predictions under do(·) match observed/manipulated data.',
      operationalTest: 'Provide contingency tables or trials for causal structures: chain, fork, collider (v-structure). Test: Explaining-away: in a v-structure, observing one cause reduces belief in the other given the effect. Suppression: adding an explicit alternative cause reduces AC endorsements. Intervention checks: compare P(Y|X) vs P(Y|do(X)) judgments.',
      quantMetrics: [
        'Model likelihood / BIC of a specified causal graph vs alternatives',
        'Parameter estimates (ΔP, W) with CIs; sign and magnitude vs ground truth',
        'Explaining-away effect size: P(C₁|E) - P(C₁|E, C₂)',
        'Intervention gap: |P(Y|do(X)) - P(Y|X)| when confounding exists (should be nonzero)',
        'Counterfactual accuracy on "if X had not occurred, would Y still have?" items'
      ],
      failureProbes: [
        'Treating correlation as causation (no intervention gap)',
        'Missing explaining-away in colliders',
        'Ignoring background causes (inflated W)'
      ]
    },
    formalization: 'Causal models: P(Y|do(X)) ≠ P(Y|X) when confounded; counterfactuals via closest possible worlds. **Causal fit** is how well a proposed causal model (graph + parameters) accounts for observed contingencies and interventional/conditional data. Quantitatively, it\'s assessed by (i) effect size indices like **ΔP** and **causal power** W, (ii) **likelihood/BIC** of the data under a **causal Bayes net**, (iii) reproducing **explaining-away** and **suppression** patterns, and (iv) correct **do-operator** predictions. High causal fit = parameters with the right sign/magnitude, better likelihood than rival graphs, correct qualitative effects (e.g., P(C₁|E) > P(C₁|E,C₂)).',
    microExample: {
      input: 'Fertilizer applied to 100 plants: 70% grew well. No fertilizer: 20% grew well.',
      conclusion: 'ΔP = 0.5, W = 0.625 → strong causal relationship'
    },
    failureModes: [
      'Correlation-causation confusion',
      'Ignoring confounding variables',
      'Base rate neglect in causal attribution'
    ],
    humanNotes: [
      'Humans readily infer causation from correlation',
      'Temporal order strongly influences causal judgments',
      'Mechanism knowledge affects causal reasoning'
    ],
    references: [
      'Cheng (1997)',
      'Sloman (2005)',
      'Waldmann (2017)'
    ],
    related: ['abductive', 'conditional', 'bayesian']
  },

  {
    id: 'argumentation',
    title: 'Argumentation',
    category: 'Practice',
    definition: 'Reasoning in dialogical contexts involving the exchange of reasons, evidence evaluation, and belief revision through social interaction.',
    normsTestsMetrics: {
      targetFunction: 'Update belief in a claim given evidence + source reliability + costs/benefits.',
      formalCriterion: 'Likelihood ratio (argument force): Λ = P(a|C)/P(a|¬C). Source reliability integration: mix likelihoods by P(R) (caps argument force). Coherence with priors: posterior P(C|a) follows Bayes.',
      operationalTest: 'Present third-person dialogues (Mary vs John), specify prior, test properties (sensitivity/specificity), and source reliability. Ask: "What should Mary\'s posterior be?"',
      quantMetrics: [
        'Ordering fidelity: higher Λ ⇒ higher endorsed posterior (monotonicity)',
        'Reliability sensitivity: posterior attenuates with lower P(R)',
        'Ignorance asymmetry: "no evidence of X" weaker than "evidence of ¬X" when tests are weak'
      ],
      failureProbes: [
        'Treating all ignorance arguments as equally weak/strong regardless of test power',
        'Over- or under-weighting source reliability (ad hominem too weak/too strong)'
      ]
    },
    formalization: 'Argument strength ∝ P(evidence|claim)/P(evidence|¬claim) × source reliability',
    microExample: {
      input: 'Expert testimony: "Climate change is anthropogenic" with 97% scientific consensus',
      conclusion: 'High credence in anthropogenic climate change'
    },
    failureModes: [
      'Ad hominem reasoning (over/under-weighting source)',
      'Confirmation bias in evidence evaluation',
      'Motivated reasoning'
    ],
    humanNotes: [
      'Source credibility strongly affects argument evaluation',
      'Prior beliefs influence evidence interpretation',
      'Social and political factors can override logical considerations'
    ],
    references: [
      'Mercier & Sperber (2011)',
      'Corner et al. (2015)',
      'Hahn & Oaksford (2007)'
    ],
    related: ['bayesian', 'practical']
  },

  {
    id: 'practical',
    title: 'Practical Reasoning',
    category: 'Core Types',
    definition: 'Reasoning about what to do; deliberation that leads from beliefs and desires to intentions and actions.',
    normsTestsMetrics: {
      targetFunction: 'Choose an intention/action that best satisfies goals under uncertainty/constraints.',
      formalCriterion: 'Expected utility (when representable): choose a*=argmax_a Σ_s P(s|a)U(s). Reasons-responsiveness: choices shift appropriately when relevant reasons/properties change. Preference axioms (transitivity, dominance).',
      operationalTest: 'State explicit utilities, probabilities, constraints; elicit choice + confidence; perturb one element (e.g., risk, cost) and test for systematic shifts.',
      quantMetrics: [
        'EU-consistency: % choices matching EU given stated P,U',
        'Dominance violations: rate of choosing dominated options',
        'Stability/Responsiveness: choice flips in the normative direction when a single parameter crosses indifference'
      ],
      failureProbes: [
        'Dynamic inconsistency; money-pump patterns; framing reversals under normatively irrelevant reframings'
      ]
    },
    formalization: 'argmax_a Σ_s P(s|a)U(s), subject to constraints and bounded rationality',
    microExample: {
      input: 'I want coffee, the café is 10min away, I have 15min before my meeting',
      conclusion: 'I should go get coffee now'
    },
    failureModes: [
      'Temporal discounting inconsistencies',
      'Framing effects on identical decisions',
      'Sunk cost fallacy'
    ],
    humanNotes: [
      'Humans show systematic deviations from expected utility',
      'Emotions play important roles in practical reasoning',
      'Social and moral considerations complicate utility calculations'
    ],
    references: [
      'Kahneman & Tversky (1979)',
      'Bratman (1987)',
      'Gigerenzer & Todd (1999)'
    ],
    related: ['bayesian', 'argumentation']
  },

  {
    id: 'mental-models',
    title: 'Mental Models',
    category: 'Mind Works',
    definition: 'Cognitive representations of possibilities that support reasoning by constructing, inspecting, and manipulating models of situations.',
    normsTestsMetrics: {
      targetFunction: 'Represent the set of possibilities consistent with premises (principle of truth) and test conclusions across models.',
      formalCriterion: 'Counterexample test: conclusion invalid if any model makes premises true & conclusion false. Difficulty law: more models ⇒ more time/errors.',
      operationalTest: 'Tasks varying number of models (exclusive-or vs inclusive-or; multiple conditionals). Ask for validity; collect counterexamples & RTs.',
      quantMetrics: [
        'Model-count × RT correlation (positive)',
        'Illusion signature: predictable error patterns where omitted falsities matter; reduction when falsities are made explicit'
      ],
      failureProbes: [
        'Illusory inferences (e.g., "only one of these is true…" traps)',
        'Over-reliance on a single "true-only" model when falsity is needed'
      ]
    },
    formalization: 'Model = set of possibilities; reasoning by model construction/inspection; difficulty ∝ number of models',
    microExample: {
      input: 'Either there is a king or an ace in the hand, but not both',
      conclusion: 'Three models: [King, ¬Ace], [¬King, Ace], [¬King, ¬Ace]'
    },
    failureModes: [
      'Illusory inferences from incomplete models',
      'Failure to consider alternative models',
      'Working memory limitations with multiple models'
    ],
    humanNotes: [
      'Model complexity predicts reasoning difficulty',
      'Spatial and temporal reasoning rely heavily on mental models',
      'Individual differences in spatial working memory affect model-based reasoning'
    ],
    references: [
      'Johnson-Laird (2006)',
      'Khemlani & Johnson-Laird (2017)',
      'Byrne & Johnson-Laird (2009)'
    ],
    related: ['deductive', 'conditional']
  },

  {
    id: 'type1-type2',
    title: 'Type 1 vs Type 2 Processing',
    category: 'Mind Works',
    definition: 'Dual-process distinction between fast, automatic, intuitive processing (Type 1) and slow, controlled, reflective processing (Type 2).',
    normsTestsMetrics: {
      targetFunction: 'Coordinate fast intuitive and slow reflective processing systems for optimal performance.',
      formalCriterion: 'Type 1: fast, parallel, automatic; Type 2: slow, serial, controlled. Conflict detection triggers Type 2. Optimal engagement based on task demands and cognitive resources.',
      operationalTest: 'Present tasks with intuitive but incorrect answers (e.g., CRT items, base-rate problems). Measure response times, confidence, and accuracy under time pressure vs unlimited time.',
      quantMetrics: [
        'Cognitive Reflection Test (CRT) scores',
        'Dual-process consistency: correlation between intuitive and reflective responses',
        'Conflict detection sensitivity: RT increases when Type 1 and Type 2 disagree',
        'Metacognitive accuracy: confidence calibration for Type 1 vs Type 2 responses'
      ],
      failureProbes: [
        'Cognitive miserliness: defaulting to Type 1 when Type 2 needed',
        'Overthinking: engaging Type 2 when Type 1 sufficient',
        'Failure to detect Type 1/Type 2 conflicts'
      ]
    },
    formalization: 'Type 1: fast, parallel, automatic; Type 2: slow, serial, controlled. Conflict detection triggers Type 2.',
    microExample: {
      input: 'A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?',
      conclusion: 'Type 1: 10¢ (wrong), Type 2: 5¢ (correct)'
    },
    failureModes: [
      'Over-reliance on Type 1 when Type 2 needed',
      'Cognitive miserliness',
      'Failure to detect Type 1/Type 2 conflicts'
    ],
    humanNotes: [
      'Individual differences in cognitive reflection',
      'Working memory capacity affects Type 2 engagement',
      'Time pressure and cognitive load favor Type 1'
    ],
    references: [
      'Kahneman (2011)',
      'Evans & Stanovich (2013)',
      'Frederick (2005)'
    ],
    related: ['mental-models', 'practical']
  },

  {
    id: 'inductive',
    title: 'Inductive Reasoning',
    category: 'Core Types', 
    definition: 'Reasoning from specific observations to general conclusions, where conclusions are probable but not certain given the premises.',
    normsTestsMetrics: {
      targetFunction: 'Generalize from observed instances to broader patterns or future cases with appropriate confidence.',
      formalCriterion: 'Inductive strength: P(conclusion|premises) > P(conclusion). Strength increases with sample size, representativeness, and diversity. Calibration: confidence matches accuracy.',
      operationalTest: 'Present samples of varying size and representativeness. Ask for generalizations and confidence ratings. Test with category-based induction tasks and property projection.',
      quantMetrics: [
        'Calibration curves: confidence vs accuracy across different sample sizes',
        'Sample size sensitivity: appropriate increase in confidence with larger samples',
        'Diversity effect: stronger induction from diverse vs homogeneous samples',
        'Similarity-based projection: stronger induction to similar categories'
      ],
      failureProbes: [
        'Base rate neglect in favor of representativeness',
        'Insensitivity to sample size (small sample fallacy)',
        'Confirmation bias in evidence selection'
      ]
    },
    formalization: 'P(conclusion|premises) > P(conclusion) and strength ∝ sample size, representativeness',
    microExample: {
      input: '95% of observed swans are white',
      conclusion: 'The next swan will likely be white'
    },
    failureModes: [
      'Base rate neglect',
      'Representativeness heuristic overuse',
      'Confirmation bias in evidence selection'
    ],
    humanNotes: [
      'Humans often ignore base rates in favor of representativeness',
      'Sample size effects are often underweighted',
      'Category-based induction shows similarity effects'
    ],
    references: [
      'Tversky & Kahneman (1974)',
      'Osherson et al. (1990)',
      'Sloman (1993)'
    ],
    related: ['bayesian', 'practical']
  }
];