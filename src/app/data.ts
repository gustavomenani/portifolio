/* Project data — mirrors content from the user's codebase (Gustavo Menani's portfolio) */

const tok = (color, text) => ({ c: color, t: text });

const projects = [
  {
    id: "eco-tech",
    title: "Eco-Tech",
    fileName: "sustainability.tsx",
    language: "TypeScript · React",
    branch: "main",
    year: "2025",
    accent: "oklch(0.58 0.14 155)", /* emerald */
    description:
      "Plataforma para práticas de sustentabilidade. Mapeia pegada de carbono de equipes e sugere ações automatizadas. Frontend em React + TypeScript com Tailwind, build via Vite.",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
    link: "https://github.com/gustavomenani/Eco-Tech",
    files: [
      { name: "app", type: "folder" },
      { name: "layout.tsx", type: "file", icon: "tsx", indent: 1 },
      { name: "page.tsx", type: "file", icon: "tsx", indent: 1 },
      { name: "components", type: "folder" },
      { name: "Dashboard.tsx", type: "file", icon: "tsx", indent: 1, active: true },
      { name: "Actions.tsx", type: "file", icon: "tsx", indent: 1 },
      { name: "Impact.tsx", type: "file", icon: "tsx", indent: 1 },
      { name: "lib", type: "folder" },
      { name: "carbon.ts", type: "file", icon: "ts", indent: 1 },
      { name: "package.json", type: "file", icon: "json" },
      { name: "tailwind.config.ts", type: "file", icon: "config" },
    ],
    code: [
      [tok("com","// Dashboard.tsx — realtime carbon footprint")],
      [tok("key","import"), tok("text"," { "), tok("text","useCarbonStream"), tok("text"," } "), tok("key","from"), tok("str"," \"@/lib/carbon\"")],
      [tok("key","import"), tok("text"," { "), tok("type","Impact"), tok("text",", "), tok("type","Action"), tok("text"," } "), tok("key","from"), tok("str"," \"@/types\"")],
      [],
      [tok("key","export default function"), tok("fn"," Dashboard"), tok("punct","() {")],
      [tok("text","  "), tok("key","const"), tok("text"," stream "), tok("punct","= "), tok("fn","useCarbonStream"), tok("punct","({ ")],
      [tok("text","    team: "), tok("str","\"ops\""), tok("punct",", ")],
      [tok("text","    window: "), tok("str","\"7d\"")],
      [tok("punct","  })")],
      [],
      [tok("text","  "), tok("key","return"), tok("text"," "), tok("punct","("),],
      [tok("punct","    <"), tok("type","Impact"), tok("text"," delta={stream.delta} "), tok("punct","/>")],
      [tok("punct","  )")],
      [tok("punct","}")],
    ],
  },

  {
    id: "cryptodash",
    title: "CryptoDash",
    fileName: "markets.ts",
    language: "TypeScript",
    branch: "main",
    year: "2024",
    accent: "oklch(0.60 0.15 250)", /* blue */
    description:
      "Dashboard de criptomoedas em tempo real. Gráficos dinâmicos via Chart.js, integração com APIs REST públicas, websockets para cotações ao vivo e alertas de variação.",
    tags: ["React", "TypeScript", "Chart.js", "REST"],
    link: "https://github.com/gustavomenani/CryptoDash",
    files: [
      { name: "src", type: "folder" },
      { name: "App.tsx", type: "file", icon: "tsx", indent: 1 },
      { name: "hooks", type: "folder", indent: 1 },
      { name: "useTicker.ts", type: "file", icon: "ts", indent: 2 },
      { name: "api", type: "folder", indent: 1 },
      { name: "markets.ts", type: "file", icon: "ts", indent: 2, active: true },
      { name: "charts", type: "folder", indent: 1 },
      { name: "Line.tsx", type: "file", icon: "tsx", indent: 2 },
      { name: "Sparkline.tsx", type: "file", icon: "tsx", indent: 2 },
      { name: "tsconfig.json", type: "file", icon: "json" },
    ],
    code: [
      [tok("com","// markets.ts — live price subscription")],
      [tok("key","const"), tok("text"," "), tok("fn","WS_URL"), tok("text"," "), tok("punct","= "), tok("str","\"wss://stream.markets/ticker\"")],
      [],
      [tok("key","export async function"), tok("fn"," subscribe"), tok("punct","("), tok("text","symbols"), tok("punct",": "), tok("type","string[]"), tok("punct",") {")],
      [tok("text","  "), tok("key","const"), tok("text"," socket "), tok("punct","= "), tok("key","new"), tok("text"," "), tok("fn","WebSocket"), tok("punct","("), tok("fn","WS_URL"), tok("punct",")")],
      [tok("text","  socket."), tok("fn","onmessage"), tok("text"," "), tok("punct","= (e) => {")],
      [tok("text","    "), tok("key","const"), tok("text"," tick "), tok("punct","= "), tok("type","JSON"), tok("punct","."), tok("fn","parse"), tok("punct","("), tok("text","e."), tok("text","data"), tok("punct",")")],
      [tok("text","    "), tok("fn","store"), tok("punct","."), tok("fn","push"), tok("punct","("), tok("text","tick"), tok("punct",")")],
      [tok("punct","  }")],
      [tok("text","  "), tok("key","return"), tok("text"," () => socket."), tok("fn","close"), tok("punct","()")],
      [tok("punct","}")],
    ],
  },

  {
    id: "streamplus",
    title: "StreamPlus",
    fileName: "player.jsx",
    language: "JavaScript · React",
    branch: "main",
    year: "2024",
    accent: "oklch(0.62 0.16 15)", /* rose */
    description:
      "Plataforma de streaming de mídia com foco em performance e fluidez de reprodução. React + JavaScript puro, player HTML5 customizado e pré-carregamento inteligente.",
    tags: ["React", "JavaScript", "HTML5 Video", "Streaming"],
    link: "https://github.com/gustavomenani/StreamPlus",
    files: [
      { name: "src", type: "folder" },
      { name: "App.jsx", type: "file", icon: "tsx", indent: 1 },
      { name: "player", type: "folder", indent: 1 },
      { name: "player.jsx", type: "file", icon: "tsx", indent: 2, active: true },
      { name: "buffer.js", type: "file", icon: "ts", indent: 2 },
      { name: "controls.jsx", type: "file", icon: "tsx", indent: 2 },
      { name: "styles", type: "folder", indent: 1 },
      { name: "player.css", type: "file", icon: "css", indent: 2 },
      { name: "package.json", type: "file", icon: "json" },
      { name: "README.md", type: "file", icon: "md" },
    ],
    code: [
      [tok("com","// player.jsx — adaptive bitrate with preload")],
      [tok("key","import"), tok("text"," { "), tok("text","useEffect"), tok("text",", "), tok("text","useRef"), tok("text"," } "), tok("key","from"), tok("str"," \"react\"")],
      [],
      [tok("key","export function"), tok("fn"," Player"), tok("punct","({ "), tok("text","src"), tok("punct",", "), tok("text","quality"), tok("punct"," }) {")],
      [tok("text","  "), tok("key","const"), tok("text"," video "), tok("punct","= "), tok("fn","useRef"), tok("punct","("), tok("key","null"), tok("punct",")")],
      [tok("text","  "), tok("fn","useEffect"), tok("punct","(() => {")],
      [tok("text","    "), tok("fn","prefetch"), tok("punct","("), tok("text","src"), tok("punct",", { "), tok("text","chunk"), tok("punct",": "), tok("num","2_000_000"), tok("punct"," })")],
      [tok("punct","  }, ["), tok("text","src"), tok("punct","])")],
      [tok("text","  "), tok("key","return"), tok("text"," "), tok("punct","<"), tok("type","video"), tok("text"," ref="), tok("punct","{"), tok("text","video"), tok("punct","} "), tok("text","controls "), tok("punct","/>")],
      [tok("punct","}")],
    ],
  },
];

const skillGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React", tag: "UI" },
      { name: "Next.js", tag: "Framework" },
      { name: "TypeScript", tag: "Lang" },
      { name: "JavaScript", tag: "Lang" },
      { name: "Tailwind CSS", tag: "Styling" },
      { name: "HTML / CSS", tag: "Core" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "C#", tag: "Lang" },
      { name: ".NET", tag: "Framework" },
      { name: "SQL Server", tag: "DB" },
      { name: "PostgreSQL", tag: "DB" },
      { name: "Docker", tag: "DevOps" },
    ],
  },
  {
    label: "Ferramentas & Interesses",
    items: [
      { name: "Git", tag: "VCS" },
      { name: "Azure", tag: "Cloud" },
      { name: "VS Code", tag: "IDE" },
      { name: "Figma", tag: "Design" },
      { name: "IA & Automação", tag: "Research" },
    ],
  },
];

const navLinks = [
  { label: "Início",    href: "#inicio",   index: "00" },
  { label: "Sobre",     href: "#sobre",    index: "01" },
  { label: "Skills",    href: "#skills",   index: "02" },
  { label: "Projetos",  href: "#projetos", index: "03" },
  { label: "Contato",   href: "#contato",  index: "04" },
];

export const PROJECTS = projects;
export const SKILL_GROUPS = skillGroups;
export const NAV_LINKS = navLinks;
