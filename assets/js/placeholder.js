async function loadPlaceholder() {
    try {

        const placeholder = document.getElementById('event-placeholder');
        const event = placeholder.dataset.event;
        const eventId = placeholder.dataset.eventId;

        const events = populateEventDates(eventId);

        if (events.length === 0) {
            const response = await fetch('/assets/components/placeholder.html');
            const html = await response.text();
            placeholder.innerHTML = html;
            document.getElementById("placeholder-event").innerText = event;
        }

    } catch (error) {
        console.error('Error loading placeholder:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadPlaceholder);
