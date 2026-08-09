/* ==========================================================================
   VEDANT KAPIL — EDITORIAL AI ENGINEERING PORTFOLIO LOGIC
   With Lenis Smooth Scroll Engine + GSAP Buttery Motion
   ========================================================================== */

let soundEnabled = false;
let isAntAnimating = false;
let lenis = null;

// Eye Cursor Circling / Rolling State Variables
let totalEyeRollRotation = 0;
let lastEyeAngle = null;
let isRageActive = false;
let rageTimeoutId = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll Engine with Ultra-Smooth Motion
    if (window.Lenis) {
        lenis = new Lenis({
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.2,
            wheelMultiplier: 1.0,
            smoothWheel: true,
            smoothTouch: true
        });

        // Sync GSAP ScrollTrigger cleanly without duplicate RAF loops
        if (window.gsap && window.ScrollTrigger) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }

        // Smooth scroll for internal anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        lenis.scrollTo(targetEl, { offset: -50, duration: 2.0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                    }
                }
            });
        });

        // 🌊 Watery Glass Transparent Sliding Active Indicator Engine
        const navGlassIndicator = document.getElementById('navGlassIndicator');
        const navItems = document.querySelectorAll('.nav-links .nav-item');
        const mainNavLinks = document.getElementById('mainNavLinks');

        function updateNavGlassIndicator(targetEl) {
            if (!navGlassIndicator || !targetEl || !mainNavLinks) return;
            const navRect = mainNavLinks.getBoundingClientRect();
            const targetRect = targetEl.getBoundingClientRect();
            const leftPos = targetRect.left - navRect.left;
            const widthVal = targetRect.width;
            navGlassIndicator.style.left = `${leftPos}px`;
            navGlassIndicator.style.width = `${widthVal}px`;
            navGlassIndicator.style.opacity = '1';
        }

        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => updateNavGlassIndicator(item));
            item.addEventListener('focus', () => updateNavGlassIndicator(item));
        });

        if (mainNavLinks) {
            mainNavLinks.addEventListener('mouseleave', () => {
                const currentActive = document.querySelector('.nav-links .nav-item.active');
                if (currentActive) {
                    updateNavGlassIndicator(currentActive);
                } else {
                    if (navGlassIndicator) navGlassIndicator.style.opacity = '0';
                }
            });
        }

        // ScrollSpy to update active nav link as user scrolls up or down
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPos = window.scrollY + 200;

            sections.forEach(sec => {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentSectionId = sec.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    item.classList.add('active');
                    updateNavGlassIndicator(item);
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }

    // 2. Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 3. GSAP ScrollTrigger Smooth Reveals
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Portfolio wave animation
        ScrollTrigger.create({
            trigger: "#portfolio",
            start: "top 80%",
            onEnter: () => triggerPortfolioWaveAnimation()
        });

        // Smooth staggered section title bar reveals
        gsap.utils.toArray('.h2-band-section').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 40 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.0, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 88%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Smooth staggered future cards reveal
        gsap.fromTo('.future-card', 
            { opacity: 0, y: 50, scale: 0.95 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.9, 
                stagger: 0.18, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: "#future",
                    start: "top 78%"
                }
            }
        );
    }

    // Ensure Telemetry Panel is strictly hidden on initial page load
    const progressPanel = document.getElementById('liveProgressPanel');
    if (progressPanel) {
        progressPanel.classList.remove('active');
    }

    // 4. Audio Toggle
    const soundToggle = document.getElementById('soundToggle');
    const soundIcon = document.getElementById('soundIcon');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
            if (soundEnabled) playClickSound(600, 0.05);
        });
    }

    // 5. Lottie Vector Theme Toggle Engine
    const themeToggleLottieData = {"v":"4.8.0","meta":{"g":"LottieFiles AE 1.0.0","a":"","k":"","d":"","tc":"#FFFFFF"},"fr":60,"ip":0,"op":154,"w":600,"h":600,"nm":"Light/dark mode","ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"matte","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.423,"y":1},"o":{"x":0.167,"y":0.857},"t":46,"s":[334.622,265.378,0],"to":[-3.429,3.554,0],"ti":[3.429,-3.554,0]},{"i":{"x":0.423,"y":0.423},"o":{"x":0.167,"y":0.167},"t":62,"s":[314.051,286.699,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.903,"y":0.502},"o":{"x":0.577,"y":0},"t":100,"s":[314.051,286.699,0],"to":[3.429,-3.554,0],"ti":[-3.429,3.554,0]},{"t":116,"s":[334.622,265.378,0]}],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.423,0.423,0.667],"y":[1,1,1]},"o":{"x":[0.097,0.097,0.333],"y":[0.637,0.637,0]},"t":46,"s":[100,100,100]},{"i":{"x":[0.423,0.423,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":65,"s":[565,565,100]},{"i":{"x":[0.903,0.903,0.667],"y":[0.363,0.363,1]},"o":{"x":[0.577,0.577,0.333],"y":[0,0,0]},"t":100,"s":[565,565,100]},{"t":119,"s":[100,100,100]}],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-3.314],[3.314,0],[0,3.314],[-3.314,0]],"o":[[0,3.314],[-3.314,0],[0,-3.314],[3.314,0]],"v":[[6,0],[0,6],[-6,0],[0,-6]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":379,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"sun and moon","tt":2,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[300,300,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-22.715],[22.715,0],[0,22.715],[-22.715,0]],"o":[[0,22.715],[-22.715,0],[0,-22.715],[22.715,0]],"v":[[41.129,0],[0,41.129],[-41.129,0],[0,-41.129]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":379,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"sun and moon 2","td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[300,300,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[114,114,100],"ix":6}},"ao":0,"ef":[{"ty":29,"nm":"Gaussian Blur","np":5,"mn":"ADBE Gaussian Blur 2","ix":1,"en":1,"ef":[{"ty":0,"nm":"Blurriness","mn":"ADBE Gaussian Blur 2-0001","ix":1,"v":{"a":0,"k":19.3,"ix":1}},{"ty":7,"nm":"Blur Dimensions","mn":"ADBE Gaussian Blur 2-0002","ix":2,"v":{"a":0,"k":1,"ix":2}},{"ty":7,"nm":"Repeat Edge Pixels","mn":"ADBE Gaussian Blur 2-0003","ix":3,"v":{"a":0,"k":1,"ix":3}}]}],"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-22.715],[22.715,0],[0,22.715],[-22.715,0]],"o":[[0,22.715],[-22.715,0],[0,-22.715],[22.715,0]],"v":[[41.129,0],[0,41.129],[-41.129,0],[0,-41.129]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":379,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":0,"nm":"rays","tt":2,"refId":"comp_1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[300,300,0],"ix":2},"a":{"a":0,"k":[300,300,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"w":600,"h":600,"ip":0,"op":379,"st":0,"bm":0}]},{"id":"comp_1","layers":[{"ddd":0,"ind":1,"ty":3,"nm":"Null 1","sr":1,"ks":{"o":{"a":0,"k":0,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[300,300,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.481,0.481,0.667],"y":[1,1,1]},"o":{"x":[0.413,0.413,0.333],"y":[0.236,0.236,0]},"t":18,"s":[104,104,100]},{"i":{"x":[0.875,0.875,0.667],"y":[0.569,0.569,1]},"o":{"x":[0.588,0.588,0.333],"y":[0,0,0]},"t":30,"s":[120,120,100]},{"i":{"x":[0.988,0.988,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":50,"s":[25,25,100]},{"i":{"x":[0.412,0.412,0.667],"y":[1,1,1]},"o":{"x":[0.125,0.125,0.333],"y":[0.431,0.431,0]},"t":113,"s":[25,25,100]},{"i":{"x":[0.517,0.517,0.667],"y":[0.995,0.995,1]},"o":{"x":[0.519,0.519,0.333],"y":[0,0,0]},"t":133,"s":[120,120,100]},{"t":149,"s":[104,104,100]}],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Slider Control","np":3,"mn":"ADBE Slider Control","ix":1,"en":1,"ef":[{"ty":0,"nm":"Slider","mn":"ADBE Slider Control-0001","ix":1,"v":{"a":1,"k":[{"i":{"x":[0.481],"y":[1]},"o":{"x":[0.413],"y":[0.189]},"t":18,"s":[10]},{"i":{"x":[0.97],"y":[1]},"o":{"x":[0.494],"y":[0]},"t":30,"s":[8]},{"i":{"x":[0.988],"y":[1]},"o":{"x":[0.032],"y":[0]},"t":50,"s":[18.67]},{"i":{"x":[0.506],"y":[1]},"o":{"x":[0.03],"y":[0]},"t":113,"s":[18.67]},{"i":{"x":[0.587],"y":[0.748]},"o":{"x":[0.519],"y":[0]},"t":133,"s":[8]},{"t":149,"s":[10]}],"ix":1}}]}],"ip":0,"op":379,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Layer 1","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[0,65.938,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,-9.073],[0,9.073]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Layer 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[46.618,46.628,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-6.415,-6.415],[6.415,6.415]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"Layer 3","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[65.927,0.01,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-9.073,0],[9.073,0]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"Layer 4","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[46.618,-46.608,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[-6.415,6.415],[6.415,-6.415]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"Layer 5","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[0,-65.917,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[0,9.073],[0,-9.073]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"Layer 6","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[-46.618,-46.608,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[6.415,6.415],[-6.415,-6.415]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"Layer 7","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[-65.927,0.01,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[9.073,0],[-9.073,0]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"Layer 8","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0.01,0],"ix":2},"a":{"a":0,"k":[-46.618,46.628,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[6.415,-6.415],[-6.415,6.415]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,0.819607853889,0.372549027205,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":12,"ix":5,"x":"var $bm_rt;\n$bm_rt = thisComp.layer('Null 1').effect('Slider Control')('Slider');"},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.875],"y":[0.569]},"o":{"x":[0.588],"y":[0]},"t":30,"s":[0]},{"i":{"x":[0.875],"y":[-204.377]},"o":{"x":[0.167],"y":[0]},"t":45,"s":[98]},{"i":{"x":[0.412],"y":[1]},"o":{"x":[0.125],"y":[0.431]},"t":118,"s":[98]},{"t":133,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":180,"st":0,"bm":0}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Pre-comp all layers","refId":"comp_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[300,300,0],"ix":2},"a":{"a":0,"k":[300,300,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.423,0.423,0.667],"y":[1,1,1]},"o":{"x":[0.097,0.097,0.333],"y":[0.637,0.637,0]},"t":44,"s":[100,100,100]},{"i":{"x":[0.423,0.423,0.667]},"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":64,"s":[163,163,100]},{"i":{"x":[0.753,0.753,0.667],"y":[0.911,0.911,1]},"o":{"x":[0.448,0.448,0.333],"y":[0,0,0]},"t":102,"s":[163,163,100]},{"t":122,"s":[100,100,100]}],"ix":6}},"ao":0,"w":600,"h":600,"ip":0,"op":379,"st":0,"bm":0}],"markers":[]};

    const lottieThemeContainer = document.getElementById('lottieThemeContainer');
    let lottieAnim = null;

    if (lottieThemeContainer && window.lottie) {
        try {
            lottieAnim = lottie.loadAnimation({
                container: lottieThemeContainer,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                animationData: themeToggleLottieData
            });

            if (document.body.classList.contains('theme-dark')) {
                lottieAnim.goToAndStop(64, true);
            } else {
                lottieAnim.goToAndStop(0, true);
            }
        } catch (e) {
            console.warn('Lottie theme animation load fallback:', e);
        }
    }

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            clearTimeout(rageTimeoutId);
            document.body.classList.remove('ai-vision-mode', 'eye-rage-mode');
            isRageActive = false;
            document.body.classList.toggle('theme-dark');
            const isDark = document.body.classList.contains('theme-dark');
            
            const toggleText = themeToggleBtn.querySelector('.toggle-text');
            if (toggleText) {
                toggleText.textContent = isDark ? 'DARK' : 'LIGHT';
            }

            if (lottieAnim) {
                if (isDark) {
                    lottieAnim.playSegments([0, 64], true);
                } else {
                    lottieAnim.playSegments([64, 124], true);
                }
            }

            if (soundEnabled) playClickSound(400, 0.08);
        });
    }

    // 6. Smooth Pupil Tracking & ULTRA-RESPONSIVE CURSOR EYE ROLLING DETECTOR
    const heroPupils = document.querySelectorAll('.title---eye-pupils');
    const nodePupils = document.querySelectorAll('.inner-pupil');
    const heroEyeVedant = document.getElementById('heroEyeVedant');

    document.addEventListener('mousemove', (e) => {
        if (isAntAnimating) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Pupil tracking with smooth lerp / interpolation
        heroPupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;
            const angle = Math.atan2(mouseY - pupilY, mouseX - pupilX);
            const distance = Math.min(14, Math.hypot(mouseX - pupilX, mouseY - pupilY) / 15);
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            if (window.gsap) {
                gsap.to(pupil, { x: moveX, y: moveY, duration: 0.25, ease: "power2.out" });
            } else {
                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        nodePupils.forEach(pupil => {
            const rect = pupil.getBoundingClientRect();
            const pupilX = rect.left + rect.width / 2;
            const pupilY = rect.top + rect.height / 2;
            const angle = Math.atan2(mouseY - pupilY, mouseX - pupilX);
            const distance = Math.min(10, Math.hypot(mouseX - pupilX, mouseY - pupilY) / 20);
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            if (window.gsap) {
                gsap.to(pupil, { x: moveX, y: moveY, duration: 0.25, ease: "power2.out" });
            } else {
                pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        // EYE CIRCLE / ROLLING DETECTOR (Super responsive radius < 320px)
        if (heroEyeVedant) {
            const eRect = heroEyeVedant.getBoundingClientRect();
            const eyeCenterX = eRect.left + eRect.width / 2;
            const eyeCenterY = eRect.top + eRect.height / 2;
            const distToEye = Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY);

            if (distToEye < 320) {
                const currentAngle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);

                if (lastEyeAngle !== null) {
                    let diff = currentAngle - lastEyeAngle;
                    if (diff > Math.PI) diff -= Math.PI * 2;
                    if (diff < -Math.PI) diff += Math.PI * 2;

                    totalEyeRollRotation += diff;

                    if (window.gsap) {
                        gsap.to(heroEyeVedant, { 
                            scale: 1.15, 
                            rotation: totalEyeRollRotation * 20, 
                            duration: 0.15, 
                            ease: "power1.out" 
                        });
                    } else {
                        heroEyeVedant.style.transform = `scale(1.15) rotate(${totalEyeRollRotation * 20}deg)`;
                    }

                    if (Math.abs(totalEyeRollRotation) >= Math.PI * 3.5 && !isRageActive) {
                        triggerRedEyeRageBossMode();
                        totalEyeRollRotation = 0;
                    }
                }
                lastEyeAngle = currentAngle;
            } else {
                totalEyeRollRotation = 0;
                lastEyeAngle = null;
                if (window.gsap) {
                    gsap.to(heroEyeVedant, { scale: 1, rotation: 0, duration: 0.4, ease: "power2.out" });
                } else {
                    heroEyeVedant.style.transform = '';
                }
            }
        }
    });

    // 7. Section Accordion Toggles
    const titleBars = document.querySelectorAll('.section-title-bar');
    titleBars.forEach(bar => {
        bar.addEventListener('click', (e) => {
            if (e.target.closest('.expanding-letter-pill')) return;

            const targetId = bar.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isActive = bar.classList.contains('active');
                bar.classList.toggle('active');
                targetContent.classList.toggle('active');

                if (soundEnabled) playClickSound(isActive ? 300 : 500, 0.06);

                if (targetId === 'portfolio-content' && !isActive) {
                    triggerPortfolioWaveAnimation();
                }

                if (window.gsap && targetContent && !isActive) {
                    gsap.fromTo(targetContent, 
                        { opacity: 0, y: -20, scale: 0.98 }, 
                        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
                    );
                }
            }
        });
    });

    // 8. Thinking Section Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
                if (soundEnabled) playClickSound(550, 0.04);
                if (window.gsap) {
                    gsap.fromTo(targetPane, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" });
                }
            }
        });
    });

    // 9. Systems Diagram Toggle Buttons
    const sysButtons = document.querySelectorAll('.sys-toggle-btn');
    const diagramViews = document.querySelectorAll('.diagram-view');
    sysButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('run-sim-btn')) return;

            sysButtons.forEach(b => { if (!b.classList.contains('run-sim-btn')) b.classList.remove('active'); });
            diagramViews.forEach(v => v.classList.remove('active'));

            btn.classList.add('active');
            const diagramType = btn.getAttribute('data-diagram');
            const targetDiag = document.getElementById(`diag-${diagramType}`);
            if (targetDiag) {
                targetDiag.classList.add('active');
                if (soundEnabled) playClickSound(500, 0.05);
                if (window.gsap) {
                    gsap.fromTo(targetDiag, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
                }
            }
        });
    });

    // 10. Dynamic Animated Ecosystem Canvas
    initEcosystemCanvas();
});

