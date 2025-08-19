import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import './DefinitionsDrawer.css';

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
    <div className="definitions-drawer">
      <button
        onClick={() => setDrawerOpen(false)}
        className="definitions-drawer-close"
      >
        ×
      </button>
      
      <h2 className="definitions-drawer-title" style={{
        color: getCategoryColor(selectedDefinition.category)
      }}>
        {selectedDefinition.title}
      </h2>
      
      <div className="definitions-drawer-meta">
        <p>
          <strong>Category:</strong> {selectedDefinition.category}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="definitions-drawer-tabs">
        {[
          { key: 'definition', label: 'Definition' },
          { key: 'formalization', label: 'Formalization' },
          { key: 'empirical', label: 'Empirical' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className="definitions-drawer-tab"
            style={{
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
          <div className="definitions-drawer-section">
            <h3>Definition</h3>
            <div className="definitions-drawer-highlight" style={{
              border: `1px solid ${getCategoryColor(selectedDefinition.category)}20`,
              borderLeft: `4px solid ${getCategoryColor(selectedDefinition.category)}`
            }}>
              <p style={{ color: '#333' }}>
                {selectedDefinition.definition}
              </p>
            </div>
          </div>

          <div className="definitions-drawer-section">
            <h3>Norms, Tests & Metrics</h3>
            
            <div style={{ marginBottom: '12px' }}>
              <h4>Target Function</h4>
              <p style={{ fontSize: '13px', lineHeight: '1.4' }}>
                {selectedDefinition.normsTestsMetrics.targetFunction}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4>Formal Criterion</h4>
              <p style={{ fontSize: '13px', lineHeight: '1.4' }}>
                {selectedDefinition.normsTestsMetrics.formalCriterion}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4>Operational Test</h4>
              <p style={{ fontSize: '13px', lineHeight: '1.4' }}>
                {selectedDefinition.normsTestsMetrics.operationalTest}
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4>Quantitative Metrics</h4>
              <ul style={{ paddingLeft: '16px' }}>
                {selectedDefinition.normsTestsMetrics.quantMetrics.map((metric, index) => (
                  <li key={index} style={{ fontSize: '13px', lineHeight: '1.4', marginBottom: '3px' }}>
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <h4>Failure Probes</h4>
              <ul style={{ paddingLeft: '16px' }}>
                {selectedDefinition.normsTestsMetrics.failureProbes.map((probe, index) => (
                  <li key={index} style={{ fontSize: '13px', lineHeight: '1.4', marginBottom: '3px' }}>
                    {probe}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="definitions-drawer-section">
            <h3>Micro-example</h3>
            <div className="definitions-drawer-example">
              <p style={{ color: '#0c4a6e' }}>
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
            <div className="definitions-drawer-section">
              <h3>Scope & Caveats</h3>
              <ul>
                {selectedDefinition.scopeNotes.map((note, index) => (
                  <li key={index}>
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