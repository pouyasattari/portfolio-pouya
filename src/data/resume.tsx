import { Icons } from "@/components/icons";
import { HomeIcon, GitBranch, GraduationCap } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Pouya (Peter) Sattari",
  initials: "PS",
  url: "https://sattari.org",
  location: "Italy",
  locationLink: "https://www.google.com/maps/place/Italy",
  description:
    "Builder and Researcher",
  subDescription:
    "Data & AI Engineer, NLP Researcher",
  summary:
    "I'm a Data & AI Engineer based in Bolzano, Italy. I focus on building AI agents, integrations, and data systems to deliver impactful outcomes. Having recently graduated with an MS in Data Science, I conduct research in event and information extraction with LLMs.",
  avatarUrl: "/me.jpg",
  sourceUrl: "https://github.com/pouyasattari/portfolio-pouya",
  skills: [
    { name: "Python", icon: Python },
    { name: "Databricks", icon: Icons.databricks },
    { name: "SQL", icon: Icons.sql },
    { name: "Postgres", icon: Postgresql },
    { name: "Git", icon: Icons.git },
    { name: "Docker", icon: Docker },
    { name: "AWS", icon: Icons.aws },
    { name: "Django", icon: Icons.django },
    { name: "Typescript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
  ],
  contact: {
    email: "pouya@sattari.org",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/pouya-sattari/",
        icon: Icons.linkedin,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/pouyasattari",
        icon: Icons.github,
        navbar: true,
      },
      Medium: {
        name: "Medium",
        url: "https://pouyasattari.medium.com/",
        icon: Icons.medium,
        navbar: true,
      },
      GoogleScholar: {
        name: "Google Scholar",
        url: "https://scholar.google.com/citations?user=_6pPgFUAAAAJ&hl=en",
        icon: GraduationCap,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Soource",
      href: "https://soource.com/",
      badges: [],
      location: "Bolzano, Italy",
      title: "Data & AI Engineer | Full stack",
      logoUrl: "/logos/soource_logo.jpeg",
      start: "April 2025",
      end: "Sep 2026",
      highlightPhrases: [
        "own the data layer",
        "internal supplier data enriched with verified external sources",
        "end-to-end ownership",
        "commercial datasets, open data and APIs",
        "evaluate and negotiate them with providers and data partners",
        "20+ providers",
        "contract and renewal negotiation",
        "schema evolution",
        "custom data integrations for enterprise customers",
        "logging, observability and proactive anomaly handling",
        "Postgres",
        "OpenSearch",
        "Databricks",
        "Python",
        "AWS",
        "Bedrock/AgentCore",
        ", S3, IAM, CloudWatch",
        "REST API",
        "building data integration and evaluation pipelines",
        "maintaining analytics systems",
        "developing LLM-as-a-judge evaluations",
        "SQL queries",
        "extraction, validation, KPI tracking, and reporting",
        "data storytelling",
        "Looker Studio, Tableau",
      ],
      description:
        "As a Data & AI Engineer at Soource (an agentic procurement platform) I own the data layer those agents depend on. Including, internal supplier data enriched with verified external sources\n\nI hold end-to-end ownership of that data: I identify new integration opportunities across commercial datasets, open data and APIs, evaluate and negotiate them with providers and data partners, then build and maintain the production pipelines that keep them fresh, consistent and correct. I've integrated 20+ providers this way, handling technical evaluation, contract and renewal negotiation, ingestion, and schema evolution as fields change.\n\nI also build custom data integrations for enterprise customers: import/export formats, dedicated delivery, and direct technical contact with their engineering teams, backed by logging, observability and proactive anomaly handling so the flows keep working always documented!\n\nDay to day this spans Postgres, OpenSearch, Databricks, Python and AWS (Bedrock/AgentCore, S3, IAM, CloudWatch), REST API work on the supplier data model.\n\nI am also responsible for building data integration and evaluation pipelines, maintaining analytics systems, and developing LLM-as-a-judge evaluations. I optimize SQL queries for extraction, validation, KPI tracking, and reporting. I also create data storytelling assets and visualizations for internal teams and customers using tools such as Looker Studio, Tableau.",
    },
    {
      company: "DESSERT Research Lab, UNINA",
      badges: [],
      href: "https://dessert.unina.it/",
      location: "Naples, Italy",
      title: "Research Assistant | NLP",
      logoUrl: "/logos/dessert_lab_logo.png",
      start: "Jan 2025",
      end: "Jun 2025",
      galleryImage: "/EAE.webp",
      galleryImageWidth: 800,
      galleryImageHeight: 450,
      paperUrl: "https://arxiv.org/abs/2607.16808",
      highlightPhrases: [
        "Natural Language Processing",
        "extracting structured event information",
        "downstream analysis",
        "fine-tuned and evaluated",
        "open-source LLMs",
        "MAVEN-ARG",
        "schema compliance",
        "enforce structured output quality",
      ],
      description:
        "As a Research Assistant in the DESSERT (DEpendable and Secure Software Engineering and Real-Time Systems) research group at the Universita degli Studi di Napoli Federico II, I conduct applied research in Natural Language Processing focused on extracting structured event information from unstructured text. In this work, I developed an end-to-end information extraction pipeline to identify events and their key attributes from documents, and designed task formulations and labeling schemas to ensure the extracted outputs are consistent and reusable for downstream analysis. I also fine-tuned and evaluated modern open-source LLMs (Llama, Mistral, Phi, Qwen3) to improve event understanding performance on the MAVEN-ARG benchmark dataset, and built a mapping system with validation logic to enforce structured output quality and schema compliance.",
    },
    {
      company: "Eurac",
      badges: [],
      location: "Bolzano, Italy",
      title: "Research Engineer | Data & Infrastructure",
      logoUrl: "/logos/eurac_logo.jpg",
      start: "Sep 2026",
      end: undefined,
      description: "",
    },
    {
      company: "Microsoft",
      href: "https://www.microsoft.com/en-hk/events/azure",
      badges: [],
      location: "Hong Kong SAR",
      title: "Software Engineer Intern | Azure",
      logoUrl: "/logos/microsoft_logo.jpeg",
      start: "July 2024",
      end: "July 2024",
      galleryImage: "/microsoft-azure.jpeg",
      galleryImageWidth: 1911,
      galleryImageHeight: 1115,
      highlightPhrases: [
        "AI Agents",
        "agentic AI",
        "Azure AI Foundry",
        "Azure OpenAI Service",
        "multi-agent orchestration",
        "function calling",
      ],
      description:
        "At Microsoft Hong Kong, I studied how enterprises build AI Agents on Azure. I worked through Azure AI Foundry and Azure OpenAI Service to see how planning, function calling, memory, and grounding come together into reliable agentic workflows, and discussed multi-agent orchestration and safety guardrails with Microsoft engineers.",
    },
    {
      company: "Le Mummarelle",
      badges: [],
      location: "Naples, Italy",
      title: "Software Engineer | LLMs",
      logoUrl: "/lemummarelle.jpeg",
      start: "Jul 2023",
      end: "Dec 2023",
      highlightPhrases: [
        "Fine-tuned LLM models",
        "12k+ customer reviews",
        "LLM pipeline",
        "policy documents",
        "RAG",
        "predictive models in Python",
        "Airflow ETL pipeline",
        "AWS",
        "Tableau dashboards",
      ],
      description:
        "As a Software Engineer at Le Mummarelle, I fine-tuned LLM models to analyze and classify 12k+ customer reviews into failure categories, built an LLM pipeline to validate insights against policy documents and reduce non-compliant outputs, and integrated RAG with fine-tuned LLMs to improve contextual understanding and extract key issues. In this role, I also developed predictive models in Python to analyze flight cancellation patterns for the Napoli airport, forecasted peak season trends and provided the marketing team with dynamic pricing strategies, and architected and deployed an Airflow ETL pipeline using AWS, supporting 5+ Tableau dashboards and reducing data processing time by 20%.",
    },
    {
      company: "Kara Group",
      badges: [],
      location: "Montreal, Canada (remote)",
      title: "Research Engineer",
      logoUrl: "/karagroup.jpeg",
      start: "Dec 2021",
      end: "Dec 2022",
      highlightPhrases: [
        "AI-Blockchain integrity",
        "DLT",
        "DeFi",
        "Payment Systems",
        "AML/KYC",
        "AI Solution Developer",
      ],
      description:
        "As a Research Engineer at Kara Group, I researched AI-Blockchain integrity, DLT, DeFi, Payment Systems, and AML/KYC. In this role, I created reporting and visualizations for technical and marketing teams and stakeholders to enhance project engagement, presented blockchain projects including Miracle to investors, and contributed as AI Solution Developer.",
    },
    {
      company: "Azad University (IAU) | Blockchain Lab",
      badges: [],
      location: "",
      title: "Research Assistant",
      logoUrl: "/azad_university.jpeg",
      start: "Jan 2022",
      end: "Mar 2022",
      highlightPhrases: [
        "stablecoins",
        "smart contract security",
        "Decentralized university payment system",
      ],
      description:
        "As a Research Assistant at Azad University (IAU) | Blockchain Lab, I worked on a decentralized university payment system using stablecoins, with a focus on smart contract security.",
    },
  ],
  education: [
    {
      school: "University of Naples, Federico II",
      href: "/academic-projects",
      newTab: true,
      degree: "Master's Degree of Data science",
      logoUrl: "/logos/unina_uni_logo.jpeg",
      start: "2022",
      end: "2025",
      location: "Naples, Italy",
      // Research role carried out at Federico II — shown nested under this entry.
      linkedExperience: "DESSERT Research Lab, UNINA",
    },
  ],
  publications: [
    {
      slug: "schema-constrained-document-level-event-argument-extraction",
      title:
        "Schema-Constrained Document-Level Event Argument Extraction with Lightweight LLM Fine-Tuning",
      authors: [
        { name: "Roberto Pietrantuono", isMe: false },
        { name: "Antonio Guerriero", isMe: false },
        { name: "Pouya Sattari", isMe: true },
      ],
      venue: "ECML PKDD 2026",
      venueLong:
        "European Conference on Machine Learning and Principles and Practice of Knowledge Discovery in Databases",
      logoUrl: "/logos/springer_nature.png",
      location: "Naples, Italy 🇮🇹",
      dates: "Sep 7 - 11",
      year: "2026",
      datePublished: "2026-07",
      publisher: "arXiv",
      arxivId: "2607.16808",
      pdfUrl: "https://arxiv.org/pdf/2607.16808",
      // Human-facing chips shown on the publication page — keep concise.
      keywords: [
        "Event Argument Extraction",
        "Document-Level Information Extraction",
        "Large Language Models",
        "LoRA Fine-Tuning",
        "Schema-Constrained Extraction",
        "MAVEN-ARG",
        "Natural Language Processing",
      ],
      // Broader machine-facing topics (NOT rendered as visible chips). Feed the
      // meta keywords, citation_keywords, JSON-LD keywords/about, and llms.txt
      // so search engines, LLMs, and research agents match related work. Every
      // term must be genuinely present in the paper — no keyword stuffing.
      topics: [
        // Related tasks / research areas
        "Event Extraction",
        "Event Detection",
        "Document-Level Event Extraction",
        "Information Extraction",
        "Structured Information Extraction",
        "Relation Extraction",
        "Semantic Role Labeling",
        "Event Coreference Resolution",
        "Entity Coreference Resolution",
        "Structured Prediction",
        "Constrained Decoding",
        "JSON-Constrained Generation",
        "Schema Compliance",
        // Training methods
        "Parameter-Efficient Fine-Tuning",
        "PEFT",
        "Low-Rank Adaptation",
        "Supervised Fine-Tuning",
        "Instruction Tuning",
        // Tools / frameworks
        "Unsloth",
        "Hugging Face Transformers",
        // Models evaluated
        "Phi-4",
        "Phi",
        "Llama",
        "Mistral",
        "Qwen3",
        "open-weight LLMs",
        "mid-sized open LLMs",
        // Data / benchmarks
        "MAVEN",
        "event coreference F1",
      ],
      bibtex: `@misc{pietrantuono2026schemaconstraineddocumentleveleventargument,
      title={Schema-Constrained Document-Level Event Argument Extraction with Lightweight LLM Fine-Tuning},
      author={Roberto Pietrantuono and Antonio Guerriero and Pouya Sattari},
      year={2026},
      eprint={2607.16808},
      archivePrefix={arXiv},
      primaryClass={cs.CL},
      url={https://arxiv.org/abs/2607.16808},
}`,
      abstract:
        "Event Argument Extraction (EAE) converts documents into structured event records by identifying argument spans and assigning them schema-defined roles. Document-level EAE is challenging due to long-range dependencies between triggers and arguments, cross-sentence context, and strict role constraints, which often lead to boundary errors, uncertainty in roles, and inconsistencies with restricted schemas. In this paper, we study whether mid-sized open LLMs can perform schema-constrained EAE reliably at the document level on MAVEN-ARG. Our approach combines (i) role-set injection in prompts for schema compliance, (ii) parameter-efficient supervised fine-tuning (LoRA) using the same JSON-only interface used at inference, and (iii) deterministic decoding with post-processing that validates JSON, filters invalid roles, de-duplicates arguments, and aligns spans to the document window. Under the official MAVEN-ARG evaluator, fine-tuned mid-sized open models outperform previously reported GPT baselines across mention, entity-coreference, and event-coreference evaluations; our best model (Phi-4, 14B) reaches 42.39% F1 at the event-coreference level.",
      repoUrl: "https://github.com/dessertlab/EAE/",
      paperUrl: "https://arxiv.org/abs/2607.16808",
    },
  ],
  writings: [
    {
      title: "Held-In & Held-Out Test. Why?",
      href: "https://pouyasattari.medium.com/train-dev-held-in-test-held-out-test-why-fe4717a9b5c0",
      description:
        "Why machine learning projects often need two separate test sets: a held-in test for evaluation during development, and a held-out test for an unbiased final assessment.",
      image: "/writings/held-in-held-out-test.webp",
      technologies: ["Machine Learning", "Model Evaluation"],
      links: [
        {
          type: "Medium",
          href: "https://pouyasattari.medium.com/train-dev-held-in-test-held-out-test-why-fe4717a9b5c0",
          icon: <Icons.medium className="size-3" />,
        },
      ],
    },
    {
      title: "Systems Thinking Tools - Understand Complex Problems",
      href: "https://pouyasattari.medium.com/systems-thinking-tools-c0762c9e1a17",
      description:
        "A holistic approach to understanding the interrelationships and dynamics within complex systems, covering concept maps, connection circles, the Iceberg Model, and feedback loops.",
      image: "/writings/systems-thinking-tools.webp",
      technologies: ["Systems Thinking", "Problem Solving"],
      links: [
        {
          type: "Medium",
          href: "https://pouyasattari.medium.com/systems-thinking-tools-c0762c9e1a17",
          icon: <Icons.medium className="size-3" />,
        },
      ],
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: [
    {
      title: "SFSCON | Sudtirol Software Engineering Hackathon",
      dates: "Nov 2024",
      location: "Bolzano, Italy 🇮🇹",
      description:
        "CleanLoop detects trash in images using AI (YOLOv8) and estimates cleaning time based on detected areas.",
      image: "/SFSCON.png",
      galleryImage: "/SFSCON2024HACKATHON.jpeg",
      galleryImageWidth: 2443,
      galleryImageHeight: 2445,
      technologies: [
        { name: "Python", icon: Python },
        { name: "FastAPI", icon: Icons.fastapi },
        { name: "YOLOv8", icon: Icons.yolov8 },
      ],
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/pouyasattari/trash-detection-cleanloop-project",
        },
        {
          title: "LinkedIn",
          icon: <Icons.linkedin className="h-4 w-4" />,
          href: "https://www.linkedin.com/posts/pouya-sattari_2024-was-a-year-of-learning-overcoming-fears-activity-7272338624669503488-R3V_?utm_source=share&utm_medium=member_desktop&rcm=ACoAACNRxIcBn5xYThE6nepLOBfjlblsONEtT3U",
        },
      ],
    },
    {
      title: "GenAI Hackathon",
      award: "Winner Team",
      dates: "July 2024",
      location: "Amsterdam, The Netherlands 🇳🇱",
      description:
        "MyGlow is an AI-powered virtual beauty coach that uses data and face scans to personalize routines and track progress.",
      image: "/aswatson.png",
      galleryImage: "/ASWATSON2024HACKATHON.jpeg",
      galleryImageWidth: 1192,
      galleryImageHeight: 732,
      technologies: [
        { name: "Python", icon: Python },
        { name: "Azure", icon: Icons.azure },
        { name: "OpenAI", icon: Icons.openai },
      ],
      links: [
        {
          title: "Medium",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://pouyasattari.medium.com/experience-of-as-watson-europian-hackathon-2024-amsterdam-netherlands-cb08739f11f5",
        },
        {
          title: "LinkedIn",
          icon: <Icons.linkedin className="h-4 w-4" />,
          href: "https://www.linkedin.com/posts/pouya-sattari_genai-genai-aiabrbeautyabrmentor-activity-7185391380725121024-UXUR",
        },
      ],
    },
  ],
  workshops: [
    {
      title: "Graph Neural Networks (GNN) - Neo4j",
      organization: "University College Dublin",
      dates: "Apr - May 2023",
      location: "Dublin, Ireland 🇮🇪",
      description:
        "A five-week workshop on graph neural networks using Neo4j and Cypher to build graph databases, link prediction algorithms, and recommendation systems.",
      image: "/logos/ucd_logo.jpeg",
      galleryImage: "/neo4j-project.jpeg",
      galleryImageWidth: 2560,
      galleryImageHeight: 1600,
      technologies: [
        { name: "Neo4j", icon: Icons.neo4j },
        { name: "Cypher", icon: Icons.cypher },
        { name: "GNN", icon: Icons.gnn },
      ],
      links: [
        {
          title: "Project",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "/projects-content/graph-neural-networks-gnn-build-predict-neo4j",
        },
      ],
    },
  ],
  volunteering: [
    {
      title: "Communication Expert Volunteer",
      organization: "SFSCON | Südtirol Free Software Conference 2025",
      dates: "Nov 2025",
      image: "/SFSCON.png",
      galleryImage: "/VOLUNTEER2025SFSCON.jpeg",
      galleryImageWidth: 2048,
      galleryImageHeight: 1365,
      location: "",
      description: "",
      technologies: [],
      links: [
        {
          title: "LinkedIn",
          icon: <Icons.linkedin className="h-4 w-4" />,
          href: "https://www.linkedin.com/posts/pouya-sattari_volunteering-volunteering-activity-7400926783170224128-8Go-?utm_source=share&utm_medium=member_desktop&rcm=ACoAACNRxIcBn5xYThE6nepLOBfjlblsONEtT3U",
        },
      ],
    },
  ],
  digitalResources: [
    {
      title: "Git for your 1st day in a Production Team",
      description:
        "Made for recent graduates, students, and researchers",
      dates: "2026",
      image: undefined,
      icon: GitBranch,
      pdf: "/uploads/2026/06/git-first-day-production-team.pdf",
      links: [],
    },
  ],
} as const;
