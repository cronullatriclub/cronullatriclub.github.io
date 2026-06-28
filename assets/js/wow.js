document.addEventListener('DOMContentLoaded', function () {

    // Trigger wow animations
    function triggerWowAnimation(containerSelector) {
        var container = document.querySelector(containerSelector);
        if (!container) return;
        var items = container.querySelectorAll('.wow');
        if (!items.length) return;

        function activate() {
            items.forEach(function (item) {
                var delay = item.getAttribute('data-wow-delay') || '0s';
                item.style.animationDelay = delay;
                item.classList.add('animated');
            });
        }

        if ('IntersectionObserver' in window) {
            var wowObserver = new IntersectionObserver(function (entries, wowObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        activate();
                        wowObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            wowObserver.observe(container);
        } else {
            activate();
        }
    }

    triggerWowAnimation('.points-grid');
    triggerWowAnimation('.highlights-grid');
});
