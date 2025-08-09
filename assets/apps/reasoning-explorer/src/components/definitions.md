alright — here’s the mega-compendium you asked for: a single, exhaustive, human-only **definitions deck** that consolidates every distinct way “reasoning” was defined or carved up in the sources we covered. it’s long on purpose, and it sticks to definitions (with brief clarifiers where needed).

# master integrative definition (all-purpose)

**Human reasoning** is the family of cognitive processes by which people **form, revise, and justify** beliefs, intentions, and actions by **drawing consequences** from information they already accept (perception, memory, testimony, data) **together with** background knowledge, goals, and norms. It (i) constructs new representations from given ones, (ii) **updates degrees of belief** (and sometimes retracts them), (iii) **tests** conclusions by counterexample search or probabilistic calibration, and (iv) is often conducted **socially** through argument, where audience, source reliability, and utilities matter. Reasoning is **defeasible** (open to retraction), **context-sensitive**, and can aim at **logical necessity** (deduction), **evidential support** (induction), **best explanation** (abduction), or **effective action** (practical reasoning).

---

# definitions by normative target (what “good” means)

## deductive reasoning

Reasoning in which a conclusion is licensed **by necessity** from premises: in **every** interpretation where the premises are true, the conclusion is true. **Standard:** *validity* (form-based) and *soundness* (valid + true premises).
• Practical gloss: decides **what must follow** if the premises hold.
• Human wrinkle: people also apply content and world knowledge when judging “valid.”

## inductive reasoning

Reasoning in which a conclusion is licensed by **degree of support** from premises—**probable** but not guaranteed. **Standards:** *inductive strength* (how much support) and *calibration* (match between confidence and truth frequency).
• Practical gloss: **project** from known cases/data to new cases or generalizations.

## abductive reasoning (inference to the best explanation)

Reasoning that selects a **hypothesis that, if true, would best explain** the data. **Standards:** *explanatory virtues* (simplicity/parsimony, coherence/integration, breadth/coverage, mechanistic adequacy) balanced against prior plausibility.
• Practical gloss: **hypothesis choice** guided by explanation quality.

## probabilistic/Bayesian reasoning

Reasoning that represents beliefs as **degrees of belief** (probabilities) and **updates** them by Bayes’ rule (for certain evidence) or **Jeffrey conditionalization** (for uncertain evidence).
• Core equation for conditionals: **Pr(if p then q) = Pr(q | p)** (the “Equation”).
• Standards: *coherence* (obey probability axioms), *posterior rationality* (correct update), *information gain* (useful data selection).

## practical (instrumental) reasoning

Reasoning that arrives at **an intention or action** by weighing means against ends, expected outcomes, constraints, and risks.
• Standards: *instrumental rationality* (effectively achieves goals), *expected utility* (if formalized), *reasons-responsiveness* (sensitivity to relevant reasons).
• Note: practical reasoning can **conclude in action**, not just in a belief about what action maximizes utility.

## desiderative reasoning

Reasoning about **what to value or want** (e.g., adopting/adjusting aims).
• Standards: *coherence among values*, *reflective endorsement*, reasons-responsiveness (are putative reasons for valuing actually good reasons?).

---

# definitions by representational format (what’s being computed over)

## rule-based (mental-logic) reasoning

Reasoning by applying **abstract inference rules** (e.g., modus ponens) to symbolic representations with variables that can be **bound** to case content.
• Signature: variable binding, form sensitivity, stepwise derivations.
• Diagnostic criteria for genuine rule use: performance with **abstract/unfamiliar** content, **priming** of rules, **overextension** to exceptions early in learning, **domain-independent transfer**, etc.

## mental-models (possibilistic) reasoning

Reasoning by constructing **iconic models of possible situations** consistent with the premises and knowledge, following the **principle of truth** (represent what is true in each possibility; often omit falsities). Conclusions hold if they hold in **all** models; violation found by **counterexample search** (a model where premises hold but conclusion fails).
• Difficulty metric: **number of models** required.
• Strength: explains **nonmonotonicity** (adding information removes models) and classic “illusory” inferences when omitted falsities matter.

