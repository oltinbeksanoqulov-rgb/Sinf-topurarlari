// ==============================================================================
// EA SPORTS FC MOBILE - O'yin uslublari (PlayStyles) va Diagramma ma'lumotlari
// 8-D Sinf futbolchilari uchun rasmiy PlayStyles va Hexagonal Radar statistikasi
// ==============================================================================

export const PLAYSTYLES_CATALOG = {
  // --- 1. To'pni otish / Zarba ---
  aniq_zarba: {
    id: 'aniq_zarba',
    name: 'Aniq zarba',
    category: 'Zarba',
    categoryColor: 'from-emerald-500 to-green-500',
    description: 'Darvoza burchaklariga aylanma va o‘ta aniq zarba yo‘llash mahorati.'
  },
  kuchli_zarba: {
    id: 'kuchli_zarba',
    name: 'Kuchli zarba',
    category: 'Zarba',
    categoryColor: 'from-amber-500 to-orange-500',
    description: 'Darvozabonga imkon qoldirmaydigan yuqori tezlikdagi qudratli zarba.'
  },
  nozik_zarba: {
    id: 'nozik_zarba',
    name: 'Nozik zarba',
    category: 'Zarba',
    categoryColor: 'from-teal-400 to-emerald-400',
    description: 'Darvozabon ustidan to‘pni nozik va ustomonlik bilan oshirib tashlash.'
  },
  o_lik_to_p: {
    id: 'o_lik_to_p',
    name: 'O‘lik to‘p',
    category: 'Zarba',
    categoryColor: 'from-emerald-400 to-cyan-500',
    description: 'Jarimadan to‘g‘ridan-to‘g‘ri to‘pni darvozaga kiritish mahorati.'
  },
  bosh_bilan_zarba: {
    id: 'bosh_bilan_zarba',
    name: 'Bosh bilan zarba',
    category: 'Zarba',
    categoryColor: 'from-emerald-500 to-teal-500',
    description: 'Havo kurashlarida to‘pni bosh bilan aniq yo‘naltirish qobiliyati.'
  },

  // --- 2. Pas berish ---
  tiki_taka: {
    id: 'tiki_taka',
    name: 'Tiki taka',
    category: 'Pas berish',
    categoryColor: 'from-blue-500 to-cyan-400',
    description: 'Bir teginishda tezkor va uzluksiz jamoaviy qisqa paslar zanjiri.'
  },
  uzoqqa_pas: {
    id: 'uzoqqa_pas',
    name: 'Uzoqqa pas',
    category: 'Pas berish',
    categoryColor: 'from-cyan-500 to-blue-500',
    description: 'Maydonning narigi chetiga aniq havodan to‘p yetkazib berish.'
  },
  tezkor_pas: {
    id: 'tezkor_pas',
    name: 'Tezkor pas',
    category: 'Pas berish',
    categoryColor: 'from-blue-400 to-indigo-500',
    description: 'Raqib oyoqlari orasidan o‘tuvchi o‘ta tezkor va qat’iy yerlatib uzatma.'
  },
  aniq_pas: {
    id: 'aniq_pas',
    name: 'Aniq pas',
    category: 'Pas berish',
    categoryColor: 'from-sky-400 to-blue-500',
    description: 'Himoyachilar orasidan sherigiga to‘pni qulay vaziyatga tashlab berish.'
  },
  chalqon_pas: {
    id: 'chalqon_pas',
    name: 'Chalqon pas',
    category: 'Pas berish',
    categoryColor: 'from-cyan-400 to-teal-400',
    description: 'Qanotdan aylanma va xavfli to‘p uzatish.'
  },

  // --- 3. To'p nazorati ---
  fint: {
    id: 'fint',
    name: 'Fint',
    category: 'To‘p nazorati',
    categoryColor: 'from-purple-500 to-pink-500',
    description: 'Chalg‘ituvchi harakatlar va nozik mahorat bilan raqibni aldab o‘tish.'
  },
  trikster: {
    id: 'trikster',
    name: 'Trikster',
    category: 'To‘p nazorati',
    categoryColor: 'from-fuchsia-500 to-rose-500',
    description: 'Kutilmagan texnik nayranglar va tomoshabop fokuslar ustasi.'
  },
  tezkorlik: {
    id: 'tezkorlik',
    name: 'Tezkorlik',
    category: 'To‘p nazorati',
    categoryColor: 'from-yellow-400 to-amber-500',
    description: 'To‘p bilan birga katta tezlikda oldinga shiddat bilan siljish.'
  },
  texnik_mahorat: {
    id: 'texnik_mahorat',
    name: 'Texnik mahorat',
    category: 'To‘p nazorati',
    categoryColor: 'from-violet-500 to-purple-500',
    description: 'To‘pni oyoqdan ajratmasdan, mayda qadamlar bilan boshqarib yurish.'
  },
  bosim_ostida_pas: {
    id: 'bosim_ostida_pas',
    name: 'Bosim ostida pas',
    category: 'To‘p nazorati',
    categoryColor: 'from-cyan-500 to-emerald-500',
    description: 'Raqibning qattiq pressingi ostida ham to‘pni yo‘qotmasdan uzatish.'
  },
  birinchi_teginish: {
    id: 'birinchi_teginish',
    name: 'Birinchi teginish',
    category: 'To‘p nazorati',
    categoryColor: 'from-emerald-400 to-teal-500',
    description: 'Kelayotgan qiyin to‘pni birinchi teginishdayoq to‘liq bo‘ysundirish.'
  },

  // --- 4. Himoya ---
  to_siq: {
    id: 'to_siq',
    name: 'To‘siq',
    category: 'Himoya',
    categoryColor: 'from-emerald-500 to-teal-500',
    description: 'Jismoniy quvvat va baquvvat gavda bilan raqibni to‘pdan mahrum qilish.'
  },
  blok: {
    id: 'blok',
    name: 'Blok',
    category: 'Himoya',
    categoryColor: 'from-red-500 to-rose-600',
    description: 'Raqibning xavfli zarbalari yo‘lini o‘z vaqtida tanasi bilan to‘sish.'
  },
  sirpanma_top_olish: {
    id: 'sirpanma_top_olish',
    name: 'Sirpanma to‘p olish',
    category: 'Himoya',
    categoryColor: 'from-amber-500 to-red-500',
    description: 'O‘z vaqtida sirpanib tashlanib, to‘pni toza va aniq olib qo‘yish.'
  },
  intersepsiya: {
    id: 'intersepsiya',
    name: 'Intersepsiya',
    category: 'Himoya',
    categoryColor: 'from-teal-500 to-cyan-500',
    description: 'Raqib uzatmasini oldindan sezib, to‘pni ilib olish.'
  },
  jokey: {
    id: 'jokey',
    name: 'Jokey',
    category: 'Himoya',
    categoryColor: 'from-blue-500 to-indigo-600',
    description: 'Raqib hujumchisini maydondan chetga siqib chiqarish pozitsiyasi.'
  },

  // --- 5. Jismoniy holat ---
  tezlik: {
    id: 'tezlik',
    name: 'Tezlik',
    category: 'Jismoniy holat',
    categoryColor: 'from-emerald-400 to-green-500',
    description: 'Maydonda to‘psiz va to‘p bilan maksimal yugurish tezligi.'
  },
  tezkor_qadam: {
    id: 'tezkor_qadam',
    name: 'Tezkor qadam',
    category: 'Jismoniy holat',
    categoryColor: 'from-green-400 to-emerald-500',
    description: 'Bir lahzada yuqori tezlikka chiqish va dastlabki portlovchi tezlanish.'
  },
  bardoshlik: {
    id: 'bardoshlik',
    name: 'Bardoshlik',
    category: 'Jismoniy holat',
    categoryColor: 'from-amber-400 to-emerald-400',
    description: 'O‘yinning so‘nggi daqiqalarigacha so‘nmas kuch va tinimsiz harakat.'
  },
  akrobatika: {
    id: 'akrobatika',
    name: 'Akrobatika',
    category: 'Jismoniy holat',
    categoryColor: 'from-purple-400 to-pink-500',
    description: 'Murakkab vaziyatlarda ham noan’anaviy harakatlar bilan zarba berish.'
  },

  // --- 6. Darvozabonlik (Goalkeeper) ---
  refleks: {
    id: 'refleks',
    name: 'Refleks',
    category: 'Darvozabonlik',
    categoryColor: 'from-emerald-400 to-teal-400',
    description: 'Yaqin masofadan berilgan xavfli zarbalarga chaqqon va bir lahzada javob berish.'
  },
  darvoza_posboni: {
    id: 'darvoza_posboni',
    name: 'Darvoza posboni',
    category: 'Darvozabonlik',
    categoryColor: 'from-cyan-400 to-blue-500',
    description: 'Darvoza chizig‘ini to‘liq nazorat qilish, ishonchli turish va to‘pni mahkam ushlash.'
  },
  ishonchli_qo_llar: {
    id: 'ishonchli_qo_llar',
    name: 'Ishonchli qo‘llar',
    category: 'Darvozabonlik',
    categoryColor: 'from-blue-400 to-indigo-500',
    description: 'Kuchli zarbalarni qo‘ldan chiqarmasdan mustahkam ushlab olish.'
  },
  akrobatik_seyv: {
    id: 'akrobatik_seyv',
    name: 'Akrobatik seyv',
    category: 'Darvozabonlik',
    categoryColor: 'from-teal-400 to-cyan-500',
    description: 'Darvoza to‘qqizligiga ketayotgan to‘plarni havoda uchib qaytarish.'
  }
};

