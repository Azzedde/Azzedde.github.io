import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../store/useStore';
import { definitionsData } from '../data/definitionsData';

// Color scheme for different node types - exactly like survey
const nodeColors = {
  core: { bg: '#059669', border: '#047857' },
  mind: { bg: '#7c3aed', border: '#6d28d9' },
  practice: { bg: '#dc2626', border: '#b91c1c' }
};

// Function to load our definitions data - exactly like survey loadYamlData
const loadDefinitionsData = async () => {
  try {
    const definitionsData = {
      nodes: [
        // CORE REASONING TYPES
        { id: 'deductive', type: 'core', title: 'Deductive Reasoning', description: 'Logical entailment - necessity from premises', x: 100, y: 100 },
        { id: 'inductive', type: 'core', title: 'Inductive Reasoning', description: 'Probabilistic support - strength from evidence', x: 400, y: 100 },
        { id: 'abductive', type: 'core', title: 'Abductive Reasoning', description: 'Best explanation - hypothesis selection', x: 700, y: 100 },
        { id: 'practical', type: 'core', title: 'Practical Reasoning', description: 'Action-oriented - means-ends reasoning', x: 250, y: 300 },
        { id: 'bayesian', type: 'core', title: 'Bayesian Reasoning', description: 'Probabilistic updating - belief revision', x: 550, y: 300 },

        // HOW YOUR MIND WORKS
        { id: 'type1-type2', type: 'mind', title: 'Type 1 vs Type 2 Processing', description: 'Dual-process distinction in reasoning', x: 250, y: 500 },
        { id: 'mental-models', type: 'mind', title: 'Mental Models', description: 'Cognitive representations of possibilities', x: 550, y: 500 },

        // REASONING IN PRACTICE
        { id: 'conditional', type: 'practice', title: 'Conditional Reasoning', description: 'If-then statements - conditional probability', x: 700, y: 500 },
        { id: 'argumentation', type: 'practice', title: 'Argumentation', description: 'Social reasoning - persuasion and evaluation', x: 100, y: 700 },
        { id: 'causal', type: 'practice', title: 'Causal Reasoning', description: 'Causal structures - interventions and dependencies', x: 400, y: 700 }
      ]
    };
    
    return definitionsData;
  } catch (error) {
    console.error('Error loading definitions data:', error);
    return { nodes: [] };
  }
};

// Function to create nodes from data - exactly like survey but with better styling
const createNodesFromData = async (): Promise<Node[]> => {
  const definitionsData = await loadDefinitionsData();
  
  return definitionsData.nodes.map(node => ({
    id: node.id,
    type: 'default',
    position: { x: node.x, y: node.y },
    data: {
      label: (
        <div style={{ textAlign: 'center', lineHeight: '1.3' }}>
          <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>
            {node.title}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9, lineHeight: '1.2' }}>
            {node.description}
          </div>
          <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '6px', fontWeight: '500' }}>
            Research card →
          </div>
        </div>
      ),
      type: node.type,
      description: node.description
    },
    style: {
      background: nodeColors[node.type as keyof typeof nodeColors]?.bg || '#6b7280',
      color: 'white',
      border: `2px solid ${nodeColors[node.type as keyof typeof nodeColors]?.border || '#4b5563'}`,
      borderRadius: '8px',
      padding: '12px',
      minWidth: '180px',
      maxWidth: '220px',
      minHeight: '80px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
  }));
};

// Function to create edges from data - exactly like survey
const createEdgesFromData = (): Edge[] => {
  const edges = [
    // Core reasoning types connections
    { source: 'deductive', target: 'inductive' },
    { source: 'inductive', target: 'abductive' },
    { source: 'deductive', target: 'practical' },
    { source: 'abductive', target: 'bayesian' },
    { source: 'practical', target: 'bayesian' },
    
    // Mind works connection
    { source: 'type1', target: 'type2' },
    
    // Practice connections
    { source: 'conditional', target: 'argumentation' },
    { source: 'argumentation', target: 'causal' },
    
    // Cross-category connections
    { source: 'bayesian', target: 'conditional' },
    { source: 'type2', target: 'conditional' },
    { source: 'practical', target: 'causal' }
  ];

  return edges.map((edge, index) => ({
    id: `edge_${index}`,
    source: edge.source,
    target: edge.target,
    type: 'smoothstep',
    style: { stroke: '#059669', strokeWidth: 3 },
  }));
};

const AtlasPage: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setSelectedDefinition, setDrawerOpen } = useStore();

  useEffect(() => {
    const loadData = async () => {
      const atlasNodes = await createNodesFromData();
      const atlasEdges = createEdgesFromData();
      setNodes(atlasNodes);
      setEdges(atlasEdges);
    };
    loadData();
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Find the research definition for this node
      const definition = definitionsData.find(def => def.id === node.id);
      if (definition) {
        setSelectedDefinition(definition);
        setDrawerOpen(true);
      }
    },
    [setSelectedDefinition, setDrawerOpen]
  );

  return (
    <div className="w-full h-full">
      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-400">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">
          🧠 Reasoning Research Atlas
        </h2>
        <p className="text-blue-700">
          Explore formal definitions, empirical findings, and computational models from the reasoning literature. 
          Click on any concept for research-grade content with formalization, failure modes, and key references.
        </p>
      </div>
      
      <div style={{ width: '100%', height: '600px' }}>
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
          <Background color="#f1f5f9" gap={20} />
        </ReactFlow>
      </div>

    </div>
  );
};

export default AtlasPage;