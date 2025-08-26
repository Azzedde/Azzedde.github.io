---
layout: splash
title: "Paper cards"
permalink: /paper-cards/
---

<div id="paper-cards-container" style="width: 100%; margin: 20px 0;">
  <div id="paper-cards-root" style="min-height: 100vh;">
    <!-- React app will be loaded here -->
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: #666;">
      <p>Loading Paper Cards...</p>
    </div>
  </div>
</div>

<link rel="stylesheet" href="/assets/apps/paper-cards/assets/index.css">

<script>
// Load the React app
(function() {
  const script = document.createElement('script');
  script.src = '/assets/apps/paper-cards/main.js';
  script.onload = function() {
    console.log('Paper Cards loaded successfully');
  };
  script.onerror = function() {
    document.getElementById('paper-cards-root').innerHTML =
      '<div style="text-align: center; padding: 40px; color: #999;">' +
      '<p>🚧 Paper Cards is currently being set up</p>' +
      '<p>Check back soon for the interactive visualization!</p>' +
      '</div>';
  };
  document.head.appendChild(script);
})();
</script>

<style>
  /* Hide the default page title */
  .page__title {
    display: none;
  }

  /* KILL the container constraints */
  .page__content {
    max-width: none !important; /* Force override */
    padding: 0 !important;      /* Remove all padding */
    margin: 0 !important;       /* Remove all margin */
  }

  #paper-cards-container {
    background: #fafafa;
    position: relative;
    z-index: 1;
  }

  /* Let the root take over the full viewport */
  #paper-cards-root {
    width: 100%;
    min-height: 100vh;
    position: relative;
  }

  /* Ensure content below is properly separated */
  #paper-cards-container + p {
    margin-top: 2rem !important;
    clear: both;
    position: relative;
    z-index: 10;
    background: white;
    padding: 1rem 0;
  }
</style>