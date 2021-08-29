import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
 * Register gsap plugins
 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Bind gsap and scrollTrigger to the window object
 */
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
