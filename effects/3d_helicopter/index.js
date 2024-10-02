import gsap from 'https://cdn.skypack.dev/gsap@3.11.0';
let FIRING = false;
const BOUNDS = 50;
document.addEventListener('pointermove', ({
 x,
 y
}) => {
 const newX = gsap.utils.mapRange(0, window.innerWidth, -BOUNDS, BOUNDS, x);
 const newY = gsap.utils.mapRange(0, window.innerHeight, BOUNDS, -BOUNDS, y);
 gsap.set(document.documentElement, {
  '--rotate-x': newY,
  '--rotate-y': newX,
 })
});
const LEFT_LAUNCHER = document.querySelector('.helicopter__launcher--left');
const RIGHT_LAUNCHER = document.querySelector('.helicopter__launcher--right');
gsap.ticker.add((time, deltaTime, frame) => {
 if (FIRING) {
  const AMMO = document.createElement('div');
  AMMO.innerHTML = `<div class="cuboid cuboid--ammo"><div class="cuboid__side"></div><div class="cuboid__side"></div><div class="cuboid__side"></div><div class="cuboid__side"></div><div class="cuboid__side"></div><div class="cuboid__side"></div></div>`;
  AMMO.className = 'helicopter__ammo';
  AMMO.style.setProperty('--hue', Math.random() * 360);
  if (frame % 2 === 0) LEFT_LAUNCHER.appendChild(AMMO);
  else RIGHT_LAUNCHER.appendChild(AMMO);
  gsap.to(AMMO, {
   xPercent: () => gsap.utils.random(-3000, -2000),
   onComplete: () => AMMO.remove(),
  })
 }
});
gsap.ticker.fps(24);
document.addEventListener('pointerdown', () => {
 FIRING = true
});
document.addEventListener('pointerup', () => {
 FIRING = false
});
const THEMES = (window.THEMES = {
 LIGHT: 'LIGHT',
 DARK: 'DARK',
 KEY: 'THEME',
});
window.LIGHT_QUERY = window.matchMedia('(prefers-color-scheme: light)');
window.__setTheme = (theme) => {
 window.__THEME = theme;
 window.localStorage.setItem(THEMES.KEY, theme)
};
const stored = localStorage.getItem(THEMES.KEY);
if (stored) {
 window.__THEME = stored;
 window.__setTheme(stored)
} else {
 if (window.LIGHT_QUERY.matches) {
  window.__THEME = THEMES.LIGHT
 } else {
  window.__THEME = THEMES.DARK
 }
 window.__setTheme(window.__THEME)
}
window.INITIAL_THEME = (window.__THEME && window.__THEME === THEMES.LIGHT) || (window.localStorage.getItem(THEMES.KEY) && window.localStorage.getItem(THEMES.KEY) === THEMES.LIGHT);
const BUTTON = document.querySelector('button');
gsap.set(BUTTON, {
 attr: {
  'aria-pressed': window.__THEME === THEMES.DARK ? 'false' : 'true',
 },
});
gsap.set('html', {
 '--on': window.__THEME === THEMES.DARK ? 0 : 1,
});
BUTTON.addEventListener('click', () => {
 const NEW_THEME = window.__THEME === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
 window.__setTheme(NEW_THEME);
 gsap.set('button', {
  attr: {
   'aria-pressed': NEW_THEME === THEMES.DARK ? 'false' : 'true',
  },
 });
 gsap.set('html', {
  '--on': window.__THEME === THEMES.DARK ? 0 : 1,
 })
});