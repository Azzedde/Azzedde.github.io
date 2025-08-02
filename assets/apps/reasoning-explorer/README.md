# Reasoning LLM Explorer

A minimal interactive visualization of reasoning techniques in Large Language Models, built with React and ReactFlow.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd assets/apps/reasoning-explorer
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/
│   ├── ReasoningExplorer.tsx  # Main graph visualization component
│   └── SidePanel.tsx          # Node details panel
├── store/
│   └── useStore.ts            # Zustand state management
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
├── index.css                  # Global styles
└── App.css                    # App-specific styles
```

## Features

- **Interactive Graph**: Click on nodes to explore details
- **Side Panel**: View detailed information about selected nodes
- **Minimal Setup**: Currently includes Chain-of-Thought reasoning examples
- **Responsive Design**: Works within Jekyll page container

## Integration with Jekyll

The built React app is loaded by the Jekyll page at `/_pages/reasoning-explorer.md`. The build output should be placed in the same directory for the Jekyll page to load it correctly.

## Next Steps

1. Install dependencies and build the app
2. Add more reasoning techniques and papers
3. Implement filtering and search functionality
4. Add more interactive features as described in the original blueprint

## Technologies Used

- React 18
- ReactFlow 11
- Zustand (state management)
- TypeScript
- Vite (build tool)