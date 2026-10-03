/* LUMORA — interactions v2 */
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
  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.8 4 7.4 4c2 0 3.6 1.1 4.6 2.7C13 5.1 14.6 4 16.6 4c3.6 0 6 3.6 4.7 7.1-1.8 4.8-9.3 9.4-9.3 9.4z"/></svg>';
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------- data ---------------- */
  // best: peak months, ok: shoulder months (1-12)
  const D = (id, name, region, img, coord, tag, best, ok) => ({ id, name, region, img, coord, tag, best, ok });
  const DESTS = [
    D('japan', 'Japan', 'Asia', '1528360983277-13d401cdc186', '35.01°N 135.76°E', 'Culture', [3, 4, 10, 11], [5, 9, 12]),
    D('maldives', 'Maldives', 'Islands', '1514282401047-d79a71a590e8', '4.17°N 73.50°E', 'Beach', [1, 2, 3, 4], [11, 12]),
    D('greece', 'Greece', 'Europe', '1533105079780-92b9be482077', '36.46°N 25.37°E', 'Romance', [5, 6, 9], [7, 8, 10]),
    D('kenya', 'Kenya', 'Africa', '1547471080-7cc2caa01a7e', '1.49°S 35.14°E', 'Wildlife', [7, 8, 9, 10], [1, 2, 6]),
    D('indonesia', 'Bali', 'Asia', '1555400038-63f5ba517a47', '8.51°S 115.26°E', 'Wellness', [5, 6, 7, 8, 9], [4, 10]),
    D('italy', 'Italy', 'Europe', '1552832230-c0197dd311b5', '41.89°N 12.49°E', 'Culture', [4, 5, 6, 9], [7, 8, 10]),
    D('iceland', 'Iceland', 'Europe', '1531366936337-7c912a4589a7', '64.14°N 21.94°W', 'Adventure', [9, 10, 2, 3], [11, 12, 1, 6, 7, 8]),
    D('uae', 'Dubai', 'Middle East', '1512453979798-5ea266f8880c', '25.20°N 55.27°E', 'Luxury', [11, 12, 1, 2, 3], [4, 10]),
    D('morocco', 'Morocco', 'Africa', '1539020140153-e479b8c22e70', '31.62°N 7.98°W', 'Culture', [3, 4, 5, 10], [9, 11]),
    D('canada', 'Canada', 'Americas', '1464822759023-fed622ff2c3b', '51.17°N 115.57°W', 'Adventure', [6, 7, 8, 9], [5, 10]),
    D('india', 'India', 'Asia', '1524492412937-b28074a5d7da', '27.17°N 78.04°E', 'Culture', [10, 11, 12, 1, 2], [3]),
    D('vietnam', 'Vietnam', 'Asia', '1528127269322-539801943592', '20.91°N 107.18°E', 'Culture', [2, 3, 4], [10, 11, 12]),
    D('france', 'France', 'Europe', '1499856871958-5b9627545d1a', '48.86°N 2.35°E', 'Romance', [5, 6, 9], [4, 7, 8, 10]),
    D('scotland', 'Scotland', 'Europe', '1505832018823-50331d70d237', '56.88°N 5.43°W', 'Adventure', [5, 6, 9], [7, 8]),
    D('turkey', 'Türkiye', 'Middle East', '1530789253388-582c481c54b0', '38.64°N 34.83°E', 'Romance', [4, 5, 9, 10], [6]),
    D('thailand', 'Thailand', 'Asia', '1534008897995-27a23e859048', '7.74°N 98.77°E', 'Beach', [11, 12, 1, 2], [3, 4]),
    D('patagonia', 'Patagonia', 'Americas', '1526772662000-3f88f10405ff', '49.33°S 72.89°W', 'Adventure', [12, 1, 2], [11, 3])
  ];
  const J = (id, dest, title, route, days, region, style, price, img, rating, hl) => ({ id, dest, title, route, days, region, style, price, img, rating, hl });
  const JOURNEYS = [
    J('japan-slowly', 'japan', 'Japan, Slowly', ['Tokyo', 'Hakone', 'Kyoto', 'Osaka'], 12, 'Asia', 'Culture', 6450, '1493976040374-85c8e12f0c0e', 4.98,
      ['Private tea ceremony in a Kyoto machiya', 'Ryokan night with onsen in Hakone', 'After-hours walk through Fushimi Inari', 'Sushi counter seats in Ginza']),
    J('maldives-overwater', 'maldives', 'Maldives Overwater', ['Malé', 'Baa Atoll'], 7, 'Islands', 'Beach', 5890, '1544551763-46a013bb70d5', 4.96,
      ['Overwater villa with private pool', 'Manta ray snorkel at Hanifaru Bay', 'Sandbank dinner under the stars', 'Seaplane transfers included']),
    J('cyclades', 'greece', 'Santorini & the Cyclades', ['Athens', 'Mykonos', 'Santorini'], 10, 'Europe', 'Romance', 4780, '1570077188670-e3a8d69ac5ff', 4.93,
      ['Private Acropolis visit at opening', 'Catamaran sunset cruise in Oia', 'Cave suite with caldera views', 'Assyrtiko wine tasting']),
    J('great-migration', 'kenya', 'The Great Migration', ['Nairobi', 'Masai Mara', 'Amboseli'], 9, 'Africa', 'Wildlife', 7950, '1516426122078-c23e76319801', 5.0,
      ['River crossings with a private guide', 'Hot-air balloon at sunrise', 'Tented camps with butler service', 'Kilimanjaro views in Amboseli']),
    J('bali-soul', 'indonesia', 'Bali Soul Retreat', ['Ubud', 'Sidemen', 'Uluwatu'], 10, 'Asia', 'Wellness', 3690, '1537996194471-e657df975ab4', 4.91,
      ['Daily yoga with a private teacher', 'Water temple blessing ritual', 'Rice-terrace cycling in Sidemen', 'Clifftop villa in Uluwatu']),
    J('dolomites-lodges', 'italy', 'Dolomites Lodge to Lodge', ['Cortina', 'Val Gardena', 'Lake Braies'], 8, 'Europe', 'Adventure', 4250, '1476514525535-07fb3b4ae5f1', 4.95,
      ['Guided hut-to-hut hiking', 'Luggage moved ahead each day', 'Dawn row on Lake Braies', 'Michelin-star mountain dinner']),
    J('iceland-aurora', 'iceland', 'Iceland Under the Aurora', ['Reykjavík', 'Golden Circle', 'Vík'], 7, 'Europe', 'Adventure', 4380, '1531366936337-7c912a4589a7', 4.89,
      ['Northern Lights super-jeep hunt', 'Ice cave in Vatnajökull', 'Private Blue Lagoon retreat', 'Glass-roof lodge stay']),
    J('dubai-dunes', 'uae', 'Dunes & Skyline', ['Dubai', 'Abu Dhabi', 'Liwa Oasis'], 6, 'Middle East', 'Luxury', 3950, '1512453979798-5ea266f8880c', 4.87,
      ['Desert camp in the Empty Quarter', 'Louvre Abu Dhabi private tour', 'Helicopter over Palm Jumeirah', 'Falconry at sunrise']),
    J('imperial-morocco', 'morocco', 'Imperial Morocco', ['Marrakech', 'Fes', 'Merzouga'], 11, 'Africa', 'Culture', 3850, '1489493585363-d69421e0edd3', 4.92,
      ['Riad stays in the medinas', 'Camel trek into the Erg Chebbi', 'Cooking class with a Fassi family', 'Atlas Mountains drive']),
    J('rockies-rail', 'canada', 'Rockies by Rail', ['Vancouver', 'Banff', 'Jasper'], 10, 'Americas', 'Adventure', 5640, '1464822759023-fed622ff2c3b', 4.94,
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
    J('cappadocia-coast', 'turkey', 'Cappadocia & the Coast', ['Istanbul', 'Cappadocia', 'Bodrum'], 9, 'Middle East', 'Romance', 3560, '1530789253388-582c481c54b0', 4.92,
      ['Balloon flight at dawn', 'Cave suite in Uçhisar', 'Bosphorus yacht at sunset', 'Gulet day on the Aegean']),
    J('thai-islands', 'thailand', 'Thai Islands & Temples', ['Bangkok', 'Chiang Mai', 'Krabi'], 10, 'Asia', 'Beach', 2980, '1534008897995-27a23e859048', 4.86,
      ['Ethical elephant sanctuary', 'Longtail boat to hidden lagoons', 'Temple walk with a monk', 'Beachfront pool villa']),
    J('patagonia-edge', 'patagonia', 'Patagonia Wild Edge', ['Buenos Aires', 'El Chaltén', 'Torres del Paine'], 12, 'Americas', 'Adventure', 6890, '1526772662000-3f88f10405ff', 4.97,
      ['Fitz Roy trek with a mountain guide', 'Glacier walk on Perito Moreno', 'Estancia stay with gauchos', 'Eco-lodge in Torres del Paine'])
  ];
  const INCLUDES = ['Hand-picked boutique stays', 'Private transfers throughout', 'Expert local guides', 'Daily breakfast & select dinners', '24/7 on-trip concierge', 'Carbon-balanced flights'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const byId = id => JOURNEYS.find(j => j.id === id);
  const fromPrice = d => Math.min(...JOURNEYS.filter(j => j.dest === d).map(j => j.price));
  const countFor = d => JOURNEYS.filter(j => j.dest === d).length;

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const lockScroll = on => { document.documentElement.style.overflow = on ? 'hidden' : ''; if (lenis) on ? lenis.stop() : lenis.start(); };
  const scrollToEl = el => lenis ? lenis.scrollTo(el, { offset: -20 }) : el.scrollIntoView({ behavior: 'smooth' });

  /* ---------------- toast ---------------- */
  let toastT;
  const toast = msg => {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('show'));
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  };

  /* ---------------- split text ---------------- */
  function split() {
    $$('[data-split]').forEach(el => {
      let i = 0;
      const mode = el.dataset.split;
      const walk = node => {
        [...node.childNodes].forEach(n => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(part => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
              const w = document.createElement('span'); w.className = 'w';
              if (mode === 'words') {
                const c = document.createElement('span'); c.className = 'c'; c.style.setProperty('--i', i++); c.textContent = part; w.appendChild(c);
              } else {
                [...part].forEach(ch => { const c = document.createElement('span'); c.className = 'c'; c.style.setProperty('--i', i++); c.textContent = ch; w.appendChild(c); });
              }
              frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('ipill')) walk(n);
        });
      };
      walk(el);
    });
  }

  /* ---------------- loader / curtain / ready ---------------- */
  function intro(done) {
    let seen = false;
    try { seen = !!sessionStorage.getItem('lj2'); sessionStorage.setItem('lj2', '1'); } catch (e) {}
    const loader = $('.loader');
    if (seen || !loader) { setTimeout(done, 350); return; }
    const imgs = $$('.loader-frame img', loader), num = $('.loader-num', loader);
    let k = 0;
    const flip = setInterval(() => { imgs.forEach((im, i) => im.classList.toggle('on', i === k % imgs.length)); k++; }, 260);
    const t0 = performance.now(), dur = 2100;
    const step = t => {
      const p = clamp((t - t0) / dur, 0, 1), v = Math.round((1 - Math.pow(1 - p, 3)) * 100);
      num.textContent = String(v).padStart(2, '0');
      if (p < 1) requestAnimationFrame(step);
      else { clearInterval(flip); loader.classList.add('out'); setTimeout(done, 450); setTimeout(() => loader.remove(), 1300); }
    };
    requestAnimationFrame(step);
  }
  function transitions() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:/.test(href)) return;
      const url = new URL(href, location.href);
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      try { sessionStorage.setItem('lj2', '1'); } catch (err) {}
      document.documentElement.classList.add('seen');
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = url.href; }, 650);
    });
    addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });
  }

  /* ---------------- header / menu / clocks ---------------- */
  function chrome() {
    const hdr = $('.hdr');
    let last = 0;
    addEventListener('scroll', () => {
      const y = scrollY;
      hdr.classList.toggle('hide', y > 300 && y > last && !document.body.classList.contains('menu-open'));
      last = y;
    }, { passive: true });
    const b = $('.burger');
    if (b) b.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      b.setAttribute('aria-expanded', open);
      $('.burger em', b).textContent = open ? 'Close' : 'Menu';
      lockScroll(open);
    });
    const tick = () => $$('[data-tz]').forEach(el => {
      try { el.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: el.dataset.tz }); } catch (e) {}
    });
    tick(); setInterval(tick, 15000);
  }

  /* ---------------- home hero ---------------- */
  function hero() {
    const sec = $('.hx');
    if (!sec) return () => {};
    const slides = $$('.hx-slide', sec), dots = $$('.hx-dot', sec), media = $('.hx-media', sec), inner = $('.hx-in', sec);
    const place = $('[data-hplace]', sec), coord = $('[data-hcoord]', sec);
    let k = 0, t;
    const go = n => {
      k = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('on', i === k));
      dots.forEach((d, i) => { d.classList.remove('on'); if (i === k) { void d.offsetWidth; d.classList.add('on'); } });
      place.textContent = slides[k].dataset.place;
      coord.textContent = slides[k].dataset.coord;
      clearTimeout(t); t = setTimeout(() => go(k + 1), 7000);
    };
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    go(0);
    return () => {
      const p = clamp(scrollY / innerHeight, 0, 1);
      const m = innerWidth < 640 ? 3 : 2.5;
      media.style.clipPath = `inset(${p * 6}% ${p * m}% 0% ${p * m}% round ${p * 30}px)`;
      inner.style.transform = `translate3d(0,${p * innerHeight * .25}px,0)`;
      inner.style.opacity = 1 - p * 1.1;
    };
  }

  /* ---------------- drag carousels ---------------- */
  function drags() {
    $$('.drag').forEach(d => {
      const track = $('.drag-track', d), bar = d.parentElement.querySelector('.drag-bar .bar i');
      if (!fine) {
        d.classList.add('native');
        if (bar) d.addEventListener('scroll', () => {
          const max = d.scrollWidth - d.clientWidth;
          bar.style.width = clamp(d.clientWidth / d.scrollWidth * 100, 10, 100) + '%';
          bar.style.left = (max ? d.scrollLeft / max : 0) * (100 - parseFloat(bar.style.width)) + '%';
        }, { passive: true });
        return;
      }
      let x = 0, tx = 0, down = false, sx = 0, start = 0, moved = 0, max = 0;
      const size = () => { max = Math.max(0, track.scrollWidth - d.clientWidth); if (bar) bar.style.width = clamp(d.clientWidth / track.scrollWidth * 100, 10, 100) + '%'; };
      size(); addEventListener('resize', size); addEventListener('load', size);
      d.addEventListener('pointerdown', e => { down = true; moved = 0; sx = e.clientX; start = tx; d.classList.add('grabbing'); });
      addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); tx = clamp(start + dx * 1.4, -max, 0); });
      addEventListener('pointerup', () => { down = false; d.classList.remove('grabbing'); });
      d.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);
      d.addEventListener('dragstart', e => e.preventDefault());
      d.addEventListener('wheel', e => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); tx = clamp(tx - e.deltaX, -max, 0); }
      }, { passive: false });
      const items = [...track.children];
      const loop = () => {
        const prev = x;
        x += (tx - x) * .09;
        const vel = clamp((x - prev) * .12, -6, 6);
        track.style.transform = `translate3d(${x}px,0,0)`;
        items.forEach(it => { it.style.transform = `skewX(${-vel}deg)`; });
        if (bar) bar.style.left = (max ? -x / max : 0) * (100 - parseFloat(bar.style.width || 20)) + '%';
        requestAnimationFrame(loop);
      };
      loop();
    });
  }
  const destCard = (d, i, cls = '') => {
    const n = countFor(d.id);
    return `<a class="dc ${cls}" href="journeys.html?dest=${d.id}" data-region="${d.region}" data-cur="Explore">
      <div class="dc-media"><img src="${U(d.img, 900)}" alt="${d.name}" loading="lazy" draggable="false">
      <div class="dc-top mono"><span>${String(i + 1).padStart(2, '0')}</span><span>${d.coord}</span></div>
      <div class="dc-bot"><span class="tag">${d.region}</span><h3>${d.name}</h3>
      <div class="dc-row"><span>From ${money(fromPrice(d.id))} · ${n} journey${n > 1 ? 's' : ''}</span><span class="go">${ARROW}</span></div></div></div></a>`;
  };
  function homeDests() {
    const t = $('#home-dests');
    if (t) t.innerHTML = DESTS.slice(0, 9).map((d, i) => destCard(d, i)).join('');
  }

  /* ---------------- stacking cards ---------------- */
  function stack() {
    const wrap = $('#stack');
    if (!wrap) return () => {};
    const ids = ['japan-slowly', 'great-migration', 'cyclades', 'patagonia-edge'];
    wrap.innerHTML = ids.map((id, i) => {
      const j = byId(id);
      return `<article class="sc" style="--i:${i}">
        <div class="sc-media"><img src="${U(j.img, 1500)}" alt="${j.title}" loading="lazy"><div class="tags"><span class="tag acc-t">${j.days} days</span><span class="tag">${j.style}</span></div></div>
        <div class="sc-body"><div class="num mono"><span>(${String(i + 1).padStart(2, '0')}/${String(ids.length).padStart(2, '0')})</span><span class="mut">${j.region} · ★ ${j.rating.toFixed(2)}</span></div>
          <h3 class="d-m">${j.title}</h3>
          <div class="route-l">${j.route.map(r => `<span>${r}</span>`).join('<i></i>')}</div>
          <ul class="sc-hl">${j.hl.slice(0, 3).map(h => `<li>${h}</li>`).join('')}</ul>
          <div class="sc-foot"><div class="price"><span class="mono mut">From / person</span><b>${money(j.price)}</b></div>
          <div class="acts"><button class="btn btn-line" data-open="${j.id}">Itinerary</button><a class="btn btn-acc" href="contact.html?trip=${j.id}"><span class="roll"><span data-t="Plan it">Plan it</span></span>${ARROW}</a></div></div>
        </div></article>`;
    }).join('');
    const cards = $$('.sc', wrap);
    return () => {
      if (innerWidth < 900) { cards.forEach(c => { c.style.transform = ''; c.style.filter = ''; }); return; }
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const r = next.getBoundingClientRect(), top = parseFloat(getComputedStyle(next).top);
        const p = clamp(1 - (r.top - top) / (innerHeight * .8), 0, 1);
        c.style.transform = `scale(${1 - p * .06})`;
        c.style.filter = `brightness(${1 - p * .45})`;
      });
    };
  }

  /* ---------------- velocity marquee ---------------- */
  function velMarquee() {
    const rows = $$('.vm-row');
    if (!rows.length) return;
    rows.forEach(r => { r.innerHTML += r.innerHTML; });
    const st = rows.map(() => ({ x: 0 }));
    let lastY = scrollY, v = 0;
    const loop = () => {
      const dy = scrollY - lastY; lastY = scrollY;
      v += (dy - v) * .1;
      rows.forEach((r, i) => {
        const w = r.scrollWidth / 2, dir = i % 2 ? 1 : -1;
        st[i].x += dir * (0.6 + Math.abs(v) * .35) * (v < 0 ? -1 : 1);
        if (st[i].x <= -w) st[i].x += w;
        if (st[i].x > 0) st[i].x -= w;
        r.style.transform = `translate3d(${st[i].x}px,0,0)`;
      });
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------------- parallax ---------------- */
  function parallax() {
    const els = $$('[data-speed]');
    const bands = $$('.band');
    return () => {
      bands.forEach(b => {
        const r = b.getBoundingClientRect();
        const p = clamp(1 - (r.top - 80) / (innerHeight * .7), 0, 1);
        b.style.setProperty('--bi', (6 * (1 - p)) + '%');
        b.style.setProperty('--br', (30 * (1 - p)) + 'px');
        const img = $('img', b);
        if (img) img.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -.12}px,0)`;
      });
      if (innerWidth < 640) return;
      els.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -300 || r.top > innerHeight + 300) return;
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -parseFloat(el.dataset.speed)}px,0)`;
      });
    };
  }

  /* ---------------- journey cards / modal ---------------- */
  let saved = store.get('lj-saved', []);
  const cardHTML = j => {
    const on = saved.includes(j.id);
    return `<article class="jc" data-id="${j.id}" data-cur="View">
      <div class="jc-media"><img src="${U(j.img, 900)}" alt="${j.title}" loading="lazy"><span class="tag acc-t">${j.days} days</span>
        <button class="heart ${on ? 'on' : ''}" aria-label="Save journey" aria-pressed="${on}">${HEART}</button></div>
      <div class="jc-b"><div class="jc-meta mono mut"><span>${j.region} · ${j.style}</span><span>★ ${j.rating.toFixed(2)}</span></div>
        <h3>${j.title}</h3><p class="jc-route">${j.route.join(' → ')}</p>
        <div class="jc-foot"><span class="mono mut">From / person</span><b>${money(j.price)}</b></div></div></article>`;
  };
  const rowHTML = (j, i) => `<div class="jr" data-id="${j.id}"><span class="mono mut">${String(i + 1).padStart(2, '0')}</span>
    <div><h3>${j.title}</h3><span class="mono mut">${j.region} · ${j.style}</span></div>
    <span class="rt mut">${j.route.join(' → ')}</span><span class="mono dd">${j.days} days</span><span class="p">${money(j.price)}</span><span class="go">${ARROW}</span></div>`;
  function bindCards(root) {
    root.addEventListener('click', e => {
      const heart = e.target.closest('.heart'), card = e.target.closest('[data-id]');
      if (!card) return;
      if (heart) {
        e.stopPropagation();
        const id = card.dataset.id;
        saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
        store.set('lj-saved', saved);
        const on = saved.includes(id);
        heart.classList.toggle('on', on); heart.setAttribute('aria-pressed', on);
        toast(on ? 'Saved to your wishlist' : 'Removed from wishlist');
        return;
      }
      openModal(card.dataset.id);
    });
  }
  function openModal(id) {
    const j = byId(id), m = $('#modal');
    if (!j || !m) return;
    const nights = j.days - 1, per = Math.floor(nights / j.route.length);
    let rest = nights - per * j.route.length, day = 1;
    const stops = j.route.map((r, k) => {
      const n = per + (rest-- > 0 ? 1 : 0), from = day; day += n;
      return `<li><span class="mono">Day ${from}${n > 1 ? '–' + (from + n - 1) : ''}</span><div><b>${r}</b><br><span>${n} night${n > 1 ? 's' : ''}${k === 0 ? ' · private arrival transfer' : ''}</span></div></li>`;
    }).join('');
    $('.m-media', m).innerHTML = `<img src="${U(j.img, 1600)}" alt="${j.title}"><span class="tag">${DESTS.find(d => d.id === j.dest).coord}</span>`;
    $('.m-scroll', m).innerHTML = `<span class="mono idx">${j.region} · ${j.style}</span><h2 class="d-l">${j.title}</h2>
      <div class="m-facts"><div><span class="mono mut">Duration</span><b>${j.days} days</b></div><div><span class="mono mut">Stops</span><b>${j.route.length}</b></div><div><span class="mono mut">Rating</span><b>★ ${j.rating.toFixed(2)}</b></div><div><span class="mono mut">Style</span><b>${j.style}</b></div></div>
      <h4>The route</h4><ul class="tl">${stops}<li><span class="mono">Day ${j.days}</span><div><b>Fly home</b><br><span>Departure transfer</span></div></li></ul>
      <h4>Signature moments</h4><ul class="ticks">${j.hl.map(h => `<li>${h}</li>`).join('')}</ul>
      <h4>Always included</h4><ul class="ticks">${INCLUDES.map(h => `<li>${h}</li>`).join('')}</ul>
      <div class="m-cta"><div><span class="mono">From / person sharing</span><b>${money(j.price)}</b></div><a class="btn btn-ink" href="contact.html?trip=${j.id}">Plan this journey ${ARROW}</a></div>`;
    $('.m-scroll', m).scrollTop = 0;
    m.classList.add('open'); m.setAttribute('aria-hidden', 'false');
    lockScroll(true);
  }
  function modal() {
    const m = $('#modal');
    if (!m) return;
    const close = () => { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); lockScroll(false); };
    $('.m-close', m).addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) close(); });
    document.addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openModal(b.dataset.open); });
  }

  /* ---------------- journeys page ---------------- */
  function journeys() {
    const page = $('#jpage');
    if (!page) return;
    const grid = $('#jg'), list = $('#jl'), cnt = $('#jcount'), empty = $('.empty', page), q = $('#q'), sort = $('#jsort');
    const st = { region: '', style: '', dur: '' };
    const p = new URLSearchParams(location.search);
    ['region', 'style', 'dur'].forEach(k => { if (p.get(k)) st[k] = p.get(k); });
    if (p.get('dest')) { const d = DESTS.find(x => x.id === p.get('dest')); if (d) q.value = d.name; }
    if (p.get('q')) q.value = p.get('q');
    const syncChips = () => $$('[data-f]', page).forEach(c => c.classList.toggle('on', st[c.dataset.f] === c.dataset.v));
    const render = () => {
      const s = q.value.trim().toLowerCase();
      let out = JOURNEYS.filter(j => {
        const d = DESTS.find(x => x.id === j.dest);
        const hay = `${j.title} ${j.route.join(' ')} ${d.name} ${j.region} ${j.style}`.toLowerCase();
        if (s && !hay.includes(s)) return false;
        if (st.region && j.region !== st.region) return false;
        if (st.style && j.style !== st.style) return false;
        if (st.dur === 'short' && j.days > 7) return false;
        if (st.dur === 'mid' && (j.days < 8 || j.days > 10)) return false;
        if (st.dur === 'long' && j.days < 11) return false;
        return true;
      });
      const so = sort.value;
      if (so === 'low') out.sort((a, b) => a.price - b.price);
      if (so === 'high') out.sort((a, b) => b.price - a.price);
      if (so === 'days') out.sort((a, b) => a.days - b.days);
      if (so === 'rating') out.sort((a, b) => b.rating - a.rating);
      grid.innerHTML = out.map(cardHTML).join('');
      list.innerHTML = out.map(rowHTML).join('');
      cnt.textContent = String(out.length).padStart(2, '0');
      empty.classList.toggle('show', !out.length);
      grid.classList.remove('in'); list.classList.remove('in');
      requestAnimationFrame(() => requestAnimationFrame(() => { grid.classList.add('in'); list.classList.add('in'); }));
      syncChips();
    };
    $$('[data-f]', page).forEach(c => c.addEventListener('click', () => { const k = c.dataset.f; st[k] = st[k] === c.dataset.v ? '' : c.dataset.v; render(); }));
    $('#jregion').value = st.region;
    $('#jregion').addEventListener('change', e => { st.region = e.target.value; render(); });
    $('#jdur').value = st.dur;
    $('#jdur').addEventListener('change', e => { st.dur = e.target.value; render(); });
    q.addEventListener('input', render);
    sort.addEventListener('change', render);
    $$('[data-reset]', page).forEach(b => b.addEventListener('click', () => { st.region = st.style = st.dur = ''; q.value = ''; $('#jregion').value = ''; $('#jdur').value = ''; render(); }));
    $$('.view-t button', page).forEach(b => b.addEventListener('click', () => {
      $$('.view-t button', page).forEach(x => x.classList.toggle('on', x === b));
      page.classList.toggle('jlist', b.dataset.v === 'list');
      store.set('lj-view', b.dataset.v);
    }));
    if (store.get('lj-view', 'grid') === 'list') $('.view-t button[data-v=list]', page).click();
    bindCards(grid); bindCards(list);
    render();
  }

  /* ---------------- destinations page ---------------- */
  function destinations() {
    const g = $('#dg');
    if (!g) return;
    g.innerHTML = DESTS.map((d, i) => destCard(d, i)).join('');
    const cards = $$('.dc', g);
    const stagger = () => {
      const cols = innerWidth > 1100 ? 3 : innerWidth > 640 ? 2 : 1;
      cards.filter(c => !c.classList.contains('hide')).forEach((c, i) => c.classList.toggle('off', cols > 1 && i % cols === 1));
    };
    $$('#dtabs .chip').forEach(t => {
      const r = t.dataset.region;
      t.insertAdjacentHTML('beforeend', `<sup>${r ? DESTS.filter(d => d.region === r).length : DESTS.length}</sup>`);
      t.addEventListener('click', () => {
        $$('#dtabs .chip').forEach(x => x.classList.toggle('on', x === t));
        cards.forEach(c => c.classList.toggle('hide', !!r && c.dataset.region !== r));
        stagger();
      });
    });
    stagger(); addEventListener('resize', stagger);
    const mx = $('#mx');
    if (mx) mx.innerHTML = `<thead><tr><th>Destination</th>${MONTHS.map(m => `<th>${m}</th>`).join('')}</tr></thead><tbody>${DESTS.map((d, r) =>
      `<tr><td>${d.name}<small>${d.region}</small></td>${MONTHS.map((m, i) => `<td>${d.best.includes(i + 1) ? `<i class="dot" style="--d:${r + i}"></i>` : d.ok.includes(i + 1) ? `<i class="dot ok" style="--d:${r + i}"></i>` : ''}</td>`).join('')}</tr>`).join('')}</tbody>`;
  }

  /* ---------------- counters ---------------- */
  function counters() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, to = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length, t0 = performance.now();
      const step = t => {
        const k = clamp((t - t0) / 2000, 0, 1), v = to * (1 - Math.pow(1 - k, 4));
        el.firstChild.nodeValue = dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: .4 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  /* ---------------- cursor + magnetic ---------------- */
  function cursor() {
    if (!fine) return;
    const c = document.createElement('div'); c.className = 'cur'; c.innerHTML = '<span></span>';
    document.body.appendChild(c);
    let x = -100, y = -100, cx = -100, cy = -100;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; c.classList.add('show'); });
    document.addEventListener('mouseleave', () => c.classList.remove('show'));
    document.addEventListener('mouseover', e => {
      const lab = e.target.closest('[data-cur]'), l = e.target.closest('a, button, select, input, textarea, label');
      c.classList.toggle('lbl', !!lab);
      c.classList.toggle('link', !lab && !!l);
      if (lab) c.firstChild.textContent = lab.dataset.cur;
    });
    const loop = () => { cx += (x - cx) * .18; cy += (y - cy) * .18; c.style.transform = `translate3d(${cx}px,${cy}px,0)`; requestAnimationFrame(loop); };
    loop();
    $$('.mag').forEach(m => {
      m.addEventListener('mousemove', e => { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      m.addEventListener('mouseleave', () => { m.style.transform = ''; });
    });
  }

  /* ---------------- forms ---------------- */
  const okMail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  function newsletter() {
    $$('.news-f form').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault();
      const i = $('input', f), msg = f.parentElement.querySelector('.msg');
      msg.textContent = okMail(i.value) ? 'You’re in. First dispatch lands Sunday.' : 'Please enter a valid email address.';
      if (okMail(i.value)) f.reset();
    }));
  }
  function faq() {
    $$('.faq-q').forEach(q => q.addEventListener('click', () => {
      const it = q.parentElement, open = !it.classList.contains('open');
      $$('.faq-item').forEach(x => { x.classList.remove('open'); $('.faq-q', x).setAttribute('aria-expanded', 'false'); });
      if (open) { it.classList.add('open'); q.setAttribute('aria-expanded', 'true'); }
    }));
  }
  function planner() {
    const pl = $('#planner');
    if (!pl) return;
    const steps = $$('.pstep', pl), bars = $$('.pl-steps i', pl), next = $('.p-next', pl), back = $('.p-nav .back', pl), err = $('.p-error', pl), lbl = $('.pl-count', pl);
    const data = { where: [], style: [], adults: 2, kids: 0, budget: 6000 };
    let i = 0;
    $$('.pick', pl).forEach(g => g.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      b.classList.toggle('on');
      data[g.dataset.key] = $$('button.on', g).map(x => x.dataset.v);
      err.textContent = '';
    }));
    $$('.stepper', pl).forEach(s => s.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const k = s.dataset.key;
      data[k] = clamp(data[k] + (+b.dataset.d), +s.dataset.min, 12);
      $('output', s).textContent = data[k];
    }));
    const range = $('#budget'), out = $('#budget-val');
    const bud = () => { data.budget = +range.value; out.textContent = money(data.budget) + (data.budget >= 20000 ? '+' : ''); };
    range.addEventListener('input', bud); bud();
    const trip = byId(new URLSearchParams(location.search).get('trip') || '');
    if (trip) {
      const d = DESTS.find(x => x.id === trip.dest);
      const b = $(`.pick[data-key=where] button[data-v="${d.name}"]`, pl);
      if (b) { b.classList.add('on'); data.where = [d.name]; }
      const sb = $(`.pick[data-key=style] button[data-v="${trip.style}"]`, pl);
      if (sb) { sb.classList.add('on'); data.style = [trip.style]; }
      pl.elements.msg.value = `I'd love to plan "${trip.title}" (${trip.days} days).`;
      $('.pl-trip', pl).textContent = `↳ ${trip.title}`;
    }
    const show = n => {
      i = n;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      bars.forEach((b, k) => b.classList.toggle('done', k <= i));
      back.hidden = i === 0 || i === steps.length - 1;
      $('.p-nav', pl).style.display = i === steps.length - 1 ? 'none' : '';
      lbl.textContent = i < steps.length - 1 ? `Step 0${i + 1} / 04` : 'Sent ✓';
      $('.roll > span', next).textContent = i === steps.length - 2 ? 'Send request' : 'Continue';
      $('.roll > span', next).dataset.t = $('.roll > span', next).textContent;
      err.textContent = '';
      if (n > 0 && pl.getBoundingClientRect().top < 0) scrollToEl(pl);
    };
    const valid = () => {
      if (i === 0 && !data.where.length) return 'Pick at least one place — or “Surprise me”.';
      if (i === 1 && !pl.elements.month.value) { pl.elements.month.parentElement.classList.add('err'); return 'Roughly when would you like to travel?'; }
      if (i === 2 && !data.style.length) return 'Choose at least one travel style.';
      if (i === 3) {
        const n = pl.elements.name, m = pl.elements.email;
        n.parentElement.classList.toggle('err', !n.value.trim());
        m.parentElement.classList.toggle('err', !okMail(m.value));
        if (!n.value.trim()) return 'Please add your name.';
        if (!okMail(m.value)) return 'Please add a valid email so your designer can reply.';
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
        $('#summary').innerHTML = [['Reference', ref], ['Name', pl.elements.name.value.trim()], ['Where', data.where.join(', ')],
          ['When', pl.elements.month.selectedOptions[0].text + ' · ' + pl.elements.tlen.value],
          ['Travellers', `${data.adults} adult${data.adults > 1 ? 's' : ''}${data.kids ? `, ${data.kids} child${data.kids > 1 ? 'ren' : ''}` : ''}`],
          ['Style', data.style.join(', ')], ['Budget', money(data.budget) + (data.budget >= 20000 ? '+' : '') + ' / person']
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
    }), { threshold: .1, rootMargin: '0px 0px -5% 0px' });
    $$('.rv, .st, [data-split]:not(.hx-title [data-split]):not([data-hero]), .manifest, .matrix').forEach(el => io.observe(el));
  }

  /* ---------------- fit big type to its box ---------------- */
  function fit() {
    $$('.d-xl, .d-l, .d-m, .f-word, .manifest, .yr b, .dc-bot h3').forEach(el => {
      el.style.fontSize = '';
      const avail = el.clientWidth;
      if (!avail) return;
      const ws = $$('.w', el);
      const widest = ws.length ? Math.max(...ws.map(w => w.offsetWidth)) : el.scrollWidth;
      if (widest > avail) el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * avail / widest * .98) + 'px';
    });
  }

  /* ---------------- boot ---------------- */
  split();
  fit();
  addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  transitions();
  chrome();
  homeDests();
  const tHero = hero();
  const tStack = stack();
  drags();
  velMarquee();
  const tPx = parallax();
  modal();
  journeys();
  destinations();
  counters();
  cursor();
  newsletter();
  faq();
  planner();
  intro(() => { document.body.classList.add('ready'); $$('[data-hero]').forEach(el => el.classList.add('in')); observe(); });
  let ly = -1, lw = 0;
  const frame = () => {
    if (scrollY !== ly || innerWidth !== lw) { ly = scrollY; lw = innerWidth; tHero(); tStack(); tPx(); }
    requestAnimationFrame(frame);
  };
  frame();
})();
