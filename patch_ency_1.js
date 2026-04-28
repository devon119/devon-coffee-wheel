// patch_ency_1.js — Part A: render patches + History + Variety EN content
const fs = require('fs');
const FILE = 'index.html';
let raw = fs.readFileSync(FILE, 'utf8');
const hasCRLF = raw.includes('\r\n');
let h = hasCRLF ? raw.replace(/\r\n/g, '\n') : raw;

// ── PART A: Fix render functions ──────────────────────────────────────────────

let ok = true;
function must(label, fn) {
    const before = h;
    fn();
    if (h === before) { console.error('FAIL (no change): ' + label); ok = false; }
    else console.log('OK: ' + label);
}

must('list name', () => h = h.replace(
    '<div class="ency-name">${_escHtml(it.name)}</div>',
    '<div class="ency-name">${LANG===\'en\'&&it.name_en?_escHtml(it.name_en):_escHtml(it.name)}</div>'
));
must('list tagline', () => h = h.replace(
    '<div class="ency-tagline">${_escHtml(it.tagline)}</div>',
    '<div class="ency-tagline">${LANG===\'en\'&&it.tagline_en?_escHtml(it.tagline_en):_escHtml(it.tagline)}</div>'
));
must('detail h2 name', () => h = h.replace(
    '<h2>${_escHtml(it.name)}</h2>',
    '<h2>${LANG===\'en\'&&it.name_en?_escHtml(it.name_en):_escHtml(it.name)}</h2>'
));
must('detail subtitle', () => h = h.replace(
    '<div class="ency-subtitle">${_escHtml(it.subtitle || it.tagline)}</div>',
    '<div class="ency-subtitle">${_escHtml(LANG===\'en\'&&it.subtitle_en?it.subtitle_en:(it.subtitle||it.tagline))}</div>'
));
must('specs array', () => h = h.replace(
    'const specs = (it.specs || []).map(s =>',
    'const specs = ((LANG===\'en\'&&it.specs_en)?it.specs_en:(it.specs||[])).map(s =>'
));
must('origin array', () => h = h.replace(
    'const origin = (it.origin || []).map(o =>',
    'const origin = ((LANG===\'en\'&&it.origin_en)?it.origin_en:(it.origin||[])).map(o =>'
));
must('steps array', () => h = h.replace(
    'const steps = (it.steps || []).map((s, i) =>',
    'const steps = ((LANG===\'en\'&&it.steps_en)?it.steps_en:(it.steps||[])).map((s, i) =>'
));
must('tips array', () => h = h.replace(
    'const tips = (it.tips || []).map(t =>',
    'const tips = ((LANG===\'en\'&&it.tips_en)?it.tips_en:(it.tips||[])).map(t =>'
));
must('specs title', () => h = h.replace(
    '<h3 class="ency-block-title">📋 規格一覽</h3>',
    '<h3 class="ency-block-title">${LANG===\'en\'?\'📋 Specs\':\'📋 規格一覽\'}</h3>'
));
must('originTitle', () => h = h.replace(
    "${it.originTitle || '📜 發明起源'}",
    "${LANG==='en'?(it.originTitle_en||'📜 History'):(it.originTitle||'📜 發明起源')}"
));
must('stepsTitle', () => h = h.replace(
    "${it.stepsTitle || '🛠️ 操作步驟'}",
    "${LANG==='en'?(it.stepsTitle_en||'🛠️ Steps'):(it.stepsTitle||'🛠️ 操作步驟')}"
));
must('tipsTitle', () => h = h.replace(
    "${it.tipsTitle || '💡 美味小方法'}",
    "${LANG==='en'?(it.tipsTitle_en||'💡 Tips'):(it.tipsTitle||'💡 美味小方法')}"
));

if (!ok) { console.error('Aborting — fix anchors above'); process.exit(1); }

// ── PART B: helper ────────────────────────────────────────────────────────────

function injectEn(constName, fields) {
    const anchor = `heroSvg: ${constName},`;
    if (!h.includes(anchor)) { console.warn('⚠ missing anchor: ' + constName); return; }
    const lines = Object.entries(fields)
        .map(([k,v]) => `                            ${k}: ${JSON.stringify(v)},`)
        .join('\n');
    h = h.replace(anchor, anchor + '\n' + lines);
    console.log('  EN: ' + constName);
}

// ── HISTORY ───────────────────────────────────────────────────────────────────

injectEn('ENCY_HIST_KALDI', {
    name_en: '9th Century · The Ethiopian Shepherd Legend',
    tagline_en: 'Kaldi and the dancing goats: humanity\'s discovery of coffee',
    subtitle_en: 'Around 850 AD, an Ethiopian shepherd named Kaldi noticed his goats became unusually energetic after eating red berries. He tried them himself and felt an awakening effect. The word "Coffee" is believed to derive from "Kaffa," the highland region where this occurred.',
    specs_en: [
        {k:'Location',v:'Kaffa Plateau, Ethiopia (origin of the word "coffee")'},
        {k:'Era',v:'c. 850 AD'},
        {k:'Protagonist',v:'Kaldi the shepherd (legendary figure)'},
        {k:'Event',v:'Red coffee cherries caused unusual energy in goats'},
        {k:'Species',v:'Coffea arabica (native Arabica)'}
    ],
    origin_en: [
        {year:'~850 AD',text:'Kaldi observed his goats staying awake all night after eating red berries; he tried them himself and felt a stimulating effect.'},
        {year:'Brought to the village',text:'Kaldi brought the berries to nearby monks, who found them bitter and threw them into a fire.'},
        {year:'The aroma awakens',text:'The roasted beans released an irresistible aroma; the monks dissolved them in water and found they could stay alert through night prayers.'},
        {year:'Word spreads',text:'News spread across the Ethiopian highlands; coffee became a ritual and social drink among locals.'},
        {year:'Legendary status',text:"Though the Kaldi story may be apocryphal, Ethiopia's role as coffee's birthplace has been confirmed by botanists."}
    ],
    originTitle_en: '📖 Legend & Historical Record',
    tipsTitle_en: '🌍 Historical Significance',
    tips_en: [
        {icon:'🌍',title:'The etymology of coffee',desc:'Kaffa → Qahwa (Arabic) → Kahve (Turkish) → Caffè (Italian) → Coffee (English).'},
        {icon:'🌱',title:"Arabica's native homeland",desc:"Ethiopia's highlands remain the original gene bank of Coffea arabica, home to over 1,000 wild varieties."},
        {icon:'🏆',title:'Why African coffees excel',desc:'High altitude + genetic diversity + volcanic soil create the bright acidity and floral aromas Ethiopia and Kenya are famous for.'},
        {icon:'🎭',title:'Coffee ceremony (Bunna)',desc:'Ethiopian households still perform a full coffee ceremony — freshly roasted, ground, and brewed — at the heart of daily social life.'}
    ]
});

injectEn('ENCY_HIST_MOCHA', {
    name_en: '15th Century · Awakening of Mocha Port',
    tagline_en: "Yemen's Sufi monks and the world's first coffee trade hub",
    subtitle_en: "In the 15th century, Yemeni Sufi monks began cultivating coffee to stay awake during night prayers. The port of Mocha (Al-Mukha) on the Red Sea became the world's first commercial coffee export center — and 'Mocha' became synonymous with rich, chocolate-tinged coffee.",
    specs_en: [
        {k:'Location',v:'Mocha (Al-Mukha), Yemen — Red Sea port'},
        {k:'Era',v:'~1450s'},
        {k:'Pioneers',v:'Sufi monks of Yemen'},
        {k:'Significance',v:"World's first commercial coffee export hub"},
        {k:'Legacy',v:'"Mocha" = dark chocolate coffee flavor'}
    ],
    origin_en: [
        {year:'~1450',text:'Sufi monks in Yemen adopted coffee from Ethiopian traders as an aid to night prayers and meditation.'},
        {year:'1470s',text:'Coffee cultivation spread to the terraced mountains of Yemen; Mocha port became the export gateway to the world.'},
        {year:'1500s',text:'All Arabian Peninsula coffee passed through Mocha; the Ottomans later monopolized the trade.'},
        {year:'17th century',text:'Dutch traders smuggled coffee seeds out of Yemen, breaking the Mocha monopoly and starting global cultivation.'},
        {year:'Legacy',text:'Yemen Mocha beans — grown at high altitude with a wild fruit-wine character — remain among the rarest and most expensive in the world.'}
    ],
    originTitle_en: '📜 History & Trade',
    tipsTitle_en: '🌍 Historical Significance',
    tips_en: [
        {icon:'⛵',title:"World's first coffee port",desc:'For nearly 200 years, virtually all coffee in the world passed through the Mocha port — the OPEC of its day.'},
        {icon:'🍫',title:'Origin of "Mocha" flavor',desc:'Yemen Mocha beans have a natural dark chocolate–berry character. European baristas mixed espresso with cocoa and named it "Mocha" in honor of the port.'},
        {icon:'🙏',title:'Sufi spiritual drink',desc:"Coffee was first a sacred drink for Sufi monks — its alertness was seen as divine aid for prayer. Islam's embrace of coffee made it a cultural phenomenon."},
        {icon:'🔑',title:'Yemen seed monopoly',desc:'Yemen initially forbade exporting live coffee plants or viable seeds — all beans were parched or boiled before export. The Dutch eventually broke the monopoly.'}
    ]
});

injectEn('ENCY_HIST_OTTOMAN', {
    name_en: 'Ottoman Empire · Coffeehouse Culture',
    tagline_en: 'The birth of the coffeehouse: politics, chess, and the "school of the wise"',
    subtitle_en: "The Ottoman Empire transformed coffee from a Sufi ritual into a social institution. In 1554, the world's first public coffeehouses opened in Constantinople. Men gathered to drink coffee, debate politics, and play chess — a revolutionary public space that threatened both religious authorities and rulers.",
    specs_en: [
        {k:'First coffeehouse',v:'Constantinople (Istanbul), 1554'},
        {k:'Founders',v:'Hakam from Aleppo & Shams from Damascus'},
        {k:'Role',v:'Social hub: politics, chess, music, debate'},
        {k:'Controversies',v:'Banned multiple times by Ottoman sultans (1511, 1623)'},
        {k:'Legacy',v:'Template for all European coffeehouses'}
    ],
    origin_en: [
        {year:'1511',text:"Mecca governor Kha'ir Beg banned coffee as intoxicating — overruled by the sultan who enjoyed it himself."},
        {year:'1554',text:"World's first public coffeehouses open in Constantinople; they became the city's most vibrant social spaces."},
        {year:'1600s',text:'Coffeehouses spread across the Ottoman Empire; thousands operate in Istanbul alone.'},
        {year:'1623',text:'Sultan Murad IV banned coffeehouses on pain of death — the ban ultimately failed as coffee was too embedded in culture.'},
        {year:'1683',text:'After the Ottoman defeat at Vienna, retreating troops left behind sacks of coffee — sparking European café culture.'}
    ],
    originTitle_en: '📜 Coffeehouse History',
    tipsTitle_en: '🌍 Cultural Significance',
    tips_en: [
        {icon:'🏛️',title:'"Schools of the Wise"',desc:'Ottoman coffeehouses were called mekteb-i irfan — anyone could enter for the price of a coffee and debate ideas with scholars and merchants.'},
        {icon:'♟️',title:'Chess and politics',desc:'Chess, backgammon, political debate, and poetry recitals all happened in coffeehouses — exactly why rulers feared them.'},
        {icon:'🚫',title:'Banned but unstoppable',desc:"Coffee was banned at least five times in the Ottoman Empire — each time the ban failed. Culture always wins over politics."},
        {icon:'🇬🇧',title:'Inspired London coffeehouses',desc:"17th-century London had over 300 coffeehouses inspired by Ottoman models. Lloyd's of London — the insurance giant — started as a coffeehouse."}
    ]
});