/* ==========================================================================
   RED EYE RAGE BOSS MODE (WITH AUTOMATIC 10-SECOND AUTO-RESET TIMEOUT)
   ========================================================================== */
function triggerRedEyeRageBossMode() {
    isRageActive = true;
    document.body.classList.remove('ai-vision-mode');
    document.body.classList.add('eye-rage-mode');

    const warningBanner = document.getElementById('bossWarningBanner');
    const statusText = document.getElementById('headerStatusText');
    const terminalModal = document.getElementById('vkTerminalModal');
    const container = document.getElementById('terminalMessages');

    if (warningBanner) {
        warningBanner.classList.add('active');
    }

    if (statusText) {
        statusText.textContent = '🚨 WARNING: EYE ANGERED // CALLING BOSS!';
    }

    playRageAlarmSound();

    setTimeout(() => {
        if (terminalModal && isRageActive) terminalModal.classList.add('active');
        if (container && isRageActive) {
            const bossMsg = document.createElement('div');
            bossMsg.className = 'term-msg bot-msg';
            bossMsg.style.borderColor = '#EF4444';
            bossMsg.innerHTML = `🚨 <strong>SYSTEM ALERT // BOSS VEDANT KAPIL:</strong> "Stop rolling your cursor around my Eye! Who gave you security clearance? Calling Boss Vedant Kapil right now... 📞⚡"`;
            container.appendChild(bossMsg);
            container.scrollTop = container.scrollHeight;
        }
    }, 600);

    clearTimeout(rageTimeoutId);
    rageTimeoutId = setTimeout(() => {
        deactivateRedEyeRageBossMode();
    }, 10000);
}

