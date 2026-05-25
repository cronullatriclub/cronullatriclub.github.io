document.addEventListener('DOMContentLoaded', function () {
    var counters = Array.prototype.slice.call(document.querySelectorAll('.stat-num'));
    if (!counters.length) return;

    counters.forEach(function (counter) {
        if (!counter.dataset.target) {
            var value = parseInt(counter.textContent.replace(/[^0-9]/g, ''), 10);
            if (!Number.isNaN(value)) {
                counter.dataset.target = value;
            }
        }
        counter.textContent = '0';
    });

    function animateCounter(counter) {
        var target = parseInt(counter.dataset.target, 10) || 0;
        var prefix = counter.dataset.prefix || '';
        var suffix = counter.dataset.suffix || '';
        var duration = 1200;
        var startTime = null;

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var value = Math.floor(progress * target);
            counter.textContent = prefix + value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(animate);
            } else {
                counter.textContent = prefix + target + suffix;
            }
        }

        window.requestAnimationFrame(animate);
    }

    function getGroupContainer(element) {
        return element.closest('.stats-strip, .why-right, .whatsapp-section, section') || document.body;
    }

    var groups = new Map();
    counters.forEach(function (counter) {
        var group = getGroupContainer(counter);
        if (!groups.has(group)) {
            groups.set(group, []);
        }
        groups.get(group).push(counter);
    });

    if ('IntersectionObserver' in window) {
        groups.forEach(function (groupCounters, group) {
            var observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        groupCounters.forEach(animateCounter);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe(group);
        });
    } else {
        counters.forEach(animateCounter);
    }

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
