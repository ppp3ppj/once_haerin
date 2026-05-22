// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// ─── Win95-style confirm dialog (overrides browser native confirm for Turbo) ───
Turbo.config.forms.confirm = function (message) {
  return new Promise((resolve) => {
    // Build overlay
    const overlay = document.createElement("div");
    overlay.className = "win-confirm-overlay";

    // Dialog window
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

    // Tiny delay so the dialog can receive focus
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

    // Esc key cancels
    document.addEventListener("keydown", function onKey(e) {
      if (e.key === "Escape") { document.removeEventListener("keydown", onKey); close(false); }
      if (e.key === "Enter")  { document.removeEventListener("keydown", onKey); close(true);  }
    });
  });
};