injectEn('ENCY_HIST_EUROPE', {
    name_en: 'Coffee Comes to Europe',
    tagline_en: 'Venice, London coffeehouses, and the "penny university" revolution',
    subtitle_en: "Coffee arrived in Europe via Venice around 1600, initially met with suspicion — some called it 'the bitter invention of Satan.' Pope Clement VIII tasted it and declared it too delicious to leave to infidels. By the mid-1600s, London had 300+ coffeehouses serving as intellectual and financial hubs.",
    specs_en: [
        {k:'First European arrival',v:'Venice, Italy, c. 1600'},
        {k:'First London coffeehouse',v:"Pasqua Rosée, 1652"},
        {k:'Peak coffeehouse count',v:'London: 300+ by 1700'},
        {k:'Entry fee',v:'1 penny → "Penny University"'},
        {k:'Notable alumni',v:"Lloyd's of London, precursor to London Stock Exchange"}
    ],
    origin_en: [
        {year:'~1600',text:'Venetian merchants brought coffee from the Levant; the first European coffee shop opened in Venice.'},
        {year:'1645',text:"Europe's first coffeehouse opens in Venice; coffee is initially sold as a medicinal drink."},
        {year:'1652',text:"London's first coffeehouse opened by Pasqua Rosée — charging 1 penny entry, open to all social classes."},
        {year:'1674',text:"The 'Women's Petition Against Coffee' complained that men spent too much time in coffeehouses instead of at home."},
        {year:'1700s',text:"Coffeehouses became 'penny universities' where merchants, scholars, and politicians mixed freely. Lloyd's of London started here."}
    ],
    originTitle_en: '📜 Coffee in Europe',
    tipsTitle_en: '🌍 Historical Significance',
    tips_en: [
        {icon:'🏛️',title:'"Penny University"',desc:'For 1 penny (the coffee price), anyone could enter a London coffeehouse and engage in intellectual discourse with merchants, scientists, and politicians.'},
        {icon:'💰',title:"Lloyd's of London",desc:"The world's most famous insurance market started as Edward Lloyd's coffeehouse in 1688, where merchants met to insure ships and cargo."},
        {icon:'🚫',title:'Women banned',desc:"Most European coffeehouses banned women — seen as male spaces. This sparked early protests, including the 1674 Women's Petition Against Coffee."},
        {icon:'🍺',title:'Replaced ale at breakfast',desc:"In 17th-century Europe, weak ale was standard at breakfast (water was unsafe). Coffee replaced it — and a more sober, productive Europe emerged."}
    ]
});

injectEn('ENCY_HIST_COLONIAL', {
    name_en: 'Colonial Plantation Era',
    tagline_en: 'Dutch to Java, French to Martinique, Portuguese to Brazil',
    subtitle_en: "From the 17th to 19th centuries, European colonial powers broke the Yemeni coffee monopoly and established vast plantations across Asia, Africa, and the Americas. The Dutch planted in Java (1696), the French in Martinique (1720), and Brazil eventually became the world's dominant coffee producer.",
    specs_en: [
        {k:'Dutch in Java',v:'1696 — first successful non-Yemeni plantation'},
        {k:'French in Martinique',v:'1720 — one seedling fathered Caribbean coffee'},
        {k:'Brazil begins',v:'1727 — Palheta smuggled seeds from French Guiana'},
        {k:'Haiti peak',v:'1788 — produced 40% of world coffee supply'},
        {k:'Legacy',v:"Brazil = world's #1 producer since 1840"}
    ],
    origin_en: [
        {year:'1616',text:'Dutch traders smuggle live coffee plants from Mocha, Yemen — the first breach of the Arab monopoly.'},
        {year:'1696',text:'Dutch East India Company plants coffee in Java, Indonesia — the first large-scale non-Arabian coffee plantation.'},
        {year:'1720',text:'French naval officer Gabriel de Clieu carries a single coffee seedling to Martinique; it becomes the ancestor of nearly all Caribbean and Central American coffee.'},
        {year:'1727',text:"Francisco de Mello Palheta smuggles coffee seeds from French Guiana into Brazil, hidden in flowers — Brazil's coffee era begins."},
        {year:'1788',text:'Haiti (then Saint-Domingue) produces 40% of global coffee. The 1791 slave revolt ends this dominance.'}
    ],
    originTitle_en: '📜 Colonial Coffee History',
    tipsTitle_en: '🌍 Legacy & Impact',
    tips_en: [
        {icon:'⛵',title:'The great smuggle',desc:'Nearly all coffee outside Yemen/Ethiopia descends from a handful of smuggled plants — one Dutch plant (Java 1696), one French seedling (Martinique 1720).'},
        {icon:'🌍',title:'Built on slavery',desc:"Brazil's coffee boom was fueled by enslaved African labor until abolition in 1888. The history of coffee is inseparable from the history of slavery."},
        {icon:'🇧🇷',title:"Brazil's dominance",desc:"Brazil became the world's largest coffee producer in 1840 and has held that position ever since — currently producing ~40% of global supply."},
        {icon:'🌱',title:'Typica genealogy',desc:'Virtually all Arabica coffee in the Americas traces back to a single Typica plant brought to Amsterdam in 1706.'}
    ]
});

injectEn('ENCY_HIST_INDUSTRIAL', {
    name_en: 'Industrial Roasting & Modern Coffee',
    tagline_en: 'Canned coffee, instant powder, and the mass-market revolution',
    subtitle_en: "The 19th-century Industrial Revolution transformed coffee from a freshly roasted artisan drink into a standardized commodity. Industrial drum roasters, vacuum-sealed cans (1900), and instant coffee powder (1901) made coffee available to the masses — at the cost of freshness and nuance.",
    specs_en: [
        {k:'Industrial roasting',v:'1860s — Jabez Burns patents first commercial drum roaster'},
        {k:'Vacuum canning',v:'1900 — Hills Bros. introduces vacuum-sealed cans'},
        {k:'Instant coffee',v:'1901 — Satori Kato patents soluble instant coffee'},
        {k:'Maxwell House',v:'1892 — "Good to the last drop" brand launched'},
        {k:'WWII boost',v:'US Army issues instant coffee rations — normalizes mass coffee culture'}
    ],
    origin_en: [
        {year:'1860s',text:'Jabez Burns (New York) patents the first continuous-process commercial drum roaster, enabling mass production.'},
        {year:'1892',text:'Maxwell House coffee launches in Nashville; by the 1900s it becomes the most recognized coffee brand in the US.'},
        {year:'1900',text:'Hills Brothers introduce vacuum-sealed coffee cans, dramatically extending shelf life and enabling national distribution.'},
        {year:'1901',text:'Japanese-American chemist Satori Kato patents the first soluble instant coffee powder — add hot water and drink.'},
        {year:'WWII (1941-45)',text:'US military issues instant coffee in every ration pack; returning soldiers fuel postwar coffee consumption.'}
    ],
    originTitle_en: '📜 Industrial Coffee History',
    tipsTitle_en: '🌍 Legacy & Impact',
    tips_en: [
        {icon:'🏭',title:'Scale vs. quality trade-off',desc:'Industrial roasting prioritized consistency and shelf life over flavor. Pre-ground canned coffee could sit for months — flavor was secondary.'},
        {icon:'⚡',title:'Instant coffee dominance',desc:"By the 1950s, instant coffee accounted for 25%+ of US consumption. Nestlé's Nescafé (1938) became the world's best-selling coffee brand."},
        {icon:'🔄',title:'The freshness loss',desc:"Industrial pre-grinding destroys volatile aromatics within hours. Specialty coffee's obsession with 'freshly ground' is a direct reaction to this era."},
        {icon:'🌍',title:'Coffee becomes global',desc:'Industrial production made coffee affordable for the middle class worldwide. By 1900, the US consumed more coffee than the rest of the world combined.'}
    ]
});

injectEn('ENCY_HIST_WAVE1', {
    name_en: 'First Wave · Commodity Coffee',
    tagline_en: 'Mass production, instant powder, and coffee as a utility',
    subtitle_en: "The First Wave (1940s–1960s) treated coffee as a commodity rather than a craft. Folgers, Maxwell House, and Nescafé dominated with vacuum-canned pre-ground blends. Quantity over quality — a cup of coffee was fuel, not an experience. This era established coffee as an everyday staple in American homes.",
    specs_en: [
        {k:'Era',v:'1940s–1960s'},
        {k:'Key brands',v:'Folgers, Maxwell House, Nescafé, Hills Bros.'},
        {k:'Product form',v:'Pre-ground vacuum cans, instant powder'},
        {k:'Philosophy',v:'Coffee as fuel — affordable, consistent, ubiquitous'},
        {k:'Roast profile',v:'Medium–dark, prioritizing bitterness tolerance over nuance'}
    ],
    origin_en: [
        {year:'1864',text:'Jabez Burns patents industrial roaster; coffee becomes a manufactured product rather than an artisan craft.'},
        {year:'1900',text:'Hills Brothers introduce vacuum sealing — pre-ground coffee can now be shipped and stored nationally.'},
        {year:'1942',text:'US military instant coffee rations normalize consumption; returning veterans fuel postwar demand.'},
        {year:'1950s',text:'Folgers and Maxwell House battle for US supermarket dominance; both prioritize low cost over flavor.'},
        {year:'1960s',text:'Percolators and drip machines are standard American appliances; coffee is a morning ritual of convenience.'}
    ],
    originTitle_en: '📜 First Wave History',
    tipsTitle_en: '🌍 Legacy & Reaction',
    tips_en: [
        {icon:'🏠',title:'Coffee becomes domestic',desc:'The First Wave made home coffee brewing universal in the Western world. The moka pot, percolator, and drip machine were household staples.'},
        {icon:'💰',title:'Race to the bottom',desc:'Competition drove brands to cut costs — cheaper Robusta blends, over-roasting to mask defects, and commoditized buying that hurt farmers.'},
        {icon:'🔄',title:'The seed of reaction',desc:"The First Wave's flavorless commoditization was precisely what Alfred Peet rebelled against in 1966 — sparking the Second Wave."},
        {icon:'📦',title:'Maxwell House vs Folgers',desc:"America's two coffee giants controlled 60% of the market by the 1960s. Their mass advertising defined what Americans thought coffee should taste like."}
    ]
});

injectEn('ENCY_HIST_WAVE2', {
    name_en: 'Second Wave · The Starbucks Era',
    tagline_en: 'Espresso drinks, dark roast, and coffee as an experience',
    subtitle_en: "The Second Wave (1966–2000s) elevated coffee from a commodity to an experience. Alfred Peet's 1966 Berkeley store introduced dark-roasted single-origin beans to America. Starbucks (1971) scaled this model globally, popularizing espresso drinks, café culture, and the $5 latte.",
    specs_en: [
        {k:'Era',v:'1966–2000s'},
        {k:'Pioneers',v:"Peet's Coffee (1966), Starbucks (1971), Caribou Coffee"},
        {k:'Key innovation',v:'Espresso-based drinks: latte, cappuccino, macchiato'},
        {k:'Roast profile',v:'Dark roast — bold and consistent'},
        {k:'Business model',v:'Café as "third place" (not home, not office)'}
    ],
    origin_en: [
        {year:'1966',text:"Alfred Peet opens Peet's Coffee & Tea in Berkeley, CA — introducing Europeans' fresh-roasted dark beans to America."},
        {year:'1971',text:'Starbucks opens its first store at Pike Place Market, Seattle — initially selling beans, not drinks.'},
        {year:'1987',text:'Howard Schultz acquires Starbucks and pivots to Italian espresso bar model — the modern Starbucks is born.'},
        {year:'1994',text:'Starbucks IPO; rapid global expansion begins. The chain reaches 1,000 stores by 1996.'},
        {year:'2000s',text:'Starbucks operates 10,000+ stores globally; the "third place" concept and $5 latte become cultural phenomena.'}
    ],
    originTitle_en: '📜 Second Wave History',
    tipsTitle_en: '🌍 Legacy & Critique',
    tips_en: [
        {icon:'☕',title:'The latte revolution',desc:'The Second Wave introduced most Americans to espresso, cappuccinos, and flavored lattes. Coffee became a lifestyle accessory.'},
        {icon:'🏙️',title:'"Third place" concept',desc:"Starbucks popularized the café as a 'third place' between home and work — comfortable seating, Wi-Fi, and a non-judgmental atmosphere."},
        {icon:'🌑',title:'Dark roast critique',desc:"The Third Wave argues Second Wave dark roasts mask terroir and defects. 'Starbucks burnt roast' became shorthand for over-roasting."},
        {icon:'💰',title:'The $5 latte effect',desc:'Starbucks normalized paying $5+ for a coffee drink, which paradoxically made it easier for specialty shops to charge for quality.'}
    ]
});

