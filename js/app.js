/* ==========================================================================
   VEDANT KAPIL — EDITORIAL AI ENGINEERING PORTFOLIO LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Theme Toggle (Editorial Warm Yellow vs Midnight Dark)
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
            const isDark = document.body.classList.contains('theme-dark');
            const toggleText = themeToggleBtn.querySelector('.toggle-text');
            if (toggleText) {
                toggleText.textContent = isDark ? 'DARK' : 'MODE';
            }
            // Re-render ecosystem canvas colors
            renderEcosystemGraph();
        });
    }

    // 3. Interactive Eye Pupil Tracking for VEDANT & KAPIL Headings
    const pupils = document.querySelectorAll('.title---eye-pupils');
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        pupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;

            const angle = Math.atan2(mouseY - pupilY, mouseX - pupilX);
            const distance = Math.min(14, Math.hypot(mouseX - pupilX, mouseY - pupilY) / 15);

            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // 4. Editorial Accordion Section Toggles (Ab[OUT], Syst[E]ms, etc.)
    const accordions = document.querySelectorAll('.section-accordion');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const targetId = acc.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                acc.classList.toggle('active');
                targetContent.classList.toggle('active');
            }
        });
    });

    // 5. Thinking Section Tabs
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
            }
        });
    });

    // 6. Systems Architecture DAG Visualizer Controls
    const sysButtons = document.querySelectorAll('.sys-toggle-btn');
    const diagramViews = document.querySelectorAll('.diagram-view');
    sysButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sysButtons.forEach(b => b.classList.remove('active'));
            diagramViews.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');
            const diagramType = btn.getAttribute('data-diagram');
            const targetDiag = document.getElementById(`diag-${diagramType}`);
            if (targetDiag) {
                targetDiag.classList.add('active');
            }
        });
    });

    // DAG Node Info Tooltip Click
    const dagNodes = document.querySelectorAll('.dag-node');
    const nodeCaption = document.getElementById('nodeCaption');
    dagNodes.forEach(node => {
        node.addEventListener('click', () => {
            const info = node.getAttribute('data-info');
            const name = node.querySelector('.node-name')?.textContent || 'Node';
            if (nodeCaption && info) {
                nodeCaption.innerHTML = `<strong>${name}:</strong> ${info}`;
            }
        });
    });

    // 7. Interactive Technology Ecosystem Node Canvas
    initEcosystemCanvas();
});

/* ==========================================================================
   INTERACTIVE TECHNOLOGY ECOSYSTEM CANVAS (CONNECTED GRAPH)
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

        const isDark = document.body.classList.contains('theme-dark');
        const nodeColor = isDark ? '#F4F3EF' : '#080808';
        const lineBaseColor = isDark ? 'rgba(244, 243, 239, 0.15)' : 'rgba(8, 8, 8, 0.15)';
        const lineActiveColor = isDark ? '#E2B859' : '#080808';

        // Draw Connection Lines
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

        // Draw Nodes
        techNodesData.forEach(node => {
            const nodeX = node.x * width;
            const nodeY = node.y * height;
            const isActive = (node.id === activeNodeId);

            // Node Circle
            ctx.beginPath();
            ctx.arc(nodeX, nodeY, isActive ? 12 : 8, 0, Math.PI * 2);
            ctx.fillStyle = isActive ? (isDark ? '#E2B859' : '#080808') : (isDark ? '#14161A' : '#FAF6EE');
            ctx.fill();
            ctx.strokeStyle = nodeColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label Text
            ctx.font = `${isActive ? 'bold 14px' : '500 12px'} "JetBrains Mono", monospace`;
            ctx.fillStyle = nodeColor;
            ctx.fillText(node.label, nodeX + 16, nodeY + 4);
        });
    }

    // Canvas Mouse Click Interaction
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
            }
        });
    });

    // Default detail card setup
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
   CASE STUDY MODAL & BLUEPRINT DATA
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
    }
}

function closeProjectModal() {
    const modal = document.getElementById('blueprintModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Helper to escape HTML tags in code snippets
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
}

/* ==========================================================================
   CLIPBOARD UTILITIES
   ========================================================================== */
function copyEmail() {
    const emailText = "vedantkapil.ai@gmail.com";
    navigator.clipboard.writeText(emailText).then(() => {
        showToast();
    }).catch(err => {
        console.error("Clipboard copy failed:", err);
    });
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
}