function deactivateRedEyeRageBossMode() {
    isRageActive = false;
    document.body.classList.remove('eye-rage-mode');

    const warningBanner = document.getElementById('bossWarningBanner');
    const statusText = document.getElementById('headerStatusText');

    if (warningBanner) {
        warningBanner.classList.remove('active');
    }

    if (statusText) {
        statusText.textContent = 'AGENTIC SYSTEM // ONLINE';
    }

    renderEcosystemGraph();
}

function playRageAlarmSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        for (let i = 0; i < 4; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(i % 2 === 0 ? 880 : 440, ctx.currentTime + i * 0.15);
            gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.14);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + i * 0.15);
            osc.stop(ctx.currentTime + i * 0.15 + 0.14);
        }
    } catch (e) { console.error(e); }
}

/* ==========================================================================
   PORTFOLIO STAGGERED WAVE CARDS ANIMATION
   ========================================================================== */
function triggerPortfolioWaveAnimation() {
    if (window.gsap) {
        gsap.fromTo('.wave-card', 
            { opacity: 0, y: 80, scale: 0.85, rotateX: 18 }, 
            { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.1, stagger: 0.12, ease: "power3.out" }
        );
    }
}

/* ==========================================================================
   SLOW CINEMATIC ANT LINE CRAWL (DYNAMICALLY LINE-LOCKED & STRICT AI MODE PANEL)
   ========================================================================== */
