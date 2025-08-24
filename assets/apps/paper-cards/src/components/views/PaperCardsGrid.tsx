import { motion } from 'framer-motion';
import { useState } from 'react';
import PaperCard from '../ui/PaperCard';
import papersData from '../../data/papersData.json';

interface PaperCardsGridProps {
  onPaperClick: (paperId: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const PaperCardsGrid = ({ onPaperClick }: PaperCardsGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredPapers = papersData.papers.filter(paper => {
    const matchesSearch = paper.briefingCard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.briefingCard.authors.some(author => 
                           author.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    if (selectedFilter === 'all') return matchesSearch;
    
    return matchesSearch && paper.briefingCard.contributionProfile.some(contrib => 
      contrib.type.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  const contributionTypes = Array.from(
    new Set(
      papersData.papers.flatMap(paper => 
        paper.briefingCard.contributionProfile.map(contrib => contrib.type)
      )
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        className="relative overflow-hidden bg-blue-600 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Research Paper Collection
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore cutting-edge research with interactive visualizations and detailed analysis
          </motion.p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search papers by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          {/* Filter */}
          <div className="md:w-64">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
            >
              <option value="all">All Types</option>
              {contributionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <motion.p
          className="text-gray-600 mb-6"
          key={filteredPapers.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''} found
        </motion.p>
      </motion.div>

      {/* Papers Grid */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPapers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPapers.map((paper) => (
              <motion.div
                key={paper.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <PaperCard
                  paper={paper}
                  onClick={onPaperClick}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No papers found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PaperCardsGrid;