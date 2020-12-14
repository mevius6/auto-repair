// eslint-disable-next-line no-unused-vars
import * as ThemeSwitcher from './theme-switcher';
// import * as map from './map';
// import Cursor from './cursor';
import Slideshow from './slideshow';
import { horizontalScroll } from './carousel';
// import { parallaxImages } from './parallax';
// import { revealText } from './text-reveal';
import {
  checkBrowser,
  checkWebpFeature,
  checkSystem,
  isMobileDevice,
  // select,
  selectAll,
  findByData
} from './utils';

const os = checkSystem();
const browser = checkBrowser();

const doc = document,
      root = doc.documentElement,
      body = doc.body;

// eslint-disable-next-line no-unused-vars
// const navBtn = new DisclosureForNav(doc.querySelector('.nav-button'));
const themeSwitch = doc.querySelector('theme-switch');

/* eslint-disable no-unused-vars */
const slideshow = new Slideshow('.slides');
const carousel1 = horizontalScroll(findByData('logos', 'id'), {
  control: 'scroll'
});
const carousel2 = horizontalScroll(findByData('reviews', 'id'), {
  control: 'dots'
});
// const reveal = revealText(selectAll('.reveal'));
// const parallax = parallaxImages(selectAll('.parallax-image'));
/* eslint-enable no-unused-vars */

root.setAttribute('data-theme-style', themeSwitch.mode === 'dark'
  ? 'dark'
  : 'light'
);

themeSwitch.addEventListener('colorschemechange', () => {
  root.dataset.themeStyle = themeSwitch.mode;
});

let imageFormat = '';
checkWebpFeature('lossy')
  .then(() => {
    imageFormat = 'webp';
    root.classList.add(imageFormat);
  })
  .catch(() => {
    imageFormat = 'no-webp';
    root.classList.add(imageFormat);
  });

isMobileDevice()
  .then(() => root.dataset.device = 'mobile')
  .catch(() => root.dataset.device = 'desktop');

window.addEventListener('load', () => {
  root.classList.remove('no-js');
  root.classList.add('js');
  root.dataset.browser = browser;
  root.dataset.os = os;
  body.classList.remove('page--loading');
  body.classList.add('page--loaded');
});
