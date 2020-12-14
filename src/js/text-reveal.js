import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';

// eslint-disable-next-line no-unused-vars
const splitText = Splitting({ whitespace: true });
// Splitting({
//   by: 'chars',
//   whitespace: true
// });

gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect({
  name: 'reveal',
  effect: (targets, config) => {
    return gsap.fromTo(targets, {
      x: config.x,
      y: config.y,
      autoAlpha: config.fromAlpha,
    }, {
      x: config.x2,
      y: config.y2,
      autoAlpha: config.toAlpha,
    });
  },
  defaults: { duration: 1, x: 0, y: 0, fromAlpha: 0, x2: 0, y2: 0, toAlpha: 1 },
  extendTimeline: true,
});

// const hide = (elem) => gsap.set(elem, {autoAlpha: 0});

export const revealText = (elems) => {
  elems.forEach((elem) => {
    let wrapper = elem.closest('.reveal-wrapper');
    let parent = wrapper.parentNode || elem.parentNode;
    let words = parent.querySelectorAll('.word');
    let chars = wrapper.querySelectorAll('.char');

    // hide(elem);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parent,
        start: '50% 80%',
      },
      defaults: { duration: 1, ease: 'power4.out' },
    });
    tl
      .from(chars, {y: 100, stagger: 0.05})
      .from(words, {y: 20, autoAlpha: 0, stagger: 0.05, duration: 0.8}, '<');
      // .reveal(elem, {y: 100})
  });
}
