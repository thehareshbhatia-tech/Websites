/* Nova Asian Bistro — interactions */

// ---------- Menu data ----------
const MENU = {
  sushi: [
    { name: "Chef's Sashimi Platter", desc: "18 pieces, market selection of the day.", price: "42", tag: "Signature" },
    { name: "Volcano Roll", desc: "Spicy tuna inside, baked salmon and crab on top.", price: "16" },
    { name: "Spicy Tuna Crispy Rice", desc: "Crisped sushi rice, yellowfin, jalapeño.", price: "14" },
    { name: "Nova Special Roll", desc: "Shrimp tempura, avocado, eel, gold flakes.", price: "18", tag: "House" },
    { name: "Yellowtail Jalapeño", desc: "Six pieces sashimi, yuzu ponzu, cilantro.", price: "17" },
    { name: "Rainbow Roll", desc: "California roll wrapped in five varieties of fish.", price: "15" },
    { name: "Toro Nigiri", desc: "Two pieces, fatty bluefin tuna belly.", price: "MP" },
    { name: "Salmon Avocado Roll", desc: "Classic, fresh Atlantic salmon.", price: "9" },
  ],
  thai: [
    { name: "Pad See Ew", desc: "Wide rice noodles, Chinese broccoli, sweet soy.", price: "16" },
    { name: "Drunken Noodles", desc: "Wok-fired flat noodles, basil, chili, bell pepper.", price: "17", tag: "Spicy" },
    { name: "Massaman Curry", desc: "Slow-braised beef, potato, peanut, coconut.", price: "19" },
    { name: "Pad Thai", desc: "Rice noodles, tamarind, peanut, lime, scallion.", price: "16" },
    { name: "Green Curry Chicken", desc: "Thai basil, eggplant, coconut milk, jasmine rice.", price: "18" },
    { name: "Tom Yum Goong", desc: "Hot &amp; sour shrimp soup, lemongrass, lime leaf.", price: "12" },
    { name: "Crispy Basil Duck", desc: "Half duck, holy basil, chili-garlic sauce.", price: "26", tag: "Chef Pick" },
    { name: "Mango Sticky Rice", desc: "Sweet coconut sticky rice, ripe mango.", price: "10" },
  ],
  chinese: [
    { name: "General Tso's Chicken", desc: "Crispy chicken, sweet-spicy glaze, broccoli.", price: "17" },
    { name: "Mongolian Beef", desc: "Wok-tossed flank, scallion, soy reduction.", price: "21" },
    { name: "Salt &amp; Pepper Shrimp", desc: "Lightly battered, jalapeño, garlic, scallion.", price: "22" },
    { name: "Kung Pao Chicken", desc: "Peanut, dried chili, Sichuan peppercorn.", price: "17", tag: "Spicy" },
    { name: "Sesame Beef", desc: "Crisped strips, sesame glaze, toasted seeds.", price: "21" },
    { name: "Peking Duck (Half)", desc: "Pancakes, hoisin, scallion, cucumber.", price: "32", tag: "24h Notice" },
    { name: "Chow Fun Beef", desc: "Wide rice noodles, bean sprout, scallion.", price: "17" },
    { name: "Vegetable Lo Mein", desc: "Egg noodle, seasonal vegetables, light soy.", price: "13" },
  ],
  signature: [
    { name: "Omakase Tasting", desc: "Chef-selected progression — 10 courses.", price: "85", tag: "Reserve" },
    { name: "Whole Live Lobster", desc: "Ginger-scallion or salt &amp; pepper.", price: "MP" },
    { name: "Wagyu Hibachi", desc: "A5 Japanese wagyu, garlic butter, charred lemon.", price: "62" },
    { name: "Crispy Whole Branzino", desc: "Thai basil sauce, mango-cucumber relish.", price: "34" },
    { name: "Black Cod Miso", desc: "Saikyo miso, 48-hour marinade.", price: "36", tag: "Signature" },
    { name: "Nova Tower", desc: "Tuna, salmon, avocado, crispy rice base.", price: "22" },
    { name: "Truffle Yellowtail", desc: "Six pieces, white truffle oil, micro chive.", price: "24" },
    { name: "Lychee Martini Float", desc: "House cocktail dessert, lychee sorbet.", price: "13" },
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

renderMenu('sushi');

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
  { open: '12:00 PM', close: '10:00 PM', label: 'Sunday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Monday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Tuesday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Wednesday' },
  { open: '11:00 AM', close: '10:00 PM', label: 'Thursday' },
  { open: '11:00 AM', close: '11:00 PM', label: 'Friday' },
  { open: '12:00 PM', close: '11:00 PM', label: 'Saturday' },
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
