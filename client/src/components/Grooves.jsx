import { motion } from "framer-motion";

/* Vinyl-groove circles, breathing slowly, plus "කම්පන" sound ripples —
   rings that swell out from the record and fade, like sound leaving it.
   Everything is transform/opacity only — GPU composited. */

const SIZES = [80, 68, 57, 46, 36, 28, 21]; // vmin

const RIPPLES = [0, 2.6, 5.2]; // stagger delays (s)

export default function Grooves() {
  return (
    <div className="grooves" aria-hidden="true">
      {SIZES.map((s, i) => (
        <motion.span
          key={s}
          className={i === 3 ? "bright" : ""}
          style={{ width: `${s}vmin`, height: `${s}vmin` }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}
      <i />

      {/* sound ripples swelling outwards */}
      {RIPPLES.map((delay) => (
        <motion.span
          key={delay}
          className="ripple"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: [0.3, 1.65], opacity: [0, 0.45, 0] }}
          transition={{
            duration: 7.8,
            repeat: Infinity,
            ease: "easeOut",
            delay,
          }}
        />
      ))}
    </div>
  );
}
