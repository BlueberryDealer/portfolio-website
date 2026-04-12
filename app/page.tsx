"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   THEME COLORS
   ═══════════════════════════════════════════════════════════ */

const C = {
  bg: "#050507",
  bgCard: "#0c0c14",
  bgNav: "rgba(5,5,7,0.6)",
  text: "#f0f0f5",
  textMuted: "#a1a1aa",
  textDim: "#52525b",
  border: "#16161f",
  accent: "#6366f1",
  accentLight: "#818cf8",
};

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const NAV_LINKS = ["About", "Projects", "Skills", "Blog", "Contact"];

const PROJECTS = [
  {
    title: "QUENCH",
    description: "Full-stack drinks e-commerce platform with dark/light theming, AI chatbot, Google Maps store locator, and coupon system.",
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    link: "https://github.com/BlueberryDealer/INF1005-Project",
    gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  },
  {
    title: "Abstract Engine",
    description: "2D game engine built with LibGDX using Factory, Strategy, and Observer design patterns with scene management and entity systems.",
    tags: ["Java", "LibGDX", "OOP"],
    link: "https://github.com/DerrickHoZX/OOP-Project",
    gradient: "linear-gradient(135deg, #06b6d4, #6366f1)",
  },
  {
    title: "MRT Route Finder",
    description: "Singapore MRT route planner using Dijkstra's algorithm — fastest time, fewest stops, or fewest transfers.",
    tags: ["Python", "Dijkstra", "Tkinter"],
    link: "https://github.com/chloelxy/P4-3",
    gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
  },
];

const STATS = [
  { label: "Projects Built", value: 3, suffix: "+" },
  { label: "Technologies", value: 8, suffix: "+" },
  { label: "Lines of Code", value: 15, suffix: "K+" },
  { label: "Cups of Coffee", value: 500, suffix: "+" },
];

const SKILLS = ["Python", "Java", "PHP", "JavaScript", "HTML/CSS", "MySQL", "Bootstrap", "Git"];

const SKILL_LOGOS: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
};

const TIMELINE = [
  {
    year: "2025 – Present",
    title: "Applied Computing (Fintech)",
    org: "Singapore Institute of Technology",
    description: "Building expertise in full-stack development, algorithms, and fintech applications. Key modules include Web Systems & Technologies, Object-Oriented Programming, Data Structures & Algorithms, and Data Engineering & Visualisation. Developed real-world projects including e-commerce platforms, game engines, and route optimisation systems.",
  },
];

const CERTS = [
  { title: "Fundamentals of Deep Learning", org: "NVIDIA", year: "2026" },
  { title: "The Bits and Bytes of Computer Networking", org: "Coursera", year: "2025" },
  { title: "Blockchain Technology and Web3 Projects", org: "Hooked", year: "2025" },
  { title: "C for Everyone: Programming Fundamentals", org: "Coursera", year: "2025" },
  { title: "Blockchain Basics", org: "Coursera", year: "2024" },
  { title: "Internet of Things", org: "Singapore Polytechnic", year: "2023" },
];

const BLOG_POSTS = [
  { title: "Building QUENCH: Lessons from My First Full-Stack Project", excerpt: "What I learned about PHP, MySQL, and deployment while building an e-commerce platform from scratch.", date: "April 2026", tags: ["Web Dev", "PHP"], link: "#" },
  { title: "Implementing Dijkstra's Algorithm for Real-World Routing", excerpt: "How I applied graph algorithms to build a Singapore MRT route finder with multiple optimisation modes.", date: "March 2026", tags: ["Algorithms", "Python"], link: "#" },
  { title: "Design Patterns in Game Development", excerpt: "Using Factory, Strategy, and Observer patterns to build a maintainable 2D game engine with LibGDX.", date: "March 2026", tags: ["Java", "OOP"], link: "#" },
];

