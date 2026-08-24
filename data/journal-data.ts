export interface JournalEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: "Engineering & AI" | "Design & UI" | "Founder Notes" | "Photography" | "Mindset";
  tags: string[];
  excerpt: string;
  featured?: boolean;
  keyTakeaway: string;
  content: string;
}

export interface BookItem {
  title: string;
  author: string;
  category: string;
  rating: number;
  status: "Currently Reading" | "Completed" | "Key Reference";
  note: string;
}

export interface ReflectionQuote {
  id: string;
  quote: string;
  author: string;
  context: string;
  category: string;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "cinematic-arrival-architecture",
    slug: "cinematic-arrival-architecture",
    title: "Cinematic Arrival Architecture: Designing Spatial Digital Homes",
    subtitle: "Why digital headquarters should welcome visitors through environmental storytelling rather than traditional list grids.",
    date: "June 29, 2026",
    readTime: "5 min read",
    category: "Design & UI",
    tags: ["Spatial UI", "Framer Motion", "Storytelling", "Web Design"],
    featured: true,
    excerpt: "When a visitor enters a website, they are stepping into a creator's digital home. Traditional portfolios treat users as consumers of cards; spatial headquarters treat them as explorers of rooms.",
    keyTakeaway: "Spatial UI succeeds when every interactive element feels like a real object with physical intent, not just a floating web button.",
    content: `
# Cinematic Arrival Architecture: Designing Spatial Digital Homes

When a visitor lands on a traditional portfolio website, they are immediately greeted with a standard hero title, two buttons, and a grid of cards. While functional, this approach fails to communicate **atmosphere** and **philosophy**.

When designing **Project Atlas**, my goal was to create a digital headquarters—a continuous, tactile environment where visitors explore *rooms* rather than pages.

---

## 1. Rooms, Not Pages

In Atlas, each room represents a distinct aspect of my mind:

*   **The Entrance (Arrival)**: Setting the mood, introducing the mascot, establishing spatial presence.
*   **The Workshop (Founder & Product)**: Showing how ideas transform into shipping software.
*   **The Lab (Engineering & AI)**: Live experiments, code, and interactive games like Chess and Snake.
*   **The Gallery (Photography)**: Visual perception, composition, and moments frozen in time.
*   **The Study (Builder's Journal)**: Peaceful reflection, honest lessons, and continuous learning.

When transitions occur between these spaces, GSAP scroll triggers and smooth ambient lighting reinforce the sensation of walking through an illuminated headquarters.

---

## 2. Interactive Objects over Static Links

On the main Arrival scene, instead of standard navigation links, visitors encounter interactive desk objects:

*   **The Camera**: Opens the Photography Gallery, signaling a focus on visual detail.
*   **The Mechanical Pencil**: Opens the Design & Engineering section, symbolizing drafting and precision.
*   **The Open Notebook**: Opens the Builder's Journal, inviting peaceful reading.

This physical metaphor grounds abstract digital work in familiar human experience.

---

## 3. Micro-Interactions that Wow

High-craft web design lives in the subtle details:
1. **Dynamic Glassmorphic Lighting**: Soft radial glows that follow hover states.
2. **Tabular Numerics & Typography**: Inter combined with Playfair Display and JetBrains Mono for editorial elegance.
3. **Responsive Spring Physics**: Framer Motion spring dampening that feels organic rather than robotic.

Building for the web isn't about how much UI you can cram into a viewport. It's about how deeply a visitor feels connected to the creator behind the screen.
`
  },
  {
    id: "architecture-of-empathy",
    slug: "architecture-of-empathy",
    title: "The Architecture of Empathy: Building Solace & AI Workflows",
    subtitle: "Designing database schemas and AI orchestrations that recognize human emotional state and context.",
    date: "May 14, 2026",
    readTime: "7 min read",
    category: "Engineering & AI",
    tags: ["System Architecture", "AI Orchestration", "Next.js", "PostgreSQL"],
    featured: true,
    excerpt: "Most software architectures treat users as database IDs. But when building Solace, we prioritized audit logging and context memory that capture human mood shifts and milestone pivots.",
    keyTakeaway: "Empathy isn't just an interface detail; it must be reflected in your data structures, fallback handling, and LLM context scoping.",
    content: `
# The Architecture of Empathy: Building Solace & AI Workflows

In modern web development, backend engineering often focuses purely on throughput, latency, and cache hit ratios. While critical, this technical focus can blind engineers to the human experience on the other side of the API endpoint.

When building **Solace**, an AI-assisted personal reflection platform, I realized that generic CRUD architecture was insufficient. We needed an architecture that understood **user state transitions**—emotional context, momentum, and historical growth.

---

## 1. Scoped AI Context Memory

Generic LLM integrations often pass massive, uncurated prompt histories to an API, leading to hallucination and expensive token usage. In Solace, we implemented **Hierarchical Memory Summarization**:

\`\`\`typescript
interface UserSessionContext {
  userId: string;
  activeGoal: string;
  recentMilestones: SummaryNode[];
  emotionalBaseline: "focused" | "seeking-clarity" | "reflective";
  tokenBudget: number;
}
\`\`\`

By categorizing short-term reflections into structured \`SummaryNode\` objects, the AI model receives concise, high-signal context without overwhelming the user with generic automated responses.

---

## 2. Graceful Fallbacks over Cryptic Errors

Nothing breaks trust faster than a silent failure or a raw \`500 Internal Server Error\` stack trace.

In our AI orchestration layer:
*   We use exponential backoff with jitter for model API calls.
*   If an upstream provider times out, the UI gracefully switches to a local deterministic state machine, ensuring the user's progress is never lost.
*   Local state is cached in IndexedDB immediately before remote requests execute.

---

## 3. Lessons Learned for Full-Stack Builders

1. **Always trace the human workflow first**: Build backend schemas that mirror real human habits, not arbitrary table layouts.
2. **Deterministic beats magical**: AI should assist human intention, never replace it blindly.
3. **Craft every status code**: Treat loading states, retry triggers, and offline modes as primary UI features.
`
  },
  {
    id: "useful-ai-over-spectacle",
    slug: "useful-ai-over-spectacle",
    title: "Useful AI Over Spectacle: Lessons from Building Intelligent Tools",
    subtitle: "Avoiding the temptation of generic chatbot wrappers by building contextual AI tools that reduce cognitive friction.",
    date: "April 02, 2026",
    readTime: "6 min read",
    category: "Engineering & AI",
    tags: ["Artificial Intelligence", "Product Thinking", "LLMs", "Developer Experience"],
    featured: false,
    excerpt: "We don't need another generic chatbot that summarizes text. We need smart tools that fit cleanly inside human workflows, executing only when they have verified user intent.",
    keyTakeaway: "The best AI tools are invisible. They don't demand attention; they quietly eliminate repetitive friction so the human can focus on high-level strategy.",
    content: `
# Useful AI Over Spectacle: Lessons from Building Intelligent Tools

The internet is flooded with generic wrapper apps that put a chat window over a basic LLM API. While impressive for a quick demo, these tools quickly lose utility because they force users to do the heavy lifting of prompt engineering.

True craftsmanship in AI engineering means building **context-aware tools** that integrate seamlessly into existing software interfaces.

---

## 1. Deterministic Control Meets Probabilistic Intelligence

An AI model is probabilistic by nature—it generates plausible sequences of tokens. But user interfaces require **determinism**:
*   A button click must perform a specific action.
*   Data validation must obey strict TypeScript schemas.
*   Security permissions must be non-negotiable.

To bridge this gap, we isolate AI outputs using strict JSON Schema validation (e.g. Zod or JSON Schema enforcement). If an AI response violates the schema, it is corrected automatically before reaching the UI layer.

---

## 2. Reducing Cognitive Friction

When designing AI interfaces for Atlas and past products:
*   **No blank chat boxes**: Provide clear contextual options based on what the user is currently looking at.
*   **Instant feedback**: Show step-by-step reasoning or micro-spinners so the user never wonders if the system is frozen.
*   **Undoable actions**: Every AI-generated change should be easily reviewable and reversible with a single click.

---

## 3. Summary

Build tools that give users superpowers, not tools that replace human judgment. When technology serves human intent with clarity and restraint, it becomes indispensable.
`
  },
  {
    id: "framing-and-focus-photography-lessons",
    slug: "framing-and-focus-photography-lessons",
    title: "Framing & Focus: How Photography Shapes My Engineering Eye",
    subtitle: "What spending hours behind a 35mm lens taught me about UI hierarchy, whitespace, and negative space.",
    date: "March 18, 2026",
    readTime: "4 min read",
    category: "Photography",
    tags: ["Photography", "Visual Hierarchy", "Design", "Observation"],
    featured: false,
    excerpt: "In photography, what you leave OUT of the frame is just as critical as what you include. The exact same rule applies to software architecture and frontend layout design.",
    keyTakeaway: "Whitespace in UI design is the visual equivalent of quiet background atmosphere in photography. Give key elements room to breathe.",
    content: `
# Framing & Focus: How Photography Shapes My Engineering Eye

Before I wrote my first line of complex code, I spent years exploring landscape and street photography. Looking through a 35mm viewfinder teaches you a discipline that directly transfers to software product design: **the art of intentional exclusion**.

---

## 1. The Power of Negative Space

When framing a street photo or a mountain vista, clutter ruins the story. If there are five competing focal points, the viewer's eye bounces around without landing anywhere meaningful.

In Web UI Design:
*   Excessive borders, dense badges, and competing primary colors produce visual noise.
*   By increasing padding around core typography and limiting primary call-to-action colors to warm gold or deep accents, the user's focus naturally settles on what matters most.

---

## 2. Leading Lines & Visual Flow

In photography, leading lines—such as a winding road or an architectural shadow—guide the eye toward the subject.

In Frontend Architecture:
*   Visual hierarchy (Font weight, size scaling, contrast ratio) creates leading lines for the reader's eyes.
*   Consistent spacing tokens (\`gap-2\`, \`gap-4\`, \`gap-8\`) build a rhythmic visual cadence that makes scanning effortless.

---

## 3. Conclusion

Look around your physical world. Observe how light falls on a surface, how shadows define depth, and how minimalism creates elegance. Bring those real-world observations back into your code.
`
  },
  {
    id: "building-in-public-discipline",
    slug: "building-in-public-discipline",
    title: "Building in Public: The Discipline of Shipping Every Single Day",
    subtitle: "How consistent daily momentum builds better software than month-long isolated planning cycles.",
    date: "February 22, 2026",
    readTime: "5 min read",
    category: "Founder Notes",
    tags: ["Shipping", "Productivity", "Mindset", "Consistency"],
    featured: false,
    excerpt: "Isolated perfectionism is the enemy of progress. Shipping small, verified iterations daily accelerates learning curves by a factor of ten.",
    keyTakeaway: "Small daily deployments build compounded confidence. Never hold back working software waiting for an imaginary perfect version.",
    content: `
# Building in Public: The Discipline of Shipping Every Single Day

Early in my journey as a builder, I fell into a common trap: spending weeks tweaking an application in private, overthinking edge cases before a single user ever saw a line of code.

Switching to a **build in public** philosophy transformed my momentum.

---

## 1. The Power of Micro-Sprints

Instead of massive monthly releases, break your vision into tight 24-hour iterations:
1. **Define today's core value**: Fix one layout issue, implement one interactive modal, or polish one key animation.
2. **Execute with high focus**: Write clean, typed, modular code.
3. **Validate & Deploy**: Run test suites, verify responsiveness, and push live.

---

## 2. Feedback Loops Drive Clarity

When you ship early:
*   Real user behavior instantly invalidates false assumptions.
*   Bug fixes happen while the code is fresh in your head.
*   Progress generates internal motivation and excitement.

---

## 3. Final Reflection

Don't wait until your creation is perfect. Perfection is a moving goalpost. Ship the foundation today, polish the micro-interactions tomorrow, and keep building continuously.
`
  },
  {
    id: "the-craft-of-micro-interactions",
    slug: "the-craft-of-micro-interactions",
    title: "The Craft of Micro-Interactions: Elevating UI from Functional to Unforgettable",
    subtitle: "Exploring hover springs, ambient lighting glows, and glassmorphism in modern React applications.",
    date: "January 10, 2026",
    readTime: "6 min read",
    category: "Design & UI",
    tags: ["Micro-interactions", "CSS", "GSAP", "React"],
    featured: false,
    excerpt: "The difference between a generic web app and a world-class digital experience lies in micro-interactions: tactile button states, spring animations, and responsive lighting.",
    keyTakeaway: "Micro-interactions should feel tactile and human. Never animate for the sake of motion; animate to provide clear feedback and delightful polish.",
    content: `
# The Craft of Micro-Interactions: Elevating UI from Functional to Unforgettable

Most websites operate in a binary state: an element is either clicked or not clicked. But in the physical world, when you touch a key on a piano or flip a metallic light switch, there is continuous mechanical feedback—weight, resistance, click, and recoil.

Micro-interactions bring that physical sensation into software interfaces.

---

## 1. Physics-Based Motion over Static Transitions

Linear CSS transitions (\`transition: all 0.3s linear\`) feel mechanical and lifeless. Spring physics (\`type: "spring", stiffness: 300, damping: 25\`) mimic natural mass and momentum.

\`\`\`tsx
<motion.button
  whileHover={{ scale: 1.04, y: -2 }}
  whileTap={{ scale: 0.96, y: 1 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  Let's Have a Game 🎮
</motion.button>
\`\`\`

Notice how scaling down on tap combined with upward hover translation creates a tactile button press!

---

## 2. Ambient Glassmorphism & Gold Glows

Using subtle backdrop blur with tailored border gradients creates visual depth:
*   \`backdrop-filter: blur(12px)\`
*   \`border: 1px solid rgba(199, 169, 102, 0.25)\`
*   \`box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6)\`

This layered depth makes cards feel embedded in a 3D space rather than pasted flat on a screen.

---

## 3. Summary

Always treat interaction design as a dialogue between the user and the software. When every tap responds with elegance, visitors remember the experience.
`
  }
];