injectEn('ENCY_HIST_WAVE3', {
    name_en: 'Third Wave · Specialty Coffee',
    tagline_en: 'Single origin, light roast, and coffee as terroir',
    subtitle_en: "The Third Wave (2000s–2010s) treats coffee like fine wine — emphasizing origin, variety, processing, and the farmer's craft. Traceability, light roasting to preserve terroir, pour-over brewing, and direct trade define this movement. Blue Bottle, Stumptown, and Intelligentsia are its icons.",
    specs_en: [
        {k:'Era',v:'2000s–2010s'},
        {k:'Key brands',v:'Blue Bottle, Stumptown, Intelligentsia, Counter Culture'},
        {k:'Roast profile',v:'Light to medium — preserving origin character'},
        {k:'Sourcing model',v:'Direct trade, farm-level traceability, Cup of Excellence'},
        {k:'Brew methods',v:'Pour-over, AeroPress, siphon — manual precision'}
    ],
    origin_en: [
        {year:'1999',text:'Trish Rothgeb coins "Third Wave" in a Barista Magazine article — distinguishing specialty from commodity coffee.'},
        {year:'1999',text:'Cup of Excellence launches in Brazil — the first transparent, traceable, high-quality coffee auction system.'},
        {year:'2002',text:'Blue Bottle Coffee founded in Oakland, CA; the specialty movement gains momentum alongside Stumptown and Intelligentsia.'},
        {year:'2010',text:'World Brewers Cup launches — elevating manual brewing to a competitive sport. V60 and AeroPress become iconic.'},
        {year:'2016',text:"Tetsu Kasuya's 4:6 method wins WBrC, sparking global interest in brewing recipe science."}
    ],
    originTitle_en: '📜 Third Wave History',
    tipsTitle_en: '🌍 Key Values',
    tips_en: [
        {icon:'🗺️',title:'Origin transparency',desc:"Third Wave coffee traces from farm to cup: country, region, farm, variety, processing, harvest year. The opposite of anonymous 'blend'."},
        {icon:'🌱',title:'Direct trade',desc:'Bypassing commodity markets, roasters pay farmers directly — often 2–5× the commodity price — in exchange for quality and traceability.'},
        {icon:'🔬',title:'Brewing as science',desc:'TDS (Total Dissolved Solids), extraction percentage, grind distribution — the Third Wave turned brewing into measurable science.'},
        {icon:'🏆',title:'Competitions as culture',desc:'World Barista Championship, World Brewers Cup, and Cup of Excellence created a celebrity-chef equivalent for coffee professionals.'}
    ]
});

injectEn('ENCY_HIST_WAVE4', {
    name_en: 'Fourth Wave · Science, Technology & Beyond',
    tagline_en: 'AI roasting, precision fermentation, and hyper-personalized coffee',
    subtitle_en: "The Fourth Wave (2010s–present) pushes coffee into food science territory. Ultra-precise brewing variables, experimental fermentation (anaerobic, thermal shock, yeast inoculation), genomic variety development, AI-assisted roasting, and subscription micro-roasters characterize this era.",
    specs_en: [
        {k:'Era',v:'2010s–present'},
        {k:'Key trends',v:'Precision fermentation, genomic breeding, AI roasting, micro-lots'},
        {k:'Roast profile',v:'Ultra-light (Nordic/Cinnamon) to hyper-targeted per-bean'},
        {k:'Tech tools',v:'Refractometers, flow profiling, pressure profiling, grind distribution'},
        {k:'Business model',v:'Subscription micro-roasters, DTC farm-to-cup, tokenized lots'}
    ],
    origin_en: [
        {year:'2015',text:'World Coffee Research publishes the Arabica genome — enabling scientific breeding of disease-resistant, flavorful varieties.'},
        {year:'2016',text:'Experimental fermentation (anaerobic, carbonic maceration) enters specialty coffee; competition lots reach $800+/kg.'},
        {year:'2018',text:'AI-assisted roasting platforms (Cropster, Artisan) become standard in quality roasteries.'},
        {year:'2020',text:'Pandemic accelerates home brewing sophistication; precision grinders and temperature-controlled kettles sell out globally.'},
        {year:'2023+',text:'AI-powered coffee advisors, blockchain traceability, and lab-grown coffee cells appear as commercial pilots.'}
    ],
    originTitle_en: '📜 Fourth Wave History',
    tipsTitle_en: '🌍 Key Trends',
    tips_en: [
        {icon:'🔬',title:'Fermentation as flavor engineering',desc:'Anaerobic, carbonic maceration, thermal shock, and yeast inoculation turn fermentation into a precise flavor design tool — the craft beer moment for coffee.'},
        {icon:'🧬',title:'Genomic breeding',desc:'World Coffee Research uses genomic data to breed climate-resilient F1 hybrids (Centroamericano) that maintain high cup quality.'},
        {icon:'🤖',title:'AI in the roastery',desc:'Machine learning analyzes roast curves, predicts flavor profiles, and suggests adjustments — removing subjectivity from the roast process.'},
        {icon:'💎',title:'Extreme micro-lots',desc:'Geisha, Sidra, and experimental fermented lots regularly sell at $200–800/kg green. Coffee is entering fine wine territory.'}
    ]
});

// ── VARIETY ───────────────────────────────────────────────────────────────────

injectEn('ENCY_VAR_TYPICA', {
    tagline_en: 'Ancestor of all Arabica: clean, balanced, textbook coffee',
    subtitle_en: 'Typica and Bourbon are the two progenitors of all modern Arabica varieties. Exported from Yemen via Indonesia and Martinique in the 17th century, Typica features elongated beans, bronze-tipped new leaves, low yield, weak disease resistance, and exceptionally clean, balanced cup quality.',
    specs_en: [
        {k:'Scientific name',v:'Coffea arabica var. Typica'},
        {k:'Origin',v:'Yemen → Java (1696) → Martinique (1714)'},
        {k:'Bean shape',v:'Elongated, slightly pointed at tip'},
        {k:'Leaf color',v:'Bronze-tipped new leaves (vs Bourbon green)'},
        {k:'Key origins',v:'Hawaii Kona, Indonesia Mandheling, Panama, Guatemala'},
        {k:'Disease resistance',v:'Weak (susceptible to leaf rust)'}
    ],
    origin_en: [
        {year:'1696',text:'Dutch East India Company brought Yemeni coffee to Java, Indonesia — this batch was the beginning of the Typica lineage.'},
        {year:'1706',text:'A Typica seedling was sent from Java to the Amsterdam Botanical Garden, then gifted to the French Royal court.'},
        {year:'1714',text:"King Louis XIV received the 'Royal Coffee Tree'; its descendants were spread to Martinique island."},
        {year:'1727 Brazil',text:'Francisco de Mello Palheta brought Typica to Brazil — the ancestor of all Brazilian coffee.'},
        {year:'Today',text:'Typica lineage exists worldwide, but its low yield is gradually losing ground to Caturra and Catuai.'}
    ],
    originTitle_en: '📜 Variety History & Spread',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'⚖️',title:'Clean and balanced',desc:"No strong individual character — all elements are harmonious. It's the 'standard taste of coffee' that beginners find easiest to understand."},
        {icon:'🍫',title:'Chocolate and nut tones',desc:'At medium roast, Typica most commonly expresses chocolate, nuts, and mild fruit notes. High cleanliness, non-aggressive.'},
        {icon:'☕',title:'Forgiving to brew',desc:'Typica is not sensitive to technique or water temperature. Three-pour or single-pour methods both work well.'},
        {icon:'🇯🇲',title:'Classic origins',desc:"Hawaii Kona, Jamaica Blue Mountain, and Yemen Mokha are all flagship Typica-lineage coffees."},
        {icon:'⚠️',title:'Weak disease resistance',desc:'Leaf rust has pushed many origins to abandon Typica for resistant varieties. Remaining Typica is mostly grown by high-quality specialty estates.'}
    ]
});

injectEn('ENCY_VAR_BOURBON', {
    tagline_en: 'The golden variety for sweetness and roundness',
    subtitle_en: "Bourbon and Typica are the two ancestors of all Arabica. In 1715, the French brought coffee plants to Bourbon Island (now Réunion) in the Indian Ocean. The climate and soil induced a mutation — rounder beans with higher sweetness — making Bourbon the most prized 'sweetness champion' of specialty coffee.",
    specs_en: [
        {k:'Scientific name',v:'Coffea arabica var. Bourbon'},
        {k:'Origin',v:'Bourbon Island (Réunion), 1715'},
        {k:'Bean shape',v:'Round, shorter than Typica'},
        {k:'Leaf color',v:'Green new leaves (vs Typica bronze)'},
        {k:'Key origins',v:'Rwanda, Burundi, El Salvador, Guatemala, Brazil'},
        {k:'Disease resistance',v:'Weak (susceptible to leaf rust)'}
    ],
    origin_en: [
        {year:'1715',text:'French missionaries brought Typica plants to Bourbon Island (now Réunion); the isolated climate caused a natural mutation.'},
        {year:'1727',text:'Bourbon coffee plants arrived in Brazil, becoming one of the key ancestral varieties for South American coffee.'},
        {year:'1860s',text:'Bourbon spread to Central America and East Africa, adapting to various climates and producing distinct flavor profiles.'},
        {year:'1935',text:'Yellow Bourbon discovered in Brazil — a natural color mutation with even higher sweetness.'},
        {year:'Today',text:'Bourbon is considered the gold standard for sweetness and roundness; Rwanda and Burundi Bourbon lots regularly score 90+ at auction.'}
    ],
    originTitle_en: '📜 Variety History & Spread',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍯',title:'Sweetness champion',desc:"Bourbon's defining characteristic is its sweetness — caramel, brown sugar, red apple. The sweetest naturally-occurring Arabica mutation."},
        {icon:'🍒',title:'Red/Yellow/Pink Bourbon',desc:'Red Bourbon (classic) → Yellow Bourbon (Brazil mutation, even sweeter) → Pink Bourbon (Colombia, tropical fruit tones) — color = ripeness + flavor variation.'},
        {icon:'☕',title:'Medium roast is ideal',desc:'Bourbon shines at light-medium roast: the sweetness opens up without the caramelization overpowering the delicate fruit notes.'},
        {icon:'🇷🇼',title:'Rwanda Bourbon',desc:"Rwanda's high-altitude Bourbon is one of specialty coffee's most consistent flavor profiles: berry, caramel, citrus brightness."},
        {icon:'⚠️',title:'Low yield',desc:'Like Typica, Bourbon produces relatively little fruit per tree. Only estates prioritizing quality over quantity maintain full Bourbon orchards.'}
    ]
});

