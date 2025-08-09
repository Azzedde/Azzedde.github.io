import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useStore } from '../store/useStore';
import SidePanel from './SidePanel';

// Color scheme for different node types
const nodeColors = {
  root: { bg: '#1e40af', border: '#1e3a8a' },
  category: { bg: '#7c3aed', border: '#6d28d9' },
  paper: { bg: '#059669', border: '#047857' }
};

// Function to load YAML data from Jekyll
const loadYamlData = async () => {
  try {
    // In a real Jekyll environment, this would be loaded from the YAML file
    // For now, we'll use the data structure from the YAML
    const yamlData = {
      nodes: [
        // Root
        { id: 'reasoning_root', type: 'root', title: 'Reasoning with Large Language Models', x: 600, y: 80 },
        
        // Categories - Much more spread out
        { id: 'overview', type: 'category', title: 'Foundational Overviews & Taxonomies', parent: 'reasoning_root', x: 50, y: 300 },
        { id: 'prompting', type: 'category', title: 'Prompt & Inference-Time Strategies', parent: 'reasoning_root', x: 400, y: 300 },
        { id: 'training', type: 'category', title: 'Learning-to-Reason & Post-Training', parent: 'reasoning_root', x: 750, y: 300 },
        { id: 'logic', type: 'category', title: 'Logical & Formal Reasoning', parent: 'reasoning_root', x: 1100, y: 300 },
        { id: 'domain', type: 'category', title: 'Domain-Specific Reasoning', parent: 'reasoning_root', x: 150, y: 750 },
        { id: 'agentic', type: 'category', title: 'Agentic & Strategic Reasoning', parent: 'reasoning_root', x: 600, y: 750 },
        { id: 'evaluation', type: 'category', title: 'Evaluation & Benchmarks', parent: 'reasoning_root', x: 1050, y: 750 },
        
        // Papers from YAML data with proper spacing
        { id: 'plaat-2024', type: 'paper', title: 'Reasoning with Large Language Models', authors: ['Plaat et al.'], year: 2024, parent: 'overview', x: -50, y: 500 },
        { id: 'huang-2023', type: 'paper', title: 'Towards Reasoning in Large Language Models', authors: ['Huang & Chang'], year: 2023, parent: 'overview', x: 80, y: 500 },
        { id: 'sun-2024', type: 'paper', title: 'A Survey of Reasoning with Foundation Models', authors: ['Sun et al.'], year: 2024, parent: 'overview', x: 210, y: 500 },
        { id: 'li-2025', type: 'paper', title: 'From System 1 to System 2', authors: ['Li et al.'], year: 2025, parent: 'overview', x: 15, y: 600 },
        
        { id: 'bandyopadhyay-2024', type: 'paper', title: 'Thinking Machines: LLM-based Reasoning Strategies', authors: ['Bandyopadhyay et al.'], year: 2024, parent: 'prompting', x: 300, y: 500 },
        { id: 'chen-2025-longcot', type: 'paper', title: 'Towards Reasoning Era: Long Chain-of-Thought', authors: ['Chen et al.'], year: 2025, parent: 'prompting', x: 450, y: 500 },
        { id: 'patil-2024', type: 'paper', title: 'Advancing Reasoning in LLMs', authors: ['Patil & Jadon'], year: 2024, parent: 'prompting', x: 375, y: 600 },
        
        { id: 'ke-2024-frontiers', type: 'paper', title: 'A Survey of Frontiers in LLM Reasoning', authors: ['Ke et al.'], year: 2024, parent: 'training', x: 650, y: 500 },
        { id: 'xu-2024-reinforced', type: 'paper', title: 'Towards Large Reasoning Models: Reinforced Reasoning', authors: ['Xu et al.'], year: 2024, parent: 'training', x: 800, y: 500 },
        { id: 'kumar-2024-posttrain', type: 'paper', title: 'LLM Post-Training: A Deep Dive', authors: ['Kumar et al.'], year: 2024, parent: 'training', x: 725, y: 600 },
        { id: 'feng-2025-efficient', type: 'paper', title: 'Efficient Reasoning Models', authors: ['Feng et al.'], year: 2025, parent: 'training', x: 875, y: 600 },
        
        { id: 'cheng-2023', type: 'paper', title: 'Empowering LLMs with Logical Reasoning', authors: ['Cheng et al.'], year: 2023, parent: 'logic', x: 1000, y: 500 },
        { id: 'liu-2025', type: 'paper', title: 'Logical Reasoning in LLMs', authors: ['Liu et al.'], year: 2025, parent: 'logic', x: 1150, y: 500 },
        { id: 'yu-2024-nlr', type: 'paper', title: 'Natural Language Reasoning', authors: ['Yu et al.'], year: 2024, parent: 'logic', x: 1075, y: 600 },
        
        { id: 'ahn-2025-math', type: 'paper', title: 'Large Language Models for Mathematical Reasoning', authors: ['Ahn et al.'], year: 2025, parent: 'domain', x: 50, y: 950 },
        { id: 'wang-2024-multimodal', type: 'paper', title: 'EXPLORING ... Multimodal LLMs', authors: ['Wang et al.'], year: 2024, parent: 'domain', x: 250, y: 950 },
        
        { id: 'zhang-2024-mastermind', type: 'paper', title: 'LLM as a Mastermind: Strategic Reasoning', authors: ['Zhang et al.'], year: 2024, parent: 'agentic', x: 500, y: 950 },
        { id: 'ferrag-2025-agents', type: 'paper', title: 'From LLM Reasoning to Autonomous AI Agents', authors: ['Ferrag et al.'], year: 2025, parent: 'agentic', x: 700, y: 950 },
        
        { id: 'mondorf-2024-beyondacc', type: 'paper', title: 'Beyond Accuracy: Evaluating the Reasoning Behaviour', authors: ['Mondorf & Plank'], year: 2024, parent: 'evaluation', x: 1050, y: 950 },
      ]
    };
    
    return yamlData;
  } catch (error) {
    console.error('Error loading YAML data:', error);
    return { nodes: [] };
  }
};

