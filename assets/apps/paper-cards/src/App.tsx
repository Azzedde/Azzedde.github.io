import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PaperCardsGrid from './components/views/PaperCardsGrid';
import PaperDetailView from './components/views/PaperDetailView';

function App() {
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);

  const handlePaperClick = (paperId: string) => {
    setSelectedPaperId(paperId);
  };

  const handleBackToGrid = () => {
    setSelectedPaperId(null);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {selectedPaperId ? (
          <PaperDetailView
            key="detail"
            paperId={selectedPaperId}
            onBack={handleBackToGrid}
          />
        ) : (
          <PaperCardsGrid
            key="grid"
            onPaperClick={handlePaperClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