injectEn('ENCY_VAR_GEISHA', {
    tagline_en: 'Panama Geisha: jasmine, bergamot, and the world\'s most expensive coffee',
    subtitle_en: "Geisha (also spelled Gesha) was discovered in Ethiopia's Gesha forest in the 1930s. After decades of obscurity as a disease-resistant curiosity, it exploded onto the specialty scene when Panama's Hacienda La Esmeralda won the Best of Panama auction in 2004 with an unprecedented score. Today it commands the highest prices in the coffee world.",
    specs_en: [
        {k:'Origin',v:"Gesha forest, Ethiopia (discovered 1930s)"},
        {k:'Key breakthrough',v:'Best of Panama 2004 — Hacienda La Esmeralda'},
        {k:'Current price',v:'$100–800+/kg green at auction'},
        {k:'Flavor profile',v:'Jasmine, bergamot, peach, tropical fruit, black tea'},
        {k:'Altitude',v:'1,600–2,100 m (optimal)'},
        {k:'Disease resistance',v:'High (original draw; flavor was a surprise bonus)'}
    ],
    origin_en: [
        {year:'1930s',text:'Gesha village in southwest Ethiopia — researchers collect seeds from wild coffee forest for disease-resistance research.'},
        {year:'1953',text:'Seeds arrive in Central America (CATIE Costa Rica) as experimental disease-resistant material; largely ignored for flavor.'},
        {year:'1963',text:"Seeds planted at Panama's Hacienda La Esmeralda as windbreak trees; no one realizes their flavor potential for 40 years."},
        {year:'2004',text:'Best of Panama auction: La Esmeralda Geisha scores 95+ points — 3× the previous record price. Specialty coffee is changed forever.'},
        {year:'Today',text:'Geisha planted across Ethiopia, Panama, Colombia, Costa Rica, and Japan. Auction prices regularly exceed $300/kg green.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🌸',title:'Jasmine and bergamot',desc:"Geisha's defining signature: intense jasmine florals and bergamot (Earl Grey tea) aroma. Nothing else in coffee tastes quite like it."},
        {icon:'🫖',title:'Drink it like tea',desc:'Light roast Geisha brews like a floral herbal tea — translucent, fragrant, almost weightless. Expect black tea body with explosive aromatics.'},
        {icon:'💧',title:'Use clean water',desc:'Geisha amplifies everything — including off-notes in water. Use filtered water (TDS 75–150 ppm) and a clean pour-over setup.'},
        {icon:'💎',title:'Why so expensive?',desc:'Low yield + high altitude requirement + massive global demand + auction hype = $100–800/kg. A single cup of competition Geisha can cost $20+.'},
        {icon:'🌍',title:'African vs Panama Geisha',desc:'Ethiopia Gesha (original) is wilder and earthier; Panama Geisha is cleaner and more perfumed. Both are extraordinary — try both if budget allows.'}
    ]
});

injectEn('ENCY_VAR_SL28', {
    tagline_en: 'Kenya blackcurrant acid — the SL series icon',
    subtitle_en: "SL28 and SL34 were selected by Scott Laboratories in 1930s colonial Kenya from drought-resistant African wild coffee. SL28 in particular produces Kenya's signature blackcurrant–tomato–citrus acid profile at high altitude — the most distinctive regional flavor in all of specialty coffee.",
    specs_en: [
        {k:'Developed by',v:'Scott Agricultural Laboratories (SL), Kenya, 1930s'},
        {k:'SL28 ancestry',v:'Likely Tanzanian Drought Resistant variety'},
        {k:'SL34 ancestry',v:'Likely Bourbon lineage'},
        {k:'Altitude requirement',v:'1,500–2,100 m (higher = better SL28 quality)'},
        {k:'Key origins',v:'Kenya (Nyeri, Kirinyaga, Murang\'a), Uganda'},
        {k:'Flavor signature',v:'Blackcurrant, tomato, grapefruit, savory complexity'}
    ],
    origin_en: [
        {year:'1930s',text:'Scott Agricultural Laboratories selects 40 promising coffee varieties from across Africa. SL28 and SL34 emerge as top performers for yield and quality.'},
        {year:'1940s–60s',text:"SL28 and SL34 planted widely across Kenya's Central Province highlands — Nyeri, Kirinyaga, and Murang'a become the SL heartland."},
        {year:'1970s',text:"Kenya's double-washed process perfects SL28 flavor: two fermentations + two washes create the cleanest, most intense blackcurrant profile possible."},
        {year:'2000s',text:'Specialty coffee discovers Kenyan SL28 — scores of 90+ at CoE auctions; prices spike to 3–5× commodity.'},
        {year:'Today',text:'SL28 at high altitude with double-washed processing is considered one of the most complex and distinctive coffee flavor profiles in the world.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🫐',title:'Blackcurrant is the signature',desc:"Kenya SL28 brewed at 93–95°C with Hoffmann or 4:6 method produces unmistakable blackcurrant flavor — often described as 'liquid blackcurrant candy'."},
        {icon:'🍅',title:'Savory complexity',desc:"Unlike typical fruity coffees, SL28 often has a savory 'tomato juice' or 'red pepper' undertone that makes it simultaneously acidic and complex."},
        {icon:'💧',title:'Double-washed processing',desc:"Kenya's unique double-washed (double-fermented) process is essential for maximizing SL28's brightness. Natural process Kenyan SL28 tastes quite different."},
        {icon:'🌡️',title:'Brew hot',desc:'SL28 responds well to higher water temperature (94–96°C). The high density of SL28 beans requires more energy to extract properly.'},
        {icon:'⚠️',title:'Disease susceptibility',desc:'SL28 is susceptible to Coffee Berry Disease (CBD) — a Kenya-specific pathogen. This limits SL28 to well-managed high-altitude farms.'}
    ]
});

injectEn('ENCY_VAR_PACAMARA', {
    tagline_en: "Arabica's largest bean: tropical fruit and complexity",
    subtitle_en: 'Pacamara is a hybrid of Pacas (El Salvador Bourbon dwarf) and Maragogipe (giant Typica mutation). The result is the largest bean in Arabica — sometimes as big as a small grape — with intense tropical fruit, complex acidity, and distinctive character. El Salvador\'s flagship specialty variety.',
    specs_en: [
        {k:'Parentage',v:'Pacas × Maragogipe'},
        {k:'Created',v:'El Salvador, ISIC, 1958'},
        {k:'Bean size',v:'Extra-large (Screen 18–20+)'},
        {k:'Altitude',v:'1,200–1,800 m'},
        {k:'Key origins',v:'El Salvador, Guatemala, Honduras, Nicaragua'},
        {k:'Flavor profile',v:'Tropical fruit, hibiscus, watermelon, complex acidity'}
    ],
    origin_en: [
        {year:'1958',text:'El Salvador Institute for Coffee Research (ISIC) crosses Pacas with Maragogipe — seeking large bean size with compact plant height.'},
        {year:'1960s–80s',text:'Pacamara spreads through Central America but is largely ignored by commodity buyers who prefer smaller, denser beans.'},
        {year:'2000s',text:'Cup of Excellence competitions spotlight Pacamara — its tropical fruit complexity earns multiple championship lots.'},
        {year:'Today',text:"El Salvador's Pacamara is a specialty coffee darling: distinctive, unusual, and frequently topping Cup of Excellence rankings."}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍉',title:'Tropical fruit bomb',desc:'Pacamara often shows watermelon, mango, hibiscus, and papaya — more tropical than most Arabica varieties. Very distinctive.'},
        {icon:'📏',title:'Extra-large bean',desc:"Pacamara's giant bean (Screen 18–20) means it extracts slower than smaller beans. Grind finer than usual or extend brew time."},
        {icon:'☕',title:'Medium roast is ideal',desc:'Light roast maximizes tropical fruit; medium roast adds chocolate and caramel without killing the fruit. Avoid dark roast.'},
        {icon:'🌊',title:'High variability',desc:'Pacamara is polarizing — some cups are extraordinary, others can be vegetable or bell pepper tasting. Processing and roast quality matter enormously.'},
        {icon:'🇸🇻',title:"El Salvador's pride",desc:'Pacamara put El Salvador on the specialty coffee map. Several El Salvador CoE winning lots have been Pacamara — look for it.'}
    ]
});

injectEn('ENCY_VAR_CATURRA', {
    tagline_en: 'Bourbon dwarf mutation — compact, high-yield, Central America workhorse',
    subtitle_en: "Caturra is a natural Bourbon mutation discovered in Brazil in 1937. Its dwarf stature allows dense planting (3–4× more trees per hectare), making it the most economically important variety in Central America. Cup quality is good — not exceptional, but reliable. The backbone of Colombian and Costa Rican coffee.",
    specs_en: [
        {k:'Parentage',v:'Bourbon natural mutation (dwarf)'},
        {k:'Discovered',v:'Minas Gerais, Brazil, 1937'},
        {k:'Plant height',v:'1.0–1.5 m (vs Bourbon 3–4 m)'},
        {k:'Yield',v:'High — 3–4× denser planting than Typica'},
        {k:'Key origins',v:'Colombia, Costa Rica, Nicaragua, Guatemala'},
        {k:'Disease resistance',v:'Weak (leaf rust susceptible)'}
    ],
    origin_en: [
        {year:'1937',text:"A naturally dwarf Bourbon mutation is discovered on a farm in Minas Gerais, Brazil. Brazil's Instituto Agronômico begins studying it."},
        {year:'1940s–50s',text:'Caturra spread to Central America, valued for its compact size and high productivity — enabling commercial-scale farming.'},
        {year:'1960s–80s',text:"Caturra becomes Colombia's dominant variety — its high yield and good cup quality making it the backbone of Colombia's coffee economy."},
        {year:'2000s',text:'Leaf rust outbreak devastates Caturra across Central America — many farms switch to Catimor or Marsellesa for disease resistance.'},
        {year:'Today',text:'Caturra remains important but is slowly being replaced by disease-resistant alternatives. High-altitude Caturra from Guatemala and Costa Rica is specialty-prized.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍋',title:'Bright citrus acidity',desc:"Caturra's flavor profile centers on citrus brightness — lemon, lime, and green apple. At high altitude it develops more complexity."},
        {icon:'📦',title:'Consistent quality',desc:"Caturra won't blow your mind, but it's reliably good. Its consistency made it the foundation of Colombian blends for decades."},
        {icon:'🏔️',title:'Altitude matters enormously',desc:"Low-altitude Caturra is flat and thin; high-altitude (1,600m+) Caturra develops the acidity and sweetness that earns specialty scores."},
        {icon:'☕',title:'Versatile for roasting',desc:'Caturra roasts evenly and predictably — good for both light and medium roast. Its compact bean size responds well to shorter development time.'},
        {icon:'⚠️',title:'Rust vulnerability',desc:"Caturra's weak disease resistance requires intensive management — fungicides, shade, pruning. Many farms are abandoning it for resistant varieties."}
    ]
});

injectEn('ENCY_VAR_CATUAI', {
    tagline_en: 'Caturra × Mundo Novo — Brazil\'s commercial backbone',
    subtitle_en: "Catuai (from Guaraní 'very good') is a hybrid of Caturra and Mundo Novo, developed by Brazil's IAC in the 1940s. It combines Caturra's compact size with Mundo Novo's higher yield and stronger stems. Cup quality is good but rarely exceptional — it's the reliable workhorse of Brazilian coffee production.",
    specs_en: [
        {k:'Parentage',v:'Caturra × Mundo Novo'},
        {k:'Developed',v:'IAC (Instituto Agronômico), Brazil, 1940s–50s'},
        {k:'Plant height',v:'1.5–2.0 m (compact dwarf)'},
        {k:'Yield',v:'Very high — major commercial advantage'},
        {k:'Key origins',v:'Brazil (dominant), Costa Rica, Guatemala, El Salvador'},
        {k:'Varieties',v:'Red Catuai, Yellow Catuai (color mutation)'}
    ],
    origin_en: [
        {year:'1940s',text:"Brazil's IAC begins crossing Caturra and Mundo Novo seeking a compact, high-yield, quality hybrid."},
        {year:'1950s',text:'Catuai (IAC 44) released; rapidly adopted across Brazil for its productivity and wind-resistant compact form.'},
        {year:'1970s',text:'Catuai becomes Brazil\'s most planted variety — it enables the mechanized, large-scale harvesting Brazil uses today.'},
        {year:'1990s+',text:'Spreads to Central America as a reliable commercial variety. Yellow Catuai discovered as a color mutation with slightly higher sweetness.'},
        {year:'Today',text:'Catuai remains dominant in Brazil — but specialty-focused farms increasingly replace it with Bourbon, Typica, or new F1 hybrids for quality.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍫',title:'Chocolate and nuts',desc:'Catuai at medium roast: chocolate, hazelnut, almond, mild sweetness. Not complex, but clean and approachable.'},
        {icon:'🇧🇷',title:'Brazilian specialty benchmark',desc:"When you drink a clean Brazilian natural, you're often drinking Catuai. Its neutrality lets the processing and roast shine."},
        {icon:'☀️',title:'Natural process friendly',desc:"Catuai's consistent cherry ripening makes it ideal for natural processing — the fruit-drying flavor integrates cleanly."},
        {icon:'📊',title:'High yield = lower cost',desc:"Catuai's commercial advantage keeps Brazilian coffee affordable. Most commodity Brazilian coffee is Catuai."},
        {icon:'🔄',title:'Being replaced by specialty',desc:'Farms seeking higher scores are increasingly planting Bourbon, Typica, or experimental varieties. Catuai is losing ground in premium tiers.'}
    ]
});

