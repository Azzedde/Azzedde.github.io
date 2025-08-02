import { create } from 'zustand';

interface StoreState {
  selectedNodeId: string | null;
  filters: {
    tags: string[];
    years: number[];
  };
  searchText: string;
  showEntrepreneurial: boolean;
  setSelectedNodeId: (id: string | null) => void;
  setFilters: (filters: { tags: string[]; years: number[] }) => void;
  setSearchText: (text: string) => void;
  setShowEntrepreneurial: (show: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedNodeId: null,
  filters: {
    tags: [],
    years: [],
  },
  searchText: '',
  showEntrepreneurial: false,
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setFilters: (filters) => set({ filters }),
  setSearchText: (text) => set({ searchText: text }),
  setShowEntrepreneurial: (show) => set({ showEntrepreneurial: show }),
}));