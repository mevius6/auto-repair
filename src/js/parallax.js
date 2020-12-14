import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const parallaxImages = (images) => {
  images.forEach((image) => {
    let imageWrap = image.parentNode;
    let effectWrap = imageWrap.parentNode;

    const revealImage = () => {
      let tl = gsap.timeline({
        // scrollTrigger: {
        //   trigger: imageWrap,
        //   start: 'top 50%',
        //   once: true,
        // },
        paused: true,
        defaults: {ease: 'power2.out'}
      })
        .from(imageWrap, {
          xPercent: -100,
          autoAlpha: 0,
        })
        .from(image, {
          xPercent: 100,
          scale: 1.3,
        }, '<');
      return tl;
    }

    const parallaxImageTween = gsap.fromTo(imageWrap,
      { y: '-20vh' },
      { y: '20vh' }
    );

    // eslint-disable-next-line no-unused-vars
    const st = ScrollTrigger.create({
      trigger: effectWrap,
      start: 'top bottom',
      animation: parallaxImageTween,
      scrub: true,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 0.5,
        duration: 1,
        ease: 'power4.inOut',
      },
    });

    if ('loading' in HTMLImageElement.prototype) {
      image.onload = () => revealImage().play().delay(0.7);
    } else {
      //
    }
  });
}
