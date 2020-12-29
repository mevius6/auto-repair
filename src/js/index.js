// import Cursor from './cursor';
// eslint-disable-next-line no-unused-vars
import * as Nav from './nav';
// eslint-disable-next-line no-unused-vars
import * as Counters from './counters';
import Slideshow from './slideshow';
import { horizontalScroll } from './carousel';
import { reveal } from './reveal-effect';
import {
  checkBrowser,
  checkWebpFeature,
  checkSystem,
  isMobileDevice,
  selectAll,
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
  .then(() => (root.dataset.device = 'mobile'))
  .catch(() => (root.dataset.device = 'desktop'));

window.addEventListener('load', () => {
  root.classList.remove('no-js');
  root.classList.add('js');
  root.dataset.browser = browser;
  root.dataset.os = os;
  body.classList.remove('page--loading');
  body.classList.add('page--loaded');

  const images = selectAll('img[loading="lazy"]');
  const headlines = selectAll('.reveal');
  const cards = selectAll('.card');
  const lists = selectAll('.list');

  reveal(images);
  reveal(headlines);
  reveal(cards);
  reveal(lists);

  /* eslint-disable no-unused-vars */
  const slideshow = new Slideshow('.slides');
  const carousel0 = horizontalScroll(findByData('logos0', 'id'), {
    control: 'scroll',
    offset: 'full'
  });
  const carousel1 = horizontalScroll(findByData('logos1', 'id'), {
    control: 'scroll'
  });
  const carousel2 = horizontalScroll(findByData('reviews', 'id'), {
    control: 'dots',
    // offset: 'half'
  });
  /* eslint-enable no-unused-vars */
});