## similarity/exemplar-based reasoning

Reasoning by **retrieving and comparing cases**; conclusions track **similarity** and feature overlap (often weighted by context) rather than explicit rules.
• Frequent in categorization, property induction, and quick judgments.

## causal-model reasoning

Reasoning over **causal Bayes nets** (variables with directed edges), combining **causal power** estimates and **graph structure** to predict interventions, explaining-away, and suppression effects in conditionals.
• Standard: causal coherence with data and background knowledge.

---

# definitions by dynamics (how beliefs change)

## belief revision (coherence-based)

Reasoning as **revising** a set of beliefs to improve **overall coherence** (especially *explanatory* coherence) while honoring **conservatism** (minimize change) and resource limits.
• Rules are **defeasible**: even from p and (p→q) you might **withhold q** if it worsens coherence or you retract a premise.
• Avoiding inconsistency is a **pro tanto** (defeasible) norm, not absolute.

## nonmonotonic reasoning

Reasoning where adding premises can **defeat** prior conclusions (e.g., “birds fly” vs. “penguins are birds”).
• Standard: *defeasible warrant*; conclusions are **default** and **withdrawable**.

## dynamic (non-invariant) updating

Reasoning where new information changes not only a marginal probability (e.g., Pr(p)) but also a **conditional** (Pr(q|p)).
• Formal repair: choose the **closest** revised distribution to the prior (e.g., minimize **Kullback–Leibler** distance) subject to the new constraints.

---

# definitions by architecture (how it’s implemented in minds)

## dual-process/systems definition

Reasoning arises from two interacting processes:
**Type 1 / associative** — fast, automatic, similarity/contiguity-driven, parallel constraint satisfaction; produces **intuitions**.
**Type 2 / rule-based** — slower, controlled, symbolically structured, serial/strategic; produces **justified analyses**.
• Conflict is common; Type 2 can **override** Type 1, but intuitive pull often persists.

## hybrid (rules + instances) definition

Reasoning is a **cooperative/competitive** mix: retrieved **instances** can access abstract **rules** (and vice-versa); outcomes depend on salience, task demands, and practice.

---

# definitions by social function (what reasoning is for in groups)

## argumentation (reasoning as persuasion and coordination)

Reasoning as **presenting, evaluating, and revising** claims in dialogue to resolve disagreement, reduce ignorance, and coordinate action.
• Standards (Bayesian/pragmatic): **priors**, **likelihoods**, **source reliability**, **cost–benefit utilities**, and **audience goals**.
• “Fallacies” (ignorance, ad hominem, slippery slope, circularity) can be **rational** depending on test reliability, source credibility, categorical flexibility, and explanatory structure.

## reasons-responsiveness

Reasoning as the capacity to **recognize, weigh, and act for reasons as reasons**, not merely to compute.
• Standard: sensitivity to the **right** reasons in context (epistemic, practical, moral).

---

# task/genre-level definitions (what counts as reasoning in specific domains)

## conditional reasoning (everyday “if…then”)

Reasoning about if-sentences interpreted (often) via **conditional probability** (Pr(if p then q)=Pr(q|p)) or via **possibility constraints** (mental models).
• Nonmonotonicity: **strengthening the antecedent** need not preserve truth for real-world conditionals.
• Utility/deontic versions (promises, threats, warnings, permissions/obligations) guide action by linking **goals** and **norms** to conditionals.

## quantified/syllogistic reasoning

Reasoning with **quantifiers** (all, some, none, most, few).
• Probabilistic semantics: quantifiers map to **conditional probabilities**; conclusions predicted by **dependency graphs** and **min/max heuristics** (least informative premise sets quantifier; confidence by most informative premise).
• Prototype sampling models: build a **probabilistic prototype**, **sample** a small set (≈ working-memory capacity), then test candidate conclusions against the sample.

## property induction

Reasoning that generalizes a **property** from one or more categories to others.
• Standards: **similarity/typicality**, **diversity of premises**, **mechanism plausibility**, and **background theories**.

