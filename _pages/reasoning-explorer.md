---
layout: splash
title: "Reasoning LLM Explorer"
permalink: /reasoning-explorer/
author_profile: false
sidebar:
  nav: ""

---

# Reasoning Explorer

Welcome to the interactive exploration of reasoning capabilities in Large Language Models. This tool provides a visual map of the reasoning-LLM landscape, allowing you to explore different techniques, papers, and research directions.

<div id="reasoning-explorer-container" style="width: 100%; height: 800px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
  <div id="reasoning-explorer-app">
    <!-- React app will be loaded here -->
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
      <p>Loading Reasoning Explorer...</p>
    </div>
  </div>
</div>



Click on nodes to explore detailed information about each technique, including limitations, opportunities, and related research.

<link rel="stylesheet" href="/assets/apps/reasoning-explorer/dist/assets/index.css">

<script>
// Load the React app
(function() {
  const script = document.createElement('script');
  script.src = '/assets/apps/reasoning-explorer/dist/main.js';
  script.onload = function() {
    console.log('Reasoning Explorer loaded successfully');
  };
  script.onerror = function() {
    document.getElementById('reasoning-explorer-app').innerHTML =
      '<div style="text-align: center; padding: 40px; color: #999;">' +
      '<p>🚧 Reasoning Explorer is currently being set up</p>' +
      '<p>Check back soon for the interactive visualization!</p>' +
      '</div>';
  };
  document.head.appendChild(script);
})();
</script>

<style>
#reasoning-explorer-container {
  background: #fafafa;
  position: relative;
}

#reasoning-explorer-app {
  width: 100%;
  height: 100%;
}

.reasoning-node {
  cursor: pointer;
  transition: all 0.3s ease;
}

.reasoning-node:hover {
  transform: scale(1.05);
}
</style>