injectEn('ENCY_VAR_HEIRLOOM', {
    tagline_en: "Ethiopia's wild heritage: a thousand varieties, nature's gene bank",
    subtitle_en: "Ethiopian Heirloom (also called JARC varieties or simply 'Ethiopian Landrace') refers to the thousands of wild and semi-wild Arabica varieties that grow in Ethiopia's highlands — the birthplace of coffee. Unlike named varieties elsewhere, Ethiopian heirlooms are complex genetic mixtures that create the floral, tea-like complexity Ethiopia is famous for.",
    specs_en: [
        {k:'Classification',v:'Ethiopian Landrace / JARC selections / Wild Arabica'},
        {k:'Species',v:'Coffea arabica — the most genetically diverse population on earth'},
        {k:'Known varieties',v:'1,000+ identified; thousands more unclassified'},
        {k:'Key regions',v:'Yirgacheffe, Sidama, Guji, Jimma, Bench Sheko'},
        {k:'Flavor range',v:'Jasmine → berry → citrus → tropical fruit → black tea'},
        {k:'Processing',v:'Washed (floral/bright) or Natural (fruity/winey)'}
    ],
    origin_en: [
        {year:'Prehistoric',text:"Ethiopia's highland forests are the original home of Coffea arabica — wild coffee trees evolved here over thousands of years."},
        {year:'Pre-colonization',text:'Ethiopian farmers select and propagate wild coffee trees over generations — creating landrace varieties adapted to local microclimates.'},
        {year:'1960s',text:'Jimma Agricultural Research Centre (JARC) begins systematic collection and classification of Ethiopian wild coffees.'},
        {year:'1970s–90s',text:'JARC selections 74110, 74112, 75227 etc. are released for commercial farming — standardizing some of the diversity.'},
        {year:'Today',text:"Ethiopian heirloom natural and washed coffees are among the world's highest-scoring. Yirgacheffe washed is considered the benchmark for floral coffee."}
    ],
    originTitle_en: '📜 History & Classification',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🌸',title:'The floral benchmark',desc:"Washed Ethiopian heirloom from Yirgacheffe sets the global standard for floral coffee: jasmine, bergamot, lavender. Nothing else comes close."},
        {icon:'🫐',title:'Natural process = berry explosion',desc:'Natural Ethiopia heirloom (Sidama, Guji) is the reference for blueberry, strawberry, and wine-like fermented fruit complexity.'},
        {icon:'🫖',title:'Brew like tea',desc:'Light roast Ethiopian heirloom brewed at 92–94°C has the body and clarity of fine black tea. Use Hoffmann or 4:6 method for maximum floral expression.'},
        {icon:'🌍',title:'Genetic diversity matters',desc:"Ethiopia's 1,000+ varieties are a global genetic insurance policy. As climate change threatens coffee, Ethiopia's wild diversity offers the genes for adaptation."},
        {icon:'🔬',title:'Often unlabeled',desc:"Many bags simply say 'Ethiopian Heirloom' with no specific variety — that's normal. Genetic testing would be needed to classify individual plants."}
    ]
});

injectEn('ENCY_VAR_ROBUSTA', {
    tagline_en: 'High caffeine, low altitude, the backbone of espresso blends',
    subtitle_en: "Coffea canephora (Robusta) is the second most commercially important coffee species after Arabica. It thrives at low altitude (0–800m), has double the caffeine content, resists disease, and yields heavily. Its bold, rubbery, earthy cup makes it the dominant ingredient in Italian espresso blends and instant coffee.",
    specs_en: [
        {k:'Scientific name',v:'Coffea canephora (two varieties: Robusta & Nganda)'},
        {k:'Origin',v:'Central Africa (Congo Basin) — discovered 1898'},
        {k:'Caffeine content',v:'2.7% (vs Arabica 1.5%) — nearly 2×'},
        {k:'Altitude',v:'0–800 m (vs Arabica 800–2,000m)'},
        {k:'Key producers',v:'Vietnam (#1 worldwide), Uganda, Indonesia, Brazil'},
        {k:'Main uses',v:'Espresso blends, instant coffee, canned coffee'}
    ],
    origin_en: [
        {year:'1898',text:'Coffea canephora discovered in the Congo by Belgian botanist Émile Laurent — it resists leaf rust that was devastating Arabica.'},
        {year:'Early 1900s',text:'Robusta rapidly replaces Arabica in Dutch Indonesia plantations after leaf rust epidemic. Becomes the dominant Asian coffee.'},
        {year:'1950s',text:'Instant coffee demand drives massive Robusta expansion — Nescafé uses Robusta for its affordable soluble powder.'},
        {year:'1990s',text:'Vietnam becomes the world\'s largest Robusta producer within a decade of commercial coffee farming — using high-yield clonal varieties.'},
        {year:'Today',text:'Robusta accounts for ~40% of global coffee production. Premium Robusta (Uganda Fine Robusta) is now specialty-graded for espresso.'}
    ],
    originTitle_en: '📜 Species History',
    tipsTitle_en: '☕ Flavor & Espresso Use',
    tips_en: [
        {icon:'⚡',title:'Crema king',desc:"Robusta produces more crema in espresso than Arabica — thanks to higher oil content and different gas bubble structure. Italian espresso blends use 20–40% Robusta for crema."},
        {icon:'💪',title:'Bold and bitter',desc:"Robusta's flavor profile: earthy, rubbery, dark chocolate, wood, tobacco. It's loud, not subtle. Used in blends for body and bitterness, not nuance."},
        {icon:'🌡️',title:'High caffeine = different extraction',desc:"Robusta extracts differently from Arabica — it requires higher pressure or longer contact. This is why 9-bar espresso works so well with Robusta-heavy blends."},
        {icon:'🇻🇳',title:'Vietnam dominates',desc:"Vietnam produces 1.5 million tons of Robusta per year — more than Brazil's total coffee output. Nearly all Vietnamese coffee is Robusta."},
        {icon:'🏆',title:'Premium Robusta emerging',desc:"Uganda's Fine Robusta and specialty-graded Indonesian Robusta are challenging assumptions — clean, processed Robusta can score 80+ points."}
    ]
});

injectEn('ENCY_VAR_MUNDONOVO', {
    tagline_en: "Brazil's commercial backbone — Bourbon × Typica hybrid",
    subtitle_en: "Mundo Novo ('New World') is a natural hybrid of Bourbon and Typica discovered in Brazil in the 1940s. It combines both ancestors' best traits: Typica's elongated bean and cleanliness with Bourbon's higher yield and sweetness. A reliable, high-quality commercial workhorse that dominated Brazilian production for decades.",
    specs_en: [
        {k:'Parentage',v:'Bourbon × Typica (natural hybrid)'},
        {k:'Discovered',v:'Mineiros do Tietê, São Paulo, Brazil, 1943'},
        {k:'Plant height',v:'3–3.5 m (tall — not ideal for mechanization)'},
        {k:'Yield',v:'High (better than Typica or Bourbon alone)'},
        {k:'Key origins',v:'Brazil, Colombia'},
        {k:'Flavor profile',v:'Chocolate, nuts, mild sweetness, clean body'}
    ],
    origin_en: [
        {year:'1943',text:"A natural Bourbon × Typica cross is discovered on a farm in São Paulo. Brazil's IAC begins evaluation."},
        {year:'1950s',text:'Mundo Novo officially released by IAC — rapidly adopted across São Paulo and Minas Gerais for its superior yield over pure Typica.'},
        {year:'1960s–70s',text:'Became one of Brazil\'s top two varieties (alongside Catuai) — foundational to Brazil\'s 20th-century coffee export dominance.'},
        {year:'1980s',text:'Partially replaced by Catuai (shorter plant, easier to harvest). Mundo Novo remained popular in lower-altitude regions.'},
        {year:'Today',text:'Still cultivated in Brazil but losing ground to modern varieties. Heirloom Mundo Novo lots are prized for their classic Brazilian flavor profile.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍫',title:'Classic Brazilian profile',desc:'Mundo Novo is textbook Brazilian: chocolate, hazelnut, caramel sweetness, mild acidity. Clean, approachable, great as daily drinker.'},
        {icon:'🇧🇷',title:'Foundation of Brazil',desc:"Mundo Novo and Catuai built Brazil's global dominance. Understanding Mundo Novo means understanding Brazil's coffee history."},
        {icon:'☕',title:'Natural process shines',desc:"Brazil's dry climate suits natural processing. Mundo Novo natural: richer fruit, berry notes layered over the chocolate base."},
        {icon:'📏',title:'Tall plant challenge',desc:"Mundo Novo's tall stature (3–3.5m) makes mechanized harvesting difficult — a key reason it was replaced by dwarf Catuai."},
        {icon:'⚖️',title:'Reliable, not exciting',desc:'Mundo Novo rarely achieves the dramatic flavors of Geisha or SL28, but its consistency and balance make it excellent for blending and everyday espresso.'}
    ]
});

