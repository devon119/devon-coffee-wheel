// patch_ency_2.js — Process (9) + Roast (10) EN content
const fs = require('fs');
const FILE = 'index.html';
let raw = fs.readFileSync(FILE, 'utf8');
const hasCRLF = raw.includes('\r\n');
let h = hasCRLF ? raw.replace(/\r\n/g, '\n') : raw;

function injectEn(constName, fields) {
    const anchor = `heroSvg: ${constName},`;
    if (!h.includes(anchor)) { console.warn('⚠ missing: ' + constName); return; }
    const lines = Object.entries(fields)
        .map(([k,v]) => `                            ${k}: ${JSON.stringify(v)},`)
        .join('\n');
    h = h.replace(anchor, anchor + '\n' + lines);
    console.log('  EN: ' + constName);
}

// ── PROCESS ───────────────────────────────────────────────────────────────────

injectEn('ENCY_PROC_WASHED', {
    name_en: 'Washed (Fully Washed)',
    tagline_en: 'Clean, bright, acid-forward — specialty coffee standard',
    subtitle_en: 'After harvest, coffee cherries are depulped, fermented 24–72 hours to remove mucilage, washed clean with water, and dried. The result is the cleanest, brightest, most transparent cup — ideal for showcasing terroir and variety character. The dominant method in specialty coffee.',
    specs_en: [
        {k:'Steps',v:'Harvest → float-sort → depulp → wet ferment → wash → dry'},
        {k:'Fermentation time',v:'24–72 hours (tank or dry fermentation)'},
        {k:'Drying time',v:'7–15 days (to 11% moisture)'},
        {k:'Water use',v:'40–60 liters per kg of coffee (high consumption)'},
        {k:'Signature flavor',v:'Clean, bright acidity, transparent origin character'},
        {k:'Key origins',v:'Kenya, Ethiopia Yirgacheffe, Guatemala, Colombia'}
    ],
    origin_en: [
        {year:'17th century',text:'Dutch East India Company developed systematic washed processing in Java — originally to remove mucilage for easier storage and transport.'},
        {year:'19th century',text:'Central America (Costa Rica, Guatemala) adopted washed processing as the commercial standard.'},
        {year:'1970s',text:"Kenya developed 'double-washed' (two fermentations, two washes) — pushing the method to its limit for maximum brightness."},
        {year:'2000s Third Wave',text:'Specialty coffee embraced washed processing as the best way to reveal terroir. High-quality farms worldwide adopted or refined it.'},
        {year:'Today',text:'Standard method for Cup of Excellence and WBrC competitions — but water consumption is driving some origins toward honey processing.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'✨',title:'Cleanliness ceiling',desc:'Washed = no fermentation off-notes, no fruit pulp residue. The purest expression of the bean itself — origin character and variety shine through.'},
        {icon:'🍋',title:'Bright acidity',desc:"Washed coffee's signature: clear, articulate acidity. Lemon, grapefruit, red currant, bergamot — depending on variety and origin."},
        {icon:'☕',title:'Brew: amplify acidity',desc:'Washed beans respond beautifully to Hoffmann or 4:6 method at 93–95°C — enhancing the brightness and layered acidity.'},
        {icon:'💧',title:'High water cost',desc:'40–60 liters per kg is unsustainable in drought-affected origins — a key driver of honey processing adoption in Central America.'},
        {icon:'🇰🇪',title:'Kenya double-washed',desc:"Kenya AA's signature blackcurrant acidity comes from two fermentations + two washes — the pinnacle of washed processing intensity."}
    ]
});

injectEn('ENCY_PROC_NATURAL', {
    name_en: 'Natural (Dry Process)',
    tagline_en: 'Sun-dried whole fruit — berry, wine, fermented complexity',
    subtitle_en: "After harvest, whole coffee cherries are laid on drying beds in the sun for 14–21 days without removing the fruit. The bean absorbs sugars and fermentation compounds from the drying pulp, producing intense berry, wine, and tropical fruit flavors. The oldest and most water-efficient processing method.",
    specs_en: [
        {k:'Steps',v:'Harvest → float-sort → lay whole cherry on beds → sun-dry 14–21 days → hull'},
        {k:'Drying time',v:'14–21 days (longer in humidity)'},
        {k:'Water use',v:'Very low — no washing required'},
        {k:'Signature flavor',v:'Blueberry, strawberry, tropical fruit, winey fermentation'},
        {k:'Key origins',v:'Ethiopia (Sidama, Guji), Brazil, Yemen'},
        {k:'Risk',v:'Inconsistent drying = fermentation defects, moldy off-notes'}
    ],
    origin_en: [
        {year:'Ancient',text:'Natural/dry processing is the original method — the way Yemeni and Ethiopian farmers processed coffee for centuries before water washing was developed.'},
        {year:'1800s Brazil',text:"Brazil adopted natural processing as its standard — the country's dry climate and vast flat farms made it ideal for large-scale sun drying."},
        {year:'1970s–90s',text:'As specialty coffee grew, natural processing was seen as less precise than washed — lower scores at competitions due to fermentation variability.'},
        {year:'2000s',text:"Third Wave reassessed naturals — Ethiopia Sidama and Guji naturals scoring 90+ changed perceptions. 'Natural fruity' became a desirable category."},
        {year:'Today',text:'Premium naturals from Ethiopia and Brazil command high prices. Quality control has improved dramatically with raised drying beds and selective harvesting.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🫐',title:'Berry explosion',desc:"Natural Ethiopia Sidama or Guji: blueberry, strawberry, raspberry. At its best, it tastes like coffee-flavored berry juice. There's nothing like it."},
        {icon:'🍷',title:'Winey complexity',desc:"The fermentation during drying creates wine-like esters. Some naturals taste like red wine with coffee — polarizing but extraordinary."},
        {icon:'☕',title:'Brew: lower temperature',desc:'Natural beans are sensitive to over-extraction — the fruit compounds amplify bitterness. Try 89–91°C and slightly coarser grind.'},
        {icon:'⚠️',title:'Fermentation risk',desc:'Poor drying control produces sour, moldy, or barnyard off-notes. Quality naturals require raised beds, constant turning, and selective harvesting.'},
        {icon:'🌍',title:'Water-efficient future',desc:"Natural processing uses 95%+ less water than washed. As water scarcity grows, naturals may become the sustainability-driven default."}
    ]
});

injectEn('ENCY_PROC_HONEY', {
    name_en: 'Honey Process',
    tagline_en: 'Partial mucilage left on — Yellow/Red/Black classification',
    subtitle_en: "Honey processing removes the cherry skin but leaves varying amounts of mucilage (the sweet sticky layer) on the bean during drying. The amount left determines the category: Yellow Honey (20% mucilage), Red Honey (50%), Black Honey (90%+). The result bridges washed and natural — clean structure with added sweetness and body.",
    specs_en: [
        {k:'Yellow Honey',v:'~20% mucilage retained, 8–10 days drying, cleanest'},
        {k:'Red Honey',v:'~50% mucilage retained, 12–14 days drying, sweeter'},
        {k:'Black Honey',v:'90%+ mucilage retained, 14–21 days, closest to natural'},
        {k:'Water use',v:'Low (30–50% less than washed)'},
        {k:'Signature flavor',v:'Sweet, smooth body, tropical fruit, caramel'},
        {k:'Key origins',v:'Costa Rica (pioneered), El Salvador, Guatemala'}
    ],
    origin_en: [
        {year:'2000s Costa Rica',text:"Costa Rican farms pioneered honey processing as a water-saving alternative to washed — creating a new flavor category."},
        {year:'2005–10',text:'Yellow, Red, and Black Honey classifications developed to standardize the spectrum from light to heavy mucilage retention.'},
        {year:'2010s',text:'Honey processing spread across Central America and beyond — specialty buyers embraced the sweetness and complexity it adds.'},
        {year:'Today',text:'Honey process is now a standard offering at quality farms. Black Honey from Costa Rica or El Salvador can rival natural Ethiopia for sweetness.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍯',title:'Sweetness amplified',desc:"Honey-processed coffee is consistently sweeter than washed equivalents — the retained mucilage deposits sugars directly on the bean during drying."},
        {icon:'🌈',title:'The spectrum',desc:'Yellow Honey: clean + slight sweetness. Red Honey: smooth, tropical fruit. Black Honey: almost as fruity as natural. Choose based on how much fruit you want.'},
        {icon:'☕',title:'Brew: medium temperature',desc:'Honey beans sit between washed and natural. 91–93°C works for most honeys. Black Honey may need 89–91°C to avoid amplifying fermentation.'},
        {icon:'💧',title:'Water sustainability',desc:'Honey processing uses 30–50% less water than washed — a key reason it is growing in adoption as water scarcity increases.'},
        {icon:'🇨🇷',title:'Costa Rica leads',desc:"Costa Rica's specialty farms refined honey processing to an art — their Black Honey lots regularly win CoE competition. Start there to understand the method."}
    ]
});

injectEn('ENCY_PROC_ANAEROBIC', {
    name_en: 'Anaerobic Fermentation',
    tagline_en: 'Sealed-tank fermentation — blueberry, wine, Fourth Wave icon',
    subtitle_en: 'Coffee cherries (or depulped beans) are sealed in airtight tanks to ferment without oxygen. CO₂ from the fermenting cherry fills the tank, creating unique flavor compounds not possible in open-air fermentation. The result: intense blueberry, wine, rum, and spice notes that define experimental Fourth Wave processing.',
    specs_en: [
        {k:'Steps',v:'Harvest → sealed tank (whole or depulped) → 24–200 hours anaerobic → dry'},
        {k:'Fermentation time',v:'24–200 hours (controlled by CO₂ pressure and temperature)'},
        {k:'Temperature',v:'16–22°C (cooler = slower, more complex fermentation)'},
        {k:'Signature flavor',v:'Blueberry, rum, cinnamon, dark cherry, wine'},
        {k:'Price',v:'2–5× washed price for premium lots'},
        {k:'Key origins',v:'Colombia, Ethiopia, Panama, Bolivia'}
    ],
    origin_en: [
        {year:'2010s',text:'Inspired by carbonic maceration in wine, Central American and Colombian farms experiment with sealed tank coffee fermentation.'},
        {year:'2015',text:"Colombian farm La Palma y El Tucan systematizes anaerobic fermentation — creating 'designer flavor' lots that score 90+."},
        {year:'2017',text:'World Barista Championship routines increasingly feature anaerobic lots — the unusual flavor complexity impresses judges.'},
        {year:'2018–today',text:'Anaerobic fermentation goes mainstream in specialty coffee. Dozens of origin countries now produce anaerobic lots at scale.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍷',title:'Wine-like complexity',desc:"Anaerobic fermentation produces ethyl acetate and other esters that create wine, rum, and tropical fruit compounds. The most dramatic flavor transformation in coffee processing."},
        {icon:'🌡️',title:'Temperature matters',desc:'Lower tank temperature (16–18°C) = slower fermentation = more complex flavor. Higher temp = faster = more alcohol and funky notes. Producers control this precisely.'},
        {icon:'☕',title:'Brew: lighter and coarser',desc:'Anaerobic beans are very sensitive to heat — light roast (City), 89–91°C, slightly coarser grind prevents over-extracting the intense fermentation compounds.'},
        {icon:'⚠️',title:'Love it or hate it',desc:"Anaerobic flavor is polarizing — many specialty drinkers find it 'too winey' or 'not coffee-like.' It's an acquired taste. Try it alongside a washed version of the same origin."},
        {icon:'💎',title:'Competition standard',desc:'WBC and WBrC competitors frequently use anaerobic lots for their uniqueness. High scores + unusual flavor = perfect competition coffee.'}
    ]
});

injectEn('ENCY_PROC_CARBONIC', {
    name_en: 'Carbonic Maceration',
    tagline_en: 'Wine-inspired whole-cherry CO₂ sealed fermentation',
    subtitle_en: 'Borrowed directly from Beaujolais wine making, carbonic maceration seals whole coffee cherries in a tank filled with CO₂ gas. Fermentation occurs inside the cherry cells (intracellular fermentation) without oxygen — creating unique fruity-winey complexity different from standard anaerobic. One of the most technically advanced coffee processing methods.',
    specs_en: [
        {k:'Steps',v:'Harvest → CO₂ flush sealed tank (whole cherry) → 72–120 hours → hull → dry'},
        {k:'Key difference',v:'CO₂ is actively added (vs anaerobic which relies on CO₂ from fermentation)'},
        {k:'Fermentation type',v:'Intracellular — inside the cherry cells without oxygen'},
        {k:'Signature flavor',v:'Bright red fruit, maraschino cherry, wine, floral'},
        {k:'Wine analog',v:'Similar to Beaujolais Nouveau — fresh, vibrant, fruit-forward'},
        {k:'Key origins',v:'Colombia, Panama, Kenya (experimental)'}
    ],
    origin_en: [
        {year:'1934',text:"Carbonic maceration technique developed in Beaujolais, France by Michel Flanzy — the basis for Beaujolais Nouveau wine's fresh style."},
        {year:'2015',text:'Coffee producers begin adapting wine carbonic maceration — Sasa Sestic (2015 WBC champion) popularizes the method in specialty coffee.'},
        {year:'2016–18',text:'Colombian and Panamanian farms refine carbonic maceration — creating highly consistent, competition-winning lots.'},
        {year:'Today',text:'Carbonic maceration coffees command 3–8× premium over washed. Limited production keeps supply tight and prices high.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍷',title:'Wine without the alcohol',desc:'Carbonic maceration coffee tastes like drinking a fermented cherry wine — but without alcohol. The intracellular fermentation creates identical aromatic compounds to Beaujolais wine.'},
        {icon:'🌸',title:'Bright and floral',desc:'Unlike standard anaerobic (dark and winey), carbonic maceration often produces brighter, more floral, almost Geisha-like floral notes alongside the red fruit.'},
        {icon:'☕',title:'Brew: ultra-light approach',desc:'89–91°C, light roast only, coarser grind. Carbonic maceration beans extract the fermentation compounds faster than standard processing — handle gently.'},
        {icon:'🔬',title:'CO₂ matters',desc:"The key distinction: standard anaerobic uses fermentation CO₂. Carbonic maceration adds external CO₂ before fermentation starts — this changes the fermentation pathway entirely."},
        {icon:'💰',title:'Premium pricing',desc:'Carbonic maceration requires significant equipment (CO₂ tanks, sealed fermentation vessels, monitoring equipment) — hence the 3–8× price premium over washed.'}
    ]
});

injectEn('ENCY_PROC_WET_HULLED', {
    name_en: 'Wet-Hulled (Giling Basah)',
    tagline_en: 'Indonesia exclusive — earthy, full body, grass and tobacco notes',
    subtitle_en: "Giling Basah (wet-hulled) is a processing method unique to Indonesia, particularly Sumatra. The parchment is removed while the bean still has high moisture content (35–45%), then the moist green bean is dried rapidly. This shortcut creates the distinctive earthy, full-bodied, low-acidity profile of Sumatran Mandheling coffee.",
    specs_en: [
        {k:'Steps',v:'Harvest → brief ferment → depulp → partial dry to 35-45% moisture → hull wet → finish drying'},
        {k:'Unique step',v:'Parchment removed while bean is still very wet (35–45% moisture)'},
        {k:'Drying time',v:'3–5 days (shortened vs standard 7–15 days)'},
        {k:'Signature flavor',v:'Earthy, cedar, tobacco, full body, low acidity'},
        {k:'Key origins',v:'Sumatra (Mandheling, Lintong, Aceh Gayo), Sulawesi'},
        {k:'Defect risk',v:'High — moist hull removal causes bean surface damage'}
    ],
    origin_en: [
        {year:'17th century',text:"Dutch colonial era — wet-hulled processing developed in Sumatra as a practical shortcut to speed up processing for export."},
        {year:'Colonial era',text:"Giling Basah became standard across Sumatra's small-holder farms — quick processing needed income faster than traditional slow-drying."},
        {year:'1970s',text:"Specialty importers discover Sumatran Mandheling — the earthy, full-bodied profile unlike anything else becomes a commercial asset."},
        {year:'Today',text:"Sumatra's Giling Basah is the world's most recognizable 'earthy' coffee. It has dedicated fans who specifically seek the unique profile."}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🌿',title:'Earthy and full-bodied',desc:"Wet-hulled Sumatra: cedar, tobacco, dark chocolate, earth, mushroom. Nothing else tastes like this — it's either your favorite or a defect (depending on your palate)."},
        {icon:'🏋️',title:'Low acidity, thick body',desc:"Wet-hulled coffee has dramatically lower acidity than washed — the wet hull removal destroys the acid precursors. The result is a thick, chewy, low-acid cup."},
        {icon:'☕',title:'Ideal for dark roast and espresso',desc:'The thick body and earthy complexity of wet-hulled beans shines in espresso blends. Medium-dark to dark roast works better than light roast for this profile.'},
        {icon:'🥛',title:'Great with milk',desc:'The full body and low acidity of wet-hulled Sumatra integrates beautifully with milk — excellent for lattes and cappuccinos.'},
        {icon:'🇮🇩',title:'Classic Sumatra origins',desc:"Sumatra Lintong (most famous), Mandheling, and Aceh Gayo are the flagship wet-hulled coffees. These three names are your guides to authentic Indonesian Giling Basah."}
    ]
});

injectEn('ENCY_PROC_DOUBLE_ANAEROBIC', {
    name_en: 'Double Anaerobic',
    tagline_en: 'Two-stage sealed fermentation — layered fruit and wine complexity',
    subtitle_en: 'Double anaerobic adds a second fermentation stage to standard anaerobic processing: first depulped beans ferment anaerobically 48–120 hours, then the whole cherry undergoes a second sealed anaerobic fermentation 48–120 hours, then sun-dried. Two fermentation stages create dramatically more complex flavor layering than single anaerobic.',
    specs_en: [
        {k:'Steps',v:'Harvest → depulp → 1st sealed ferment 48-120h → re-pulp into cherry → 2nd sealed ferment 48-120h → dry'},
        {k:'Total fermentation',v:'96–240 hours (two stages combined)'},
        {k:'Temperature',v:'16–22°C throughout (cold = slow = complex)'},
        {k:'Signature flavor',v:'Blueberry, raspberry, tropical fruit, rum, cinnamon, layered fermentation'},
        {k:'Price',v:'5–15× washed price (highest-tier competition lots)'},
        {k:'Key origins',v:'Colombia, Ethiopia, Panama'}
    ],
    origin_en: [
        {year:'2016–18',text:'After standard anaerobic became mainstream, experimental farms began testing double-stage fermentation — seeking even greater complexity.'},
        {year:'2019',text:"Colombia's La Palma y El Tucan systematizes double anaerobic — earning extraordinary specialty scores and competition wins."},
        {year:'2020–today',text:'Double anaerobic becomes a WBC competitor weapon — the layered complexity impresses judges and commands premium auction prices.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🔮',title:'Flavor stacking',desc:'Double anaerobic = two fermentation flavor layers stacked. The result is 2× the tropical fruit, 2× the wine complexity, and a lingering finish that single anaerobic cannot match.'},
        {icon:'⚗️',title:'Most scientific processing',desc:"Controlled temperature, time, CO₂ pressure, and microbial populations — double anaerobic treats coffee like craft beer production."},
        {icon:'☕',title:'Brew: ultra-gentle',desc:'Double anaerobic beans need ultra-light roast (Cinnamon–City), 89–90°C, coarser grind — the intense fermentation compounds extract extremely fast.'},
        {icon:'💰',title:'Top-tier pricing',desc:'Maximum labor, equipment, time, and risk make double anaerobic the most expensive processing method. Expect to pay $50–200+ per bag.'},
        {icon:'⚠️',title:'Not for beginners',desc:"The extreme flavor is overwhelming for coffee newcomers — it barely tastes like 'coffee.' Best appreciated after developing palate experience with washed and natural first."}
    ]
});

injectEn('ENCY_PROC_THERMAL_SHOCK', {
    name_en: 'Thermal Shock Fermentation',
    tagline_en: 'Hot/cold temperature alternation — stress-induced flavor release',
    subtitle_en: 'Coffee cherries (or depulped beans) are briefly submerged in hot water (~60°C) then rapidly transferred to cold water (10–15°C), repeated several times. The temperature stress ruptures cell membranes, releasing internal sugars and flavor precursors that accelerate and deepen fermentation. Combined with sealed tank fermentation for extraordinary complexity.',
    specs_en: [
        {k:'Steps',v:'Harvest → alternating hot (60°C) / cold (15°C) water immersion × 3-5 cycles → sealed anaerobic tank → dry'},
        {k:'Temperature range',v:'60°C hot immersion ↔ 10–15°C cold shock'},
        {k:'Purpose',v:'Cell membrane stress releases internal sugars and flavor precursors'},
        {k:'Signature flavor',v:'Intense fruit, rum-like sweetness, tropical complexity with unique depth'},
        {k:'Classification',v:'Fourth Wave experimental — physical + microbial dual intervention'},
        {k:'Key origins',v:'Colombia, Panama (experimental farms)'}
    ],
    origin_en: [
        {year:'2018',text:"Inspired by food science techniques (thermal shock treatment for fruits and vegetables), Colombian experimental farms adapt the method to coffee processing."},
        {year:'2019–20',text:'Thermal shock combined with anaerobic fermentation produces extraordinary cup scores — generating specialty industry attention.'},
        {year:'Today',text:'Still rare — only a handful of farms worldwide have the equipment and expertise. Commands extreme auction prices when available.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🌡️',title:'Physical flavor engineering',desc:"Thermal shock physically damages cell walls to release more sugar than the bean would naturally yield during fermentation — fundamentally changing the flavor potential."},
        {icon:'🔬',title:'Science-first processing',desc:'This is food science applied to coffee — requires temperature-controlled tanks, precise timing, and deep understanding of fermentation microbiology. Not for amateur processing.'},
        {icon:'💎',title:'Extremely rare',desc:'Fewer than 20 farms worldwide reliably produce thermal shock lots. When you encounter one, the price reflects both rarity and the extraordinary effort involved.'},
        {icon:'☕',title:'Brew very gently',desc:'89°C maximum, light roast, coarser grind. The thermal-stress-released compounds are volatile and easily over-extracted into bitterness.'},
        {icon:'🆕',title:'The cutting edge',desc:'Thermal shock is where coffee processing meets food science research. Expect to see more in competition routines as Fourth Wave pushes boundaries.'}
    ]
});

injectEn('ENCY_PROC_YEAST_INOCULATED', {
    name_en: 'Yeast Inoculated Fermentation',
    tagline_en: 'Precision yeast strains — designed flavor, the future of processing',
    subtitle_en: 'Instead of relying on naturally occurring wild yeast and bacteria, specific commercial or laboratory yeast strains (often Saccharomyces cerevisiae strains from wine or beer production) are added to the fermentation tank. This gives producers precise control over the flavor compounds produced — enabling "designer coffee" with predictable, consistent, designed flavors.',
    specs_en: [
        {k:'Steps',v:'Harvest → sealed tank + specific yeast inoculation → 48–120h controlled ferment → dry'},
        {k:'Yeast sources',v:'Wine yeasts (Saccharomyces), beer yeasts, or custom lab strains'},
        {k:'Key advantage',v:'Predictable, reproducible flavor — unlike wild fermentation'},
        {k:'Signature flavor',v:'Designed by strain choice: floral (wine yeasts), tropical (experimental), chocolate (specific strains)'},
        {k:'Price',v:'Very high — R&D cost + equipment + expertise premium'},
        {k:'Key origins',v:'Colombia, Panama, Costa Rica (research collaboration farms)'}
    ],
    origin_en: [
        {year:'2010s',text:'Wine and beer industry yeast companies (like Chr. Hansen) begin collaborating with specialty coffee farms on inoculated fermentation.'},
        {year:'2016',text:"Sasa Sestic's 2015 WBC win using exotic fermentation raises interest in controlled microbial intervention in coffee processing."},
        {year:'2018–20',text:"First commercial yeast products specifically for coffee fermentation launched — enabling farms without lab access to use standardized yeast strains."},
        {year:'Today',text:'Yeast inoculated coffees appear at CoE and WBC with extraordinary consistency. The method is transitioning from experimental to niche-commercial.'}
    ],
    originTitle_en: '📜 Processing History',
    tipsTitle_en: '🍒 Flavor & Future',
    tips_en: [
        {icon:'🎯',title:'Designed flavor',desc:"Unlike wild fermentation (unpredictable), yeast inoculation lets producers specify: 'I want more floral notes, more malic acid, less acetic acid' — and achieve it."},
        {icon:'🍷',title:'Wine yeast on coffee',desc:"Many inoculated coffees use wine-specific Saccharomyces cerevisiae strains — this literally produces some of the same flavor compounds found in quality wine. The results are extraordinary."},
        {icon:'🔬',title:'Reproducibility breakthrough',desc:"The biggest advantage: a yeast-inoculated lot can be reproduced next harvest with almost identical flavor — something wild fermentation can never guarantee."},
        {icon:'⚠️',title:'Authenticity debate',desc:"Some specialty coffee traditionalists argue that adding commercial yeast is 'artificial flavor manipulation' beyond what coffee should be. The debate mirrors organic wine discussions."},
        {icon:'🔮',title:'The future',desc:"As yeast strain libraries grow and costs fall, yeast inoculation may become standard at quality farms — enabling personalized 'flavor-on-order' coffee production."}
    ]
});

// ── ROAST ─────────────────────────────────────────────────────────────────────

injectEn('ENCY_RST_CINNAMON', {
    tagline_en: 'Ultra-light roast — pre-first crack, floral and fruit dominated',
    subtitle_en: 'Cinnamon Roast stops just before the First Crack begins. The lightest roast level: the bean is light brown like cinnamon, bone dry with no oil, maximum floral and fruit acidity preserved. Best for showcasing Ethiopia Geisha and other bright varieties. Risk of grassy/raw underdevelopment if not executed carefully.',
    specs_en: [
        {k:'English name',v:'Cinnamon Roast / Light Roast'},
        {k:'Stop point',v:'Just before First Crack begins'},
        {k:'BT temperature',v:'196–204°C'},
        {k:'Development ratio',v:'8–12% (very short)'},
        {k:'Bean color',v:'Light brown (cinnamon color)'},
        {k:'Best varieties',v:'Ethiopia, Geisha, SL28'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 95–105 (lightest). Bean surface completely dry, zero oil.'},
        {year:'Chemical state',text:'Maillard reaction just starting, caramelization not yet begun. Original bean sugars and acids preserved at maximum.'},
        {year:'Nordic trend',text:'2010s Nordic roasters championed ultra-light roast — emphasizing raw origin character — creating a polar opposite to Italian dark roast culture.'}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🌸',title:'Floral explosion',desc:'Jasmine, white peach, lemon, bergamot, grapefruit — cinnamon roast preserves every aromatic compound the bean possesses.'},
        {icon:'🌿',title:'Underdevelopment risk',desc:"Roast too light and the bean core is underdeveloped — grassy, raw, earthy off-notes appear. Light roast doesn't automatically mean good."},
        {icon:'☕',title:'Brew: fine grind + low temp',desc:'Lance Hedrick style (very fine grind + 88°C + strong agitation) best penetrates the dense, hard cinnamon roast bean.'},
        {icon:'🚫',title:'Not suitable for espresso',desc:"Cinnamon roast as espresso is extremely sour and astringent. Ultra-light roast is almost exclusively a filter/pour-over method."},
        {icon:'⏰',title:'Rest 14–21 days',desc:"Ultra-light beans off-gas CO₂ slowly. Brewed too fresh they taste hollow and harsh. Rest 14–21 days minimum after roast date."}
    ]
});

injectEn('ENCY_RST_NEW_ENGLAND', {
    tagline_en: 'Light-leaning roast — first crack onset, floral meets sweetness',
    subtitle_en: "New England Roast stops at the beginning to middle of First Crack — between Cinnamon and City Roast. Floral and fruit aromas haven't fully faded, but sweetness begins to emerge and the grassy raw risk of Cinnamon is reduced. The sweet spot for Nordic-style light roasting and the most experimental flavor discovery zone.",
    specs_en: [
        {k:'English name',v:'New England Roast (between Cinnamon and City)'},
        {k:'Stop point',v:'First Crack beginning to middle'},
        {k:'BT temperature',v:'204–207°C'},
        {k:'Development ratio',v:'11–14%'},
        {k:'Bean color',v:'Light brown, dry surface, no oil'},
        {k:'Popularity',v:'Nordic specialty coffee, experimental Japanese roasters'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 80–95. Lighter than City but developed enough to avoid raw grassy notes.'},
        {year:'Chemical state',text:'Maillard reaction active, early caramelization begins. Sweet compounds forming while fruit acids still dominant.'},
        {year:'Nordic influence',text:"Scandinavian roasters (Tim Wendelboe, The Coffee Collective) popularized this 'transition zone' roast — where maximum origin character meets emerging sweetness."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🍏',title:'Floral fading into sweetness',desc:"New England is the transition zone: the jasmine-bergamot of cinnamon roast begins to merge with caramel-apple sweetness. Often the most complex and surprising roast level."},
        {icon:'✅',title:'Lower underdevelopment risk',desc:"Unlike Cinnamon Roast, New England has crossed into First Crack — the bean core is properly developed. Reduced risk of grassy/raw off-notes."},
        {icon:'☕',title:'Pour-over specialist',desc:'V60 or Origami + Hoffmann method + 91–93°C = ideal for New England. The higher temperature helps extract from the dense light beans.'},
        {icon:'🇸🇪',title:'Nordic standard',desc:"Scandinavian specialty roasters typically target New England to City range as their 'house roast' — maximum origin transparency with proper development."},
        {icon:'🔬',title:'Most discovery-rich zone',desc:"New England is where unexpected flavors emerge — a bean that shows lemon at Cinnamon might reveal peach at New England. The most interesting roast to explore."}
    ]
});

injectEn('ENCY_RST_CITY', {
    tagline_en: 'Light roast — mid-to-late first crack, Third Wave standard',
    subtitle_en: "City Roast (stopping mid-to-end of First Crack) is the Third Wave specialty coffee default — light enough to preserve origin character and bright acidity, developed enough to eliminate raw defects. The universal benchmark: if someone says 'specialty light roast,' they usually mean City Roast range.",
    specs_en: [
        {k:'English name',v:'City Roast / Light Roast'},
        {k:'Stop point',v:'First Crack middle to end'},
        {k:'BT temperature',v:'207–211°C'},
        {k:'Development ratio',v:'14–18%'},
        {k:'Bean color',v:'Medium light brown (Agtron 65–80)'},
        {k:'Primary use',v:'Specialty pour-over, third wave café standard'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 65–80. Properly developed light roast — no raw notes, full acidity preserved.'},
        {year:'Chemical state',text:'Maillard reaction complete, mild caramelization. Chlorogenic acids partially degraded — brightness present without astringency.'},
        {year:'Third Wave standard',text:'Blue Bottle, Intelligentsia, Stumptown established City Roast as the specialty default in the 2000s — a direct reaction to Second Wave dark roasting.'}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🍋',title:'Bright acidity benchmark',desc:"City Roast preserves the full acid structure: citrus, berry, tea-like brightness. This is what coffee tastes like when you let the bean speak."},
        {icon:'🌍',title:'Origin transparency maximum',desc:"At City Roast, you can taste exactly where the coffee came from — Ethiopia tastes Ethiopian, Kenya tastes Kenyan. Dark roasting masks this completely."},
        {icon:'☕',title:'Versatile brewing',desc:'City Roast works with virtually any brew method: V60, Chemex, AeroPress, French Press. Adjust temperature between 91–94°C to your preference.'},
        {icon:'🏆',title:'Competition standard',desc:"World Barista Championship and Brewers Cup both use City to City+ roast level as the standard. Competition coffees are almost never darker than this."},
        {icon:'🔄',title:'Second Wave inverse',desc:"City Roast is culturally defined by what it is NOT: it is not Starbucks dark roast. The Third Wave explicitly chose City to distinguish specialty from commodity."}
    ]
});

injectEn('ENCY_RST_CITY_PLUS', {
    tagline_en: 'Light-medium roast — between cracks, the golden zone',
    subtitle_en: "City+ stops between First and Second Crack — after First Crack ends but before Second Crack begins. This is widely considered the 'golden zone': the bean has full development, emerging sweetness, good complexity, and still bright acidity. Many specialty roasters consider City+ their ideal all-purpose roast.",
    specs_en: [
        {k:'English name',v:'City Plus (City+)'},
        {k:'Stop point',v:'After First Crack ends, before Second Crack begins'},
        {k:'BT temperature',v:'211–213°C'},
        {k:'Development ratio',v:'18–22%'},
        {k:'Bean color',v:'Medium brown (Agtron 55–65)'},
        {k:'Characteristic',v:'Balance of acidity, sweetness, and body'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 55–65. Fuller development — sugars significantly converted, acid-to-sweet balance achieved.'},
        {year:'Chemical state',text:'Strong Maillard reaction, active caramelization. Chlorogenic acids substantially reduced — sweetness beginning to emerge as dominant note.'},
        {year:'Universal sweet spot',text:"City+ is the compromise roast — light enough for origin clarity, developed enough for sweetness. Many coffee educators use City+ as the 'learn everything here' roast."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'⚖️',title:'Balance champion',desc:"City+ sits at the perfect balance point: acidity not harsh, sweetness emerging, body present. This is why it's the most recommended 'starting' roast for coffee exploration."},
        {icon:'🍑',title:'Sweetness arrives',desc:'At City+, stone fruit (peach, apricot, plum), caramel, and milk chocolate notes emerge alongside the citrus acidity of lighter roasts.'},
        {icon:'☕',title:'Works for anything',desc:"City+ is the most versatile roast level — pour-over, AeroPress, French press, even light espresso. It's the 'jeans and a t-shirt' of coffee roasting."},
        {icon:'🔥',title:'Body development',desc:"City+ develops enough body to support milk-based drinks without losing the acidity that makes specialty coffee interesting."},
        {icon:'🌡️',title:'91–93°C sweet spot',desc:'City+ extracts beautifully at 91–93°C — high enough to open up the sweetness, low enough to preserve the fruit.'}
    ]
});

injectEn('ENCY_RST_FULL_CITY', {
    tagline_en: 'Medium roast — just before second crack, the balance representative',
    subtitle_en: "Full City Roast stops just before Second Crack begins. Sweetness and body are at their peak; acidity has softened; some caramel and chocolate notes develop. Often described as the 'last point of origin character before roast character takes over.' The classic balance roast.",
    specs_en: [
        {k:'English name',v:'Full City'},
        {k:'Stop point',v:'Just before Second Crack begins'},
        {k:'BT temperature',v:'213–218°C'},
        {k:'Development ratio',v:'20–24%'},
        {k:'Bean color',v:'Medium to medium-dark brown (Agtron 45–55)'},
        {k:'Key trait',v:'Peak sweetness + body, last gasp of origin character'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 45–55. Significant caramelization. Some oil beginning to surface in longer development roasts.'},
        {year:'Chemical state',text:'Caramelization dominant, Maillard completing. Most chlorogenic acids converted — bitterness beginning to form from other compounds.'},
        {year:'Historical role',text:"Full City was the specialty coffee standard before Third Wave pushed lighter — Peet's Coffee and early Starbucks considered this their target profile."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🍫',title:'Chocolate and caramel peak',desc:"Full City is where dark chocolate, milk chocolate, and caramel flavors peak. This is the roast that most people mean when they say 'coffee flavored.'"},
        {icon:'⚖️',title:'Origin boundary',desc:"Full City is often called the 'edge of origin character' — you can still taste where the coffee is from, but roast character is becoming the dominant theme."},
        {icon:'☕',title:'Great for espresso',desc:'Full City is the lightest roast that makes genuinely great espresso — enough sweetness and body to balance the extraction pressure without excessive acidity.'},
        {icon:'🥛',title:'Milk drinks shine',desc:"Full City's chocolate and caramel flavors integrate perfectly with milk — this is the natural territory for lattes and flat whites."},
        {icon:'🌡️',title:'89–92°C for balance',desc:'Lower than City Roast temperature needed — Full City extracts sweetness easily. Push too hot and it becomes bitter.'}
    ]
});

injectEn('ENCY_RST_FULL_CITY_PLUS', {
    tagline_en: 'Medium-dark roast — second crack onset, first oil appears',
    subtitle_en: "Full City+ enters Second Crack territory. The first oil droplets appear on the bean surface; sweetness remains but bittersweet chocolate and roast character increasingly dominate. The last roast where specialty coffee drinkers can taste meaningful origin character. Excellent for espresso and milk drinks.",
    specs_en: [
        {k:'English name',v:'Full City Plus (FC+)'},
        {k:'Stop point',v:'Second Crack beginning'},
        {k:'BT temperature',v:'218–221°C'},
        {k:'Development ratio',v:'22–26%'},
        {k:'Bean surface',v:'First oil visible — shiny patches appearing'},
        {k:'Flavor character',v:'Bittersweet chocolate, dark fruit, roast-forward'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 35–45. Oil beginning to surface. Significant roast-character development.'},
        {year:'Chemical state',text:'Second Crack = CO₂ cell structure breaking down. Major caramelization complete, carbonization beginning.'},
        {year:'Classic espresso zone',text:"Full City+ was the traditional American espresso roast — bold enough for espresso extraction, not so dark it loses all sweetness."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🌰',title:'Bittersweet chocolate',desc:"Full City+ peaks in bittersweet dark chocolate — 70%+ cacao territory. Rich, intense, and approachable for most palates."},
        {icon:'💧',title:'Oil means body',desc:"The first surface oil at Full City+ signals increased body and mouthfeel in the cup — one reason this roast is popular for espresso."},
        {icon:'🚨',title:'Origin character limit',desc:"Beyond Full City+, origin character rapidly disappears. If you want to taste where your coffee came from, don't go darker than this."},
        {icon:'☕',title:'Espresso classic',desc:"Full City+ is the lightest end of traditional American espresso roasting — enough development for espresso sweetness, still some origin brightness."},
        {icon:'🌡️',title:'88–91°C recommended',desc:'Lower temperature protects sweetness and prevents the roast character from turning harsh. High-temp Full City+ espresso can be overwhelmingly bitter.'}
    ]
});

injectEn('ENCY_RST_VIENNA', {
    tagline_en: 'Dark roast — second crack middle, caramel smoke develops',
    subtitle_en: "Vienna Roast stops in the middle of Second Crack. The bean surface is significantly oily; caramel, smoke, and bittersweet notes dominate; most origin character has been replaced by roast character. Classic Italian-American café roast. Named after Vienna's traditional café culture of the 18th century.",
    specs_en: [
        {k:'English name',v:'Vienna Roast / Light Espresso Roast'},
        {k:'Stop point',v:'Second Crack middle'},
        {k:'BT temperature',v:'221–226°C'},
        {k:'Development ratio',v:'24–28%'},
        {k:'Bean surface',v:'Oily and shiny throughout'},
        {k:'Flavor character',v:'Caramel smoke, dark chocolate, minimal origin character'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 25–35. Heavy oil, significant carbonization beginning.'},
        {year:'Chemical state',text:"Second Crack active — CO₂ pushing out from cell walls. Bean structure degrading. Aromatic compounds from caramelization and pyrolysis dominate."},
        {year:'Vienna tradition',text:"Named after Vienna's famous coffeehouse culture — the Viennese preferred a medium-dark roast for their Melange (espresso + milk) rather than the extreme Italian dark."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🔥',title:'Smoke and caramel',desc:"Vienna's caramel-smoke profile is distinct from French Roast bitterness — there's still sweetness here, but it's roast caramelization, not the bean's own sweetness."},
        {icon:'☕',title:'Classic espresso territory',desc:'Vienna Roast is the historical standard for Italian-American espresso — bold, dark, smoky, with enough residual sweetness for milk drinks.'},
        {icon:'🌍',title:'Origin: gone',desc:'At Vienna Roast, origin character is essentially undetectable. Ethiopia, Kenya, and Brazil all taste similar — dark, smoky, roasty.'},
        {icon:'🥛',title:'Best with lots of milk',desc:"Vienna Roast's boldness and smoke pair well with significant milk volume — café au lait, Americano with milk, or Italian cappuccino."},
        {icon:'⚠️',title:'Specialty coffee avoids this',desc:"Third Wave specialty roasters rarely go to Vienna Roast — the belief that it 'destroys' what makes premium coffee worth buying is deeply held."}
    ]
});

injectEn('ENCY_RST_NORTH_ITALIAN', {
    tagline_en: 'Dark-leaning roast — second crack late stage, intense smoke',
    subtitle_en: "North Italian Roast sits between Vienna and French — late Second Crack, before the extreme of French Roast. Bean surface is heavily oily; intense smoke and dark caramel dominate. This is the roast profile of traditional northern Italian espresso houses (less extreme than southern Italian/Neapolitan roasting).",
    specs_en: [
        {k:'English name',v:'North Italian Roast'},
        {k:'Stop point',v:'Second Crack late stage (before crack ends)'},
        {k:'BT temperature',v:'226–232°C'},
        {k:'Development ratio',v:'27–30%'},
        {k:'Bean surface',v:'Heavily oily, dark brown–black'},
        {k:'Flavor character',v:'Intense smoke, dark chocolate, espresso-dominant'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron 20–30. Near-maximum carbonization, heavy oil.'},
        {year:'Chemical state',text:"Late Second Crack — beans near carbonization threshold. Most non-carbon flavor compounds have volatilized. Smoke and bitter are primary."},
        {year:'Regional distinction',text:"Northern Italy (Milan, Turin) traditionally roasted lighter than the south (Naples). 'North Italian' represents the lighter end of traditional Italian dark roasting."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor & Brew Tips',
    tips_en: [
        {icon:'🏔️',title:'Northern Italian tradition',desc:"Milan and Turin cafés historically used North Italian roast — bold and dark but not the extreme char of Neapolitan espresso. A regional style distinction within Italy."},
        {icon:'💪',title:'Maximum espresso extraction',desc:'North Italian Roast creates maximum crema and bold extraction — traditional Italian bar espresso is built on this roast level.'},
        {icon:'🌑',title:'Approaching charred',desc:'At North Italian, you are one step from French Roast carbonization. The flavor is intense smoke and dark chocolate with no origin character remaining.'},
        {icon:'☕',title:'Espresso blending',desc:'Used in traditional Italian espresso blends alongside lighter roasted Arabica or Robusta — the dark-roasted beans contribute body and boldness.'},
        {icon:'🚫',title:'Specialty avoidance',desc:"North Italian Roast is essentially unused in Third and Fourth Wave specialty coffee. The roast destroys everything that makes premium coffee worth buying."}
    ]
});

injectEn('ENCY_RST_FRENCH', {
    tagline_en: 'Very dark roast — dense second crack, bitterness dominant',
    subtitle_en: "French Roast stops when Second Crack is dense and almost continuous. Heavily oily surface, near-black beans, dominant bitterness and smoke with virtually zero origin character. Named for the traditional French café-au-lait style — consume with large amounts of hot milk. Specialty coffee's most controversial roast level.",
    specs_en: [
        {k:'English name',v:'French Roast / Very Dark'},
        {k:'Stop point',v:'Dense to nearly continuous Second Crack'},
        {k:'BT temperature',v:'233–238°C'},
        {k:'Development ratio',v:'26–30%'},
        {k:'Bean color',v:'Very dark brown–black (Agtron 25–35)'},
        {k:'Main use',v:'Café au lait, instant coffee base, mass market blends'}
    ],
    origin_en: [
        {year:'Name origin',text:"French Roast derives from 19th-century French café style — consuming very dark-roasted coffee with large amounts of hot milk and sugar."},
        {year:'Chemical state',text:'Heavy carbonization. Most sugars destroyed. Bitterness dominant from carbon compounds. Caffeine slightly reduced (10–15% less than light roast).'},
        {year:'American diner culture',text:"20th-century American diners used French Roast — dark roasting masked low-quality commodity beans. The flavor was reliable regardless of bean quality."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor Notes',
    tips_en: [
        {icon:'🌑',title:'Bitterness dominant',desc:"French Roast signature: intense bitterness, char smoke, and tobacco. Original bean character 100% eliminated — all varieties taste nearly identical."},
        {icon:'☕',title:'Best with milk',desc:"French Roast is very harsh black. With large amounts of hot milk (café au lait style) or as a latte base, it works. Drink it straight only if you enjoy pure bitterness."},
        {icon:'🚫',title:'Specialty avoidance',desc:"Third Wave specialty coffee almost never goes to French Roast — it is considered the antithesis of showcasing bean quality."},
        {icon:'⚠️',title:'Lower caffeine',desc:"French Roast has 10–15% less caffeine than light roast — heat destroys caffeine. If you want a stimulant boost, lighter roast is paradoxically more effective."},
        {icon:'🔄',title:'Masking low quality',desc:"The dark roast tradition persisted partly because it masks defects in cheap commodity beans. First and Second Wave roasters used darkness as a quality substitute."}
    ]
});

injectEn('ENCY_RST_ITALIAN', {
    tagline_en: 'Charcoal roast — end of second crack, burnt edge territory',
    subtitle_en: "Italian Roast goes to the very end or beyond Second Crack — the darkest commercial roast before carbonization destroys the bean entirely. Bean surface is black and heavily oily; flavor is pure carbon, char, and smoke with intense bitterness. Traditional Neapolitan espresso style. Almost never used in Third Wave specialty.",
    specs_en: [
        {k:'English name',v:'Italian Roast / Espresso Roast'},
        {k:'Stop point',v:'Second Crack end — approaching carbonization'},
        {k:'BT temperature',v:'238°C+'},
        {k:'Development ratio',v:'30%+'},
        {k:'Bean surface',v:'Black, very oily, nearly charred'},
        {k:'Main use',v:'Neapolitan espresso, Moka pot, very strong blends'}
    ],
    origin_en: [
        {year:'Agtron value',text:'Agtron below 25 — maximum darkness before complete carbonization.'},
        {year:'Chemical state',text:'Nearly complete carbonization. Bean structure degrading. Predominantly carbon and ash-based flavor compounds.'},
        {year:'Naples tradition',text:"Neapolitan espresso culture traditionally used Italian Roast — the extreme darkness paired with small cup size and high pressure extracts maximum intensity."}
    ],
    originTitle_en: '🔬 Roast Chemistry',
    tipsTitle_en: '☕ Flavor Notes',
    tips_en: [
        {icon:'⚫',title:'Carbon and char',desc:"Italian Roast at its extreme: pure carbon bitterness, ash, and char. Almost no coffee-specific flavor remains — it is the taste of burned organic matter."},
        {icon:'🇮🇹',title:'Neapolitan tradition',desc:"Naples' espresso culture is built around Italian Roast — small, intense, 15mL shots extracted at 9 bar. An acquired cultural taste, not a quality statement."},
        {icon:'⚡',title:'Highest crema (then collapses)',desc:"Italian Roast initially produces extreme crema from CO₂ release — but the crema collapses quickly because the oils are too heavy to sustain bubble structure."},
        {icon:'🔥',title:'Moka pot specialist',desc:"Italian Roast in a Moka pot on a Neapolitan stovetop is a cultural institution. The pressure + ultra-dark roast + small volume creates an intensely concentrated experience."},
        {icon:'🌍',title:'Specialist territory',desc:"Italian Roast is not for exploring coffee flavor — it's for a specific cultural espresso experience. Specialty coffee begins where Italian Roast ends."}
    ]
});

if (hasCRLF) h = h.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, h, 'utf8');
console.log('\n✅ patch_ency_2.js done (Process + Roast)');