## data-selection (hypothesis testing)

Reasoning that chooses which data to gather to learn most efficiently.
• Standard: **expected information gain** (not mere falsification); choices depend on priors, base rates, and utilities.

## explanatory evaluation

Reasoning that **ranks explanations** for observed data.
• Standards: **simplicity**, **integration/coherence**, **coverage**, **mechanism**, **narrow latent scope** (don’t over-explain unobserved facts), all tempered by prior plausibility.

---

# micro-definitions of core normative/computational notions

* **Validity (logical):** impossibility of true premises with false conclusion (form-based).
* **Soundness:** valid argument with true premises.
* **Inductive strength:** degree to which premises raise probability of conclusion.
* **Coherence (probability):** conformity to probability axioms and constraints; **coherence interval** = range of permissible conclusion probabilities implied by uncertain premises.
* **p-validity:** probabilistic analogue of validity—conclusion’s **uncertainty** cannot coherently exceed sum of premise uncertainties.
* **Bayesian conditionalization:** update Pr(H) to Pr(H|E) when **E is certain**.
* **Jeffrey conditionalization:** update Pr(H) when evidence E is **uncertain** (update Pr(E) and mix conditionals).
* **Dynamic (non-invariant) update:** revise both marginals and conditionals; often solved by **minimum-disturbance** (KL-minimization).
* **Likelihood ratio:** Pr(E|H)/Pr(E|¬H); multiplicative **force** of evidence or argument.
* **Causal power (W):** strength of a cause independent of base rate of the effect; often **ΔP/(1−base)**.
* **ΔP (delta-P):** Pr(effect|cause) − Pr(effect|¬cause); index of **inferential relevance**.
* **Explaining away:** in common-effect structures, evidence for one cause **lowers** belief in alternatives.
* **Information gain:** expected reduction in uncertainty (various measures; classically Shannon entropy reduction).
* **Kullback–Leibler distance:** divergence between prior and posterior distributions; used to find **closest** update compatible with new constraints.
* **Default/defeasible rule:** an inference licensed **unless** an exception is known (withdrawable).

---

# definitional contrasts & caveats (to avoid category errors)

* **Reasoning vs. proof:** Reasoning is **belief/plan revision** under constraints; proof is a **formal product**.
* **Rationality ≠ logical closure:** It’s rational to **limit** derivations (clutter avoidance), to **suspend** consequences, or to **retract** premises.
* **Everyday “if” ≠ material conditional:** People treat unmarked conditionals as **rules/probabilistic constraints**, not as “¬p or q.”
* **Deduction vs. induction are distinct targets:** “Necessary consequence” and “evidential support” are **different evaluation modes**, though they can interact.
* **Group vs. solo:** Much human reasoning is **argumentative**; standards include **source reliability** and **audience-relative** goals, not just private computation.

---

# ultra-concise definitional map (pocket version)

1. **Reasoning (umbrella):** constructing, revising, and justifying beliefs/intentions by drawing consequences from information + knowledge + goals, individually or socially, under uncertainty and resource limits.
2. **Targets:**
   • **Deductive** (necessity) · **Inductive** (support) · **Abductive** (best explanation) · **Practical** (action) · **Desiderative** (what to value).
3. **Formats:**
   • **Rules** (symbolic) · **Models** (possibilities) · **Instances** (similarity) · **Causal nets** (structured causes).
4. **Dynamics:**
   • **Belief revision** (coherence + conservatism) · **Nonmonotonic** defaults · **Bayesian/Jeffrey** updates · **KL-minimal** revisions.
5. **Social:**
   • **Argumentation** (evidence, reliability, utilities) · **Reasons-responsiveness**.
6. **Standards:**
   • Validity/soundness · Strength/calibration · Coherence/p-validity · Explanatory virtues · Information gain · Goal satisfaction.

That’s the whole toolkit of **definitions**—stitched together and human-only. If you want, I can drop this into a clean PDF or a one-page “definitions wall” you can paste at the top of a doc.
