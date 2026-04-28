// patch_ency_3.js — Dripper (10) + Brew (7) + Method (9) EN content
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

// ── DRIPPER ───────────────────────────────────────────────────────────────────

injectEn('ENCY_SVG_V60', {
    tagline_en: 'Japanese fluid dynamics masterpiece — the most versatile cone dripper',
    subtitle_en: '60° cone + spiral ribs + large single hole = maximum extraction control. Every pour temperature, rhythm, and water flow directly affects the cup. The most expressive and demanding dripper in specialty coffee.',
    specs_en: [
        {k:'Developer',v:'Hario Co., Ltd. (Japan)'},
        {k:'Launch year',v:'2005'},
        {k:'Dripper angle',v:'60° cone'},
        {k:'Drain hole',v:'Large single hole (~18mm diameter)'},
        {k:'Dose range',v:'15–25g (single) / 30–40g (double)'},
        {k:'Brew ratio',v:'1:15 ~ 1:17'}
    ],
    origin_en: [
        {year:'2004',text:"Hario's engineering team develops V60 around the principle of 'maximum control for the brewer' — inspired by Japanese traditional ceramics and fluid dynamics."},
        {year:'2005',text:'V60 officially launched. The name = V-shape + 60° angle. Initial release in ceramic and glass.'},
        {year:'2010',text:'World Brewers Cup founded — V60 becomes the most-used dripper among champions. Global specialty community embraces it.'},
        {year:'2016',text:"Japanese barista Tetsu Kasuya wins WBrC with the 4:6 method + V60. His public tutorial sparks a worldwide home-brewing V60 phenomenon."},
        {year:'Today',text:'Available in ceramic, glass, plastic, metal, and copper. From home kitchens to World Brewers Cup stages worldwide.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Fold filter + rinse',desc:'Fold along the seam and seat in V60. Pour hot water to rinse paper taste and pre-heat the dripper and server. Discard rinse water.'},
        {title:'Grind + weigh',desc:'Medium grind (Comandante 22–25 clicks). 15–20g for single cup. 1:15–1:16 ratio.'},
        {title:'Bloom',desc:'First pour: 2× coffee weight (30–40g), spiral from center outward. Wait 30–45 seconds for CO₂ release and bed to rise.'},
        {title:'Pours',desc:'Continue in concentric circles center-out, staying within the inner 70% of the bed. New brewers: 2–3 pours, 30-second intervals.'},
        {title:'Target 2:30–3:30',desc:'Under 2 min = underextracted (grind finer). Over 4 min = overextracted (grind coarser). After draining, gently swirl and smell the dry aroma.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'💧',title:'Thin vs thick stream',desc:'Thin stream (gooseneck) = even extraction, clean acidity. Thick stream = turbulence, heavier body. Same beans, dramatically different cups.'},
        {icon:'🌡️',title:'Temperature controls acid-sweet',desc:'94°C pulls acidity and aroma. 92°C = balance. 88–90°C softens acid and amplifies sweetness. Light roast: higher; dark roast: lower.'},
        {icon:'🚫',title:'Never hit the filter wall',desc:'Pouring onto the paper creates channeling — water bypasses the coffee bed. Stay within the inner 70% of the bed at all times.'},
        {icon:'⚖️',title:'Watch the bloom',desc:'No bloom = old beans or low temperature. Vigorous overflow bloom = beans too fresh (rest 7–14 days after roast).'},
        {icon:'🎯',title:'First pour decides 70%',desc:'The first 60 seconds of extraction determine approximately 70% of the final cup direction. The first pour is not optional practice — it is the most important moment.'}
    ]
});

injectEn('ENCY_SVG_KALITA', {
    tagline_en: 'Flat-bottom + 3-hole + wave filter — most forgiving cone dripper',
    subtitle_en: 'The flat bottom + 3 small holes + wave filter triangle gives the most stable, predictable extraction results. High margin for error — the top choice for beginners and consistency-focused brewers.',
    specs_en: [
        {k:'Developer',v:'Kalita Co., Ltd. (Japan)'},
        {k:'Dripper style',v:'Flat bottom, 3 small holes'},
        {k:'Filter type',v:'Wave (accordion-fold) paper filter'},
        {k:'Dose range',v:'15–25g (single) / 25–40g (double)'},
        {k:'Brew ratio',v:'1:15 ~ 1:16'},
        {k:'Key advantage',v:'Even extraction regardless of pour consistency'}
    ],
    origin_en: [
        {year:'1958',text:'Kalita founded in Japan. Their early drippers were trapezoidal (similar to Melitta) before developing the flat-bottom wave design.'},
        {year:'2010',text:'Kalita Wave dripper and stainless steel 185/155 versions launched — the wave filter becomes the defining innovation.'},
        {year:'2012',text:'Kalita Wave gains international adoption after multiple WBrC competitors use it — praised for consistent extraction.'},
        {year:'Today',text:'The Kalita Wave is the gold standard for brewers who prioritize consistency over control. Most specialty cafés stock it as their reliable daily driver.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Rinse wave filter',desc:'Place wave filter in Kalita. Pour hot water to rinse and pre-heat. Discard rinse water.'},
        {title:'Grind medium',desc:'Medium grind. 15–20g for single. 1:15–1:16 ratio.'},
        {title:'Bloom 30–45 seconds',desc:'2× coffee weight water, spiral pour. Wait 30–45 seconds for CO₂ release.'},
        {title:'Pour in circles',desc:'Pour in concentric circles over the flat bed. The 3-hole drain is self-regulating — no need to rush or slow down between pours.'},
        {title:'Total 2:30–3:30',desc:'Kalita is very forgiving — if the time is slightly off, the result is still good. Just aim for even saturation of the flat bed.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'⚖️',title:'Forgiving by design',desc:"The flat bottom ensures water doesn't flow unevenly to one side — the 3 small holes self-regulate flow speed. Imperfect pours still produce good results."},
        {icon:'🍫',title:'Sweeter and rounder',desc:'Kalita produces a slightly sweeter, rounder cup than V60 — the flat bed and restricted flow increase contact time and body.'},
        {icon:'☕',title:'Best for medium roast',desc:'Kalita shines with medium and medium-dark roasts — the extended contact time integrates the sweetness and body beautifully.'},
        {icon:'🌀',title:'Center pour works well',desc:"Unlike V60, Kalita Wave responds well to center-heavy pouring — the flat bed distributes water evenly without relying on precise spiral technique."},
        {icon:'🔧',title:'Three sizes',desc:'Kalita Wave 155 (1–2 cups) and 185 (2–4 cups). Stainless steel version recommended for durability.'}
    ]
});

injectEn('ENCY_SVG_ORIGAMI', {
    tagline_en: 'Origami folding design — works with flat or cone filters',
    subtitle_en: 'The Origami Dripper from Trunk Coffee Lab (Japan) features a distinctive origami-folded interior that creates air channels between the paper and dripper wall. It accepts both conical and flat-bottom wave filters — giving the brewer maximum flexibility. A competition favorite for its distinctive aesthetics and clean cups.',
    specs_en: [
        {k:'Developer',v:'Trunk Coffee Lab (Japan)'},
        {k:'Filter compatibility',v:'Conical (V60-style) or flat-bottom (Kalita Wave-style)'},
        {k:'Material',v:'Mino ceramic (classic), resin, metal'},
        {k:'Drain hole',v:'Large single hole (with conical) or flat base (with wave filter)'},
        {k:'Brew ratio',v:'1:15 ~ 1:16'},
        {k:'Key advantage',v:'Filter flexibility + stunning aesthetics'}
    ],
    origin_en: [
        {year:'2019',text:'Trunk Coffee Lab in Nagoya, Japan launches the Origami Dripper — inspired by the Japanese paper-folding art of origami.'},
        {year:'2019',text:'Wins multiple design awards and is used in WBrC Japan competition — instant international attention.'},
        {year:'2020',text:'International distribution established — becomes popular across Asia, Europe, and North America for home and café use.'},
        {year:'Today',text:'One of the most recognizable specialty coffee accessories — the origami pleats and Mino ceramic glazes are visually distinctive.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Choose your filter',desc:'Conical filter (V60-style) for brighter, more transparent cup. Wave filter (Kalita-style) for rounder, sweeter cup. The choice significantly affects flavor.'},
        {title:'Rinse and pre-heat',desc:'Rinse the filter, pre-heat the Origami and server.'},
        {title:'Bloom',desc:'2× coffee weight water, 30–45 second wait.'},
        {title:'Pour',desc:'Technique depends on filter choice: conical = V60 spiral technique; wave = Kalita center pour technique.'},
        {title:'Enjoy the flexibility',desc:'Try the same beans with both filter types to understand how filter shape affects extraction. This is the Origami experiment.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🎭',title:'Two drippers in one',desc:'The Origami is actually two drippers: use with a conical filter and it behaves like a V60; use with wave filter and it behaves like a Kalita Wave.'},
        {icon:'🎨',title:'Stunning aesthetics',desc:'Mino ceramic Origami in traditional Japanese glazes (tenmoku, shino, oribe) are beautiful objects. Many collectors buy multiple colors.'},
        {icon:'☕',title:'Competition use',desc:'Multiple WBrC champions have used Origami — its flexibility allows brewers to optimize for specific beans and processing styles.'},
        {icon:'🔬',title:'Filter comparison tool',desc:"Use the Origami to compare how the same coffee tastes through different filter types — the best way to understand filter's role in extraction."},
        {icon:'💡',title:'Conical for light roast',desc:'Conical filter with Origami tends to produce brighter, more transparent cups — ideal for light roast single origin. Wave filter for medium roast body.'}
    ]
});

injectEn('ENCY_SVG_CHEMEX', {
    tagline_en: 'Hourglass glass beauty — thick bonded filter, sweet and clean',
    subtitle_en: "The Chemex (1941) is half scientific flask, half design icon. Its thick bonded paper filter (20–30% thicker than V60) removes virtually all oils and fine particles — producing an exceptionally clean, sweet, and light-bodied cup. MoMA collection member. The coffee maker that made pour-over look like art.",
    specs_en: [
        {k:'Inventor',v:'Peter Schlumbohm, USA, 1941'},
        {k:'Filter thickness',v:'20–30% thicker than V60 — removes more oils'},
        {k:'Brew capacity',v:'3-cup (450mL) / 6-cup (900mL) / 8-cup (1200mL)'},
        {k:'Material',v:'Borosilicate glass + wood collar + leather tie'},
        {k:'Brew ratio',v:'1:15 ~ 1:17'},
        {k:'MoMA collection',v:'Permanent collection of the Museum of Modern Art, New York'}
    ],
    origin_en: [
        {year:'1941',text:"German-American chemist Peter Schlumbohm invents the Chemex in New York — inspired by laboratory Erlenmeyer flasks and Bauhaus design principles."},
        {year:'1958',text:'Chemex named one of the 100 best designed products of modern times by the Illinois Institute of Technology.'},
        {year:'1960s',text:'Jackie Kennedy is reported to own a Chemex. It becomes associated with mid-century modern American design.'},
        {year:'Today',text:"Chemex appears in Breaking Bad, Twin Peaks, and James Bond (Skyfall) — perhaps the most culturally present coffee maker in film and television."}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Open and seat filter',desc:'Open the bonded square filter with 3 layers on the pour spout side. Rinse thoroughly (the thick paper needs more rinsing than regular filters).'},
        {title:'Grind medium-coarse',desc:'The thick filter restricts flow — grind slightly coarser than V60 (Comandante 25–28 clicks). 30–40g for a 6-cup Chemex.'},
        {title:'Extended bloom',desc:'The thick filter slows blooming — allow 45–60 seconds for bloom. More CO₂ needs time to escape through the denser paper.'},
        {title:'Pour slowly',desc:'The Chemex is designed for unhurried pouring. Total brew time 4–6 minutes. The restriction is the feature, not the bug.'},
        {title:'Serve immediately',desc:'Chemex coffee at proper temperature is extraordinary. Pour into pre-heated cups immediately for best experience.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'✨',title:'Cleanest cup possible',desc:"Chemex produces the sweetest, cleanest pour-over cup of any filter method — the thick bonded paper removes nearly all oils and micro-fines."},
        {icon:'🎨',title:'Design icon',desc:"The Chemex is in the MoMA permanent collection. Brewing with it is an aesthetic experience — it makes coffee look and feel like an art practice."},
        {icon:'☕',title:'Best for light roast',desc:'The Chemex thick filter amplifies the clean, tea-like qualities of light roast single origin. Dark roast in a Chemex loses the body you want.'},
        {icon:'🍵',title:'Honey and sweetness',desc:"Chemex-filtered coffee reveals the natural sweetness of high-quality beans — the oil removal makes the honey and caramel notes more apparent."},
        {icon:'⏱️',title:'Slow is good',desc:"Don't rush a Chemex. The thick filter restriction is intentional — 4–6 minute brew time produces a sweet, complex cup you can't achieve faster."}
    ]
});

injectEn('ENCY_SVG_CLEVER', {
    tagline_en: 'Full immersion + release valve — steeping simplicity, consistent results',
    subtitle_en: "The Clever Dripper combines full immersion brewing (like French Press) with clean paper filtration. A silicone valve at the bottom seals during brewing; placing it on a cup releases the coffee. No pour technique needed — just stir, steep, and release. The most beginner-friendly quality brew method.",
    specs_en: [
        {k:'Developer',v:'Clever Coffee Dripper Co. (Taiwan)'},
        {k:'Brew method',v:'Full immersion (steep) + paper filter release'},
        {k:'Release valve',v:'Silicone seal opens when placed on cup'},
        {k:'Dose range',v:'18–22g (for standard model)'},
        {k:'Brew ratio',v:'1:14 ~ 1:16'},
        {k:'Skill requirement',v:'Very low — immersion method eliminates pour technique'}
    ],
    origin_en: [
        {year:'2009',text:'Clever Coffee Dripper launched by a Taiwanese company — designed specifically to eliminate pour technique as a variable in coffee brewing.'},
        {year:'2010',text:'Adopted by specialty cafés worldwide for training and quality control — consistent immersion method allows reliable flavor calibration.'},
        {year:'Today',text:'The Clever remains the go-to recommendation for beginners and for training baristas to identify flavor variables independent of pour technique.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Rinse filter',desc:'Place paper filter in Clever and rinse with hot water. The valve prevents water from draining through — it pools in the Clever. Pour it out manually.'},
        {title:'Add coffee and water',desc:'Add 18–22g medium grind. Pour full water amount (250–330g) all at once. Stir 4–6 times to ensure even saturation.'},
        {title:'Steep',desc:'Cover and steep: 2–3 minutes for medium-dark roast; 3–4 minutes for light roast.'},
        {title:'Release',desc:'Place Clever directly on your cup — the weight opens the valve and coffee flows through the paper filter. Takes 30–60 seconds.'},
        {title:'Enjoy',desc:'Clean, consistent cup without any pour technique. Adjust steep time to taste.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🎓',title:'Beginner perfect',desc:"The Clever produces quality coffee without requiring any pour technique — anyone can use it correctly on the first attempt."},
        {icon:'🔬',title:'Ideal for tasting',desc:'Immersion brewing removes pour technique as a variable — useful for tasting bean quality, processing, or roast differences without technique interference.'},
        {icon:'⏱️',title:'Steep time is your dial',desc:'Under-steeped = thin, weak. Over-steeped = over-extracted, bitter. 3–4 minutes light roast and 2–3 minutes medium roast are reliable starting points.'},
        {icon:'🔄',title:'Stir matters',desc:"A 4–6 revolution stir immediately after pouring is the only technique required. Even this should be gentle — aggressive stirring increases extraction speed."},
        {icon:'☕',title:'Hybrid approach',desc:'Try 2-minute immersion then place on cup and allow to drain slowly — this creates a hybrid immersion-percolation cup similar to Hario Switch.'}
    ]
});

injectEn('ENCY_SVG_SWITCH', {
    tagline_en: 'Hario Switch — toggle between immersion and percolation',
    subtitle_en: "The Hario Switch is a V60 with a silicone valve at the bottom — allowing the brewer to switch between full immersion mode (valve closed, like Clever) and percolation mode (valve open, like V60). One dripper, two extraction philosophies. Maximum flexibility for experienced brewers.",
    specs_en: [
        {k:'Developer',v:'Hario Co., Ltd. (Japan)'},
        {k:'Based on',v:'V60 cone geometry with added bottom valve'},
        {k:'Modes',v:'Immersion (valve closed) + Percolation (valve open)'},
        {k:'Filter type',v:'Standard V60 paper filters'},
        {k:'Dose range',v:'15–22g'},
        {k:'Brew ratio',v:'1:15 ~ 1:16'}
    ],
    origin_en: [
        {year:'2019',text:"Hario launches the Switch as a response to immersion dripper popularity — leveraging V60's existing cone geometry with an added valve mechanism."},
        {year:'2020',text:'Switch gains rapid adoption in specialty cafés for its versatility — allows cafés to produce both immersion-style and percolation-style cups with one tool.'},
        {year:'Today',text:'Popular for advanced home brewing and coffee education — the toggle feature makes it easy to demonstrate the difference between brewing methods.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Close valve',desc:'Ensure the valve is closed (horizontal position). This creates the immersion chamber.'},
        {title:'Rinse and add coffee',desc:'Rinse V60 paper. Add 15–22g medium grind.'},
        {title:'Add water and steep',desc:'Pour full water amount. Steep 2–3 minutes (adjust to taste).'},
        {title:'Open valve',desc:'After steep, open the valve (vertical position). Coffee drains through the V60 paper — filter removes oils.'},
        {title:'Experiment',desc:'Try: all-immersion (close → steep → open → drain). Or hybrid: bloom in immersion, pour in percolation mode. Infinite variations.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🔄',title:'Two methods in one',desc:'Close valve = Clever-style immersion. Open valve = V60-style percolation. Mix the modes: bloom closed, pour open — creates hybrid that is both clean and sweet.'},
        {icon:'🎓',title:'Best for learning',desc:"The Switch is the best teaching tool in coffee — toggling between modes lets you taste exactly how brewing method affects flavor using identical beans."},
        {icon:'☕',title:'Light roast specialist',desc:"Immersion mode with the Switch is exceptional for very light roasts — the extended contact time extracts more from dense, hard-to-extract beans."},
        {icon:'🌡️',title:'Lower temperature for immersion',desc:'When using immersion mode, lower water temperature 1–2°C vs percolation — the extended contact compensates for reduced temperature.'},
        {icon:'🔬',title:'Bloom immersion technique',desc:"Popular pro technique: bloom closed for 60 seconds, then open. The immersion bloom extracts more CO₂ and creates more even saturation than open bloom."}
    ]
});

injectEn('ENCY_SVG_OREA', {
    tagline_en: 'Precision engineered — multi-filter compatible, rapid flow design',
    subtitle_en: "The Orea (UK) is designed around one principle: maximum extraction clarity with minimum restriction. A wide-body design accepts multiple filter types (flat-bottom wave or conical), has no ribs to restrict flow, and uses a large open base. Engineered for advanced brewers who want complete control over extraction speed.",
    specs_en: [
        {k:'Developer',v:'Orea (UK)'},
        {k:'Filter compatibility',v:'Flat-bottom (Kalita Wave) or cone (V60)'},
        {k:'Material',v:'PETG plastic, anodized aluminum, or titanium'},
        {k:'Key design',v:'No restrictive ribs — open body for rapid flow'},
        {k:'Dose range',v:'15–25g'},
        {k:'Skill level',v:'Advanced — fast flow requires precise pour control'}
    ],
    origin_en: [
        {year:'2020',text:'Orea V3 launched by UK-based coffee equipment company — designed explicitly for competition and advanced home brewing.'},
        {year:'2021',text:'Orea V4 released with improved filter compatibility. Gains cult following among specialty coffee enthusiasts and competition baristas.'},
        {year:'Today',text:'Orea is the precision instrument of the dripper world — chosen by brewers who want maximum control and are comfortable with fast-flow challenges.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Choose filter',desc:'Flat-bottom filter = sweeter, rounder. Cone filter = cleaner, brighter. The Orea amplifies filter character more than other drippers.'},
        {title:'Fast grind adjustment',desc:'Orea flows faster than V60 or Kalita — you may need to grind finer than usual to hit target brew time.'},
        {title:'Pour precisely',desc:'No ribs means water flows where you pour it. Precise center-out spirals required. Water slipping to the edge causes severe channeling.'},
        {title:'Target 2:00–2:45',desc:'Orea brews faster than V60. Shorter brew time — compensate with finer grind or cooler water.'},
        {title:'Taste and adjust',desc:'Orea is sensitive to recipe changes. Adjust one variable at a time: grind, temperature, flow rate, or filter type.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'⚡',title:'Fastest dripper',desc:"Orea's open design creates the fastest flow rate of any dripper — which requires finer grind or slower pour to compensate. The speed is the feature."},
        {icon:'🎯',title:'Precision required',desc:'Unlike Kalita (forgiving) or Clever (fool-proof), Orea punishes imprecise technique. Perfect for advanced brewers; challenging for beginners.'},
        {icon:'🔬',title:'Filter type amplified',desc:"Orea amplifies filter character more than other drippers — the difference between cone and flat-bottom filters is most obvious in an Orea."},
        {icon:'🏆',title:'Competition standard',desc:'Multiple World Brewers Cup competitors use Orea — its precision and control ceiling make it ideal for competition where every variable is optimized.'},
        {icon:'💡',title:'Try both filter types',desc:"The Orea's filter flexibility is its main advantage — use it to discover which filter type you prefer before buying a dedicated single-filter dripper."}
    ]
});

injectEn('ENCY_SVG_APRIL', {
    tagline_en: 'Denmark precision design — ultra-thin filter, competition-grade brewing',
    subtitle_en: "The April Brewer from Copenhagen uses an ultra-thin proprietary filter paper that provides minimal flow restriction. Designed by Danish specialty coffee professionals for maximum extraction clarity and brightness. The aesthetic is minimalist Scandinavian design; the performance is competition-grade.",
    specs_en: [
        {k:'Developer',v:'April (Copenhagen, Denmark)'},
        {k:'Filter type',v:'Proprietary ultra-thin April paper filters'},
        {k:'Material',v:'High-quality ceramic or glass'},
        {k:'Design philosophy',v:'Minimal restriction + maximum clarity + Nordic aesthetics'},
        {k:'Brew ratio',v:'1:15 ~ 1:17'},
        {k:'Skill level',v:'Intermediate to advanced'}
    ],
    origin_en: [
        {year:'2019',text:'April founded by Danish specialty coffee professionals — designed around the principle of maximum extraction transparency.'},
        {year:'2020',text:'April brewer released to international market. Gains immediate attention from specialty coffee community for its distinctive thin filter and clean cups.'},
        {year:'Today',text:'April is the Scandinavian specialty coffee aesthetic made physical — minimal design, maximum flavor clarity, competition-grade performance.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Rinse April filter',desc:'The thin April filter rinses faster than standard papers. One quick rinse is sufficient.'},
        {title:'Grind medium-fine',desc:'The thin filter flows faster than V60 — grind 1–2 clicks finer than V60 to hit target brew time.'},
        {title:'Bloom',desc:'30–45 second bloom. The thin filter allows rapid gas release.'},
        {title:'Pour in circles',desc:"April rewards precise circular pouring — the thin filter's fast flow requires more controlled pour technique than V60."},
        {title:'Target 2:00–3:00',desc:'April typically brews 30–60 seconds faster than equivalent V60 recipes.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🌸',title:'Maximum brightness',desc:"April's thin filter produces the brightest, most acidic cup of any filter dripper — it removes less than V60 while maintaining clarity."},
        {icon:'🎨',title:'Nordic design',desc:"April embodies Scandinavian design philosophy: function-first, aesthetic-second (but still beautiful). The ceramic glaze options are understated and elegant."},
        {icon:'☕',title:'Light roast specialist',desc:'April is best for ultra-light to light roast single origin — its brightness amplifies what light roast offers and is wasted on dark roast.'},
        {icon:'⚡',title:'Fast flow adjustment',desc:'April flows 20–30% faster than V60. First brew: grind finer than usual and adjust from there.'},
        {icon:'💡',title:'Filter sourcing',desc:'April requires proprietary filters — stock up before traveling. They are thinner and faster than any standard filter.'}
    ]
});

injectEn('ENCY_SVG_MELITTA', {
    name_en: 'Melitta Classic',
    tagline_en: '1908 original — the invention that started all pour-over coffee',
    subtitle_en: "Melitta Bentz, a German housewife, invented the paper filter and pour-over dripper in 1908. She poked holes in a tin cup and used blotting paper from her son's school notebook as a filter — creating the first paper-filtered coffee. The Melitta Classic trapezoidal dripper with its single small hole is this original invention, still sold unchanged.",
    specs_en: [
        {k:'Inventor',v:'Melitta Bentz, Dresden, Germany, 1908'},
        {k:'Dripper shape',v:'Trapezoid (cone-like, flat bottom)'},
        {k:'Drain hole',v:'Single small hole (slow flow)'},
        {k:'Wall ribs',v:'Vertical ribs on side walls'},
        {k:'Brew ratio',v:'1:14 ~ 1:16'},
        {k:'Body',v:'Full, robust — longer contact time than V60'}
    ],
    origin_en: [
        {year:'1908',text:"Melitta Bentz frustrated with coffee grounds in her cup — pokes holes in a tin cup and uses her son's school blotter paper as a filter. Paper-filtered coffee is born."},
        {year:'1909',text:'Melitta and her husband Hugo file a patent and found Melitta GmbH in Dresden. The company still exists today.'},
        {year:'1930s',text:'Melitta introduces the conical filter paper shape — the design that inspires all subsequent pour-over drippers including Hario V60.'},
        {year:'Today',text:'Melitta is the best-selling coffee filter paper brand in Europe. The original Melitta 102 dripper is still sold, unchanged, over 100 years later.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Fold and seat Melitta filter',desc:'Fold the Melitta paper along the seams — one side fold and one bottom fold — to create the trapezoid shape. Seat in Melitta dripper.'},
        {title:'Rinse and pre-heat',desc:'Rinse with hot water. The small drain hole means water drains slowly during rinse — be patient.'},
        {title:'Grind medium',desc:'Medium grind works best. The restricted single hole means longer contact time — avoid very fine grinds.'},
        {title:'Bloom and pour',desc:'Bloom 30 seconds. Pour in circles. The Melitta brews slowly — total brew time 4–5 minutes is normal.'},
        {title:'Enjoy the body',desc:'Melitta produces a full, substantial cup. Perfect for breakfast-style coffee with milk.'}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'👑',title:'The original',desc:"Every pour-over dripper in existence — V60, Chemex, Kalita, Origami — descends conceptually from Melitta's 1908 invention. It is the mother of all filter coffee."},
        {icon:'🍵',title:'Full and robust',desc:"The Melitta's slow-flow design produces a fuller, more robust cup than V60. More body, less brightness — excellent for medium to medium-dark roast."},
        {icon:'☕',title:'Best with milk',desc:'The robust body of Melitta coffee integrates beautifully with milk — this is the classic European breakfast coffee dripper.'},
        {icon:'💰',title:'Most affordable',desc:'Melitta drippers and filters are among the most widely available and affordable specialty brewing equipment in the world.'},
        {icon:'🕰️',title:'Over 100 years unchanged',desc:"The Melitta 102 dripper design has not changed since 1908. It is a rare example of a product perfect enough to never need redesigning."}
    ]
});

injectEn('ENCY_SVG_STAGG', {
    tagline_en: 'Fellow Stagg [X] — precision flat-bottom, contemporary design',
    subtitle_en: "The Fellow Stagg [X] dripper brings contemporary American design to the flat-bottom dripper category. A precision flat bed with a large single drain hole, laser-cut stainless steel filter option, and double-wall insulation for temperature stability. Designed to pair with Fellow's Stagg EKG kettle for a complete precision brewing system.",
    specs_en: [
        {k:'Developer',v:'Fellow Products (USA)'},
        {k:'Dripper style',v:'Flat-bottom, large single drain hole'},
        {k:'Filter options',v:'Paper (Kalita Wave compatible) or laser-cut stainless steel'},
        {k:'Material',v:'Ceramic or stainless steel'},
        {k:'Brew ratio',v:'1:14 ~ 1:16'},
        {k:'Key advantage',v:'Temperature stability + contemporary design aesthetics'}
    ],
    origin_en: [
        {year:'2016',text:"Fellow Products founded in San Francisco — creates the Stagg EKG kettle, the most design-forward variable temperature kettle on the market."},
        {year:'2019',text:'Fellow launches the Stagg [X] dripper to complement the EKG kettle — a complete precision brewing system with matching aesthetic.'},
        {year:'Today',text:'Fellow has become the leading contemporary coffee equipment brand in North America — the Stagg [X] is a standard recommendation alongside the EKG kettle.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Pre-heat with double-wall advantage',desc:'The double-wall ceramic Stagg [X] retains heat better than single-wall. Still rinse and pre-heat — but temperature stability is better than V60 ceramic.'},
        {title:'Paper vs metal filter',desc:'Paper filter = cleaner, sweeter (oils removed). Stainless steel filter = heavier body, more oils, French Press-adjacent. Choose based on preference.'},
        {title:'Flat-bottom technique',desc:'Pour in concentric circles across the flat bed. Center pour or full-bed coverage both work.'},
        {title:'Target 3:00–4:00',desc:'Flat bottom + single hole = medium flow rate. Similar to Kalita timing.'},
        {title:'Pair with Stagg EKG',desc:"Fellow's Stagg EKG kettle and Stagg [X] dripper are designed together — the kettle's precision temperature and flow control are optimized for this dripper."}
    ],
    originTitle_en: '📜 History',
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🌡️',title:'Temperature stability advantage',desc:"Stagg [X] double-wall ceramic retains heat better than single-wall V60 — important for longer brew times and precise temperature control."},
        {icon:'🎨',title:'Design system',desc:"Fellow's products are designed as a system — EKG kettle + Stagg [X] dripper + Fellow Opus grinder. Consistent design language across all equipment."},
        {icon:'🔩',title:'Metal filter option',desc:"The Stagg [X] stainless laser-cut filter produces a different cup from paper — try both to find your preferred texture and body level."},
        {icon:'🇺🇸',title:'North American specialty standard',desc:"Fellow has become the go-to recommendation for North American specialty coffee newcomers — their products bridge design aesthetics and functional performance."},
        {icon:'⚖️',title:'Similar to Kalita',desc:'Flat-bottom flat-bottom: Stagg [X] produces a similar cup to Kalita Wave — sweet, round, forgiving. The main differences are aesthetics and temperature stability.'}
    ]
});

// ── BREW ──────────────────────────────────────────────────────────────────────

injectEn('ENCY_SVG_POUROVER', {
    name_en: 'Pour-Over / Filter Coffee',
    tagline_en: 'Manual control over every pour — the best expression of origin and processing',
    subtitle_en: "Pour-over filter coffee is the most expressive and technically demanding brew method. Through gooseneck kettle control, pour rhythm, and temperature, every flavor layer is shaped by the brewer's hands. The defining method of Third Wave specialty coffee.",
    specs_en: [
        {k:'Extraction principle',v:'Paper filtration + gravity drip'},
        {k:'Water temperature',v:'88–95°C'},
        {k:'Grind size',v:'Medium (Comandante 22–26 clicks)'},
        {k:'Brew ratio',v:'1:15 ~ 1:17'},
        {k:'Brew time',v:'2:30 ~ 4:00'},
        {k:'Equipment threshold',v:'Low (gooseneck kettle + dripper + paper)'}
    ],
    origin_en: [
        {year:'1908',text:'Melitta Bentz in Germany invents paper filter pour-over — the origin of all filter coffee.'},
        {year:'1941',text:'Chemex hourglass glass launches in the US — pour-over gains design prestige and ritual significance.'},
        {year:'2005',text:'Hario V60 launched — the 60° cone + spiral ribs brings precision engineering to pour-over.'},
        {year:'2010',text:'World Brewers Cup established — pour-over becomes an international competitive discipline.'},
        {year:'Today',text:'Dozens of dripper designs and hundreds of techniques — the richest brewing ecosystem in specialty coffee.'}
    ],
    stepsTitle_en: '🛠️ Basic Steps',
    steps_en: [
        {title:'Choose dripper + filter',desc:"V60 for control and brightness. Kalita for consistency and sweetness. Chemex for maximum cleanliness. Match dripper to your brewing style."},
        {title:'Rinse + pre-heat',desc:'Pour hot water through the filter to remove paper taste and pre-heat the dripper and vessel.'},
        {title:'Grind medium',desc:'15–25g for 1 cup. Adjust grind to match your dripper (V60 slightly finer, Kalita medium, Chemex medium-coarse).'},
        {title:'Bloom',desc:'First pour: 2× coffee weight. Wait 30–45 seconds for CO₂ release.'},
        {title:'Pour in stages',desc:"Concentric circles, inner 70% only, don't touch the filter. Target 2:30–3:30 total time."}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🎯',title:'Temperature controls acid-sweet',desc:'94°C pulls acidity and aroma. 92°C = balance. 88–90°C softens acid and amplifies sweetness. Light roast: higher; dark roast: lower.'},
        {icon:'⚖️',title:'Grind before temperature',desc:'Sour? Grind finer. Bitter? Grind coarser. Grind adjustment has more impact per change than water temperature.'},
        {icon:'💧',title:'Water consistency first',desc:'A gooseneck kettle is the core investment — consistent, controllable water flow makes more difference than any dripper upgrade.'},
        {icon:'🚫',title:'Never hit the filter edge',desc:'Channeling (water bypassing grounds through the filter edge) is the most common pour-over mistake. Stay within the inner 70%.'},
        {icon:'📚',title:'Master one dripper first',desc:'Pick V60 or Kalita and brew 30+ cups before switching. The learning is in repetition, not equipment variety.'}
    ]
});

injectEn('ENCY_SVG_ESPRESSO', {
    name_en: 'Espresso',
    tagline_en: '9 bar pressure, 25–30 seconds — concentrated oils, sweetness and crema',
    subtitle_en: 'Espresso forces hot water through finely ground coffee at 9 atmospheres of pressure in 25–30 seconds. The result is a 30mL concentrated shot with dissolved oils (forming crema), high TDS, and intense sweetness. The foundation of café drinks: latte, cappuccino, macchiato, flat white.',
    specs_en: [
        {k:'Extraction principle',v:'High pressure (9 bar) + fine grind + hot water (93°C)'},
        {k:'Water temperature',v:'90–95°C (machine boiler dependent)'},
        {k:'Pressure',v:'9 bar (standard) / 6–15 bar (pressure profiling)'},
        {k:'Brew time',v:'25–30 seconds'},
        {k:'Output volume',v:'30mL single / 60mL double'},
        {k:'Crema',v:'CO₂ bubble + oil emulsion layer on top'}
    ],
    origin_en: [
        {year:'1884',text:"Angelo Moriondo patents the first steam-pressure coffee machine in Turin, Italy — the ancestor of modern espresso."},
        {year:'1901',text:'Luigi Bezzera improves the design, adding individual brew groups and reducing brew time to seconds.'},
        {year:'1947',text:"Achille Gaggia patents the spring-lever piston — generating 9 bar pressure for the first time. Crema is born. Gaggia's 'Crema di Caffè' transforms Italian café culture."},
        {year:'1961',text:'Faema E61 introduces the motor pump replacing manual levers — modern commercial espresso is born.'},
        {year:'Today',text:'Pressure profiling, temperature profiling, and flow control machines expand espresso into a precision craft with infinite variables.'}
    ],
    stepsTitle_en: '🛠️ How to Pull Espresso',
    steps_en: [
        {title:'Grind fine',desc:'Espresso requires fine grind (Comandante 8–12 clicks or grinder-specific fine setting). Changes of 0.5 clicks significantly affect extraction.'},
        {title:'Dose and distribute',desc:'18–20g into portafilter. Tap or use distribution tool to level the puck before tamping.'},
        {title:'Tamp evenly at 15–20kg',desc:'Level tamp, 15–20kg pressure. Uneven tamp = channeling = uneven extraction = sour/bitter in same shot.'},
        {title:'Pull shot',desc:'Lock in, start pull. Target: 36–40g output in 25–30 seconds (1:2 ratio). Adjust grind if time is off.'},
        {title:'Taste and adjust',desc:'Sour + too fast = grind finer. Bitter + too slow = grind coarser. Pale blond crema = under. Dark tiger-striped = ideal.'}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'⚡',title:'Ratio is everything',desc:'1:2 (18g in : 36g out) is the classic starting point. Ristretto = 1:1.5 (sweeter, more concentrated). Lungo = 1:3 (lighter, more bitter).'},
        {icon:'🌡️',title:'Temperature per roast',desc:'Light roast: 94–95°C. Medium: 92–93°C. Dark: 88–90°C. Higher temperature extracts more from light roast dense beans; dark roast extracts fast even at lower temp.'},
        {icon:'⚖️',title:'Grind rules',desc:"Espresso grind is the finest adjustment in coffee — 0.5 steps on a quality grinder can change extraction by 3–5 seconds. Don't adjust more than one click at a time."},
        {icon:'💎',title:'Single origin espresso',desc:'Light roast single origin espresso is the most technically demanding and most rewarding espresso experience — fruit, sweetness, and complexity without dark-roast bitterness.'},
        {icon:'🔬',title:'Pressure profiling',desc:'Advanced machines (Slayer, La Marzocca GS3, Decent) allow variable pressure during extraction — low-pressure pre-infusion then 9 bar then declining pressure. This amplifies sweetness and clarity.'}
    ]
});

injectEn('ENCY_SVG_FRENCH', {
    name_en: 'French Press',
    tagline_en: 'Full immersion + metal plunger — heavy body, oils present',
    subtitle_en: "The French Press (cafetière) uses full immersion brewing without paper filtration — a metal mesh plunger separates grounds from the brew. The result is full-bodied coffee with dissolved oils, natural sweetness, and a heavier mouthfeel than any filtered method. The simplest quality home brewing device.",
    specs_en: [
        {k:'Extraction principle',v:'Full immersion + metal mesh plunger filter'},
        {k:'Water temperature',v:'93–96°C'},
        {k:'Grind size',v:'Coarse (Comandante 28–34 clicks)'},
        {k:'Brew ratio',v:'1:12 ~ 1:15'},
        {k:'Steep time',v:'4 minutes (standard)'},
        {k:'Body character',v:'Heavy, oily, substantial — no paper filtration'}
    ],
    origin_en: [
        {year:'1929',text:"Attilio Calimani patents the first plunger-filter coffee maker in Italy — the ancestor of modern French Press."},
        {year:'1958',text:'Faliero Bondanini patents an improved design in France — manufactured and sold under the name Martin SA. Becomes associated with French café culture.'},
        {year:'1970s',text:'Bodum acquires manufacturing rights — the Bodum Chambord French Press becomes the global standard design.'},
        {year:'Today',text:'French Press is the most widely owned coffee brewing device in the world — simple, inexpensive, and reliable.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Pre-heat',desc:'Pour hot water into French Press to pre-heat. Discard.'},
        {title:'Coarse grind',desc:'Coarse grind essential — fine grind passes through metal mesh creating sediment and over-extraction.'},
        {title:'Add coffee and water',desc:'Add 30g coffee (for 400mL). Pour hot water just off boil. Stir once to saturate all grounds.'},
        {title:'Steep 4 minutes',desc:'Put lid on (plunger up). Steep exactly 4 minutes. Set a timer — longer steep = over-extraction.'},
        {title:'Press and pour',desc:'Press plunger slowly and steadily. Pour immediately — do not leave coffee on grounds after plunging.'}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🍫',title:'Heavy body champion',desc:"French Press produces the heaviest, oiliest cup of any common brew method — ideal for drinkers who want full-bodied, substantial coffee."},
        {icon:'⏱️',title:'Pour immediately after pressing',desc:"Leaving coffee on grounds after pressing continues extraction — even through the metal mesh. Pour everything out immediately after pressing."},
        {icon:'🌡️',title:'Use hottest water',desc:"French Press metal mesh doesn't restrict flow and brews fast — higher temperature (96°C) works well here, especially for darker or medium roasts."},
        {icon:'⚠️',title:'Coarse grind is mandatory',desc:"Fine grind in French Press creates silt in the cup and rapid over-extraction. Coarse is not preference — it is required for the method to function properly."},
        {icon:'☕',title:'Best for dark and medium roast',desc:"French Press amplifies body and suppresses bright acidity — ideal for medium-dark and dark roast. Light roast in French Press often tastes flat and oily rather than bright."}
    ]
});

injectEn('ENCY_SVG_AERO', {
    name_en: 'AeroPress',
    tagline_en: 'Pressure + immersion, 1–2 minutes — the most versatile brew device',
    subtitle_en: "Alan Adler's 2005 invention uses a combination of immersion and gentle air pressure (manual piston) to produce a clean, concentrated cup in 60–90 seconds. Its compact size, plastic construction, and extraordinary versatility make it the favorite of travelers, campers, and experimental coffee enthusiasts worldwide.",
    specs_en: [
        {k:'Inventor',v:'Alan Adler (Stanford engineer), USA, 2005'},
        {k:'Extraction principle',v:'Immersion + manual air pressure plunger'},
        {k:'Water temperature',v:'75–96°C (extremely flexible)'},
        {k:'Brew time',v:'60–120 seconds'},
        {k:'Output',v:'1–2 concentrated cups (can dilute for Americano)'},
        {k:'Weight',v:'~200g — the most travel-friendly quality brewer'}
    ],
    origin_en: [
        {year:'2005',text:"Alan Adler, inventor of the Aerobie flying disc, applies his engineering skills to coffee — creates AeroPress in his garage in Palo Alto, CA."},
        {year:'2008',text:'World AeroPress Championship (WAC) founded — annual competition with national and world championships. Hundreds of recipes tested.'},
        {year:'2010s',text:'AeroPress becomes the go-to travel coffee device for specialty coffee professionals. Its plastic durability and indestructibility make it unique.'},
        {year:'Today',text:"AeroPress is used from Antarctic expeditions to Michelin-star restaurants. The WAC 2023 winning recipe is radically different from the original — the device's flexibility is its legacy."}
    ],
    stepsTitle_en: '🛠️ How to Brew (Inverted)',
    steps_en: [
        {title:'Inverted setup',desc:'Insert plunger 1cm into AeroPress chamber. Flip upside down — this is the inverted method for full immersion control.'},
        {title:'Add coffee and water',desc:'15–18g fine-to-medium grind. Add 200–230mL water at 80–96°C (adjust per roast level and preference).'},
        {title:'Stir and steep',desc:'Stir 4–8 times. Steep 60–90 seconds with cap and filter on.'},
        {title:'Flip and press',desc:'Flip onto your cup, press steadily over 30 seconds. Stop when you hear hissing air.'},
        {title:'Dilute if needed',desc:'AeroPress output is concentrated. Add hot water to taste for Americano-style or drink concentrated.'}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🎭',title:'Infinite recipes',desc:"The World AeroPress Championship has produced over 1,000 documented recipes — temperature from 65°C to 96°C, steep times from 30 seconds to 3 minutes. No recipe is wrong."},
        {icon:'✈️',title:'Travel essential',desc:"AeroPress is indestructible polycarbonate plastic — it can be dropped, packed in luggage, used at altitude, and brewed with whatever water is available."},
        {icon:'🌡️',title:'Temperature flexibility',desc:"Unlike any other brew device, AeroPress works at any temperature — 75°C for Japanese-style smooth cup, 96°C for intense extraction. Your choice."},
        {icon:'☕',title:'Espresso-style shots',desc:"Fine grind + concentrated 1:4 ratio + full pressure = espresso-adjacent concentrate for lattes and cappuccinos. Not true espresso (only 0.5–1 bar), but excellent substitute."},
        {icon:'🏕️',title:'Perfect for travel',desc:"Takes up less space than a water bottle. No electricity. No fragile glass. Works with any kettle or camp stove. The only specialty coffee device for serious travel."}
    ]
});

injectEn('ENCY_SVG_MOKA', {
    name_en: 'Moka Pot',
    tagline_en: 'Stovetop steam pressure — Italian household classic',
    subtitle_en: "Alfonso Bialetti's 1933 invention uses steam pressure from a sealed lower chamber to force hot water through coffee grounds into an upper collection chamber. It produces a strong, concentrated brew — not true espresso (only 1–2 bar vs espresso's 9 bar), but bold and intense. Found in virtually every Italian home.",
    specs_en: [
        {k:'Inventor',v:'Alfonso Bialetti, Italy, 1933'},
        {k:'Extraction principle',v:'Steam pressure (1–2 bar) through medium-fine grind'},
        {k:'Water temperature',v:'Water pre-heated, steam generates ~120°C in chamber'},
        {k:'Grind size',v:'Medium-fine (finer than pour-over, coarser than espresso)'},
        {k:'Brew time',v:'3–5 minutes (stove-dependent)'},
        {k:'Output',v:'Concentrated; 1 moka cup ≈ 1.5 espresso in volume'}
    ],
    origin_en: [
        {year:'1933',text:"Alfonso Bialetti patents the Moka Express in Italy — inspired by laundry machine technology (a sealed pressure vessel with a water lift tube)."},
        {year:'1950s',text:"Alfonso's son Renato Bialetti introduces the iconic octagonal shape and 'little man with mustache' logo. Global sales explode."},
        {year:'Today',text:'Bialetti has sold over 300 million Moka Pots — an Italian kitchen icon. Available in aluminum (original) and stainless steel (induction-compatible).'},
        {year:'2016',text:"Renato Bialetti died and was buried in a giant Moka Pot urn — a beloved chapter in coffee history."}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Pre-heat water in bottom chamber',desc:'Always use hot (not cold) water in the bottom chamber. Cold water over-heats during steam-up, burning the coffee.'},
        {title:'Fill basket with medium-fine coffee',desc:'Fill coffee basket level — do not tamp. Tamping restricts flow and can cause pressure buildup.'},
        {title:'Assemble and heat on medium-low',desc:'Lock upper and lower chambers. Medium-low heat for 3–5 minutes. High heat burns the extraction.'},
        {title:'Listen for the gurgle',desc:"When the upper chamber starts gurgling and output turns pale/blonde, the extraction is done. Remove from heat immediately."},
        {title:'Cool the bottom',desc:'Wrap a wet towel around the lower chamber to stop extraction. Pour immediately — coffee left hot continues extracting.'}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'💧',title:'Hot water only',desc:"Cold water in the Moka Pot bottom chamber means longer heating time = over-extracted, burnt coffee. Start with near-boiling water for best results."},
        {icon:'🔥',title:'Medium-low heat',desc:"High heat pushes steam too fast — uneven extraction and burnt taste. Medium-low heat takes longer but produces much better results."},
        {icon:'🥄',title:'Never tamp',desc:"Moka Pot is not a portafilter — do not tamp the coffee basket. Loose filling allows the low steam pressure to pass through evenly."},
        {icon:'⏰',title:'Listen for the gurgle',desc:"The transition from dark concentrated extraction to pale blonde output happens in 3–5 seconds. Remove from heat when you hear the gurgle change tone."},
        {icon:'🥛',title:'Best with milk',desc:"Moka Pot produces concentrated, intense coffee — naturally suited for 1:1 or 1:2 milk ratio. Italian home café latte starts here."}
    ]
});

