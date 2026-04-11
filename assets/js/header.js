async function loadHeader() {
    try {
        const response = await fetch('/assets/components/header.html');
        const html = await response.text();
        document.getElementById('header-placeholder').innerHTML = html;

        const dropdowns = document.querySelectorAll('.header-nav-dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.header-header-nav-dropdown-toggle');
            
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                
                const isCurrentlyOpen = dropdown.classList.contains('active');
                
                dropdowns.forEach(d => d.classList.remove('active'));
                
                if (!isCurrentlyOpen) {
                    dropdown.classList.add('active');
                }
            });
        });


        // Close dropdowns when clicking outside OR when clicking a dropdown link
        document.addEventListener('click', (e) => {
            // Check if click is a dropdown menu link
            const clickedLink = e.target.closest('.header-header-nav-dropdown-menu a');
            
            if (clickedLink) {
                // Allow the link to work, just close the dropdown
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                return; // Let the link navigate normally
            }
            
            // Check if click is outside all dropdowns
            const clickedInsideDropdown = e.target.closest('.header-nav-dropdown');
            
            if (!clickedInsideDropdown) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHeader);