function triggerEyeVisionMode(e) {
    if (e) e.stopPropagation();

    if (isRageActive) {
        deactivateRedEyeRageBossMode();
    }

    document.body.classList.toggle('ai-vision-mode');
    const isVision = document.body.classList.contains('ai-vision-mode');
    const banner = document.getElementById('aiVisionBanner');
    const statusText = document.getElementById('headerStatusText');
    const progressPanel = document.getElementById('liveProgressPanel');

    if (banner && isVision) {
        banner.classList.add('active');
        setTimeout(() => banner.classList.remove('active'), 3500);
    }

    if (statusText) {
        statusText.textContent = isVision ? '🐜 ANTIGRAVITY INJECTED // REASONING ACTIVE' : 'AGENTIC SYSTEM // ONLINE';
    }

    playFuturisticVisionSound();
    renderEcosystemGraph();

    if (isVision) {
        animateCyberAntSlowLineCrawl();
    } else {
        if (progressPanel) {
            progressPanel.classList.remove('active');
        }
    }
}

function animateCyberAntSlowLineCrawl() {
    const antWrapper = document.getElementById('cyberAntWrapper');
    const antPayload = document.getElementById('antPayload');
    const eyeVedant = document.getElementById('heroEyeVedant');
    const eyeWhitesVedant = document.getElementById('eyeWhitesVedant');
    const eyePupilVedant = document.getElementById('eyePupilVedant');
    const eyePupilKapil = document.getElementById('eyePupilKapil');
    const marqueeLine = document.getElementById('marqueeLineWrapper');
    const progressPanel = document.getElementById('liveProgressPanel');

    if (!antWrapper || !eyeVedant) return;

    isAntAnimating = true;

    const eyeRect = eyeVedant.getBoundingClientRect();
    const targetX = eyeRect.left + eyeRect.width / 2;

    antWrapper.style.display = 'flex';
    antWrapper.style.opacity = '1';
    antWrapper.style.left = '-180px';

    if (antPayload) {
        antPayload.style.opacity = '1';
    }

    let currentX = -180;
    const totalDistance = targetX + 180;
    const speed = totalDistance / 340;

    function stepCrawl() {
        let currentLineY = window.innerHeight * 0.48;
        if (marqueeLine) {
            const mRect = marqueeLine.getBoundingClientRect();
            currentLineY = mRect.top;
        }
        antWrapper.style.top = `${currentLineY}px`;

        currentX += speed;
        antWrapper.style.left = `${currentX}px`;

        const progress = Math.min(1, Math.max(0, (currentX + 180) / totalDistance));

        if (antPayload) {
            const opacityVal = Math.max(0, 1 - progress * 1.35);
            antPayload.style.opacity = opacityVal.toString();
        }

        const antX = currentX + 20;
        const antY = currentLineY;

        [eyePupilVedant, eyePupilKapil].forEach(pupil => {
            if (pupil) {
                const pRect = pupil.getBoundingClientRect();
                const pX = pRect.left + pRect.width / 2;
                const pY = pRect.top + pRect.height / 2;
                const angle = Math.atan2(antY - pY, antX - pX);
                const distance = Math.min(14, Math.hypot(antX - pX, antY - pY) / 15);
                pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            }
        });

        if (currentX < targetX - 25) {
            requestAnimationFrame(stepCrawl);
        } else {
            if (window.gsap) {
                gsap.to(antWrapper, {
                    scale: 0.1,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => {
                        antWrapper.style.display = 'none';
                        antWrapper.style.scale = '1';

                        if (eyeWhitesVedant) {
                            eyeWhitesVedant.classList.add('blinking');
                            if (soundEnabled) playClickSound(900, 0.15);

                            setTimeout(() => {
                                eyeWhitesVedant.classList.remove('blinking');
                                isAntAnimating = false;

                                if (progressPanel && document.body.classList.contains('ai-vision-mode')) {
                                    progressPanel.classList.add('active');
                                    if (lenis) {
                                        lenis.scrollTo(progressPanel, { offset: -80, duration: 1.2 });
                                    } else {
                                        progressPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                    }
                                }
                            }, 600);
                        }
                    }
                });
            }
        }
    }

    requestAnimationFrame(stepCrawl);
}

function playFuturisticVisionSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        
        const frequencies = [523.25, 659.25, 783.99, 1046.50];
        frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.08);
            osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
        });
    } catch (err) { console.error(err); }
}

function playClickSound(freq = 440, duration = 0.05) {
    if (!soundEnabled) return;
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) { console.error(e); }
}

/* ==========================================================================
   LIVE AGENTIC DAG SIMULATION (SYSTEMS SECTION)
   ========================================================================== */
function runLiveAgentSimulation() {
    const nodes = ['node-input', 'node-router', 'node-tool', 'node-eval', 'node-output'];
    const captions = [
        "1/5 📥 User Query Ingested: 'Analyze quarterly SQL sales metrics & generate chart.'",
        "2/5 🧠 Supervisor Agent Routing: Assessing intent... Selected tool: [SQL_Sandbox_Runner].",
        "3/5 ⚡ Action Executing: Executing SQL query against sandboxed database cluster...",
        "4/5 🔍 Evaluator Validating: Checking response completeness... Syntax verified 100%.",
        "5/5 ✅ Output Grounded: Result synthesized with dynamic chart configuration! Latency: 42ms."
    ];

    const captionElem = document.getElementById('nodeCaption');
    let step = 0;

    nodes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('node-active-sim');
    });

    function nextStep() {
        if (step > 0) {
            const prevEl = document.getElementById(nodes[step - 1]);
            if (prevEl) prevEl.classList.remove('node-active-sim');
        }

        if (step < nodes.length) {
            const curEl = document.getElementById(nodes[step]);
            if (curEl) curEl.classList.add('node-active-sim');
            if (captionElem) captionElem.innerHTML = `<strong>SIMULATION:</strong> ${captions[step]}`;
            if (soundEnabled) playClickSound(300 + step * 100, 0.1);
            step++;
            setTimeout(nextStep, 900);
        } else {
            if (captionElem) captionElem.innerHTML = "🎉 <strong>SIMULATION COMPLETE:</strong> Agentic loop executed successfully with zero errors!";
        }
    }

    nextStep();
}

/* ==========================================================================
   INTERACTIVE ASK VK-AI COPILOT TERMINAL
   ========================================================================== */
function toggleVkAiTerminal() {
    const modal = document.getElementById('vkTerminalModal');
    if (modal) {
        modal.classList.toggle('active');
        if (soundEnabled) playClickSound(500, 0.08);
    }
}

function handleTerminalBackdropClick(e) {
    if (e.target.classList.contains('vk-terminal-modal')) {
        toggleVkAiTerminal();
    }
}

function sendTerminalPrompt(text) {
    const input = document.getElementById('terminalInput');
    if (input) {
        input.value = text;
        sendTerminalMessage();
    }
}

function handleTerminalKeyPress(e) {
    if (e.key === 'Enter') {
        sendTerminalMessage();
    }
}

function sendTerminalMessage() {
    const input = document.getElementById('terminalInput');
    const container = document.getElementById('terminalMessages');
    if (!input || !container) return;

    const userText = input.value.trim();
    if (!userText) return;

    const userDiv = document.createElement('div');
    userDiv.className = 'term-msg user-msg';
    userDiv.textContent = userText;
    container.appendChild(userDiv);

    input.value = '';
    container.scrollTop = container.scrollHeight;

    if (soundEnabled) playClickSound(700, 0.03);

    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'term-msg bot-msg';
        botDiv.innerHTML = `<strong>VK-AI:</strong> ${generateCopilotResponse(userText)}`;
        container.appendChild(botDiv);
        container.scrollTop = container.scrollHeight;
        if (soundEnabled) playClickSound(450, 0.06);
    }, 400);
}

function generateCopilotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        return "Vedant specializes in Machine Learning, Deep Learning, LLMs, Agentic AI (LangChain & LangGraph), RAG, FastAPI microservices, MLOps, and Cloud AI infrastructure.";
    } else if (q.includes('rag') || q.includes('amazon')) {
        return "Vedant's Amazon Product RAG engine uses Hybrid Retrieval (Dense Vector + BM25 Sparse) paired with Cohere cross-encoder re-ranking, indexing over 100K+ catalog items with +42% search relevance.";
    } else if (q.includes('copilot') || q.includes('data analyst')) {
        return "The AI Data Analyst Copilot is built on LangGraph with stateful cyclic self-correction. It converts natural language into SQL, runs sandboxed validation, and achieves 98.4% accuracy.";
    } else if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('github') || q.includes('linkedin')) {
        return "You can reach Vedant directly via email at <strong>vedantkp79@gmail.com</strong>, view his GitHub at <a href='https://github.com/Vedant021004' target='_blank' style='color:#38BDF8;text-decoration:underline;'>github.com/Vedant021004</a>, or connect on LinkedIn at <a href='https://www.linkedin.com/in/vedant-kapil-8a786740a/' target='_blank' style='color:#38BDF8;text-decoration:underline;'>linkedin.com/in/vedant-kapil-8a786740a/</a>!";
    } else {
        return "Vedant is an AI Engineer dedicated to building deterministic reliability into non-deterministic AI intelligence. Feel free to explore his Systems visualizer and project blueprints!";
    }
}

