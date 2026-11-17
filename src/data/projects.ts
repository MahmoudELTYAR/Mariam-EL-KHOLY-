export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  year?: string;
  role: string;
  client?: string;
  category: string;
  description: string;
  tools: string[];
  cover: string;
  coverAlt: string;
  gallery: { src: string; alt: string }[];
  problem: string;
  solution: string;
  outcome: string;
  accent: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "dhara",
    title: "Dhara Hospitality",
    shortTitle: "Dhara",
    year: "2025",
    role: "UI/UX Designer",
    client: "Dhara Hotels — Fayrouz Sanctuary",
    category: "Hospitality",
    description:
      "A luxury editorial website for a Nile dahabiya retreat — calm typography, immersive photography, and booking journeys that feel as considered as the voyage itself.",
    tools: ["Figma", "Design Systems", "Prototyping", "Responsive UI"],
    cover: "/projects/dhara/cover.webp",
    coverAlt: "Dhara Hospitality — Fayrouz Sanctuary gallery hero",
    gallery: [
      {
        src: "/projects/dhara/gallery-01.webp",
        alt: "Dhara Hospitality — screen 2",
      },
      {
        src: "/projects/dhara/gallery-02.webp",
        alt: "Dhara Hospitality — screen 3",
      },
      {
        src: "/projects/dhara/gallery-03.webp",
        alt: "Dhara Hospitality — screen 4",
      },
      {
        src: "/projects/dhara/gallery-04.webp",
        alt: "Dhara Hospitality — screen 5",
      },
      {
        src: "/projects/dhara/gallery-05.webp",
        alt: "Dhara Hospitality — screen 6",
      },
      {
        src: "/projects/dhara/gallery-06.webp",
        alt: "Dhara Hospitality — screen 7",
      },
      {
        src: "/projects/dhara/gallery-07.webp",
        alt: "Dhara Hospitality — screen 8",
      },
      {
        src: "/projects/dhara/gallery-08.webp",
        alt: "Dhara Hospitality — screen 9",
      },
      {
        src: "/projects/dhara/gallery-09.webp",
        alt: "Dhara Hospitality — screen 10",
      },
      {
        src: "/projects/dhara/gallery-10.webp",
        alt: "Dhara Hospitality — screen 11",
      },
      {
        src: "/projects/dhara/gallery-11.webp",
        alt: "Dhara Hospitality — screen 12",
      },
      {
        src: "/projects/dhara/gallery-12.webp",
        alt: "Dhara Hospitality — screen 13",
      }
    ],
    problem:
      "Luxury Nile travel often looks generic online — crowded grids, stocky type, and booking flows that break the sense of quiet exclusivity.",
    solution:
      "I built a serene visual system: high-contrast serif headlines, generous whitespace, masonry storytelling, and clear journey CTAs that guide guests from desire to booking.",
    outcome:
      "A premium digital presence that mirrors the sanctuary experience — readable on mobile, emotionally rich on desktop, and ready for developer handoff.",
    accent: "#C8A96B",
    featured: true,
  },
  {
    slug: "uthaibat",
    title: "Al-Uthaibat",
    shortTitle: "Uthaibat",
    year: "2025",
    role: "UI/UX Designer",
    client: "Saudi heritage initiative",
    category: "Culture & Heritage",
    description:
      "A bilingual RTL platform for Saudi architectural heritage — books, partners, research, and place-based storytelling rooted in clay, craft, and community.",
    tools: ["Figma", "RTL Layout", "Design Systems", "Content Architecture"],
    cover: "/projects/uthaibat/cover.webp",
    coverAlt: "Al-Uthaibat — heritage books library interface",
    gallery: [
      {
        src: "/projects/uthaibat/gallery-01.webp",
        alt: "Al-Uthaibat — screen 2",
      },
      {
        src: "/projects/uthaibat/gallery-02.webp",
        alt: "Al-Uthaibat — screen 3",
      },
      {
        src: "/projects/uthaibat/gallery-03.webp",
        alt: "Al-Uthaibat — screen 4",
      },
      {
        src: "/projects/uthaibat/gallery-04.webp",
        alt: "Al-Uthaibat — screen 5",
      },
      {
        src: "/projects/uthaibat/gallery-05.webp",
        alt: "Al-Uthaibat — screen 6",
      },
      {
        src: "/projects/uthaibat/gallery-06.webp",
        alt: "Al-Uthaibat — screen 7",
      }
    ],
    problem:
      "Heritage content is dense and institutional. Visitors needed a modern, respectful interface that still felt culturally grounded — not a museum brochure pasted into a template.",
    solution:
      "Navy, gold, and cream as a cultural palette; clear Arabic hierarchy; card systems for books and partners; and floating utilities that keep discovery light across long pages.",
    outcome:
      "A dignified digital archive experience that makes research feel inviting, and gives partners and publications equal visual weight.",
    accent: "#C5A059",
    featured: true,
  },
  {
    slug: "guiver",
    title: "Guiver",
    shortTitle: "Guiver",
    year: "2025",
    role: "UI/UX Designer",
    client: "Guiver — private European travel",
    category: "Travel",
    description:
      "Brand and website for a Munich-based private road-travel experience — editorial storytelling, trip discovery, and a personal host narrative that turns transfers into journeys.",
    tools: ["Figma", "Brand UI", "Prototyping", "Responsive Design"],
    cover: "/projects/guiver/cover.webp",
    coverAlt: "Guiver — European private travel hero interface",
    gallery: [
      {
        src: "/projects/guiver/gallery-01.webp",
        alt: "Guiver — screen 2",
      },
      {
        src: "/projects/guiver/gallery-02.webp",
        alt: "Guiver — screen 3",
      },
      {
        src: "/projects/guiver/gallery-03.webp",
        alt: "Guiver — screen 4",
      },
      {
        src: "/projects/guiver/gallery-04.webp",
        alt: "Guiver — screen 5",
      },
      {
        src: "/projects/guiver/gallery-05.webp",
        alt: "Guiver — screen 6",
      },
      {
        src: "/projects/guiver/gallery-06.webp",
        alt: "Guiver — screen 7",
      },
      {
        src: "/projects/guiver/gallery-07.webp",
        alt: "Guiver — screen 8",
      },
      {
        src: "/projects/guiver/gallery-08.webp",
        alt: "Guiver — screen 9",
      },
      {
        src: "/projects/guiver/gallery-09.webp",
        alt: "Guiver — screen 10",
      },
      {
        src: "/projects/guiver/gallery-10.webp",
        alt: "Guiver — screen 11",
      },
      {
        src: "/projects/guiver/gallery-11.webp",
        alt: "Guiver — screen 12",
      }
    ],
    problem:
      "Private chauffeur services rarely feel branded. Guiver needed to communicate trust, personality, and luxury without looking like a taxi app.",
    solution:
      "A cinematic hero, lime-volt accents on deep navy, city trip cards with pricing clarity, and long-form sections that introduce Islam as host — not just driver.",
    outcome:
      "A distinctive travel brand site that sells stories and routes, with clear CTAs for booking conversations.",
    accent: "#D4FF37",
    featured: true,
  },
  {
    slug: "janalya",
    title: "Janalya",
    shortTitle: "Janalya",
    year: "2024",
    role: "UI/UX Designer",
    client: "Janalya String Art — Alexandria",
    category: "E-commerce",
    description:
      "E-commerce interface for a handmade string-art brand — product storytelling, filters, and a warm editorial shop that lets craftsmanship lead the purchase.",
    tools: ["Figma", "E-commerce UI", "Product Design", "Responsive UI"],
    cover: "/projects/janalya/cover.webp",
    coverAlt: "Janalya — handmade string art collection storefront",
    gallery: [
      {
        src: "/projects/janalya/gallery-01.webp",
        alt: "Janalya — screen 2",
      },
      {
        src: "/projects/janalya/gallery-02.webp",
        alt: "Janalya — screen 3",
      },
      {
        src: "/projects/janalya/gallery-03.webp",
        alt: "Janalya — screen 4",
      },
      {
        src: "/projects/janalya/gallery-04.webp",
        alt: "Janalya — screen 5",
      },
      {
        src: "/projects/janalya/gallery-05.webp",
        alt: "Janalya — screen 6",
      },
      {
        src: "/projects/janalya/gallery-06.webp",
        alt: "Janalya — screen 7",
      }
    ],
    problem:
      "Handmade work dies in generic Shopify skins. Janalya needed a shop that feels as intentional as each woven piece.",
    solution:
      "Earthy browns and cream, serif product titles, dimension and investment filters, and PDP storytelling that explains materials, hours of craft, and collector editions.",
    outcome:
      "A boutique shopping experience that elevates string art from craft stall to collectible — clear paths from browse to cart.",
    accent: "#8B6B45",
    featured: true,
  },
  {
    slug: "oroba",
    title: "Orouba",
    shortTitle: "Orouba",
    year: "2026",
    role: "UI/UX Designer",
    client: "Orouba Developments",
    category: "Real Estate",
    description:
      "A quiet luxury website for an Egyptian development house — heritage timeline, executive stewardship, and contact journeys framed by architecture and landscape.",
    tools: ["Figma", "Editorial Layout", "Prototyping", "Design Systems"],
    cover: "/projects/oroba/cover.webp",
    coverAlt: "Orouba — luxury developments brand interface",
    gallery: [
      {
        src: "/projects/oroba/gallery-01.webp",
        alt: "Orouba — screen 2",
      },
      {
        src: "/projects/oroba/gallery-02.webp",
        alt: "Orouba — screen 3",
      },
      {
        src: "/projects/oroba/gallery-03.webp",
        alt: "Orouba — screen 4",
      },
      {
        src: "/projects/oroba/gallery-04.webp",
        alt: "Orouba — screen 5",
      }
    ],
    problem:
      "Real-estate sites often shout. Orouba needed restraint — forest greens, stone imagery, and copy that signals legacy without brochure clichés.",
    solution:
      "Asymmetrical editorial grids, overlapping detail photography, a chronological Epoch narrative, and a refined contact form for private site tours.",
    outcome:
      "A brand site that feels like a destination brochure and a boardroom document at once — calm, credible, conversion-ready.",
    accent: "#3D5C4A",
    featured: true,
  },
  {
    slug: "sdm",
    title: "Smart Digital Marketing",
    shortTitle: "SDM",
    year: "2025",
    role: "UI/UX Designer",
    client: "Smart Digital Marketing",
    category: "Agency",
    description:
      "Corporate website for a digital agency — dark, precise, and conversion-focused, with regional partner showcases and a contact experience that feels always-on.",
    tools: ["Figma", "Corporate UI", "Design Systems", "Responsive UI"],
    cover: "/projects/sdm/cover.webp",
    coverAlt: "Smart Digital Marketing — agency website hero",
    gallery: [
      {
        src: "/projects/sdm/gallery-01.webp",
        alt: "Smart Digital Marketing — screen 2",
      },
      {
        src: "/projects/sdm/gallery-02.webp",
        alt: "Smart Digital Marketing — screen 3",
      },
      {
        src: "/projects/sdm/gallery-03.webp",
        alt: "Smart Digital Marketing — screen 4",
      },
      {
        src: "/projects/sdm/gallery-04.webp",
        alt: "Smart Digital Marketing — screen 5",
      },
      {
        src: "/projects/sdm/gallery-05.webp",
        alt: "Smart Digital Marketing — screen 6",
      },
      {
        src: "/projects/sdm/gallery-06.webp",
        alt: "Smart Digital Marketing — screen 7",
      }
    ],
    problem:
      "Agency sites blur together. SDM needed a sharper digital face that signals technical precision and regional reach across Egypt and the Gulf.",
    solution:
      "Electric blue on deep charcoal, segmented regional partner filters, glowing form UI, and clear dual CTAs for journey vs partnership.",
    outcome:
      "A confident agency presence that supports real client acquisition — and a living design system I continue to refine in-house.",
    accent: "#3B82F6",
    featured: true,
  },
  {
    slug: "snapsale",
    title: "SnapSale",
    shortTitle: "SnapSale",
    year: "2025",
    role: "UI/UX Designer",
    client: "SmartDigital commerce platform",
    category: "SaaS / Dashboard",
    description:
      "A commerce operations dashboard — KPIs, sales charts, inventory alerts, refunds, and staff workflows designed for clarity under pressure.",
    tools: ["Figma", "Dashboard UI", "Data Visualization", "UX Flows"],
    cover: "/projects/snapsale/cover.webp",
    coverAlt: "SnapSale — commerce operations dashboard overview",
    gallery: [
      {
        src: "/projects/snapsale/gallery-01.webp",
        alt: "SnapSale — screen 2",
      },
      {
        src: "/projects/snapsale/gallery-02.webp",
        alt: "SnapSale — screen 3",
      },
      {
        src: "/projects/snapsale/gallery-03.webp",
        alt: "SnapSale — screen 4",
      },
      {
        src: "/projects/snapsale/gallery-04.webp",
        alt: "SnapSale — screen 5",
      },
      {
        src: "/projects/snapsale/gallery-05.webp",
        alt: "SnapSale — screen 6",
      },
      {
        src: "/projects/snapsale/gallery-06.webp",
        alt: "SnapSale — screen 7",
      },
      {
        src: "/projects/snapsale/gallery-07.webp",
        alt: "SnapSale — screen 8",
      },
      {
        src: "/projects/snapsale/gallery-08.webp",
        alt: "SnapSale — screen 9",
      },
      {
        src: "/projects/snapsale/gallery-09.webp",
        alt: "SnapSale — screen 10",
      },
      {
        src: "/projects/snapsale/gallery-10.webp",
        alt: "SnapSale — screen 11",
      },
      {
        src: "/projects/snapsale/gallery-11.webp",
        alt: "SnapSale — screen 12",
      }
    ],
    problem:
      "Ops teams drown in spreadsheets. SnapSale needed a dashboard that surfaces profit, stock risk, and refunds without visual noise.",
    solution:
      "Orange-forward brand accents, metric cards with status color, empty states that teach, and table patterns that stay scannable at a glance.",
    outcome:
      "A practical SaaS UI that makes daily commerce decisions faster — designed for Egyptian market currencies and real retail rhythms.",
    accent: "#F28C00",
    featured: true,
  },
];

export const otherWork = [
  {
    title: "RTS Travel",
    description:
      "Website and booking platform concepts for a travel company — journey discovery and reservation clarity.",
  },
  {
    title: "CrimeCatcher",
    description:
      "Public safety mobile UI in Figma with Illustrator branding and Flutter front-end exploration.",
  },
  {
    title: "Pharmacy Mobile App",
    description:
      "Accessible pharmacy experience designed in Figma and implemented in Flutter for all ages.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return projects[0];
  return projects[(i + 1) % projects.length];
}
