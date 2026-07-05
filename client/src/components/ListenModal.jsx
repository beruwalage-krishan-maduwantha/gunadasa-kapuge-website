import { AnimatePresence, motion } from "framer-motion";

/* lnk.to-style "Choose music service" modal.
   Uses search links so every button works even before official
   artist-page URLs are added. Swap `url` per song later if needed. */

const SERVICES = (query) => [
  { name: "YouTube", color: "#ff0000", url: `https://www.youtube.com/results?search_query=${query}` },
  { name: "Spotify", color: "#1db954", url: `https://open.spotify.com/search/${query}` },
  { name: "Apple Music", color: "#fa4360", url: `https://music.apple.com/us/search?term=${query}` },
  { name: "Deezer", color: "#a238ff", url: `https://www.deezer.com/search/${query}` },
  { name: "SoundCloud", color: "#ff5500", url: `https://soundcloud.com/search?q=${query}` },
];

export default function ListenModal({ song, onClose }) {
  return (
    <AnimatePresence>
      {song && (
        <motion.div
          className="lmodal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="lmodal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lmodal__head">
              <button className="lmodal__close" onClick={onClose} aria-label="Close">✕</button>
              <h3>{song.titleSi}</h3>
              <p>{song.titleEn?.toUpperCase()} · CHOOSE MUSIC SERVICE</p>
            </div>

            <div className="lmodal__services">
              {SERVICES(encodeURIComponent(`Gunadasa Kapuge ${song.titleEn || song.titleSi}`)).map(
                (s, i) => (
                  <motion.a
                    key={s.name}
                    className="lmodal__service"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <span className="lmodal__brand">
                      <i className="lmodal__dot" style={{ background: s.color }} />
                      <b>{s.name}</b>
                    </span>
                    <span className="lmodal__go">PLAY</span>
                  </motion.a>
                )
              )}
            </div>

            <p className="lmodal__note">
              LINKS OPEN A SEARCH FOR THIS SONG ON EACH SERVICE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
