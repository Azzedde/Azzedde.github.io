import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple function to initialize the app
function initReasoningExplorer() {
  const container = document.getElementById('reasoning-explorer-app');
  if (container && !container.hasAttribute('data-react-root')) {
    container.setAttribute('data-react-root', 'true');
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

// Try to initialize immediately
initReasoningExplorer();

// Also try when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReasoningExplorer);
} else {
  initReasoningExplorer();
}

// Export for global access
(window as any).initReasoningExplorer = initReasoningExplorer;