injectEn('ENCY_VAR_MARAGO', {
    tagline_en: "Arabica's giant — one of the largest beans in the world",
    subtitle_en: "Maragogipe is a natural Typica mutation discovered near the town of Maragogipe in Bahia, Brazil, in 1870. Its bean is 2–3× the size of a normal coffee bean — so large it looks almost like a macadamia nut. Cup quality is mild and delicate; it's treasured as a curiosity and for specialty blending.",
    specs_en: [
        {k:'Parentage',v:'Typica natural mutation'},
        {k:'Discovered',v:'Maragogipe, Bahia, Brazil, 1870'},
        {k:'Bean size',v:'Screen 20+ — 2–3× larger than normal Arabica'},
        {k:'Yield',v:'Very low — commercially marginal'},
        {k:'Key origins',v:'Nicaragua, Guatemala, Mexico, Brazil'},
        {k:'Flavor profile',v:'Mild, light body, delicate sweetness, gentle acidity'}
    ],
    origin_en: [
        {year:'1870',text:'A giant-bean Typica mutation discovered near Maragogipe, Bahia. The mutation affects cell size but not the number of cells.'},
        {year:'Late 1800s',text:'Maragogipe spreads to Central America — prized as a visual novelty and mild cup.'},
        {year:'1958',text:'El Salvador IAC crosses Maragogipe with Pacas to create Pacamara — combining giant bean size with compact plant.'},
        {year:'Today',text:'Pure Maragogipe is rare and commands premium prices as a specialty curiosity. Nicaragua Maragogipe is most commercially significant.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'📏',title:'Enormous beans',desc:"Maragogipe beans are so large they don't fit through standard grading screens. Roasters must adjust settings specifically for this variety."},
        {icon:'🫖',title:'Light and delicate',desc:'Unlike what you might expect from giant beans, Maragogipe brews light, mild, and delicate — almost tea-like. Great as an afternoon coffee.'},
        {icon:'🔬',title:'Grind adjustment required',desc:"Giant beans extract differently — usually requiring a finer grind or longer contact time to reach proper extraction despite the large surface area."},
        {icon:'🎁',title:'Specialty curiosity',desc:"Maragogipe is often bought as a gift or conversation piece. 'Do you want to try coffee beans as big as macadamia nuts?' is an effective sales pitch."},
        {icon:'🌱',title:'Parent of Pacamara',desc:"Maragogipe's most important legacy is as a parent of Pacamara — the giant-bean flavor complexity Maragogipe lacks is supplied by its Pacas parent."}
    ]
});

injectEn('ENCY_VAR_PACAS', {
    tagline_en: 'El Salvador family selection — Bourbon dwarf mutation',
    subtitle_en: "Pacas is a natural Bourbon mutation discovered on the Pacas family farm in El Salvador in 1949. Like Caturra (Bourbon's Brazilian dwarf), Pacas is more compact than Bourbon, allowing denser planting. Good cup quality with classic Bourbon sweetness. Later used as one parent of the famous Pacamara hybrid.",
    specs_en: [
        {k:'Parentage',v:'Bourbon natural dwarf mutation'},
        {k:'Discovered',v:'Pacas family farm, Santa Ana, El Salvador, 1949'},
        {k:'Plant height',v:'~2 m (dwarf vs Bourbon 3–4 m)'},
        {k:'Yield',v:'Higher than Bourbon — good commercial balance'},
        {k:'Key origins',v:'El Salvador (dominant), Honduras'},
        {k:'Flavor profile',v:'Sweet, caramel, mild fruit, Bourbon-like roundness'}
    ],
    origin_en: [
        {year:'1949',text:"A compact Bourbon mutation found on the Pacas family's Santa Ana farm. El Salvador's ISIC begins evaluation."},
        {year:'1960s',text:'Pacas officially released; rapidly adopted across El Salvador for its yield advantage and good cup quality.'},
        {year:'1958',text:'ISIC crosses Pacas with Maragogipe → creates Pacamara. Pacas contributes compact plant habit; Maragogipe contributes giant bean size.'},
        {year:'Today',text:"Pacas remains El Salvador's most widely planted commercial variety, though Bourbon and Pacamara are increasingly favored for specialty lots."}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍯',title:'Bourbon sweetness in dwarf form',desc:"Pacas inherits Bourbon's caramel-and-fruit sweetness in a more commercially practical compact plant. A reliable sweet everyday coffee."},
        {icon:'🇸🇻',title:"El Salvador's backbone",desc:"While Pacamara gets the spotlight, Pacas is what most El Salvador farms actually grow — the reliable commercial foundation."},
        {icon:'☕',title:'Medium roast ideal',desc:'Pacas roasts very similarly to Bourbon. Medium-light roast shows its fruit and caramel best; medium-dark adds a pleasant chocolate note.'},
        {icon:'🌱',title:'Parent of Pacamara',desc:"Pacas + Maragogipe = Pacamara. Pacas provides the compact plant and clean Bourbon flavor base; Maragogipe provides the giant bean size."},
        {icon:'⚖️',title:'Reliable consistency',desc:"Pacas won't surprise you with an exotic flavor, but its consistent sweetness and clean cup make it a trustworthy everyday variety."}
    ]
});

injectEn('ENCY_VAR_WUSHWUSH', {
    tagline_en: 'Ethiopian highland wild variety — jasmine and bergamot intensity',
    subtitle_en: "Wush Wush is a rare Ethiopian landrace variety from the high altitude Wushwush district in Kaffa Zone — near coffee's ancestral homeland. At elevations above 2,000m, it develops extraordinary floral intensity: jasmine, bergamot, and white flower notes that rival Geisha. Increasingly sought after by specialty roasters worldwide.",
    specs_en: [
        {k:'Origin',v:'Wushwush district, Kaffa Zone, Ethiopia'},
        {k:'Altitude',v:'2,000–2,200 m (extremely high)'},
        {k:'Classification',v:'Ethiopian landrace / heirloom'},
        {k:'Processing',v:'Washed (floral) or Natural (berry)'},
        {k:'Flavor profile',v:'Jasmine, bergamot, white flower, peach tea'},
        {k:'Rarity',v:'Very limited production — micro-lot only'}
    ],
    origin_en: [
        {year:'Pre-modern',text:'Wush Wush grows wild in the Kaffa Zone forests — one of the original home regions of Coffea arabica.'},
        {year:'2010s',text:'Specialty importers begin separating Wush Wush from general Ethiopian heirloom — recognizing its distinct floral profile.'},
        {year:'2015+',text:'Wush Wush gains international recognition; specialty roasters in Japan, Scandinavia, and the US pay premium prices for micro-lots.'},
        {year:'Today',text:'Production remains extremely limited. A single farm may produce only 1–3 bags per harvest. Prices rival Panama Geisha.'}
    ],
    originTitle_en: '📜 Variety & Origin',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🌸',title:'Floral intensity rivals Geisha',desc:"Wush Wush's jasmine-bergamot florals are as intense as Panama Geisha — but with a wilder, more earthy Ethiopian character underneath."},
        {icon:'🫖',title:'Brew light and clean',desc:'Light roast (City or lighter) + Hoffmann or 4:6 method + 93°C = best floral expression. Dark roast completely destroys Wush Wush character.'},
        {icon:'💎',title:'Extreme rarity',desc:"Wush Wush micro-lots often sell out within hours of listing. If you see it, don't hesitate — it may not be available again for months."},
        {icon:'🌍',title:'Near the birthplace',desc:'The Kaffa Zone where Wush Wush grows is literally where coffee was born — drinking it is as close to the original wild coffee experience as you can get.'},
        {icon:'🔬',title:'Genetic mystery',desc:"Wush Wush's exact genetic classification is uncertain — likely a distinct Ethiopian landrace variant. Genomic sequencing ongoing by WCR."}
    ]
});

injectEn('ENCY_VAR_SUDANRUME', {
    tagline_en: 'Wild Sudan variety — the 2015 World Barista Champion selection',
    subtitle_en: "Sudan Rume is a wild coffee variety originally collected from the Boma Plateau in South Sudan. Extremely rare, genetically distant from cultivated Arabica, it produces extraordinary complex flavors at high altitude. It was famously used by Sasa Sestic to win the 2015 World Barista Championship.",
    specs_en: [
        {k:'Origin',v:'Boma Plateau, South Sudan (wild collected)'},
        {k:'Genetic status',v:'Distant from cultivated Arabica — unique lineage'},
        {k:'Altitude',v:'1,800–2,200 m (optimal)'},
        {k:'Yield',v:'Very low — difficult to cultivate commercially'},
        {k:'Famous use',v:"Sasa Sestic's 2015 WBC winning coffee"},
        {k:'Flavor profile',v:'Red fruit, jasmine, hibiscus, tropical complexity'}
    ],
    origin_en: [
        {year:'1940s–50s',text:'Wild Coffea arabica specimens collected from the Boma Plateau in Sudan by researchers — genetically distinct from Yemeni-derived Arabica.'},
        {year:'1960s',text:'Sudan Rume specimens distributed to research stations in Ethiopia and East Africa as genetic material.'},
        {year:'2015',text:"Australian barista Sasa Sestic uses a Sudan Rume × SL28 hybrid from Colombia's Huila region to win the World Barista Championship — international attention explodes."},
        {year:'Today',text:'Sudan Rume and its hybrids are prized specialty lots. Pure Sudan Rume is vanishingly rare; hybrid versions from Colombia and Ethiopia command premium prices.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🏆',title:'2015 WBC winning coffee',desc:"Sasa Sestic's Sudan Rume–based espresso stunned judges with its complexity and uniqueness — putting wild African varieties on the global specialty map."},
        {icon:'🧬',title:'Distant genetics',desc:"Sudan Rume is genetically farther from cultivated Arabica than any other named variety — this genetic distance likely contributes to its unusual flavor complexity."},
        {icon:'💎',title:'Extremely rare',desc:'Pure Sudan Rume lots are produced by only a handful of farms worldwide. Most available Sudan Rume is actually a hybrid with SL28 or other varieties.'},
        {icon:'🔬',title:'Research value',desc:"Sudan Rume's unique genome is being studied by World Coffee Research as a genetic resource for climate adaptation and disease resistance breeding."},
        {icon:'☕',title:'Espresso or pour-over',desc:"Sudan Rume's complex acidity and fruit intensity work brilliantly as both light roast pour-over and medium-light espresso. Avoid dark roast."}
    ]
});

injectEn('ENCY_VAR_SIDRA', {
    tagline_en: 'Ecuador new star — Bourbon × Typica, tropical complexity',
    subtitle_en: "Sidra is a variety from Ecuador's Hacienda La Papaya farm, believed to be a Bourbon × Typica cross (though its exact genetics are disputed). At high altitude with meticulous processing, Sidra produces extraordinary tropical fruit and floral complexity. It has become one of the most sought-after and expensive specialty varieties.",
    specs_en: [
        {k:'Origin',v:"Hacienda La Papaya, Pichincha, Ecuador"},
        {k:'Parentage',v:'Believed Bourbon × Typica (disputed; may include Geisha genes)'},
        {k:'Altitude',v:'1,800–2,100 m'},
        {k:'Key producers',v:'Ecuador, Colombia, Panama'},
        {k:'Flavor profile',v:'Tropical fruit, jackfruit, white flower, caramel complexity'},
        {k:'Market status',v:'Extremely high demand — limited supply'}
    ],
    origin_en: [
        {year:'Early 2000s',text:"Sidra identified and cultivated at Hacienda La Papaya in Ecuador's Pichincha province. Farm owner Jamil Meluk begins systematic selection."},
        {year:'2010s',text:'Specialty importers discover Sidra — its extraordinary flavor complexity at high altitude earns rapid recognition.'},
        {year:'2018',text:'Sidra used in multiple World Barista Championship and Brewers Cup routines — international recognition peaks.'},
        {year:'Today',text:'Sidra commands $50–300+/kg green at auction. Ecuador becomes a specialty origin to watch, largely because of Sidra.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🍍',title:'Jackfruit and tropical notes',desc:"Sidra's most distinctive characteristic is an intense tropical fruit quality — jackfruit, mango, papaya — unlike anything from Central America or Ethiopia."},
        {icon:'🌸',title:'Floral complexity',desc:'White flower, elderflower, and subtle jasmine notes alongside the tropical fruit. At light roast, Sidra can be mistaken for Geisha.'},
        {icon:'💎',title:'Premium price warning',desc:'Authentic Sidra is expensive and frequently counterfeited. Buy from trusted importers who can verify Ecuador origin and farm-level traceability.'},
        {icon:'🔬',title:'Genetic mystery',desc:"Some genomic analyses suggest Sidra may contain Geisha genes — which would explain its floral intensity. The exact parentage remains disputed."},
        {icon:'☕',title:'Light roast only',desc:"Dark roasting Sidra is criminal — the tropical fruit complexity disappears above City+ roast. Light roast + clean pour-over is the only correct approach."}
    ]
});

