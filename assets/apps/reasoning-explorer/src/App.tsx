import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SurveyPage from './components/SurveyPage';
import AtlasPage from './components/AtlasPage';
import DefinitionsDrawer from './components/DefinitionsDrawer';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'survey' | 'atlas'>('survey');

  return (
    <div className="App">
      <Navbar setActiveView={setActiveView} />
      <div className="main-content">
        {activeView === 'survey' && <SurveyPage />}
        {activeView === 'atlas' && <AtlasPage />}
      </div>
      <DefinitionsDrawer />
    </div>
  );
}

export default App;