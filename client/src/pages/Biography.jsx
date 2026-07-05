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
              1945 දී දකුණු ලංකාවේ උපත ලද ගුණදාස කපුගේ, කුඩා කල සිටම සංගීතයට
              ආදරය කළේය. ඉන්දියාවේ භාත්කණ්ඩේ සංගීත විද්‍යාලයේ ශාස්ත්‍රීය පුහුණුව
              ලැබූ ඔහු, ආපසු පැමිණ ශ්‍රී ලංකා ගුවන්විදුලි සංස්ථාවට එක් විය.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="bio__body">
              ඔහුගේ සංගීතය හුදෙක් රසාස්වාදය සඳහා නොවීය — එය ගැමි ජනතාවගේ,
              කම්කරුවන්ගේ, යුද්ධයෙන් පීඩාවට පත් මව්වරුන්ගේ හඬ විය. ජන සංගීත
              මූලයන් සමඟ ශාස්ත්‍රීය දැනුම මුසු කළ ඔහුගේ අනන්‍ය ශෛලිය අදටත්
              අනුකරණය කළ නොහැකිය.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="bio__body">
              "කම්පන" ප්‍රසංග මාලාව ලාංකීය වේදිකා ඉතිහාසයේ සුවිශේෂී
              සන්ධිස්ථානයක් විය. 2003 අප්‍රේල් මාසයේදී ඕස්ට්‍රේලියානු සංචාරයක්
              අතරතුර ඔහු අප අතරින් සමුගත්තේය — නමුත් ඔහුගේ හඬ අදටත් හදවත්
              කම්පා කරයි.
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
