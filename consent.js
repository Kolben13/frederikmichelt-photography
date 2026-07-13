(() => {
  "use strict";

  const CONSENT_KEY = "fm_analytics_consent";
  const GTM_ID = "GTM-K8LMV39K";

  const translations = {
    de: {
      title: "Datenschutzeinstellungen",
      text: "Diese Website verwendet optionale Analyse-Technologien von Google. Google Analytics wird erst geladen, wenn du zustimmst. Deine Entscheidung kannst du jederzeit in der Datenschutzerklärung ändern.",
      privacy: "Datenschutzerklärung",
      reject: "Ablehnen",
      accept: "Analyse akzeptieren"
    },
    en: {
      title: "Privacy settings",
      text: "This website uses optional analytics technologies from Google. Google Analytics is loaded only after you consent. You can change your choice at any time in the privacy policy.",
      privacy: "Privacy policy",
      reject: "Reject",
      accept: "Accept analytics"
    }
  };

  let gtmLoaded = false;

  function language() {
    return document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "de";
  }

  function readConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // If localStorage is unavailable, consent applies only for this page view.
    }
  }

  function loadGoogleTagManager() {
    if (gtmLoaded || document.getElementById("fm-google-tag-manager")) return;

    gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js"
    });

    const script = document.createElement("script");
    script.id = "fm-google-tag-manager";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);
  }

  function closeBanner() {
    document.getElementById("fm-consent")?.remove();
  }

  function acceptAnalytics() {
    saveConsent("accepted");
    closeBanner();
    loadGoogleTagManager();
  }

  function rejectAnalytics() {
    saveConsent("rejected");
    closeBanner();
  }

  function showBanner() {
    if (document.getElementById("fm-consent")) return;

    const t = translations[language()];
    const banner = document.createElement("section");
    banner.id = "fm-consent";
    banner.className = "fm-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "true");
    banner.setAttribute("aria-labelledby", "fm-consent-title");
    banner.innerHTML = `
      <div class="fm-consent__inner">
        <h2 id="fm-consent-title">${t.title}</h2>
        <p>${t.text} <a href="datenschutz.html">${t.privacy}</a>.</p>
        <div class="fm-consent__actions">
          <button type="button" class="fm-consent__button" data-consent-reject>${t.reject}</button>
          <button type="button" class="fm-consent__button fm-consent__button--primary" data-consent-accept>${t.accept}</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    banner.querySelector("[data-consent-reject]").addEventListener("click", rejectAnalytics);
    banner.querySelector("[data-consent-accept]").addEventListener("click", acceptAnalytics);
    banner.querySelector("[data-consent-reject]").focus();
  }

  window.fmResetPrivacyConsent = function () {
    try {
      localStorage.removeItem(CONSENT_KEY);
    } catch {
      // Ignore storage errors.
    }
    window.location.reload();
  };

  const consent = readConsent();
  if (consent === "accepted") {
    loadGoogleTagManager();
  } else if (consent !== "rejected") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showBanner, { once: true });
    } else {
      showBanner();
    }
  }
})();