import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SurveyPage from './components/SurveyPage';
import AtlasPage from './components/AtlasPage';
import TechniquesPage from './components/TechniquesPage';
import DefinitionsDrawer from './components/DefinitionsDrawer';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'survey' | 'atlas' | 'techniques'>('survey');

  return (
    <div className="App">
      <Navbar setActiveView={setActiveView} />
      <div className="main-content">
        {activeView === 'survey' && <SurveyPage />}
        {activeView === 'atlas' && <AtlasPage />}
        {activeView === 'techniques' && <TechniquesPage />}
      </div>
      <DefinitionsDrawer />
    </div>
  );
}

export default App;