const TOOLS = [
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "PyCharm", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
  { name: "IntelliJ", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
  { name: "Eclipse", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg" },
  { name: "RStudio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rstudio/rstudio-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
];

/* ═══════════════════════════════════════════════════════════
   LAYOUT HELPERS
   ═══════════════════════════════════════════════════════════ */

const container: React.CSSProperties = {
  maxWidth: "880px", marginLeft: "auto", marginRight: "auto",
  paddingLeft: "2rem", paddingRight: "2rem",
};

const wideContainer: React.CSSProperties = {
  maxWidth: "1000px", marginLeft: "auto", marginRight: "auto",
  paddingLeft: "2rem", paddingRight: "2rem",
};

const glass: React.CSSProperties = {
  background: `${C.bgCard}cc`,
  backdropFilter: "blur(16px)",
  border: `1px solid ${C.border}`,
  borderRadius: "24px",
  padding: "2rem",
  overflow: "hidden",
  boxShadow: "0 10px 40px rgba(0,0,0,0.18)",
};

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref} id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ paddingTop: "10rem", paddingBottom: "4rem" }}
    >
      <div style={container}>{children}</div>
    </motion.section>
  );
}

function Label({ title }: { title: string }) {
  return (
    <div style={{ marginBottom: "4.5rem" }}>
      <h2
        className="glow-heading"
        style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em", color: C.text }}
      >
        {title}<span className="gradient-text">.</span>
      </h2>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ ...container, height: "1px", background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.12), transparent)" }} />
  );
}

/* ═══════════════════════════════════════════════════════════
   EFFECTS — Loading, Cursor, Sparkles, Gradient Mesh, Stars
   ═══════════════════════════════════════════════════════════ */

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onComplete, 400); return 100; }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#050507", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div style={{ fontFamily: "monospace", fontSize: "48px", userSelect: "none", marginBottom: "3rem" }}>
          <span style={{ color: "rgba(99,102,241,0.4)" }}>&lt;</span>
          <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "52px" }}>M</span>
          <span style={{ color: "rgba(99,102,241,0.4)" }}>/&gt;</span>
        </div>
      </motion.div>
      <div style={{ width: "200px", height: "2px", background: "#16161f", borderRadius: "99px", overflow: "hidden" }}>
        <motion.div style={{ height: "100%", background: "linear-gradient(90deg, #6366f1, #a78bfa)", borderRadius: "99px" }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 0.1 }} />
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ fontSize: "11px", color: "#3f3f46", fontFamily: "monospace", marginTop: "1.5rem", letterSpacing: "0.2em" }}>
        {Math.min(Math.floor(progress), 100)}%
      </motion.p>
    </motion.div>
  );
}

function CursorGlow() {
  const cx = useMotionValue(-100), cy = useMotionValue(-100);
  const sx = useSpring(cx, { damping: 25, stiffness: 200 }), sy = useSpring(cy, { damping: 25, stiffness: 200 });
  const dx = useMotionValue(-100), dy = useMotionValue(-100);

  useEffect(() => {
    const m = (e: MouseEvent) => { cx.set(e.clientX - 150); cy.set(e.clientY - 150); dx.set(e.clientX - 4); dy.set(e.clientY - 4); };
    window.addEventListener("mousemove", m); return () => window.removeEventListener("mousemove", m);
  }, [cx, cy, dx, dy]);

  return (
    <>
      <motion.div style={{ position: "fixed", left: sx, top: sy, width: 300, height: 300, borderRadius: "50%", pointerEvents: "none", zIndex: 0, background: "radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)" }} />
      <motion.div style={{ position: "fixed", left: dx, top: dy, width: 8, height: 8, borderRadius: "50%", background: "#6366f1", pointerEvents: "none", zIndex: 999, boxShadow: "0 0 12px rgba(99,102,241,0.5)" }} />
    </>
  );
}