/* ==========================================================================
   DYNAMIC CONTINUOUS ANIMATED ECOSYSTEM CANVAS ENGINE
   ========================================================================== */
const techNodesData = [
    { id: 'ml', label: 'Machine Learning', category: 'Core ML', x: 0.20, y: 0.35, connects: ['dl', 'llm', 'fastapi', 'cloud'] },
    { id: 'dl', label: 'Deep Learning', category: 'Core ML', x: 0.45, y: 0.22, connects: ['llm', 'rag', 'ml'] },
    { id: 'llm', label: 'LLMs', category: 'AI Models', x: 0.52, y: 0.48, connects: ['agentic', 'langchain', 'langgraph', 'rag'] },
    { id: 'agentic', label: 'Agentic AI', category: 'Orchestration', x: 0.72, y: 0.32, connects: ['langgraph', 'langchain', 'fastapi'] },
    { id: 'langchain', label: 'LangChain', category: 'Framework', x: 0.35, y: 0.68, connects: ['llm', 'rag', 'agentic'] },
    { id: 'langgraph', label: 'LangGraph', category: 'Framework', x: 0.68, y: 0.68, connects: ['agentic', 'llm', 'fastapi'] },
    { id: 'rag', label: 'RAG', category: 'Search Engine', x: 0.22, y: 0.52, connects: ['llm', 'langchain', 'dl', 'fastapi'] },
    { id: 'fastapi', label: 'FastAPI', category: 'Infrastructure', x: 0.48, y: 0.82, connects: ['mlops', 'agentic', 'cloud'] },
    { id: 'mlops', label: 'MLOps', category: 'Operations', x: 0.78, y: 0.80, connects: ['fastapi', 'cloud', 'ml'] },
    { id: 'cloud', label: 'Cloud', category: 'Infrastructure', x: 0.85, y: 0.50, connects: ['mlops', 'fastapi', 'ml'] }
];

const techDescriptions = {
    'ml': 'Classical & Ensemble Machine Learning algorithms for tabular prediction, feature engineering, and data pipeline modeling.',
    'dl': 'Deep neural network architectures (CNNs, Transformers, ResNets) engineered for computer vision and complex time-series forecasting.',
    'llm': 'State-of-the-art Large Language Model prompt engineering, fine-tuning, structured output parsing, and context optimization.',
    'agentic': 'Autonomous multi-agent architectures capable of reasoning, planning, tool usage, and iterative self-correction.',
    'langchain': 'Building enterprise chains, document loaders, vector store integrations, and memory management abstractions.',
    'langgraph': 'Stateful, cyclic multi-agent graph execution for complex production AI workflows requiring state persistence and human-in-the-loop validation.',
    'rag': 'Hybrid Retrieval-Augmented Generation combining sparse BM25 search with dense vector embeddings and cross-encoder re-ranking.',
    'fastapi': 'Asynchronous Python web microservices serving low-latency model inference endpoints with automatic OpenAPI documentation.',
    'mlops': 'Production model monitoring, CI/CD pipeline automation, evaluation harnesses, and containerized model serving.',
    'cloud': 'Cloud-native AI deployment across AWS/GCP, GPU node provisioning, serverless microservices, and scalable database backends.'
};

let activeNodeId = 'agentic';
let canvasAnimId = null;

