export interface LabExperiment {
  id: string;
  code: string;
  title: string;
  category: "AI & LLMs" | "Graphics & UI" | "System Architecture" | "Product Sandbox";
  status: "Prototype Live" | "In Incubator" | "Failed & Learned" | "Archived";
  date: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  lesson: string;
  codeSnippet?: string;
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "exp-01",
    code: "EXP-01",
    title: "Empathy Context Classifier",
    category: "AI & LLMs",
    status: "Prototype Live",
    date: "July 2026",
    tagline: "Categorizing user emotional baselines without intrusive forms.",
    description: "Built a zero-shot LLM classification pipeline in Solace that analyzes developer reflection logs to determine mood momentum and friction points in real-time.",
    metrics: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Latency", value: "140ms" },
      { label: "Token Budget", value: "< 250 tokens" }
    ],
    lesson: "Structuring prompt schemas with strict JSON constraints eliminates 99% of model hallucinations without needing expensive fine-tuning.",
    codeSnippet: `interface ContextPayload {
  baselineMood: "focused" | "seeking-clarity" | "overwhelmed";
  keyFriction: string;
  suggestedAction: "deep-work" | "reframe-goal" | "take-break";
}`
  },
  {
    id: "exp-02",
    code: "EXP-02",
    title: "Particle Grid Matrix Engine",
    category: "Graphics & UI",
    status: "Failed & Learned",
    date: "June 2026",
    tagline: "High-density WebGL vector background rendering.",
    description: "Attempted to use high-density SVG lines for a dynamic matrix background. Caused framerate drops down to 28 FPS on mobile viewports.",
    metrics: [
      { label: "Initial FPS", value: "28 FPS ❌" },
      { label: "Optimized FPS", value: "60 FPS ⚡" },
      { label: "GPU Load", value: "-72%" }
    ],
    lesson: "Never animate DOM SVG nodes directly for complex particle grids. Switched to HTML5 Canvas 2D context with hardware acceleration.",
    codeSnippet: `// Switched from SVG DOM nodes to Canvas 2D
const ctx = canvas.getContext('2d', { alpha: false });
ctx.fillStyle = '#08080a';
ctx.fillRect(0, 0, width, height);`
  },
  {
    id: "exp-03",
    code: "EXP-03",
    title: "Dynamic Weather & Time Ambience",
    category: "Product Sandbox",
    status: "In Incubator",
    date: "May 2026",
    tagline: "Shifting website lighting based on the visitor's local atmosphere.",
    description: "Integrating visitor local timezone and weather APIs to dynamically alter background gradients between twilight ember, dawn gold, and quiet rain.",
    metrics: [
      { label: "API Overhead", value: "0ms (cached)" },
      { label: "Gradients", value: "4 presets" },
      { label: "User Delight", value: "High" }
    ],
    lesson: "Environmental lighting changes should be extremely subtle (5% opacity shifts) so they enhance atmosphere without distracting from content.",
    codeSnippet: `const AMBIENCE_PRESETS = {
  dawn: "radial-gradient(ellipse at 50% 10%, rgba(199,169,102,0.15), transparent)",
  twilight: "radial-gradient(ellipse at 50% 10%, rgba(126,148,125,0.12), transparent)"
};`
  },
  {
    id: "exp-04",
    code: "EXP-04",
    title: "Hierarchical RAG Memory Cache",
    category: "System Architecture",
    status: "Prototype Live",
    date: "April 2026",
    tagline: "Vector database indexing for multi-session conversation history.",
    description: "Architected a hybrid vector search using Pgvector and semantic embeddings to recall past project notes across months of builder activity.",
    metrics: [
      { label: "Recall Rate", value: "98.1%" },
      { label: "Search Latency", value: "42ms" },
      { label: "Vector DB", value: "Pgvector" }
    ],
    lesson: "Combining hybrid keyword search (BM25) with vector embeddings yields far higher precision than pure cosine similarity alone.",
    codeSnippet: `SELECT id, title, 1 - (embedding <=> $1) AS similarity
FROM journal_embeddings
WHERE 1 - (embedding <=> $1) > 0.78
ORDER BY similarity DESC LIMIT 5;`
  }
];
