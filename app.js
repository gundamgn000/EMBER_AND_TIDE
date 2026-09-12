const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  toggle?.classList.remove('active');
  mobileNav?.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle?.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('open');
  toggle.classList.toggle('active', open);
  mobileNav.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 40), {passive: true});

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
  }), {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const heroImg = document.querySelector('.hero__media img');
  if (heroImg) window.addEventListener('scroll', () => {
    if (scrollY < innerHeight) heroImg.style.transform = `translateY(${scrollY * .11}px) scale(1.02)`;
  }, {passive: true});

  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', e => {
    if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; }
  }, {passive: true});
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  const category = button.dataset.filter;
  document.querySelectorAll('.menu-item').forEach((item, index) => {
    const show = category === 'all' || item.dataset.category === category;
    item.classList.toggle('hidden', !show);
    if (show) {
      item.animate([{opacity: 0, transform: 'translateY(12px)'}, {opacity: 1, transform: 'none'}], {duration: 360, delay: index * 35, easing: 'ease-out'});
    }
  });
}));

const dishes = [
  {
    slug: 'oysters', category: '招牌料理 · 海岸鮮味', zh: '北海岸生蠔', en: 'Cold Coast Oysters',
    metaOne: '冷水生蠔 · 六顆', metaTwo: '現開上桌', price: 'NT$ 720', image: 'assets/photo-oysters.webp',
    alt: '冰鎮生蠔佐檸檬與餐具',
    description: '冷冽海水養成飽滿蠔肉，入口先是清脆鹹味，接著浮現柔和乳香。以蘋果紅酒醋汁提亮酸度，再用一抹雲杉油留下海岸森林般的氣息。',
    source: '挑選肉質飽滿、礦物風味清晰的冷水生蠔，送達後全程低溫保存，依當日品質開殼供應。',
    method: '點餐後才開殼，保留蠔汁與鮮度；以碎冰穩定溫度，讓每一口維持乾淨俐落。',
    pairing: '蘋果紅酒醋汁帶出明亮果酸，雲杉油補上清新的木質香，適合搭配乾型氣泡酒。'
  },
  {
    slug: 'scallop', category: '招牌料理 · 海岸鮮味', zh: '炭香干貝', en: 'Ember-Kissed Scallop',
    metaOne: '海灣干貝', metaTwo: '炭火快烤', price: 'NT$ 680', image: 'assets/photo-scallop.webp',
    alt: '炭煎干貝佐香草與醬汁',
    description: '厚實干貝快速貼近炭火，表面形成焦香薄殼，中心仍保留柔嫩甜味。榛果奶油與海萵苣交疊出溫潤、鮮鹹的尾韻。',
    source: '選用肉質緊實、甜度清楚的大型海灣干貝，搭配當季海萵苣與少量煙燻魚卵。',
    method: '高溫炭火短時間上色，靜置後淋上榛果奶油，讓堅果香依附在干貝表面。',
    pairing: '榛果的圓潤承接炭香，海萵苣與魚卵補足鹹鮮；建議搭配礦物感白酒。'
  },
  {
    slug: 'ribeye', category: '招牌料理 · 炭火主餐', zh: '45 日熟成炭火肋眼', en: '45-Day Ember Ribeye',
    metaOne: '帶骨肋眼 · 18 oz', metaTwo: '橡木與蘋果木', price: 'NT$ 1,980', image: 'assets/photo-ribeye.webp',
    alt: '黑色餐盤上的炙烤肋眼牛排與香草',
    description: '經過 45 日乾式熟成，先在爐火旁緩慢回溫，再以果木餘燼直接炙烤。離火後加入煙燻牛脂靜置，讓每一片肉保有熱度，也保留柔嫩多汁的口感。',
    source: '嚴選油花與肉味平衡的帶骨肋眼，在恆溫恆濕環境中熟成 45 日，濃縮風味與柔嫩度。',
    method: '低溫回溫、炭火直烤與離火靜置三段火候，讓焦香表層與均勻熟度同時成立。',
    pairing: '焦香青蔥、煙燻肉汁與晶透海鹽，拉長牛肉的豐厚尾韻，適合搭配結構飽滿的紅酒。'
  },
  {
    slug: 'short-rib', category: '招牌料理 · 炭火主餐', zh: '炭烤牛小排', en: 'Coal-Roasted Short Rib',
    metaOne: '帶骨牛小排', metaTwo: '低溫慢烤', price: 'NT$ 1,460', image: 'assets/photo-short-rib.webp',
    alt: '慢燉牛小排佐蘑菇與醬汁',
    description: '牛小排先以低溫慢慢軟化，再用炭火收緊表面。脂香、黑蒜與發酵辣椒彼此交融，呈現深沉卻不厚重的主餐風味。',
    source: '選用筋脂分布均勻的帶骨牛小排，保留骨邊肉最濃郁的香氣與膠質口感。',
    method: '低溫慢烤建立柔嫩質地，上桌前以高溫炭火焦化表面，最後淋上牛骨髓醬汁。',
    pairing: '黑蒜帶來甜潤熟成感，發酵辣椒切開油脂，適合搭配帶辛香氣息的紅酒。'
  },
  {
    slug: 'duck', category: '招牌料理 · 炭火主餐', zh: '火燻鴨胸', en: 'Fire-Cured Duck',
    metaOne: '熟成鴨胸', metaTwo: '杜松木煙燻', price: 'NT$ 1,180', image: 'assets/photo-duck.webp',
    alt: '切片鴨胸佐紅色醬汁與香草奶油',
    description: '鴨胸以乾式鹽漬凝聚肉香，再用杜松木煙溫柔包覆。表皮酥脆、肉心粉嫩，佐以海岸李子與微苦菊苣平衡豐腴。',
    source: '挑選脂肪層完整的鴨胸，短期風乾熟成，使表皮更容易形成均勻酥脆的口感。',
    method: '小火煎出鴨油後以炭火收尾，離火前加入杜松木煙，建立乾淨而細緻的香氣。',
    pairing: '李子酸甜與菊苣微苦平衡鴨脂，適合搭配果香鮮明、單寧柔和的紅酒。'
  },
  {
    slug: 'cabbage', category: '招牌料理 · 田園時蔬', zh: '炭烤冬季高麗菜', en: 'Charred Winter Cabbage',
    metaOne: '冬季高麗菜', metaTwo: '整顆慢烤', price: 'NT$ 460', image: 'assets/photo-cabbage.webp',
    alt: '炭烤時蔬與香草拼盤',
    description: '整顆高麗菜靠近餘燼慢烤，外層焦脆，內裡保留清甜水分。榛果、熟成起司與海藻奶油讓一道蔬菜擁有完整主角感。',
    source: '使用霜降後甜度集中的冬季高麗菜，搭配烘烤榛果、熟成起司與海岸海藻。',
    method: '先以餘燼慢烤使中心熟透，再剖面直火焦化，形成外脆內嫩的多層口感。',
    pairing: '海藻奶油加深鮮味，榛果與起司補上堅果、乳香層次，適合搭配輕盈白酒。'
  },
  {
    slug: 'celeriac', category: '招牌料理 · 田園時蔬', zh: '鹽焗芹菜根', en: 'Salt-Baked Celeriac',
    metaOne: '整顆芹菜根', metaTwo: '海鹽封焗', price: 'NT$ 520', image: 'assets/photo-celeriac.webp',
    alt: '根莖蔬菜佐香草與奶油醬汁',
    description: '芹菜根包覆海鹽低溫焗烤，質地綿密，香氣介於堅果與土地之間。發酵鮮奶油、蘋果與香草帶出乾淨酸度。',
    source: '選用纖維細緻、香氣完整的芹菜根，搭配酸甜蘋果與當日採收的海岸香草。',
    method: '以海鹽外殼密封焗烤，鎖住水分與根莖甜味；切片後以炭火輕輕上色。',
    pairing: '發酵鮮奶油帶來柔和酸度，蘋果與香草讓根莖風味更明亮，適合搭配自然派白酒。'
  },
  {
    slug: 'market-fish', category: '招牌料理 · 海岸鮮味', zh: '當日現流鮮魚', en: 'Line-Caught Market Fish',
    metaOne: '依漁港到貨', metaTwo: '每日限量', price: '時價', image: 'assets/photo-market-fish.webp',
    alt: '鮮魚排佐烤蔬菜與細緻醬汁',
    description: '依當日漁港到貨挑選最適合炭火的鮮魚，保留魚皮酥度與肉質水分。甲殼油、炭火高湯與海岸葉菜共同拉出鮮味。',
    source: '每日依漁港到貨選魚，以肉質、油脂與尺寸決定料理方式，因此魚種與價格將隨海況調整。',
    method: '魚皮朝下以穩定炭火慢慢煎脆，再轉入較低溫區完成熟度，讓肉質保持細嫩。',
    pairing: '炭火高湯承接魚肉甜味，甲殼油補上深度，建議搭配酸度明亮的白酒或清酒。'
  },
  {
    slug: 'cacao', category: '招牌料理 · 餐後甜點', zh: '煙燻可可', en: 'Smoked Cacao',
    metaOne: '黑巧克力', metaTwo: '桌邊輕煙燻', price: 'NT$ 420', image: 'assets/photo-cacao.webp',
    alt: '黑巧克力甜點佐冰淇淋與可可碎片',
    description: '深色可可慕斯覆上極薄竹炭脆片，以短暫煙燻增加木質香。沙棘的明亮酸味與麥芽的溫暖甜香讓尾韻乾淨。',
    source: '以高可可比例黑巧克力為主體，搭配酸度清晰的沙棘、烘烤麥芽與竹炭薄片。',
    method: '可可慕斯低溫定型，上桌前以果木輕煙燻，保留香氣但不讓煙味遮蓋巧克力。',
    pairing: '沙棘果酸切開可可濃度，麥芽延伸烘烤香氣，適合搭配威士忌或無糖茶。'
  },
  {
    slug: 'pear', category: '招牌料理 · 餐後甜點', zh: '炭烤洋梨', en: 'Ember Pear',
    metaOne: '當季洋梨', metaTwo: '炭火焦糖化', price: 'NT$ 380', image: 'assets/photo-pear.webp',
    alt: '洋梨甜點佐巧克力蛋糕與堅果',
    description: '洋梨剖半後貼近炭火，使天然糖分緩慢焦糖化。榛果奶油冰淇淋、月桂葉與裸麥帶來溫暖、清爽的餐後收尾。',
    source: '依季節選用成熟度恰好的洋梨，搭配自製榛果奶油冰淇淋、月桂葉與裸麥酥粒。',
    method: '洋梨先低溫熟成質地，再以切面貼近炭火上色，使邊緣焦香、果肉仍保有汁水。',
    pairing: '冰涼榛果乳香對比溫熱洋梨，月桂葉與裸麥補上草本、穀物尾韻。'
  }
];

