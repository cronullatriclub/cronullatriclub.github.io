let currentSlide = 0;

function updateSlider() {
    const slider = document.getElementById('home-slider');
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

function nextSlide() {
    const slides = document.querySelectorAll('.home-slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    const slides = document.querySelectorAll('.home-slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function populateUpcomingEvents() {
    const slider = document.getElementById('home-slider');
    if (!slider) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    var allFutureEventsEntries = Object.entries(events);
    var allFutureEvents = [];
    for (var i = 0; i < allFutureEventsEntries.length; i++) {
        var dateKey = allFutureEventsEntries[i][0];
        var ev = allFutureEventsEntries[i][1];
        var parts = dateKey.split('-').map(Number);
        var eventDate = new Date(parts[0], parts[1] - 1, parts[2]);
        if (Array.isArray(ev)) {
            for (var j = 0; j < ev.length; j++) {
                allFutureEvents.push({ dateKey: dateKey, event: ev[j], eventDate: eventDate });
            }
        } else {
            allFutureEvents.push({ dateKey: dateKey, event: ev, eventDate: eventDate });
        }
    }
    allFutureEvents = allFutureEvents.filter(function(item) { return item.eventDate >= today; });

    const highlightEvents = allFutureEvents
        .filter(item => item.event.ishighlight && !item.event.iskey)
        .sort((a, b) => a.eventDate - b.eventDate)
        .slice(0, 3);

    const futureEvents = allFutureEvents
        .filter(item => item.event.iskey || highlightEvents.some(highlight => highlight.dateKey === item.dateKey))
        .sort((a, b) => a.eventDate - b.eventDate);

    slider.innerHTML = '';
    
    const typeLabels = {
        'race': 'Race Event',
        'train/adults': 'Training Session',
        'train/juniors': 'Training Session',
        'belong': 'Social Event',
        'governance': 'Governance Event'
    };
    
    futureEvents.forEach(({ event, eventDate }) => {
        const slide = document.createElement('div');
        slide.className = 'home-slide';
        
        const eventCard = document.createElement('div');
        if (event.nav && event.type) {
            eventCard.className = 'home-event-card';
        } else {
            eventCard.className = 'home-event-card no-link';
        }
        
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = eventDate.toLocaleDateString('en-US', options);

        var times = event.start;
        if (event.finish) {
            times = event.start + " - " + event.finish
        }

        var tagHtml = '';
        var tags = event.tags || [];
        for (var k = 0; k < tags.length; k++) {
            var tag = tags[k];
            var tagClass = tag.toLowerCase().indexOf('adults') !== -1 ? 'home-weekly-event-tag-adults' : 'home-weekly-event-tag';
            tagHtml += '<span class="' + tagClass + '">' + tag + '</span>';
        }

        eventCard.innerHTML = `
            <div class="home-event-overlay">
                <div class="home-event-image"><img src="assets/images/components/events/${event.image}" alt="${event.name}"></div>
            </div>
            <div class="home-event-details">
                <div class="home-event-date"><span class="home-event-time">${times}</span> <span class="home-event-day">${formattedDate}</span></div>
                <h3>${event.name}</h3>
                <p class="home-event-subtitle limit-lines-5">${event.subtitle}</p>
                <div class="home-weekly-event-type">${typeLabels[event.nav]}</div>
                <div class="home-event-tags">${tagHtml}</div>
            </div>
        `;
        if (event.nav && event.type) {
              eventCard.onclick = function() {
            window.location.href = `${event.nav}/${event.type}`;
            };
        }
        slide.appendChild(eventCard);
        slider.appendChild(slide);
    });
    
    if (futureEvents.length === 0) {
        slider.innerHTML = `
            <div class="home-slide">
                <div class="home-event-card">
                    <div class="home-event-image">📅</div>
                    <div class="home-event-details">
                        <h3>Check Back Soon!</h3>
                        <p>No upcoming events scheduled at the moment. Visit our calendar page to see our full schedule and past events.</p>
                    </div>
                </div>
            </div>
        `;
    }
     if (futureEvents.length <= 1) {
        const controls = document.querySelector(".home-slider-controls");
        controls.style.display = "none";
     }
    
    currentSlide = 0;
    updateSlider();
}

function generateWeeklyEvents() {
    const weeklyEventsGrid = document.getElementById('weeklyEventsGrid');
    const weekRangeDiv = document.getElementById('weekRange');
    if (!weeklyEventsGrid) return;
    
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
    startOfWeek.setHours(0, 0, 0, 0);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const options = { month: 'long', day: 'numeric' };
    const startFormatted = startOfWeek.toLocaleDateString('en-US', options);
    const endFormatted = endOfWeek.toLocaleDateString('en-US', options);
    if (weekRangeDiv) {
        weekRangeDiv.textContent = `${startFormatted} - ${endFormatted}, ${today.getFullYear()}`;
    }
    
    var thisWeekEntries = Object.entries(events);
    var thisWeekEvents = [];
    for (var i = 0; i < thisWeekEntries.length; i++) {
        var dateKey = thisWeekEntries[i][0];
        var ev = thisWeekEntries[i][1];
        var parts = dateKey.split('-').map(Number);
        var eventDate = new Date(parts[0], parts[1] - 1, parts[2]);
        if (Array.isArray(ev)) {
            for (var j = 0; j < ev.length; j++) {
                thisWeekEvents.push({ dateKey: dateKey, event: ev[j], eventDate: eventDate });
            }
        } else {
            thisWeekEvents.push({ dateKey: dateKey, event: ev, eventDate: eventDate });
        }
    }
    thisWeekEvents = thisWeekEvents.filter(function(item) { return item.eventDate >= startOfWeek && item.eventDate <= endOfWeek; });
    thisWeekEvents.sort(function(a, b) { return a.eventDate - b.eventDate; });
    
    weeklyEventsGrid.innerHTML = '';
    
    if (thisWeekEvents.length === 0) {
        weeklyEventsGrid.innerHTML = `
            <div class="home-no-events-message">
                No events scheduled for this week. Check out our calendar for upcoming events!
            </div>
        `;
        return;
    }
    
    const typeLabels = {
        'train/adults': 'Training Session',
        'train/juniors': 'Training Session',
        'race': 'Race Event',
        'belong': 'Social Event',
        'governance': 'Governance Event'
    };
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    thisWeekEvents.forEach(({ dateKey, event, eventDate }) => {
        const card = document.createElement('div');
        card.className = `home-weekly-event-card ${event.type}`;
        
        const dayName = dayNames[eventDate.getDay()];
        const monthDay = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        var times = event.start;
        if (event.finish) {
            times = event.start + " - " + event.finish
        }

        var tagHtml = '';
        var tags = event.tags || [];
        for (var k = 0; k < tags.length; k++) {
            var tag = tags[k];
            var tagClass = tag.toLowerCase().indexOf('adults') !== -1 ? 'home-weekly-event-tag-adults' : 'home-weekly-event-tag';
            tagHtml += '<span class="' + tagClass + '">' + tag + '</span>';
        };
        
        card.innerHTML = `
            <div class="home-weekly-event-content">
                <div class="home-weekly-event-image">
                    <img src="assets/images/components/events/${event.image}" alt="${event.name}">
                </div>
                <div class="home-weekly-event-info">
                    <div class="home-weekly-event-name">${event.name}</div>
                    <div class="home-weekly-event-day">${times} ${dayName}, ${monthDay}</div>
                    <div class="home-weekly-event-subtitle">${event.subtitle}</div>
                    <div class="home-weekly-event-type">${typeLabels[event.nav]}</div>
                    <div class="home-weekly-event-tags">${tagHtml}</div>
                </div>
            </div>
        `;
        card.style.cursor = 'pointer';
        card.onclick = function() {
            window.location.href = `${event.nav}/${event.type}.html`;
        }.bind({ dateKey: dateKey });

        weeklyEventsGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateUpcomingEvents();
    generateWeeklyEvents();
    setInterval(nextSlide, 5000);
});
