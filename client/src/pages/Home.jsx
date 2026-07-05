import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Page, Reveal, fadeUp, stagger } from "../components/motion.jsx";
import Grooves from "../components/Grooves.jsx";
import ListenModal from "../components/ListenModal.jsx";
import Ticker from "../components/Ticker.jsx";
import { useApi } from "../data/useApi.js";

const NAME_EN = "GUNADASA KAPUGE";

const BARS = [
  14, 26, 40, 22, 52, 34, 70, 46, 90, 60, 110, 76, 140, 96, 120, 80,
  150, 100, 130, 88, 105, 70, 88, 54, 68, 42, 52, 30, 38, 20, 28, 14,
  22, 34, 48, 64, 84, 104, 124, 96, 74, 56, 40, 28, 18, 12,
];

export default function Home() {
  const albums = useApi("albums");
  const timeline = useApi("timeline");
  const gallery = useApi("gallery").slice(0, 4);
  const songs = useApi("songs");
  const [listenSong, setListenSong] = useState(null);

  // Parallax — transform-only, GPU composited
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 900], [0, 130]);
  const contentY = useTransform(scrollY, [0, 900], [0, -70]);

  return (
    <Page>
      {/* ===== HERO ===== */}
      <section className="hero">
        <Grooves />

        <motion.figure
          className="hero__portrait"
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Replace with: <img src="/images/kapuge-portrait.jpg" alt="ගුණදාස කපුගේ" /> */}
          <figcaption>
            <span className="si">සේපියා ඡායාරූපය</span>
            <span className="en">SEPIA PORTRAIT HERE</span>
          </figcaption>
        </motion.figure>

        <motion.div
          className="hero__content"
          style={{ y: contentY }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.p className="eyebrow" variants={fadeUp}>
            <i></i>ජනතාවගේ හඬ <span>· THE VOICE OF THE PEOPLE</span>
          </motion.p>
          <h1 className="hero__title">
            {["ගුණදාස", "කපුගේ"].map((line, i) => (
              <motion.span
                key={line}
                className="hero__title-line"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.1,
                  delay: 0.25 + i * 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <p className="hero__name-en hero__name-en--shimmer">
            {NAME_EN.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.04 }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            ))}
          </p>
          <motion.p className="hero__years" variants={fadeUp}>
            1945 — 2003 · <em>A voice that still echoes through Sri Lanka</em>
          </motion.p>
          <motion.p className="hero__tag" variants={fadeUp}>
            ගැමි ජීවිතයේ දුක සතුට, මිනිස් හදවතේ කම්පනය —<br />
            ගීතයකට පෙරළූ අමරණීය කලාකරුවා.
          </motion.p>
          <motion.div className="hero__cta" variants={fadeUp}>
            <Link className="btn btn--gold" to="/music">
              ගීත අහන්න <span>· LISTEN</span>
            </Link>
            <Link className="btn btn--ghost" to="/biography">
              චරිත කතාව <span>· HIS STORY</span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero__scroll">
          <span>SCROLL</span>
          <motion.i
            animate={{ scaleY: [1, 0.55, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </section>

      {/* ===== QUOTE ===== */}
      <section className="quote">
        <motion.span
          className="quote__mark"
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          “
        </motion.span>
        <Reveal>
          <p className="si">හඬ නිහඬ වුවද — ගීතය තවමත් ජීවමානය</p>
          <p className="en">THE VOICE IS SILENT — YET THE SONG LIVES ON</p>
        </Reveal>
      </section>

      {/* ===== SONG TICKER ===== */}
      <Ticker items={songs.map((s) => s.titleSi)} />

      {/* ===== BIOGRAPHY ===== */}
      <section className="bio section">
        <Reveal className="bio__photo-wrap">
          <figure className="bio__photo">
            {/* Replace with: <img src="/images/kapuge-1970s.jpg" alt="Kapuge at SLBC" /> */}
            <figcaption>VINTAGE PHOTO<br />1970s · SLBC STUDIO</figcaption>
          </figure>
        </Reveal>

        <div className="bio__text">
          <Reveal>
            <p className="eyebrow"><i></i>චරිතය <span>· THE LIFE</span></p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>ගමේ හදවතින් උපන්,<br />ජාතියේ හදවත දිනූ හඬ</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="bio__sub"><em>Born of the village heart — a voice that won a nation.</em></p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="bio__body">
              1945 දී උපත ලද ගුණදාස කපුගේ, ශ්‍රී ලංකා ගුවන්විදුලි සංස්ථාවේ සංගීත
              අධ්‍යක්ෂවරයෙකු ලෙස දශක ගණනාවක් සේවය කළේය. ගැමි ජනතාවගේ දුක්
              කම්කටොලු සිය ගීතවලට පණ පෙවූ ඔහුගේ "කම්පන" ප්‍රසංග මාලාව ලාංකීය
              වේදිකා ඉතිහාසයේ සුවිශේෂී සන්ධිස්ථානයක් විය.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="bio__stats">
              <div className="stat">
                <b className="stat__big stat__big--num">40+</b>
                <span className="si">වසරක සංගීත දිවිය</span>
                <span className="en">YEARS IN MUSIC</span>
              </div>
              <div className="stat">
                <b className="stat__big stat__big--num">100+</b>
                <span className="si">අමරණීය ගීත</span>
                <span className="en">TIMELESS SONGS</span>
              </div>
              <div className="stat">
                <b className="stat__big">කම්පන</b>
                <span className="si">ප්‍රසංග මාලාව</span>
                <span className="en">LANDMARK CONCERTS</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="timeline section">
        <Reveal className="section__head">
          <h2>ජීවන ගමන</h2>
          <p className="section__sub">THE JOURNEY · 1945 — 2003</p>
        </Reveal>
        <ol className="timeline__track">
          {timeline.map((t, i) => (
            <motion.li
              key={t.year}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <i className="timeline__dot"></i>
              <b className="timeline__year">{t.year}</b>
              <span className="si">{t.titleSi}</span>
              <span className="en">{t.titleEn}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ===== MUSIC PREVIEW ===== */}
      <section className="music section">
        <Reveal className="section__head">
          <h2>ගීත එකතුව</h2>
          <p className="section__sub">THE MUSIC · ALBUMS &amp; LIVE RECORDINGS</p>
        </Reveal>
        <div className="music__row">
          {albums.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <motion.article
                className="album"
                whileHover={{ y: -8, boxShadow: "0 24px 50px rgba(0,0,0,.5)" }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`album__cover tone-${a.tone}`}
                  role="button"
                  onClick={() => setListenSong(a)}
                >
                  <b>{a.year}</b>
                  <div className="album__play"><i /></div>
                </div>
                <div className="album__meta">
                  <h3>{a.titleSi}</h3>
                  <p>{a.titleEn}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== KAMPANA ===== */}
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
            <p className="kampana__en">KAMPANA — THE CONCERT THAT SHOOK A NATION</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="kampana__si">වේදිකාව මත තනිවම — ගිටාරය, හඬ, සත්‍යය.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link className="btn btn--ghost-gold" to="/concerts">
              ප්‍රසංග බලන්න <span>· CONCERTS</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="gallery section">
        <Reveal className="section__head">
          <h2>මතක සටහන්</h2>
          <p className="section__sub">GALLERY · MOMENTS IN SEPIA</p>
        </Reveal>
        <div className="gallery__row">
          {gallery.map((g, i) => (
            <Reveal key={g.captionEn} delay={i * 0.1}>
              <motion.figure
                className={`shot tone-${g.tone}`}
                style={{ height: g.h }}
                whileHover={{ scale: 1.03, rotate: -0.5 }}
                transition={{ duration: 0.3 }}
              >
                <figcaption>{g.captionEn}</figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </section>

      <ListenModal song={listenSong} onClose={() => setListenSong(null)} />
    </Page>
  );
}
