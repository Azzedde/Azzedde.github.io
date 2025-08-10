import React from 'react';
import { useStore } from '../store/useStore';

// Paper data extracted from reasoning_llms.yml - using the CORRECT links and data
const paperData: Record<string, any> = {
  // Overview papers
  'plaat-2024': {
    title: 'Reasoning with Large Language Models',
    authors: ['Plaat et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Comprehensive overview of reasoning capabilities in large language models, covering various approaches and methodologies.',
    category: 'overview',
    link: 'https://arxiv.org/pdf/2407.11511',
    tags: ['Survey', 'Overview', 'Reasoning', 'LLM']
  },
  'huang-2023': {
    title: 'Towards Reasoning in Large Language Models',
    authors: ['Huang & Chang'],
    year: 2023,
    venue: 'arXiv',
    summary: 'Foundational survey exploring the path towards enhanced reasoning capabilities in large language models.',
    category: 'overview',
    link: 'https://arxiv.org/abs/2212.10403',
    tags: ['Survey', 'Reasoning', 'Foundation']
  },
  'sun-2024': {
    title: 'A Survey of Reasoning with Foundation Models',
    authors: ['Sun et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Comprehensive survey of reasoning approaches across foundation models, providing taxonomic overview.',
    category: 'overview',
    link: 'https://arxiv.org/abs/2312.11562',
    tags: ['Foundation Models', 'Survey', 'Taxonomy']
  },
  'li-2025': {
    title: 'From System 1 to System 2',
    authors: ['Li et al.'],
    year: 2025,
    venue: 'arXiv',
    summary: 'Theoretical framework connecting dual-process theory to LLM reasoning capabilities.',
    category: 'overview',
    link: 'https://arxiv.org/abs/2502.17419',
    tags: ['Dual Process', 'System 1', 'System 2', 'Theory']
  },

  // Prompting papers
  'bandyopadhyay-2024': {
    title: 'Thinking Machines: LLM-based Reasoning Strategies',
    authors: ['Bandyopadhyay et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Survey of reasoning strategies and prompting techniques for large language models.',
    category: 'prompting',
    link: 'https://arxiv.org/abs/2503.10814',
    tags: ['Prompting', 'Strategies', 'Chain-of-Thought']
  },
  'chen-2025-longcot': {
    title: 'Towards Reasoning Era: Long Chain-of-Thought',
    authors: ['Chen et al.'],
    year: 2025,
    venue: 'arXiv',
    summary: 'Exploration of extended chain-of-thought reasoning for complex problem solving.',
    category: 'prompting',
    link: 'https://arxiv.org/pdf/2502.15652',
    tags: ['Chain-of-Thought', 'Long Reasoning', 'Complex Problems']
  },
  'patil-2024': {
    title: 'Advancing Reasoning in LLMs',
    authors: ['Patil & Jadon'],
    year: 2024,
    venue: 'ACM',
    summary: 'Comprehensive review of prompting strategies for advancing reasoning capabilities.',
    category: 'prompting',
    link: 'https://dl.acm.org/doi/pdf/10.1145/3729218',
    tags: ['Prompting', 'Reasoning Advancement', 'Strategies']
  },

  // Training papers
  'ke-2024-frontiers': {
    title: 'A Survey of Frontiers in LLM Reasoning',
    authors: ['Ke et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Survey covering inference scaling and learning-to-reason approaches in LLMs.',
    category: 'training',
    link: 'https://arxiv.org/pdf/2503.10814',
    tags: ['Frontiers', 'Learning', 'Inference Scaling']
  },
  'xu-2024-reinforced': {
    title: 'Towards Large Reasoning Models: Reinforced Reasoning',
    authors: ['Xu et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Reinforcement learning approaches for developing large-scale reasoning models.',
    category: 'training',
    link: 'https://arxiv.org/pdf/2212.10403',
    tags: ['Reinforcement Learning', 'Large Models', 'Training']
  },
  'kumar-2024-posttrain': {
    title: 'LLM Post-Training: A Deep Dive',
    authors: ['Kumar et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Comprehensive analysis of post-training techniques for enhancing LLM reasoning.',
    category: 'training',
    link: 'https://arxiv.org/pdf/2503.09567',
    tags: ['Post-Training', 'Fine-tuning', 'Enhancement']
  },
  'feng-2025-efficient': {
    title: 'Efficient Reasoning Models',
    authors: ['Feng et al.'],
    year: 2025,
    venue: 'ACM',
    summary: 'Survey of efficient training methods for compact reasoning models.',
    category: 'training',
    link: 'https://dl.acm.org/doi/pdf/10.1145/3664194',
    tags: ['Efficiency', 'Compact Models', 'Training']
  },

  // Logic papers
  'cheng-2023': {
    title: 'Empowering LLMs with Logical Reasoning',
    authors: ['Cheng et al.'],
    year: 2023,
    venue: 'arXiv',
    summary: 'Survey of methods for enhancing logical reasoning capabilities in LLMs.',
    category: 'logic',
    link: 'https://arxiv.org/pdf/2502.03671',
    tags: ['Logical Reasoning', 'Formal Logic', 'Enhancement']
  },
  'liu-2025': {
    title: 'Logical Reasoning in LLMs',
    authors: ['Liu et al.'],
    year: 2025,
    venue: 'arXiv',
    summary: 'Comprehensive analysis of logical reasoning patterns and capabilities in LLMs.',
    category: 'logic',
    link: 'https://arxiv.org/pdf/2504.10903',
    tags: ['Logic', 'Reasoning Patterns', 'Analysis']
  },
  'yu-2024-nlr': {
    title: 'Natural Language Reasoning',
    authors: ['Yu et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Survey of natural language reasoning approaches and formal logic integration.',
    category: 'logic',
    link: 'https://arxiv.org/pdf/2401.06805',
    tags: ['Natural Language', 'Formal Logic', 'Integration']
  },

  // Domain papers
  'ahn-2025-math': {
    title: 'Large Language Models for Mathematical Reasoning',
    authors: ['Ahn et al.'],
    year: 2025,
    venue: 'arXiv',
    summary: 'Comprehensive survey of mathematical reasoning capabilities and techniques in LLMs.',
    category: 'domain',
    link: 'https://arxiv.org/pdf/2404.01869',
    tags: ['Mathematics', 'Domain-Specific', 'Problem Solving']
  },
  'wang-2024-multimodal': {
    title: 'EXPLORING ... Multimodal LLMs',
    authors: ['Wang et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Survey of reasoning capabilities in multimodal large language models.',
    category: 'domain',
    link: 'https://arxiv.org/pdf/2502.21321',
    tags: ['Multimodal', 'Vision-Language', 'Cross-Modal']
  },

  // Agentic papers
  'zhang-2024-mastermind': {
    title: 'LLM as a Mastermind: Strategic Reasoning',
    authors: ['Zhang et al.'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Survey of strategic reasoning and game-theoretic approaches in LLMs.',
    category: 'agentic',
    link: 'https://arxiv.org/pdf/2502.09100',
    tags: ['Strategic Reasoning', 'Game Theory', 'Planning']
  },
  'ferrag-2025-agents': {
    title: 'From LLM Reasoning to Autonomous AI Agents',
    authors: ['Ferrag et al.'],
    year: 2025,
    venue: 'ResearchGate',
    summary: 'Survey of autonomous agent frameworks and multi-agent reasoning systems.',
    category: 'agentic',
    link: 'https://arxiv.org/pdf/2504.19678',
    tags: ['Autonomous Agents', 'Multi-Agent', 'Planning']
  },

  // Evaluation papers
  'mondorf-2024-beyondacc': {
    title: 'Beyond Accuracy: Evaluating the Reasoning Behaviour',
    authors: ['Mondorf & Plank'],
    year: 2024,
    venue: 'arXiv',
    summary: 'Survey of evaluation methodologies and benchmarks for assessing reasoning behavior.',
    category: 'evaluation',
    link: 'https://arxiv.org/pdf/2402.00157',
    tags: ['Evaluation', 'Benchmarks', 'Reasoning Assessment']
  }
};

// Category information
const categoryData: Record<string, any> = {
  'overview': {
    title: 'Foundational Overviews & Taxonomies',
    description: 'Big-picture surveys that map the entire reasoning-LLM landscape',
    color: '#7c3aed'
  },
  'prompting': {
    title: 'Prompt & Inference-Time Strategies',
    description: 'Techniques for eliciting reasoning at test time through prompting',
    color: '#7c3aed'
  },
  'training': {
    title: 'Learning-to-Reason & Post-Training',
    description: 'Training and fine-tuning approaches for better reasoning',
    color: '#7c3aed'
  },
  'logic': {
    title: 'Logical & Formal Reasoning',
    description: 'Deductive, inductive, and formal logic reasoning approaches',
    color: '#7c3aed'
  },
  'domain': {
    title: 'Domain-Specific Reasoning',
    description: 'Reasoning in specialized domains like math, code, and multimodal',
    color: '#7c3aed'
  },
  'agentic': {
    title: 'Agentic & Strategic Reasoning',
    description: 'Multi-agent systems and strategic reasoning frameworks',
    color: '#7c3aed'
  },
  'evaluation': {
    title: 'Evaluation & Benchmarks',
    description: 'Benchmarks and evaluation methodologies for reasoning',
    color: '#7c3aed'
  }
};

const SidePanel: React.FC = () => {
  const { selectedNodeId, setSelectedNodeId } = useStore();

  if (!selectedNodeId) return null;

  const paper = paperData[selectedNodeId];
  const category = categoryData[selectedNodeId];
  
  // Handle root node
  if (selectedNodeId === 'reasoning_root') {
    return (
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '350px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        <button
          onClick={() => setSelectedNodeId(null)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
        
        <h2 style={{ color: '#1e40af', marginBottom: '15px' }}>
          Reasoning with Large Language Models
        </h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          This interactive explorer maps the comprehensive landscape of reasoning capabilities in Large Language Models. 
          The visualization organizes 19 key survey papers across 7 major categories, providing a structured overview 
          of the field's current state and research directions.
        </p>
        
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '10px' }}>Categories:</h3>
          <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
            <li>Foundational Overviews & Taxonomies</li>
            <li>Prompt & Inference-Time Strategies</li>
            <li>Learning-to-Reason & Post-Training</li>
            <li>Logical & Formal Reasoning</li>
            <li>Domain-Specific Reasoning</li>
            <li>Agentic & Strategic Reasoning</li>
            <li>Evaluation & Benchmarks</li>
          </ul>
        </div>
      </div>
    );
  }

  // Handle category nodes
  if (category) {
    return (
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '350px',
        background: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        <button
          onClick={() => setSelectedNodeId(null)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
        
        <h2 style={{ color: category.color, marginBottom: '15px' }}>
          {category.title}
        </h2>
        
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          {category.description}
        </p>
      </div>
    );
  }

  // Handle paper nodes
  if (!paper) return null;

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '350px',
      background: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxHeight: '600px',
      overflowY: 'auto'
    }}>
      <button
        onClick={() => setSelectedNodeId(null)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          color: '#666'
        }}
      >
        ×
      </button>
      
      <h2 style={{ color: '#059669', marginBottom: '10px', fontSize: '18px', lineHeight: '1.3' }}>
        {paper.title}
      </h2>
      
      <div style={{ marginBottom: '15px' }}>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>
          <strong>Authors:</strong> {paper.authors.join(', ')}
        </p>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>
          <strong>Year:</strong> {paper.year} | <strong>Venue:</strong> {paper.venue}
        </p>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Summary</h3>
        <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
          {paper.summary}
        </p>
      </div>
      
      {paper.tags && (
        <div style={{ marginBottom: '15px' }}>
          <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Tags</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {paper.tags.map((tag: string, index: number) => (
              <span
                key={index}
                style={{
                  background: '#f0f0f0',
                  color: '#666',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <a
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: '#059669',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Read Paper →
        </a>
      </div>
    </div>
  );
};

export default SidePanel;