/**
 * Scroll Navigation Active Link Highlighter
 * Uses IntersectionObserver to detect which section is in viewport
 * and highlights the corresponding navigation link
 */

(function() {
    'use strict';

    // Only run on the home page
    if(window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        return;
    }

    // Configuration
    const config = {
        rootMargin: '-80px 0px -80px 0px', // Offset for fixed navbar
        threshold: 0.2 // Trigger when 20% of section is visible
    };

    // Get all sections with scroll-section class
    const sections = document.querySelectorAll('.scroll-section');

    // Get all navigation anchor links
    const navLinks = document.querySelectorAll('.nav-anchor-link');

    // Track currently active section
    let activeSection = null;

    /**
     * Update active navigation link
     * @param {string} sectionId - ID of the active section
     */
    function updateActiveLink(sectionId) {
        if(activeSection === sectionId) return;

        activeSection = sectionId;

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to matching nav link
        if(sectionId) {
            const activeLink = document.querySelector(`.nav-anchor-link[data-section="${sectionId}"]`);
            if(activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    /**
     * Handle intersection changes
     * @param {IntersectionObserverEntry[]} entries
     */
    function handleIntersection(entries) {
        // Find the section with highest intersection ratio
        let maxRatio = 0;
        let topSection = null;

        entries.forEach(entry => {
            if(entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                topSection = entry.target.id;
            }
        });

        // Update active link if we found a prominent section
        if(topSection) {
            updateActiveLink(topSection);
        }
    }

    // Create IntersectionObserver
    const observer = new IntersectionObserver(handleIntersection,config);

    // Observe all sections
    sections.forEach(section => {
        if(section.id) {
            observer.observe(section);
        }
    });

    /**
     * Handle smooth scrolling on navigation click
     */
    navLinks.forEach(link => {
        const anchor = link.querySelector('a');
        if(anchor) {
            anchor.addEventListener('click',function(e) {
                const href = this.getAttribute('href');

                // Only handle anchor links on the same page
                if(href && href.includes('#')) {
                    const targetId = href.split('#')[1];
                    const targetSection = document.getElementById(targetId);

                    if(targetSection) {
                        e.preventDefault();

                        // Smooth scroll to section
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        // Update URL without jumping
                        history.pushState(null,null,`#${targetId}`);

                        // Update active link
                        updateActiveLink(targetId);
                    }
                }
            });
        }
    });

    /**
     * Handle initial load with hash in URL
     */
    function handleInitialHash() {
        const hash = window.location.hash;
        if(hash) {
            const targetId = hash.substring(1);
            const targetSection = document.getElementById(targetId);

            if(targetSection) {
                // Delay to ensure page is fully loaded
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    updateActiveLink(targetId);
                },100);
            }
        }
    }

    /**
     * Detect when scrolling to top (About section)
     */
    function handleTopScroll() {
        const scrollPosition = window.scrollY;
        const firstSection = sections[0];

        if(firstSection && scrollPosition < firstSection.offsetTop - 100) {
            updateActiveLink(null);

            // Activate "about" link
            const aboutLink = document.querySelector('.nav-item[class*="about"]');
            if(aboutLink) {
                aboutLink.classList.add('active');
            }
        }
    }

    // Initialize on page load
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded',function() {
            handleInitialHash();
            handleTopScroll();
        });
    } else {
        handleInitialHash();
        handleTopScroll();
    }

    // Update on scroll (debounced)
    let scrollTimeout;
    window.addEventListener('scroll',function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleTopScroll,50);
    },{passive: true});

})();
