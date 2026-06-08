/* Nova Asian Bistro — interactions */

// ---------- Image fallback ----------
// Use local images/*.jpg if present; otherwise fall back to data-fb URL.
document.querySelectorAll('img[data-fb]').forEach(img => {
  let used = false;
  img.addEventListener('error', () => {
    if (used) return;
    used = true;
    img.src = img.dataset.fb;
  }, { once: false });
});


// ---------- Menu data ----------
const MENU = {
  rolls: [
    { name: "Jericho Turnpike Roll", desc: "Lobster tempura and asparagus inside, topped with spicy crab, eel sauce and sweet miso.", price: "17", tag: "House" },
    { name: "American Dream Roll", desc: "Shrimp tempura and cucumber, topped with eel, avocado, black tobiko and eel sauce.", price: "15" },
    { name: "Angry Dragon Roll", desc: "Shrimp tempura and spicy tuna, topped with yellowtail, avocado and jalapeño, yuzu wasabi.", price: "16", tag: "Spicy" },
    { name: "Spicy City Roll", desc: "Spicy crab and avocado inside, baked spicy crab, scallop, white fish, tobiko and eel sauce.", price: "17", tag: "Spicy" },
    { name: "Passion Roll", desc: "Spicy crunchy tuna, salmon, yellowtail and crab, wrapped in tuna and shaped like a heart.", price: "16" },
    { name: "Volcano Roll", desc: "Shrimp tempura and cucumber inside, spicy tuna outside.", price: "14" },
    { name: "Dragon Roll", desc: "Eel and cucumber inside, avocado on top.", price: "14" },
    { name: "Rainbow Roll", desc: "California roll topped with tuna, salmon, white fish and avocado.", price: "13" },
  ],
  sushi: [
    { name: "Sushi and Sashimi (for 2)", desc: "8 pieces sushi, 18 pieces sashimi, spicy tuna roll and dragon roll.", price: "55", tag: "For Two" },
    { name: "Sashimi Deluxe", desc: "Sixteen pieces of chef's market selection.", price: "25" },
    { name: "Chirashi", desc: "13 pieces assorted raw fish, egg and pickles over seasoned rice.", price: "24" },
    { name: "Unagi Don", desc: "Broiled eel and Japanese pickled vegetable over seasoned rice.", price: "25" },
    { name: "Sushi Sashimi (for 1)", desc: "9 pieces sashimi, 5 pieces sushi and a California roll.", price: "26" },
    { name: "Yellowtail Jalapeño", desc: "With ponzu sauce.", price: "13" },
    { name: "Pepper Tuna Tataki", desc: "Seared peppered tuna, ponzu.", price: "12" },
    { name: "Sushi Pizza", desc: "House specialty, crisp rice base.", price: "13" },
  ],
  kitchen: [
    { name: "Grilled Chilean Sea Bass", desc: "Sautéed mixed vegetable with chef's miso-sake dressing.", price: "30", tag: "Chef" },
    { name: "Crispy Duck", desc: "Plum sauce with mixed vegetables.", price: "28" },
    { name: "Thai Red Curry Seafood Casserole", desc: "Lobster tail, shrimp, scallops and white fish in mild curry.", price: "29", tag: "Spicy" },
    { name: "Filet Mignon", desc: "8 oz filet mignon with chef's brown sauce.", price: "27" },
    { name: "Crispy Walnut Shrimp and Chicken", desc: "Creamy crispy shrimp with tangy sweet chicken.", price: "22" },
    { name: "Pineapple Chicken and Shrimp", desc: "Bell pepper, onion and fresh pineapple in mild sweet and sour.", price: "19" },
    { name: "Mongolian Beef", desc: "Sliced beef, scallion and onion with sweet brown sauce.", price: "18" },
    { name: "Sesame Chicken", desc: "Crispy white meat, tangy sauce and seasonal greens.", price: "16" },
  ],
  hibachi: [
    { name: "Hibachi Lobster Tail and Steak", desc: "With soup, salad, hibachi shrimp and rice.", price: "33", tag: "Signature" },
    { name: "Hibachi Chicken and Shrimp", desc: "With soup, salad, hibachi shrimp and rice.", price: "25" },
    { name: "Hibachi Steak", desc: "With soup, salad, hibachi shrimp and rice.", price: "24" },
    { name: "Steak Teriyaki", desc: "With miso soup or salad and rice.", price: "21" },
    { name: "Singapore Mai Fun", desc: "Rice vermicelli, chicken, shrimp and vegetable, yellow curry.", price: "14", tag: "Spicy" },
    { name: "Drunken Noodle", desc: "Wide rice noodles, basil and chili.", price: "12", tag: "Spicy" },
    { name: "Pad Thai Noodle", desc: "Thai flat noodles, tamarind and peanut.", price: "12" },
    { name: "Hawaiian Pineapple Fried Rice", desc: "Wok-fired with fresh pineapple.", price: "13" },
  ],
  starters: [
    { name: "Sushi Sandwich", desc: "Spicy tuna, lobster salad, tamago, avocado and kani with black caviar.", price: "15" },
    { name: "Spicy Tuna Dumpling", desc: "Delicate dumplings with chili.", price: "12", tag: "Spicy" },
    { name: "Soft Shell Crab", desc: "Lightly fried, house sauce.", price: "11" },
    { name: "Chicken Lettuce Wrap", desc: "Diced chicken and bell peppers with Thai hoisin sauce.", price: "12" },
    { name: "Rock Shrimp", desc: "Crispy shrimp with curry cream sauce.", price: "10", tag: "Spicy" },
    { name: "Crispy Calamari Salad", desc: "Roasted garlic and Thai chili dressing.", price: "10" },
    { name: "Beef Negimaki", desc: "Scallion wrapped in thin-sliced beef.", price: "12" },
    { name: "Homemade Dumpling Soup", desc: "Pork and shrimp.", price: "4" },
  ],
};

