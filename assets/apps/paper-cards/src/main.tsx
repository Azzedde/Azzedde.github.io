import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Wait for DOM to be ready and then initialize the app
function initializeApp() {
  console.log('Initializing Paper Cards React app...');
  
  const rootElement = document.getElementById('paper-cards-root');
  if (!rootElement) {
    console.error('Could not find paper-cards-root element!');
    return;
  }
  
  console.log('Found root element, creating React app...');
  
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app rendered successfully!');
  } catch (error) {
    console.error('Error rendering React app:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
