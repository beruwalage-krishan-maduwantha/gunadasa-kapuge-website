import { motion, useScroll } from "framer-motion";

/* Thin gold progress line at the very top — pure transform, zero layout cost */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} />;
}