injectEn('ENCY_SVG_SIPHON', {
    name_en: 'Siphon / Vacuum Pot',
    tagline_en: 'Steam pressure + vacuum — theatrical science, clean full-bodied cup',
    subtitle_en: "The siphon (vacuum pot) uses thermodynamics: vapor pressure pushes hot water up from the lower flask into the upper brewing chamber; removing heat creates a vacuum that pulls brewed coffee back down through a filter. The result is a clean, tea-like, yet full-bodied cup — and one of the most theatrical coffee experiences possible.",
    specs_en: [
        {k:'Extraction principle',v:'Vapor pressure up + vacuum suction down through filter'},
        {k:'Filter type',v:'Cloth (traditional) or paper (modern) — no metal'},
        {k:'Water temperature',v:'~92–96°C during brew, then vacuum at ~85°C'},
        {k:'Grind size',v:'Medium (slightly coarser than V60)'},
        {k:'Brew time',v:'Total 5–8 minutes including heat-up'},
        {k:'Body character',v:'Clean, tea-like clarity + full body (cloth filter)'}
    ],
    origin_en: [
        {year:'1830s',text:'Loeff of Berlin patents early vacuum coffee pot design. Multiple European inventors develop similar devices simultaneously.'},
        {year:'1840',text:"Mme Vassieux of Lyon patents an improved balanced siphon design — this is the direct ancestor of modern siphon coffee makers."},
        {year:'1900s–today',text:"Japan adopts siphon coffee as a specialty café tradition — Japanese siphon brewers use it for its theatrical visual appeal and exceptional cup clarity."},
        {year:'Today',text:'Siphon cafés thrive in Japan and Taiwan. Third Wave specialty coffee uses siphon for high-end table service — the $20 tableside coffee experience.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Prepare lower flask',desc:'Fill lower flask with pre-heated water to the fill line. Attach alcohol lamp or butane burner underneath.'},
        {title:'Wet cloth/paper filter',desc:'Wet the cloth filter and hook it inside the upper chamber with the hook extending down into the tube.'},
        {title:'Water rises to upper chamber',desc:'As water heats to near boiling, vapor pressure pushes it up into the upper brewing chamber.'},
        {title:'Add coffee and stir',desc:'Add medium-fine ground coffee to the upper chamber water. Stir gently 2–3 times. Brew for 60–90 seconds.'},
        {title:'Remove heat — vacuum pulls coffee down',desc:"Remove the lamp. As lower flask cools, vacuum pulls brewed coffee back down through the filter. Watch the elegant drawdown in real time."}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'🎭',title:'Most theatrical brew method',desc:'Siphon brewing at tableside is one of the great coffee theater experiences — the physics are visible, the aroma fills the room, and the drawdown is mesmerizing.'},
        {icon:'🫖',title:'Tea-like cup clarity',desc:"Cloth-filtered siphon produces a cup that is simultaneously clean (like filter coffee) and full-bodied (like immersion). Unique to siphon."},
        {icon:'🌡️',title:'Temperature control critical',desc:'Siphon brewing temperature is controlled by heat source intensity. Too hot = scorched coffee. Too cool = slow weak extraction. Adjusting flame intensity is the main skill.'},
        {icon:'🧼',title:'Cloth filter maintenance',desc:'Traditional cloth siphon filters must be cleaned immediately after use and stored in cold water. Coffee oils go rancid quickly in a cloth filter.'},
        {icon:'⏱️',title:'Time the stir precisely',desc:'Stir timing matters in siphon: 10 seconds after adding coffee (first stir), 45 seconds later (second stir), then remove heat. Consistency produces consistent results.'}
    ]
});