function renderMenu(tab) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const items = MENU[tab] || [];
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'menu-item';
    el.style.animationDelay = `${i * 60}ms`;
    el.innerHTML = `
      <div class="mi-left">
        <span class="mi-name">${item.name}${item.tag ? ` <span class="mi-tag">${item.tag}</span>` : ''}</span>
        <span class="mi-desc">${item.desc}</span>
      </div>
      <span class="mi-dots"></span>
      <span class="mi-price">${item.price === 'MP' ? 'MP' : '$' + item.price}</span>
    `;
    grid.appendChild(el);
  });
}

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    renderMenu(btn.dataset.tab);
  });
});

renderMenu('rolls');

// ---------- Nav scroll state ----------
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile nav ----------
const toggle = document.getElementById('navToggle');
const mobile = document.getElementById('navMobile');
toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('open');
  mobile.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  mobile.setAttribute('aria-hidden', open ? 'false' : 'true');
});
mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('open');
  mobile.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  mobile.setAttribute('aria-hidden', 'true');
}));

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Today's hours highlight ----------
const HOURS = [
  { open: '1:00 PM', close: '10:00 PM', label: 'Sunday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Monday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Tuesday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Wednesday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Thursday' },
  { open: '11:00 AM', close: '11:00 PM', label: 'Friday' },
  { open: '11:00 AM', close: '11:00 PM', label: 'Saturday' },
];

const today = new Date().getDay();
const todayHours = document.getElementById('todayHours');
if (todayHours) {
  todayHours.textContent = `${HOURS[today].open} – ${HOURS[today].close}`;
}

const hoursList = document.getElementById('hoursList');
if (hoursList) {
  const idx = (today + 6) % 7; // list starts Monday
  const items = hoursList.querySelectorAll('li');
  if (items[idx]) items[idx].classList.add('today');
}

// ---------- Reservation form ----------
const form = document.getElementById('reserveForm');
const status = document.getElementById('reserveStatus');
const dateInput = document.getElementById('rDate');

