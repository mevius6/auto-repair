import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: 'elastic.out(1, 0.75)',
    stagger: { axis: 'x', each: 0.05 },
  }
});

export const revealList = (lists) => {
  lists.forEach(list => {
    let items = list.childNodes;

    if (list.parentNode.nodeName === 'ARTICLE') {
      gsap.set(items, { opacity: 0, y: 24});

      ScrollTrigger.create({
        trigger: list,
        start: 'top +=50%',
        onEnter: () => tl.to(items, { opacity: 1, y: 0 })
      });
    }
  });
}