// ==============================================================================
// 9 nafar rasmiy futbolchining o'yin uslublari va Hexagonal Diagramma ma'lumotlari
// ==============================================================================

export const PLAYER_PLAYSTYLES_DATA = {
  // 1. Sanoqulov Oltinbek (Hujumchi, #7)
  p2: {
    playStyles: ['aniq_zarba', 'tiki_taka', 'fint', 'trikster', 'tezkor_qadam'],
    diagram: {
      shooting: 94,   // Zarba
      passing: 88,    // Pass
      dribbling: 96,  // Dribling
      defending: 55,  // Himoya
      physical: 82,   // Jismoniy holat
      ballControl: 93 // To'p nazorati
    },
    topStyles: ['Dribling', 'Zarba', 'To‘p nazorati'],
    summary: 'Sizning kuchli tomonlaringiz — Dribling va Aniq zarba!'
  },

  // 2. Xoliyorov Ibrohim (Hujumchi, #11)
  p8: {
    playStyles: ['kuchli_zarba', 'uzoqqa_pas', 'tezkorlik', 'tezlik'],
    diagram: {
      shooting: 92,
      passing: 82,
      dribbling: 87,
      defending: 52,
      physical: 88,
      ballControl: 85
    },
    topStyles: ['Zarba', 'Jismoniy holat', 'Dribling'],
    summary: 'Sizning kuchli tomonlaringiz — Kuchli zarba va Tezlik!'
  },

  // 3. Xusanov Ozodbek (Yarim himoyachi, #45)
  p3: {
    playStyles: ['kuchli_zarba', 'tiki_taka', 'texnik_mahorat', 'to_siq', 'bardoshlik'],
    diagram: {
      shooting: 86,
      passing: 94,
      dribbling: 88,
      defending: 82,
      physical: 90,
      ballControl: 91
    },
    topStyles: ['Pass', 'To‘p nazorati', 'Jismoniy holat'],
    summary: 'Sizning kuchli tomonlaringiz — Pass va Texnik mahorat!'
  },

  // 4. Salaydinov Miraziz (Hujumchi, #9)
  p6: {
    playStyles: ['aniq_zarba', 'aniq_pas', 'texnik_mahorat', 'tezlik'],
    diagram: {
      shooting: 89,
      passing: 91,
      dribbling: 92,
      defending: 58,
      physical: 83,
      ballControl: 90
    },
    topStyles: ['Dribling', 'Pass', 'To‘p nazorati'],
    summary: 'Sizning kuchli tomonlaringiz — Tezlik va Texnik mahorat!'
  },

  // 5. Qahramonov Samariddin (Yarim himoyachi, #8)
  p4: {
    playStyles: ['nozik_zarba', 'aniq_pas', 'bosim_ostida_pas', 'blok', 'tezkor_qadam'],
    diagram: {
      shooting: 83,
      passing: 95,
      dribbling: 87,
      defending: 76,
      physical: 82,
      ballControl: 92
    },
    topStyles: ['Pass', 'To‘p nazorati', 'Dribling'],
    summary: 'Sizning kuchli tomonlaringiz — Aniq pas va Bosim ostida pas!'
  },

  // 6. Eshmamatov Ibrohim (Himoyachi, #4)
  p1: {
    playStyles: ['tezkor_pas', 'fint', 'sirpanma_top_olish', 'tezlik'],
    diagram: {
      shooting: 68,
      passing: 86,
      dribbling: 84,
      defending: 95,
      physical: 90,
      ballControl: 83
    },
    topStyles: ['Himoya', 'Jismoniy holat', 'Pass'],
    summary: 'Sizning kuchli tomonlaringiz — Himoya va Sirpanma to‘p olish!'
  },

  // 7. Misirov Umidjon (Himoyachi, #3)
  p9: {
    playStyles: ['to_siq', 'bosim_ostida_pas', 'aniq_zarba'],
    diagram: {
      shooting: 76,
      passing: 85,
      dribbling: 78,
      defending: 94,
      physical: 91,
      ballControl: 82
    },
    topStyles: ['Himoya', 'Jismoniy holat', 'Pass'],
    summary: 'Sizning kuchli tomonlaringiz — To‘siq va Mudofaa!'
  },

  // 8. Xayrullayev Javohir (Himoyachi, #2)
  p7: {
    playStyles: ['to_siq', 'sirpanma_top_olish', 'kuchli_zarba', 'tiki_taka'],
    diagram: {
      shooting: 82,
      passing: 87,
      dribbling: 80,
      defending: 96,
      physical: 93,
      ballControl: 84
    },
    topStyles: ['Himoya', 'Jismoniy holat', 'Pass'],
    summary: 'Sizning kuchli tomonlaringiz — Himoya va Jismoniy kuch!'
  },

  // 9. Abdumannonov Ibrohim (Darvozabon, #1)
  p5: {
    playStyles: ['refleks', 'darvoza_posboni'],
    diagram: {
      shooting: 95,   // Seyvlar
      passing: 84,    // Aniq uzatma
      dribbling: 98,  // Refleks
      defending: 96,  // Pozitsiya
      physical: 91,   // Jismoniy holat
      ballControl: 94 // Darvoza posboni
    },
    topStyles: ['Dribling', 'Himoya', 'Zarba'],
    summary: 'Sizning kuchli tomonlaringiz — Refleks va Darvoza posboni!'
  }
};

