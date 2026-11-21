const menu = document.querySelector('.menu');
const nav = document.querySelector('#navlinks');
const compact = window.matchMedia('(max-width: 52rem)');

function setMenu(open) {
  nav.hidden = compact.matches && !open;
  menu.hidden = !compact.matches;
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
}

setMenu(false);
compact.addEventListener('change', () => setMenu(false));
menu.addEventListener('click', () => setMenu(nav.hidden));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && compact.matches && !nav.hidden) {
    setMenu(false);
    menu.focus();
  }
});
nav.addEventListener('click', event => {
  if (!compact.matches) return;
  const link = event.target.closest('a');
  if (!link) return;
  setMenu(false);
  const section = document.querySelector(link.hash);
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
});
document.addEventListener('click', event => {
  if (compact.matches && !nav.hidden && !event.target.closest('.nav')) setMenu(false);
});

const portrait = document.querySelector('.portrait');
const photo = portrait.querySelector('img');
function showInitials() {
  photo.hidden = true;
  portrait.setAttribute('aria-label', 'Kranthi Purimitla, initials KP');
}
photo.addEventListener('error', showInitials);
if (photo.complete && !photo.naturalWidth) showInitials();

const today = new Date().toISOString().slice(0, 10);
document.querySelectorAll('[data-expiry]').forEach(status => {
  const expired = status.dataset.expiry < today;
  status.textContent = expired ? 'Expired' : 'Expires';
  status.closest('.validity').classList.toggle('expired', expired);
});
document.querySelector('#year').textContent = new Date().getFullYear();
