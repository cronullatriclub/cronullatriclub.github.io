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
    
    const futureEvents = Object.entries(events)
        .map(([dateKey, event]) => {
            const [year, month, day] = dateKey.split('-').map(Number);
            const eventDate = new Date(year, month - 1, day);
            return { dateKey, event, eventDate };
        })
        .filter(item => item.eventDate >= today && item.event.ishighlight)
        .sort((a, b) => a.eventDate - b.eventDate)
        .slice(0, 3);
    
    slider.innerHTML = '';
    
    const typeLabels = {
        'race': 'Race Event',
        'train': 'Training Session',
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
        
        eventCard.innerHTML = `
            <div class="home-event-overlay">
                <div class="home-event-image"><img src="assets/images/components/events/${event.image}" alt="${event.name}"></div>
            </div>
            <div class="home-event-details">
                <span class="home-event-date">${event.start} ${formattedDate}</span>
                <h3>${event.name}</h3>
                <p class="home-event-subtitle limit-lines-5">${event.subtitle}</p>
                <div class="home-weekly-event-type">${typeLabels[event.nav]}</div>
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
    
    const thisWeekEvents = Object.entries(events)
        .map(([dateKey, event]) => {
            const [year, month, day] = dateKey.split('-').map(Number);
            const eventDate = new Date(year, month - 1, day);
            return { dateKey, event, eventDate };
        })
        .filter(item => item.eventDate >= startOfWeek && item.eventDate <= endOfWeek)
        .sort((a, b) => a.eventDate - b.eventDate);
    
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
        'train': 'Training Session',
        'race': 'Race Event',
        'belong': 'Social Event'
    };
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    thisWeekEvents.forEach(({ dateKey, event, eventDate }) => {
        const card = document.createElement('div');
        card.className = `home-weekly-event-card ${event.type}`;
        
        const dayName = dayNames[eventDate.getDay()];
        const monthDay = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        card.innerHTML = `
            <div class="home-weekly-event-content">
                <div class="home-weekly-event-image">
                    <img src="assets/images/components/events/${event.image}" alt="${event.name}">
                </div>
                <div class="home-weekly-event-info">
                    <div class="home-weekly-event-name">${event.name}</div>
                    <div class="home-weekly-event-day">${event.start} ${dayName}, ${monthDay}</div>
                    <div class="home-weekly-event-subtitle">${event.subtitle}</div>
                    <div class="home-weekly-event-type">${typeLabels[event.nav]}</div>
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
