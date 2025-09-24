document.addEventListener("DOMContentLoaded", function() {
    // DOM element where the network will be attached
    var container = document.getElementById('mynetwork');

    // Fetch and process the JSON data
    fetch('/assets/js/papers_explorer.json')
        .then(response => response.json())
        .then(data => {
            // Create nodes and edges arrays
            var nodes = [];
            var edges = [];
            var nodeId = 0;

            // Color scheme for different fields and subfields
            const fieldColors = {
                'Plain AI': '#3498db',
                'Robotics': '#e74c3c',
                'Computer Vision': '#2ecc71',
                'NLP': '#f39c12',
                'Machine Learning': '#9b59b6'
            };

            const relevanceColors = {
                'Foundational Knowledge': '#95a5a6',
                'Potential Application': '#3498db',
                'Direct Application': '#27ae60'
            };

            // Clustering functions
            function createSemanticClusters(papers) {
                const clusters = new Map();
                const problemCategories = {
                    'data_quality': ['noise', 'quality', 'synthetic', 'data', 'dataset', 'corruption'],
                    'scalability': ['scale', 'large', 'efficiency', 'computational', 'memory', 'speed'],
                    'robustness': ['robust', 'stability', 'failure', 'error', 'uncertainty', 'reliable'],
                    'generalization': ['generalize', 'transfer', 'domain', 'adaptation', 'overfitting'],
                    'interpretability': ['explain', 'interpret', 'transparent', 'understand', 'black'],
                    'optimization': ['optimize', 'convergence', 'training', 'learning', 'gradient'],
                    'real_time': ['real-time', 'online', 'streaming', 'latency', 'inference'],
                    'multimodal': ['multimodal', 'fusion', 'cross-modal', 'vision', 'text'],
                    'continual_learning': ['continual', 'lifelong', 'catastrophic', 'forgetting', 'plasticity'],
                    'anomaly_detection': ['anomaly', 'outlier', 'detection', 'abnormal', 'unusual']
                };

                papers.forEach((paper, index) => {
                    const researchGap = (paper.research_gap_and_motivation?.explicit_limitation_of_prior_work || '').toLowerCase();
                    const contribution = (paper.core_contribution?.contribution_mechanism || '').toLowerCase();
                    const searchText = `${researchGap} ${contribution}`;
                    
                    let bestCategory = 'other';
                    let maxScore = 0;
                    
                    Object.entries(problemCategories).forEach(([category, keywords]) => {
                        const score = keywords.reduce((acc, keyword) => {
                            return acc + (searchText.includes(keyword) ? 1 : 0);
                        }, 0);
                        
                        if (score > maxScore) {
                            maxScore = score;
                            bestCategory = category;
                        }
                    });
                    
                    if (!clusters.has(bestCategory)) {
                        clusters.set(bestCategory, []);
                    }
                    clusters.get(bestCategory).push({paper, index});
                });
                
                return clusters;
            }

            function createMethodologyClusters(papers) {
                const clusters = new Map();
                
                papers.forEach((paper, index) => {
                    const contributionType = paper.core_contribution?.contribution_type || 'Unknown';
                    
                    if (!clusters.has(contributionType)) {
                        clusters.set(contributionType, []);
                    }
                    clusters.get(contributionType).push({paper, index});
                });
                
                return clusters;
            }

            function createImpactClusters(papers) {
                const clusters = new Map();
                
                papers.forEach((paper, index) => {
                    const relevance = paper.classification?.relevance_to_user_goal || 'Unknown';
                    const novelty = paper.nature_of_contribution_and_novelty?.contribution_category || 'Unknown';
                    const clusterKey = `${relevance}_${novelty}`;
                    
                    if (!clusters.has(clusterKey)) {
                        clusters.set(clusterKey, []);
                    }
                    clusters.get(clusterKey).push({paper, index});
                });
                
                return clusters;
            }

            function createHybridClusters(papers) {
                const clusters = new Map();
                
                papers.forEach((paper, index) => {
                    const field = paper.classification?.field || 'Unknown';
                    const contributionType = paper.core_contribution?.contribution_type || 'Unknown';
                    const clusterKey = `${field}_${contributionType}`;
                    
                    if (!clusters.has(clusterKey)) {
                        clusters.set(clusterKey, []);
                    }
                    clusters.get(clusterKey).push({paper, index});
                });
                
                return clusters;
            }

            // Color schemes for different clustering types
            const clusterColorSchemes = {
                semantic: {
                    'data_quality': '#e74c3c', 'scalability': '#3498db', 'robustness': '#2ecc71',
                    'generalization': '#f39c12', 'interpretability': '#9b59b6', 'optimization': '#1abc9c',
                    'real_time': '#e67e22', 'multimodal': '#34495e', 'continual_learning': '#f1c40f',
                    'anomaly_detection': '#95a5a6', 'other': '#7f8c8d'
                },
                methodology: {
                    'Algorithm': '#e74c3c', 'Framework': '#3498db', 'Dataset': '#2ecc71',
                    'Benchmark': '#f39c12', 'Theoretical Analysis': '#9b59b6', 'Unknown': '#95a5a6'
                },
                impact: {
                    'Direct Application_Paradigm Shift': '#27ae60', 'Direct Application_Novel Combination': '#2ecc71',
                    'Direct Application_Incremental Improvement': '#58d68d', 'Potential Application_Paradigm Shift': '#3498db',
                    'Potential Application_Novel Combination': '#5dade2', 'Potential Application_Incremental Improvement': '#85c1e9',
                    'Foundational Knowledge_Paradigm Shift': '#8e44ad', 'Foundational Knowledge_Novel Combination': '#a569bd',
                    'Foundational Knowledge_Incremental Improvement': '#bb8fce'
                },
                hybrid: {
                    'Plain AI_Algorithm': '#e74c3c', 'Plain AI_Framework': '#c0392b', 'Robotics_Algorithm': '#3498db',
                    'Robotics_Framework': '#2980b9', 'AI applied to Time Series Analysis_Algorithm': '#2ecc71',
                    'AI applied to Time Series Analysis_Framework': '#27ae60'
                }
            };

            // Global variables for clustering
            let currentClusterType = 'semantic';
            let allClusters = {
                semantic: createSemanticClusters(data),
                methodology: createMethodologyClusters(data),
                impact: createImpactClusters(data),
                hybrid: createHybridClusters(data)
            };

            // Function to create nodes and edges for a specific clustering type
            function createClusteredGraph(clusterType) {
                const clusters = allClusters[clusterType];
                const colorScheme = clusterColorSchemes[clusterType];
                const newNodes = [];
                const newEdges = [];
                let nodeId = 0;
                let clusterNodeId = 1000;

                clusters.forEach((papers, clusterName) => {
                    if (papers.length === 0) return;
                    
                    // Create cluster center node
                    const clusterDisplayName = clusterName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    newNodes.push({
                        id: clusterNodeId,
                        label: clusterDisplayName,
                        title: `${clusterDisplayName} (${papers.length} papers)`,
                        color: {
                            background: colorScheme[clusterName] || '#95a5a6',
                            border: '#2c3e50'
                        },
                        size: Math.max(30, papers.length * 3),
                        shape: 'box',
                        font: { size: 14, color: 'white', bold: true },
                        borderWidth: 3,
                        isCluster: true,
                        clusterName: clusterName
                    });
                    
                    // Create paper nodes for this cluster
                    papers.forEach(({paper, index}) => {
                        const paperTitle = paper.paper_title_and_link?.title || `Paper ${index + 1}`;
                        const field = paper.classification?.field || 'Unknown';
                        const contributionType = paper.core_contribution?.contribution_type || 'Unknown';
                        const relevance = paper.classification?.relevance_to_user_goal || 'Unknown';
                        const noveltyCategory = paper.nature_of_contribution_and_novelty?.contribution_category || 'Unknown';
                        
                        newNodes.push({
                            id: nodeId,
                            title: paperTitle,
                            field: field,
                            contributionType: contributionType,
                            relevance: relevance,
                            noveltyCategory: noveltyCategory,
                            paperData: paper,
                            clusterName: clusterName,
                            color: {
                                background: colorScheme[clusterName] || '#95a5a6',
                                border: '#2c3e50',
                                highlight: { background: '#f1c40f', border: '#e67e22' }
                            },
                            size: relevance === 'Direct Application' ? 25 :
                                  relevance === 'Potential Application' ? 20 : 15,
                            shape: 'dot',
                            borderWidth: 2
                        });

                        // Create edge from paper to cluster center
                        newEdges.push({
                            from: nodeId,
                            to: clusterNodeId,
                            color: { color: colorScheme[clusterName] || '#95a5a6', opacity: 0.3 },
                            width: 1,
                            length: 100
                        });

                        nodeId++;
                    });
                    
                    clusterNodeId++;
                });
                
                return { nodes: newNodes, edges: newEdges };
            }

            // Create initial graph with semantic clustering
            const initialGraph = createClusteredGraph('semantic');
            nodes.push(...initialGraph.nodes);
            edges.push(...initialGraph.edges);

            // Create the network
            var networkData = {
                nodes: new vis.DataSet(nodes),
                edges: new vis.DataSet(edges)
            };

            var options = {
                nodes: {
                    borderWidth: 2,
                    shadow: {
                        enabled: true,
                        color: 'rgba(0,0,0,0.2)',
                        size: 10,
                        x: 2,
                        y: 2
                    }
                },
                edges: {
                    shadow: {
                        enabled: true,
                        color: 'rgba(0,0,0,0.1)',
                        size: 5,
                        x: 1,
                        y: 1
                    },
                    smooth: {
                        type: 'continuous',
                        roundness: 0.3
                    }
                },
                physics: {
                    enabled: true,
                    forceAtlas2Based: {
                        gravitationalConstant: -50,
                        centralGravity: 0.01,
                        springConstant: 0.08,
                        springLength: 150,
                        damping: 0.4,
                        avoidOverlap: 0.5
                    },
                    maxVelocity: 30,
                    minVelocity: 0.1,
                    solver: 'forceAtlas2Based',
                    stabilization: {
                        enabled: true,
                        iterations: 2000,
                        updateInterval: 50
                    }
                },
                interaction: {
                    hover: true,
                    tooltipDelay: 200,
                    hideEdgesOnDrag: false,
                    hideNodesOnDrag: false
                },
                layout: {
                    improvedLayout: true,
                    clusterThreshold: 150,
                    randomSeed: 42
                }
            };

            var network = new vis.Network(container, networkData, options);

            // Add stabilization logic for initial network
            network.once('stabilizationIterationsDone', () => {
                console.log('Initial network physics stabilized');
                network.fit();
                
                // Disable physics after initial stabilization to prevent constant movement
                setTimeout(() => {
                    network.setOptions({
                        physics: {
                            enabled: false
                        }
                    });
                    console.log('Initial network physics disabled after stabilization');
                }, 500);
            });

            // Fallback timeout for initial network
            setTimeout(() => {
                network.fit();
                network.setOptions({
                    physics: {
                        enabled: false
                    }
                });
                console.log('Initial network fitted and physics disabled (fallback)');
            }, 5000);

            // Add click event for paper cards
            network.on("click", function (params) {
                if (params.nodes.length > 0) {
                    const nodeId = params.nodes[0];
                    const node = networkData.nodes.get(nodeId);
                    
                    if (node && node.paperData) {
                        showPaperCard(node.paperData);
                    }
                }
            });

            // Function to switch clustering type
            window.switchClustering = function(newClusterType) {
                console.log('=== SWITCH CLUSTERING START ===');
                console.log('Current cluster type:', currentClusterType);
                console.log('New cluster type:', newClusterType);
                console.log('Available cluster types:', Object.keys(allClusters));
                
                if (newClusterType === currentClusterType) {
                    console.log('Already using this clustering type, skipping...');
                    return;
                }
                
                currentClusterType = newClusterType;
                console.log('Updated currentClusterType to:', currentClusterType);
                
                // Check if the cluster type exists
                if (!allClusters[newClusterType]) {
                    console.error('Cluster type not found:', newClusterType);
                    return;
                }
                
                console.log('Creating new graph for:', newClusterType);
                console.log('Cluster data:', allClusters[newClusterType]);
                
                const newGraph = createClusteredGraph(newClusterType);
                console.log('New graph created with', newGraph.nodes.length, 'nodes and', newGraph.edges.length, 'edges');
                
                // Update network data
                console.log('Clearing existing network data...');
                networkData.nodes.clear();
                networkData.edges.clear();
                
                console.log('Adding new nodes and edges...');
                networkData.nodes.add(newGraph.nodes);
                networkData.edges.add(newGraph.edges);
                
                // Update stored data for filtering
                window.allNodes = networkData.nodes.get();
                window.allEdges = networkData.edges.get();
                
                console.log('Network data updated. Current node count:', networkData.nodes.length);
                console.log('Network updated, fitting view...');
                
                // Stabilize physics and fit network
                network.setOptions({
                    physics: {
                        enabled: true,
                        stabilization: {
                            enabled: true,
                            iterations: 100,
                            updateInterval: 25
                        }
                    }
                });
                
                // Wait for stabilization then fit and disable physics
                network.once('stabilizationIterationsDone', () => {
                    console.log('Physics stabilized');
                    network.fit();
                    
                    // Disable physics after stabilization to prevent constant movement
                    setTimeout(() => {
                        network.setOptions({
                            physics: {
                                enabled: false
                            }
                        });
                        console.log('Physics disabled after stabilization');
                    }, 500);
                });
                
                // Fallback timeout in case stabilization doesn't complete
                setTimeout(() => {
                    network.fit();
                    network.setOptions({
                        physics: {
                            enabled: false
                        }
                    });
                    console.log('Network fitted and physics disabled (fallback)');
                }, 3000);
            };

            // Add clustering controls and filters
            createClusteringControls();
            createFilters(network, networkData, data);
        })
        .catch(error => {
            console.error('Error loading papers data:', error);
            container.innerHTML = '<div style="text-align: center; padding: 50px; color: #e74c3c;">Error loading papers data. Please check the console for details.</div>';
        });

    function createClusteringControls() {
        // Create clustering controls container
        const clusteringControls = document.createElement('div');
        clusteringControls.id = 'clustering-controls';
        clusteringControls.style.cssText = `
            position: absolute;
            top: 10px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 1px solid #ddd;
            z-index: 1000;
            width: 280px;
        `;

        const title = document.createElement('h4');
        title.textContent = 'Clustering Methods';
        title.style.cssText = `
            margin: 0 0 12px 0;
            color: #2c3e50;
            font-size: 14px;
            font-weight: 600;
        `;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        const clusteringOptions = [
            {
                type: 'semantic',
                label: 'Semantic Clustering',
                description: 'Group papers by similar research gaps and problems they solve'
            },
            {
                type: 'methodology',
                label: 'Methodology Clustering',
                description: 'Group by contribution types and technical approaches'
            },
            {
                type: 'impact',
                label: 'Impact Clustering',
                description: 'Group by relevance level and breakthrough potential'
            },
            {
                type: 'hybrid',
                label: 'Hybrid Field+Contribution Clustering',
                description: 'Create meaningful research area clusters'
            }
        ];

        clusteringOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.label;
            button.title = option.description;
            button.style.cssText = `
                padding: 10px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                background: ${option.type === 'semantic' ? '#3498db' : 'white'};
                color: ${option.type === 'semantic' ? 'white' : '#2c3e50'};
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                text-align: left;
                transition: all 0.2s;
            `;

            button.onmouseover = () => {
                if (option.type !== currentClusterType) {
                    button.style.background = '#f8f9fa';
                }
            };

            button.onmouseout = () => {
                if (option.type !== currentClusterType) {
                    button.style.background = 'white';
                }
            };

            button.onclick = () => {
                console.log('Button clicked for:', option.type);
                
                // Update button styles
                buttonsContainer.querySelectorAll('button').forEach(btn => {
                    btn.style.background = 'white';
                    btn.style.color = '#2c3e50';
                });
                button.style.background = '#3498db';
                button.style.color = 'white';

                // Switch clustering
                if (window.switchClustering) {
                    window.switchClustering(option.type);
                } else {
                    console.error('switchClustering function not found');
                }
            };

            buttonsContainer.appendChild(button);
        });

        clusteringControls.appendChild(title);
        clusteringControls.appendChild(buttonsContainer);

        // Add to network container
        const networkContainer = document.getElementById('mynetwork');
        networkContainer.appendChild(clusteringControls);
    }

    function createFilters(network, networkData, originalData) {
        // Get unique field values
        const uniqueFields = [...new Set(originalData.map(paper =>
            paper.classification && paper.classification.field
                ? paper.classification.field
                : 'Unknown'
        ))].sort();

        // Get unique contribution type values
        const uniqueContributionTypes = [...new Set(originalData.map(paper =>
            paper.core_contribution && paper.core_contribution.contribution_type
                ? paper.core_contribution.contribution_type
                : 'Unknown'
        ))].sort();

        // Get unique relevance values
        const uniqueRelevance = [...new Set(originalData.map(paper =>
            paper.classification && paper.classification.relevance_to_user_goal
                ? paper.classification.relevance_to_user_goal
                : 'Unknown'
        ))].sort();

        // Get unique novelty category values
        const uniqueNoveltyCategories = [...new Set(originalData.map(paper =>
            paper.nature_of_contribution_and_novelty && paper.nature_of_contribution_and_novelty.contribution_category
                ? paper.nature_of_contribution_and_novelty.contribution_category
                : 'Unknown'
        ))].sort();

        // Create filter container
        const filterContainer = document.createElement('div');
        filterContainer.id = 'filters-container';
        filterContainer.style.cssText = `
            position: absolute;
            top: 10px;
            left: 10px;
            background: white;
            padding: 10px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            border: 1px solid #ddd;
            z-index: 1000;
            width: 180px;
            max-height: 80vh;
            overflow-y: auto;
        `;

        // Create field filter
        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = 'Filter by Field:';
        fieldLabel.style.cssText = `
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
            color: #2c3e50;
            font-size: 12px;
        `;

        const fieldSelect = document.createElement('select');
        fieldSelect.id = 'fieldSelect';
        fieldSelect.style.cssText = `
            padding: 6px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            font-size: 12px;
            width: 100%;
            margin-bottom: 10px;
        `;

        // Add "All Fields" option
        const allFieldsOption = document.createElement('option');
        allFieldsOption.value = 'all';
        allFieldsOption.textContent = 'All Fields';
        fieldSelect.appendChild(allFieldsOption);

        // Add field options
        uniqueFields.forEach(field => {
            const option = document.createElement('option');
            option.value = field;
            option.textContent = field;
            fieldSelect.appendChild(option);
        });

        // Create contribution type filter
        const contributionLabel = document.createElement('label');
        contributionLabel.textContent = 'Filter by Contribution:';
        contributionLabel.style.cssText = `
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
            color: #2c3e50;
            font-size: 12px;
        `;

        const contributionSelect = document.createElement('select');
        contributionSelect.id = 'contributionSelect';
        contributionSelect.style.cssText = `
            padding: 6px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            font-size: 12px;
            width: 100%;
        `;

        // Add "All Contributions" option
        const allContributionsOption = document.createElement('option');
        allContributionsOption.value = 'all';
        allContributionsOption.textContent = 'All Contributions';
        contributionSelect.appendChild(allContributionsOption);

        // Add contribution type options
        uniqueContributionTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            contributionSelect.appendChild(option);
        });

        // Create relevance filter
        const relevanceLabel = document.createElement('label');
        relevanceLabel.textContent = 'Filter by Relevance:';
        relevanceLabel.style.cssText = `
            display: block;
            margin-bottom: 6px;
            margin-top: 10px;
            font-weight: bold;
            color: #2c3e50;
            font-size: 12px;
        `;

        const relevanceSelect = document.createElement('select');
        relevanceSelect.id = 'relevanceSelect';
        relevanceSelect.style.cssText = `
            padding: 6px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            font-size: 12px;
            width: 100%;
            margin-bottom: 10px;
        `;

        // Add "All Relevance" option
        const allRelevanceOption = document.createElement('option');
        allRelevanceOption.value = 'all';
        allRelevanceOption.textContent = 'All Relevance';
        relevanceSelect.appendChild(allRelevanceOption);

        // Add relevance options
        uniqueRelevance.forEach(relevance => {
            const option = document.createElement('option');
            option.value = relevance;
            option.textContent = relevance;
            relevanceSelect.appendChild(option);
        });

        // Create novelty category filter
        const noveltyLabel = document.createElement('label');
        noveltyLabel.textContent = 'Filter by Novelty:';
        noveltyLabel.style.cssText = `
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
            color: #2c3e50;
            font-size: 12px;
        `;

        const noveltySelect = document.createElement('select');
        noveltySelect.id = 'noveltySelect';
        noveltySelect.style.cssText = `
            padding: 6px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            font-size: 12px;
            width: 100%;
            margin-bottom: 10px;
        `;

        // Add "All Novelty" option
        const allNoveltyOption = document.createElement('option');
        allNoveltyOption.value = 'all';
        allNoveltyOption.textContent = 'All Novelty';
        noveltySelect.appendChild(allNoveltyOption);

        // Add novelty category options
        uniqueNoveltyCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            noveltySelect.appendChild(option);
        });

        // Create keyword filter
        const keywordLabel = document.createElement('label');
        keywordLabel.textContent = 'Filter by Keywords:';
        keywordLabel.style.cssText = `
            display: block;
            margin-bottom: 6px;
            margin-top: 10px;
            font-weight: bold;
            color: #2c3e50;
            font-size: 12px;
        `;

        const keywordInput = document.createElement('input');
        keywordInput.type = 'text';
        keywordInput.placeholder = 'Add keyword...';
        keywordInput.style.cssText = `
            padding: 6px 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
            font-size: 12px;
            width: calc(100% - 16px);
            margin-bottom: 8px;
        `;

        // Create keywords container
        const keywordsContainer = document.createElement('div');
        keywordsContainer.id = 'keywords-container';
        keywordsContainer.style.cssText = `
            min-height: 30px;
            margin-bottom: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        `;

        // Create suggested keywords container
        const suggestedContainer = document.createElement('div');
        suggestedContainer.style.cssText = `
            margin-bottom: 8px;
        `;

        const suggestedLabel = document.createElement('div');
        suggestedLabel.textContent = 'Suggested:';
        suggestedLabel.style.cssText = `
            font-size: 10px;
            color: #666;
            margin-bottom: 4px;
        `;

        const suggestedKeywords = document.createElement('div');
        suggestedKeywords.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
        `;

        // Generate random keywords from subfields
        function generateSuggestedKeywords() {
            const allSubfields = originalData.map(paper =>
                paper.classification?.subfield_granular || ''
            ).filter(subfield => subfield);

            // Extract words from subfields
            const words = new Set();
            allSubfields.forEach(subfield => {
                const subfieldWords = subfield.split(/[\s&:,\-\(\)]+/)
                    .filter(word => word.length > 3)
                    .map(word => word.toLowerCase());
                subfieldWords.forEach(word => words.add(word));
            });

            // Get random 6 words
            const wordArray = Array.from(words);
            const randomWords = [];
            for (let i = 0; i < Math.min(6, wordArray.length); i++) {
                const randomIndex = Math.floor(Math.random() * wordArray.length);
                const word = wordArray[randomIndex];
                if (!randomWords.includes(word)) {
                    randomWords.push(word);
                }
            }
            return randomWords;
        }

        // Store active keywords
        let activeKeywords = [];

        // Function to create keyword tag
        function createKeywordTag(keyword, isActive = false) {
            const tag = document.createElement('span');
            tag.textContent = keyword;
            tag.style.cssText = `
                display: inline-block;
                padding: 2px 6px;
                background: ${isActive ? '#667eea' : '#e9ecef'};
                color: ${isActive ? 'white' : '#495057'};
                border-radius: 12px;
                font-size: 10px;
                cursor: pointer;
                user-select: none;
                transition: all 0.2s;
            `;

            if (isActive) {
                // Add remove functionality for active keywords
                tag.innerHTML = `${keyword} ×`;
                tag.onclick = () => {
                    activeKeywords = activeKeywords.filter(k => k !== keyword);
                    updateKeywordDisplay();
                    applyFilters();
                };
            } else {
                // Add click functionality for suggested keywords
                tag.onclick = () => {
                    if (!activeKeywords.includes(keyword)) {
                        activeKeywords.push(keyword);
                        updateKeywordDisplay();
                        applyFilters();
                    }
                };
                tag.onmouseover = () => tag.style.background = '#dee2e6';
                tag.onmouseout = () => tag.style.background = '#e9ecef';
            }

            return tag;
        }

        // Function to update keyword display
        function updateKeywordDisplay() {
            // Clear containers
            keywordsContainer.innerHTML = '';
            suggestedKeywords.innerHTML = '';

            // Add active keywords
            activeKeywords.forEach(keyword => {
                keywordsContainer.appendChild(createKeywordTag(keyword, true));
            });

            // Add suggested keywords (excluding active ones)
            const suggested = generateSuggestedKeywords();
            suggested.forEach(keyword => {
                if (!activeKeywords.includes(keyword)) {
                    suggestedKeywords.appendChild(createKeywordTag(keyword, false));
                }
            });
        }

        // Handle keyword input
        keywordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = keywordInput.value.trim().toLowerCase();
                if (keyword && !activeKeywords.includes(keyword)) {
                    activeKeywords.push(keyword);
                    keywordInput.value = '';
                    updateKeywordDisplay();
                    applyFilters();
                }
            }
        });

        // Add elements to container
        filterContainer.appendChild(fieldLabel);
        filterContainer.appendChild(fieldSelect);
        filterContainer.appendChild(contributionLabel);
        filterContainer.appendChild(contributionSelect);
        filterContainer.appendChild(relevanceLabel);
        filterContainer.appendChild(relevanceSelect);
        filterContainer.appendChild(noveltyLabel);
        filterContainer.appendChild(noveltySelect);
        filterContainer.appendChild(keywordLabel);
        filterContainer.appendChild(keywordInput);
        filterContainer.appendChild(keywordsContainer);
        filterContainer.appendChild(suggestedContainer);
        suggestedContainer.appendChild(suggestedLabel);
        suggestedContainer.appendChild(suggestedKeywords);
        
        // Add to the network container
        const networkContainer = document.getElementById('mynetwork');
        networkContainer.style.position = 'relative';
        networkContainer.appendChild(filterContainer);

        // Store original nodes and edges for filtering
        const allNodes = networkData.nodes.get();
        const allEdges = networkData.edges.get();

        // Filter function
        function applyFilters() {
            const selectedField = fieldSelect.value;
            const selectedContribution = contributionSelect.value;
            const selectedRelevance = relevanceSelect.value;
            const selectedNovelty = noveltySelect.value;
            
            // Separate paper nodes from cluster nodes
            const paperNodes = allNodes.filter(node => !node.isCluster);
            const clusterNodes = allNodes.filter(node => node.isCluster);
            
            let filteredPaperNodes = paperNodes;
            
            // Apply field filter
            if (selectedField !== 'all') {
                filteredPaperNodes = filteredPaperNodes.filter(node => node.field === selectedField);
            }
            
            // Apply contribution type filter
            if (selectedContribution !== 'all') {
                filteredPaperNodes = filteredPaperNodes.filter(node => node.contributionType === selectedContribution);
            }

            // Apply relevance filter
            if (selectedRelevance !== 'all') {
                filteredPaperNodes = filteredPaperNodes.filter(node => node.relevance === selectedRelevance);
            }

            // Apply novelty category filter
            if (selectedNovelty !== 'all') {
                filteredPaperNodes = filteredPaperNodes.filter(node => node.noveltyCategory === selectedNovelty);
            }

            // Apply keyword filter
            if (activeKeywords.length > 0) {
                filteredPaperNodes = filteredPaperNodes.filter(node => {
                    const paper = node.paperData;
                    if (!paper) return false;

                    const title = (paper.paper_title_and_link?.title || '').toLowerCase();
                    const subfield = (paper.classification?.subfield_granular || '').toLowerCase();
                    const searchText = `${title} ${subfield}`;

                    return activeKeywords.some(keyword =>
                        searchText.includes(keyword.toLowerCase())
                    );
                });
            }
            
            // Find which clusters have visible papers
            const activeClusters = new Set(filteredPaperNodes.map(node => node.clusterName));
            const visibleClusterNodes = clusterNodes.filter(node => activeClusters.has(node.clusterName));
            
            // Update cluster node labels to show count
            visibleClusterNodes.forEach(clusterNode => {
                const paperCount = filteredPaperNodes.filter(node => node.clusterName === clusterNode.clusterName).length;
                const clusterDisplayName = clusterNode.clusterName.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                clusterNode.label = clusterDisplayName;
                clusterNode.title = `${clusterDisplayName} (${paperCount} papers)`;
                clusterNode.size = Math.max(30, paperCount * 3);
            });
            
            // Combine filtered papers with visible clusters
            const allVisibleNodes = [...filteredPaperNodes, ...visibleClusterNodes];
            
            // Filter edges to only show connections between visible nodes
            const visibleNodeIds = new Set(allVisibleNodes.map(node => node.id));
            const visibleEdges = allEdges.filter(edge =>
                visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to)
            );
            
            // Update network
            networkData.nodes.clear();
            networkData.nodes.add(allVisibleNodes);
            networkData.edges.clear();
            networkData.edges.add(visibleEdges);
            
            // Fit the network to show all visible nodes
            setTimeout(() => network.fit(), 100);
        }

        // Initialize keyword display
        updateKeywordDisplay();

        // Make applyFilters globally accessible
        window.applyFilters = applyFilters;

        // Add change event listeners
        fieldSelect.addEventListener('change', applyFilters);
        contributionSelect.addEventListener('change', applyFilters);
        relevanceSelect.addEventListener('change', applyFilters);
        noveltySelect.addEventListener('change', applyFilters);
    }

    function showPaperCard(paper) {
        // Remove existing card if any
        const existingCard = document.getElementById('paper-card');
        if (existingCard) {
            existingCard.remove();
        }

        // Create card container
        const card = document.createElement('div');
        card.id = 'paper-card';
        card.style.cssText = `
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 450px;
            max-height: 70vh;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border: none;
            z-index: 1001;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Create card header
        const header = document.createElement('div');
        header.style.cssText = `
            background: white;
            padding: 24px 24px 16px 24px;
            position: relative;
            border-bottom: 1px solid #f0f0f0;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: #f8f9fa;
            border: none;
            color: #6c757d;
            font-size: 20px;
            cursor: pointer;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        `;
        closeBtn.onmouseover = () => {
            closeBtn.style.backgroundColor = '#e9ecef';
            closeBtn.style.color = '#495057';
        };
        closeBtn.onmouseout = () => {
            closeBtn.style.backgroundColor = '#f8f9fa';
            closeBtn.style.color = '#6c757d';
        };
        closeBtn.onclick = () => card.remove();

        const title = document.createElement('h2');
        title.textContent = paper.paper_title_and_link?.title || 'Untitled Paper';
        title.style.cssText = `
            margin: 0;
            padding-right: 50px;
            font-size: 20px;
            line-height: 1.4;
            font-weight: 700;
            color: #1a1a1a;
            letter-spacing: -0.02em;
        `;

        // Add classification badges
        const badgesContainer = document.createElement('div');
        badgesContainer.style.cssText = `
            margin-top: 12px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        `;

        if (paper.classification?.field) {
            const fieldBadge = document.createElement('span');
            fieldBadge.textContent = paper.classification.field;
            fieldBadge.style.cssText = `
                background: #e3f2fd;
                color: #1565c0;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            `;
            badgesContainer.appendChild(fieldBadge);
        }

        if (paper.core_contribution?.contribution_type) {
            const typeBadge = document.createElement('span');
            typeBadge.textContent = paper.core_contribution.contribution_type;
            typeBadge.style.cssText = `
                background: #f3e5f5;
                color: #7b1fa2;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            `;
            badgesContainer.appendChild(typeBadge);
        }

        header.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(badgesContainer);

        // Create scrollable content
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 24px;
            max-height: calc(70vh - 140px);
            overflow-y: auto;
            font-size: 15px;
            line-height: 1.6;
            color: #374151;
        `;

        // Add paper link if available
        if (paper.paper_title_and_link?.link) {
            const linkButton = document.createElement('a');
            linkButton.href = paper.paper_title_and_link.link;
            linkButton.target = '_blank';
            linkButton.innerHTML = '📄 Read Full Paper';
            linkButton.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #4f46e5;
                color: white;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 14px;
                margin-bottom: 24px;
                transition: all 0.2s;
            `;
            linkButton.onmouseover = () => linkButton.style.background = '#4338ca';
            linkButton.onmouseout = () => linkButton.style.background = '#4f46e5';
            
            content.appendChild(linkButton);
        }

        // Create clean content sections
        const sections = [
            {
                title: 'Research Context',
                content: paper.research_gap_and_motivation?.explicit_limitation_of_prior_work,
                icon: '🎯'
            },
            {
                title: 'Core Contribution',
                content: paper.core_contribution?.contribution_mechanism,
                icon: '💡'
            },
            {
                title: 'Key Results',
                content: paper.key_results_and_strength_of_evidence?.quantitative_results,
                icon: '📊'
            },
            {
                title: 'Research Impact',
                content: paper.research_gap_and_motivation?.broader_impact_of_solving_it,
                icon: '🌟'
            }
        ];

        sections.forEach(section => {
            if (section.content) {
                const sectionDiv = document.createElement('div');
                sectionDiv.style.cssText = `
                    margin-bottom: 24px;
                `;

                const sectionTitle = document.createElement('h3');
                sectionTitle.innerHTML = `${section.icon} ${section.title}`;
                sectionTitle.style.cssText = `
                    margin: 0 0 12px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #111827;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                `;

                const sectionContent = document.createElement('p');
                sectionContent.textContent = section.content;
                sectionContent.style.cssText = `
                    margin: 0;
                    line-height: 1.7;
                    color: #4b5563;
                `;

                sectionDiv.appendChild(sectionTitle);
                sectionDiv.appendChild(sectionContent);
                content.appendChild(sectionDiv);
            }
        });

        // Add PhD questions if available
        if (paper.limitations_and_open_questions?.resulting_phd_questions?.length > 0) {
            const questionsDiv = document.createElement('div');
            questionsDiv.style.cssText = `
                margin-top: 24px;
                padding: 20px;
                background: #f9fafb;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
            `;

            const questionsTitle = document.createElement('h3');
            questionsTitle.innerHTML = '🔬 Future Research Directions';
            questionsTitle.style.cssText = `
                margin: 0 0 16px 0;
                font-size: 16px;
                font-weight: 600;
                color: #111827;
                display: flex;
                align-items: center;
                gap: 8px;
            `;

            const questionsList = document.createElement('div');
            questionsList.style.cssText = `
                display: flex;
                flex-direction: column;
                gap: 12px;
            `;

            paper.limitations_and_open_questions.resulting_phd_questions.forEach((question, index) => {
                const questionItem = document.createElement('div');
                questionItem.style.cssText = `
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                `;

                const questionNumber = document.createElement('span');
                questionNumber.textContent = `${index + 1}.`;
                questionNumber.style.cssText = `
                    color: #6b7280;
                    font-weight: 600;
                    min-width: 20px;
                `;

                const questionText = document.createElement('p');
                questionText.textContent = question;
                questionText.style.cssText = `
                    margin: 0;
                    line-height: 1.6;
                    color: #374151;
                `;

                questionItem.appendChild(questionNumber);
                questionItem.appendChild(questionText);
                questionsList.appendChild(questionItem);
            });

            questionsDiv.appendChild(questionsTitle);
            questionsDiv.appendChild(questionsList);
            content.appendChild(questionsDiv);
        }

        // Assemble card
        card.appendChild(header);
        card.appendChild(content);

        // Add to network container
        const networkContainer = document.getElementById('mynetwork');
        networkContainer.appendChild(card);

        // Add smooth entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(-50%) translateX(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(-50%) translateX(0)';
        }, 10);
    }
});