import React, { useCallback } from 'react';
import {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { label: 'Start Node' },
    style: {
      background: '#059669',
      color: 'white',
      border: '2px solid #047857',
      borderRadius: '8px',
      padding: '12px',
      minWidth: '120px',
    },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 300, y: 100 },
    data: { label: 'Process Node' },
    style: {
      background: '#7c3aed',
      color: 'white',
      border: '2px solid #6d28d9',
      borderRadius: '8px',
      padding: '12px',
      minWidth: '120px',
    },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 500, y: 100 },
    data: { label: 'End Node' },
    style: {
      background: '#dc2626',
      color: 'white',
      border: '2px solid #b91c1c',
      borderRadius: '8px',
      padding: '12px',
      minWidth: '120px',
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    style: { stroke: '#059669', strokeWidth: 3 },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    style: { stroke: '#7c3aed', strokeWidth: 3 },
  },
];

interface SimpleDiagramProps {
  height?: string;
}

const SimpleDiagram: React.FC<SimpleDiagramProps> = ({ height = '400px' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height, width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background color="#f1f5f9" gap={20} />
      </ReactFlow>
    </div>
  );
};

export default SimpleDiagram;