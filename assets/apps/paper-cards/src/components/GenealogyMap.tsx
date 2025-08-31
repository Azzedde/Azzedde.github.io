import React, { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
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
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Color scheme for different node types
const nodeColors = {
  root: { bg: '#2563eb', border: '#1d4ed8' }, // Special blue for root paper
  paper: { bg: '#059669', border: '#047857' },
  concept: { bg: '#7c3aed', border: '#6d28d9' },
  dataset: { bg: '#dc2626', border: '#b91c1c' },
  default: { bg: '#6b7280', border: '#4b5563' }
};

interface GenealogyNode {
  id: string;
  type: string;
  data: {
    label: string;
    description?: string;
    more?: string;
  };
}

interface GenealogyEdge {
  source: string;
  target: string;
  label?: string;
  style?: {
    stroke?: string;
  };
  data?: {
    more?: string;
  };
}

interface GenealogyMapData {
  nodes: GenealogyNode[];
  edges: GenealogyEdge[];
}

interface GenealogyMapProps {
  data: GenealogyMapData;
  height?: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  type: string;
  description?: string;
  color?: string;
}

// Helper function to extract text from a React element
const extractTextFromLabel = (label: unknown): string => {
  if (typeof label === 'string') {
    return label;
  }
  if (React.isValidElement(label)) {
    const props = label.props as { children?: React.ReactNode };
    if (props.children) {
      const children = React.Children.toArray(props.children);
      const firstChild = children[0];
      if (React.isValidElement(firstChild)) {
        const firstChildProps = firstChild.props as { children?: React.ReactNode };
        if (typeof firstChildProps.children === 'string') {
          return firstChildProps.children;
        }
      }
    }
  }
  return 'Details'; // Fallback title
};

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, title, content, type, description, color }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none">
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-300 flex flex-col pointer-events-auto overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-300 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div
              style={{
                backgroundColor: nodeColors[type as keyof typeof nodeColors]?.bg || '#6b7280',
                color: 'white'
              }}
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            >
              {type}
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-200 rounded-full z-20 relative"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight font-sans">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto min-h-0">
          <div className="space-y-4">
            {description && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-400">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-blue-800 leading-relaxed text-sm">{description}</p>
                </div>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">DETAILS</h3>
              </div>
              <div className="overflow-y-auto max-h-96 min-h-0">
                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap break-words">
                  {content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GenealogyMap: React.FC<GenealogyMapProps> = ({ data, height = '500px' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [allEdges, setAllEdges] = useState<Edge[]>([]);
  const [nodeTypeFilters, setNodeTypeFilters] = useState<Record<string, boolean>>({});
  const [edgeTypeFilters, setEdgeTypeFilters] = useState<Record<string, boolean>>({});
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    content: string;
    type: string;
    description?: string;
    color?: string;
  }>({
    isOpen: false,
    title: '',
    content: '',
    type: '',
    description: '',
    color: ''
  });

  // Get unique node types and edge labels for filtering
  useEffect(() => {
    const nodeTypes = [...new Set(data.nodes.map(node => node.type))];
    const edgeLabels = [...new Set(data.edges.map(edge => edge.label || 'unnamed'))];
    
    setNodeTypeFilters(Object.fromEntries(nodeTypes.map(type => [type, true])));
    setEdgeTypeFilters(Object.fromEntries(edgeLabels.map(label => [label, true])));
  }, [data]);

  // Function to create ReactFlow nodes from genealogy data
  const createNodes = useCallback((): Node[] => {
    return data.nodes.map((node, index) => {
      const nodeType = node.type as keyof typeof nodeColors;
      const colors = nodeColors[nodeType] || nodeColors.default;
      
      return {
        id: node.id,
        type: 'default',
        position: { 
          x: 150 + (index % 3) * 400, 
          y: 150 + Math.floor(index / 3) * 200 
        },
        data: {
          label: (
            <div style={{ textAlign: 'center', lineHeight: '1.3' }}>
              <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                {node.data.label}
              </div>
              {node.data.description && (
                <div style={{ fontSize: '11px', opacity: 0.8, lineHeight: '1.2' }}>
                  {node.data.description}
                </div>
              )}
            </div>
          ),
          type: node.type,
          description: node.data.description,
          more: node.data.more
        },
        style: {
          background: colors.bg,
          color: 'white',
          border: `2px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '12px',
          minWidth: '180px',
          maxWidth: '220px',
          minHeight: node.data.description ? '80px' : '60px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      };
    });
  }, [data.nodes]);

  // Function to create ReactFlow edges from genealogy data
  const createEdges = useCallback((): Edge[] => {
    return data.edges.map((edge, index) => ({
      id: `edge_${index}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      label: edge.label,
      labelStyle: { 
        fontSize: '11px', 
        fontWeight: '500',
        fill: '#374151'
      },
      labelBgStyle: { fill: '#f9fafb', fillOpacity: 0.8 },
      labelBgPadding: [4, 4],
      style: { 
        stroke: edge.style?.stroke || '#059669', 
        strokeWidth: 3 
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.style?.stroke || '#059669',
      },
      data: {
        label: edge.label,
        more: edge.data?.more
      }
    }));
  }, [data.edges]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      const genealogyNodes = createNodes();
      const genealogyEdges = createEdges();
      setAllNodes(genealogyNodes);
      setAllEdges(genealogyEdges);
      setNodes(genealogyNodes);
      setEdges(genealogyEdges);
    };
    loadData();
  }, [createNodes, createEdges, setNodes, setEdges]);

  // Apply filters when they change
  useEffect(() => {
    const filteredNodes = allNodes.filter(node => {
      // Never filter out root nodes
      if (node.data.type === 'root') return true;
      return nodeTypeFilters[node.data.type as string] !== false;
    });
    
    const filteredEdges = allEdges.filter(edge => {
      const edgeLabel = edge.data?.label as string || 'unnamed';
      return edgeTypeFilters[edgeLabel] !== false;
    });

    setNodes(filteredNodes);
    setEdges(filteredEdges);
  }, [nodeTypeFilters, edgeTypeFilters, allNodes, allEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const moreInfo = node.data.more as string;
    if (moreInfo) {
      const nodeType = node.data.type as keyof typeof nodeColors;
      const color = nodeColors[nodeType]?.bg || '#6b7280';
      setModalState({
        isOpen: true,
        title: extractTextFromLabel(node.data.label),
        content: moreInfo,
        type: node.data.type as string,
        description: node.data.description as string | undefined,
        color: color
      });
    }
  }, []);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    const moreInfo = edge.data?.more as string;
    if (moreInfo) {
      setModalState({
        isOpen: true,
        title: edge.data?.label as string || 'Relationship',
        content: moreInfo,
        type: edge.data?.label as string || 'Relationship',
        color: '#059669' // Default color for edges
      });
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const toggleNodeTypeFilter = (type: string) => {
    setNodeTypeFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleEdgeTypeFilter = (label: string) => {
    setEdgeTypeFilters(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <div style={{ height, width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Filter Controls */}
      <div style={{ padding: '10px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '10px' }}>
          <strong style={{ fontSize: '12px', color: '#374151' }}>Node Types:</strong>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '5px' }}>
            {Object.entries(nodeTypeFilters).map(([type, isActive]) => (
              <button
                key={type}
                onClick={() => toggleNodeTypeFilter(type)}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  background: isActive ? nodeColors[type as keyof typeof nodeColors]?.bg || '#6b7280' : '#fff',
                  color: isActive ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <strong style={{ fontSize: '12px', color: '#374151' }}>Edge Types:</strong>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '5px' }}>
            {Object.entries(edgeTypeFilters).map(([label, isActive]) => (
              <button
                key={label}
                onClick={() => toggleEdgeTypeFilter(label)}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  background: isActive ? '#059669' : '#fff',
                  color: isActive ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ReactFlow Diagram */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          fitView
        >
          <Controls />
          <Background color="#f1f5f9" gap={20} />
        </ReactFlow>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
        content={modalState.content}
        type={modalState.type}
      />
    </div>
  );
};

export default GenealogyMap;