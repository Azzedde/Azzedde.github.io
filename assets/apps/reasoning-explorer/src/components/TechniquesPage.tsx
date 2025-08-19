import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Brain,
  Search,
  Zap,
  Users,
  CheckCircle,
  GitBranch,
  Cpu,
  Shield,
  Lightbulb,
  Rocket,
  Settings,
  Play,
  AlertCircle
} from 'lucide-react';
import './TechniquesPage.css';

// Data structure for all reasoning techniques, based on the provided text.
const techniquesData = {
  generate: {
    title: "Generate",
    subtitle: "Produce useful intermediate steps",
    icon: Brain,
    color: "from-blue-500 to-indigo-600",
    techniques: [
      { id: "cot", name: "Chain-of-Thought (CoT)", brief: "Think out loud before answering", what: "Ask the model to 'think out loud' before answering.", why: "Exposes intermediate reasoning, improving accuracy on multi-step tasks.", how: "Zero-shot: append 'Let’s think step by step.' Few-shot: show examples of ⟨question → rationale → answer⟩.", example: "Q: A pen is $2, a notebook is $5. Total for 3 pens, 2 notebooks?\nA: Let's think step by step...", pitfalls: "Fluent but wrong steps; can ramble.", icon: "🔗" },
      { id: "budgeted-cot", name: "Budgeted CoT", brief: "Concise thinking with length limits", what: "CoT with length limits to avoid rambling.", why: "Keeps costs down and forces crispness.", how: "Prompt with token/word limits, e.g., '...think step-by-step within 80 tokens total...'", example: "Think step-by-step within 80 tokens total, each step ≤ 8 words.", pitfalls: "Too-tight limits can hurt performance on tough problems.", icon: "💰" },
      { id: "decomposition", name: "Problem Decomposition", brief: "Break task into simpler sub-problems", what: "Decompose the task into simpler, ordered sub-problems, then solve them sequentially.", why: "Breaks long chains into manageable steps; reduces error propagation.", how: "1. Decompose into sub-questions. 2. Answer each using previous results. 3. Combine sub-answers.", example: "Decompose the problem into Q1, Q2... Answer Q1, then Q2...", pitfalls: "Bad decompositions derail the solution.", icon: "🧩" },
      { id: "self-ask", name: "Self-Ask", brief: "Model asks itself clarifying questions", what: "The model generates and answers its own sub-questions before solving the main question.", why: "Forces the model to identify missing information before proceeding.", how: "Prompt: 'List any sub-questions you need to answer first. Answer them briefly. Then solve.'", example: "Sub-question: What is the capital of France? Answer: Paris.", pitfalls: "Can invent unnecessary sub-questions if not guided.", icon: "❓" },
      { id: "templates", name: "Templates / Scaffolds", brief: "Fixed phases like Plan → Solve → Check", what: "Use a fixed structure of reasoning phases, e.g., Plan → Solve → Check → Reflect.", why: "Regularizes reasoning, making it easier to verify each phase.", how: "Add clear headings in the prompt for each phase.", example: "Plan: ...\nSolve: ...\nCheck: ...", pitfalls: "Useless if phases are not tied to concrete actions (e.g., 'Check' must run a real test).", icon: "📋" },
      { id: "pot", name: "Programs-as-Thoughts (PoT)", brief: "Generate and execute code as reasoning", what: "Ask for code (e.g., Python) instead of prose steps and execute it.", why: "Execution is a reliable verifier; far less prone to hallucination than prose.", how: "Prompt: 'Write a Python function to compute the result. Return only the number.'", example: "def solve():\n  return (3*2) + (2*5)", pitfalls: "The generated code can still be wrong; requires an execution environment.", icon: "💻" },
      { id: "auto-cot", name: "Auto-CoT", brief: "Automatically choose diverse examples", what: "Automatically select diverse examples to seed few-shot prompts.", why: "Good, varied examples are crucial for effective few-shot CoT.", how: "Cluster training questions; pick one representative solved example per cluster.", example: "Select examples from different problem types to build the prompt.", pitfalls: "Overly similar examples cause brittle, over-fitted behavior.", icon: "🎯" }
    ]
  },
  evaluate: {
    title: "Evaluate",
    subtitle: "Check the steps and the answer",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
    techniques: [
      { id: "self-consistency", name: "Self-Consistency", brief: "Majority vote from multiple solutions", what: "Sample multiple complete solutions; take the most common final answer.", why: "Different reasoning paths explore different possibilities; voting boosts robustness.", how: "Generate k=3–10 solutions (with temperature > 0); take the majority vote on the final answer.", example: "Generate 5 solutions, 3 say '16', 2 say '15'. The answer is 16.", pitfalls: "High token cost; use small k (3-5) and early stopping.", icon: "🗳️" },
      { id: "backward-check", name: "Backward Self-Check", brief: "Verify answer by working backward", what: "After getting an answer, ask the model to verify it by re-solving from scratch or working backward.", why: "Catches 'right answer, wrong reasons' and arithmetic slips.", how: "Prompt: 'Given your answer X, verify it by re-solving from scratch.'", example: "Your answer is 16. Verify this by starting from the result.", pitfalls: "Can just repeat the same flawed reasoning; require a fresh chain.", icon: "⏮️" },
      { id: "execution-check", name: "Execution-based Checking", brief: "Run code, check equations, use tests", what: "Use external tools to objectively check reasoning steps.", why: "Objective pass/fail signals are the most reliable form of verification.", how: "For math, use calculators. For code, run unit tests. For data, use schema checks.", example: "Run the generated code; if tests fail, feed the error back.", pitfalls: "Flaky or incomplete tests provide false confidence.", icon: "✅" },
      { id: "critic-corrector", name: "Critic/Corrector", brief: "A 'critic' reviews and suggests edits", what: "A 'critic' model reviews the 'solver' model's chain for errors and suggests edits.", why: "Separating 'create' vs 'critique' reduces self-confirmation bias.", how: "Use a two-turn pattern: Draft → Critique → Revised draft.", example: "Draft: ...\nCritique: The calculation in step 2 is wrong.\nRevised: ...", pitfalls: "Critics can be vague; force structured feedback (error type, location, fix).", icon: "🔍" },
      { id: "prm-orm", name: "Reward Models (PRM/ORM)", brief: "Score steps (PRM) or answers (ORM)", what: "ORM (Outcome Reward Model) scores the final answer. PRM (Process Reward Model) scores each intermediate step.", why: "PRM guides search and catches step-level mistakes; ORM is simpler but less informative.", how: "Used in search (Beam/ToT) to score paths or in RL to provide a reward signal.", example: "Score = α·(model confidence) + β·(PRM score)", pitfalls: "Training PRMs is noisy and data-intensive.", icon: "📊" }
    ]
  },
  control: {
    title: "Control",
    subtitle: "Search over alternatives",
    icon: GitBranch,
    color: "from-purple-500 to-pink-600",
    techniques: [
      { id: "search-strategies", name: "Search Strategies", brief: "Greedy vs Ensemble vs Beam vs Tree", what: "Methods to explore the solution space instead of taking the first path.", why: "Hard problems need exploration; simple greedy search is often insufficient.", how: "Greedy (one path), Ensemble (vote on many paths), Beam (keep K best partial paths), Tree (branch and backtrack).", example: "For a hard problem, use Tree-of-Thoughts instead of a single CoT chain.", pitfalls: "Exploration strategies have higher token/compute costs.", icon: "🌳" },
      { id: "beam-search", name: "Beam Search", brief: "Keep K best partial chains at each step", what: "At each step of generation, keep the top K most promising partial solutions and extend them.", why: "A good balance between exploration and computational cost.", how: "Score paths using model log-probability, optionally combined with a PRM score.", example: "Keep the top 3 partial chains, extend each by one step, rescore, and repeat.", pitfalls: "Can prune away a path that looks unpromising early but would have recovered.", icon: "📡" },
      { id: "tree-thoughts", name: "Tree-of-Thoughts (ToT)", brief: "Explore a tree of reasoning states", what: "Models a tree where nodes are reasoning states. Uses search algorithms (like MCTS) to explore the tree.", why: "Allows for global look-ahead, backtracking, and exploration of diverse paths.", how: "Select a node → expand children (next steps) → simulate outcomes (or score them) → backpropagate scores.", example: "From the current step, generate 3 possible next steps, evaluate each, and pursue the best one.", pitfalls: "Very high token cost; requires careful pruning and stopping conditions.", icon: "🌲" },
      { id: "self-refine", name: "Self-Refine", brief: "Iteratively refine a solution", what: "A loop of Generate → Feedback → Refine.", why: "A cheap, training-free way to improve outputs.", how: "Prompt: 'Draft your solution. Now, list mistakes or missing checks. Produce a corrected final answer.'", example: "Draft → Critique (self-generated) → Revise", pitfalls: "Diminishing returns after 1-2 loops; can get stuck in cycles.", icon: "🔄" }
    ]
  },
  grounding: {
    title: "Grounding & Tools",
    subtitle: "Connect to external reality",
    icon: Shield,
    color: "from-orange-500 to-red-600",
    techniques: [
      { id: "retrieval", name: "Retrieval-Augmented Reasoning", brief: "Search documents mid-reasoning", what: "Let the model search/retrieve from a knowledge base during reasoning.", why: "Pulls in up-to-date facts and reduces hallucination.", how: "Use a scaffold like ReAct (Reason → Act) to interleave reasoning with search actions.", example: "Think → Decide to search for a fact → Get search results → Continue reasoning with the new fact.", pitfalls: "Garbage in, garbage out. Relies on the quality of the retrieval system.", icon: "📚" },
      { id: "tools", name: "Tool Use", brief: "Use calculators, code interpreters, APIs", what: "Let the model call external tools like calculators, code interpreters, or other APIs.", why: "Offloads tasks to reliable, specialized tools (e.g., math, code execution).", how: "Prompt the model to generate tool calls (e.g., API requests) and provide the tool's output back to it.", example: "Model outputs a call to a calculator API for `3*2 + 2*5`, you return `16`.", pitfalls: "Model must learn the tool's API; execution environment is needed.", icon: "🛠️" },
      { id: "memory", name: "Memory / Scratchpads", brief: "Structured notes for tracking state", what: "A dedicated part of the context used as a structured scratchpad for the model to read/write.", why: "Prevents re-deriving info, reduces contradictions, and helps track state.", how: "Maintain a structured section in the prompt: `Facts: ...`, `Decisions: ...`, `To-verify: ...`", example: "Facts: [Pen cost: $2]\nDecisions: [Buy 3 pens]", pitfalls: "Can lead to context window bloat; needs summarization.", icon: "💾" }
    ]
  },
  training: {
    title: "Training Methods",
    subtitle: "Make models better reasoners",
    icon: Cpu,
    color: "from-cyan-500 to-blue-600",
    techniques: [
      { id: "sft", name: "Supervised Fine-Tuning (SFT)", brief: "Train on high-quality reasoning traces", what: "Fine-tune a base model on a dataset of high-quality step-by-step solutions.", why: "Directly teaches the model desired reasoning procedures and formats.", how: "Collect or generate verified reasoning chains (e.g., CoT, code) and train the model on them.", example: "Fine-tune on a dataset of math problems with correct step-by-step solutions.", pitfalls: "Data quality is paramount; expensive to create high-quality datasets.", icon: "🎓" },
      { id: "star", name: "STaR Bootstrapping", brief: "Generate and verify synthetic data", what: "Use a strong model to generate solutions, keep only the ones that verify, and fine-tune on that set.", why: "A cheaper way to scale up the creation of training data.", how: "Generate → Verify (e.g., with unit tests) → Keep correct → Train.", example: "Use GPT-4 to generate solutions, verify them, then train a smaller model on the verified set.", pitfalls: "Verification must be strict, otherwise you teach the model to make mistakes.", icon: "⭐" },
      { id: "rl", name: "Reward-based Fine-tuning (RL)", brief: "Use RL with outcome or process rewards", what: "Use reinforcement learning to reward the model for correct reasoning.", why: "Can incentivize desired behaviors (like correctness or verifiability) more directly than SFT.", how: "Use algorithms like PPO with a reward signal from an ORM or PRM.", example: "Give a reward of +1 for a correct final answer, -1 for incorrect.", pitfalls: "Complex and unstable; prone to 'reward hacking'.", icon: "🎮" },
      { id: "prm-training", name: "PRM Training", brief: "Train a model to score reasoning steps", what: "Train a separate, smaller model to score partial reasoning steps as 'helpful' vs 'harmful'.", why: "The resulting PRM can be used to guide search at inference time or as a reward signal for RL.", how: "Collect data of partial chains and label them with their quality.", example: "Train a classifier on steps, labeling dead-ends as negative examples.", pitfalls: "Can overfit to simple patterns; needs diverse and hard negative examples.", icon: "📈" },
      { id: "distillation", name: "Distillation", brief: "Teach a small model from a large one", what: "Train a smaller 'student' model to imitate the outputs (and reasoning chains) of a larger 'teacher' model.", why: "Transfers the capabilities of a powerful model to a more efficient one.", how: "Use the teacher's outputs (e.g., CoT chains) as the training data for the student.", example: "Use GPT-4's reasoning to fine-tune a smaller, faster model.", pitfalls: "The student might just mimic the teacher's style, not its underlying logic.", icon: "🧬" }
    ]
  },
  efficiency: {
    title: "Efficiency",
    subtitle: "Accuracy without overthinking",
    icon: Zap,
    color: "from-yellow-500 to-amber-600",
    techniques: [
      { id: "routing", name: "Routing", brief: "Use simple methods for easy problems", what: "Route queries to different reasoning strategies based on estimated difficulty.", why: "Saves tokens and latency by not using expensive strategies on easy problems.", how: "Train a router model or use a prompt: 'If you're certain, answer directly; else, think step-by-step.'", example: "Confidence > 0.9? Direct answer. Else: CoT.", pitfalls: "Confidence can be miscalibrated; the router can be a point of failure.", icon: "🚦" },
      { id: "early-stopping", name: "Early Stopping", brief: "Stop when an answer is found", what: "In ensemble or search methods, stop generation as soon as a confident answer is found.", why: "Saves significant tokens/compute without losing accuracy.", how: "For self-consistency, stop when a majority emerges. For search, stop when a candidate passes tests.", example: "In a k=5 vote, if the first 3 answers agree, stop and return that answer.", pitfalls: "Stopping too early might miss a better solution that would have emerged later.", icon: "🛑" },
      { id: "short-cot", name: "Short-CoT / Compression", brief: "Prefer short, correct chains", what: "Prompt or train the model to produce concise reasoning steps.", why: "Cuts token costs and reduces the surface area for errors.", how: "Add length constraints to the prompt or reward brevity during training.", example: "Keep each step under 10 words.", pitfalls: "Overly aggressive compression can hurt performance on complex problems.", icon: "📏" },
      { id: "latent-reasoning", name: "Latent Reasoning", brief: "Think internally, output only the answer", what: "The model does its reasoning in its hidden states without outputting the steps explicitly.", why: "The lowest possible token cost when an audit trail is not needed.", how: "Train the model on problems and only provide the final answer as the target output.", example: "Input: '2+2=?'. Output: '4'.", pitfalls: "Completely un-debuggable; impossible to know why the model gave an answer.", icon: "🤫" }
    ]
  },
  strategic: {
    title: "Multi-agent & Strategic",
    subtitle: "Reasoning with others",
    icon: Users,
    color: "from-indigo-500 to-purple-600",
    techniques: [
      { id: "tom", name: "Theory of Mind (ToM)", brief: "Model the opponent's goals/beliefs", what: "Explicitly model the goals, beliefs, and likely actions of other agents.", why: "Crucial for predicting and responding to others in strategic settings.", how: "Prompt the model to profile the opponent based on their behavior.", example: "Opponent's goal seems to be maximizing their own profit. They are likely to bluff.", pitfalls: "Can hallucinate motives; should be based on observed history.", icon: "🧠" },
      { id: "belief-tracking", name: "Belief Tracking", brief: "Update beliefs about others over time", what: "Keep a running, probabilistic belief over the state of other agents (e.g., their type, their knowledge).", why: "Allows for adaptation to other agents' changing strategies.", how: "Update a belief distribution after each interaction round.", example: "After they cooperated, update P(cooperative_player) from 0.5 to 0.7.", pitfalls: "Computationally complex; can be sensitive to noisy observations.", icon: "📝" },
      { id: "strategy-sets", name: "Strategy Sets", brief: "Use a menu of robust strategies", what: "Provide the model with a predefined set of robust strategies to choose from.", why: "Prevents ad-hoc, unstable behavior and leverages known game-theoretic solutions.", how: "Pick a strategy (e.g., Tit-for-Tat, Win-Stay/Lose-Shift) based on the current beliefs about the opponent.", example: "If opponent is cooperative, use Tit-for-Tat.", pitfalls: "A fixed set of strategies can be predictable and exploitable.", icon: "♟️" },
      { id: "negotiation-scaffolds", name: "Negotiation Scaffolds", brief: "Structure dialogue for negotiation", what: "Use a structured format for negotiation that includes key elements like BATNA, reservation price, etc.", why: "Controls drift in negotiation and prevents the model from being easily exploited.", how: "Prompt with a template for offers, counter-offers, and acceptance/rejection criteria.", example: "My BATNA is X, my target is Y. I will offer Z.", pitfalls: "Can be too rigid and miss creative, win-win solutions.", icon: "🤝" },
      { id: "self-play", name: "RL via Self-Play", brief: "Learn by playing against itself", what: "Train agents by having them play against copies of themselves, learning through trial and error.", why: "Can discover superhuman strategies and is a scalable way to generate training data.", how: "Use RL algorithms where an agent's opponent is a past version of itself.", example: "Two instances of the model negotiate a deal; reward them based on the outcome.", pitfalls: "Can lead to undesirable collusive or toxic behaviors if not constrained.", icon: "🎯" }
    ]
  }
};

const TechniquesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('generate');
  const [selectedTechnique, setSelectedTechnique] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const getFilteredTechniques = () => {
    const category = techniquesData[selectedCategory as keyof typeof techniquesData];
    if (!category) return [];
    if (!searchTerm) return category.techniques;
    
    const term = searchTerm.toLowerCase();
    return category.techniques.filter(
      t => t.name.toLowerCase().includes(term) ||
           t.brief.toLowerCase().includes(term) ||
           t.what.toLowerCase().includes(term)
    );
  };

  const categoryKeys = Object.keys(techniquesData);

  return (
    <div className="techniques-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div style={{ padding: '24px', borderBottom: '1px solid #e9ecef' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#212529' }}>
            Reasoning Techniques
          </h2>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6c757d' }}>
            A practical guide to LLM reasoning.
          </p>
        </div>

        <div style={{ padding: '16px' }}>
          <input
            type="text"
            placeholder="Search in this category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #ced4da',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
          {categoryKeys.map((key) => {
            const category = techniquesData[key as keyof typeof techniquesData];
            const Icon = category.icon;
            const isSelected = selectedCategory === key;
            
            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => { setSelectedCategory(key); setSearchTerm(''); }}
                style={{
                  marginBottom: '12px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: isSelected ? '#4299e1' : '#f8f9fa',
                  border: `1px solid ${isSelected ? 'transparent' : '#e9ecef'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: isSelected ? '0 6px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Icon size={22} color={isSelected ? 'white' : '#495057'} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: isSelected ? 'white' : '#343a40' }}>
                      {category.title}
                    </h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: isSelected ? 'rgba(255,255,255,0.85)' : '#6c757d', lineHeight: '1.4' }}>
                      {category.subtitle}
                    </p>
                  </div>
                  <ChevronRight size={20} color={isSelected ? 'white' : '#adb5bd'} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f9fa' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #e9ecef', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {React.createElement(techniquesData[selectedCategory as keyof typeof techniquesData].icon, { size: 32, style: { color: '#4299e1' } })}
            <div>
              <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#212529' }}>
                {techniquesData[selectedCategory as keyof typeof techniquesData].title}
              </h2>
              <p style={{ margin: '5px 0 0 0', fontSize: '16px', color: '#6c757d' }}>
                {getFilteredTechniques().length} technique(s) found
              </p>
            </div>
          </div>
        </div>

        <div ref={containerRef} style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <div className="main-content-grid">
            <AnimatePresence>
              {getFilteredTechniques().map((technique, index) => (
                <motion.div
                  key={technique.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                  onClick={() => setSelectedTechnique(technique)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid #e9ecef',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '16px' }}>{technique.icon}</div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 600, color: '#343a40' }}>
                    {technique.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6c757d', lineHeight: '1.5' }}>
                    {technique.brief}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTechnique && (
          <div
            className="modal-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 2147483647,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '40px 20px',
              overflowY: 'auto'
            }}
            onClick={() => setSelectedTechnique(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '750px',
                width: '100%',
                maxHeight: 'calc(100vh - 80px)',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{ fontSize: '42px' }}>{selectedTechnique.icon}</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: '#212529' }}>
                    {selectedTechnique.name}
                  </h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#6c757d', fontStyle: 'italic' }}>
                    {selectedTechnique.brief}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                {[
                  { title: 'What is it?', content: selectedTechnique.what, color: '#4dabf7', icon: <Lightbulb size={18}/> },
                  { title: 'Why it helps', content: selectedTechnique.why, color: '#69db7c', icon: <Rocket size={18}/> },
                  { title: 'How to apply', content: selectedTechnique.how, color: '#ff922b', icon: <Settings size={18}/> },
                  { title: 'Example', content: selectedTechnique.example, color: '#a5d8ff', icon: <Play size={18}/>, pre: true },
                  { title: 'Common Pitfalls', content: selectedTechnique.pitfalls, color: '#ff8787', icon: <AlertCircle size={18}/> }
                ].map(section => (
                  <div key={section.title} style={{
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    borderLeft: `4px solid ${section.color}`
                  }}>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 600, color: '#343a40', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {section.icon} {section.title}
                    </h3>
                    {section.pre ? (
                      <pre style={{ margin: 0, fontSize: '14px', color: '#495057', fontFamily: "'Fira Code', monospace", whiteSpace: 'pre-wrap', background: '#e9ecef', padding: '12px', borderRadius: '6px' }}>
                        {section.content}
                      </pre>
                    ) : (
                      <p style={{ margin: 0, fontSize: '14px', color: '#495057', lineHeight: '1.7' }}>
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedTechnique(null)}
                style={{
                  marginTop: '24px', padding: '12px 24px', background: '#495057',
                  color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
                  fontSize: '15px', fontWeight: 500, width: '100%', transition: 'background 0.2s'
                }}
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechniquesPage;

