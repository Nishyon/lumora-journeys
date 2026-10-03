/* Lumora Journeys — interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  const money = n => '$' + n.toLocaleString('en-US');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.8 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4c3.6 0 6 3.6 4.7 7.1-1.8 4.8-9.3 9.4-9.3 9.4z"/></svg>';

  /* ---------------- data ---------------- */
  const DESTS = [
    { id: 'japan', name: 'Japan', region: 'Asia', img: '1528360983277-13d401cdc186', best: 'Mar–May · Oct–Nov', tag: 'Culture' },
    { id: 'maldives', name: 'Maldives', region: 'Islands', img: '1514282401047-d79a71a590e8', best: 'Nov–Apr', tag: 'Beach' },
    { id: 'greece', name: 'Greece', region: 'Europe', img: '1533105079780-92b9be482077', best: 'May–Oct', tag: 'Romance' },
    { id: 'kenya', name: 'Kenya', region: 'Africa', img: '1547471080-7cc2caa01a7e', best: 'Jul–Oct', tag: 'Wildlife' },
    { id: 'indonesia', name: 'Bali', region: 'Asia', img: '1555400038-63f5ba517a47', best: 'Apr–Oct', tag: 'Wellness' },
    { id: 'italy', name: 'Italy', region: 'Europe', img: '1552832230-c0197dd311b5', best: 'Apr–Jun · Sep', tag: 'Culture' },
    { id: 'iceland', name: 'Iceland', region: 'Europe', img: '1531366936337-7c912a4589a7', best: 'Sep–Mar', tag: 'Adventure' },
    { id: 'uae', name: 'Dubai', region: 'Middle East', img: '1512453979798-5ea266f8880c', best: 'Nov–Mar', tag: 'Luxury' },
    { id: 'morocco', name: 'Morocco', region: 'Africa', img: '1539020140153-e479b8c22e70', best: 'Mar–May · Oct', tag: 'Culture' },
    { id: 'canada', name: 'Canada', region: 'Americas', img: '1464822759023-fed622ff2c3b', best: 'Jun–Sep', tag: 'Adventure' },
    { id: 'india', name: 'India', region: 'Asia', img: '1524492412937-b28074a5d7da', best: 'Oct–Mar', tag: 'Culture' },
    { id: 'vietnam', name: 'Vietnam', region: 'Asia', img: '1528127269322-539801943592', best: 'Feb–Apr', tag: 'Culture' },
    { id: 'france', name: 'France', region: 'Europe', img: '1499856871958-5b9627545d1a', best: 'May–Sep', tag: 'Romance' },
    { id: 'scotland', name: 'Scotland', region: 'Europe', img: '1505832018823-50331d70d237', best: 'May–Sep', tag: 'Adventure' },
    { id: 'turkey', name: 'Türkiye', region: 'Middle East', img: '1530789253388-582c481c54b0', best: 'Apr–Jun · Sep–Oct', tag: 'Romance' },
    { id: 'thailand', name: 'Thailand', region: 'Asia', img: '1534008897995-27a23e859048', best: 'Nov–Apr', tag: 'Beach' },
    { id: 'patagonia', name: 'Patagonia', region: 'Americas', img: '1526772662000-3f88f10405ff', best: 'Nov–Mar', tag: 'Adventure' }
  ];
  const J = (id, dest, title, route, days, region, style, price, img, rating, hl) => ({ id, dest, title, route, days, region, style, price, img, rating, hl });
  const JOURNEYS = [
    J('japan-slowly', 'japan', 'Japan, Slowly', ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'], 12, 'Asia', 'Culture', 6450, '1493976040374-85c8e12f0c0e', 4.98,
      ['Private tea ceremony in a Kyoto machiya', 'Ryokan night with onsen in Hakone', 'After-hours tour of Fushimi Inari', 'Sushi counter seats in Ginza']),
    J('maldives-overwater', 'maldives', 'Maldives Overwater Escape', ['Malé', 'Baa Atoll'], 7, 'Islands', 'Beach', 5890, '1544551763-46a013bb70d5', 4.96,
      ['Overwater villa with private pool', 'Manta ray snorkel at Hanifaru Bay', 'Sandbank dinner under the stars', 'Seaplane transfers included']),
    J('cyclades', 'greece', 'Santorini & the Cyclades', ['Athens', 'Mykonos', 'Santorini'], 10, 'Europe', 'Romance', 4780, '1570077188670-e3a8d69ac5ff', 4.93,
      ['Private Acropolis visit at opening', 'Catamaran sunset cruise in Oia', 'Cave suite with caldera views', 'Assyrtiko wine tasting']),
    J('great-migration', 'kenya', 'Great Migration Safari', ['Nairobi', 'Masai Mara', 'Amboseli'], 9, 'Africa', 'Wildlife', 7950, '1516426122078-c23e76319801', 5.0,
      ['River crossings with a private guide', 'Hot-air balloon at sunrise', 'Tented camps with butler service', 'Kilimanjaro views in Amboseli']),
    J('bali-soul', 'indonesia', 'Bali Soul Retreat', ['Ubud', 'Sidemen', 'Uluwatu'], 10, 'Asia', 'Wellness', 3690, '1537996194471-e657df975ab4', 4.91,
      ['Daily yoga with a private teacher', 'Water temple blessing ritual', 'Rice-terrace cycling in Sidemen', 'Clifftop villa in Uluwatu']),
    J('dolomites-lodges', 'italy', 'Dolomites Lodge to Lodge', ['Cortina', 'Val Gardena', 'Lake Braies'], 8, 'Europe', 'Adventure', 4250, '1476514525535-07fb3b4ae5f1', 4.95,
      ['Guided hut-to-hut hiking', 'Luggage moved ahead each day', 'Dawn row on Lake Braies', 'Michelin-star mountain dinner']),
    J('iceland-aurora', 'iceland', 'Iceland Under the Aurora', ['Reykjavík', 'Golden Circle', 'Vík'], 7, 'Europe', 'Adventure', 4380, '1531366936337-7c912a4589a7', 4.89,
      ['Northern Lights super-jeep hunt', 'Ice cave in Vatnajökull', 'Private Blue Lagoon retreat', 'Glass-roof lodge stay']),
    J('dubai-dunes', 'uae', 'Dubai Dunes & Skyline', ['Dubai', 'Abu Dhabi', 'Liwa Oasis'], 6, 'Middle East', 'Luxury', 3950, '1512453979798-5ea266f8880c', 4.87,
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
    J('paris-riviera', 'france', 'Paris & the Riviera', ['Paris', 'Provence', 'Nice'], 9, 'Europe', 'Romance', 5120, '1502602898657-3e91760cbb34', 4.93,
      ['Seine dinner cruise', 'Lavender fields in Valensole', 'Perfume workshop in Grasse', 'Monaco by vintage car']),
    J('highlands-steam', 'scotland', 'Highlands by Steam', ['Edinburgh', 'Fort William', 'Isle of Skye'], 8, 'Europe', 'Adventure', 3980, '1505832018823-50331d70d237', 4.9,
      ['Jacobite steam train', 'Private whisky distillery visit', 'Castle hotel night', 'Fairy Pools hike on Skye']),
    J('cappadocia-coast', 'turkey', 'Cappadocia & the Turquoise Coast', ['Istanbul', 'Cappadocia', 'Bodrum'], 9, 'Middle East', 'Romance', 3560, '1530789253388-582c481c54b0', 4.92,
      ['Balloon flight at dawn', 'Cave suite in Uçhisar', 'Bosphorus yacht at sunset', 'Gulet day on the Aegean']),
    J('thai-islands', 'thailand', 'Thai Islands & Temples', ['Bangkok', 'Chiang Mai', 'Krabi'], 10, 'Asia', 'Beach', 2980, '1534008897995-27a23e859048', 4.86,
      ['Ethical elephant sanctuary', 'Longtail boat to hidden lagoons', 'Temple walk with a monk', 'Beachfront pool villa']),
    J('patagonia-edge', 'patagonia', 'Patagonia Wild Edge', ['Buenos Aires', 'El Chaltén', 'Torres del Paine'], 12, 'Americas', 'Adventure', 6890, '1526772662000-3f88f10405ff', 4.97,
      ['Fitz Roy trek with mountain guide', 'Glacier walk on Perito Moreno', 'Estancia stay with gauchos', 'Eco-lodge in Torres del Paine'])
  ];
  const INCLUDES = ['Hand-picked boutique stays', 'Private transfers throughout', 'Expert local guides', 'Daily breakfast & select dinners', '24/7 on-trip concierge', 'Carbon offset for every flight'];
  const byId = id => JOURNEYS.find(j => j.id === id);
  const fromPrice = dest => Math.min(...JOURNEYS.filter(j => j.dest === dest).map(j => j.price));
  const countFor = dest => JOURNEYS.filter(j => j.dest === dest).length;

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  function smooth() {
    if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const t = $(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      lenis ? lenis.scrollTo(t, { offset: -80 }) : t.scrollIntoView({ behavior: 'smooth' });
    }));
  }
  const lockScroll = on => {
    document.documentElement.style.overflow = on ? 'hidden' : '';
    if (lenis) on ? lenis.stop() : lenis.start();
  };

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }

  /* ---------------- header + menu ---------------- */
  function chrome() {
    try { sessionStorage.setItem('lj', '1'); } catch (e) {}
    const hdr = $('.hdr');
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      hdr.classList.toggle('scrolled', y > 40);
      hdr.classList.toggle('hide', y > 500 && y > last && !document.body.classList.contains('menu-open'));
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const burger = $('.burger');
    if (burger) burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open);
      lockScroll(open);
    });
    $$('.mnav a').forEach(a => a.addEventListener('click', () => { document.body.classList.remove('menu-open'); lockScroll(false); }));
  }

  /* ---------------- hero slideshow ---------------- */
  function hero() {
    const slides = $$('.hs'), dots = $$('.hdot');
    if (!slides.length) return;
    let i = 0, timer;
    const go = n => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('on', k === i));
      dots.forEach((d, k) => {
        d.classList.remove('on');
        if (k === i) { void d.offsetWidth; d.classList.add('on'); }
      });
      clearTimeout(timer);
      timer = setTimeout(() => go(i + 1), 7000);
    };
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    go(0);
  }

  /* ---------------- hero search ---------------- */
  function search() {
    const f = $('#hero-search');
    if (!f) return;
    f.addEventListener('submit', e => {
      e.preventDefault();
      const p = new URLSearchParams();
      ['region', 'style', 'dur'].forEach(k => { const v = f.elements[k].value; if (v) p.set(k, v); });
      location.href = 'journeys.html' + (p.toString() ? '?' + p : '') + '#results';
    });
  }

  /* ---------------- word-by-word scroll text ---------------- */
  function words() {
    const els = $$('.words');
    els.forEach(el => {
      const wrap = node => {
        [...node.childNodes].forEach(n => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(part => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1) wrap(n);
        });
      };
      wrap(el);
      el._w = $$('.w', el);
    });
    return () => els.forEach(el => {
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .3)));
      const n = Math.round(p * el._w.length);
      el._w.forEach((w, k) => w.classList.toggle('lit', k < n));
    });
  }

  /* ---------------- horizontal destinations ---------------- */
  function hz() {
    const sec = $('.hz');
    if (!sec) return () => {};
    const track = $('.hz-track', sec), bar = $('.hz-progress i', sec);
    track.innerHTML = DESTS.slice(0, 8).map(d => destCard(d)).join('') +
      `<a class="hz-end" href="destinations.html"><small class="eyebrow">${DESTS.length} destinations</small><h3>See every <em>corner</em> we know by heart.</h3><span class="arrow-c">${ARROW}</span></a>`;
    let dist = 0, desk = false;
    const size = () => {
      desk = innerWidth > 980;
      if (desk) {
        dist = Math.max(0, track.scrollWidth - innerWidth);
        sec.style.height = (innerHeight + dist) + 'px';
      } else { sec.style.height = ''; track.style.transform = ''; }
    };
    size();
    addEventListener('resize', size);
    addEventListener('load', size);
    return () => {
      if (!desk) return;
      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight || 1)));
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
  }
  function destCard(d, cls = '') {
    const n = countFor(d.id);
    return `<a class="dcard ${cls}" href="journeys.html?dest=${d.id}#results" data-cursor="Explore" data-region="${d.region}">
      <img src="${U(d.img, 900)}" alt="${d.name}" loading="lazy">
      <div class="dcard-top"><span class="pill">${d.region}</span><span class="pill">${n} journey${n > 1 ? 's' : ''}</span></div>
      <div class="dcard-body"><small>${d.tag} · <span class="best">${d.best}</span></small><h3>${d.name}</h3>
      <div class="dcard-foot"><span>From <b>${money(fromPrice(d.id))}</b></span><span class="arrow-c">${ARROW}</span></div></div></a>`;
  }

  /* ---------------- journey cards ---------------- */
  let saved = store.get('lj-saved', []);
  function cardHTML(j) {
    const on = saved.includes(j.id);
    return `<article class="jcard" data-id="${j.id}" data-cursor="View">
      <div class="jcard-media"><img src="${U(j.img, 900)}" alt="${j.title}" loading="lazy">
        <span class="pill">${j.style}</span>
        <button class="heart ${on ? 'on' : ''}" aria-label="Save journey" aria-pressed="${on}">${HEART}</button>
        <div class="jcard-days"><b>${j.days}</b><small>days</small></div></div>
      <div class="jcard-body">
        <div class="jcard-meta"><span>${j.region}</span><span class="rate">${j.rating.toFixed(2)}</span></div>
        <h3>${j.title}</h3>
        <p class="jcard-route">${j.route.join(' · ')}</p>
        <div class="jcard-foot"><div><small>From, per person</small><b>${money(j.price)}</b></div><span class="link-u">Itinerary ${ARROW}</span></div>
      </div></article>`;
  }
  function bindCards(root) {
    root.addEventListener('click', e => {
      const heart = e.target.closest('.heart');
      const card = e.target.closest('.jcard');
      if (!card) return;
      if (heart) {
        e.stopPropagation();
        const id = card.dataset.id;
        saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
        store.set('lj-saved', saved);
        const on = saved.includes(id);
        heart.classList.toggle('on', on);
        heart.setAttribute('aria-pressed', on);
        toast(on ? 'Saved to your wishlist' : 'Removed from wishlist');
        return;
      }
      openModal(card.dataset.id);
    });
  }
  function featured() {
    const el = $('#featured');
    if (!el) return;
    el.innerHTML = ['japan-slowly', 'great-migration', 'cyclades'].map(id => cardHTML(byId(id))).join('');
    bindCards(el);
  }

  /* ---------------- modal ---------------- */
  function openModal(id) {
    const j = byId(id), m = $('#modal');
    if (!j || !m) return;
    const nights = j.days - 1, per = Math.floor(nights / j.route.length);
    let rest = nights - per * j.route.length;
    let day = 1;
    const stops = j.route.map((r, k) => {
      const n = per + (rest-- > 0 ? 1 : 0);
      const from = day; day += n;
      return `<li><b>${r}</b><span>Day ${from}${n > 1 ? '–' + (from + n - 1) : ''} · ${n} night${n > 1 ? 's' : ''}${k === 0 ? ' · private arrival transfer' : ''}</span></li>`;
    }).join('');
    $('.modal-content', m).innerHTML = `
      <div class="m-hero"><img src="${U(j.img, 1400)}" alt="${j.title}"><div><span class="eyebrow">${j.region} · ${j.style}</span><h2>${j.title}</h2></div></div>
      <div class="m-body">
        <div class="m-facts"><div><small>Duration</small><b>${j.days} days</b></div><div><small>Stops</small><b>${j.route.length} places</b></div><div><small>Rating</small><b>★ ${j.rating.toFixed(2)}</b></div><div><small>Best for</small><b>${j.style}</b></div></div>
        <h4>Route</h4><ul class="route">${stops}<li><b>Fly home</b><span>Day ${j.days} · departure transfer</span></li></ul>
        <h4>Signature moments</h4><ul class="ticks">${j.hl.map(h => `<li>${h}</li>`).join('')}</ul>
        <h4>Always included</h4><ul class="ticks">${INCLUDES.map(h => `<li>${h}</li>`).join('')}</ul>
        <div class="m-cta"><div><small>From, per person sharing</small><b>${money(j.price)}</b></div><a class="btn btn-terra" href="contact.html?trip=${j.id}">Plan this journey ${ARROW}</a></div>
      </div>`;
    $('.modal-panel', m).scrollTop = 0;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    lockScroll(true);
  }
  function modal() {
    const m = $('#modal');
    if (!m) return;
    const close = () => { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); lockScroll(false); };
    $('.modal-bg', m).addEventListener('click', close);
    $('.modal-close', m).addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) close(); });
  }

  /* ---------------- journeys page ---------------- */
  function journeys() {
    const grid = $('#jgrid');
    if (!grid) return;
    const f = $('#jfilter'), count = $('#jcount'), empty = $('.empty'), sortSel = $('#jsort');
    const p = new URLSearchParams(location.search);
    ['region', 'style', 'dur'].forEach(k => { if (p.get(k) && f.elements[k]) f.elements[k].value = p.get(k); });
    let dest = p.get('dest') || '';
    if (p.get('q')) f.elements.q.value = p.get('q');
    if (dest) {
      const d = DESTS.find(x => x.id === dest);
      if (d) f.elements.q.value = d.name;
      dest = '';
    }
    const render = () => {
      const q = f.elements.q.value.trim().toLowerCase();
      const region = f.elements.region.value, style = f.elements.style.value, dur = f.elements.dur.value;
      let list = JOURNEYS.filter(j => {
        const d = DESTS.find(x => x.id === j.dest);
        const hay = (j.title + ' ' + j.route.join(' ') + ' ' + (d ? d.name : '') + ' ' + j.region + ' ' + j.style).toLowerCase();
        if (q && !hay.includes(q)) return false;
        if (region && j.region !== region) return false;
        if (style && j.style !== style) return false;
        if (dur === 'short' && j.days > 7) return false;
        if (dur === 'mid' && (j.days < 8 || j.days > 10)) return false;
        if (dur === 'long' && j.days < 11) return false;
        return true;
      });
      const s = sortSel.value;
      if (s === 'low') list.sort((a, b) => a.price - b.price);
      if (s === 'high') list.sort((a, b) => b.price - a.price);
      if (s === 'days') list.sort((a, b) => a.days - b.days);
      if (s === 'rating') list.sort((a, b) => b.rating - a.rating);
      grid.innerHTML = list.map(cardHTML).join('');
      count.textContent = list.length;
      empty.classList.toggle('show', !list.length);
      grid.classList.remove('in');
      requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.add('in')));
    };
    f.addEventListener('submit', e => { e.preventDefault(); render(); });
    f.addEventListener('change', render);
    f.elements.q.addEventListener('input', render);
    sortSel.addEventListener('change', render);
    $$('[data-reset]').forEach(b => b.addEventListener('click', () => { f.reset(); render(); }));
    bindCards(grid);
    render();
  }

  /* ---------------- destinations page ---------------- */
  function destinations() {
    const grid = $('#dgrid');
    if (!grid) return;
    grid.innerHTML = DESTS.map((d, i) => destCard(d, i % 9 === 0 ? 'big' : i % 9 === 5 ? 'tall' : '')).join('');
    const tabs = $$('.tab', $('#dtabs'));
    tabs.forEach(t => {
      const r = t.dataset.region;
      const n = r ? DESTS.filter(d => d.region === r).length : DESTS.length;
      t.insertAdjacentHTML('beforeend', `<sup>${n}</sup>`);
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.toggle('on', x === t));
        $$('.dcard', grid).forEach(c => c.classList.toggle('hide', !!r && c.dataset.region !== r));
      });
    });
  }

  /* ---------------- experiences ---------------- */
  function experiences() {
    const panels = $$('.xpanel');
    if (!panels.length) return;
    const set = p => panels.forEach(x => x.classList.toggle('on', x === p));
    const fine = matchMedia('(hover: hover) and (min-width: 981px)');
    panels.forEach(p => {
      p.addEventListener('click', () => set(p));
      p.addEventListener('mouseenter', () => { if (fine.matches) set(p); });
    });
  }

  /* ---------------- counters ---------------- */
  function counters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
      const t0 = performance.now(), dur = 2000;
      const step = t => {
        const k = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - k, 4));
        el.firstChild.nodeValue = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: .5 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ---------------- testimonials ---------------- */
  function quotes() {
    const qs = $$('.qs'), imgs = $$('.q-media img'), bar = $('.q-bar i'), cnt = $('.q-count');
    if (!qs.length) return;
    let i = 0, t;
    const go = n => {
      i = (n + qs.length) % qs.length;
      qs.forEach((q, k) => q.classList.toggle('on', k === i));
      imgs.forEach((q, k) => q.classList.toggle('on', k === i));
      if (cnt) cnt.textContent = `0${i + 1} / 0${qs.length}`;
      bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run');
      clearTimeout(t); t = setTimeout(() => go(i + 1), 7000);
    };
    $('.q-prev').addEventListener('click', () => go(i - 1));
    $('.q-next').addEventListener('click', () => go(i + 1));
    go(0);
  }

  /* ---------------- parallax ---------------- */
  function parallax() {
    const els = $$('[data-speed]');
    return () => {
      if (innerWidth < 680) return;
      els.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const c = r.top + r.height / 2 - innerHeight / 2;
        el.style.transform = `translate3d(0,${c * -parseFloat(el.dataset.speed)}px,0)`;
      });
    };
  }

  /* ---------------- cursor ---------------- */
  function cursor() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const c = document.createElement('div');
    c.className = 'cursor';
    c.innerHTML = '<span></span>';
    document.body.appendChild(c);
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; c.classList.add('show'); });
    document.addEventListener('mouseleave', () => c.classList.remove('show'));
    document.addEventListener('mouseover', e => {
      const v = e.target.closest('[data-cursor]');
      const l = e.target.closest('a, button, select, input, textarea, label');
      c.classList.toggle('big', !!v);
      c.classList.toggle('link', !v && !!l);
      if (v) c.firstChild.textContent = v.dataset.cursor;
    });
    const loop = () => {
      cx += (x - cx) * .2; cy += (y - cy) * .2;
      c.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------------- forms ---------------- */
  function newsletter() {
    $$('.news form').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault();
      const i = f.querySelector('input'), msg = f.parentElement.querySelector('.msg');
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value.trim());
      msg.textContent = ok ? 'Welcome aboard — your first letter lands this Sunday.' : 'Please enter a valid email address.';
      if (ok) f.reset();
    }));
  }
  function faq() {
    $$('.faq-q').forEach(q => q.addEventListener('click', () => {
      const it = q.parentElement, open = !it.classList.contains('open');
      $$('.faq-item').forEach(x => { x.classList.remove('open'); x.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
      if (open) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    }));
  }

  /* ---------------- trip planner ---------------- */
  function planner() {
    const pl = $('#planner');
    if (!pl) return;
    const steps = $$('.pstep', pl), bars = $$('.p-steps i', pl), next = $('.p-next', pl), back = $('.p-nav .back', pl), err = $('.p-error', pl), lbl = $('.p-count', pl);
    const data = { where: [], style: [], adults: 2, kids: 0, budget: 6000 };
    let i = 0;
    $$('.choice', pl).forEach(group => {
      const key = group.dataset.key;
      group.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        b.classList.toggle('on');
        data[key] = $$('button.on', group).map(x => x.dataset.v);
        err.textContent = '';
      });
    });
    $$('.stepper', pl).forEach(s => {
      const key = s.dataset.key, out = $('output', s), min = +s.dataset.min;
      s.addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        data[key] = Math.max(min, Math.min(12, data[key] + (+b.dataset.d)));
        out.textContent = data[key];
      });
    });
    const range = $('#budget'), rv = $('#budget-val');
    const showBudget = () => { data.budget = +range.value; rv.firstChild.nodeValue = money(data.budget) + (data.budget >= 20000 ? '+' : ''); };
    range.addEventListener('input', showBudget);
    showBudget();
    const trip = byId(new URLSearchParams(location.search).get('trip') || '');
    if (trip) {
      const d = DESTS.find(x => x.id === trip.dest);
      const b = $(`.choice[data-key="where"] button[data-v="${d ? d.name : ''}"]`, pl);
      if (b) { b.classList.add('on'); data.where = [b.dataset.v]; }
      const sb = $(`.choice[data-key="style"] button[data-v="${trip.style}"]`, pl);
      if (sb) { sb.classList.add('on'); data.style = [trip.style]; }
      pl.elements.msg.value = `I'd love to plan "${trip.title}" (${trip.days} days).`;
      $('.p-trip', pl).textContent = `Starting from: ${trip.title}`;
    }
    const show = n => {
      i = n;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      bars.forEach((b, k) => b.classList.toggle('done', k <= i));
      back.hidden = i === 0 || i === steps.length - 1;
      lbl.textContent = i < steps.length - 1 ? `Step ${i + 1} of ${steps.length - 1}` : 'Request sent';
      $('.p-nav', pl).style.display = i === steps.length - 1 ? 'none' : '';
      next.firstChild.nodeValue = i === steps.length - 2 ? 'Send my request ' : 'Continue ';
      err.textContent = '';
      const top = pl.getBoundingClientRect().top + scrollY - 100;
      if (n > 0 && pl.getBoundingClientRect().top < 0) lenis ? lenis.scrollTo(top) : scrollTo({ top, behavior: 'smooth' });
    };
    const valid = () => {
      if (i === 0 && !data.where.length) return 'Pick at least one destination — or choose “Surprise me”.';
      if (i === 1 && !pl.elements.month.value) { pl.elements.month.parentElement.classList.add('err'); return 'Let us know roughly when you would like to travel.'; }
      if (i === 2 && !data.style.length) return 'Choose at least one travel style.';
      if (i === 3) {
        let bad = '';
        const name = pl.elements.name, email = pl.elements.email;
        name.parentElement.classList.toggle('err', !name.value.trim());
        const okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        email.parentElement.classList.toggle('err', !okMail);
        if (!name.value.trim()) bad = 'Please add your name.';
        else if (!okMail) bad = 'Please add a valid email so your advisor can reply.';
        return bad;
      }
      return '';
    };
    pl.elements.month.addEventListener('change', () => pl.elements.month.parentElement.classList.remove('err'));
    pl.addEventListener('submit', e => {
      e.preventDefault();
      const bad = valid();
      if (bad) { err.textContent = bad; return; }
      if (i === steps.length - 2) {
        const ref = 'LJ-' + Math.random().toString(36).slice(2, 7).toUpperCase();
        $('#summary').innerHTML = [
          ['Reference', ref], ['Name', pl.elements.name.value.trim()], ['Where', data.where.join(', ')],
          ['When', pl.elements.month.selectedOptions[0].text + ' · ' + pl.elements.tlen.value],
          ['Travellers', `${data.adults} adult${data.adults > 1 ? 's' : ''}${data.kids ? `, ${data.kids} child${data.kids > 1 ? 'ren' : ''}` : ''}`],
          ['Style', data.style.join(', ')], ['Budget', money(data.budget) + (data.budget >= 20000 ? '+' : '') + ' per person']
        ].map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('');
        $('#done-name').textContent = pl.elements.name.value.trim().split(' ')[0];
      }
      show(i + 1);
    });
    back.addEventListener('click', () => show(i - 1));
    show(0);
  }

  /* ---------------- reveal ---------------- */
  function observe() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.rv, .ri, .stagger').forEach(el => io.observe(el));
  }

  /* ---------------- boot ---------------- */
  smooth();
  chrome();
  hero();
  search();
  const tickWords = words();
  const tickHz = hz();
  featured();
  modal();
  journeys();
  destinations();
  experiences();
  counters();
  quotes();
  const tickPx = parallax();
  cursor();
  newsletter();
  faq();
  planner();
  observe();
  let lastY = -1, lastW = 0;
  const frame = () => {
    if (scrollY !== lastY || innerWidth !== lastW) {
      lastY = scrollY; lastW = innerWidth;
      tickWords(); tickHz(); tickPx();
    }
    requestAnimationFrame(frame);
  };
  frame();
  addEventListener('resize', () => { lastY = -1; });
})();
