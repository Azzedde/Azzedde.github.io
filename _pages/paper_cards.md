---
layout: splash
title: "Paper cards"
permalink: /paper-cards/
---

<div id="paper-cards-root"></div>

<script type="module" src="/assets/apps/paper-cards/dist/assets/index-xAapGnK5.js"></script>
<link rel="stylesheet" href="/assets/apps/paper-cards/dist/assets/index-COY8_ax6.css">

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

  /* Let the root take over the full viewport */
  #paper-cards-root {
    width: 100%;
    min-height: 100vh;
  }
</style>

<script>
  // Debug script to check if everything is loading correctly
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for paper-cards-root...');
    const root = document.getElementById('paper-cards-root');
    if (root) {
      console.log('Found paper-cards-root element:', root);
    } else {
      console.error('paper-cards-root element not found!');
    }
    
    // Check if the script loaded
    console.log('Checking if React script loaded...');
    
    // Add error handling for script loading
    window.addEventListener('error', function(e) {
      console.error('Script error:', e.error, e.filename, e.lineno);
    });
  });
</script>