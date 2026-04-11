async function loadTitle() {
    try {
        const response = await fetch('/assets/components/title.html');
        const html = await response.text();

        const placeholder = document.getElementById('title-placeholder');
        const title = placeholder.dataset.title;

        placeholder.innerHTML = html;

        // Now the new HTML exists in the DOM, so select it globally
        document.getElementById("title-header").innerText = title;

    } catch (error) {
        console.error('Error loading title:', error);
    }
}

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadTitle);
