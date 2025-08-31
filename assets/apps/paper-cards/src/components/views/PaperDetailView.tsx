import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import papersData from '../../data/papersData.json';

interface PaperDetailViewProps {
  paperId: string;
  onBack: () => void;
}

const PaperDetailView = ({ paperId, onBack }: PaperDetailViewProps) => {
  const paper = papersData.papers.find(p => p.id === paperId);

  if (!paper) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Paper not found</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Grid
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Back Button */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors bg-transparent border-none outline-none focus:outline-none hover:bg-gray-50 px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Papers</span>
          </button>
        </div>
      </motion.div>

      {/* Paper Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and Metadata */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            {paper.briefingCard.title}
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            {paper.briefingCard.authors.join(', ')} • {paper.briefingCard.venueDate}
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-12 gap-8 items-stretch">
          {/* Problem + Insight (left) */}
          <motion.div
            className="glass-card rounded-2xl p-8 col-span-12 lg:col-span-8 h-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Problem</h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              {paper.briefingCard.scientificHook.problem}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">The Insight</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {paper.briefingCard.scientificHook.insight}
            </p>
          </motion.div>

          {/* Contributions (right) */}
          <motion.div
            className="glass-card rounded-2xl p-8 col-span-12 lg:col-span-4 h-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contributions</h2>
            <div className="space-y-4">
              {paper.briefingCard.contributionProfile.map((contribution, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold text-blue-600">{contribution.type}</div>
                  <div className="text-gray-600 text-sm mt-1">{contribution.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Zone 1 */}
        <motion.div
          className="mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-full bg-gray-100 py-20 rounded-2xl">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-4">Feature Zone 1</h2>
              <p className="text-center text-gray-600">This is a placeholder for a new feature with diagrams.</p>
              <div className="bg-white mt-8 rounded-lg shadow-lg" style={{ minHeight: '400px' }}></div>
            </div>
          </div>
        </motion.div>

        {/* Feature Zone 2 */}
        <motion.div
          className="mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="w-full bg-white py-20 rounded-2xl">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-4">Feature Zone 2</h2>
              <p className="text-center text-gray-600">This is another placeholder for a new feature with diagrams.</p>
              <div className="bg-gray-50 mt-8 rounded-lg shadow-inner" style={{ minHeight: '400px' }}></div>
            </div>
          </div>
        </motion.div>

        {/* Full-width Genealogy Map Section */}
        <motion.div
          className="mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {/* <motion.div className="glass-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Knowledge Genealogy</h2>
            {paper.genealogyMap ? (
              <div className="w-full">
                <GenealogyMap genealogyData={paper.genealogyMap} />
              </div>
            ) : (
              <p className="text-gray-600">No genealogy data available for this paper.</p>
            )}
          </motion.div> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaperDetailView;
