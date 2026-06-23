/* ============================================================
   ESTELLA — interactions (calm, editorial · reels-led)
   ============================================================ */
(function () {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if ("scrollRestoration" in history) history.scrollRestoration = "manual"; // always open at the top

  document.getElementById("yr").textContent = new Date().getFullYear();

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (typeof Lenis !== "undefined" && !REDUCED) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 });
    window.lenis = lenis;
    if (hasGSAP) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  const goTo = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------- split [data-rise] into masked inners ---------- */
  document.querySelectorAll("[data-rise]").forEach((el) => {
    const inner = document.createElement("span");
    inner.className = "rise-inner";
    inner.style.display = "block";
    inner.innerHTML = el.innerHTML;
    el.innerHTML = "";
    el.appendChild(inner);
    if (!el.style.display) el.style.display = "block";
    el.style.overflow = "hidden";
  });
  if (hasGSAP) gsap.set(".rise-inner", { yPercent: 110 });

  function riseIn(scope, delay) {
    if (!hasGSAP) return;
    gsap.to(scope.querySelectorAll(".rise-inner"),
      { yPercent: 0, duration: 1, stagger: 0.08, ease: "power3.out", delay: delay || 0 });
  }

  /* ---------- reels ---------- */
  const reelVideos = Array.from(document.querySelectorAll(".hero__video, .social__band video"));
  function playReels() { reelVideos.forEach((v) => v.play().catch(() => {})); }
  /* pause reels while off-screen — lighter + keeps playback smooth */
  if ("IntersectionObserver" in window) {
    const reelIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause(); });
    }, { threshold: 0.15, rootMargin: "150px 0px" });
    reelVideos.forEach((v) => reelIO.observe(v));
  }

  /* ---------- loader → reveal ---------- */
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderBar");

  function reveal() {
    if (document.body.classList.contains("ready")) return; // once
    document.body.classList.add("ready");

    const copy = document.querySelector(".hero__copy");
    if (copy) riseIn(copy, 0.05);

    if (hasGSAP) {
      gsap.fromTo(".hero__media", { scale: 1.15, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 1.9, ease: "power3.out" });
      gsap.fromTo(".hero__tag", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.9 });

      [".studio__statement", ".work__intro h2", ".contact__big"].forEach((sel) => {
        document.querySelectorAll(sel).forEach((group) => {
          ScrollTrigger.create({ trigger: group, start: "top 85%", once: true, onEnter: () => riseIn(group) });
        });
      });
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        if (el.closest(".hero")) return; // hero reels handled above
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }
    playReels();
    if (hasGSAP) ScrollTrigger.refresh();
  }

  if (loader && hasGSAP && !REDUCED) {
    if (lenis) lenis.stop();
    gsap.timeline()
      .fromTo(".loader__mark", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(bar, { width: "100%", duration: 1.0, ease: "power2.inOut" }, 0.1)
      .to(loader, {
        yPercent: -100, duration: 0.9, ease: "power3.inOut",
        onStart() { if (lenis) lenis.start(); },
        onComplete() { loader.style.display = "none"; reveal(); },
      }, "+=0.05");
  } else {
    if (loader) loader.style.display = "none";
    if (hasGSAP) gsap.set(".rise-inner", { yPercent: 0 });
    reveal();
  }

  /* failsafe: never leave content hidden if the intro stalls */
  setTimeout(() => {
    if (document.body.classList.contains("ready")) return;
    if (loader) loader.style.display = "none";
    document.querySelectorAll(".rise-inner").forEach((e) => (e.style.transform = "translateY(0)"));
    document.querySelectorAll("[data-reveal]").forEach((e) => { e.style.opacity = "1"; e.style.transform = "none"; });
    if (lenis) lenis.start();
    reveal();
  }, 4000);

  /* ---------- header — shrink to a frosted bar on scroll ---------- */
  const hdr = document.getElementById("hdr");
  function onScroll(y) { hdr.classList.toggle("scrolled", y > 40); }
  if (lenis) lenis.on("scroll", (e) => onScroll(e.scroll));
  else window.addEventListener("scroll", () => onScroll(window.scrollY), { passive: true });
  onScroll(window.scrollY);

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const mmenu = document.getElementById("mmenu");
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    mmenu.setAttribute("aria-hidden", "true");
    if (lenis) lenis.start();
  };
  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", String(open));
    mmenu.setAttribute("aria-hidden", String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  });

  /* ---------- anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href === "#top") { e.preventDefault(); closeMenu(); if (lenis) lenis.scrollTo(0, { duration: 1.2 }); else window.scrollTo(0, 0); }
      else if (href.length > 1) { e.preventDefault(); closeMenu(); goTo(href); }
    });
  });

  if (hasGSAP && document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