function initEcosystemCanvas() {
    const canvas = document.getElementById('ecosystemCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    window.addEventListener('resize', resize);
    resize();

    const packets = [];
    techNodesData.forEach(node => {
        node.connects.forEach(tId => {
            packets.push({ from: node.id, to: tId, progress: Math.random(), speed: 0.003 + Math.random() * 0.004 });
        });
    });

    let time = 0;

    function animate() {
        time += 0.025;
        ctx.clearRect(0, 0, width, height);

        const isVision = document.body.classList.contains('ai-vision-mode');
        const isRage = document.body.classList.contains('eye-rage-mode');
        const isDark = document.body.classList.contains('theme-dark') || isVision || isRage;
        const nodeColor = isRage ? '#EF4444' : (isVision ? '#38BDF8' : (isDark ? '#F5F4F0' : '#000000'));
        const lineBaseColor = isRage ? 'rgba(239, 68, 68, 0.25)' : (isVision ? 'rgba(56, 189, 248, 0.25)' : (isDark ? 'rgba(245, 244, 240, 0.15)' : 'rgba(0, 0, 0, 0.15)'));
        const lineActiveColor = isRage ? '#DC2626' : (isVision ? '#22C55E' : (isDark ? '#E2B859' : '#000000'));
        const packetColor = isRage ? '#EF4444' : (isVision ? '#22C55E' : '#E2B859');

        techNodesData.forEach(node => {
            const nodeYOffset = Math.sin(time + node.x * 10) * 4;
            const nodeX = node.x * width;
            const nodeY = node.y * height + nodeYOffset;

            node.connects.forEach(targetId => {
                const targetNode = techNodesData.find(n => n.id === targetId);
                if (targetNode) {
                    const targetYOffset = Math.sin(time + targetNode.x * 10) * 4;
                    const targetX = targetNode.x * width;
                    const targetY = targetNode.y * height + targetYOffset;
                    const isConnectedToActive = (node.id === activeNodeId || targetId === activeNodeId);

                    ctx.beginPath();
                    ctx.moveTo(nodeX, nodeY);
                    ctx.lineTo(targetX, targetY);
                    ctx.strokeStyle = isConnectedToActive ? lineActiveColor : lineBaseColor;
                    ctx.lineWidth = isConnectedToActive ? 2.5 : 1;
                    ctx.stroke();
                }
            });
        });

        packets.forEach(p => {
            p.progress += p.speed;
            if (p.progress > 1) p.progress = 0;

            const fromNode = techNodesData.find(n => n.id === p.from);
            const toNode = techNodesData.find(n => n.id === p.to);
            if (fromNode && toNode) {
                const fromX = fromNode.x * width;
                const fromY = fromNode.y * height + Math.sin(time + fromNode.x * 10) * 4;
                const toX = toNode.x * width;
                const toY = toNode.y * height + Math.sin(time + toNode.x * 10) * 4;

                const curX = fromX + (toX - fromX) * p.progress;
                const curY = fromY + (toY - fromY) * p.progress;

                ctx.beginPath();
                ctx.arc(curX, curY, 3, 0, Math.PI * 2);
                ctx.fillStyle = packetColor;
                ctx.shadowColor = packetColor;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });

        techNodesData.forEach(node => {
            const nodeYOffset = Math.sin(time + node.x * 10) * 4;
            const nodeX = node.x * width;
            const nodeY = node.y * height + nodeYOffset;
            const isActive = (node.id === activeNodeId);

            if (isActive) {
                const auraRadius = 16 + Math.sin(time * 3) * 4;
                ctx.beginPath();
                ctx.arc(nodeX, nodeY, auraRadius, 0, Math.PI * 2);
                ctx.strokeStyle = lineActiveColor;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(nodeX, nodeY, isActive ? 12 : 8, 0, Math.PI * 2);
            ctx.fillStyle = isActive ? (isRage ? '#EF4444' : (isVision ? '#22C55E' : (isDark ? '#E2B859' : '#000000'))) : (isDark ? '#1A1D24' : '#FAF6EE');
            ctx.fill();
            ctx.strokeStyle = nodeColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = `${isActive ? 'bold 13px' : '600 11px'} "JetBrains Mono", monospace`;
            ctx.fillStyle = nodeColor;
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, nodeX + (isActive ? 18 : 14), nodeY);
        });

        canvasAnimId = requestAnimationFrame(animate);
    }

    if (canvasAnimId) cancelAnimationFrame(canvasAnimId);
    animate();

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        techNodesData.forEach(node => {
            const nodeYOffset = Math.sin(time + node.x * 10) * 4;
            const nodeX = node.x * width;
            const nodeY = node.y * height + nodeYOffset;
            const dist = Math.hypot(clickX - nodeX, clickY - nodeY);

            if (dist < 25) {
                activeNodeId = node.id;
                updateTechDetailCard(node);
                if (soundEnabled) playClickSound(650, 0.04);
            }
        });
    });

    const defaultNode = techNodesData.find(n => n.id === activeNodeId);
    if (defaultNode) updateTechDetailCard(defaultNode);
}

function updateTechDetailCard(node) {
    const cardTitle = document.getElementById('techCardTitle');
    const cardDesc = document.getElementById('techCardDesc');
    const cardConn = document.getElementById('techCardConn');

    if (cardTitle) cardTitle.textContent = `${node.label} [${node.category}]`;
    if (cardDesc) cardDesc.textContent = techDescriptions[node.id] || '';

    if (cardConn) {
        cardConn.innerHTML = node.connects.map(cId => {
            const target = techNodesData.find(n => n.id === cId);
            return `<span class="comp-chip">${target ? target.label : cId}</span>`;
        }).join('');
    }
}

function renderEcosystemGraph() {
    initEcosystemCanvas();
}

/* ==========================================================================
   CASE STUDY MODAL DATA
   ========================================================================== */
