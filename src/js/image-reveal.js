import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

const revealAnim = (image) => {
  let tl = gsap.timeline({ defaults: {ease: 'power2.out'} });
  tl
    .fromTo(image.parentNode, {
      xPercent: -100,
      // opacity: 0,
    }, {
      xPercent: 0,
      opacity: 1,
    })
    .from(image, {
      xPercent: 100,
      scale: 1.3,
    }, '<');
  return tl;
}

export const revealImage = (images) => {
  images.forEach((img) => {
    let hasWrap = img.parentNode.classList.contains('image-wrapper');
    if (hasWrap) {
      // eslint-disable-next-line no-unused-vars
      const st = ScrollTrigger.create({
        trigger: img,
        start: 'top +=50%',
        // end: 'top +=50%',
        onEnter: () => revealAnim(img),
        once: true
      });

      img.parentNode.style.opacity = 0;
    }
  });

  if ('loading' in HTMLImageElement.prototype) {
    // let images = document.querySelectorAll('img[loading="lazy"]');
    // let sources = document.querySelectorAll('source[data-srcset]');

    // sources.forEach((source) => {
    //   source.srcset = source.dataset.srcset;
    // });
    // images.forEach((img) => {
    //   img.src = img.dataset.src;
    // });

    // images.forEach((img) => img.onload = () => revealAnim(img));
  } else {
    // let script = document.createElement("script");
    // script.src = "https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js";
    // document.body.appendChild(script);
  }
}
