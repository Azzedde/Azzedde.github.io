import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';

// Keep your interface, but we'll use 'figure' instead of 'thumbnail'
interface Paper {
  id: string;
  briefingCard: {
    title: string;
    authors: string[];
    venueDate: string;
    keywords: string[];
    affiliations: string;
    contributionProfile: Array<{
      type: string;
      description: string;
    }>;
    scientificHook: {
      problem: string;
      insight: string;
    };
    resources: {
      pdfUrl: string;
      code: {
        url: string | null;
        status: string;
      };
      projectPage: string | null;
    };
  };
  thumbnail: string;
  figure: string; // This should be a high-quality figure from the paper
}

interface PaperCardProps {
  paper: Paper;
  onClick: (paperId: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as const
    }
  }
};

// GitHub Icon Component
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const PaperCard = ({ paper, onClick }: PaperCardProps) => {
  const { briefingCard, thumbnail, id } = paper;
  const isCodeAvailable = briefingCard.resources?.code?.url ? true : false;
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="w-full h-full"
    >
      <div className="glass-card rounded-2xl p-8 h-full flex flex-col group min-h-[400px]">
        {/* Figure - Much more prominent and taller */}
        <div
          onClick={() => onClick(id)}
          className="w-full h-56 mb-6 overflow-hidden rounded-xl cursor-pointer"
        >
          <motion.img
            src={thumbnail}
            alt={`Figure from ${briefingCard.title}`}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {(showAllTags ? briefingCard.contributionProfile : briefingCard.contributionProfile.slice(0, 2)).map((c, i) => (
            <span key={i} className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-200">
              {c.type}
            </span>
          ))}
          {briefingCard.contributionProfile.length > 2 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {showAllTags ? 'Show less' : `+${briefingCard.contributionProfile.length - 2} more`}
            </button>
          )}
        </div>

        {/* Title - Larger and more prominent */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {briefingCard.title}
        </h3>

        {/* Keywords */}
        {briefingCard.keywords && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
            {briefingCard.keywords.map((keyword, i) => (
              <div key={i} className="flex items-center">
                <span className="text-xs text-slate-600">{keyword}</span>
                {i < briefingCard.keywords.length - 1 && (
                  <span className="mx-2 text-slate-300">•</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Affiliations */}
        <p className="text-sm text-slate-600 mb-4 flex-grow font-medium">
          {briefingCard.affiliations}
        </p>

        {/* Scientific Hook Preview */}
        <div className="mb-6">
          <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
            {briefingCard.scientificHook.problem}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
          {/* Left side: Date & Keywords */}
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500">{briefingCard.venueDate}</span>
          </div>
          
          {/* Right side: Actions */}
          <div className="flex items-center gap-4">
            {/* Code Link */}
            <a
              href={isCodeAvailable ? briefingCard.resources.code.url! : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${
                isCodeAvailable
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 cursor-not-allowed'
              }`}
              title={briefingCard.resources?.code?.status || 'Code status unknown'}
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            
            {/* Read Link */}
            <a
              href={briefingCard.resources?.pdfUrl || "https://www.arxiv.org/abs/2508.09874"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-semibold"
            >
              Read
            </a>
            
            {/* Explore Link */}
            <div
              onClick={() => onClick(id)}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              <span className="text-sm font-semibold">Explore</span>
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: [0, 3, 0] }} // Subtle pulse
                transition={{ repeat: Infinity, duration: 2, delay: Math.random() }}
                className="ml-1"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard;