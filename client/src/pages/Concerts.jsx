import { motion } from "framer-motion";
import { Page, PageHead, Reveal } from "../components/motion.jsx";
import { useApi } from "../data/useApi.js";

const BARS = [
  14, 26, 40, 22, 52, 34, 70, 46, 90, 60, 110, 76, 140, 96, 120, 80,
  150, 100, 130, 88, 105, 70, 88, 54, 68, 42, 52, 30, 38, 20, 28, 14,
  22, 34, 48, 64, 84, 104, 124, 96, 74, 56, 40, 28, 18, 12,
];

export default function Concerts() {
  const concerts = useApi("concerts");

  return (
    <Page>
      <PageHead si="ප්‍රසංග" en="CONCERTS · THE KAMPANA ERA" />

      {/* Kampana banner */}
      <section className="kampana">
        <div className="kampana__bars" aria-hidden="true">
          {BARS.map((h, i) => (
            <motion.i
              key={i}
              style={{ height: h }}
              animate={{ scaleY: [1, 0.55, 1] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 9) * 0.18,
              }}
            />
          ))}
        </div>
        <div className="kampana__content">
          <Reveal><h2>කම්පන</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="kampana__en">THE CONCERT THAT SHOOK A NATION</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="kampana__si">වේදිකාව මත තනිවම — ගිටාරය, හඬ, සත්‍යය.</p>
          </Reveal>
        </div>
      </section>

      {/* Concert / era cards */}
      <section className="section" style={{ background: "var(--bg-panel)" }}>
        <Reveal className="section__head">
          <h2>සංගීත සන්ධිස්ථාන</h2>
          <p className="section__sub">MILESTONES ON STAGE</p>
        </Reveal>
        <div className="concerts__grid">
          {concerts.map((c, i) => (
            <Reveal key={c.titleEn} delay={i * 0.12}>
              <motion.article
                className="concert"
                whileHover={{ y: -6, borderColor: "rgba(201,162,39,.5)" }}
                transition={{ duration: 0.3 }}
              >
                <span className="concert__era">{c.era}</span>
                <h3>{c.titleSi}</h3>
                <span className="concert__en-title">{c.titleEn}</span>
                <p>{c.descSi}</p>
                <em>{c.descEn}</em>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="quote">
        <span className="quote__mark">“</span>
        <Reveal>
          <p className="si">සෑම ප්‍රසංගයක්ම — හද කම්පා කළ මතකයක්</p>
          <p className="en">EVERY CONCERT — A MEMORY THAT SHOOK THE HEART</p>
        </Reveal>
      </section>
    </Page>
  );
}
