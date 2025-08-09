import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const DefinitionsDrawer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'definition' | 'formalization' | 'empirical'>('definition');
  const { selectedDefinition, drawerOpen, setDrawerOpen } = useStore();

  if (!drawerOpen || !selectedDefinition) {
    return null;
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Core Reasoning Types': '#059669',
      'How Your Mind Works': '#7c3aed',
      'Reasoning in Practice': '#dc2626',
      'Representational Formats': '#0ea5e9',
      'Dynamics': '#f59e0b'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '450px',
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
        onClick={() => setDrawerOpen(false)}
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
      
      <h2 style={{ 
        color: getCategoryColor(selectedDefinition.category), 
        marginBottom: '10px', 
        fontSize: '18px', 
        lineHeight: '1.3' 
      }}>
        {selectedDefinition.title}
      </h2>
      
      <div style={{ marginBottom: '15px' }}>
        <p style={{ color: '#666', fontSize: '14px', margin: '5px 0' }}>
          <strong>Category:</strong> {selectedDefinition.category}
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid #e5e7eb', 
        marginBottom: '15px' 
      }}>
        {[
          { key: 'definition', label: 'Definition' },
          { key: 'formalization', label: 'Formalization' },
          { key: 'empirical', label: 'Empirical' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.key ? '600' : '400',
              color: activeTab === tab.key ? getCategoryColor(selectedDefinition.category) : '#666',
              borderBottom: activeTab === tab.key ? `2px solid ${getCategoryColor(selectedDefinition.category)}` : '2px solid transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'definition' && (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Definition</h3>
            <div style={{
              background: '#f8f9fa',
              border: `1px solid ${getCategoryColor(selectedDefinition.category)}20`,
              borderLeft: `4px solid ${getCategoryColor(selectedDefinition.category)}`,
              padding: '12px',
              borderRadius: '4px'
            }}>
              <p style={{ color: '#333', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                {selectedDefinition.definition}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Norms, Tests & Metrics</h3>
            
            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '4px', fontWeight: '600' }}>Target Function</h4>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>
                {selectedDefinition.normsTestsMetrics.targetFunction}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '4px', fontWeight: '600' }}>Formal Criterion</h4>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>
                {selectedDefinition.normsTestsMetrics.formalCriterion}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '4px', fontWeight: '600' }}>Operational Test</h4>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>
                {selectedDefinition.normsTestsMetrics.operationalTest}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '4px', fontWeight: '600' }}>Quantitative Metrics</h4>
              <ul style={{ margin: 0, paddingLeft: '16px' }}>
                {selectedDefinition.normsTestsMetrics.quantMetrics.map((metric, index) => (
                  <li key={index} style={{ color: '#666', fontSize: '13px', lineHeight: '1.4', marginBottom: '3px' }}>
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4 style={{ color: '#555', fontSize: '14px', marginBottom: '4px', fontWeight: '600' }}>Failure Probes</h4>
              <ul style={{ margin: 0, paddingLeft: '16px' }}>
                {selectedDefinition.normsTestsMetrics.failureProbes.map((probe, index) => (
                  <li key={index} style={{ color: '#666', fontSize: '13px', lineHeight: '1.4', marginBottom: '3px' }}>
                    {probe}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Micro-example</h3>
            <div style={{
              background: '#f0f9ff',
              border: '1px solid #0ea5e920',
              borderLeft: '4px solid #0ea5e9',
              padding: '12px',
              borderRadius: '4px'
            }}>
              <p style={{ color: '#0c4a6e', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                <strong>Input:</strong> {selectedDefinition.microExample.input}
                {selectedDefinition.microExample.conclusion && (
                  <>
                    <br />
                    <strong>Conclusion:</strong> {selectedDefinition.microExample.conclusion}
                  </>
                )}
              </p>
            </div>
          </div>

          {selectedDefinition.scopeNotes && selectedDefinition.scopeNotes.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Scope & Caveats</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {selectedDefinition.scopeNotes.map((note, index) => (
                  <li key={index} style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '4px' }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'formalization' && (
        <div>
          {selectedDefinition.formalization && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Formalization</h3>
              <div style={{
                background: '#f8f9fa',
                border: '1px solid #6b728020',
                borderLeft: '4px solid #6b7280',
                padding: '12px',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}>
                <p style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
                  {selectedDefinition.formalization}
                </p>
              </div>
            </div>
          )}

          {selectedDefinition.failureModes && selectedDefinition.failureModes.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Failure Modes</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {selectedDefinition.failureModes.map((mode, index) => (
                  <li key={index} style={{ color: '#dc2626', fontSize: '14px', lineHeight: '1.5', marginBottom: '4px' }}>
                    {mode}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedDefinition.related && selectedDefinition.related.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Related Concepts</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedDefinition.related.map((relatedId, index) => (
                  <span
                    key={index}
                    style={{
                      background: `${getCategoryColor(selectedDefinition.category)}20`,
                      color: getCategoryColor(selectedDefinition.category),
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    {relatedId}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'empirical' && (
        <div>
          {selectedDefinition.humanNotes && selectedDefinition.humanNotes.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Human Performance Notes</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {selectedDefinition.humanNotes.map((note, index) => (
                  <li key={index} style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '4px' }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selectedDefinition.references && selectedDefinition.references.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}>Key References</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {selectedDefinition.references.map((ref, index) => (
                  <li key={index} style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', marginBottom: '4px' }}>
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{
            background: '#f0fdf4',
            border: '1px solid #22c55e20',
            borderLeft: '4px solid #22c55e',
            padding: '12px',
            borderRadius: '4px'
          }}>
            <h4 style={{ color: '#15803d', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>
              📚 Research Note
            </h4>
            <p style={{ color: '#15803d', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>
              This research card provides formal definitions, empirical findings, and computational models from the reasoning literature.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefinitionsDrawer;