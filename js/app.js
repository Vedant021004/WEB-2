/* ==========================================================================
   VEDANT KAPIL — EDITORIAL AI ENGINEERING PORTFOLIO LOGIC
   With Cyber Ant Crawling Animation, Eye Tracking, Eye Blink & Progress Dashboard
   ========================================================================== */

let soundEnabled = false;
let isAntAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Audio Toggle
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
            if (soundEnabled) playClickSound(600, 0.05);
        });
    }

    // 3. Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.remove('ai-vision-mode');
            document.body.classList.toggle('theme-dark');
            const isDark = document.body.classList.contains('theme-dark');
            const toggleText = themeToggleBtn.querySelector('.toggle-text');
            if (toggleText) {
                toggleText.textContent = isDark ? 'DARK' : 'MODE';
            }
            if (soundEnabled) playClickSound(400, 0.08);
            renderEcosystemGraph();
        });
    }

    // 4. Standard Eye Pupil Cursor Motion Tracking
    const heroPupils = document.querySelectorAll('.title---eye-pupils');
    const nodePupils = document.querySelectorAll('.inner-pupil');

    document.addEventListener('mousemove', (e) => {
        if (isAntAnimating) return; // Ant animation takes over pupil tracking during crawl!

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        heroPupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;
            const angle = Math.atan2(mouseY - pupilY, mouseX - pupilX);
            const distance = Math.min(14, Math.hypot(mouseX - pupilX, mouseY - pupilY) / 15);
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        nodePupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;
            const angle = Math.atan2(mouseY - pupilY, mouseX - pupilX);
            const distance = Math.min(10, Math.hypot(mouseX - pupilX, mouseY - pupilY) / 20);
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // 5. Section Accordion Toggles
    const titleBars = document.querySelectorAll('.section-title-bar');
    titleBars.forEach(bar => {
        bar.addEventListener('click', (e) => {
            if (e.target.closest('.expanding-letter-pill')) return;

            const targetId = bar.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isActive = bar.classList.contains('active');
                bar.classList.toggle('active');
                targetContent.classList.toggle('active');

                if (soundEnabled) playClickSound(isActive ? 300 : 500, 0.06);

                if (window.gsap && targetContent && !isActive) {
                    gsap.fromTo(targetContent, 
                        { opacity: 0, y: -15 }, 
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                }
            }
        });
    });

    // 6. Thinking Section Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
                if (soundEnabled) playClickSound(550, 0.04);
                if (window.gsap) {
                    gsap.fromTo(targetPane, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.4 });
                }
            }
        });
    });

    // 7. Systems Diagram Toggle Buttons
    const sysButtons = document.querySelectorAll('.sys-toggle-btn');
    const diagramViews = document.querySelectorAll('.diagram-view');
    sysButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('run-sim-btn')) return;

            sysButtons.forEach(b => { if (!b.classList.contains('run-sim-btn')) b.classList.remove('active'); });
            diagramViews.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');
            const diagramType = btn.getAttribute('data-diagram');
            const targetDiag = document.getElementById(`diag-${diagramType}`);
            if (targetDiag) {
                targetDiag.classList.add('active');
                if (soundEnabled) playClickSound(500, 0.05);
                if (window.gsap) {
                    gsap.fromTo(targetDiag, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.4 });
                }
            }
        });
    });

    // 8. Ecosystem Canvas
    initEcosystemCanvas();
});

/* ==========================================================================
   INTERACTIVE EYE CLICK -> CYBER ANT CRAWL, EYE BLINK & PROGRESS UNLOCK
   ========================================================================== */
function triggerEyeVisionMode(e) {
    if (e) e.stopPropagation();

    document.body.classList.toggle('ai-vision-mode');
    const isVision = document.body.classList.contains('ai-vision-mode');
    const banner = document.getElementById('aiVisionBanner');
    const statusText = document.getElementById('headerStatusText');
    const progressPanel = document.getElementById('liveProgressPanel');

    if (banner && isVision) {
        banner.classList.add('active');
        setTimeout(() => banner.classList.remove('active'), 3500);
    }

    if (statusText) {
        statusText.textContent = isVision ? '🐜 ANTIGRAVITY INJECTED // REASONING ACTIVE' : 'AGENTIC SYSTEM // ONLINE';
    }

    // Play futuristic audio sound
    playFuturisticVisionSound();
    renderEcosystemGraph();

    if (isVision) {
        // Run Cyber Ant Crawling & Eye Tracking Animation
        animateCyberAntCrawl();
    } else {
        if (progressPanel) progressPanel.classList.remove('active');
    }
}

function animateCyberAntCrawl() {
    const antWrapper = document.getElementById('cyberAntWrapper');
    const eyeVedant = document.getElementById('heroEyeVedant');
    const eyeWhitesVedant = document.getElementById('eyeWhitesVedant');
    const eyePupilVedant = document.getElementById('eyePupilVedant');
    const eyePupilKapil = document.getElementById('eyePupilKapil');
    const progressPanel = document.getElementById('liveProgressPanel');

    if (!antWrapper || !eyeVedant) return;

    isAntAnimating = true;

    // Get Target Eye Center Position
    const eyeRect = eyeVedant.getBoundingClientRect();
    const targetX = eyeRect.left + eyeRect.width / 2;
    const targetY = eyeRect.top + eyeRect.height / 2;

    // Reset Ant to Left Screen Edge
    antWrapper.style.display = 'flex';
    antWrapper.style.left = '-150px';
    antWrapper.style.top = `${targetY - 20}px`;
    antWrapper.style.opacity = '1';

    let currentX = -150;
    const speed = (targetX + 150) / 100; // 100 steps animation

    function stepCrawl() {
        currentX += speed;
        antWrapper.style.left = `${currentX}px`;

        // Eyes Follow Ant Position!
        const antX = currentX + 20;
        const antY = targetY;

        [eyePupilVedant, eyePupilKapil].forEach(pupil => {
            if (pupil) {
                const pRect = pupil.getBoundingClientRect();
                const pX = pRect.left + pRect.width / 2;
                const pY = pRect.top + pRect.height / 2;
                const angle = Math.atan2(antY - pY, antX - pX);
                const distance = Math.min(14, Math.hypot(antX - pX, antY - pY) / 15);
                pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            }
        });

        if (currentX < targetX - 25) {
            requestAnimationFrame(stepCrawl);
        } else {
            // Ant reaches Eye! Absorb Ant & Double Blink Eye!
            if (window.gsap) {
                gsap.to(antWrapper, {
                    scale: 0.1,
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () => {
                        antWrapper.style.display = 'none';
                        antWrapper.style.scale = '1';

                        // Eye Double Blink!
                        if (eyeWhitesVedant) {
                            eyeWhitesVedant.classList.add('blinking');
                            if (soundEnabled) playClickSound(900, 0.15);

                            setTimeout(() => {
                                eyeWhitesVedant.classList.remove('blinking');
                                isAntAnimating = false;

                                // Unlock & Reveal Current Work Progress Dashboard!
                                if (progressPanel) {
                                    progressPanel.classList.add('active');
                                    progressPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                }
                            }, 600);
                        }
                    }
                });
            }
        }
    }

    requestAnimationFrame(stepCrawl);
}

function playFuturisticVisionSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        const frequencies = [523.25, 659.25, 783.99, 1046.50];
        frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.08);
            osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
        });
    } catch (err) { console.error(err); }
}

function playClickSound(freq = 440, duration = 0.05) {
    if (!soundEnabled) return;
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) { console.error(e); }
}

/* ==========================================================================
   LIVE AGENTIC DAG SIMULATION (SYSTEMS SECTION)
   ========================================================================== */
function runLiveAgentSimulation() {
    const nodes = ['node-input', 'node-router', 'node-tool', 'node-eval', 'node-output'];
    const captions = [
        "1/5 📥 User Query Ingested: 'Analyze quarterly SQL sales metrics & generate chart.'",
        "2/5 🧠 Supervisor Agent Routing: Assessing intent... Selected tool: [SQL_Sandbox_Runner].",
        "3/5 ⚡ Action Executing: Executing SQL query against sandboxed database cluster...",
        "4/5 🔍 Evaluator Validating: Checking response completeness... Syntax verified 100%.",
        "5/5 ✅ Output Grounded: Result synthesized with dynamic chart configuration! Latency: 42ms."
    ];

    const captionElem = document.getElementById('nodeCaption');
    let step = 0;

    nodes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('node-active-sim');
    });

    function nextStep() {
        if (step > 0) {
            const prevEl = document.getElementById(nodes[step - 1]);
            if (prevEl) prevEl.classList.remove('node-active-sim');
        }

        if (step < nodes.length) {
            const curEl = document.getElementById(nodes[step]);
            if (curEl) curEl.classList.add('node-active-sim');
            if (captionElem) captionElem.innerHTML = `<strong>SIMULATION:</strong> ${captions[step]}`;
            if (soundEnabled) playClickSound(300 + step * 100, 0.1);
            step++;
            setTimeout(nextStep, 900);
        } else {
            if (captionElem) captionElem.innerHTML = "🎉 <strong>SIMULATION COMPLETE:</strong> Agentic loop executed successfully with zero errors!";
        }
    }

    nextStep();
}

/* ==========================================================================
   INTERACTIVE ASK VK-AI COPILOT TERMINAL
   ========================================================================== */
function toggleVkAiTerminal() {
    const modal = document.getElementById('vkTerminalModal');
    if (modal) {
        modal.classList.toggle('active');
        if (soundEnabled) playClickSound(500, 0.08);
    }
}

function sendTerminalPrompt(text) {
    const input = document.getElementById('terminalInput');
    if (input) {
        input.value = text;
        sendTerminalMessage();
    }
}

function handleTerminalKeyPress(e) {
    if (e.key === 'Enter') {
        sendTerminalMessage();
    }
}

function sendTerminalMessage() {
    const input = document.getElementById('terminalInput');
    const container = document.getElementById('terminalMessages');
    if (!input || !container) return;

    const userText = input.value.trim();
    if (!userText) return;

    const userDiv = document.createElement('div');
    userDiv.className = 'term-msg user-msg';
    userDiv.textContent = userText;
    container.appendChild(userDiv);

    input.value = '';
    container.scrollTop = container.scrollHeight;

    if (soundEnabled) playClickSound(700, 0.03);

    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'term-msg bot-msg';
        botDiv.innerHTML = `<strong>VK-AI:</strong> ${generateCopilotResponse(userText)}`;
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
        if (soundEnabled) playClickSound(450, 0.06);
    }, 400);
}

function generateCopilotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        return "Vedant specializes in Machine Learning, Deep Learning, LLMs, Agentic AI (LangChain & LangGraph), RAG, FastAPI microservices, MLOps, and Cloud AI infrastructure.";
    } else if (q.includes('rag') || q.includes('amazon')) {
        return "Vedant's Amazon Product RAG engine uses Hybrid Retrieval (Dense Vector + BM25 Sparse) paired with Cohere cross-encoder re-ranking, indexing over 100K+ catalog items with +42% search relevance.";
    } else if (q.includes('copilot') || q.includes('data analyst')) {
        return "The AI Data Analyst Copilot is built on LangGraph with stateful cyclic self-correction. It converts natural language into SQL, runs sandboxed validation, and achieves 98.4% accuracy.";
    } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
        return "You can reach Vedant directly via email at <strong>vedantkapil.ai@gmail.com</strong> or via LinkedIn/GitHub links on this site!";
    } else {
        return "Vedant is an AI Engineer dedicated to building deterministic reliability into non-deterministic AI intelligence. Feel free to explore his Systems visualizer and project blueprints!";
    }
}

/* ==========================================================================
   INTERACTIVE TECHNOLOGY ECOSYSTEM CANVAS
   ========================================================================== */
const techNodesData = [
    { id: 'ml', label: 'Machine Learning', category: 'Core ML', x: 0.25, y: 0.35, connects: ['dl', 'llm', 'fastapi', 'cloud'] },
    { id: 'dl', label: 'Deep Learning', category: 'Core ML', x: 0.45, y: 0.25, connects: ['llm', 'rag', 'ml'] },
    { id: 'llm', label: 'LLMs', category: 'AI Models', x: 0.55, y: 0.45, connects: ['agentic', 'langchain', 'langgraph', 'rag'] },
    { id: 'agentic', label: 'Agentic AI', category: 'Orchestration', x: 0.70, y: 0.30, connects: ['langgraph', 'langchain', 'fastapi'] },
    { id: 'langchain', label: 'LangChain', category: 'Framework', x: 0.40, y: 0.65, connects: ['llm', 'rag', 'agentic'] },
    { id: 'langgraph', label: 'LangGraph', category: 'Framework', x: 0.65, y: 0.65, connects: ['agentic', 'llm', 'fastapi'] },
    { id: 'rag', label: 'RAG', category: 'Search Engine', x: 0.30, y: 0.55, connects: ['llm', 'langchain', 'dl', 'fastapi'] },
    { id: 'fastapi', label: 'FastAPI', category: 'Infrastructure', x: 0.50, y: 0.80, connects: ['mlops', 'agentic', 'cloud'] },
    { id: 'mlops', label: 'MLOps', category: 'Operations', x: 0.75, y: 0.75, connects: ['fastapi', 'cloud', 'ml'] },
    { id: 'cloud', label: 'Cloud', category: 'Infrastructure', x: 0.85, y: 0.50, connects: ['mlops', 'fastapi', 'ml'] }
];

