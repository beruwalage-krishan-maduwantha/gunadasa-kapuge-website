import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Page, PageHead, Reveal } from "../components/motion.jsx";
import ListenModal from "../components/ListenModal.jsx";
import { useApi } from "../data/useApi.js";

const PAGE_SIZE = 10;

/* Compact page-number list with ellipses: 1 … 4 5 [6] 7 8 … 14 */
function pageNumbers(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)
    .reduce((acc, p, i, arr) => {
      if (i > 0 && p - arr[i - 1] > 1) acc.push("…");
      acc.push(p);
      return acc;
    }, []);
}

export default function Music() {
  const albums = useApi("albums");
  const songs = useApi("songs");
  const catalog = useApi("catalog");
  const [listenSong, setListenSong] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? catalog.filter((t) => t.toLowerCase().includes(q)) : catalog;
  }, [catalog, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goToPage = (p) => {
    setPage(p);
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Page>
      <PageHead si="ගීත එකතුව" en="THE MUSIC · ALBUMS & SONGS" />

      {/* Albums */}
      <section className="music section">
        <Reveal className="section__head">
          <h2>ඇල්බම</h2>
          <p className="section__sub">ALBUMS &amp; LIVE RECORDINGS</p>
        </Reveal>
        <div className="music__row">
          {albums.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <motion.article
                className="album"
                whileHover={{ y: -8 }}
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

      {/* Songs list */}
      <section className="section" style={{ background: "var(--bg-panel)" }}>
        <Reveal className="section__head">
          <h2>ගීත</h2>
          <p className="section__sub">SONGS · TAP LISTEN TO CHOOSE A SERVICE</p>
        </Reveal>
        <div className="songlist">
          {songs.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <div className="song">
                <span className="song__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="song__titles">
                  <h3>{s.titleSi}</h3>
                  <p>{(s.titleEn || "").toUpperCase()}</p>
                </div>
                <span className="song__year">{s.year}</span>
                <button className="song__listen" onClick={() => setListenSong(s)}>
                  අහන්න
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full catalogue with search + pagination */}
      <section className="section" id="catalogue" style={{ background: "var(--bg-panel)" }}>
        <Reveal className="section__head">
          <h2>සම්පූර්ණ ගී එකතුව</h2>
          <p className="section__sub">FULL CATALOGUE · {catalog.length} SONGS</p>
        </Reveal>

        <Reveal className="catalog-search">
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="ගීතයක් සොයන්න · SEARCH A SONG…"
            aria-label="Search songs"
          />
        </Reveal>

        <div className="songlist">
          {pageItems.map((title, i) => {
            const num = (safePage - 1) * PAGE_SIZE + i + 1;
            return (
              <Reveal key={title + num} delay={i * 0.04}>
                <div className="song">
                  <span className="song__num">{String(num).padStart(3, "0")}</span>
                  <div className="song__titles">
                    <h3>{title}</h3>
                  </div>
                  <button
                    className="song__listen"
                    onClick={() => setListenSong({ titleSi: title, titleEn: title })}
                  >
                    අහන්න
                  </button>
                </div>
              </Reveal>
            );
          })}
          {filtered.length === 0 && (
            <p className="catalog__empty">
              "{query}" — කිසිවක් හමු වුණේ නැහැ · NO MATCHES
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="pager" aria-label="Catalogue pages">
            <button
              className="pager__nav"
              onClick={() => goToPage(safePage - 1)}
              disabled={safePage === 1}
            >
              ← පෙර
            </button>
            {pageNumbers(safePage, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={"e" + i} className="pager__ellipsis">…</span>
              ) : (
                <button
                  key={p}
                  className={`pager__num ${p === safePage ? "is-active" : ""}`}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </button>
              )
            )}
            <button
              className="pager__nav"
              onClick={() => goToPage(safePage + 1)}
              disabled={safePage === totalPages}
            >
              ඊළඟ →
            </button>
          </nav>
        )}

        <p className="catalog__credit">CATALOGUE VIA SARIGAMA.LK</p>
      </section>

      <ListenModal song={listenSong} onClose={() => setListenSong(null)} />
    </Page>
  );
}
