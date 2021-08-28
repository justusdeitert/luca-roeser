import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register gsap plugins
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollTrigger to window
 */
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
