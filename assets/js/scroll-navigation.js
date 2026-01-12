/**
 * Scroll Navigation Active Link Highlighter
 * Uses IntersectionObserver to detect which section is in viewport
 * and highlights the corresponding navigation link
 */

(function() {
  "use strict";

  // Only run on the home page
  if(window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
    return;
  }

  // Configuration
  const config = {
    rootMargin: "-100px 0px -40% 0px", // Better offset for detecting sections
    threshold: [0,0.1,0.25,0.5,0.75,1], // Multiple thresholds for smoother detection
  };

  // Get all sections with scroll-section class
  const sections = document.querySelectorAll(".scroll-section");

  // Get all navigation items (both anchor links and about)
  const navItems = document.querySelectorAll(".navbar-nav .nav-item");
  const navAnchorLinks = document.querySelectorAll(".nav-anchor-link");

  // Track currently active section
  let activeSection = null;

  // Store section positions for scroll-based detection
  let sectionPositions = [];

  function updateSectionPositions() {
    sectionPositions = [];
    sections.forEach((section) => {
      if(section.id) {
        sectionPositions.push({
          id: section.id,
          top: section.offsetTop,
          bottom: section.offsetTop + section.offsetHeight
        });
      }
    });
  }

  /**
   * Update active navigation link
   * @param {string} sectionId - ID of the active section (null for about/intro)
   */
  function updateActiveLink(sectionId) {
    if(activeSection === sectionId) return;

    activeSection = sectionId;

    // Remove active class from ALL nav items
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    if(sectionId) {
      // Find and activate the matching anchor link
      const activeLink = document.querySelector(`.nav-anchor-link[data-section="${sectionId}"]`);
      if(activeLink) {
        activeLink.classList.add("active");
      }
    } else {
      // Activate the "about" link (first nav-item that's not an anchor link)
      const aboutLink = document.querySelector(".navbar-nav .nav-item:not(.nav-anchor-link)");
      if(aboutLink) {
        aboutLink.classList.add("active");
      }
    }
  }

  /**
   * Determine active section based on scroll position
   */
  function determineActiveSection() {
    const scrollPosition = window.scrollY + 120; // Account for navbar height

    // Check if we're at the top (About section)
    if(sectionPositions.length > 0 && scrollPosition < sectionPositions[0].top) {
      updateActiveLink(null);
      return;
    }

    // Find which section we're in
    for(let i = sectionPositions.length - 1; i >= 0; i--) {
      if(scrollPosition >= sectionPositions[i].top) {
        updateActiveLink(sectionPositions[i].id);
        return;
      }
    }

    // Default to about if nothing matches
    updateActiveLink(null);
  }

  /**
   * Handle intersection changes (backup method)
   * @param {IntersectionObserverEntry[]} entries
   */
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if(entry.isIntersecting && entry.intersectionRatio > 0.25) {
        updateActiveLink(entry.target.id);
      }
    });
  }

  // Create IntersectionObserver as a backup
  const observer = new IntersectionObserver(handleIntersection,config);

  // Observe all sections
  sections.forEach((section) => {
    if(section.id) {
      observer.observe(section);
    }
  });

  /**
   * Handle smooth scrolling on navigation click
   */
  navAnchorLinks.forEach((link) => {
    const anchor = link.querySelector("a");
    if(anchor) {
      anchor.addEventListener("click",function(e) {
        const href = this.getAttribute("href");

        // Only handle anchor links on the same page
        if(href && href.includes("#")) {
          const targetId = href.split("#")[1];
          const targetSection = document.getElementById(targetId);

          if(targetSection) {
            e.preventDefault();

            // Smooth scroll to section
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });

            // Update URL without jumping
            history.pushState(null,null,`#${targetId}`);

            // Update active link immediately
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
            behavior: "smooth",
            block: "start",
          });
          updateActiveLink(targetId);
        },100);
      }
    } else {
      // No hash, activate about
      updateActiveLink(null);
    }
  }

  // Initialize on page load
  function initialize() {
    updateSectionPositions();
    handleInitialHash();
    determineActiveSection();
  }

  if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded",initialize);
  } else {
    initialize();
  }

  // Update section positions on resize
  window.addEventListener("resize",function() {
    updateSectionPositions();
  },{passive: true});

  // Primary scroll handler - use scroll position for accuracy
  let scrollTimeout;
  window.addEventListener(
    "scroll",
    function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(determineActiveSection,10);
    },
    {passive: true}
  );
})();
