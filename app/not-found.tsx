"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", background: "#050507", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", overflow: "hidden",
      position: "relative",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "50%", background: "#6366f1", opacity: 0.04, filter: "blur(120px)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        {/* Glitch 404 */}
        <motion.h1
          animate={{ x: [0, -2, 3, -1, 0] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 3 }}
          style={{
            fontSize: "clamp(120px, 20vw, 200px)", fontWeight: 900, letterSpacing: "-0.05em",
            background: "linear-gradient(135deg, #6366f1, #a78bfa, #c084fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontSize: "20px", color: "#a1a1aa", marginTop: "1rem", fontWeight: 500 }}
        >
          This page doesn&apos;t exist
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: "14px", color: "#52525b", marginTop: "0.75rem", fontFamily: "monospace" }}
        >
          Error: ENOENT — no such file or directory
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            marginTop: "3rem", padding: "14px 32px",
            background: "#6366f1", color: "#fff", fontSize: "14px", fontWeight: 600,
            borderRadius: "99px", textDecoration: "none",
            boxShadow: "0 4px 25px rgba(99,102,241,0.3)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          style={{
            position: "absolute",
            left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%`,
            width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#6366f1" : "#a78bfa",
          }}
        />
      ))}
    </div>
  );
}