if (dateInput) {
  const t = new Date();
  const yyyy = t.getFullYear();
  const mm = String(t.getMonth() + 1).padStart(2, '0');
  const dd = String(t.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const time = form.time.value;
    const party = form.party.value;
    if (!name || !phone || !date || !time) {
      status.textContent = 'Please fill in name, phone, date, and time.';
      status.style.color = '#e87a7a';
      return;
    }
    status.style.color = '';
    status.textContent = `Thank you, ${name.split(' ')[0]}. We'll confirm your table for ${party} on ${date} at ${time} via phone shortly.`;
    form.reset();
  });
}

// ---------- Year ----------
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// ---------- Smooth scroll + hero parallax (GSAP + Lenis) ----------
// Ported from the Osmo parallax component (React) to vanilla JS: Lenis drives
// smooth scrolling and feeds GSAP ScrollTrigger, which moves the hero layers
// at different speeds for depth. Degrades gracefully if libs fail to load or
// the visitor prefers reduced motion.
(function initMotion() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || typeof gsap === 'undefined' || typeof Lenis === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Route in-page anchor links through Lenis for a smooth glide
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (!id || id.length <= 1) return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -64 });
    });
  });

  // Hero parallax: the photo drifts down slowly while the headline lifts and
  // fades — the layered-depth effect, kept subtle so the page stays calm.
  const hero = document.querySelector('.hero');
  if (hero) {
    const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0 };
    gsap.to('.hero-media', { yPercent: 8, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-content', { yPercent: -6, opacity: 0.55, ease: 'none', scrollTrigger: st });
  }
})();

// ---------- Hero "tubes" cursor background (WebGL, desktop only) ----------
// Ported from the threejs-components Tubes Cursor React component to vanilla JS.
// Recolored to Nova's blue/violet/gold so the glow echoes the restaurant's real
// LED lighting. Activates only with a real pointer + WebGL + motion allowed;
// otherwise the hero photo (the fallback layer beneath) stays in view.
(function initHeroTubes() {
  const canvas = document.getElementById('heroTubes');
  if (!canvas) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noPointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const hasWebGL = (() => {
    try {
      const t = document.createElement('canvas');
      return !!(t.getContext('webgl2') || t.getContext('webgl'));
    } catch (e) { return false; }
  })();

  // On touch/mobile, reduced motion, or no WebGL → leave the photo hero in place.
  if (reduceMotion || noPointer || !hasWebGL) return;

  // Nova-branded palettes (blue / violet / gold). Click cycles between them.
  const palettes = [
    { tubes: ['#2f6bff', '#8a5cff', '#c9a961'], lights: ['#2f6bff', '#5f8bff', '#8a5cff', '#e6c97a'] },
    { tubes: ['#11cdef', '#2f6bff', '#8a5cff'], lights: ['#21d4fd', '#2f6bff', '#8a5cff', '#5f8bff'] },
    { tubes: ['#c9a961', '#e6c97a', '#8a5cff'], lights: ['#e6c97a', '#c9a961', '#8a5cff', '#2f6bff'] }
  ];

  // Delay init so the canvas has its painted dimensions (avoids "radius is NaN").
  setTimeout(() => {
    import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js')
      .then((module) => {
        const TubesCursor = module.default;
        if (!canvas.isConnected) return;

        const app = TubesCursor(canvas, {
          tubes: { colors: palettes[0].tubes, lights: { intensity: 180, colors: palettes[0].lights } }
        });
        canvas.classList.add('is-on');

        // Click anywhere in the hero (except buttons/links) shuffles the palette.
        let i = 0;
        const heroSection = document.getElementById('top');
        if (heroSection) {
          heroSection.style.cursor = 'pointer';
          heroSection.addEventListener('click', (e) => {
            if (e.target.closest('a, button, input, select, textarea')) return;
            i = (i + 1) % palettes.length;
            app.tubes.setColors(palettes[i].tubes);
            app.tubes.setLightsColors(palettes[i].lights);
          });
        }
      })
      .catch((err) => console.error('TubesCursor failed to load:', err));
  }, 120);
})();