function SparkleTrail() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let throttle = 0;
    const colors = ["#6366f1", "#818cf8", "#a78bfa", "#c084fc", "#e879f9"];
    const handler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - throttle < 40) return;
      throttle = now;
      const id = idRef.current++;
      setSparkles(prev => [...prev.slice(-15), {
        id, x: e.clientX + (Math.random() - 0.5) * 20, y: e.clientY + (Math.random() - 0.5) * 20,
        size: Math.random() * 6 + 3, color: colors[Math.floor(Math.random() * colors.length)],
      }]);
      setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 600);
    };
    window.addEventListener("mousemove", handler); return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998 }}>
      {sparkles.map(s => (
        <motion.div key={s.id} initial={{ opacity: 1, scale: 1, y: 0 }} animate={{ opacity: 0, scale: 0, y: -30 }} transition={{ duration: 0.6 }}
          style={{ position: "absolute", left: s.x, top: s.y, width: s.size, height: s.size, borderRadius: "50%", background: s.color, boxShadow: `0 0 ${s.size * 2}px ${s.color}80` }} />
      ))}
    </div>
  );
}

function GradientMesh() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}>
      <motion.div animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "5%", right: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)", filter: "blur(80px)" }} />
      <motion.div animate={{ x: [0, -60, 40, 0], y: [0, 50, -20, 0], scale: [1, 0.9, 1.15, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", bottom: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.05), transparent 70%)", filter: "blur(80px)" }} />
      <motion.div animate={{ x: [0, 30, -50, 0], y: [0, -30, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "50%", left: "40%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.04), transparent 70%)", filter: "blur(80px)" }} />
    </div>
  );
}

function Starfield() {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  useEffect(() => {
    const s = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, delay: Math.random() * 5,
    }));
    setStars(s);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s, i) => (
        <div key={i} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: "50%", background: ["#818cf8", "#c084fc", "#6366f1"][i % 3], animation: `twinkle ${3 + s.delay}s ease-in-out ${s.delay}s infinite` }} />
      ))}
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 100, background: "linear-gradient(90deg, #6366f1, #a78bfa, #c084fc)", scaleX: scrollYProgress, transformOrigin: "left" }} />;
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = () => setVisible(window.scrollY > 400); window.addEventListener("scroll", t); return () => window.removeEventListener("scroll", t); }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50, width: 48, height: 48, borderRadius: "50%", background: "#6366f1", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 25px rgba(99,102,241,0.3)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function EasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const seq = useRef<string[]>([]);
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-10);
      if (JSON.stringify(seq.current) === JSON.stringify(konami)) setTriggered(true);
    };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, []);

  if (!triggered) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setTriggered(false)}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.9)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}
        style={{ fontSize: 100, marginBottom: "2rem" }}>🎮</motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 800, color: "#fff" }}>You found the secret!</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ fontSize: 14, color: "#818cf8", marginTop: "1rem" }}>↑ ↑ ↓ ↓ ← → ← → B A — You&apos;re a true gamer 🕹️</motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        style={{ fontSize: 12, color: "#3f3f46", marginTop: "2rem" }}>Click anywhere to close</motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WIDGETS — Clock, GitHub Heatmap, Counter, Typing
   ═══════════════════════════════════════════════════════════ */

function SingaporeClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat("en-SG", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(now));
      setDate(new Intl.DateTimeFormat("en-SG", { timeZone: "Asia/Singapore", weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(now));
    };
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ fontSize: 11, color: "#5eead4", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Singapore Time</div>
      <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#2dd4bf", whiteSpace: "nowrap", lineHeight: 1 }}>{time}</div>
      <div style={{ marginTop: 14, fontSize: 13, color: C.textMuted, whiteSpace: "nowrap" }}>{date}</div>
    </div>
  );
}

