import { create } from 'zustand';

export type AtlasMapType = 'overview' | 'targets' | 'formats' | 'dynamics' | 'social' | 'glossary';

export interface ResearchCard {
  id: string;
  title: string;
  category: string;
  definition: string;
  normsTestsMetrics: {
    targetFunction: string;
    formalCriterion: string;
    operationalTest: string;
    quantMetrics: string[];
    failureProbes: string[];
  };
  formalization?: string;
  microExample: { input: string; conclusion?: string };
  failureModes?: string[];
  humanNotes?: string[];
  scopeNotes?: string[];
  references?: string[];  // "Author (Year)"
  related?: string[];     // node ids
}

interface StoreState {
  selectedNodeId: string | null;
  currentAtlasMap: AtlasMapType;
  filters: {
    tags: string[];
    years: number[];
  };
  searchText: string;
  showEntrepreneurial: boolean;
  selectedDefinition: ResearchCard | null;
  drawerOpen: boolean;
  setSelectedNodeId: (id: string | null) => void;
  setCurrentAtlasMap: (map: AtlasMapType) => void;
  setFilters: (filters: { tags: string[]; years: number[] }) => void;
  setSearchText: (text: string) => void;
  setShowEntrepreneurial: (show: boolean) => void;
  setSelectedDefinition: (definition: ResearchCard | null) => void;
  setDrawerOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedNodeId: null,
  currentAtlasMap: 'overview',
  filters: {
    tags: [],
    years: [],
  },
  searchText: '',
  showEntrepreneurial: false,
  selectedDefinition: null,
  drawerOpen: false,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setCurrentAtlasMap: (map) => set({ currentAtlasMap: map }),
  setFilters: (filters) => set({ filters }),
  setSearchText: (text) => set({ searchText: text }),
  setShowEntrepreneurial: (show) => set({ showEntrepreneurial: show }),
  setSelectedDefinition: (definition) => set({ selectedDefinition: definition }),
  setDrawerOpen: (open) => set({ drawerOpen: open }),
}));