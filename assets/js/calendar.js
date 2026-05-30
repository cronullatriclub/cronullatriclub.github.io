let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

function generateCalendar() {
    const container = document.getElementById('calendarContainer');
    const monthYearDisplay = document.getElementById('currentMonthYear');
    if (!container) return;
    
    container.innerHTML = '';
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    if (monthYearDisplay) {
        monthYearDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
    }
    
    const monthDiv = document.createElement('div');
    monthDiv.className = 'calendar-card';
    
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day-cell empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day-cell';
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        var pad = function(num) { return String(num).length === 1 ? '0' + num : String(num); };
        var dateKey = currentYear + '-' + pad(currentMonth + 1) + '-' + pad(day);

        if (events[dateKey]) {
            var eventsForDay = events[dateKey];
            var eventArray = Array.isArray(eventsForDay) ? eventsForDay : [eventsForDay];
            var firstEvent = eventArray[0];
            
            dayCell.classList.add('has-event', firstEvent.type);
            
            var eventIndicator = document.createElement('div');
            eventIndicator.className = 'calendar-indicator';
            eventIndicator.textContent = eventArray.length > 1 ? firstEvent.name + ' +' + (eventArray.length - 1) : firstEvent.name;
            dayCell.appendChild(eventIndicator);
            
            dayCell.title = firstEvent.name + ' - ' + firstEvent.type;
            
            dayCell.style.cursor = 'pointer';
            dayCell.onclick = function() {
                window.location.href = '../' + firstEvent.nav + '/' + firstEvent.type;
            };
        }
        
        calendarGrid.appendChild(dayCell);
    }
    
    monthDiv.appendChild(calendarGrid);
    container.appendChild(monthDiv);
}

document.addEventListener('DOMContentLoaded', generateCalendar);