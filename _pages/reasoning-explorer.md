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

<div id="reasoning-explorer-container" style="width: 100%; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
  <div id="reasoning-explorer-app" style="height: 800px;">
    <!-- React app will be loaded here -->
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
      <p>Loading Reasoning Explorer...</p>
    </div>
  </div>
</div>

<p style="margin-top: 1.5rem; font-size: 1.1rem; color: #333;">Click on nodes to explore detailed information about each technique, including limitations, opportunities, and related research.</p>

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
  z-index: 1;
}

#reasoning-explorer-app {
  width: 100%;
  height: 100%;
  position: relative;
}

.reasoning-node {
  cursor: pointer;
  transition: all 0.3s ease;
}

.reasoning-node:hover {
  transform: scale(1.05);
}

/* Ensure content below is properly separated */
#reasoning-explorer-container + p {
  margin-top: 2rem !important;
  clear: both;
  position: relative;
  z-index: 10;
  background: white;
  padding: 1rem 0;
}
</style>