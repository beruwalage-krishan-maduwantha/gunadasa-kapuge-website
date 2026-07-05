/* Infinite song-title marquee — one CSS transform animation, GPU composited */
export default function Ticker({ items }) {
  const row = [...items, ...items]; // duplicated for seamless loop
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