const techDescriptions = {
    'ml': 'Classical & Ensemble Machine Learning algorithms for tabular prediction, feature engineering, and data pipeline modeling.',
    'dl': 'Deep neural network architectures (CNNs, Transformers, ResNets) engineered for computer vision and complex time-series forecasting.',
    'llm': 'State-of-the-art Large Language Model prompt engineering, fine-tuning, structured output parsing, and context optimization.',
    'agentic': 'Autonomous multi-agent architectures capable of reasoning, planning, tool usage, and iterative self-correction.',
    'langchain': 'Building enterprise chains, document loaders, vector store integrations, and memory management abstractions.',
    'langgraph': 'Stateful, cyclic multi-agent graph execution for complex production AI workflows requiring state persistence and human-in-the-loop validation.',
    'rag': 'Hybrid Retrieval-Augmented Generation combining sparse BM25 search with dense vector embeddings and cross-encoder re-ranking.',
    'fastapi': 'Asynchronous Python web microservices serving low-latency model inference endpoints with automatic OpenAPI documentation.',
    'mlops': 'Production model monitoring, CI/CD pipeline automation, evaluation harnesses, and containerized model serving.',
    'cloud': 'Cloud-native AI deployment across AWS/GCP, GPU node provisioning, serverless microservices, and scalable database backends.'
};

let activeNodeId = 'agentic';

function initEcosystemCanvas() {
    const canvas = document.getElementById('ecosystemCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        draw();
    }

    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const isVision = document.body.classList.contains('ai-vision-mode');
        const isDark = document.body.classList.contains('theme-dark') || isVision;
        const nodeColor = isVision ? '#38BDF8' : (isDark ? '#F5F4F0' : '#000000');
        const lineBaseColor = isVision ? 'rgba(56, 189, 248, 0.25)' : (isDark ? 'rgba(245, 244, 240, 0.15)' : 'rgba(0, 0, 0, 0.15)');
        const lineActiveColor = isVision ? '#22C55E' : (isDark ? '#E2B859' : '#000000');

        techNodesData.forEach(node => {
            const nodeX = node.x * width;
            const nodeY = node.y * height;

            node.connects.forEach(targetId => {
                const targetNode = techNodesData.find(n => n.id === targetId);
                if (targetNode) {
                    const targetX = targetNode.x * width;
                    const targetY = targetNode.y * height;
                    const isConnectedToActive = (node.id === activeNodeId || targetId === activeNodeId);

                    ctx.beginPath();
                    ctx.moveTo(nodeX, nodeY);
                    ctx.lineTo(targetX, targetY);
                    ctx.strokeStyle = isConnectedToActive ? lineActiveColor : lineBaseColor;
                    ctx.lineWidth = isConnectedToActive ? 2.5 : 1;
                    ctx.stroke();
                }
            });
        });

        techNodesData.forEach(node => {
            const nodeX = node.x * width;
            const nodeY = node.y * height;
            const isActive = (node.id === activeNodeId);

            ctx.beginPath();
            ctx.arc(nodeX, nodeY, isActive ? 12 : 8, 0, Math.PI * 2);
            ctx.fillStyle = isActive ? (isVision ? '#22C55E' : (isDark ? '#E2B859' : '#000000')) : (isDark ? '#1A1D24' : '#FAF6EE');
            ctx.fill();
            ctx.strokeStyle = nodeColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = `${isActive ? 'bold 14px' : '500 12px'} "JetBrains Mono", monospace`;
            ctx.fillStyle = nodeColor;
            ctx.fillText(node.label, nodeX + 16, nodeY + 4);
        });
    }

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        techNodesData.forEach(node => {
            const nodeX = node.x * width;
            const nodeY = node.y * height;
            const dist = Math.hypot(clickX - nodeX, clickY - nodeY);

            if (dist < 25) {
                activeNodeId = node.id;
                updateTechDetailCard(node);
                draw();
                if (soundEnabled) playClickSound(650, 0.04);
            }
        });
    });

    const defaultNode = techNodesData.find(n => n.id === activeNodeId);
    if (defaultNode) updateTechDetailCard(defaultNode);
}