function GitHubHeatmap() {
  const [weeks, setWeeks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/github")
      .then(r => r.json())
      .then(data => {
        const w = Array.isArray(data) ? data : [];
        setTotal(w.reduce((s: number, wk: any) => s + wk.contributionDays.reduce((d: number, day: any) => d + day.contributionCount, 0), 0));
        setWeeks(w.slice(-26));
      })
      .catch((err) => console.error("Heatmap fetch failed:", err));
  }, []);

  const color = (n: number) => n === 0 ? "transparent" : n < 3 ? "#22c55e30" : n < 6 ? "#22c55e60" : n < 10 ? "#22c55e90" : "#22c55e";

  return (
    <>
      <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 18 }}>GitHub Activity</div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ display: "grid", gridAutoFlow: "column", gridTemplateRows: "repeat(7, 10px)", gap: 3 }}>
          {weeks.map(week => week.contributionDays.map((day: any) => (
            <div key={day.date} title={`${day.date}: ${day.contributionCount} contributions`}
              style={{ width: 10, height: 10, borderRadius: 3, background: color(day.contributionCount), border: day.contributionCount === 0 ? `1px solid ${C.border}` : "none", boxSizing: "border-box" }} />
          )))}
        </div>
      </div>
      <div style={{ marginTop: 18, fontSize: 13, color: C.textMuted }}>{total} contributions in the last year</div>
    </>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1500, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Typing({ words }: { words: string[] }) {
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[wi];
    const t = setTimeout(() => {
      if (!del) { if (ci < word.length) setCi(p => p + 1); else setTimeout(() => setDel(true), 2000); }
      else { if (ci > 0) setCi(p => p - 1); else { setDel(false); setWi(p => (p + 1) % words.length); } }
    }, del ? 35 : 70);
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);

  return (
    <span className="gradient-text" style={{ fontWeight: 700 }}>
      {words[wi].substring(0, ci)}<span style={{ animation: "pulse 1s infinite", color: "#6366f1" }}>|</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO — Avatar, Navbar, Hero Section
   ═══════════════════════════════════════════════════════════ */

function TechAvatar() {
  const [mp, setMp] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = (e: MouseEvent) => setMp({ x: (e.clientX / window.innerWidth - 0.5) * 15, y: (e.clientY / window.innerHeight - 0.5) * 15 });
    window.addEventListener("mousemove", h); return () => window.removeEventListener("mousemove", h);
  }, []);

  const badge = (props: { top?: string; bottom?: string; left?: string; right?: string; color: string; children: React.ReactNode; delay?: number; dur?: number }) => (
    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: props.dur || 3.5, repeat: Infinity, ease: "easeInOut", delay: props.delay || 0 }}
      style={{ position: "absolute", top: props.top, bottom: props.bottom, left: props.left, right: props.right, background: "rgba(12,12,20,0.9)", backdropFilter: "blur(10px)", border: `1px solid ${props.color}33`, borderRadius: 14, padding: "10px 16px", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
      {props.children}
    </motion.div>
  );

  return (
    <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "relative", width: 820, height: 880, margin: "0 auto", marginTop: -40 }}>

      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "8%", left: "-8%", right: "-8%", bottom: "8%", borderRadius: "50%", background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 440 540" preserveAspectRatio="none">
        <motion.polygon animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          points="220,10 410,140 410,400 220,530 30,400 30,140" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="8 4" />
      </svg>

      <motion.div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 20, transform: `perspective(800px) rotateY(${mp.x * 0.45}deg) rotateX(${-mp.y * 0.25}deg)`, transition: "transform 0.2s ease-out", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/hero_portfolio.png" alt="Mowli" style={{ width: "50%", height: "50%", objectFit: "cover", objectPosition: "center 20%",transform: "scale(1.6)", filter: "drop-shadow(0 0 40px rgba(99,102,241,0.22))" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(99,102,241,0.02) 3px, rgba(99,102,241,0.02) 4px)", mixBlendMode: "overlay" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "18%", background: "linear-gradient(transparent, #050507)" }} />
      </motion.div>

      {badge({ top: "10%", right: "-10px", color: "#22c55e", children: <><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "inline-block", marginRight: 8 }} /><span style={{ fontSize: 12, color: "#e4e4e7", fontWeight: 600 }}>Available</span></> })}
      {badge({ top: "38%", left: "-18px", color: "#a78bfa", delay: 0.5, children: <span style={{ fontSize: 11, color: "#a78bfa", fontFamily: "monospace" }}>SIT &apos;25</span> })}
      {badge({ top: "58%", right: "-14px", color: "#6366f1", delay: 1, children: <span style={{ fontSize: 11, color: "#818cf8", fontFamily: "monospace" }}>&lt;Fintech /&gt;</span> })}
      {badge({ bottom: "16%", left: "-8px", color: "#c084fc", delay: 1.5, dur: 4.5, children: <span style={{ fontSize: 11, color: "#c084fc", fontFamily: "monospace" }}>Full-Stack</span> })}

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", inset: -15, borderRadius: "50%" }}>
        <div style={{ position: "absolute", top: "20%", right: "8%", width: 6, height: 6, background: "#6366f1", borderRadius: "50%", boxShadow: "0 0 12px rgba(99,102,241,0.8)" }} />
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", inset: -25, borderRadius: "50%" }}>
        <div style={{ position: "absolute", bottom: "28%", left: "6%", width: 5, height: 5, background: "#a78bfa", borderRadius: "50%", boxShadow: "0 0 10px rgba(167,139,250,0.7)" }} />
      </motion.div>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.5s", background: scrolled ? C.bgNav : "transparent", backdropFilter: scrolled ? "blur(24px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent" }}>
      <div style={{ ...wideContainer, paddingTop: "1.25rem", paddingBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 800, textDecoration: "none", letterSpacing: "-0.03em" }}>
          <span className="gradient-text">M</span><span style={{ color: C.textDim }}>owli</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{ fontSize: 13, color: C.textDim, textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = C.text} onMouseLeave={e => (e.target as HTMLElement).style.color = C.textDim}>{link}</a>
          ))}
          <a href="/resume.pdf" download style={{ fontSize: 13, padding: "8px 22px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8", borderRadius: 99, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>Resume
          </a>
        </div>
        <button className="md:hidden" style={{ color: C.textMuted, background: "none", border: "none" }} onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}</svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: C.bgNav, backdropFilter: "blur(24px)", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {NAV_LINKS.map(link => (<a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)} style={{ color: C.textMuted, textDecoration: "none" }}>{link}</a>))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const nameLetters = "MOWLI".split("");
  const scrollText = "DEVELOPER • FINTECH • FULL-STACK • CREATIVE • ";

  return (
    <motion.section style={{ y, opacity, position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <Starfield />

      {/* Scrolling background text */}
      <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", overflow: "hidden", zIndex: 1 }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ display: "flex", whiteSpace: "nowrap", width: "fit-content" }}>
          {[0, 1, 2, 3].map(i => (
            <span key={i} style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(80px, 12vw, 160px)", fontWeight: 900, letterSpacing: "-0.04em", color: "transparent", WebkitTextStroke: "1px rgba(99,102,241,0.06)", userSelect: "none", padding: "0 2rem" }}>{scrollText}</span>
          ))}
        </motion.div>
      </div>

      <div style={{ ...wideContainer, position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center", minHeight: "85vh" }}>

          <div style={{ paddingTop: "2rem" }}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 99, marginBottom: "2.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ fontSize: 12, color: "#818cf8", fontFamily: "monospace", letterSpacing: "0.1em" }}>OPEN TO WORK</span>
            </motion.div>

            <div style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.04em", lineHeight: 0.9, marginBottom: "0.5rem" }}>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                style={{ display: "block", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, color: C.textMuted, marginBottom: "0.5rem" }}>HI, I&apos;M</motion.span>
              <div style={{ display: "flex", gap: 4 }}>
                {nameLetters.map((letter, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 80, rotateX: -90 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="gradient-text" style={{ display: "inline-block", fontSize: "clamp(64px, 8vw, 100px)", fontWeight: 900 }}>{letter}</motion.span>
                ))}
                <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                  style={{ display: "inline-block", fontSize: "clamp(64px, 8vw, 100px)", fontWeight: 900, color: "#6366f1" }}>.</motion.span>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} style={{ marginTop: "2rem", maxWidth: 440 }}>
              <div style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.8, marginBottom: "0.75rem" }}>
                A <span style={{ color: C.text, fontWeight: 600 }}>Fintech</span> student at <span style={{ color: C.text, fontWeight: 600 }}>SIT</span> who loves building
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(18px, 2.5vw, 24px)", color: C.textDim }}>
                <Typing words={["web applications", "full-stack solutions", "clean interfaces", "cool things"]} />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
              <a href="#projects" style={{ padding: "16px 36px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontSize: 13, fontWeight: 700, borderRadius: 99, textDecoration: "none", letterSpacing: "0.1em", boxShadow: "0 4px 25px rgba(99,102,241,0.3)" }}>VIEW PROJECTS</a>
              <a href="#contact" style={{ padding: "16px 36px", border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 13, fontWeight: 700, borderRadius: 99, textDecoration: "none", letterSpacing: "0.1em" }}>CONTACT ME</a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
              {[
                { href: "https://github.com/BlueberryDealer", d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { href: "https://www.linkedin.com/in/mowli02/", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 42, height: 42, borderRadius: 12, background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textDim, transition: "all 0.3s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.color = "#818cf8"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d={l.d} /></svg>
                </a>
              ))}
              <a href="mailto:mowlianandan@gmail.com" style={{ width: 42, height: 42, borderRadius: 12, background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.textDim, transition: "all 0.3s", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.color = "#818cf8"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 80, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 1 }}
            style={{ display: "flex", justifyContent: "center" }} className="hidden md:flex"><TechAvatar /></motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.2em", fontFamily: "monospace" }}>SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="1.5"><path d="M6 9l6 6 6-6" /></svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════════════════════ */

function Marquee() {
  return (
    <div style={{ overflow: "hidden", padding: "2rem 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(90deg, ${C.bg}, transparent)`, zIndex: 2 }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(270deg, ${C.bg}, transparent)`, zIndex: 2 }} />
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ display: "flex", width: "fit-content" }}>
        {[...TOOLS, ...TOOLS].map((t, i) => (
          <div key={`${t.name}-${i}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "0 2.5rem", flexShrink: 0 }}>
            <img src={t.logo} alt={t.name} style={{ width: 40, height: 40, objectFit: "contain" }} />
            <span style={{ fontSize: 11, color: "#71717a", letterSpacing: "0.03em", whiteSpace: "nowrap" }}>{t.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ ...container, paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: C.border, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}` }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: C.bgCard, padding: "2rem 1.5rem", textAlign: "center" }}>
            <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontSize: 32, fontWeight: 800 }}><Counter value={s.value} suffix={s.suffix} /></div>
            <div style={{ fontSize: 12, color: C.textDim, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <Section id="about">
      <Label title="About Me" />
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.25rem", alignItems: "stretch" }}>
        <div style={{ ...glass, minHeight: 500, display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", color: C.textMuted, fontSize: 15, lineHeight: 2 }}>
            <p>I&apos;m a FinTech student at the <span style={{ color: C.text, fontWeight: 600 }}>Singapore Institute of Technology</span> who enjoys building practical software and solving challenging problems. I&apos;m particularly interested in developing <span style={{ color: C.text, fontWeight: 600 }}>scalable applications</span> and improving systems through clean code and thoughtful design.</p>
            <p>I like working across the full development stack — from designing <span style={{ color: C.text, fontWeight: 600 }}>intuitive user interfaces</span> to implementing <span style={{ color: C.text, fontWeight: 600 }}>reliable backend logic</span> and algorithms. I&apos;m constantly exploring new technologies and strengthening my programming and data structures skills.</p>
            <p>Outside of coding, I enjoy playing competitive games like <span style={{ color: C.text, fontWeight: 600 }}>Counter-Strike</span> and <span style={{ color: C.text, fontWeight: 600 }}>Valorant</span>. These games sharpen my strategic thinking, quick decision-making, and teamwork — skills that I also bring into my development projects.</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateRows: "200px 1fr", gap: "1.25rem" }}>
          <div style={{ ...glass, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}><SingaporeClock /></div>
          <div style={glass}><GitHubHeatmap /></div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <Label title="Projects" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => (
          <motion.a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
            style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem", padding: "2rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, textDecoration: "none", transition: "all 0.4s", alignItems: "center" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.boxShadow = "0 8px 60px rgba(99,102,241,0.06)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ width: 200, height: 130, borderRadius: 12, background: p.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 140, height: 90, background: "rgba(0,0,0,0.3)", borderRadius: 6, backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 6, padding: 10 }}>
                <div style={{ width: "50%", height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 2 }} />
                <div style={{ width: "80%", height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
                <div style={{ width: "65%", height: 3, background: "rgba(255,255,255,0.15)", borderRadius: 2 }} />
                <div style={{ display: "flex", gap: 4, marginTop: "auto" }}><div style={{ width: 20, height: 12, background: "rgba(255,255,255,0.2)", borderRadius: 3 }} /><div style={{ width: 20, height: 12, background: "rgba(255,255,255,0.12)", borderRadius: 3 }} /></div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 10 }}>{p.title} <span style={{ opacity: 0.3, fontSize: 16 }}>↗</span></h3>
              <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.8, marginBottom: 14, maxWidth: 420 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "5px 14px", borderRadius: 99, background: "rgba(99,102,241,0.06)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.1)", fontWeight: 500 }}>{t}</span>)}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  const orbitSkills = SKILLS.map((s, i) => ({ name: s, angle: (i / SKILLS.length) * 360, logo: SKILL_LOGOS[s] }));

  return (
    <Section id="skills">
      <Label title="Skills" />
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
        <div style={{ position: "relative", width: 420, height: 420 }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px dashed ${C.border}` }} />
          <div style={{ position: "absolute", inset: 80, borderRadius: "50%", border: `1px solid ${C.border}` }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div>
              <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontSize: 36, fontWeight: 800 }}>8+</div>
              <div style={{ fontSize: 12, color: C.textDim, letterSpacing: "0.1em", marginTop: 4 }}>TECHNOLOGIES</div>
            </div>
          </div>
          {orbitSkills.map((s, i) => {
            const rad = (s.angle - 90) * (Math.PI / 180);
            const x = Math.cos(rad) * 185 + 210 - 32;
            const y = Math.sin(rad) * 185 + 210 - 32;
            return (
              <motion.div key={s.name} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 200 }} whileHover={{ scale: 1.2, zIndex: 10 }}
                style={{ position: "absolute", left: x, top: y, width: 64, height: 64, borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, background: `${C.bgCard}cc`, backdropFilter: "blur(12px)", border: `1px solid ${C.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", transition: "border-color 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(99,102,241,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)"; }}>
                <img src={s.logo} alt={s.name} style={{ width: 28, height: 28, objectFit: "contain" }} />
                <span style={{ fontSize: 8, color: C.textDim, fontWeight: 600 }}>{s.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications">
      <Label title="Certifications" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {CERTS.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem 2rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5"><path d="M12 15l-3 3 1-4-3-3h4L12 7l1 4h4l-3 3 1 4-3-3z" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: C.text }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>{c.org}</p>
            </div>
            <span style={{ fontSize: 12, color: C.textDim, fontFamily: "monospace" }}>{c.year}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Timeline() {
  return (
    <Section id="timeline">
      <Label title="Timeline" />
      <div style={{ position: "relative", paddingLeft: "2.5rem", borderLeft: `2px solid ${C.border}` }}>
        {TIMELINE.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ marginBottom: "3rem", position: "relative" }}>
            <div style={{ position: "absolute", left: "calc(-2.5rem - 7px)", top: 4, width: 14, height: 14, borderRadius: "50%", background: C.bg, border: "2px solid #6366f1", boxShadow: "0 0 15px rgba(99,102,241,0.35)" }} />
            <span style={{ fontSize: 12, color: "#6366f1", fontFamily: "monospace" }}>{item.year}</span>
            <h3 className="glow-heading" style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: C.text, marginTop: 10 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "rgba(99,102,241,0.45)", marginTop: 6 }}>{item.org}</p>
            <p style={{ fontSize: 14, color: C.textDim, lineHeight: 1.9, marginTop: 14, maxWidth: 520 }}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Blog() {
  return (
    <Section id="blog">
      <Label title="Blog" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
        {BLOG_POSTS.map((p, i) => (
          <motion.a key={p.title} href={p.link} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            style={{ display: "flex", flexDirection: "column", padding: "2rem", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, textDecoration: "none", transition: "all 0.4s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(99,102,241,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <span style={{ fontSize: 11, color: C.textDim, fontFamily: "monospace", marginBottom: 14 }}>{p.date}</span>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 12 }}>{p.title}</h3>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7, flex: 1, marginBottom: 16 }}>{p.excerpt}</p>
            <div style={{ display: "flex", gap: 6 }}>
              {p.tags.map(t => <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 99, background: "rgba(99,102,241,0.06)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.1)" }}>{t}</span>)}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert("Message sent! (Connect Formspree or EmailJS)"); };
  const input: React.CSSProperties = { width: "100%", padding: "14px 20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, color: C.text, fontSize: 14, outline: "none", transition: "all 0.3s" };
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.05)"; };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; };

  return (
    <Section id="contact">
      <Label title="Get in Touch" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
        <div>
          <p style={{ color: C.textMuted, lineHeight: 1.9, fontSize: 15, marginBottom: "2.5rem" }}>I&apos;m always open to new opportunities, collaborations, or just a friendly chat. Let&apos;s connect!</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { href: "mailto:mowlianandan@gmail.com", text: "mowlianandan@gmail.com", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 18, height: 18 }}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
              { href: "https://github.com/BlueberryDealer", text: "github.com/BlueberryDealer", icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
              { href: "https://www.linkedin.com/in/mowli02/", text: "LinkedIn", icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
            ].map(item => (
              <a key={item.text} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14, color: C.textMuted, textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = C.text}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.textMuted}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: C.bgCard, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#818cf8" }}>{item.icon}</div>{item.text}
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="text" placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={input} onFocus={focus} onBlur={blur} />
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={input} onFocus={focus} onBlur={blur} />
          <textarea placeholder="Message" rows={5} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...input, resize: "none" as const }} onFocus={focus} onBlur={blur} />
          <button type="submit" style={{ width: "100%", padding: 14, background: "#6366f1", color: "#fff", fontSize: 14, fontWeight: 600, borderRadius: 14, border: "none", boxShadow: "0 0 20px rgba(99,102,241,0.15)" }}>Send Message →</button>
        </form>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "3rem 0", borderTop: `1px solid ${C.border}` }}>
      <div style={{ ...wideContainer, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 12, color: C.textDim }}>© {new Date().getFullYear()} Mowli. Built with Next.js &amp; Tailwind.</p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[{ text: "GitHub", href: "https://github.com/BlueberryDealer" }, { text: "LinkedIn", href: "https://www.linkedin.com/in/mowli02/" }].map(l => (
            <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: C.textDim, textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#818cf8"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = C.textDim}>{l.text}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════ */

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen key="loader" onComplete={onLoaded} />}
      </AnimatePresence>
      {loaded && (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
          className="noise" style={{ background: C.bg }}>
          <GradientMesh />
          <ScrollProgress />
          <CursorGlow />
          <SparkleTrail />
          <ScrollToTop />
          <EasterEgg />
          <Navbar />
          <Hero />
          <Marquee />
          <StatsBar />
          <Divider />
          <About />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <Certifications />
          <Divider />
          <Timeline />
          <Divider />
          <Blog />
          <Divider />
          <Contact />
          <Footer />
        </motion.main>
      )}
    </>
  );
}