injectEn('ENCY_SVG_COLDBREW', {
    name_en: 'Cold Brew',
    tagline_en: 'Cold water, 12–24 hours — smooth, low acid, summer staple',
    subtitle_en: "Cold Brew steeps coarse-ground coffee in cold or room-temperature water for 12–24 hours. No heat means no extraction of bitter acids or harsh compounds — the result is an extremely smooth, naturally sweet, low-acid concentrate that can be refrigerated for up to a week. The dominant summer café product globally.",
    specs_en: [
        {k:'Extraction principle',v:'Room-temperature or cold water immersion, 12–24 hours'},
        {k:'Water temperature',v:'4–22°C (refrigerator or room temperature)'},
        {k:'Grind size',v:'Coarse (coarser than French Press)'},
        {k:'Brew ratio',v:'1:8 (concentrate) — dilute 1:1 to 1:2 before drinking'},
        {k:'Brew time',v:'12–24 hours (12–16 hours sweet spot)'},
        {k:'Shelf life',v:'5–7 days refrigerated'}
    ],
    origin_en: [
        {year:'17th century',text:"Japan's 'Kyoto-style' slow drip cold coffee is one of the earliest cold extraction forms — single drops falling through grounds over hours."},
        {year:'1960s',text:'Toddy company (USA) launches a home cold brew steeping system — immersion cold brew enters mainstream American kitchens.'},
        {year:'2010s',text:'Blue Bottle, Stumptown, and other specialty brands launch bottled cold brew — summer café hit.'},
        {year:'2015–20',text:"Starbucks launches Nitro Cold Brew (nitrogen-infused cold brew on draft) — becomes one of their best-selling summer products."},
        {year:'Today',text:'Bottled cold brew is a multi-billion dollar global market. Every convenience store in Asia carries RTD (ready-to-drink) cold brew.'}
    ],
    stepsTitle_en: '🛠️ How to Brew',
    steps_en: [
        {title:'Coarse grind',desc:'Coarser than French Press. Long immersion + fine grind = over-extracted, bitter concentrate.'},
        {title:'Load into filter vessel or bag',desc:'Use stainless steel filter basket or cotton/muslin bag to contain grounds — prevents silt in final concentrate.'},
        {title:'Add cold water and stir once',desc:'Pour cold water over grounds. Stir gently once to saturate. Cover.'},
        {title:'Refrigerate 12–24 hours',desc:'Refrigerator: 16–24 hours. Room temperature: 10–14 hours (faster but slight sourness). 12–16 hours is the sweet spot.'},
        {title:'Filter and dilute',desc:'Remove filter basket. Bottle the concentrate. Dilute 1:1 with water or milk before drinking. Keeps 5–7 days refrigerated.'}
    ],
    tipsTitle_en: '💡 Key Tips',
    tips_en: [
        {icon:'⏱️',title:'12–16 hours is optimal',desc:'Under-steeped (<8h) = weak, watery. Over-steeped (>24h) = muddy, earthy off-notes. 12–16 hours refrigerator produces the cleanest sweet concentrate.'},
        {icon:'🍫',title:'Dark roast + honey process = best',desc:"Dark roast and honey/natural process beans produce maximum chocolate-caramel cold brew. Light roast's brightness is suppressed by cold water — flavor feels flat."},
        {icon:'📏',title:'Coarse grind is critical',desc:'Long immersion amplifies over-extraction from fine grounds. Coarser than French Press grind protects from bitterness and muddy extraction.'},
        {icon:'🧊',title:'Dilute before drinking',desc:'1:8 cold brew concentrate is meant to be diluted. Direct consumption is extremely intense. Add ice + water or milk for drinking strength.'},
        {icon:'🥛',title:'Cold brew latte',desc:'Cold brew concentrate + oat milk = the dominant summer café drink globally. The smooth, naturally sweet concentrate integrates perfectly with plant-based milks.'}
    ]
});