// Function to create nodes from YAML data
const createNodesFromData = async (): Promise<Node[]> => {
  const yamlData = await loadYamlData();
  
  return yamlData.nodes.map(node => ({
    id: node.id,
    type: 'default',
    position: { x: node.x, y: node.y },
    data: {
      label: node.title,
      type: node.type,
      authors: node.authors,
      year: node.year,
      parent: node.parent
    },
    style: {
      background: nodeColors[node.type as keyof typeof nodeColors]?.bg || '#6b7280',
      color: 'white',
      border: `2px solid ${nodeColors[node.type as keyof typeof nodeColors]?.border || '#4b5563'}`,
      borderRadius: '8px',
      padding: node.type === 'root' ? '15px' : node.type === 'category' ? '12px' : '10px',
      fontSize: node.type === 'root' ? '16px' : node.type === 'category' ? '14px' : '12px',
      fontWeight: node.type === 'root' ? 'bold' : node.type === 'category' ? '600' : '500',
      minWidth: node.type === 'category' ? '200px' : '180px',
      minHeight: node.type === 'paper' ? '50px' : 'auto',
      textAlign: 'center' as const,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  }));
};

// Function to create edges from data
const createEdgesFromData = (): Edge[] => {
  const edges = [
    // Root to categories
    { source: 'reasoning_root', target: 'overview' },
    { source: 'reasoning_root', target: 'prompting' },
    { source: 'reasoning_root', target: 'training' },
    { source: 'reasoning_root', target: 'logic' },
    { source: 'reasoning_root', target: 'domain' },
    { source: 'reasoning_root', target: 'agentic' },
    { source: 'reasoning_root', target: 'evaluation' },
    
    // Category to papers
    { source: 'overview', target: 'plaat-2024' },
    { source: 'overview', target: 'huang-2023' },
    { source: 'overview', target: 'sun-2024' },
    { source: 'overview', target: 'li-2025' },
    
    { source: 'prompting', target: 'bandyopadhyay-2024' },
    { source: 'prompting', target: 'chen-2025-longcot' },
    { source: 'prompting', target: 'patil-2024' },
    
    { source: 'training', target: 'ke-2024-frontiers' },
    { source: 'training', target: 'xu-2024-reinforced' },
    { source: 'training', target: 'kumar-2024-posttrain' },
    { source: 'training', target: 'feng-2025-efficient' },
    
    { source: 'logic', target: 'cheng-2023' },
    { source: 'logic', target: 'liu-2025' },
    { source: 'logic', target: 'yu-2024-nlr' },
    
    { source: 'domain', target: 'ahn-2025-math' },
    { source: 'domain', target: 'wang-2024-multimodal' },
    
    { source: 'agentic', target: 'zhang-2024-mastermind' },
    { source: 'agentic', target: 'ferrag-2025-agents' },
    
    { source: 'evaluation', target: 'mondorf-2024-beyondacc' },
  ];

  return edges.map((edge, index) => ({
    id: `edge_${index}`,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    style: { stroke: '#6b7280', strokeWidth: 2 },
  }));
};

const SurveyPage: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { selectedNodeId, setSelectedNodeId } = useStore();

  useEffect(() => {
    const loadData = async () => {
      const surveyNodes = await createNodesFromData();
      const surveyEdges = createEdgesFromData();
      setNodes(surveyNodes);
      setEdges(surveyEdges);
    };
    loadData();
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  return (
    <div className="page-container">
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
        
        {selectedNodeId && <SidePanel />}
      </div>
    </div>
  );
};

export default SurveyPage;