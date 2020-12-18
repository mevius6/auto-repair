import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { selectAll, getWidth } from './utils';

gsap.registerPlugin(ScrollTrigger);

// TODO: аннулирование анимации при изменении размера окна
// window.addEventListener('resize', () => {
//   anim.pause(0).invalidate().play();
// });

// ? https://w3c.github.io/aria-practices/#carousel
export const horizontalScroll = (section, vars = {}) => {
  let columns = getComputedStyle(section).getPropertyValue('--columns');

  let theseItems = selectAll('.item', section),
      totalItems = columns || theseItems.length,
      firstItem = theseItems[0],
      itemWidth = getWidth(firstItem),
      wrap = firstItem.parentNode;

  let gutterVal = getComputedStyle(section)
      .getPropertyValue('--gutter')
      .replace('rem', '');
  let rootVal = getComputedStyle(document.documentElement)
      .getPropertyValue('font-size')
      .replace('px', '');
  let totalSpacing = (totalItems - 1) * (gutterVal * rootVal);

  const anim = gsap.to(wrap, {
    x: -(itemWidth * (totalItems - 1) + totalSpacing),
    ease: 'none',
    paused: true,
  });

  gsap.set(wrap, {
    position: 'absolute',
    top: 0,
  });

  if (vars.offset) {
    if (vars.offset === 'half') {
      gsap.set(wrap, {
        left: `calc(50% - ${itemWidth/2}px)`
      });
    }
    if (vars.offset === 'full') {
      let wrapWidth = getWidth(wrap);

      gsap.set(wrap, {
        left: `calc(${wrapWidth}px - ${gutterVal * rootVal}px`
      });
    }
  } else {
    gsap.set(wrap, { left: 0 });
  }

  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'elastic.out(1, 0.75)',
      stagger: { axis: 'x', each: 0.04 },
    }
  });

  gsap.set(theseItems, { opacity: 0 });

  // eslint-disable-next-line no-unused-vars
  const stReveal = ScrollTrigger.create({
    trigger: section,
    start: 'top +=66,666%',
    end: 'bottom top',
    onEnter: () => tl.to(theseItems, { opacity: 1 }),
  });

  if (vars.control === 'scroll') {
    // eslint-disable-next-line no-unused-vars
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top +=66,666%',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
      // onEnter: () => tl.to(theseItems, { opacity: 1 }),
      onUpdate: self => {
        gsap.to(anim, {
          progress: self.progress,
          overwrite: 'auto'
        });
      }
    });
  }

  if (vars.control === 'dots') {
    const dots = selectAll('[name=position]');
    dots.forEach((dot, i) => {
      const progress = i / (dots.length - 1);

      const onChange = () => gsap.to(anim, {
        progress: progress,
        overwrite: 'auto'
      });

      dot.addEventListener('change', onChange, false);
    });
  }
}
