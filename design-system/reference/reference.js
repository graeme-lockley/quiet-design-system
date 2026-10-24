/* ==========================================================================
   Quiet — reference behaviour
   Mode switching, token display and the small interactive specimens.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "quiet-mode";
  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var preference = "system";

  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") preference = stored;
  } catch (e) {
    /* private mode / file restrictions — stay with system */
  }

  function resolvedMode() {
    if (preference === "system") return media.matches ? "dark" : "light";
    return preference;
  }

  function updateSwatches() {
    var styles = getComputedStyle(root);
    document.querySelectorAll("[data-token]").forEach(function (el) {
      var value = styles.getPropertyValue(el.getAttribute("data-token")).trim();
      el.textContent = value;
      el.title = value;
    });
  }

  function applyMode() {
    var mode = resolvedMode();
    root.setAttribute("data-mode", mode);

    document.querySelectorAll("[data-mode-btn]").forEach(function (button) {
      var isActive = button.getAttribute("data-mode-btn") === preference;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    /* Let the cascade settle before reading the values back. */
    window.requestAnimationFrame(updateSwatches);
  }

  function setPreference(next) {
    if (next !== "light" && next !== "dark" && next !== "system") return;
    preference = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
    applyMode();
  }

  document.querySelectorAll("[data-mode-btn]").forEach(function (button) {
    button.addEventListener("click", function () {
      setPreference(button.getAttribute("data-mode-btn"));
    });
  });

  if (media.addEventListener) {
    media.addEventListener("change", function () {
      if (preference === "system") applyMode();
    });
  } else if (media.addListener) {
    media.addListener(function () {
      if (preference === "system") applyMode();
    });
  }

  /* Segmented specimens — visual only, but keyboard-correct. */
  document.querySelectorAll(".seg").forEach(function (seg) {
    var buttons = Array.prototype.slice.call(seg.querySelectorAll("button"));
    seg.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button || !seg.contains(button)) return;
      buttons.forEach(function (b) {
        b.classList.toggle("is-active", b === button);
        b.setAttribute("aria-pressed", b === button ? "true" : "false");
      });
    });
  });

  /* Switch specimens — real toggle state, no product effect. */
  document.querySelectorAll(".switch").forEach(function (sw) {
    function toggle() {
      var on = sw.getAttribute("aria-checked") === "true";
      sw.setAttribute("aria-checked", on ? "false" : "true");
    }
    sw.addEventListener("click", toggle);
    sw.addEventListener("keydown", function (event) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggle();
      }
    });
  });

  applyMode();
})();
