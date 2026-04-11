window.addEventListener("load", () => {
  const target = document.querySelector(".referral");
  if (!target) return;

  // Force your override immediately
  target.style.setProperty("display", "none", "important");

  // Watch for the 3rd‑party script trying to change it again
  const observer = new MutationObserver(() => {
    target.style.setProperty("display", "none", "important");
      document.querySelectorAll(".juicer-about").forEach(el => {
  el.style.setProperty("display", "none", "important");
  });

  });

  observer.observe(target, {
    attributes: true,
    attributeFilter: ["style"]
  });
});