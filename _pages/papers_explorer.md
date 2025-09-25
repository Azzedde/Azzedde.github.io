---
layout: splash
title: "Papers Explorer"
permalink: /papers-explorer/
---

<link rel="stylesheet" href="/assets/css/vis-network.min.css">
<style>
    #mynetwork {
        width: 100%;
        height: 800px;
        border: 2px solid #34495e;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        margin-bottom: 20px;
    }

    #graph-legend {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border: 1px solid #ddd;
        max-width: 200px;
        z-index: 1000;
    }

    #graph-legend h4 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
    }

    .legend-item {
        display: flex;
        align-items: center;
        margin: 8px 0;
        font-size: 12px;
    }

    .legend-color {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 8px;
        border: 1px solid #ccc;
    }

    .legend-size {
        margin-right: 8px;
        border: 1px solid #ccc;
    }

    #graph-controls {
        position: fixed;
        top: 100px;
        left: 20px;
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border: 1px solid #ddd;
        max-width: 200px;
        z-index: 1000;
    }

    #graph-controls h4 {
        margin-top: 0;
        color: #2c3e50;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
    }

    #graph-controls button {
        display: block;
        width: 100%;
        margin: 8px 0;
        padding: 8px 12px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        transition: background-color 0.3s;
    }

    #graph-controls button:hover {
        background: #2980b9;
    }


    .intro-section {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-bottom: 30px;
        border-left: 5px solid #3498db;
    }

    .intro-section h2 {
        color: #2c3e50;
        margin-bottom: 15px;
    }

    .intro-section p {
        color: #5d6d7e;
        line-height: 1.6;
        margin-bottom: 10px;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 30px 0;
    }

    .feature-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-top: 3px solid #3498db;
    }

    .feature-card h3 {
        color: #2c3e50;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .feature-card p {
        color: #7f8c8d;
        font-size: 14px;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        #graph-legend, #graph-controls {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            margin: 10px 0;
            max-width: 100%;
        }
        
        #mynetwork {
            height: 600px;
        }
    }

    /* Statistics Dashboard Styles */
    .stats-dashboard {
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-top: 30px;
        border-left: 5px solid #e74c3c;
    }

    .stats-dashboard h2 {
        color: #2c3e50;
        margin-bottom: 20px;
        text-align: center;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-bottom: 20px;
    }

    .stats-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        border-top: 3px solid #3498db;
    }

    .stats-card h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .stats-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .stats-list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #e9ecef;
        font-size: 14px;
    }

    .stats-list li:last-child {
        border-bottom: none;
    }

    .stats-count {
        background: #3498db;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: bold;
        font-size: 12px;
    }

    .total-papers {
        text-align: center;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .total-papers h3 {
        margin: 0;
        font-size: 24px;
    }

    .total-papers p {
        margin: 5px 0 0 0;
        opacity: 0.9;
    }
</style>

<div class="intro-section">
    <h2>🔬 Papers knowledge graph</h2>
    <p>Explore this research paper collection took from top conferences in AI. Each node represents a paper. Hover over any paper to see its title and click to see a brief summary + some research questions emerging from that paper.</p>
</div>

<div id="mynetwork"></div>

<div class="stats-dashboard">
    <h2>📊 Papers Statistics Dashboard</h2>
    <div id="stats-content">
        <!-- Statistics will be populated by JavaScript -->
    </div>
</div>

<script type="text/javascript" src="/assets/js/vis-network.min.js"></script>
<script type="text/javascript" src="/assets/js/knowledge-graph.js"></script>


