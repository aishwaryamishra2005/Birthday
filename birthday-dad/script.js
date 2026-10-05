/* All the text and photos live in index.html — this file only makes things move. */
const $ = (id) => document.getElementById(id);
const COLORS = ['#FFD166', '#A8DADC', '#B7E4C7', '#F8BBD0', '#CDB4DB'];
const rand = (a, b) => a + Math.random() * (b - a);

/* ---------- floating background (stars, hearts, balloons) ---------- */
const icons = ['⭐', '❤️', '🎈', '✨', '🎈', '⭐'];
for (let i = 0; i < 12; i++) {
  const s = document.createElement('span');
  s.textContent = icons[i % icons.length];
  s.style.left = rand(2, 96) + '%';
  s.style.fontSize = rand(16, 30) + 'px';
  s.style.animationDuration = rand(16, 30) + 's';
  s.style.animationDelay = -rand(0, 24) + 's';
  $('floaters').appendChild(s);
}

/* ---------- confetti ---------- */
function rain(count = 90) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = rand(0, 100) + 'vw';
    c.style.background = COLORS[i % COLORS.length];
    c.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
    c.style.setProperty('--dx', rand(-80, 80) + 'px');
    c.style.animationDuration = rand(2.5, 5) + 's';
    c.style.animationDelay = rand(0, 1.5) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7500);
  }
}
function burst(x, y, count = 90) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement('i');
    const a = rand(0, Math.PI * 2), d = rand(120, 380);
    c.className = 'burst';
    c.style.left = x + 'px'; c.style.top = y + 'px';
    c.style.background = COLORS[i % COLORS.length];
    c.style.setProperty('--dx', Math.cos(a) * d + 'px');
    c.style.setProperty('--dy', Math.sin(a) * d + 80 + 'px');
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1500);
  }
}
function sparkles(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.textContent = ['✨', '⭐', '💛'][i % 3];
    s.style.left = x + rand(-140, 140) + 'px';
    s.style.top = y + rand(-120, 80) + 'px';
    s.style.animationDelay = rand(0, .6) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 2000);
  }
}

/* ---------- reveal the next section & scroll to it ---------- */
function reveal(id) {
  const el = $(id);
  el.classList.remove('locked');
  el.classList.add('show');
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
  if (id === 'birthday') setTimeout(() => rain(110), 500);
}
document.querySelectorAll('[data-next]').forEach((b) =>
  b.addEventListener('click', () => { reveal(b.dataset.next); if (b.id !== 'toFinal') b.classList.add('hidden'); })
);

/* ---------- 1. gift ---------- */
$('giftBtn').addEventListener('click', function () {
  if (this.classList.contains('open')) return;
  this.classList.add('open');
  const r = this.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + 30;
  burst(x, y, 110); sparkles(x, y, 12);
  setTimeout(() => reveal('birthday'), 1700);
});

/* ---------- photo lightbox ---------- */
function openOverlay(el) { el.classList.add('on'); requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('vis'))); }
function closeOverlay(el, done) { el.classList.remove('vis'); setTimeout(() => { el.classList.remove('on'); done && done(); }, 650); }
document.querySelectorAll('#memories .polaroid img').forEach((img) =>
  img.addEventListener('click', () => { $('lightImg').src = img.src; openOverlay($('lightbox')); })
);
$('lightbox').addEventListener('click', () => closeOverlay($('lightbox')));

/* ---------- 5. letter ---------- */
$('openLetter').addEventListener('click', () => {
  $('envelope').classList.add('open');
  $('openLetter').classList.add('hidden');
  setTimeout(() => { openOverlay($('overlay')); setTimeout(() => $('paper').classList.add('read'), 900); }, 700);
});
/* click on the dark background (outside the paper) also closes the letter */
$('overlay').addEventListener('click', (e) => { if (e.target === $('overlay')) $('closeLetter').click(); });
$('closeLetter').addEventListener('click', () =>
  closeOverlay($('overlay'), () => $('toFinal').classList.remove('hidden'))
);

/* ---------- final surprise ---------- */
$('lastBtn').addEventListener('click', (e) => {
  const x = innerWidth / 2, y = innerHeight / 2;
  burst(x, y, 160); sparkles(x, y, 16); rain(120);
  $('finalIntro').classList.add('hidden');
  $('finalReveal').classList.remove('hidden');
  $('final').scrollIntoView({ behavior: 'smooth' });
  document.querySelector('#finalReveal video').play().catch(() => {});
});

/* Escape closes overlays */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if ($('lightbox').classList.contains('on')) closeOverlay($('lightbox'));
  if ($('overlay').classList.contains('on')) $('closeLetter').click();
});