injectEn('ENCY_VAR_CASTILLO', {
    tagline_en: "Colombia's disease-resistant workhorse — Caturra × Timor Hybrid",
    subtitle_en: "Castillo is Colombia's most widely planted commercial variety, developed by CENICAFÉ over 25 years of breeding. A Caturra × Timor Hybrid cross, it resists leaf rust while maintaining acceptable cup quality. Controversially, early versions were criticized for inferior flavor; modern Castillo varieties have improved significantly.",
    specs_en: [
        {k:'Parentage',v:'Caturra × Timor Hybrid (Arabica–Robusta introgression)'},
        {k:'Developed by',v:'CENICAFÉ (Colombian coffee research center)'},
        {k:'Released',v:'2005 (after 25 years of development)'},
        {k:'Disease resistance',v:'High — resistant to leaf rust and coffee berry borer'},
        {k:'Key origins',v:'Colombia (dominant commercial variety)'},
        {k:'Flavor profile',v:'Variable — citrus, mild fruit, can be rustic or clean depending on altitude'}
    ],
    origin_en: [
        {year:'1980s',text:'CENICAFÉ begins crossing Caturra with Timor Hybrid (a natural Arabica–Robusta hybrid) to introduce rust resistance.'},
        {year:'2005',text:'Castillo officially released across Colombia — rapid adoption due to 2008–2011 leaf rust epidemic devastating unprotected Caturra farms.'},
        {year:'2008–2011',text:'Leaf rust pandemic hits Colombia hard; Castillo adoption accelerates as Caturra farms fail. By 2015, Castillo covers 40%+ of Colombian farms.'},
        {year:'2010s',text:'Specialty community debates Castillo cup quality — early versions scored lower than Caturra. CENICAFÉ responds with regional Castillo varieties.'},
        {year:'Today',text:'Modern Castillo varieties at high altitude score competitively with Caturra. The controversy has largely faded as quality improved.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Notes',
    tips_en: [
        {icon:'🛡️',title:'Disease survival story',desc:"Without Castillo, Colombia's coffee industry might have collapsed in the 2010s rust epidemic. It saved thousands of farms regardless of cup quality debates."},
        {icon:'📊',title:'Cup quality debate',desc:"Early Castillo had detectable 'rustic' off-notes attributed to Robusta introgression. CENICAFÉ developed regional varieties (Castillo Naranjal, Castillo El Rosario) to address this."},
        {icon:'🏔️',title:'Altitude matters',desc:'High-altitude Castillo (1,700m+) can match or exceed Caturra in cup quality. The variety expresses its best at extreme altitudes with careful farming.'},
        {icon:'🇨🇴',title:'Colombian specialty staple',desc:'Most Colombian coffee you drink is Castillo or Caturra. Recognizing their flavor difference at high vs low altitude is a useful tasting skill.'},
        {icon:'🔬',title:'Ongoing improvement',desc:"CENICAFÉ continues developing Castillo varieties. Their F1 hybrid program (including Centroamericano) shows how disease resistance and quality can coexist."}
    ]
});

injectEn('ENCY_VAR_CATIMOR', {
    tagline_en: 'Disease-resistant ancestor — Vietnam and India commercial main',
    subtitle_en: "Catimor is a Caturra × Timor Hybrid cross developed in Portugal in the 1950s. Highly resistant to leaf rust (from its Timor Hybrid parent, which carries Robusta genes), it became the dominant commercial variety in Asia. Cup quality is often criticized for earthy, Robusta-like notes — but at high altitude with good processing, it can be decent.",
    specs_en: [
        {k:'Parentage',v:'Caturra × Timor Hybrid (Coffea canephora genes present)'},
        {k:'Developed by',v:'CIFC, Portugal, 1959'},
        {k:'Disease resistance',v:'Very high — resistant to most leaf rust races'},
        {k:'Altitude range',v:'500–1,800 m (tolerates lower altitudes than pure Arabica)'},
        {k:'Key origins',v:'Vietnam, India, Indonesia, China Yunnan, Nepal'},
        {k:'Flavor profile',v:'Earthy, woody, rubbery (low alt) → mild citrus (high alt)'}
    ],
    origin_en: [
        {year:'1959',text:'Centro de Investigação das Ferrugens do Cafeeiro (CIFC) in Portugal crosses Caturra with Timor Hybrid — seeking rust resistance in a compact plant.'},
        {year:'1970s',text:'Catimor distributed to coffee-growing countries; rapidly adopted in Asia due to leaf rust devastation of Arabica.'},
        {year:'1980s',text:'Vietnam begins large-scale Catimor (and Robusta) planting — enabling Vietnam to become a top-5 producer within 15 years.'},
        {year:'1990s',text:'India adopts Catimor varieties (S795, Cauvery) as the backbone of its Arabica sector for disease resistance in humid regions.'},
        {year:'Today',text:'Catimor is dominant across Asia. Specialty roasters occasionally highlight high-altitude Catimor lots, though it rarely competes with pure Arabica.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor Notes',
    tips_en: [
        {icon:'⚔️',title:'The controversial variety',desc:"Catimor saved Asian coffee industries from leaf rust — but specialty coffee's purists criticize its Robusta-influenced flavor. Both views have merit."},
        {icon:'🌏',title:'Asia-dominant',desc:"Vietnam's massive Arabica sector is almost entirely Catimor. Indian Arabica (Monsooned Malabar uses Catimor). Chinese Yunnan coffee is mostly Catimor."},
        {icon:'🏔️',title:'Altitude rescues cup quality',desc:'Low-altitude Catimor tastes medicinal and rubbery. Above 1,500m with careful washing, some Catimor can be clean and citrusy.'},
        {icon:'🔬',title:'Robusta gene impact',desc:"Catimor carries 12–25% Robusta genome from the Timor Hybrid parent. This provides rust resistance but also contributes the 'robusta-like' flavor notes."},
        {icon:'🌱',title:'Base for improvement',desc:"Catimor's disease resistance genes have been used to develop better varieties: Castillo, Marsellesa, Sarchimor — all building on Catimor's disease resistance with better Arabica flavor."}
    ]
});

injectEn('ENCY_VAR_MARSELLESA', {
    tagline_en: 'Disease-resistant yet delicious — Central America\'s quality alternative',
    subtitle_en: "Marsellesa is a Sarchimor selection (Timor Hybrid × Villa Sarchi) developed by CIRAD and PROMECAFE in the 1980s. It offers much better cup quality than Catimor while maintaining strong rust resistance. Increasingly popular as a climate-resilient replacement for Caturra in Central America.",
    specs_en: [
        {k:'Parentage',v:'Sarchimor (Timor Hybrid × Villa Sarchi)'},
        {k:'Developed by',v:'CIRAD (France) + PROMECAFE, 1980s'},
        {k:'Disease resistance',v:'High — good rust and coffee berry borer resistance'},
        {k:'Altitude',v:'1,000–2,000 m'},
        {k:'Key origins',v:'Nicaragua, Costa Rica, Honduras, Guatemala'},
        {k:'Flavor profile',v:'Red fruit, mild acidity, caramel sweetness — better than Catimor'}
    ],
    origin_en: [
        {year:'1980s',text:'CIRAD and PROMECAFE develop Marsellesa as a disease-resistant alternative with better cup quality than Catimor.'},
        {year:'1990s',text:'Distributed to Central American research stations; evaluated alongside Catimor and Caturra in regional variety trials.'},
        {year:'2000s',text:'Rust epidemic accelerates adoption — farms seeking disease resistance with better cup quality than Catimor turn to Marsellesa.'},
        {year:'Today',text:'Nicaragua in particular has embraced Marsellesa as a commercial specialty variety — it scores significantly higher than Catimor at equivalent altitudes.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Notes',
    tips_en: [
        {icon:'🛡️',title:'Best of both worlds',desc:'Marsellesa bridges the gap between Catimor (resistant but mediocre) and Caturra (delicious but vulnerable). Resistance + quality in one plant.'},
        {icon:'🇳🇮',title:'Nicaragua success story',desc:"Nicaragua's best specialty lots often feature Marsellesa — it thrives at the mid-altitude ranges common in Nicaragua's coffee-growing regions."},
        {icon:'🔄',title:'Caturra replacement candidate',desc:'As leaf rust makes Caturra farming harder, Marsellesa is increasingly the recommended replacement — similar cup profile, far better disease resistance.'},
        {icon:'☕',title:'Versatile roasting',desc:'Marsellesa roasts predictably across light to medium ranges. Its cup quality at medium roast rivals well-grown Caturra.'},
        {icon:'🌍',title:'Climate adaptation',desc:"In a warming world with more disease pressure, Marsellesa's combination of resistance and quality may make it one of the most important varieties of the 2030s."}
    ]
});

injectEn('ENCY_VAR_CENTRO', {
    tagline_en: 'WCR F1 hybrid — engineered for the future of coffee',
    subtitle_en: "Centroamericano (H1) is an F1 hybrid developed by World Coffee Research (WCR) crossing the Ethiopian variety Rume Sudan with T5296 (a Sarchimor). F1 hybrids demonstrate 'hybrid vigor' — out-yielding both parents while maintaining excellent cup quality. The scientific future of specialty coffee varieties.",
    specs_en: [
        {k:'Parentage',v:'Rume Sudan × T5296 (Sarchimor)'},
        {k:'Developed by',v:'CATIE / WCR, 2010s'},
        {k:'Plant type',v:'F1 hybrid (heterosis / hybrid vigor)'},
        {k:'Yield advantage',v:'30–40% more than Bourbon or Caturra'},
        {k:'Disease resistance',v:'Good — better than Caturra'},
        {k:'Key origins',v:'Nicaragua, Honduras, Mexico, Guatemala (pilot farms)'}
    ],
    origin_en: [
        {year:'2000s',text:"CATIE (Costa Rica) and WCR begin systematic F1 hybrid development — applying techniques from grain breeding to coffee for the first time."},
        {year:'2012',text:'Centroamericano (H1) selected as the most promising F1 hybrid from extensive Central American variety trials.'},
        {year:'2015',text:'First commercial Centroamericano harvests — cup scores of 85–90 alongside 30%+ yield advantage attract farmer interest.'},
        {year:'Today',text:'WCR continues F1 hybrid programs. Centroamericano is planting across Central America; distribution limited by need for tissue-culture propagation.'}
    ],
    originTitle_en: '📜 Variety Development',
    tipsTitle_en: '🍒 Notes & Future',
    tips_en: [
        {icon:'🧬',title:'Hybrid vigor',desc:"F1 hybrids inherit the best traits from both parents — higher yield, better disease resistance, good cup quality. Like hybrid corn transformed agriculture, F1 hybrids could transform coffee."},
        {icon:'🔬',title:'Cannot be saved as seed',desc:'F1 hybrids must be produced through controlled crossing or tissue culture each generation — they cannot be propagated from seeds like traditional varieties. This requires infrastructure.'},
        {icon:'🌍',title:'Climate change solution',desc:"Centroamericano's resilience traits are critical as climate change shrinks viable coffee-growing areas. Higher altitude + disease resistance + yield = survival."},
        {icon:'📊',title:'Quality benchmark',desc:'First Centroamericano Cup of Excellence entries scored 85–89 — competitive with quality Caturra and better than Catimor. The flavor potential is strong.'},
        {icon:'🔮',title:'The future is F1',desc:"By 2040, WCR projects F1 hybrids could cover 10–20% of specialty coffee production. Centroamericano is just the beginning of coffee's genomic breeding era."}
    ]
});

injectEn('ENCY_VAR_TABI', {
    tagline_en: "Colombia's disease-resistant upgrade — better than Castillo",
    subtitle_en: "Tabi (meaning 'good' in the Guambiano indigenous language) was developed by CENICAFÉ and released in 2002. A Timor Hybrid × Typica × Bourbon cross, it maintains excellent rust resistance while achieving cup quality that significantly exceeds Castillo. It's the specialty-first disease-resistant variety Colombia needed.",
    specs_en: [
        {k:'Parentage',v:'Timor Hybrid × (Typica × Bourbon)'},
        {k:'Developed by',v:'CENICAFÉ, Colombia, released 2002'},
        {k:'Disease resistance',v:'Good — resistant to most leaf rust races'},
        {k:'Plant height',v:'Tall (like Typica) — challenging for mechanization'},
        {k:'Key origins',v:'Colombia (specialty lots)'},
        {k:'Flavor profile',v:'Fruit sweetness, caramel, Bourbon-like complexity — markedly better than Castillo'}
    ],
    origin_en: [
        {year:'1980s–2000s',text:'CENICAFÉ develops Tabi alongside Castillo — seeking a rust-resistant variety that preserves Bourbon and Typica flavor characteristics.'},
        {year:'2002',text:'Tabi officially released. Named in honor of the Guambiano indigenous community in Cauca, Colombia.'},
        {year:'2010s',text:'Specialty roasters discover Tabi — its cup quality notably exceeds Castillo and approaches pure Bourbon. Premium Tabi lots appear at CoE.'},
        {year:'Today',text:'Tabi is grown on a smaller scale than Castillo — its tall plant is harder to manage — but specialty farms prize it for quality over convenience.'}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '🍒 Flavor & Notes',
    tips_en: [
        {icon:'🌟',title:'Better than Castillo',desc:"Tabi consistently scores higher than Castillo in side-by-side cup evaluations — its Bourbon and Typica ancestry preserves more flavor complexity."},
        {icon:'🍒',title:'Fruit-forward profile',desc:'Tabi at medium-light roast shows red cherry, blackberry, caramel sweetness — much more in the Bourbon tradition than the rustic Castillo profile.'},
        {icon:'🏔️',title:'Altitude + Tabi = magic',desc:"High-altitude Tabi from Cauca or Nariño can approach 89–91 points — genuinely competitive with premium Caturra or Bourbon in the right conditions."},
        {icon:'📏',title:'Tall plant challenge',desc:"Tabi's tall, upright plant requires more space and labor than dwarf varieties. This is why commercial farms often prefer the more manageable Castillo."},
        {icon:'🇨🇴',title:'Colombia specialty discovery',desc:"If you see Colombian Tabi at a specialty roaster, it's worth trying — a disease-resistant variety that actually tastes like specialty coffee."}
    ]
});

injectEn('ENCY_VAR_RUIRU', {
    tagline_en: 'Kenya disease-resistant commercial variety',
    subtitle_en: "Ruiru 11 is Kenya's main disease-resistant commercial variety, developed by the Coffee Research Institute of Kenya (CORI) in the 1980s. A complex hybrid involving Bourbon, SL varieties, and Timor Hybrid, it resists Coffee Berry Disease (CBD) and leaf rust while maintaining reasonable cup quality.",
    specs_en: [
        {k:'Developed by',v:'Coffee Research Institute, Kenya (CORI), 1985'},
        {k:'Parentage',v:'Complex multi-parent hybrid including SL, Bourbon, Timor Hybrid'},
        {k:'Disease resistance',v:'High — resistant to CBD and leaf rust'},
        {k:'Plant height',v:'Dwarf compact — good for mechanization'},
        {k:'Key origins',v:'Kenya (widespread commercial planting)'},
        {k:'Flavor profile',v:'Good cup quality — less complex than SL28/SL34 but decent'}
    ],
    origin_en: [
        {year:'1960s',text:"Coffee Berry Disease (CBD) devastates Kenya's SL28 and SL34 farms — resistant germplasm urgently needed."},
        {year:'1985',text:'CORI releases Ruiru 11 — a complex multi-parent hybrid with strong CBD and rust resistance in a compact plant.'},
        {year:'1990s',text:'Rapid adoption across Kenya — especially at mid-to-low altitudes where CBD pressure is highest.'},
        {year:'Today',text:"Ruiru 11 protects Kenya's commercial viability. Higher-altitude specialty farms still prefer SL28/SL34, but Ruiru 11 is the safety net."}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '☕ Notes',
    tips_en: [
        {icon:'🛡️',title:'Disease insurance for Kenya',desc:"Without Ruiru 11, Coffee Berry Disease would have made Kenya's SL28/SL34 farms economically unviable. It's the safety net of Kenyan coffee."},
        {icon:'⚖️',title:'Quality vs SL comparison',desc:'Ruiru 11 scores 2–5 points lower than SL28 at equivalent altitude and processing — good, but not the blackcurrant intensity of SL28.'},
        {icon:'🏔️',title:'SL28 at high altitude, Ruiru below',description:'Savvy Kenyan farms plant SL28 at highest altitudes (lowest disease pressure) and Ruiru 11 at lower elevations — optimizing quality where possible.'},
        {icon:'🔬',title:'Ongoing improvement',desc:"CORI continues developing new Batian and Ruiru selections. Ruiru 11 marked Kenya's first success; Batian (2010) is the next step in quality improvement."}
    ]
});

injectEn('ENCY_VAR_BATIAN', {
    tagline_en: 'Kenya 2010 — pure Arabica disease resistance breakthrough',
    subtitle_en: "Batian (named after Mount Kenya's highest peak) was released by CORI in 2010 as an improvement over Ruiru 11. The key difference: Batian is a pure Arabica selection rather than a Timor Hybrid cross, meaning it achieves rust resistance through traditional Arabica genetics with significantly better cup quality.",
    specs_en: [
        {k:'Developed by',v:'Coffee Research Institute, Kenya (CORI), released 2010'},
        {k:'Parentage',v:'Pure Arabica multi-parent selection (no Timor Hybrid)'},
        {k:'Disease resistance',v:'Good — resistant to CBD and leaf rust'},
        {k:'Plant height',v:'Medium-tall'},
        {k:'Named after',v:"Mount Kenya's highest peak (Batian, 5,199 m)"},
        {k:'Flavor profile',v:'Significantly better than Ruiru 11 — approaches SL28 quality'}
    ],
    origin_en: [
        {year:'1990s',text:'CORI researchers identify that using pure Arabica crosses (rather than Timor Hybrid introgression) could yield better cup quality with disease resistance.'},
        {year:'2010',text:'Batian officially released — the first Kenyan disease-resistant variety without Robusta genes. Cup quality jumps significantly vs Ruiru 11.'},
        {year:'2012–15',text:'Batian distribution to Kenyan farmers begins. Specialty community notes scores of 85–89 — between Ruiru 11 and SL28 quality levels.'},
        {year:'Today',text:"Batian represents Kenya's most sophisticated breeding achievement — disease resistance + genuine specialty quality potential."}
    ],
    originTitle_en: '📜 Variety History',
    tipsTitle_en: '☕ Notes',
    tips_en: [
        {icon:'🏔️',title:"Named after the peak",desc:"Mount Kenya's Batian peak is Kenya's highest. Naming Kenya's best coffee variety after it signals ambition — matching the quality of the mountain's stature."},
        {icon:'🔬',title:'Pure Arabica advantage',desc:"Unlike Ruiru 11 (which has Timor Hybrid/Robusta genes), Batian is pure Arabica — no 'rustic' Robusta flavor notes in the cup."},
        {icon:'📊',title:'Quality steps',desc:"Kenya's variety quality hierarchy: SL28 (best) > SL34 > Batian > Ruiru 11. Batian closes most of the gap between Ruiru 11 and SL28."},
        {icon:'🌍',title:'Model for the future',desc:"Batian shows that disease resistance can be bred into pure Arabica without Robusta introgression — a blueprint for future breeding programs globally."}
    ]
});

injectEn('ENCY_VAR_74110', {
    name_en: '74110 / 74112',
    tagline_en: "JARC Ethiopia selections — the Yirgacheffe standard",
    subtitle_en: "74110 and 74112 are JARC (Jimma Agricultural Research Centre) selections released in the 1970s from wild Ethiopian coffee. These two varieties define the Yirgacheffe washed flavor profile — jasmine, bergamot, lemon, and clean floral tea — that made Ethiopian coffee world-famous in the specialty era.",
    specs_en: [
        {k:'Developed by',v:'JARC (Jimma Agricultural Research Centre), Ethiopia, 1970s'},
        {k:'Selection basis',v:'Wild Ethiopian heirloom germplasm'},
        {k:'Key regions',v:'Yirgacheffe, Gedeo Zone, SNNPR'},
        {k:'Processing',v:'Washed (floral) — the standard for these varieties'},
        {k:'Flavor profile',v:'Jasmine, bergamot, lemon verbena, clean floral tea'},
        {k:'Commercial status',v:'Dominant in Yirgacheffe cooperative lots'}
    ],
    origin_en: [
        {year:'1967',text:'JARC established in Jimma — the first systematic research into Ethiopian coffee genetics and agronomy.'},
        {year:'1974',text:'74110 and 74112 selections released from wild Ethiopia heirloom screening — selected for yield, cup quality, and adaptation to Yirgacheffe altitude.'},
        {year:'1980s',text:'Widespread adoption in Yirgacheffe cooperatives; washed processing standardizes the jasmine-lemon flavor profile.'},
        {year:'2000s',text:'Third Wave specialty coffee discovers Yirgacheffe washed 74110/74112 — it becomes the benchmark for floral coffee worldwide.'},
        {year:'Today',text:'When you drink a Yirgacheffe washed coffee, you are almost certainly tasting 74110/74112 or a close relative.'}
    ],
    originTitle_en: '📜 Variety & History',
    tipsTitle_en: '🍒 Flavor & Brew Tips',
    tips_en: [
        {icon:'🌸',title:'The floral benchmark',desc:"Washed 74110/74112 from Yirgacheffe is the global reference for floral coffee. Nothing else consistently delivers jasmine–bergamot–lemon at this intensity."},
        {icon:'🫖',title:'Brew like flower tea',desc:'Light roast at 91–93°C + Hoffmann method = translucent amber liquid with intense jasmine aroma. This is what floral coffee is supposed to taste like.'},
        {icon:'🇪🇹',title:'Ethiopian cooperative system',desc:"Most 74110/74112 is sold through Ethiopian cooperative systems (Yirgacheffe Coffee Farmers Cooperative Union). Supporting cooperatives means supporting the farmers."},
        {icon:'🌍',title:'Changed specialty coffee',desc:"Yirgacheffe washed coffee was the variety/origin that convinced the Third Wave that coffee could taste like flowers and fruit — fundamentally changing expectations."}
    ]
});

injectEn('ENCY_VAR_LIBERICA', {
    tagline_en: 'Third commercial species — woody, smoky, jackfruit character',
    subtitle_en: "Coffea liberica (including Excelsa, now classified as C. liberica var. dewevrei) is the third commercially significant coffee species after Arabica and Robusta. Originating in Liberia, it produces large, asymmetrical beans with a distinctive woody, smoky, and jackfruit-like flavor that polarizes drinkers. Dominant in the Philippines and parts of Southeast Asia.",
    specs_en: [
        {k:'Scientific name',v:'Coffea liberica (+ var. dewevrei / Excelsa)'},
        {k:'Origin',v:'Liberia, West Africa'},
        {k:'Bean shape',v:'Large, asymmetrical, irregular'},
        {k:'Altitude',v:'Sea level to 700 m (lowland specialist)'},
        {k:'Key producers',v:'Philippines, Malaysia, Ivory Coast'},
        {k:'Flavor profile',v:'Woody, smoky, jackfruit, full body, unique'}
    ],
    origin_en: [
        {year:'1860s',text:'Coffea liberica described by botanists in Liberia — immediately valued for its lowland tolerance when leaf rust was destroying highland Arabica.'},
        {year:'1875',text:'Liberia devastates by leaf rust — British colonies turn to Liberica as a replacement for Arabica plantations.'},
        {year:'Early 1900s',text:'Liberica introduced to Philippines, Malaysia, and Dutch Indonesia as a commercial alternative to disease-prone Arabica.'},
        {year:'Today',text:"Philippines' Kapeng Barako (strong coffee) is Liberica — a beloved national institution. International specialty interest is slowly growing for its unique profile."}
    ],
    originTitle_en: '📜 Species History',
    tipsTitle_en: '☕ Flavor Notes',
    tips_en: [
        {icon:'🌳',title:'Like nothing else',desc:"Liberica tastes unlike Arabica or Robusta — woody, smoky, jackfruit and stone fruit notes create a completely unique sensory experience. Love it or hate it."},
        {icon:'🇵🇭',title:'Philippines national treasure',desc:"Kapeng Barako (Liberica espresso) is a Filipino cultural institution — intense, full-bodied, smoky. It's the taste of traditional Filipino coffee culture."},
        {icon:'💪',title:'Low altitude champion',desc:"While Arabica requires 800–2,000m, Liberica thrives at sea level — making it irreplaceable in flat tropical regions where Arabica can't survive."},
        {icon:'🔬',title:'Excelsa reclassification',desc:"Excelsa (formerly Coffea excelsa) was reclassified as Liberica var. dewevrei. They share the unusual fruit-forward, woody profile but Excelsa is slightly more acidic."},
        {icon:'🌍',title:'Climate change backup',desc:"As global warming makes high-altitude Arabica growing harder, Liberica's heat tolerance is being studied as a potential climate adaptation crop."}
    ]
});

// ── WRITE ──────────────────────────────────────────────────────────────────────
if (hasCRLF) h = h.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, h, 'utf8');
console.log('\n✅ patch_ency_1.js done (Part A + History + Variety)');
