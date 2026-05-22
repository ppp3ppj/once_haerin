// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// ─── Win95-style confirm dialog (overrides browser native confirm for Turbo) ───
Turbo.config.forms.confirm = function (message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "win-confirm-overlay";

    overlay.innerHTML = `
      <div class="win-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="win-confirm-title">
        <div class="win-titlebar">
          <span style="font-size:14px;">⚠️</span>
          <span class="win-titlebar-title" id="win-confirm-title">Confirm Delete</span>
          <span class="win-ctrl" id="win-confirm-cancel-x" style="font-weight:bold;">✕</span>
        </div>
        <div class="win-confirm-body">
          <div class="win-confirm-icon">⚠️</div>
          <div class="win-confirm-message">${message}</div>
        </div>
        <div class="win-confirm-footer">
          <button class="win-btn win-btn-primary" id="win-confirm-ok">OK</button>
          <button class="win-btn" id="win-confirm-cancel">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const dialog = overlay.querySelector(".win-confirm-dialog");
    setTimeout(() => dialog.focus(), 10);

    function close(result) {
      overlay.classList.add("win-confirm-closing");
      overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
      resolve(result);
    }

    overlay.querySelector("#win-confirm-ok").addEventListener("click", () => close(true));
    overlay.querySelector("#win-confirm-cancel").addEventListener("click", () => close(false));
    overlay.querySelector("#win-confirm-cancel-x").addEventListener("click", () => close(false));

    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") { document.removeEventListener("keydown", onKey); close(false); }
      if (e.key === "Enter")  { document.removeEventListener("keydown", onKey); close(true);  }
    });
  });
};

// ─── Win95-style About dialog ───────────────────────────────────────────────
function openAbout() {
  if (document.getElementById("win-about-overlay")) return; // already open

  const version = document.querySelector('meta[name="app-version"]')?.content || "1.0.0";
  const build   = document.querySelector('meta[name="app-build"]')?.content   || "unknown";

  // Approximate available memory — retro joke
  const memKB = Math.round(performance?.memory?.jsHeapSizeLimit / 1024) || 640;

  const overlay = document.createElement("div");
  overlay.id        = "win-about-overlay";
  overlay.className = "win-confirm-overlay";   // reuse the same backdrop

  overlay.innerHTML = `
    <div class="win-about-dialog" role="dialog" aria-modal="true" aria-labelledby="win-about-title">

      <div class="win-titlebar">
        <span style="font-size:14px;">🖥</span>
        <span class="win-titlebar-title" id="win-about-title">About Once Minji</span>
        <span class="win-ctrl" id="win-about-close" style="font-weight:bold;">✕</span>
      </div>

      <div class="win-about-body">

        <div class="win-about-hero">
          <div class="win-about-appicon">🖥</div>
          <div class="win-about-appinfo">
            <div class="win-about-appname">Once Minji</div>
            <div class="win-about-version">Version ${version}</div>
            <div class="win-about-build">Build ${build}</div>
          </div>
        </div>

        <hr class="win-about-rule">

        <div class="win-about-legal">
          Copyright &copy; 2026 Once Minji.<br>
          All rights reserved.
        </div>

        <hr class="win-about-rule">

        <div class="win-about-sysinfo">
          <div class="win-about-sysrow">
            <span>Built with:</span>
            <span>Ruby on Rails + TailwindCSS + DaisyUI</span>
          </div>
          <div class="win-about-sysrow">
            <span>UI theme:</span>
            <span>Retro OS (Win95/98)</span>
          </div>
          <div class="win-about-sysrow">
            <span>Available memory:</span>
            <span>${memKB.toLocaleString()} KB</span>
          </div>
        </div>

      </div>

      <div class="win-confirm-footer">
        <button class="win-btn win-btn-primary" id="win-about-ok" style="min-width:75px;">OK</button>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  function closeAbout() {
    overlay.classList.add("win-confirm-closing");
    overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
  }

  overlay.querySelector("#win-about-ok").addEventListener("click", closeAbout);
  overlay.querySelector("#win-about-close").addEventListener("click", closeAbout);
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape" || e.key === "Enter") {
      document.removeEventListener("keydown", onKey);
      closeAbout();
    }
  });
}

// Wire up all About triggers after DOM is ready
document.addEventListener("turbo:load", function () {
  document.getElementById("about-btn")?.addEventListener("click", openAbout);
  document.getElementById("start-about-btn")?.addEventListener("click", function () {
    document.getElementById("start-menu")?.classList.remove("open");
    openAbout();
  });
});