// ── METHOD ────────────────────────────────────────────────────────────────────

injectEn('ENCY_SVG_M_CLASSIC3', {
    name_en: 'Classic 3-Pour',
    tagline_en: 'Bloom → mid pour → final pour: the beginner-friendly standard',
    subtitle_en: "The classic 3-pour method: bloom + middle pour + final pour. Each pour waits for the water level to drop to half before continuing. Total time 2:30–3:00. The universal starting point for every pour-over brewer — all advanced methods build from this foundation.",
    specs_en: [
        {k:'Pour count',v:'3 pours'},
        {k:'Water temperature',v:'92–94°C'},
        {k:'Grind size',v:'Medium (Comandante 22–25 clicks)'},
        {k:'Brew ratio',v:'1:15 (15g coffee / 250g water)'},
        {k:'Total time',v:'2:30 ~ 3:00'},
        {k:'Difficulty',v:'★☆☆☆☆ Beginner'}
    ],
    origin_en: [
        {year:'1960s',text:'Traditional Japanese kissaten hand-drip technique — 3-pour structure becomes the teaching standard for Japanese coffee education.'},
        {year:'2000s',text:'As V60 spreads globally, the 3-pour method becomes the universal teaching method in specialty coffee shops and certifications.'},
        {year:'Today',text:'All barista training programs worldwide begin with 3-pour. Every advanced technique is an evolution from this base.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Bloom: 30g water',desc:'Spiral from center outward to saturate all grounds. Wait 30 seconds for CO₂ release and bed to rise.'},
        {title:'Mid pour: 100g water',desc:'Concentric circles, center out and back. Wait 30–40 seconds for water level to drop halfway.'},
        {title:'Final pour: 120g water',desc:'Large circles, center and back. Total water reaches 250g.'},
        {title:'Wait and drain',desc:'No more water — wait for remaining water to drain. Total time 2:30–3:00.'},
        {title:'Swirl and taste',desc:'Gently swirl to level the bed. Smell the dry aroma. Taste at 65°C for best flavor.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'⏱️',title:'Rhythm over precision',desc:'Wait for water level to drop halfway between each pour — more important than hitting exact 30-second intervals. Use your eyes, not just the timer.'},
        {icon:'🎯',title:'Inner 70% only',desc:'Pour in concentric circles that never touch the filter paper. Center-out, then back to center — keep water in the inner coffee bed.'},
        {icon:'⚖️',title:'Grind before temperature',desc:'Too sour → grind finer. Too bitter → grind coarser. Grind adjustment is more effective than temperature changes.'},
        {icon:'🌡️',title:'Temperature tuning',desc:'Not bright enough → raise temp 1–2°C. Too harsh → lower 1–2°C. Every bean has its own sweet spot.'},
        {icon:'📚',title:'Brew 30 cups before switching',desc:'Brew the same beans 30+ times with 3-pour before trying other methods. Repetition reveals the variables — not equipment switching.'}
    ]
});

injectEn('ENCY_SVG_M_SINGLE', {
    name_en: 'Single Pour',
    tagline_en: 'Bloom then one continuous pour — thick body and sweetness',
    subtitle_en: "After bloom, pour all remaining water in one continuous flow. The extended immersion of the coffee bed creates a heavier body and pronounced sweetness. Requires slightly coarser grind to prevent clogging. Best for medium roast beans where body and sweetness matter most.",
    specs_en: [
        {k:'Pour count',v:'2 total (bloom + one long pour)'},
        {k:'Water temperature',v:'90–93°C'},
        {k:'Grind size',v:'Medium-coarse (slightly coarser than 3-pour)'},
        {k:'Brew ratio',v:'1:15 ~ 1:16'},
        {k:'Total time',v:'2:30 ~ 3:30'},
        {k:'Best for',v:'Medium roast, when body and sweetness are priority'}
    ],
    origin_en: [
        {year:'Origins',text:'Single pour (ichikyu-ryu in Japanese) developed as an alternative to multi-stage pouring — some Japanese brewers found continuous immersion produced better body.'},
        {year:'2010s',text:'Scott Rao and others document continuous pour methods — single pour becomes part of the specialty coffee method library.'},
        {year:'Today',text:'Frequently used as a comparison tool: same beans, 3-pour vs single-pour, demonstrates how pour method shapes body and sweetness independently of grind.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Bloom',desc:'Standard bloom: 2× coffee weight water, 30 seconds.'},
        {title:'One long pour',desc:'Begin the single continuous pour immediately after bloom. Pour slowly and steadily in spirals over 60–90 seconds.'},
        {title:'Maintain flow',desc:'Keep water flowing continuously without stopping. The bed should stay saturated throughout the pour.'},
        {title:'Drain',desc:'When water is added, wait for full drain. Should total 2:30–3:30.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'💪',title:'Body-first approach',desc:'Single pour prioritizes body and sweetness over clarity and brightness. Choose it when you want a heavier, rounder cup from your beans.'},
        {icon:'🌀',title:'Slow is better',desc:'Pour the single pour slowly — a thin, steady stream over 60–90 seconds creates more even extraction than a fast dump.'},
        {icon:'🎚️',title:'Coarser grind required',desc:'The extended contact time of continuous pouring extracts more than 3-pour at the same grind size. Grind 1–2 steps coarser than your standard 3-pour setting.'},
        {icon:'🔄',title:'Compare to 3-pour',desc:"Brew the same beans with 3-pour and single-pour on the same day. The difference reveals exactly how pour method shapes body and sweetness."},
        {icon:'☕',title:'Medium roast ideal',desc:"Single pour's sweetness-forward result matches best with medium roast — light roast can taste flat, dark roast can taste harsh with extended contact."}
    ]
});

injectEn('ENCY_SVG_M_KASUYA', {
    name_en: '4:6 Method (Tetsu Kasuya, 2016 WBrC Champion)',
    tagline_en: '5 pours, 40%/60% split — independently control acidity and strength',
    subtitle_en: "Japanese barista Tetsu Kasuya won the 2016 World Brewers Cup with this 5-pour system: the first 40% (2 pours) controls acid/sweet balance; the last 60% (3 pours) controls strength. Each variable is independently adjustable without affecting the other — the most educational brew method ever designed.",
    specs_en: [
        {k:'Inventor',v:'Tetsu Kasuya (Japan)'},
        {k:'Championship year',v:'2016 World Brewers Cup'},
        {k:'Pour count',v:'5 pours (first 2 + last 3)'},
        {k:'Water temperature',v:'92°C'},
        {k:'Brew ratio',v:'1:15 (20g coffee / 300g water)'},
        {k:'Total time',v:'~3:30'}
    ],
    origin_en: [
        {year:'2014',text:'Kasuya researches Japanese hand-drip tradition — discovers that splitting front and back pours independently controls acid-sweet balance and concentration.'},
        {year:'2016',text:'Wins World Brewers Cup with 4:6 method — shocks the global coffee community with its systematic, teachable approach.'},
        {year:'2017',text:'Posts YouTube demonstration — 5M+ views. Sparks global home-brewing adoption. The most-viewed pour-over tutorial ever made.'},
        {year:'Today',text:'4:6 method is the most widely practiced advanced pour-over technique worldwide — taught in specialty cafés on every continent.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'#1: 60g (acidity control)',desc:'0:00 — Pour 60g. For more acidity, keep at 60g. For more sweetness, increase to 70g. Wait 45 seconds.'},
        {title:'#2: 60g (sweet control)',desc:'0:45 — Pour another 60g (total 120g). Front 40% complete — acid-sweet balance is set. Wait 45 seconds.'},
        {title:'#3: 60g (strength, pour 1)',desc:'1:30 — Pour 60g (total 180g). Wait for level to drop halfway.'},
        {title:'#4: 60g (strength, pour 2)',desc:'2:00 — Pour 60g (total 240g).'},
        {title:'#5: 60g (strength, pour 3)',desc:'2:30 — Final 60g (total 300g). Wait for full drain by 3:30.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'🍋',title:'More acidity → increase #1',desc:'Make #1 pour 70g and #2 pour 50g (total 120g unchanged). Larger first pour = brighter acidity.'},
        {icon:'🍯',title:'More sweetness → increase #2',desc:'Make #1 pour 50g and #2 pour 70g. Larger second pour = more sweetness and roundness.'},
        {icon:'💪',title:'Stronger → split #3–5 further',desc:'Break the final 3 pours into 5 smaller pours (36g each) for a denser, more concentrated cup.'},
        {icon:'🌊',title:'Lighter → merge #3–5',desc:'Combine last 3 pours into 2 pours (90g + 90g). Faster flow = lighter concentration.'},
        {icon:'🎓',title:'Watch the official YouTube',desc:"Kasuya's own YouTube demonstration shows perfect rhythm and flow technique. Fastest way to learn the method correctly."}
    ]
});

injectEn('ENCY_SVG_M_MATTW', {
    tagline_en: '2015 WBrC Champion — high temperature, 4 quick pours',
    subtitle_en: "UK barista Matt Winton's 2015 World Brewers Cup winning recipe: high temperature (95°C) + high water volume + 4 rapid pours = intense, high-frequency extraction that reveals the deepest flavor layers. Designed for high-quality, well-developed light roast beans.",
    specs_en: [
        {k:'Developer',v:'Matt Winton (UK)'},
        {k:'Championship year',v:'2015 World Brewers Cup'},
        {k:'Water temperature',v:'95°C (high)'},
        {k:'Pour count',v:'4 pours'},
        {k:'Brew ratio',v:'1:16 (approximate)'},
        {k:'Total time',v:'~2:30 (fast)'}
    ],
    origin_en: [
        {year:'2014',text:"Matt Winton develops recipe based on studying how high temperature interacts with light-roast bean density — finds that 95°C pulls complex flavors that 92°C misses."},
        {year:'2015',text:'Wins World Brewers Cup using this recipe with a high-quality natural process Ethiopian bean. Score record at the time.'},
        {year:'Today',text:'Matt Winton recipe is used in training to demonstrate the effect of high-temperature extraction on light roast specialty coffee.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Bloom with 50g at 95°C',desc:'High temperature bloom. 45 seconds wait.'},
        {title:'Second pour: 100g',desc:'Large aggressive pour. 95°C. 30-second wait.'},
        {title:'Third pour: 100g',desc:'Continue at same temperature and rhythm.'},
        {title:'Fourth pour: remaining water',desc:'Complete total water volume. Target 2:30 total brew time.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'🌡️',title:'95°C is the key',desc:"Matt Winton's recipe depends on high temperature to extract the deep flavor complexity from light roast dense beans. Do not lower below 94°C."},
        {icon:'☕',title:'Light roast only',desc:"This recipe is designed for high-quality light roast single origin. Dark roast at 95°C will over-extract and taste harsh."},
        {icon:'⚡',title:'Fast pours',desc:'The 4-pour method is faster than Kasuya or Hoffmann — the rapid pours at high temperature create high extraction intensity quickly.'},
        {icon:'🏆',title:'Competition-grade beans',desc:"Matt Winton's method demands excellent beans — it reveals both the best and worst characteristics. Use specialty-grade light roast."},
        {icon:'🌍',title:'Natural process works best',desc:"Matt Winton won with a natural process Ethiopian — the fruit complexity responds extraordinarily well to high-temperature extraction."}
    ]
});

injectEn('ENCY_SVG_M_LANCE', {
    tagline_en: 'Ultra-fine grind + low temperature + strong agitation — light roast specialist',
    subtitle_en: "Lance Hedrick's method addresses the core challenge of light roast brewing: dense beans that resist extraction at normal settings. Solution: extra-fine grind (increasing surface area) + low temperature (88–89°C, reducing bitter extraction) + aggressive stirring (increasing contact). Enables exceptional extraction from ultra-light roast beans.",
    specs_en: [
        {k:'Developer',v:'Lance Hedrick (USA, specialty coffee educator)'},
        {k:'Target',v:'Ultra-light roast (Cinnamon/New England range)'},
        {k:'Grind size',v:'Fine (2–3 clicks finer than standard)'},
        {k:'Water temperature',v:'88–90°C (low — prevents bitter at high extraction)'},
        {k:'Agitation',v:'Strong stir or Rao spin after bloom and pours'},
        {k:'Brew ratio',v:'1:15 ~ 1:16'}
    ],
    origin_en: [
        {year:'2019',text:"Lance Hedrick (US specialty coffee educator and YouTuber) publishes research on why standard methods under-extract light roast — dense beans need more surface area and contact."},
        {year:'2020',text:'Lance Hedrick recipe gains widespread adoption in specialty community — enables light roast coffees that previously tasted sour and flat to be fully extracted.'},
        {year:'Today',text:'Standard recommendation for anyone struggling with ultra-light roast extraction. Especially useful for Cinnamon and New England roast levels.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Grind extra fine',desc:'2–3 clicks finer than your normal V60 setting. The extra surface area is what makes this work.'},
        {title:'Low temperature water',desc:'88–90°C — lower than standard to prevent the extra fine grind from over-extracting bitter compounds.'},
        {title:'Bloom with agitation',desc:'Bloom with 2× coffee weight water. Stir vigorously 4–6 times or use Rao spin. 45-second bloom.'},
        {title:'Pour + stir each pour',desc:'After each pour, stir 2–4 times or swirl. The agitation + fine grind compensates for the lower temperature.'},
        {title:'Target 3:00–3:30',desc:'Fine grind will drain slower — expect longer brew time than standard. That is correct and intentional.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'🔬',title:'The physics of light roast',desc:"Light roast beans are denser than dark roast. They need more surface area (finer grind) and more agitation to achieve the same extraction percentage."},
        {icon:'🌡️',title:'Low temp prevents bitter',desc:'Fine grind at 94°C would massively over-extract bitter compounds. The low temperature balances the fine grind — this counter-intuitive combination is the insight.'},
        {icon:'💧',title:'Agitation compensates',desc:"Stirring increases water-coffee contact and dislodges CO₂ bubbles that block extraction. The stirring is not optional — it's what makes low-temperature fine-grind work."},
        {icon:'🌸',title:'Best for Cinnamon/New England roast',desc:"Standard methods under-extract these ultra-light roasts. Lance method fully develops the flavor potential that lighter roast hides from conventional brewing."},
        {icon:'📹',title:'Watch Lance Hedrick YouTube',desc:"Lance Hedrick's YouTube channel (LanceHedrick) is the best free resource for understanding light roast extraction science."}
    ]
});

injectEn('ENCY_SVG_M_HOFFMANN', {
    tagline_en: 'James Hoffmann Ultimate V60 — bloom, single pour, final swirl',
    subtitle_en: "James Hoffmann (UK World Barista Champion 2007) published his Ultimate V60 Method in 2020 — a bloom, one continuous pour, and a final Rao spin to even the bed. Designed to eliminate channeling and produce the most consistent possible V60 cup. YouTube views: 15M+.",
    specs_en: [
        {k:'Developer',v:'James Hoffmann (UK), 2020'},
        {k:'Pour count',v:'2 (bloom + single continuous pour)'},
        {k:'Water temperature',v:'92–94°C'},
        {k:'Grind size',v:'Medium (slightly finer than 3-pour)'},
        {k:'Brew ratio',v:'1:16.67 (30g coffee / 500g water — large batch)'},
        {k:'Key technique',v:'Final Rao spin to level the bed'}
    ],
    origin_en: [
        {year:'2007',text:'James Hoffmann wins World Barista Championship — becomes the most influential English-language coffee communicator.'},
        {year:'2020',text:"Hoffmann publishes 'The Ultimate V60 Technique' on YouTube — 15M+ views. The Rao spin becomes a globally known technique overnight."},
        {year:'Today',text:'Hoffmann method is the most-cited single recipe in pour-over coffee. The final swirl has been adopted by baristas worldwide as a standard finishing step.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Bloom: 2× coffee weight',desc:'Pour 2× coffee weight in water. Wait 45 seconds. The bloom is longer than 3-pour — allows more CO₂ to escape for cleaner extraction.'},
        {title:'Single slow pour',desc:'Pour remaining water in one continuous slow pour, spiraling center-out and back. Take 30–45 seconds to complete the pour.'},
        {title:'Rao spin',desc:'Once all water is added, pick up the V60 and gently swirl/spin it so the grounds level into a flat bed. This eliminates channeling.'},
        {title:'Wait',desc:'Do not touch. Wait for full drain. Target total time 3:00–3:30 for a 30g batch.'},
        {title:'Taste',desc:'The Hoffmann method is designed for exceptional clarity and sweetness. If flat: try 94°C. If harsh: try 91°C.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'🌀',title:'The Rao spin is the key',desc:"The Rao spin (also called a 'spin rinse') levels the bed so all grounds are at equal depth — eliminating high and low spots that cause uneven extraction."},
        {icon:'☕',title:'Designed for large batch',desc:"Hoffmann's published recipe uses 30g coffee / 500g water — a 2-cup batch. Scale proportionally for single cup (18g / 300g)."},
        {icon:'🎯',title:'Bloom quality matters',desc:'Hoffmann uses a longer bloom (45 seconds) — the extra CO₂ release produces cleaner, more transparent extraction in the single pour.'},
        {icon:'🔬',title:'Most consistent method',desc:"The Rao spin eliminates the main source of V60 variability (uneven bed). This is why Hoffmann method produces more consistent results than multi-pour methods."},
        {icon:'📹',title:'Watch the original video',desc:"James Hoffmann's 'Ultimate V60 Technique' YouTube video shows the exact pour speed, swirl technique, and timing. Worth watching even as an experienced brewer."}
    ]
});

injectEn('ENCY_SVG_M_RAO', {
    name_en: 'Scott Rao Continuous Pour',
    tagline_en: 'Continuous circular pour + Rao spin — minimizing turbulence',
    subtitle_en: "Scott Rao (coffee author and consultant) advocates for a continuous, slow circular pour from bloom through the end of extraction — minimizing turbulence, maximizing even saturation, and ending with the signature 'Rao spin' to level the bed. The method emphasizes minimizing agitation to produce an exceptionally clean cup.",
    specs_en: [
        {k:'Developer',v:'Scott Rao (USA, coffee author)'},
        {k:'Pour style',v:'Continuous slow circular pour throughout'},
        {k:'Water temperature',v:'92–95°C (roast dependent)'},
        {k:'Grind size',v:'Medium (adjust per roast)'},
        {k:'Brew ratio',v:'1:15 ~ 1:17'},
        {k:'Key principle',v:'Minimum turbulence + flat bed (Rao spin)'}
    ],
    origin_en: [
        {year:'2010s',text:"Scott Rao documents continuous pour methods in 'The Coffee Roaster's Companion' and 'The Professional Barista's Handbook' — scientific approach to minimizing agitation."},
        {year:'2015',text:"Rao spin (swirling at end of pour) popularized by Rao and adopted by Hoffmann and others — becomes industry standard finishing technique."},
        {year:'Today',text:'Scott Rao is one of the most cited figures in specialty coffee science. Continuous pour philosophy influences countless café protocols worldwide.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Bloom',desc:'Standard 2× coffee weight bloom. 30–45 second wait.'},
        {title:'Begin continuous pour',desc:'Start a slow, steady circular pour immediately after bloom ends. Never stop pouring until all water is added.'},
        {title:'Concentric circles',desc:'Pour in concentric circles: center-out, then back to center. The circles should be slow — 10–15 seconds per full circle.'},
        {title:'Rao spin',desc:'When final water is added, pick up the V60 and gently spin to level the bed. One gentle rotation is enough.'},
        {title:'Drain',desc:'Wait for full drain. Target total 2:30–3:30 depending on grind and temperature.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'🌊',title:'Flow rate controls extraction',desc:"The continuous pour's speed is your primary variable — slower pour = more contact time per pour = higher extraction. Adjust speed as your primary dial."},
        {icon:'🎯',title:'Minimize turbulence',desc:"Rao's philosophy: excessive agitation creates uneven extraction. The continuous slow pour minimizes turbulence compared to multi-pour stop-start methods."},
        {icon:'🌀',title:'Rao spin is the signature',desc:'The spin at the end is the most widely adopted element of Rao methodology — used by baristas who use other pour techniques.'},
        {icon:'🔬',title:'Scientific approach',desc:"Scott Rao brings food-science methodology to coffee — documenting variables, measuring outcomes, and removing subjective 'art' elements in favor of reproducible precision."},
        {icon:'📚',title:'Read the books',desc:"Scott Rao's 'Professional Barista's Handbook' and 'Coffee Roaster's Companion' are essential reading for serious coffee enthusiasts. The most scientific coffee books available."}
    ]
});

injectEn('ENCY_SVG_M_TETSU_ICE', {
    name_en: 'Iced Pour-Over',
    tagline_en: 'Concentrated hot brew over ice — bright, crisp iced coffee',
    subtitle_en: "Brew a concentrated pour-over (60% of normal water) directly over ice (40% of normal water). The hot extraction extracts full flavor; the immediate ice contact drops temperature instantly and locks in brightness. Far superior to chilling hot coffee — flash cooling preserves volatile aromatics that refrigeration destroys.",
    specs_en: [
        {k:'Water ratio',v:'60% hot brew water + 40% ice (by weight)'},
        {k:'Example',v:'15g coffee + 150g hot water + 100g ice = 250g total'},
        {k:'Hot water temperature',v:'94–96°C (higher than normal — compensates for ice dilution)'},
        {k:'Grind size',v:'Slightly finer than normal pour-over (higher extraction to offset dilution)'},
        {k:'Brew method',v:'Standard V60 / Kalita technique over cup with ice'},
        {k:'Result',v:'Bright, crisp, 70°C → instantly chilled, preserved aromatics'}
    ],
    origin_en: [
        {year:'Origins',text:"Japanese iced coffee technique developed in specialty cafés — a faster and superior alternative to refrigerating brewed hot coffee."},
        {year:'2010s',text:'Tetsu Kasuya and other Japanese competitors publicize iced pour-over in WBrC routines — Japanese iced coffee technique spreads globally.'},
        {year:'Today',text:'Standard summer technique in specialty cafés worldwide. Simple, requires no special equipment, results dramatically better than chilled hot coffee.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Weigh ice in server',desc:'Place your cup/server on scale. Add ice (40% of total water weight). Example: 100g ice for a 250g final cup.'},
        {title:'Adjust recipe for dilution',desc:'Use 60% of normal water for brewing. Grind slightly finer and use slightly higher temperature to compensate.'},
        {title:'Brew hot directly over ice',desc:'Brew pour-over normally — but directly into the cup containing ice. Hot extraction hits ice immediately and cools.'},
        {title:'Stir and serve',desc:'Once brew is complete, stir to mix concentrate with melted ice. Serve immediately over fresh ice in a new cup.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'🌸',title:'Preserves aromatics',desc:"Flash-cooling (hot brew + ice) preserves volatile aromatics that refrigeration slowly destroys. Ethiopian iced pour-over tastes more floral than Ethiopian cold brew."},
        {icon:'🌡️',title:'Higher temperature for iced',desc:'Brew at 94–96°C (2°C higher than hot brew) to compensate for the ice dilution and lower final temperature affecting perceived intensity.'},
        {icon:'🎯',title:'Measure ice precisely',desc:'The ice is part of the water recipe. Too much ice = watery. Too little = warm and concentrated. Weigh it.'},
        {icon:'🍋',title:'Best for light roast',desc:"Iced pour-over's brightness preservation is wasted on dark roast. Light to medium roast with bright acidity (Yirgacheffe, Kenya) are spectacular iced."},
        {icon:'🆕',title:'Serve immediately',desc:"Iced pour-over should be drunk within 15 minutes — the ice melts and continues diluting. Unlike cold brew, it's not a make-ahead product."}
    ]
});

injectEn('ENCY_SVG_M_CONC', {
    name_en: 'Strong Concentrate (1:10)',
    tagline_en: 'Small water volume, amplified strength — for iced americano base',
    subtitle_en: "Using only 1:10 water ratio (half of normal) produces an ultra-concentrated extract resembling a small espresso — but made in a V60. Used as the base for iced Americano, milk-based iced drinks, or diluted with cold water + ice. The pour-over answer to espresso for filter-only homes.",
    specs_en: [
        {k:'Brew ratio',v:'1:10 (15g coffee / 150g water)'},
        {k:'Water temperature',v:'94–96°C'},
        {k:'Grind size',v:'Slightly finer than standard pour-over'},
        {k:'Brew time',v:'~2:00 (less water = faster drain)'},
        {k:'Result',v:'Ultra-concentrated — must be diluted before drinking'},
        {k:'Best use',v:'Iced Americano base, iced latte, cold dilution drinks'}
    ],
    origin_en: [
        {year:'Origins',text:'Concentrated pour-over developed as a home method for producing espresso-adjacent intensity without an espresso machine.'},
        {year:'2010s',text:'Specialty cafés begin offering 1:10 concentrate pour-over for iced drinks — the filter coffee alternative to espresso-based iced drinks.'},
        {year:'Today',text:'Standard technique for pour-over enthusiasts who want milk-based cold drinks without owning an espresso machine.'}
    ],
    stepsTitle_en: '🛠️ Steps',
    steps_en: [
        {title:'Set 1:10 recipe',desc:'15g coffee + 150g water. The small volume brews much faster than standard.'},
        {title:'Grind slightly finer',desc:'The reduced water needs more extraction from the grind — 1 step finer than your standard recipe.'},
        {title:'Brew as normal pour-over',desc:'Bloom (30g / 30 seconds). Pour remaining 120g slowly. Total time: ~2 minutes.'},
        {title:'Pour over ice',desc:'Pour the concentrated extract into a cup with 100–150g ice. Stir. Taste — adjust dilution.'},
        {title:'Dilute to preference',desc:'Add cold water, milk, or oat milk to dilute to drinking strength. 1:1 to 1:2 dilution typical.'}
    ],
    tipsTitle_en: '💡 Tips',
    tips_en: [
        {icon:'💧',title:'Not for drinking straight',desc:'1:10 concentrate is extremely intense — drinking undiluted is unpleasant. Always dilute with water or milk before consuming.'},
        {icon:'🧊',title:'Iced Americano base',desc:"Pour 150g concentrate + 150g cold water + ice = home iced Americano. Cleaner and brighter than cold brew for this application."},
        {icon:'🥛',title:'Oat milk latte',desc:'Concentrate + 200g oat milk + ice = iced latte without an espresso machine. The fruity acidity of light roast concentrate is especially good with oat milk.'},
        {icon:'⚡',title:'Finer grind is essential',desc:'Less water means less extraction per gram of water. Finer grind compensates by increasing surface area and extraction rate.'},
        {icon:'🔬',title:'Compare to cold brew',desc:'Side by side: iced concentrate pour-over vs cold brew of same beans. The pour-over version will be brighter and more acidic; cold brew will be sweeter and smoother.'}
    ]
});

if (hasCRLF) h = h.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, h, 'utf8');
console.log('\n✅ patch_ency_3.js done (Dripper + Brew + Method)');