const detailRoot = document.querySelector('#dishDetail');
if (detailRoot) {
  const requestedSlug = new URLSearchParams(window.location.search).get('dish') || 'ribeye';
  const dishIndex = Math.max(0, dishes.findIndex(item => item.slug === requestedSlug));
  const dish = dishes[dishIndex];
  const previous = dishes[(dishIndex - 1 + dishes.length) % dishes.length];
  const next = dishes[(dishIndex + 1) % dishes.length];
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };

  setText('#detailCategory', dish.category);
  setText('#detailNameZh', dish.zh);
  setText('#detailNameEn', dish.en);
  setText('#detailMetaOne', dish.metaOne);
  setText('#detailMetaTwo', dish.metaTwo);
  setText('#detailDescription', dish.description);
  setText('#detailPrice', dish.price);
  setText('#detailSource', dish.source);
  setText('#detailMethod', dish.method);
  setText('#detailPairing', dish.pairing);

  const image = document.querySelector('#detailImage');
  image?.style.setProperty('--detail-image', `url("${dish.image}")`);
  image?.setAttribute('aria-label', dish.alt);

  const previousLink = document.querySelector('#detailPrev');
  const nextLink = document.querySelector('#detailNext');
  if (previousLink) {
    previousLink.href = `dish-detail.html?dish=${previous.slug}`;
    previousLink.querySelector('span').textContent = previous.zh;
  }
  if (nextLink) {
    nextLink.href = `dish-detail.html?dish=${next.slug}`;
    nextLink.querySelector('span').textContent = next.zh;
  }

  document.title = `${dish.zh}｜EMBER & TIDE`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', `EMBER & TIDE 餐點介紹——${dish.zh}。${dish.description}`);
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
