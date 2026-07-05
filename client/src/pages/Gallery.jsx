import { motion } from "framer-motion";
import { Page, PageHead } from "../components/motion.jsx";
import { useApi } from "../data/useApi.js";

export default function Gallery() {
  const photos = useApi("gallery");

  return (
    <Page>
      <PageHead si="මතක සටහන්" en="GALLERY · MOMENTS IN SEPIA" />

      <section className="gallery section">
        <div className="gallery__masonry">
          {photos.map((g, i) => (
            <motion.figure
              key={g.captionEn}
              className={`shot tone-${g.tone}`}
              style={{ height: g.h }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08 }}
              whileHover={{ scale: 1.02, rotate: -0.4 }}
            >
              {/* Replace with: <img src={`/images/gallery/${i + 1}.jpg`} alt={g.captionEn} /> */}
              <figcaption>{g.captionEn}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </Page>
  );
}
