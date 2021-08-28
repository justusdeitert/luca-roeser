import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register gsap plugins
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Bind gsap and scrollTrigger to the window object
 */
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