function updateTechDetailCard(node) {
    const cardTitle = document.getElementById('techCardTitle');
    const cardDesc = document.getElementById('techCardDesc');
    const cardConn = document.getElementById('techCardConn');

    if (cardTitle) cardTitle.textContent = `${node.label} [${node.category}]`;
    if (cardDesc) cardDesc.textContent = techDescriptions[node.id] || '';

    if (cardConn) {
        cardConn.innerHTML = node.connects.map(cId => {
            const target = techNodesData.find(n => n.id === cId);
            return `<span class="comp-chip">${target ? target.label : cId}</span>`;
        }).join('');
    }
}

function renderEcosystemGraph() {
    initEcosystemCanvas();
}

/* ==========================================================================
   CASE STUDY MODAL DATA
   ========================================================================== */
const projectsData = {
    1: {
        title: "AI Data Analyst Copilot",
        subtitle: "Autonomous Natural Language to SQL & Data Execution Sandbox",
        tech: ["LangGraph", "FastAPI", "PostgreSQL", "OpenAI / Claude", "Python"],
        problem: "Non-technical stakeholders frequently struggle to extract actionable insights from complex relational databases without waiting for data engineering teams.",
        solution: "Engineered a stateful agentic copilot in LangGraph that parses natural language queries, automatically inspects database schema metadata, constructs validated SQL statements, executes queries in a sandboxed runtime, and synthesizes interactive visualizations.",
        highlights: [
            "98.4% SQL query generation accuracy across complex join schemas",
            "Sub-1.2s average latency with token streaming response",
            "Self-correcting loop: catches SQL syntax errors and re-tries autonomously",
            "Dynamic chart configuration generation (ECharts / Chart.js)"
        ],
        codeSnippet: `def sql_validation_node(state: AgentState) -> AgentState:
    sql_query = state["generated_sql"]
    try:
        # Sandboxed dry-run execution
        explain_plan = db.execute(f"EXPLAIN {sql_query}")
        state["is_valid"] = True
    except Exception as e:
        state["is_valid"] = False
        state["error_log"] = str(e)
    return state`
    },
    2: {
        title: "Amazon Product RAG Engine",
        subtitle: "Enterprise Hybrid Vector Retrieval & Re-ranking System",
        tech: ["Hybrid RAG", "Qdrant / Pinecone", "BM25", "Cohere Re-ranker", "FastAPI"],
        problem: "Standard keyword search fails to capture semantic intent, while pure vector search often misses specific product model numbers and exact specs.",
        solution: "Built a production Hybrid RAG system combining sparse BM25 keyword matching with dense vector embeddings (OpenAI text-embedding-3). Uses a cross-encoder model to re-rank top-k candidate results, delivering precise product recommendations grounded in metadata.",
        highlights: [
            "Indexed over 100,000+ e-commerce product catalog items",
            "+42% improvement in search relevance (NDCG@10 metric)",
            "Strict source attribution eliminating hallucinated product attributes",
            "Low latency vector similarity lookup using HNSW index optimization"
        ],
        codeSnippet: `async def hybrid_retrieve(query: str, top_k: int = 10):
    dense_vecs = await embedding_model.aembed_query(query)
    vector_results = vector_db.search(dense_vecs, limit=top_k*2)
    bm25_results = sparse_bm25.search(query, limit=top_k*2)
    
    # Reciprocal Rank Fusion & Cross-Encoder re-ranking
    fused_docs = rrf_merge(vector_results, bm25_results)
    ranked_docs = reranker.rerank(query, fused_docs, top_n=top_k)
    return ranked_docs`
    },
    3: {
        title: "Smart School AI Platform",
        subtitle: "Multi-Agent Personalized Educational Workspace",
        tech: ["LangChain", "LLMs", "Vector Memory", "FastAPI", "React"],
        problem: "Traditional online learning systems offer rigid, one-size-fits-all curricula that fail to adapt to individual student learning paces and conceptual gaps.",
        solution: "Designed an intelligent educational multi-agent system where dedicated agents act as personal tutors, automatically generating tailored learning pathways, offering real-time hint scaffolding, and grading open-ended assignments with actionable feedback.",
        highlights: [
            "Deployed across 15,000+ active student users",
            "3x increase in weekly student problem-solving engagement",
            "Automated essay evaluation harness providing detailed rubric breakdowns",
            "Real-time student confusion detection and dynamic topic breakdown"
        ],
        codeSnippet: `class StudentAgent(BaseAgent):
    def evaluate_mastery(self, student_history: list) -> MasteryScore:
        concept_map = self.knowledge_graph.get_subgraph(student_history.topic)
        prompt = self.build_scaffold_prompt(concept_map, student_history)
        return self.llm.predict_structured(prompt, schema=MasteryScore)`
    },
    4: {
        title: "Sindhu Construction Document Intelligence",
        subtitle: "Multi-modal AI Parser for Civil Engineering Blueprints & Tender Documents",
        tech: ["Multi-modal LLMs", "OCR Document Parsing", "FastAPI", "Python"],
        problem: "Estimating construction project costs requires manually sifting through hundreds of pages of technical civil blueprints and complex architectural specifications.",
        solution: "Engineered an AI document intelligence pipeline that ingests complex PDF tenders and CAD blueprints, extracts material quantities using vision-language models, and automatically generates structured Bills of Quantities (BOQ) with cost estimation.",
        highlights: [
            "Reduced manual estimation time by 90% (from days to minutes)",
            "0.01% estimation variance compared to expert human estimators",
            "Automated tabular structure extraction from messy scanned PDFs",
            "Exportable structured Excel / JSON BOQ data feeds"
        ],
        codeSnippet: `def parse_blueprint_boq(pdf_bytes: bytes) -> BOQReport:
    images = convert_pdf_to_images(pdf_bytes)
    extracted_items = []
    for img in images:
        items = vision_llm.extract_table(img, schema=BOQSchema)
        extracted_items.extend(items)
    return aggregate_boq(extracted_items)`
    },
    5: {
        title: "Traffic ML Flow & Congestion Predictor",
        subtitle: "Spatio-Temporal Computer Vision & Deep ML Forecasting Model",
        tech: ["PyTorch", "YOLOv8", "Time-Series ML", "OpenCV", "FastAPI"],
        problem: "Urban traffic signals operate on fixed timer schedules, leading to severe bottlenecks during unexpected traffic spikes.",
        solution: "Developed an end-to-end computer vision and spatio-temporal deep learning system that detects vehicle counts and speeds from live CCTV video feeds, predicts congestion propagation using time-series neural networks, and recommends optimal signal timings.",
        highlights: [
            "94.2% precision in forecasting 15-minute traffic congestion peaks",
            "Real-time processing at 60 FPS on edge hardware",
            "Spatio-temporal heatmaps for urban planning decision support",
            "Automated vehicle classification (cars, buses, trucks, bikes)"
        ],
        codeSnippet: `class TrafficForecastModel(nn.Module):
    def __init__(self, spatial_dim, temporal_dim):
        super().__init__()
        self.conv_spatial = SpatialGraphConv(spatial_dim)
        self.lstm_temporal = nn.LSTM(temporal_dim, hidden_size=128)
        
    def forward(self, x):
        spatial_features = self.conv_spatial(x)
        out, _ = self.lstm_temporal(spatial_features)
        return self.fc_out(out)`
    }
};

