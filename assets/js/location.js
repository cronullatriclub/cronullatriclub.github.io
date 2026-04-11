async function loadLocation() {
    try {
        const response = await fetch('/assets/components/location.html');
        const html = await response.text();

        const placeholder = document.getElementById('location-placeholder');
        const title = placeholder.dataset.title;
        const venue = placeholder.dataset.venueDetails;
        const parking = placeholder.dataset.parkingDetails;
        const transport = placeholder.dataset.transportDetails;
        const mapUrl = placeholder.dataset.map;

        placeholder.innerHTML = html;
        if (title)
        {
            document.getElementById("location-title").innerText = title;
        }
        document.getElementById("venue-details").innerText = venue;
        if(parking){
            document.getElementById("parking-details").innerText = parking;
        } else {
            document.getElementById("parking-section").style.display = 'none';
        }
        if(transport)
        {
        document.getElementById("transport-details").innerText = transport;
        } else {
        document.getElementById("transport-section").style.display = 'none';
        }
        document.getElementById("map-frame").src = mapUrl;       
    } catch (error) {
        console.error('Error loading location:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadLocation);
