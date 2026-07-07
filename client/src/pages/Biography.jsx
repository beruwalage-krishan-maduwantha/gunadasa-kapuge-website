import { motion } from "framer-motion";
import { Page, PageHead, Reveal } from "../components/motion.jsx";
import { useApi } from "../data/useApi.js";

export default function Biography() {
  const timeline = useApi("timeline");

  return (
    <Page>
      <PageHead si="චරිතය" en="THE LIFE OF GUNADASA KAPUGE · 1945 — 2003" />

      <section className="bio section">
        <Reveal>
          <figure className="bio__photo">
            {/* Replace with real photo */}
            <figcaption>VINTAGE PHOTO<br />1970s · SLBC STUDIO</figcaption>
          </figure>
        </Reveal>

        <div className="bio__text">
          <Reveal><h2>ගමේ හදවතින් උපන්,<br />ජාතියේ හදවත දිනූ හඬ</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="bio__sub"><em>Born of the village heart — a voice that won a nation.</em></p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="bio__body">
              ඇල්ලමුල්ල කපුගේ ගුණදාස — 1945 අගෝස්තු 7 වැනිදා ඇල්පිටියේ
              තණබද්දේගම ගම්මානයේ උපත ලැබීය. කරන්දෙණිය මධ්‍ය මහා විද්‍යාලයේ,
              අම්බලන්ගොඩ ධර්මාශෝක විද්‍යාලයේ සහ ගාල්ලේ නාගොඩ විද්‍යාලයේ
              අධ්‍යාපනය ලැබූ ඔහු, හේවුඩ් සංගීත විද්‍යාලයෙන් හා ඉන්දියාවේ
              භාත්කණ්ඩේ සංගීත ආයතනයෙන් ශාස්ත්‍රීය පුහුණුව ලැබීය.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="bio__body">
              1960 සිට ශ්‍රී ලංකා ගුවන්විදුලි සංස්ථාවේ සේවය කළ ඔහු, වැඩසටහන්
              නිෂ්පාදකයෙකු වී පසුව රජරට සේවයේ සංගීත අංශ ප්‍රධානියා බවට පත්විය.
              'A' ශ්‍රේණියේ ගායකයෙකු ලෙස සම්මානිත ඔහුගේ පළමු ගීතය — "දෑස
              නිලුපුල් තෙමා" — 1973 දී නිකුත් විය. ඔහුගේ සංගීතය ගැමි ජනතාවගේ,
              කම්කරුවන්ගේ, පීඩිතයන්ගේ හඬ විය.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="bio__body">
              1990 අගෝස්තු 25 වැනිදා ලුම්බිණි රඟහලේදී ආරම්භ වූ "කම්පන" තනි
              පුද්ගල ප්‍රසංගය වසර දෙකක් තුළ 1,000 වතාවක් පමණ රට පුරා වේදිකාගත
              විය. 2003 අප්‍රේල් 3 වැනිදා ඔහු අප අතරින් සමුගත්තේය — නමුත්
              ඔහුගේ හඬ අදටත් හදවත් කම්පා කරයි.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Full timeline */}
      <section className="timeline section" style={{ background: "var(--bg-deep)" }}>
        <Reveal className="section__head">
          <h2>ජීවන ගමන</h2>
          <p className="section__sub">THE JOURNEY</p>
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

      <section className="quote">
        <span className="quote__mark">“</span>
        <Reveal>
          <p className="si">ඔහු ගැයුවේ ජනතාව වෙනුවෙනි</p>
          <p className="en">HE SANG FOR THE PEOPLE</p>
        </Reveal>
      </section>
    </Page>
  );
}
