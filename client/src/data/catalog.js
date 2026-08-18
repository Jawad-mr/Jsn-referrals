// Centralized Catalog of Products & Services for JSN CREATIVE
// Source of truth: https://www.jsncreative.studio/

export const PRODUCTS = [
  {
    id: "bakery-pos",
    name: "Bakery POS App",
    slug: "bakery-pos",
    type: "product",
    category: "POS & Billing",
    badge: "Lifetime Access",
    featured: true,
    shortDescription:
      "Complete point-of-sale system designed specifically for bakeries — inventory, orders, and daily sales in one place.",
    description:
      "A dedicated, lightning-fast point-of-sale and inventory billing software designed from the ground up for modern bakeries, cake studios, and confectioneries. Eliminate manual billing errors and track ingredient costs seamlessly.",
    whatItDoes:
      "Manages high-volume walk-in counter sales, customized advance cake orders, recipe-level raw ingredient inventory, GST billing, and end-of-day revenue reconciliation with a single one-time lifetime license.",
    features: [
      "Rapid walk-in billing & thermal receipt printing",
      "Advance custom cake order tracking with delivery dates",
      "Raw material & finished goods inventory tracking",
      "Daily profit, expense, and revenue analytics",
      "Offline-ready counter resilience",
      "Lifetime access with zero recurring monthly fees",
    ],
    targetAudience: "Bakeries, cake artists, sweet shops, pastry kitchens, and confectionery cafes.",
    benefits: [
      "Zero monthly subscriptions (one-time purchase)",
      "Reduces counter wait times during peak rush hours",
      "Prevents stock wastage with low-ingredient alerts",
      "High commission payout potential for referrers",
    ],
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://bakery-pos-system-woad.vercel.app/",
    studioUrl: "https://www.jsncreative.studio/bakery-pos.html",
    commissionNote: "Earn commission on every closed license deal.",
  },
  {
    id: "restaurant-pos",
    name: "Restaurant POS App",
    slug: "restaurant-pos",
    type: "product",
    category: "POS & Billing",
    badge: "Popular",
    featured: true,
    shortDescription:
      "Table management, kitchen display, and billing — everything a modern restaurant needs to run smoothly.",
    description:
      "A unified restaurant operating system built for dine-in eateries, cafes, cloud kitchens, and fine dining. Integrates front-of-house table seating with real-time kitchen order tickets (KOT) and instant billing.",
    whatItDoes:
      "Handles table layout visualization, waiter ordering, kitchen display screens (KDS), split billing across cash/UPI/cards, and live sales performance reports.",
    features: [
      "Interactive visual floor plan & dynamic table management",
      "Instant Kitchen Order Ticket (KOT) routing to chef display",
      "Multi-mode split bill and UPI/Card billing",
      "Recipe cost calculations and daily menu availability toggle",
      "Comprehensive daily closing reports and staff performance",
      "One-time lifetime software license",
    ],
    targetAudience: "Restaurants, cafes, bistros, cloud kitchens, diners, and food court outlets.",
    benefits: [
      "Eliminates kitchen miscommunications and lost orders",
      "Speeds up table turnover and customer checkout",
      "No recurring SaaS subscription fee burden",
    ],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://restaurant-pos-app-rho.vercel.app/",
    studioUrl: "https://www.jsncreative.studio/restaurant-pos.html",
    commissionNote: "High-value referral with generous per-deal commission payout.",
  },
  {
    id: "gym-management",
    name: "Gym Management App",
    slug: "gym-management",
    type: "product",
    category: "Fitness & Management",
    badge: "Streamlined",
    featured: false,
    shortDescription:
      "Memberships, attendance, and trainer scheduling — streamlined.",
    description:
      "An intuitive, all-in-one gym administration platform built to automate member renewals, attendance logs, locker allocation, and personal trainer assignments without messy spreadsheets.",
    whatItDoes:
      "Keeps track of member subscription plans, generates automated WhatsApp/SMS expiry reminders, logs check-in records, and calculates trainer commissions effortlessly.",
    features: [
      "Member database with biometric / QR check-in logs",
      "Automated subscription expiry and renewal alerts",
      "Trainer scheduling & slot management",
      "Payment receipts, balance dues tracking & UPI integration",
      "Gym financial analytics and active member dashboards",
    ],
    targetAudience: "Gyms, fitness centres, crossfit studios, yoga clubs, and sports academies.",
    benefits: [
      "Stops revenue leaks from expired unpaid memberships",
      "Saves gym owners hours of daily manual tracking",
      "Affordable one-time pricing for gym owners",
    ],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://gym-management-app-seven-gilt.vercel.app/",
    studioUrl: "https://www.jsncreative.studio/gym-management.html",
    commissionNote: "Earn commission on every gym or fitness studio you introduce.",
  },
  {
    id: "hotel-management",
    name: "Hotel Management App",
    slug: "hotel-management",
    type: "product",
    category: "Hospitality & Management",
    badge: "All-in-One",
    featured: false,
    shortDescription:
      "Bookings, housekeeping, and front desk — all unified.",
    description:
      "A complete property management suite built for boutique hotels, resorts, and homestays to run front-desk check-ins, room inventories, housekeeping routines, and guest billing under one dashboard.",
    whatItDoes:
      "Coordinates room availability calendars, guest IDs and payments, room service orders, and cleaning crew task lists in real time.",
    features: [
      "Visual room matrix with instant status (occupied, vacant, cleaning)",
      "Fast front-desk check-in, ID scanning & checkout folio generator",
      "Housekeeping workflow and maintenance dispatch",
      "Integrated room service and mini-bar billing",
      "Occupancy analytics, RevPAR, and revenue forecasts",
    ],
    targetAudience: "Hotels, resorts, boutique lodges, homestays, and serviced apartments.",
    benefits: [
      "Prevents double bookings and front-desk confusion",
      "Provides crystal-clear daily guest billing and tax receipts",
      "Scalable from small 10-room homestays to large hotels",
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://hotel-management-app-mauve.vercel.app/",
    studioUrl: "https://www.jsncreative.studio/hotel-management.html",
    commissionNote: "Lucrative referral commission on hospitality software packages.",
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot Platform",
    slug: "ai-chatbot",
    type: "product",
    category: "AI Solutions",
    badge: "AI Powered",
    featured: true,
    shortDescription:
      "Intelligent chatbot platform deployable on your website or app.",
    description:
      "A custom conversational AI agent trained specifically on your company's knowledge base, website docs, and pricing to engage visitors, answer questions instantly, and capture verified leads 24/7.",
    whatItDoes:
      "Replaces static inquiry forms with natural, human-like interactive conversations that qualify leads, book appointments, and sync data directly to your team's WhatsApp or CRM.",
    features: [
      "Trained on your private business documents and FAQs",
      "24/7 automated lead capture with instant team notifications",
      "Multi-lingual customer query understanding",
      "Embeddable widget with custom brand styling and avatar",
      "Human handover mode when complex inquiries occur",
    ],
    targetAudience: "E-commerce stores, real estate agencies, software companies, and service businesses.",
    benefits: [
      "Never miss a late-night customer lead again",
      "Cuts repetitive support inquiry workload by up to 70%",
      "Increases website visitor-to-lead conversion rates",
    ],
    image: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/",
    studioUrl: "https://www.jsncreative.studio/ai-chatbot.html",
    commissionNote: "High demand across businesses of all sizes.",
  },
  {
    id: "ebooks",
    name: "E-Books & Learning Hub",
    slug: "ebooks",
    type: "product",
    category: "Digital Publishing",
    badge: "Educational",
    featured: false,
    shortDescription:
      "Curated digital publications on tech, business, and education.",
    description:
      "Carefully crafted digital publications, guides, and practical playbooks created by Jsn Creative covering software development, entrepreneurship, and digital career advancement.",
    whatItDoes:
      "Delivers high-quality digital reading materials with clean typography, interactive exercises, and downloadable career toolkits.",
    features: [
      "Curated technical and business guides",
      "Instant digital access across all devices",
      "Practical actionable templates and real-world case studies",
      "Regular edition updates",
    ],
    targetAudience: "Students, self-taught developers, aspiring founders, and creative professionals.",
    benefits: [
      "Concise, fluff-free knowledge directly from active practitioners",
      "Affordable and instantly accessible worldwide",
    ],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://dexterity-learn.vercel.app/",
    studioUrl: "https://www.jsncreative.studio/ebooks.html",
    commissionNote: "Accessible product with high volume sharing potential.",
  },
];

export const SERVICES = [
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    type: "service",
    category: "Development",
    badge: "Core Service",
    shortDescription:
      "Fast, modern websites and web applications built with the latest technologies.",
    description:
      "End-to-end custom web engineering from high-converting corporate websites and e-commerce portals to sophisticated SaaS web apps built using React, Next.js, Node.js, and modern cloud databases.",
    whatItProvides:
      "Responsive custom design, fast page load speeds, SEO optimization, CMS & admin portals, secure payment gateways, and reliable hosting infrastructure.",
    whoNeedsIt:
      "Startups, retail stores, corporate brands, and local businesses wanting a high-converting web presence.",
    keyBenefits: [
      "Lightning-fast load speeds with modern tech stack",
      "Search-engine-friendly clean semantic architecture",
      "Mobile-first responsive design for all screen sizes",
      "Direct client support and warranty",
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/web-development.html",
    commissionNote: "Top earning category — web projects yield substantial commissions.",
  },
  {
    id: "app-development",
    name: "Mobile App Development",
    slug: "app-development",
    type: "service",
    category: "Development",
    badge: "iOS & Android",
    shortDescription:
      "Native and cross-platform mobile apps for iOS and Android.",
    description:
      "Production-ready mobile applications built with Flutter and React Native. Smooth 60fps performance, intuitive gesture controls, offline support, and full deployment to the Apple App Store and Google Play Store.",
    whatItProvides:
      "Complete mobile UX/UI architecture, native device feature integration (Camera, GPS, Biometrics), push notification systems, secure backend APIs, and app store compliance.",
    whoNeedsIt:
      "Businesses launching on-demand services, booking apps, customer loyalty portals, and mobile-first products.",
    keyBenefits: [
      "Single high-quality codebase for both iOS and Android",
      "Smooth native animations and delightful interactions",
      "Complete App Store and Play Store approval assistance",
    ],
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/app-development.html",
    commissionNote: "High contract values make app referrals very rewarding.",
  },
  {
    id: "custom-software",
    name: "Custom Software Engineering",
    slug: "custom-software",
    type: "service",
    category: "Software Engineering",
    badge: "Enterprise",
    shortDescription:
      "Tailor-made software solutions for complex business workflows.",
    description:
      "Bespoke software systems engineered to solve unique organizational bottlenecks. From customized inventory and warehouse management to internal ERPs and automated client pipelines.",
    whatItProvides:
      "In-depth workflow discovery, custom relational & document database design, role-based access control, third-party API orchestration, and comprehensive documentation.",
    whoNeedsIt:
      "Growing companies that have outgrown Excel spreadsheets or generic SaaS tools and need a custom system.",
    keyBenefits: [
      "Built 100% around your exact operational processes",
      "Full ownership of software without recurring user seat licenses",
      "Scalable infrastructure designed for business expansion",
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/custom-software.html",
    commissionNote: "High ticket enterprise projects yield top-tier referrer rewards.",
  },
  {
    id: "ai-solutions",
    name: "AI Solutions & Integration",
    slug: "ai-solutions",
    type: "service",
    category: "Artificial Intelligence",
    badge: "Cutting-Edge",
    shortDescription:
      "Custom AI models, chatbots, and intelligent automation for your business.",
    description:
      "Transforming business operations using state-of-the-art AI. We build custom LLM agents, intelligent automated document analyzers, sentiment systems, and customer-facing AI assistants.",
    whatItProvides:
      "Custom LLM fine-tuning, RAG (Retrieval-Augmented Generation) on business knowledge bases, AI agent automation pipelines, and existing software AI retrofitting.",
    whoNeedsIt:
      "Forward-thinking companies wanting to automate customer support, speed up data processing, and boost productivity.",
    keyBenefits: [
      "Cuts operational turnaround times from hours to seconds",
      "Automates repetitive manual administrative tasks",
      "Offers significant competitive advantage in any industry",
    ],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/ai-solutions.html",
    commissionNote: "Fast-growing sector with massive client interest.",
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    slug: "ui-ux-design",
    type: "service",
    category: "Design & Branding",
    badge: "Design",
    shortDescription:
      "User-centred interfaces that convert visitors into loyal customers.",
    description:
      "Product discovery, wireframing, interactive prototyping, and design systems in Figma that make complex web and mobile apps feel natural, modern, and effortless to navigate.",
    whatItProvides:
      "User research, UX wireframes, interactive Figma prototypes, mobile & desktop design systems, asset exports, and developer handoff specs.",
    whoNeedsIt:
      "Founders with product ideas, apps needing a modern redesign, and companies wanting to boost user retention.",
    keyBenefits: [
      "Higher conversion rates and lower user bounce rates",
      "Pixel-perfect specifications ready for developers",
      "Premium aesthetic that elevates brand perception",
    ],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/ui-ux-design.html",
    commissionNote: "Easy to refer alongside web and app development deals.",
  },
  {
    id: "seo-services",
    name: "SEO Services & Local Ranking",
    slug: "seo-services",
    type: "service",
    category: "Marketing & Growth",
    badge: "Growth",
    shortDescription:
      "Search engine strategies that drive organic growth and visibility.",
    description:
      "Comprehensive search engine optimization combining technical code optimizations, Schema.org rich snippets, keyword strategies, and Google Business profile optimization to dominate local search.",
    whatItProvides:
      "Technical site audits, speed optimization, keyword content mapping, Google Search Console & Analytics setup, backlink strategies, and local ranking optimization.",
    whoNeedsIt:
      "Local businesses, clinics, retail shops, and companies looking for steady organic leads without paying for ads.",
    keyBenefits: [
      "Long-term sustainable organic customer acquisition",
      "Dominates Google search results for local keyword searches",
      "Increases website domain authority and credibility",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/seo-services.html",
    commissionNote: "Recurring retainer potential for referrers.",
  },
  {
    id: "graphic-designing",
    name: "Graphic Designing & Brand Identity",
    slug: "graphic-designing",
    type: "service",
    category: "Design & Branding",
    badge: "Branding",
    shortDescription:
      "Logos, branding, and visual identities that make a lasting impression.",
    description:
      "Distinct visual identities, logos, brand guidelines, social media assets, and print collateral that give companies a memorable, authoritative market presence.",
    whatItProvides:
      "Vector logo suites, brand typography & color systems, business cards, pitch decks, social media templates, and marketing materials.",
    whoNeedsIt:
      "New startups, businesses undergoing rebranding, and companies needing cohesive marketing visual assets.",
    keyBenefits: [
      "Consistent, memorable visual identity across all channels",
      "High-resolution vector assets for print and digital media",
    ],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/graphic-designing.html",
    commissionNote: "Quick closing cycle with frequent referrals.",
  },
  {
    id: "video-editing",
    name: "Video Production & Editing",
    slug: "video-editing",
    type: "service",
    category: "Media Production",
    badge: "Media",
    shortDescription:
      "Professional video production and editing for brands and creators.",
    description:
      "High-retention video editing for viral social reels, YouTube content, product commercials, and corporate explainers with dynamic pacing, motion graphics, and sound design.",
    whatItProvides:
      "Short-form reel/TikTok/Shorts editing, YouTube long-form cuts, animated motion graphics, color grading, sound mixing, and subtitle styling.",
    whoNeedsIt:
      "Content creators, founders building personal brands, and companies running social video ad campaigns.",
    keyBenefits: [
      "High-retention editing techniques that keep viewers watching",
      "Fast turnaround times for social media marketing cadence",
    ],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/video-editing.html",
    commissionNote: "Popular among digital-first brands and creators.",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing & Ads",
    slug: "digital-marketing",
    type: "service",
    category: "Marketing & Growth",
    badge: "Performance",
    shortDescription:
      "Data-driven campaigns across social, email, and paid channels.",
    description:
      "Performance-focused digital advertising and marketing funnels across Google Ads, Meta (Instagram/Facebook) Ads, and email marketing designed to maximize return on ad spend (ROAS).",
    whatItProvides:
      "Paid ad campaign creation & A/B testing, audience targeting, landing page conversion tracking, email sequences, and weekly performance reporting.",
    whoNeedsIt:
      "Businesses with proven products ready to scale revenue and generate reliable customer leads.",
    keyBenefits: [
      "Data-driven focus on actual customer acquisition cost (CAC)",
      "Continuous optimization to improve ROAS",
    ],
    image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/digital-marketing.html",
    commissionNote: "Scalable project budgets with attractive commission margins.",
  },
  {
    id: "educational-consultancy",
    name: "Educational Consultancy",
    slug: "educational-consultancy",
    type: "service",
    category: "Consultancy",
    badge: "Advisory",
    shortDescription:
      "Guidance and resources to help students and institutions thrive.",
    description:
      "Specialized advisory for educational institutions, academies, and students covering digital education roadmaps, learning management software, and career technical pathways.",
    whatItProvides:
      "Institutional digital roadmap consulting, academic tech integration advisory, and career guidance workshops.",
    whoNeedsIt:
      "Colleges, schools, coaching institutes, and educational foundations.",
    keyBenefits: [
      "Modernizes academic infrastructure with verified digital tools",
      "Experienced guidance aligned with current industry standards",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    officialUrl: "https://www.jsncreative.studio/educational-consultancy.html",
    commissionNote: "Impactful domain with strong institutional referral potential.",
  },
];

export const VENTURES = [
  {
    name: "Scholars Guide",
    url: "https://scholars-guide.vercel.app/",
    description: "Education, career guidance & academic portal by Jsn Creative",
    category: "Education",
  },
  {
    name: "Dexterity Learn",
    url: "https://dexterity-learn.vercel.app/",
    description: "Digital publishing & e-book learning platform by Jsn Creative",
    category: "Publishing",
  },
  {
    name: "Work Mint",
    url: "https://work-mint-one.vercel.app/",
    description: "Freelance network & recruitment workspace by Jsn Creative",
    category: "Workplace",
  },
  {
    name: "Nexio Tech",
    url: "https://nexio-tech.vercel.app/",
    description: "SaaS applications & modern software solutions by Jsn Creative",
    category: "SaaS",
  },
  {
    name: "Livio Designs",
    url: "https://livio-designs.vercel.app/",
    description: "UI/UX, visual identity & branding studio by Jsn Creative",
    category: "Design",
  },
  {
    name: "Nexus Agents",
    url: "https://nexus-agents-ai.vercel.app/",
    description: "Autonomous AI agents & intelligent automation studio",
    category: "AI",
  },
];

export const ALL_OFFERINGS = [...PRODUCTS, ...SERVICES];

export function getOfferingBySlug(slug) {
  return ALL_OFFERINGS.find((item) => item.slug === slug || item.id === slug);
}
