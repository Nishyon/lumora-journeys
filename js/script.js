/* Lumora Travel Group — site scripts */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  const money = n => '$' + n.toLocaleString('en-US');
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const P = {
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    cal: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
  };
  const I = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
  const STARS = '<span class="stars">' + `<svg viewBox="0 0 24 24">${P.star}</svg>`.repeat(5) + '</span>';

  /* ---------------- data ---------------- */
  const D = (id, name, region, img, tag, best, ok) => ({ id, name, region, img, tag, best, ok });
  const DESTS = [
    D('japan', 'Japan', 'Asia', '1493976040374-85c8e12f0c0e', 'Culture', [3, 4, 10, 11], [5, 9, 12]),
    D('maldives', 'Maldives', 'Islands', '1514282401047-d79a71a590e8', 'Beach', [1, 2, 3, 4], [11, 12]),
    D('greece', 'Greece', 'Europe', '1533105079780-92b9be482077', 'Romance', [5, 6, 9], [7, 8, 10]),
    D('kenya', 'Kenya', 'Africa', '1516426122078-c23e76319801', 'Wildlife', [7, 8, 9, 10], [1, 2, 6]),
    D('indonesia', 'Bali, Indonesia', 'Asia', '1537996194471-e657df975ab4', 'Wellness', [5, 6, 7, 8, 9], [4, 10]),
    D('italy', 'Italy', 'Europe', '1523906834658-6e24ef2386f9', 'Culture', [4, 5, 6, 9], [7, 8, 10]),
    D('iceland', 'Iceland', 'Europe', '1531366936337-7c912a4589a7', 'Adventure', [2, 3, 9, 10], [1, 6, 7, 8, 11, 12]),
    D('uae', 'Dubai, UAE', 'Middle East', '1512453979798-5ea266f8880c', 'Luxury', [1, 2, 3, 11, 12], [4, 10]),
    D('morocco', 'Morocco', 'Africa', '1539020140153-e479b8c22e70', 'Culture', [3, 4, 5, 10], [9, 11]),
    D('canada', 'Canada', 'Americas', '1464822759023-fed622ff2c3b', 'Adventure', [6, 7, 8, 9], [5, 10]),
    D('india', 'India', 'Asia', '1524492412937-b28074a5d7da', 'Culture', [1, 2, 10, 11, 12], [3]),
    D('vietnam', 'Vietnam', 'Asia', '1528127269322-539801943592', 'Culture', [2, 3, 4], [10, 11, 12]),
    D('france', 'France', 'Europe', '1502602898657-3e91760cbb34', 'Romance', [5, 6, 9], [4, 7, 8, 10]),
    D('scotland', 'Scotland', 'Europe', '1505832018823-50331d70d237', 'Adventure', [5, 6, 9], [7, 8]),
    D('turkey', 'Türkiye', 'Middle East', '1530789253388-582c481c54b0', 'Romance', [4, 5, 9, 10], [6]),
    D('thailand', 'Thailand', 'Asia', '1534008897995-27a23e859048', 'Beach', [1, 2, 11, 12], [3, 4]),
    D('patagonia', 'Patagonia', 'Americas', '1526772662000-3f88f10405ff', 'Adventure', [1, 2, 12], [3, 11])
  ];
  const J = (id, dest, title, route, days, region, style, price, img, rating, hl) => ({ id, dest, title, route, days, region, style, price, img, rating, hl });
  const JOURNEYS = [
    J('japan-slowly', 'japan', 'Japan, Slowly', ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'], 12, 'Asia', 'Culture', 6450, '1493976040374-85c8e12f0c0e', 4.98,
      ['Private tea ceremony in a Kyoto machiya', 'Ryokan night with onsen in Hakone', 'After-hours walk through Fushimi Inari', 'Sushi counter seats in Ginza']),
    J('maldives-overwater', 'maldives', 'Maldives Overwater Escape', ['Malé', 'Baa Atoll'], 7, 'Islands', 'Beach', 5890, '1514282401047-d79a71a590e8', 4.96,
      ['Overwater villa with private pool', 'Manta ray snorkel at Hanifaru Bay', 'Sandbank dinner under the stars', 'Seaplane transfers included']),
    J('cyclades', 'greece', 'Santorini & the Cyclades', ['Athens', 'Mykonos', 'Santorini'], 10, 'Europe', 'Romance', 4780, '1570077188670-e3a8d69ac5ff', 4.93,
      ['Private Acropolis visit at opening', 'Catamaran sunset cruise in Oia', 'Cave suite with caldera views', 'Assyrtiko wine tasting']),
    J('great-migration', 'kenya', 'Great Migration Safari', ['Nairobi', 'Masai Mara', 'Amboseli'], 9, 'Africa', 'Wildlife', 7950, '1516426122078-c23e76319801', 5.0,
      ['River crossings with a private guide', 'Hot-air balloon at sunrise', 'Tented camps with butler service', 'Kilimanjaro views in Amboseli']),
    J('bali-soul', 'indonesia', 'Bali Wellness Retreat', ['Ubud', 'Sidemen', 'Uluwatu'], 10, 'Asia', 'Wellness', 3690, '1537996194471-e657df975ab4', 4.91,
      ['Daily yoga with a private teacher', 'Water temple blessing ritual', 'Rice-terrace cycling in Sidemen', 'Clifftop villa in Uluwatu']),
    J('dolomites-lodges', 'italy', 'Dolomites Lodge to Lodge', ['Cortina', 'Val Gardena', 'Lake Braies'], 8, 'Europe', 'Adventure', 4250, '1476514525535-07fb3b4ae5f1', 4.95,
      ['Guided hut-to-hut hiking', 'Luggage moved ahead each day', 'Dawn row on Lake Braies', 'Michelin-star mountain dinner']),
    J('iceland-aurora', 'iceland', 'Iceland Northern Lights', ['Reykjavík', 'Golden Circle', 'Vík'], 7, 'Europe', 'Adventure', 4380, '1531366936337-7c912a4589a7', 4.89,
      ['Northern Lights super-jeep hunt', 'Ice cave in Vatnajökull', 'Private Blue Lagoon retreat', 'Glass-roof lodge stay']),
    J('dubai-dunes', 'uae', 'Dubai & Abu Dhabi', ['Dubai', 'Abu Dhabi', 'Liwa Oasis'], 6, 'Middle East', 'Luxury', 3950, '1512453979798-5ea266f8880c', 4.87,
      ['Desert camp in the Empty Quarter', 'Louvre Abu Dhabi private tour', 'Helicopter over Palm Jumeirah', 'Falconry at sunrise']),
    J('imperial-morocco', 'morocco', 'Imperial Morocco', ['Marrakech', 'Fes', 'Merzouga'], 11, 'Africa', 'Culture', 3850, '1489493585363-d69421e0edd3', 4.92,
      ['Riad stays in the medinas', 'Camel trek into the Erg Chebbi', 'Cooking class with a Fassi family', 'Atlas Mountains drive']),
    J('rockies-rail', 'canada', 'Canadian Rockies by Rail', ['Vancouver', 'Banff', 'Jasper'], 10, 'Americas', 'Adventure', 5640, '1464822759023-fed622ff2c3b', 4.94,
      ['Rocky Mountaineer GoldLeaf', 'Canoe on Moraine Lake', 'Icefields Parkway road trip', 'Wildlife safari in Jasper']),
    J('grand-tour', 'italy', 'The Italian Grand Tour', ['Rome', 'Florence', 'Venice'], 12, 'Europe', 'Culture', 5980, '1523906834658-6e24ef2386f9', 4.97,
      ['Sistine Chapel before the crowds', 'Tuscan villa cooking day', 'Private gondola through Venice', 'First-class rail between cities']),
    J('royal-rajasthan', 'india', 'Royal Rajasthan', ['Delhi', 'Agra', 'Jaipur', 'Udaipur'], 10, 'Asia', 'Culture', 3480, '1477587458883-47145ed94245', 4.9,
      ['Taj Mahal at sunrise', 'Palace hotel stays', 'Private boat on Lake Pichola', 'Old Delhi food walk']),
    J('vietnam-north-south', 'vietnam', 'Vietnam North to South', ['Hanoi', 'Ha Long Bay', 'Hoi An'], 11, 'Asia', 'Culture', 3290, '1528127269322-539801943592', 4.88,
      ['Private junk cruise in Ha Long', 'Lantern-lit Hoi An evenings', 'Tailor fitting in the old town', 'Street food by Vespa']),
    J('paris-riviera', 'france', 'Paris & the French Riviera', ['Paris', 'Provence', 'Nice'], 9, 'Europe', 'Romance', 5120, '1502602898657-3e91760cbb34', 4.93,
      ['Seine dinner cruise', 'Lavender fields in Valensole', 'Perfume workshop in Grasse', 'Monaco by vintage car']),
    J('highlands-steam', 'scotland', 'Scottish Highlands by Rail', ['Edinburgh', 'Fort William', 'Isle of Skye'], 8, 'Europe', 'Adventure', 3980, '1505832018823-50331d70d237', 4.9,
      ['Jacobite steam train', 'Private whisky distillery visit', 'Castle hotel night', 'Fairy Pools hike on Skye']),
    J('cappadocia-coast', 'turkey', 'Cappadocia & the Aegean', ['Istanbul', 'Cappadocia', 'Bodrum'], 9, 'Middle East', 'Romance', 3560, '1530789253388-582c481c54b0', 4.92,
      ['Balloon flight at dawn', 'Cave suite in Uçhisar', 'Bosphorus yacht at sunset', 'Gulet day on the Aegean']),
    J('thai-islands', 'thailand', 'Thai Islands & Temples', ['Bangkok', 'Chiang Mai', 'Krabi'], 10, 'Asia', 'Beach', 2980, '1534008897995-27a23e859048', 4.86,
      ['Ethical elephant sanctuary', 'Longtail boat to hidden lagoons', 'Temple walk with a monk', 'Beachfront pool villa']),
    J('patagonia-edge', 'patagonia', 'Patagonia Expedition', ['Buenos Aires', 'El Chaltén', 'Torres del Paine'], 12, 'Americas', 'Adventure', 6890, '1526772662000-3f88f10405ff', 4.97,
      ['Fitz Roy trek with a mountain guide', 'Glacier walk on Perito Moreno', 'Estancia stay with gauchos', 'Eco-lodge in Torres del Paine'])
  ];
  JOURNEYS.forEach((j, i) => { j.reviews = 38 + ((i * 37) % 160); });
  const INCLUDES = ['Hand-selected 5★ and boutique hotels', 'Private transfers throughout', 'Expert local guides', 'Daily breakfast & select dinners', '24/7 in-destination support', 'Full ATOL financial protection'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const byId = id => JOURNEYS.find(j => j.id === id);
  const destOf = j => DESTS.find(d => d.id === j.dest);
  const fromPrice = d => Math.min(...JOURNEYS.filter(j => j.dest === d).map(j => j.price));
  const countFor = d => JOURNEYS.filter(j => j.dest === d).length;

  /* ---------------- utils ---------------- */
  let toastT;
  const toast = msg => {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = I('check') + msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  };
  const lock = on => { document.documentElement.style.overflow = on ? 'hidden' : ''; };

  /* ---------------- header ---------------- */
  function header() {
    const hdr = $('.hdr');
    const onScroll = () => hdr.classList.toggle('scrolled', scrollY > 10);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const dr = $('#drawer');
    const set = on => { dr.classList.toggle('open', on); lock(on); $('.burger').setAttribute('aria-expanded', on); };
    $('.burger').addEventListener('click', () => set(true));
    $$('[data-close-drawer]', dr).forEach(b => b.addEventListener('click', () => set(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  /* ---------------- wishlist ---------------- */
  let saved = store.get('lj-saved', []);
  const syncSaved = () => $$('.saved-count').forEach(b => { b.textContent = saved.length || ''; });
  const toggleSave = id => {
    saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
    store.set('lj-saved', saved);
    syncSaved();
    $$(`.heart[data-save="${id}"]`).forEach(h => { const on = saved.includes(id); h.classList.toggle('on', on); h.setAttribute('aria-pressed', on); });
    toast(saved.includes(id) ? 'Added to your saved journeys' : 'Removed from saved journeys');
  };

  /* ---------------- cards ---------------- */
  const card = j => {
    const on = saved.includes(j.id);
    return `<article class="jcard rv" data-id="${j.id}" tabindex="0" aria-label="${j.title}">
      <div class="jcard-media"><img src="${U(j.img, 900)}" alt="${j.title}" loading="lazy"><span class="tag">${j.style}</span>
        <button class="heart ${on ? 'on' : ''}" data-save="${j.id}" aria-label="Save ${j.title}" aria-pressed="${on}">${I('heart')}</button></div>
      <div class="jcard-body">
        <div class="jcard-meta"><span>${I('pin')}${destOf(j).name}</span><span>${I('clock')}${j.days} days</span></div>
        <h3>${j.title}</h3>
        <p class="jcard-route">${j.route.join(' · ')}</p>
        <div class="jcard-rate">${STARS}<b>${j.rating.toFixed(1)}</b><span>(${j.reviews} reviews)</span></div>
        <div class="jcard-foot"><div class="price"><small>From</small><b>${money(j.price)} <span>pp</span></b></div><span class="link">View details ${I('arrow')}</span></div>
      </div></article>`;
  };
  const bindCards = root => {
    root.addEventListener('click', e => {
      const h = e.target.closest('.heart');
      if (h) { e.stopPropagation(); toggleSave(h.dataset.save); return; }
      const c = e.target.closest('.jcard');
      if (c) openDetail(c.dataset.id);
    });
    root.addEventListener('keydown', e => { const c = e.target.closest('.jcard'); if (c && e.key === 'Enter' && e.target === c) openDetail(c.dataset.id); });
  };
  const tile = (d, wide = false) => `<a class="dtile rv ${wide ? 'wide' : ''}" href="journeys.html?dest=${d.id}" data-region="${d.region}">
    <img src="${U(d.img, wide ? 1200 : 700)}" alt="${d.name}" loading="lazy">
    <div class="dtile-body"><small>${d.region}</small><h3>${d.name}</h3><p><span>${countFor(d.id)} journey${countFor(d.id) > 1 ? 's' : ''} · from ${money(fromPrice(d.id))}</span>${I('arrow')}</p></div></a>`;

  /* ---------------- detail drawer ---------------- */
  function openDetail(id) {
    const j = byId(id), dd = $('#detail');
    if (!j || !dd) return;
    const nights = j.days - 1, per = Math.floor(nights / j.route.length);
    let rest = nights - per * j.route.length, day = 1;
    const itin = j.route.map((r, k) => {
      const n = per + (rest-- > 0 ? 1 : 0), from = day; day += n;
      return `<li><i>${k + 1}</i><div><b>${r}</b><span>Day ${from}${n > 1 ? '–' + (from + n - 1) : ''} · ${n} night${n > 1 ? 's' : ''}${k === 0 ? ' · Private airport transfer' : ''}</span></div></li>`;
    }).join('') + `<li><i>${I('check')}</i><div><b>Departure</b><span>Day ${j.days} · Transfer to the airport</span></div></li>`;
    const on = saved.includes(j.id);
    $('.dd-scroll', dd).innerHTML = `
      <div class="dd-hero"><img src="${U(j.img, 1400)}" alt="${j.title}"></div>
      <div class="dd-body">
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag tag-blue">${j.style}</span><span class="tag tag-green">${I('check')}Fully customisable</span></div>
        <h2 id="dd-title">${j.title}</h2>
        <div class="jcard-rate" style="margin:0">${STARS}<b>${j.rating.toFixed(2)}</b><span>· ${j.reviews} verified reviews</span></div>
        <div class="facts"><div class="fact"><small>Duration</small><b>${j.days} days</b></div><div class="fact"><small>Destinations</small><b>${j.route.length} stops</b></div><div class="fact"><small>Region</small><b>${j.region}</b></div><div class="fact"><small>Best time</small><b>${destOf(j).best.slice(0, 2).map(m => MONTHS[m - 1]).join(', ')}</b></div></div>
        <h4>Itinerary overview</h4><ul class="itin">${itin}</ul>
        <h4>Highlights</h4><ul class="ticks">${j.hl.map(h => `<li>${I('check')}${h}</li>`).join('')}</ul>
        <h4>What's included</h4><ul class="ticks">${INCLUDES.map(h => `<li>${I('check')}${h}</li>`).join('')}</ul>
      </div>`;
    $('.dd-foot', dd).innerHTML = `<div class="price"><small>From, per person sharing</small><b>${money(j.price)}</b></div>
      <div class="acts"><button class="btn btn-outline heart-btn" data-save-btn="${j.id}">${I('heart')}${on ? 'Saved' : 'Save'}</button><a class="btn btn-primary" href="contact.html?trip=${j.id}">Enquire now ${I('arrow')}</a></div>`;
    $('.dd-scroll', dd).scrollTop = 0;
    dd.classList.add('open'); dd.setAttribute('aria-hidden', 'false'); lock(true);
    $('.dd-close', dd).focus();
  }
  function detail() {
    const dd = $('#detail');
    if (!dd) return;
    const close = () => { dd.classList.remove('open'); dd.setAttribute('aria-hidden', 'true'); lock(false); };
    $('.dd-bg', dd).addEventListener('click', close);
    $('.dd-close', dd).addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && dd.classList.contains('open')) close(); });
    dd.addEventListener('click', e => {
      const b = e.target.closest('[data-save-btn]');
      if (!b) return;
      toggleSave(b.dataset.saveBtn);
      b.innerHTML = I('heart') + (saved.includes(b.dataset.saveBtn) ? 'Saved' : 'Save');
    });
  }

  /* ---------------- home ---------------- */
  function home() {
    const f = $('#featured');
    if (f) {
      const pick = ['japan-slowly', 'great-migration', 'cyclades', 'maldives-overwater', 'grand-tour', 'patagonia-edge', 'bali-soul', 'imperial-morocco', 'iceland-aurora', 'rockies-rail', 'dubai-dunes', 'royal-rajasthan'];
      const render = r => {
        const list = pick.map(byId).filter(j => !r || j.region === r).slice(0, 6);
        f.innerHTML = list.map(card).join('');
        observe(f);
      };
      $$('#featured-tabs button').forEach(b => b.addEventListener('click', () => {
        $$('#featured-tabs button').forEach(x => x.classList.toggle('on', x === b));
        render(b.dataset.r);
      }));
      bindCards(f);
      render('');
    }
    const t = $('#home-dests');
    if (t) {
      const ids = ['japan', 'maldives', 'italy', 'kenya', 'greece', 'iceland', 'indonesia'];
      t.innerHTML = ids.map((id, i) => tile(DESTS.find(d => d.id === id), i === 0)).join('');
    }
    const s = $('#hero-search');
    if (s) {
      const tabs = $$('.s-tab', s.parentElement);
      let mode = 'holiday';
      tabs.forEach(tb => tb.addEventListener('click', () => {
        tabs.forEach(x => { x.classList.toggle('on', x === tb); x.setAttribute('aria-selected', x === tb); });
        mode = tb.dataset.mode;
        $('#s-submit-label').textContent = mode === 'holiday' ? 'Search journeys' : 'Request a proposal';
      }));
      s.addEventListener('submit', e => {
        e.preventDefault();
        if (mode !== 'holiday') { location.href = `contact.html?type=${mode}`; return; }
        const p = new URLSearchParams();
        const dest = s.elements.dest.value, style = s.elements.style.value, dur = s.elements.dur.value;
        if (dest) p.set(dest.startsWith('r:') ? 'region' : 'dest', dest.replace(/^[rd]:/, ''));
        if (style) p.set('style', style);
        if (dur) p.set('dur', dur);
        location.href = 'journeys.html' + (p.toString() ? '?' + p : '');
      });
    }
  }

  /* ---------------- journeys listing ---------------- */
  function listing() {
    const root = $('#listing');
    if (!root) return;
    const res = $('#results'), cnt = $('#count'), empty = $('.empty', root), fl = $('#filters'), chips = $('#active');
    const st = { q: '', region: new Set(), style: new Set(), dur: '', max: 8000, sort: 'rec', dest: '', saved: false };
    const regions = [...new Set(JOURNEYS.map(j => j.region))], styles = [...new Set(JOURNEYS.map(j => j.style))];
    const checks = (name, vals) => vals.map(v => `<label class="check"><input type="checkbox" name="${name}" value="${v}"><span>${v}</span><em>${JOURNEYS.filter(j => j[name] === v).length}</em></label>`).join('');
    $('#f-region').innerHTML = checks('region', regions);
    $('#f-style').innerHTML = checks('style', styles);
    const p = new URLSearchParams(location.search);
    if (p.get('region')) st.region.add(p.get('region'));
    if (p.get('style')) st.style.add(p.get('style'));
    if (p.get('dur')) st.dur = p.get('dur');
    if (p.get('dest')) st.dest = p.get('dest');
    if (p.get('q')) st.q = p.get('q');
    if (p.get('saved')) st.saved = true;
    const syncInputs = () => {
      $$('input[name=region]', fl).forEach(i => { i.checked = st.region.has(i.value); });
      $$('input[name=style]', fl).forEach(i => { i.checked = st.style.has(i.value); });
      $$('input[name=dur]', fl).forEach(i => { i.checked = i.value === st.dur; });
      $('#f-q').value = st.q; $('#f-max').value = st.max; $('#f-max-out').textContent = st.max >= 8000 ? 'Any' : money(st.max);
    };
    const durLbl = { short: 'Up to 7 days', mid: '8–10 days', long: '11+ days' };
    const render = () => {
      const q = st.q.trim().toLowerCase();
      let list = JOURNEYS.filter(j => {
        const hay = `${j.title} ${j.route.join(' ')} ${destOf(j).name} ${j.region} ${j.style}`.toLowerCase();
        if (q && !hay.includes(q)) return false;
        if (st.dest && j.dest !== st.dest) return false;
        if (st.saved && !saved.includes(j.id)) return false;
        if (st.region.size && !st.region.has(j.region)) return false;
        if (st.style.size && !st.style.has(j.style)) return false;
        if (st.dur === 'short' && j.days > 7) return false;
        if (st.dur === 'mid' && (j.days < 8 || j.days > 10)) return false;
        if (st.dur === 'long' && j.days < 11) return false;
        if (st.max < 8000 && j.price > st.max) return false;
        return true;
      });
      if (st.sort === 'low') list.sort((a, b) => a.price - b.price);
      if (st.sort === 'high') list.sort((a, b) => b.price - a.price);
      if (st.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
      if (st.sort === 'days') list.sort((a, b) => a.days - b.days);
      res.innerHTML = list.map(card).join('');
      cnt.textContent = list.length;
      empty.classList.toggle('show', !list.length);
      const act = [];
      if (st.saved) act.push(['saved', '', 'Saved journeys']);
      if (st.dest) act.push(['dest', '', DESTS.find(d => d.id === st.dest).name]);
      if (st.q) act.push(['q', '', `“${st.q}”`]);
      st.region.forEach(v => act.push(['region', v, v]));
      st.style.forEach(v => act.push(['style', v, v]));
      if (st.dur) act.push(['dur', '', durLbl[st.dur]]);
      if (st.max < 8000) act.push(['max', '', `Under ${money(st.max)}`]);
      chips.innerHTML = act.map(([k, v, l]) => `<button class="chip-x" data-k="${k}" data-v="${v}">${l}${I('x')}</button>`).join('');
      const n = act.length;
      $$('.f-count').forEach(e => { e.textContent = n ? `(${n})` : ''; });
      observe(res);
    };
    fl.addEventListener('change', e => {
      const t = e.target;
      if (t.name === 'region' || t.name === 'style') t.checked ? st[t.name].add(t.value) : st[t.name].delete(t.value);
      if (t.name === 'dur') st.dur = t.value;
      render();
    });
    $('#f-q').addEventListener('input', e => { st.q = e.target.value; render(); });
    $('#f-max').addEventListener('input', e => { st.max = +e.target.value; $('#f-max-out').textContent = st.max >= 8000 ? 'Any' : money(st.max); render(); });
    $('#sort').addEventListener('change', e => { st.sort = e.target.value; render(); });
    const reset = () => { st.saved = false; st.q = ''; st.dest = ''; st.dur = ''; st.max = 8000; st.region.clear(); st.style.clear(); syncInputs(); render(); };
    $$('[data-reset]').forEach(b => b.addEventListener('click', reset));
    chips.addEventListener('click', e => {
      const c = e.target.closest('.chip-x'); if (!c) return;
      const k = c.dataset.k;
      if (k === 'region' || k === 'style') st[k].delete(c.dataset.v);
      else if (k === 'max') st.max = 8000; else if (k === 'saved') st.saved = false; else st[k] = '';
      syncInputs(); render();
    });
    $$('.view button').forEach(b => b.addEventListener('click', () => {
      $$('.view button').forEach(x => x.classList.toggle('on', x === b));
      res.classList.toggle('list', b.dataset.v === 'list');
      store.set('lj-view', b.dataset.v);
    }));
    if (store.get('lj-view', 'grid') === 'list') $('.view button[data-v=list]').click();
    const openF = on => { fl.classList.toggle('open', on); lock(on); };
    $('#open-filters').addEventListener('click', () => openF(true));
    $$('[data-close-filters]').forEach(b => b.addEventListener('click', () => openF(false)));
    bindCards(res);
    syncInputs(); render();
  }

  /* ---------------- destinations ---------------- */
  function destinations() {
    const g = $('#dest-grid');
    if (!g) return;
    g.innerHTML = DESTS.map(d => tile(d)).join('');
    $$('#dest-tabs button').forEach(b => {
      const r = b.dataset.r;
      b.insertAdjacentHTML('beforeend', `<sup>${r ? DESTS.filter(d => d.region === r).length : DESTS.length}</sup>`);
      b.addEventListener('click', () => {
        $$('#dest-tabs button').forEach(x => x.classList.toggle('on', x === b));
        $$('.dtile', g).forEach(t => { t.style.display = !r || t.dataset.region === r ? '' : 'none'; });
      });
    });
    const t = $('#season');
    if (t) t.innerHTML = `<thead><tr><th>Destination</th>${MONTHS.map(m => `<th>${m}</th>`).join('')}</tr></thead><tbody>${DESTS.map(d =>
      `<tr><td>${d.name}<small>${d.region}</small></td>${MONTHS.map((m, i) => `<td>${d.best.includes(i + 1) ? '<span class="sdot best" title="Best time"></span>' : d.ok.includes(i + 1) ? '<span class="sdot good" title="Good time"></span>' : ''}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }

  /* ---------------- counters ---------------- */
  function counters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length, t0 = performance.now();
      const step = t => {
        const k = clamp((t - t0) / 1600, 0, 1), v = to * (1 - Math.pow(1 - k, 3));
        el.firstChild.nodeValue = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: .5 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ---------------- forms ---------------- */
  const okMail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  function newsletter() {
    $$('.news').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault();
      const i = $('input', f), m = f.parentElement.querySelector('.news-msg');
      m.textContent = okMail(i.value) ? 'Thank you — you’re subscribed. Please check your inbox to confirm.' : 'Please enter a valid email address.';
      if (okMail(i.value)) f.reset();
    }));
  }
  function faq() {
    $$('.faq-q').forEach(q => q.addEventListener('click', () => {
      const it = q.parentElement, open = !it.classList.contains('open');
      $$('.faq-item', it.parentElement).forEach(x => { x.classList.remove('open'); $('.faq-q', x).setAttribute('aria-expanded', 'false'); });
      if (open) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    }));
  }
  function planner() {
    const pl = $('#planner');
    if (!pl) return;
    const steps = $$('.pstep', pl), nav = $$('.stepper-nav li', pl), next = $('.p-next', pl), back = $('.back', pl), err = $('.p-error', pl);
    const data = { type: 'holiday', where: [], style: [], adults: 2, kids: 0, budget: 6000 };
    let i = 0;
    const typeBtns = $$('.type-seg button', pl);
    const setType = t => {
      data.type = t;
      typeBtns.forEach(b => b.classList.toggle('on', b.dataset.t === t));
      $$('[data-biz]', pl).forEach(el => { el.hidden = t === 'holiday'; });
    };
    typeBtns.forEach(b => b.addEventListener('click', () => setType(b.dataset.t)));
    $$('.opt-grid', pl).forEach(g => g.addEventListener('click', e => {
      const b = e.target.closest('.opt'); if (!b) return;
      b.classList.toggle('on'); b.setAttribute('aria-pressed', b.classList.contains('on'));
      data[g.dataset.key] = $$('.opt.on', g).map(x => x.dataset.v);
      err.textContent = '';
    }));
    $$('.counter', pl).forEach(c => c.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const k = c.dataset.key;
      data[k] = clamp(data[k] + (+b.dataset.d), +c.dataset.min, 50);
      $('output', c).textContent = data[k];
    }));
    const range = $('#budget'), out = $('#budget-out');
    const bud = () => { data.budget = +range.value; out.textContent = money(data.budget) + (data.budget >= 20000 ? '+' : ''); };
    range.addEventListener('input', bud); bud();
    const qp = new URLSearchParams(location.search);
    if (['business', 'events'].includes(qp.get('type'))) setType(qp.get('type')); else setType('holiday');
    const trip = byId(qp.get('trip') || '');
    if (trip) {
      const d = destOf(trip);
      const b = $(`.opt-grid[data-key=where] .opt[data-v="${d.name}"]`, pl);
      if (b) { b.classList.add('on'); data.where = [d.name]; }
      const sb = $(`.opt-grid[data-key=style] .opt[data-v="${trip.style}"]`, pl);
      if (sb) { sb.classList.add('on'); data.style = [trip.style]; }
      pl.elements.msg.value = `I'm interested in "${trip.title}" (${trip.days} days).`;
      const note = $('#trip-note'); note.hidden = false; $('b', note).textContent = trip.title;
    }
    const show = n => {
      i = n;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      nav.forEach((li, k) => li.classList.toggle('done', k <= i));
      const last = i === steps.length - 1;
      back.hidden = i === 0 || last;
      $('.p-nav', pl).style.display = last ? 'none' : '';
      $('.stepper-nav', pl).style.display = last ? 'none' : '';
      $('span', next).textContent = i === steps.length - 2 ? 'Submit enquiry' : 'Continue';
      err.textContent = '';
      if (n > 0) { const top = pl.getBoundingClientRect().top; if (top < 0) scrollTo({ top: scrollY + top - 110, behavior: 'smooth' }); }
    };
    const valid = () => {
      if (i === 0 && !data.where.length) return 'Please select at least one destination, or choose “Not sure yet”.';
      if (i === 1 && !pl.elements.month.value) { pl.elements.month.parentElement.classList.add('err'); return 'Please select your preferred travel month.'; }
      if (i === 2 && !data.style.length) return 'Please select at least one travel style.';
      if (i === 3) {
        const n = pl.elements.name, m = pl.elements.email, c = pl.elements.consent;
        n.parentElement.classList.toggle('err', !n.value.trim());
        m.parentElement.classList.toggle('err', !okMail(m.value));
        if (!n.value.trim()) return 'Please enter your full name.';
        if (!okMail(m.value)) return 'Please enter a valid email address.';
        if (data.type !== 'holiday' && !pl.elements.company.value.trim()) { pl.elements.company.parentElement.classList.add('err'); return 'Please enter your company name.'; }
        if (!c.checked) return 'Please accept the privacy policy to continue.';
      }
      return '';
    };
    pl.elements.month.addEventListener('change', () => pl.elements.month.parentElement.classList.remove('err'));
    pl.addEventListener('submit', e => {
      e.preventDefault();
      const bad = valid();
      if (bad) { err.textContent = bad; return; }
      if (i === steps.length - 2) {
        const ref = 'LTG-' + Math.random().toString(36).slice(2, 8).toUpperCase();
        const typeL = { holiday: 'Tailor-made holiday', business: 'Business travel', events: 'Events & MICE' }[data.type];
        const rows = [['Reference', ref], ['Enquiry type', typeL], ['Name', pl.elements.name.value.trim()]];
        if (data.type !== 'holiday') rows.push(['Company', pl.elements.company.value.trim()]);
        rows.push(['Destinations', data.where.join(', ')], ['Travel date', pl.elements.month.selectedOptions[0].text + ' · ' + pl.elements.tlen.value],
          ['Travellers', `${data.adults} adult${data.adults > 1 ? 's' : ''}${data.kids ? `, ${data.kids} child${data.kids > 1 ? 'ren' : ''}` : ''}`],
          ['Preferences', data.style.join(', ')], ['Budget', money(data.budget) + (data.budget >= 20000 ? '+' : '') + ' per person']);
        $('#summary').innerHTML = rows.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('');
        $('#done-name').textContent = pl.elements.name.value.trim().split(' ')[0];
      }
      show(i + 1);
    });
    back.addEventListener('click', () => show(i - 1));
    show(0);
  }

  /* ---------------- reveal ---------------- */
  let io;
  function observe(root = document) {
    if (!io) io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08, rootMargin: '0px 0px -40px 0px' });
    $$('.rv:not(.in)', root).forEach(el => io.observe(el));
  }

  /* ---------------- boot ---------------- */
  header();
  syncSaved();
  detail();
  home();
  listing();
  destinations();
  counters();
  newsletter();
  faq();
  planner();
  observe();
  $$('[data-year]').forEach(e => { e.textContent = new Date().getFullYear(); });
})();