const projectsData = {
    1: {
        title: "AI Data Analyst Copilot",
        subtitle: "Autonomous Natural Language to SQL & Data Execution Sandbox",
        tech: ["LangGraph", "FastAPI", "PostgreSQL", "OpenAI / Claude", "Python"],
        problem: "Non-technical stakeholders frequently struggle to extract actionable insights from complex relational databases without waiting for data engineering teams.",
        solution: "Engineered a stateful agentic copilot in LangGraph that parses natural language queries, automatically inspects database schema metadata, constructs validated SQL statements, executes queries in a sandboxed runtime, and synthesizes interactive visualizations.",
        highlights: [
            "98.4% SQL query generation accuracy across complex join schemas",
            "Sub-1.2s average latency with token streaming response",
            "Self-correcting loop: catches SQL syntax errors and re-tries autonomously",
            "Dynamic chart configuration generation (ECharts / Chart.js)"
        ],
        codeSnippet: `def sql_validation_node(state: AgentState) -> AgentState:
    sql_query = state["generated_sql"]
    try:
        # Sandboxed dry-run execution
        explain_plan = db.execute(f"EXPLAIN {sql_query}")
        state["is_valid"] = True
    except Exception as e:
        state["is_valid"] = False
        state["error_log"] = str(e)
    return state`
    },
    2: {
        title: "Amazon Product RAG Engine",
        subtitle: "Enterprise Hybrid Vector Retrieval & Re-ranking System",
        tech: ["Hybrid RAG", "Qdrant / Pinecone", "BM25", "Cohere Re-ranker", "FastAPI"],
        problem: "Standard keyword search fails to capture semantic intent, while pure vector search often misses specific product model numbers and exact specs.",
        solution: "Built a production Hybrid RAG system combining sparse BM25 keyword matching with dense vector embeddings (OpenAI text-embedding-3). Uses a cross-encoder model to re-rank top-k candidate results, delivering precise product recommendations grounded in metadata.",
        highlights: [
            "Indexed over 100,000+ e-commerce product catalog items",
            "+42% improvement in search relevance (NDCG@10 metric)",
            "Strict source attribution eliminating hallucinated product attributes",
            "Low latency vector similarity lookup using HNSW index optimization"
        ],
        codeSnippet: `async def hybrid_retrieve(query: str, top_k: int = 10):
    dense_vecs = await embedding_model.aembed_query(query)
    vector_results = vector_db.search(dense_vecs, limit=top_k*2)
    bm25_results = sparse_bm25.search(query, limit=top_k*2)
    
    # Reciprocal Rank Fusion & Cross-Encoder re-ranking
    fused_docs = rrf_merge(vector_results, bm25_results)
    ranked_docs = reranker.rerank(query, fused_docs, top_n=top_k)
    return ranked_docs`
    },
    3: {
        title: "Smart School AI Platform",
        subtitle: "Multi-Agent Personalized Educational Workspace",
        tech: ["LangChain", "LLMs", "Vector Memory", "FastAPI", "React"],
        problem: "Traditional online learning systems offer rigid, one-size-fits-all curricula that fail to adapt to individual student learning paces and conceptual gaps.",
        solution: "Designed an intelligent educational multi-agent system where dedicated agents act as personal tutors, automatically generating tailored learning pathways, offering real-time hint scaffolding, and grading open-ended assignments with actionable feedback.",
        highlights: [
            "Deployed across 15,000+ active student users",
            "3x increase in weekly student problem-solving engagement",
            "Automated essay evaluation harness providing detailed rubric breakdowns",
            "Real-time student confusion detection and dynamic topic breakdown"
        ],
        codeSnippet: `class StudentAgent(BaseAgent):
    def evaluate_mastery(self, student_history: list) -> MasteryScore:
        concept_map = self.knowledge_graph.get_subgraph(student_history.topic)
        prompt = self.build_scaffold_prompt(concept_map, student_history)
        return self.llm.predict_structured(prompt, schema=MasteryScore)`
    },
    4: {
        title: "Sindhu Construction Document Intelligence",
        subtitle: "Multi-modal AI Parser for Civil Engineering Blueprints & Tender Documents",
        tech: ["Multi-modal LLMs", "OCR Document Parsing", "FastAPI", "Python"],
        problem: "Estimating construction project costs requires manually sifting through hundreds of pages of technical civil blueprints and complex architectural specifications.",
        solution: "Engineered an AI document intelligence pipeline that ingests complex PDF tenders and CAD blueprints, extracts material quantities using vision-language models, and automatically generates structured Bills of Quantities (BOQ) with cost estimation.",
        highlights: [
            "Reduced manual estimation time by 90% (from days to minutes)",
            "0.01% estimation variance compared to expert human estimators",
            "Automated tabular structure extraction from messy scanned PDFs",
            "Exportable structured Excel / JSON BOQ data feeds"
        ],
        codeSnippet: `def parse_blueprint_boq(pdf_bytes: bytes) -> BOQReport:
    images = convert_pdf_to_images(pdf_bytes)
    extracted_items = []
    for img in images:
        items = vision_llm.extract_table(img, schema=BOQSchema)
        extracted_items.extend(items)
    return aggregate_boq(extracted_items)`
    },
    5: {
        title: "Traffic ML Flow & Congestion Predictor",
        subtitle: "Spatio-Temporal Computer Vision & Deep ML Forecasting Model",
        tech: ["PyTorch", "YOLOv8", "Time-Series ML", "OpenCV", "FastAPI"],
        problem: "Urban traffic signals operate on fixed timer schedules, leading to severe bottlenecks during unexpected traffic spikes.",
        solution: "Developed an end-to-end computer vision and spatio-temporal deep learning system that detects vehicle counts and speeds from live CCTV video feeds, predicts congestion propagation using time-series neural networks, and recommends optimal signal timings.",
        highlights: [
            "94.2% precision in forecasting 15-minute traffic congestion peaks",
            "Real-time processing at 60 FPS on edge hardware",
            "Spatio-temporal heatmaps for urban planning decision support",
            "Automated vehicle classification (cars, buses, trucks, bikes)"
        ],
        codeSnippet: `class TrafficForecastModel(nn.Module):
    def __init__(self, spatial_dim, temporal_dim):
        super().__init__()
        self.conv_spatial = SpatialGraphConv(spatial_dim)
        self.lstm_temporal = nn.LSTM(temporal_dim, hidden_size=128)
        
    def forward(self, x):
        spatial_features = self.conv_spatial(x)
        out, _ = self.lstm_temporal(spatial_features)
        return self.fc_out(out)`
    }
};

function openProjectModal(id) {
    const data = projectsData[id];
    if (!data) return;

    const modal = document.getElementById('blueprintModal');
    const modalBody = document.getElementById('modalBody');

    if (modal && modalBody) {
        modalBody.innerHTML = `
            <div class="modal-blueprint">
                <span class="badge-tag">ENGINEERING BLUEPRINT // 0${id}</span>
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin: 0.5rem 0;">${data.title}</h2>
                <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1.5rem;">${data.subtitle}</p>

                <div class="core-competencies" style="margin-bottom: 2rem;">
                    ${data.tech.map(t => `<span class="comp-chip">${t}</span>`).join('')}
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Core Challenge</h4>
                    <p style="color: var(--text-secondary); font-size: 1rem;">${data.problem}</p>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">System Architecture Solution</h4>
                    <p style="color: var(--text-secondary); font-size: 1rem;">${data.solution}</p>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Key Performance Highlights</h4>
                    <ul style="padding-left: 1.2rem; color: var(--text-secondary);">
                        ${data.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${h}</li>`).join('')}
                    </ul>
                </div>

                <div>
                    <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Code Blueprint Excerpt</h4>
                    <pre class="code-snippet-preview"><code>${escapeHtml(data.codeSnippet)}</code></pre>
                </div>
            </div>
        `;
        modal.classList.add('active');
        if (soundEnabled) playClickSound(550, 0.08);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('blueprintModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function copyEmail() {
    const emailText = "vedantkp79@gmail.com";
    navigator.clipboard.writeText(emailText).then(() => {
        showToast();
    }).catch(err => console.error(err));
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('active');
        if (soundEnabled) playClickSound(800, 0.1);
        setTimeout(() => toast.classList.remove('active'), 3000);
    }
}