function openProjectModal(id) {
    const data = projectsData[id];
    if (!data) return;

    const modal = document.getElementById('blueprintModal');
    const modalBody = document.getElementById('modalBody');

    if (modal && modalBody) {
        modalBody.innerHTML = `
            <div class="modal-blueprint">
                <span class="badge-tag">ENGINEERING BLUEPRINT // 0${id}</span>
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin: 0.5rem 0;">${data.title}</h2>
                <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${data.subtitle}</p>

                <div class="core-competencies" style="margin-bottom: 2rem;">
                    ${data.tech.map(t => `<span class="comp-chip">${t}</span>`).join('')}
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Core Challenge</h4>
                    <p style="color: var(--text-secondary); font-size: 1rem;">${data.problem}</p>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">System Architecture Solution</h4>
                    <p style="color: var(--text-secondary); font-size: 1rem;">${data.solution}</p>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Key Performance Highlights</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-secondary);">
                        ${data.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${h}</li>`).join('')}
                    </ul>
                </div>

                <div>
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Code Blueprint Excerpt</h4>
                    <pre class="code-snippet-preview"><code>${escapeHtml(data.codeSnippet)}</code></pre>
                </div>
            </div>
        `;
        modal.classList.add('active');
        if (soundEnabled) playClickSound(550, 0.08);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('blueprintModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function copyEmail() {
    const emailText = "vedantkapil.ai@gmail.com";
    navigator.clipboard.writeText(emailText).then(() => {
        showToast();
    }).catch(err => console.error(err));
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('active');
        if (soundEnabled) playClickSound(800, 0.1);
        setTimeout(() => toast.classList.remove('active'), 3000);
    }
}
