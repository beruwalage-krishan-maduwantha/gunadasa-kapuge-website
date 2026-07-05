import { useEffect, useState } from "react";

/* Local fallback so the site renders even if the API server is down. */
export const FALLBACK = {
  songs: [
    { slug: "welithala-athare", titleSi: "වැලිතල අතරේ", titleEn: "Welithala Athare", year: "1978", tone: 1 },
    { slug: "kampana-live", titleSi: "කම්පන · සජීවී", titleEn: "Kampana — Live", year: "1991", tone: 2 },
    { slug: "atha-kandukara", titleSi: "ඈත කඳුකර", titleEn: "Atha Kandukara", year: "1983", tone: 3 },
    { slug: "gee-ekathuwa", titleSi: "ගී එකතුව", titleEn: "Collected Songs", year: "2003", tone: 4 },
  ],
  albums: [
    { slug: "welithala-athare", titleSi: "වැලිතල අතරේ", titleEn: "STUDIO ALBUM", year: "1978", tone: 1 },
    { slug: "kampana-live", titleSi: "කම්පන · සජීවී", titleEn: "KAMPANA — LIVE", year: "1991", tone: 2 },
    { slug: "atha-kandukara", titleSi: "ඈත කඳුකර", titleEn: "STUDIO ALBUM", year: "1983", tone: 3 },
    { slug: "gee-ekathuwa", titleSi: "ගී එකතුව", titleEn: "COLLECTED SONGS", year: "2003", tone: 4 },
  ],
  timeline: [
    { year: "1945", titleSi: "උපත", titleEn: "BORN IN SOUTHERN SRI LANKA" },
    { year: "1960s", titleSi: "ගුවන්විදුලියට", titleEn: "TRAINED IN INDIA · JOINS RADIO CEYLON" },
    { year: "1990s", titleSi: "කම්පන යුගය", titleEn: "THE KAMPANA CONCERTS SHAKE THE NATION" },
    { year: "2003", titleSi: "සමුගැනීම", titleEn: "FAREWELL — THE VOICE BECOMES ETERNAL" },
  ],
  gallery: [
    { captionEn: "ON STAGE · 1992", tone: 1, h: 340 },
    { captionEn: "SLBC STUDIO", tone: 2, h: 300 },
    { captionEn: "WITH THE PEOPLE", tone: 3, h: 360 },
    { captionEn: "KAMPANA NIGHT", tone: 4, h: 310 },
    { captionEn: "REHEARSAL", tone: 2, h: 320 },
    { captionEn: "RADIO DAYS", tone: 1, h: 350 },
    { captionEn: "THE LAST TOUR", tone: 4, h: 300 },
    { captionEn: "FAMILY ARCHIVE", tone: 3, h: 330 },
  ],
  concerts: [
    {
      titleSi: "කම්පන", titleEn: "KAMPANA", era: "1990s",
      descSi: "වේදිකාව මත තනිවම — ගිටාරය, හඬ, සත්‍යය. ලාංකීය ප්‍රසංග ඉතිහාසයේ සුවිශේෂී සන්ධිස්ථානය.",
      descEn: "Alone on stage — a guitar, a voice, the truth. A landmark in Sri Lankan concert history.",
    },
    {
      titleSi: "ගුවන්විදුලි යුගය", titleEn: "THE RADIO ERA", era: "1960s — 1990s",
      descSi: "ශ්‍රී ලංකා ගුවන්විදුලි සංස්ථාවේ සංගීත අධ්‍යක්ෂවරයෙකු ලෙස දශක ගණනාවක සේවය.",
      descEn: "Decades of service as a music director at the Sri Lanka Broadcasting Corporation.",
    },
    {
      titleSi: "අවසන් සංචාරය", titleEn: "THE FINAL TOUR", era: "2003",
      descSi: "2003 — ඕස්ට්‍රේලියානු සංචාරයේදී ඔහු අප අතරින් සමුගත්තේය. හඬ සදාකාලික විය.",
      descEn: "2003 — he passed away during a tour of Australia. The voice became eternal.",
    },
  ],
};

/* Fetch from the Express API, fall back to local data on failure. */
export function useApi(resource) {
  const [data, setData] = useState(FALLBACK[resource] || []);

  useEffect(() => {
    let alive = true;
    fetch(`/api/${resource}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => alive && json?.length && setData(json))
      .catch(() => {}); // keep fallback silently
    return () => { alive = false; };
  }, [resource]);

  return data;
}