// Helper: Get PlayStyles and Diagram for any player (with robust fallback)
export function getPlayerPlayStylesInfo(player) {
  if (!player) return null;

  // Direct match by ID
  let match = PLAYER_PLAYSTYLES_DATA[player.id];

  // Fallback match by Name
  if (!match && player.name) {
    const cleanName = player.name.trim().toLowerCase();
    if (cleanName.includes('sanoqulov')) match = PLAYER_PLAYSTYLES_DATA['p2'];
    else if (cleanName.includes('eshmamatov')) match = PLAYER_PLAYSTYLES_DATA['p1'];
    else if (cleanName.includes('xusanov')) match = PLAYER_PLAYSTYLES_DATA['p3'];
    else if (cleanName.includes('qahramonov')) match = PLAYER_PLAYSTYLES_DATA['p4'];
    else if (cleanName.includes('abdumannonov') || cleanName.includes('abdumanonov')) match = PLAYER_PLAYSTYLES_DATA['p5'];
    else if (cleanName.includes('salaydinov')) match = PLAYER_PLAYSTYLES_DATA['p6'];
    else if (cleanName.includes('xayrullayev')) match = PLAYER_PLAYSTYLES_DATA['p7'];
    else if (cleanName.includes('xolyorov') || cleanName.includes('xoliyorov')) match = PLAYER_PLAYSTYLES_DATA['p8'];
    else if (cleanName.includes('misirov')) match = PLAYER_PLAYSTYLES_DATA['p9'];
  }

  // Default fallback for dynamic players
  if (!match) {
    const isGK = player.position === 'Darvozabon';
    const isDefender = player.position === 'Himoyachi';
    const isMidfielder = player.position === 'Yarim himoyachi';

    if (isGK) {
      match = {
        playStyles: ['refleks', 'darvoza_posboni'],
        diagram: { shooting: 90, passing: 80, dribbling: 94, defending: 92, physical: 88, ballControl: 90 },
        topStyles: ['Dribling', 'Himoya', 'Zarba'],
        summary: 'Sizning kuchli tomonlaringiz — Refleks va Darvoza posboni!'
      };
    } else if (isDefender) {
      match = {
        playStyles: ['to_siq', 'sirpanma_top_olish', 'tezkor_pas'],
        diagram: { shooting: 72, passing: 84, dribbling: 78, defending: 92, physical: 88, ballControl: 80 },
        topStyles: ['Himoya', 'Jismoniy holat', 'Pass'],
        summary: 'Sizning kuchli tomonlaringiz — Himoya va Jismoniy kuch!'
      };
    } else if (isMidfielder) {
      match = {
        playStyles: ['aniq_pas', 'tiki_taka', 'texnik_mahorat'],
        diagram: { shooting: 82, passing: 92, dribbling: 86, defending: 74, physical: 82, ballControl: 88 },
        topStyles: ['Pass', 'To‘p nazorati', 'Dribling'],
        summary: 'Sizning kuchli tomonlaringiz — Pass va To‘p nazorati!'
      };
    } else {
      match = {
        playStyles: ['aniq_zarba', 'fint', 'tezkor_qadam'],
        diagram: { shooting: 90, passing: 84, dribbling: 91, defending: 54, physical: 82, ballControl: 88 },
        topStyles: ['Dribling', 'Zarba', 'To‘p nazorati'],
        summary: 'Sizning kuchli tomonlaringiz — Dribling va Aniq zarba!'
      };
    }
  }

  // Resolve style items with full details
  const resolvedStyles = match.playStyles
    .map(key => PLAYSTYLES_CATALOG[key])
    .filter(Boolean);

  return {
    ...match,
    stylesList: resolvedStyles
  };
}
