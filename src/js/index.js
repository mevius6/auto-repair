// import Cursor from './cursor';
import Slideshow from './slideshow';
import { horizontalScroll } from './carousel';
// eslint-disable-next-line no-unused-vars
import * as Counters from './counters';
// import { parallaxImages } from './parallax';
// import { revealText } from './text-reveal';
import {
  checkBrowser,
  checkWebpFeature,
  checkSystem,
  isMobileDevice,
  findByData,
} from './utils';

const os = checkSystem();
const browser = checkBrowser();

const doc = document,
      root = doc.documentElement,
      body = doc.body;

root.setAttribute('data-theme-style', 'dark');

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

  /* eslint-disable no-unused-vars */
  const slideshow = new Slideshow('.slides');
  const carousel0 = horizontalScroll(findByData('logos0', 'id'), {
    control: 'scroll',
    position: 'offset'
  });
  const carousel1 = horizontalScroll(findByData('logos1', 'id'), {
    control: 'scroll'
  });
  const carousel2 = horizontalScroll(findByData('reviews', 'id'), {
    control: 'dots',
    // centered: true
  });
  // const reveal = revealText(selectAll('.reveal'));
  // const parallax = parallaxImages(selectAll('.parallax-image'));
  /* eslint-enable no-unused-vars */
});