export const CURRENT_BOOKS: BookItem[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "System Architecture",
    rating: 5,
    status: "Currently Reading",
    note: "The definitive guide to distributed consensus, data replication, and backend reliability."
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Product & UX",
    rating: 5,
    status: "Completed",
    note: "Fundamentally shaped how I view feedback loops, affordances, and cognitive mental models in software."
  },
  {
    title: "Crafting Interpreters",
    author: "Robert Nystrom",
    category: "Compilers & Tech",
    rating: 5,
    status: "Key Reference",
    note: "A masterclass in language design, parsing, virtual machines, and elegant C/Java code architecture."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Mindset & Growth",
    rating: 5,
    status: "Completed",
    note: "Small 1% daily iterations compound into extraordinary long-term software and life outcomes."
  }
];

export const REFLECTION_QUOTES: ReflectionQuote[] = [
  {
    id: "quote-1",
    quote: "Build experiences people remember. Build products that matter.",
    author: "Vaibhav Bariyar",
    context: "Core Builder Motto",
    category: "Philosophy"
  },
  {
    id: "quote-2",
    quote: "Simplicity is about subtracting the obvious and adding the meaningful.",
    author: "John Maeda",
    context: "The Laws of Simplicity",
    category: "Design"
  },
  {
    id: "quote-3",
    quote: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    context: "Software Engineering Practice",
    category: "Engineering"
  },
  {
    id: "quote-4",
    quote: "Observation precedes innovation. Look deeply before writing code.",
    author: "Vaibhav Bariyar",
    context: "Study Notebook Notes",
    category: "Observation"
  }
];
