/* Infinite song-title marquee — one CSS transform animation, GPU composited */
export default function Ticker({ items }) {
  // Repeat until each half of the track is wider than any viewport,
  // otherwise the -50% loop shows an empty gap on wide screens
  const copies = Math.max(2, Math.ceil(12 / Math.max(items.length, 1)) * 2);
  const row = Array.from({ length: copies }, () => items).flat();
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {row.map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
