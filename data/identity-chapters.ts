import type { IdentityChapter } from "@/types/atlas";

export const identityChapters: IdentityChapter[] = [
  {
    id: "arrival",
    label: "Arrival",
    path: "/",
    question: "What is Atlas?",
    headline: "A living headquarters for a lifelong builder.",
    summary:
      "Atlas begins in the Entrance Hall: a calm workspace where visitors meet the Builder and choose which identity to explore first.",
    environment: "Entrance Hall with a central wooden table, laptop, notebook, camera, coffee mug, plant and warm natural light.",
    builderOutfit: "Neutral everyday workspace outfit with the backpack nearby.",
    builderEquipment: ["Notebook", "Laptop", "Mechanical pencil", "Backpack"],
    builderBehavior: "Working quietly beside the table, acknowledging visitors only through subtle body language.",
    atmosphere: "Curious, calm, welcoming and handcrafted.",
    accent: "wood",
    visibleInPrimaryNavigation: true,
    nextId: "engineering",
    zones: [
      {
        title: "Central Table",
        purpose: "Introduce the Builder through objects rather than explanation.",
        details: ["Laptop", "Notebook", "Camera", "Coffee", "Plant"]
      },
      {
        title: "Room Hints",
        purpose: "Show that Atlas is a connected journey through identities.",
        details: ["Engineering", "Founder", "Designer", "AI", "Photography"]
      }
    ]
  },
  {
    id: "engineering",
    label: "Engineering",
    path: "/projects",
    question: "How do ideas become reliable software?",
    headline: "Engineering is where curiosity becomes architecture.",
    summary:
      "This identity focuses on systems, product architecture, production craft and the discipline required to build meaningful software.",
    environment: "Technical workspace with diagrams, terminals, project wall, architecture notes and a focused desk.",
    builderOutfit: "Black hoodie, comfortable trousers, sneakers and laptop backpack.",
    builderEquipment: ["Laptop", "Blueprints", "Mechanical tools", "Architecture notes"],
    builderBehavior: "Typing, sketching architecture, reading documentation and pausing to think.",
    atmosphere: "Focused, precise, productive and calm.",
    accent: "glass",
    visibleInPrimaryNavigation: true,
    nextId: "my-work",
    zones: [
      {
        title: "Technical Workspace",
        purpose: "Show the Builder actively turning problems into software systems.",
        details: ["Laptop", "Monitor", "Notebook", "Desk lamp"]
      },
      {
        title: "Builder's Collection",
        purpose: "Present engineering work as stories of problem solving.",
        details: ["Solace", "AI Healthcare Project", "MIT-Learn", "Future engineering projects"]
      },
      {
        title: "Architecture Wall",
        purpose: "Document decisions, trade-offs and system thinking.",
        details: ["System flows", "Database sketches", "Technical notes"]
      }
    ]
  },
  {
    id: "my-work",
    label: "My Work",
    path: "/projects",
    question: "What has the Builder created?",
    headline: "Projects that solve real problems.",
    summary:
      "A collection of robust platforms, AI systems, and interactive experiences engineered with purpose.",
    environment: "A gallery of digital creations illuminated by ambient screens.",
    builderOutfit: "Focused builder attire.",
    builderEquipment: ["Keyboard", "Monitor", "Coffee"],
    builderBehavior: "Presenting the architecture and design of finished products.",
    atmosphere: "Innovative, structured, and expansive.",
    accent: "blue",
    visibleInPrimaryNavigation: true,
    nextId: "founder",
    zones: [
      {
        title: "Project Showcase",
        purpose: "Display completed engineering work.",
        details: ["Folio Space", "Fintech Edu", "Stress2Health"]
      }
    ]
  },
  {
    id: "founder",
    label: "Founder",
    path: "/founder",
    question: "Why should this product exist?",
    headline: "Founder thinking begins with people, not features.",
    summary:
      "This identity captures entrepreneurship, Solace, validation, leadership and the responsibility of choosing problems worth solving.",
    environment: "Startup environment with research walls, journey maps, sticky notes, meeting table and warm light.",
    builderOutfit: "Professional casual shirt with rolled sleeves, simple watch and notebook.",
    builderEquipment: ["Notebook", "Whiteboard marker", "Research cards", "Coffee mug"],
    builderBehavior: "Reviewing notes, writing strategy, studying user problems and thinking quietly.",
    atmosphere: "Human, hopeful, empathetic and purposeful.",
    accent: "gold",
    visibleInPrimaryNavigation: true,
    nextId: "designer",
    zones: [
      {
        title: "Mission Wall",
        purpose: "Explain why the Builder chooses difficult human problems.",
        details: ["Curiosity", "Empathy", "Ownership", "Continuous learning"]
      },
      {
        title: "Solace Table",
        purpose: "Position Solace as the emotional center of the current chapter.",
        details: ["Problem", "Motivation", "Research", "Lessons"]
      },
      {
        title: "Vision Timeline",
        purpose: "Communicate growth toward building meaningful startups.",
        details: ["Engineer", "Founder", "Problem Solver", "Builder"]
      }
    ]
  },
  {
    id: "designer",
    label: "Designer",
    path: "/designer",
    question: "How should people experience this?",
    headline: "Design is the discipline of making care visible.",
    summary:
      "This identity presents product design, systems, interaction thinking and the process behind clear, humane interfaces.",
    environment: "Minimal creative workspace with sketchbook, tablet, wireframe wall, typography studies and prototypes.",
    builderOutfit: "Minimal overshirt in neutral colors with sketchbook, tablet and comfortable sneakers.",
    builderEquipment: ["Sketchbook", "Tablet", "Typography sheets", "Wireframes"],
    builderBehavior: "Sketching interfaces, reviewing wireframes, arranging sticky notes and studying user journeys.",
    atmosphere: "Calm, precise, intentional and creative.",
    accent: "wood",
    visibleInPrimaryNavigation: true,
    nextId: "ai",
    zones: [
      {
        title: "Creative Workspace",
        purpose: "Show that every interface begins as an exploration.",
        details: ["Sketchbook", "Tablet", "Sticky notes", "Reference books"]
      },
      {
        title: "Design System",
        purpose: "Demonstrate consistency through tokens and reusable components.",
        details: ["Typography", "Spacing", "Buttons", "Cards", "Inputs"]
      },
      {
        title: "Prototype Corner",
        purpose: "Capture interaction ideas without letting effects become the story.",
        details: ["Micro-interactions", "Transitions", "Navigation concepts"]
      }
    ]
  },
  {
    id: "ai",
    label: "AI",
    path: "/ai",
    question: "How can technology become more useful?",
    headline: "AI is useful when it helps people solve real problems.",
    summary:
      "This identity is dedicated to practical AI, automation, research, experiments and thoughtful application of future technology.",
    environment: "Futuristic research workspace with floating interfaces, model diagrams and research boards.",
    builderOutfit: "Modern jacket with subtle futuristic details and minimal design.",
    builderEquipment: ["Research papers", "Model diagrams", "Experiment logs", "Data visualizations"],
    builderBehavior: "Studying research, observing data, writing hypotheses and thinking through usefulness.",
    atmosphere: "Curious, experimental, elegant and forward-looking.",
    accent: "green",
    visibleInPrimaryNavigation: true,
    nextId: "photography",
    zones: [
      {
        title: "Research Desk",
        purpose: "Frame AI as investigation rather than spectacle.",
        details: ["Research papers", "Hypotheses", "Experiment logs"]
      },
      {
        title: "Automation Board",
        purpose: "Show where AI reduces friction in meaningful workflows.",
        details: ["LLMs", "NLP", "Computer vision", "Automation"]
      },
      {
        title: "Useful Technology",
        purpose: "Connect AI work back to human problems.",
        details: ["Healthcare", "Education", "Productivity", "Accessibility"]
      }
    ]
  },
  {
    id: "photography",
    label: "Photography",
    path: "/photography",
    question: "How does the Builder see the world?",
    headline: "Photography teaches the Builder what deserves attention.",
    summary:
      "This identity slows Atlas down through observation, travel, light, people and stories captured with intention.",
    environment: "Peaceful photography space with large windows, framed images, maps, camera equipment and travel journals.",
    builderOutfit: "Travel jacket, camera around the neck, travel backpack and comfortable boots.",
    builderEquipment: ["Camera", "Travel backpack", "Lens pouch", "Printed photographs"],
    builderBehavior: "Reviewing photographs, writing observations, organizing prints and looking toward natural light.",
    atmosphere: "Peaceful, reflective, natural and cinematic.",
    accent: "gold",
    visibleInPrimaryNavigation: true,
    nextId: "journal",
    zones: [
      {
        title: "Welcome Gallery",
        purpose: "Introduce photography as observation, not a hobby page.",
        details: ["Featured story", "Camera", "Travel notes"]
      },
      {
        title: "Story Collections",
        purpose: "Group photographs by meaning rather than albums.",
        details: ["Travel", "Sacred Places", "People", "Architecture", "Morning Light"]
      },
      {
        title: "Observation Notes",
        purpose: "Connect visual attention back to product thinking.",
        details: ["Lessons", "Sketches", "Journal connections"]
      }
    ]
  },
  {
    id: "journal",
    label: "Builder's Journal",
    path: "/journal",
    question: "What has the Builder learned?",
    headline: "The Journal is the written history of becoming.",
    summary:
      "This identity opens The Study: a quiet notebook of lessons, failures, reflections, questions and personal growth.",
    environment: "Warm study with wooden desk, bookshelf, desk lamp, coffee, open notebook and comfortable reading corner.",
    builderOutfit: "Soft hoodie, relaxed clothing and coffee mug nearby.",
    builderEquipment: ["Notebook", "Fountain pen", "Books", "Coffee"],
    builderBehavior: "Writing, reading, turning pages, reflecting quietly and returning to the notebook.",
    atmosphere: "Peaceful, personal, honest and reflective.",
    accent: "wood",
    visibleInPrimaryNavigation: true,
    nextId: "contact",
    zones: [
      {
        title: "Writing Desk",
        purpose: "Show where thoughts become documented lessons.",
        details: ["Context", "Story", "Reflection", "Lesson", "Next question"]
      },
      {
        title: "Journal Library",
        purpose: "Organize reflections by growth, not algorithms.",
        details: ["Build", "Founder Notes", "Design Notes", "AI Notes", "Life Notes"]
      },
      {
        title: "Reflection Wall",
        purpose: "Preserve memorable lessons and questions.",
        details: ["Notes", "Sketches", "Diagrams", "Milestones"]
      }
    ]
  },
  {
    id: "lab",
    label: "The Lab",
    path: "/lab",
    question: "What happens if...?",
    headline: "The Lab gives unfinished ideas permission to exist.",
    summary:
      "This hidden identity celebrates experiments, prototypes, failed ideas, startup concepts and curiosity before certainty.",
    environment: "Experimental workspace with prototype bench, sticky notes, research papers, wires, notebooks and unfinished ideas.",
    builderOutfit: "Practical workshop outfit with prototype tools and notebook.",
    builderEquipment: ["Prototype parts", "Sticky notes", "Research notes", "Experimental devices"],
    builderBehavior: "Testing prototypes, writing hypotheses, replacing sticky notes and trying again.",
    atmosphere: "Creative, imperfect, hopeful and alive.",
    accent: "green",
    visibleInPrimaryNavigation: false,
    nextId: "future",
    zones: [
      {
        title: "Prototype Workbench",
        purpose: "Represent experimentation as active learning.",
        details: ["Idea", "Question", "Hypothesis", "Prototype", "Lesson"]
      },
      {
        title: "Startup Board",
        purpose: "Capture early concepts without pretending they are complete.",
        details: ["Problem statements", "Validation notes", "MVP concepts"]
      },
      {
        title: "Experiment Archive",
        purpose: "Keep failures visible because they changed the Builder.",
        details: ["Result", "Lesson", "Next experiment", "Status"]
      }
    ]
  },
  {
    id: "future",
    label: "Future",
    path: "/future",
    question: "Where is the Builder going next?",
    headline: "The most meaningful chapters have not been written yet.",
    summary:
      "This identity looks toward future startups, learning, questions and the long horizon without pretending certainty.",
    environment: "Open observatory with glass architecture, notebooks, roadmap cards, horizon light and unfinished plans.",
    builderOutfit: "Calm planning outfit with notebook and backpack.",
    builderEquipment: ["Future notes", "Roadmap cards", "Books", "Notebook"],
    builderBehavior: "Reading future notes, observing the horizon, writing ideas and continuing to plan.",
    atmosphere: "Hopeful, spacious, reflective and optimistic.",
    accent: "gold",
    visibleInPrimaryNavigation: true,
    nextId: "contact",
    zones: [
      {
        title: "Vision Wall",
        purpose: "Present direction without making promises.",
        details: ["Mission", "Aspirations", "Open questions"]
      },
      {
        title: "Learning Roadmap",
        purpose: "Show continuous growth as part of the Builder identity.",
        details: ["Technologies", "Research areas", "Books", "Skills"]
      },
      {
        title: "The Horizon",
        purpose: "Leave visitors with optimism rather than completion.",
        details: ["Possibility", "Direction", "Unfinished work"]
      }
    ]
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    question: "What can we build together?",
    headline: "Contact should feel like the beginning of a conversation.",
    summary:
      "This identity invites collaboration, opportunities, resume access and meaningful conversations without becoming transactional.",
    environment: "Quiet conversation space connected back to the Entrance Hall.",
    builderOutfit: "Professional, approachable clothing with notebook and backpack.",
    builderEquipment: ["Notebook", "Resume", "Contact cards"],
    builderBehavior: "Closing a notebook, preparing to continue the conversation and returning to work.",
    atmosphere: "Warm, clear, respectful and open.",
    accent: "glass",
    visibleInPrimaryNavigation: true,
    zones: [
      {
        title: "Conversation",
        purpose: "Invite collaboration without sales language.",
        details: ["Opportunities", "Collaboration", "Hiring", "Building together"]
      },
      {
        title: "Resume Access",
        purpose: "Provide practical next steps while preserving the Atlas tone.",
        details: ["Resume", "Email", "Social links"]
      }
    ]
  }
];

export const getIdentityChapter = (id: string): IdentityChapter | undefined =>
  identityChapters.find((chapter) => chapter.id === id);

export const getIdentityByPath = (path: string): IdentityChapter | undefined =>
  identityChapters.find((chapter) => chapter.path === path);
