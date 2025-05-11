
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize smooth scrolling with Lenis
export const initSmoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Link GSAP ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  return lenis;
};

// Initialize animations that are triggered on scroll
export const initScrollAnimations = () => {
  // Fade in animations
  gsap.utils.toArray<HTMLElement>('.fadeInUp').forEach((element) => {
    gsap.fromTo(
      element,
      { y: 50, opacity: 0, visibility: 'visible' },
      {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('.fadeInDown').forEach((element) => {
    gsap.fromTo(
      element,
      { y: -50, opacity: 0, visibility: 'visible' },
      {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('.fadeInLeft').forEach((element) => {
    gsap.fromTo(
      element,
      { x: -50, opacity: 0, visibility: 'visible' },
      {
        x: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('.fadeInRight').forEach((element) => {
    gsap.fromTo(
      element,
      { x: 50, opacity: 0, visibility: 'visible' },
      {
        x: 0,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  gsap.utils.toArray<HTMLElement>('.scaleIn').forEach((element) => {
    gsap.fromTo(
      element,
      { scale: 0.8, opacity: 0, visibility: 'visible' },
      {
        scale: 1,
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        },
      }
    );
  });
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  startValue: number,
  endValue: number,
  duration: number = 2
) => {
  const counter = { value: startValue };
  
  gsap.to(counter, {
    value: endValue,
    duration: duration,
    ease: 'power1.inOut',
    onUpdate: () => {
      element.textContent = Math.round(counter.value).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: 'top bottom-=100',
    },
  });
};
