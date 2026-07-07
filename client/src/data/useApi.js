import { useEffect, useState } from "react";

/* Local fallback so the site renders even if the API server is down.
   Facts sourced from en.wikipedia.org/wiki/Gunadasa_Kapuge */
export const FALLBACK = {
  songs: [
    { slug: "sabada-api-kandu-nowemu", titleSi: "සබඳ අපි කඳු නොවෙමු", titleEn: "Sabada Api Kandu Nowemu", year: "", tone: 1 },
    { slug: "bimbarak-senaga", titleSi: "බිම්බරක් සෙනඟ ගැවසුණා", titleEn: "Bimbarak Senaga Gevasuna", year: "", tone: 2 },
    { slug: "sondura-numba-lihiniyaka", titleSi: "සොඳුර නුඹ ලිහිණියක", titleEn: "Sondura Numba Lihiniyaka", year: "", tone: 3 },
    { slug: "rathriya-mama-wemi", titleSi: "රාත්‍රිය මම වෙමි", titleEn: "Rathriya Mama Wemi", year: "", tone: 4 },
    { slug: "uthuru-kone", titleSi: "උතුරු කොනේ නුඹ හිනැහෙන්", titleEn: "Uthuru Kone Nuba Hinahen", year: "", tone: 2 },
    { slug: "daesa-nilupul-thema", titleSi: "දෑස නිලුපුල් තෙමා", titleEn: "Daesa Nilupul Thema · his first release", year: "1973", tone: 1 },
    { slug: "unmadha-situwam", titleSi: "උන්මාද සිතුවම්", titleEn: "Unmadha Situwam", year: "1983", tone: 3 },
  ],
  albums: [
    { slug: "seethala-sanda-eliye", titleSi: "සීතල සඳ එළියේ", titleEn: "SEETHALA SANDA ELIYE", year: "1981", tone: 1 },
    { slug: "unmada-sithuwam", titleSi: "උන්මාද සිතුවම්", titleEn: "UNMADA SITHUWAM", year: "1983", tone: 3 },
    { slug: "kampana", titleSi: "කම්පන", titleEn: "KAMPANA — LIVE", year: "1990", tone: 2 },
    { slug: "mirivedi-sangalalak", titleSi: "මිරිවැඩි සඟළක්", titleEn: "MIRIVEDI SANGALALAK", year: "1995", tone: 4 },
    { slug: "mawathe-geethaya", titleSi: "මාවතේ ගීතය", titleEn: "MAWATHE GEETHAYA", year: "1983", tone: 2 },
    { slug: "piya-satahan", titleSi: "පිය සටහන්", titleEn: "PIYA SATAHAN", year: "1990", tone: 1 },
    { slug: "irabatu-taruwa", titleSi: "ඉරබටු තරුව", titleEn: "IRABATU TARUWA", year: "1999", tone: 4 },
    { slug: "sanda-ree-sihine", titleSi: "සඳ රෑ සිහිනේ", titleEn: "SANDA REE SIHINE", year: "2000", tone: 3 },
  ],
  // Full catalogue via sarigama.lk (131 songs)
  catalog: [
    "Aan Nage Sal Aththe", "Abisarikawange", "Ae Mage Nelum Mala", "Ahasa Usata Naga Giyata",
    "Allata Shilpa", "Allata Shilpa Singa", "Amme Nube As", "Andura Wetee Eai",
    "Asunath Nasena", "Atha Dilena Tharu Diha", "Awado Sansare", "Bimbarak Senaga",
    "Bindu Bindu Tharaka", "Binduna Dahan Binduna", "Bindunu Pem Hada", "Birinda Mage Oba",
    "Bodilima Nangiye", "Chandani Payala", "Dam Patin La Sanda", "Dana Mana Pinawa",
    "Dasa Nilupul Thema", "Dawasak Pala Nathi Hene", "Dawase Karadara", "Dethola Nokee De",
    "Diyaluwo", "Domba Mal Kalawe", "Duka Hadu Dena Raye", "Game Ennata",
    "Gangawe Geethe", "Giri Sirasa Wile", "Goni Otunu", "Hanthane Kandu",
    "Heesara Wadunu Pasuwa", "Irabatu Tharuwa", "Irabatu Tharuwa Wage", "Kalladi Palama",
    "Karagala Gaga Inna Karanawami", "Kawuruth Ennathi", "Kiyawa Magiya", "Leli Thalana Nube Athata",
    "Lihiniyo", "Lowe Duka Daka", "Ma Priya Maheshikavi", "Mage Bisaune Asapan",
    "Mage Hada Madala", "Mage Hada Madala V2", "Maha Pirith Pothaya", "Mal Tharuna Samaya",
    "Man Mula Wee", "Mandira Mandapa", "Mangala Andumin", "Me Sandema",
    "Me Sihina Nagare", "Minisun Nathi", "Monara Malu", "Na Kola Andam",
    "Nabara Goyamata", "Nagalagan Veediye", "Nawathwanna Olwarasan", "Neela Kandu Peera",
    "Nilgirihisa Rumassala", "Ninda Nathi Raye", "Nirmala", "Oba Pem Karana",
    "Obata Ma Aadarei", "Obata Yannama Ona Nam", "Pabalu Nage", "Palanchiye",
    "Palu Amusohon", "Paluwa Dewanath Karala", "Pansal Paamula", "Pasak Kota",
    "Perakum Nirinduni", "Pichcha Mal Pipee", "Pihitak Nathi", "Piyambanna Awasarai",
    "Piyapath Walakulu", "Piyasatahan", "Premaye Prema Waparesa", "Pujacha Pujaneeyanam",
    "Pura Handata Penenennata", "Ra Madiyama", "Ramya Nagaraya", "Ruwak Adenawa",
    "Ruwan Mal Hali", "Saamaye Sudu Piyapath", "Sabanda Api Kandu Nowemu", "Sakwalihini",
    "Sal Gaha Mudune", "Salana Susuma", "Salena Lowe", "Samanola Kanda",
    "Sanda Re Sihinaye", "Sathdarma Makaranda", "Seda Sinindu Sudu", "Seetha Pini Bindu",
    "Seethala Sanda Eliye", "Sene Sithin", "Shilpa Aran", "Sinhala Sindu Kiyana",
    "Siripoda Wessa", "Sitha Niwa Pahan Kala", "Situ Kumariye", "Sondura Numba Lihiniyaka",
    "Soya Nogosina", "Soya Nogosina (Veediye Budu Himi)", "Suba Prarthana Kiyaman", "Sudu Nanda Ai",
    "Sudu Sina", "Sumudu Kumudak", "Thal Wata Aine", "Tharaka Kelum",
    "Tharu Mal Yayama", "Tharu Rana Ridi Pata Pata", "Tharuka Kelum", "Thirikkale",
    "Thiya Atheethaya Ma Langa", "Thuwakkuwe Kata", "Unmada Sithuwam", "Uthuru Kone",
    "Veena Kesanga Wu Veena", "Viduli Mini Pahan", "Vilanda Kawa", "Viyali Giya Dethane",
    "Viyaru Wati", "Wana Vihanga Thude", "Waragana", "Warahali Anda Adu Kuliyata",
    "Wewu Thawalle", "Wilanda Kawa", "Wili Barin Kendiri Noga"
  ],
  timeline: [
    { year: "1945", titleSi: "උපත", titleEn: "BORN AUG 7 · THANABADDEGAMA, ELPITIYA" },
    { year: "1960", titleSi: "ගුවන්විදුලියට", titleEn: "JOINS RADIO CEYLON · TRAINS AT BHATKHANDE, INDIA" },
    { year: "1973", titleSi: "පළමු ගීතය", titleEn: "FIRST RELEASE — DAESA NILUPUL THEMA" },
    { year: "1990", titleSi: "කම්පන", titleEn: "ONE-MAN SHOW PREMIERES AUG 25 · LUMBINI THEATRE" },
    { year: "2003", titleSi: "සමුගැනීම", titleEn: "APRIL 3 — THE VOICE BECOMES ETERNAL" },
  ],
  gallery: [
    { captionEn: "KAMPANA · LUMBINI 1990", tone: 1, h: 340 },
    { captionEn: "SLBC STUDIO DAYS", tone: 2, h: 300 },
    { captionEn: "WITH THE PEOPLE", tone: 3, h: 360 },
    { captionEn: "ON STAGE", tone: 4, h: 310 },
    { captionEn: "REHEARSAL", tone: 2, h: 320 },
    { captionEn: "RADIO CEYLON ERA", tone: 1, h: 350 },
    { captionEn: "GRADE A VOCALIST", tone: 4, h: 300 },
    { captionEn: "FAMILY ARCHIVE", tone: 3, h: 330 },
  ],
  concerts: [
    {
      titleSi: "කම්පන", titleEn: "KAMPANA · 1990", era: "1990s",
      descSi: "1990 අගෝස්තු 25 — ලුම්බිණි රඟහලේදී ආරම්භ වූ තනි පුද්ගල ප්‍රසංගය. වසර දෙකක් තුළ ප්‍රසංග 1,000ක් පමණ — ප්‍රේක්ෂක ඉල්ලීම මත පැය දෙක තුනක් දක්වා දිගු විය.",
      descEn: "The one-man show premiered Aug 25, 1990 at Lumbini theatre — nearly 1,000 performances in two years, often stretched from two hours to three by audience request.",
    },
    {
      titleSi: "ගුවන්විදුලි යුගය", titleEn: "THE RADIO YEARS", era: "1960 — 1990",
      descSi: "1960 සිට ශ්‍රී ලංකා ගුවන්විදුලි සංස්ථාවේ — වැඩසටහන් නිෂ්පාදක, රජරට සේවයේ සංගීත අංශ ප්‍රධානියා. 'A' ශ්‍රේණියේ ගායකයෙකු ලෙස සම්මානිතයි.",
      descEn: "From 1960 at the SLBC — programme producer, then Head of Music of the Rajarata Service. Rated a Grade A vocalist by Radio Ceylon.",
    },
    {
      titleSi: "අවසන් ගමන", titleEn: "THE FINAL JOURNEY", era: "2003",
      descSi: "2003 අප්‍රේල් 3 — ඩුබායි සංචාරයෙන් පසු කටුනායක ගුවන්තොටුපළේදී සිදු වූ අනතුරකින් ඔහු සමුගත්තේය. හඬ සදාකාලික විය.",
      descEn: "April 3, 2003 — after a fall at Bandaranaike Airport returning from Dubai, the voice fell silent at 57. And became eternal.",
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
