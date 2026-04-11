function generateSliderImages(imageFolderPath, sliderId, numberOfImages) {
    let currentIndex = 0;
    const slider = document.getElementById(sliderId);
    
    function getImagesPerSlide() {
        const containerWidth = slider.parentElement.offsetWidth;
        const minImageWidth = 302.75;
        const gap = 10;
        
        let imagesPerSlide = Math.floor((containerWidth + gap) / (minImageWidth + gap));
        return Math.min(Math.max(imagesPerSlide, 1), 4);
    }
    
    let imagesPerSlide = getImagesPerSlide();
    let totalSlides = Math.ceil(numberOfImages / imagesPerSlide);
    
    function buildSlider() {
        imagesPerSlide = getImagesPerSlide();
        totalSlides = Math.ceil(numberOfImages / imagesPerSlide);
        currentIndex = 0;
        slider.innerHTML = '';
        
        for (let i = 0; i < numberOfImages; i += imagesPerSlide) {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'image-slider-slide-image-container';
            
            for (let j = 0; j < imagesPerSlide && (i + j) < numberOfImages; j++) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-slider-slide-image';
                
                const img = document.createElement('img');
                img.src = imageFolderPath + `image${i+j+1}.avif`;
                img.alt = `image${i+j+1}`;
                img.loading = 'lazy';
                
                imageContainer.appendChild(img);
                slideDiv.appendChild(imageContainer);
            }
            
            slider.appendChild(slideDiv);
        }
        
        slider.style.transform = 'translateX(0)';
    }
    
    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    buildSlider();
    const interval = setInterval(goToNextSlide, 5000);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newImagesPerSlide = getImagesPerSlide();
            if (newImagesPerSlide !== imagesPerSlide) {
                buildSlider();
            }
        }, 250);
    });
}

async function loadImageSlider() {
    try {
        const placeholders = document.querySelectorAll('.image-slider-placeholder');

        placeholders.forEach(async (placeholder) => {
            const response = await fetch('/assets/components/image-slider.html');
            const html = await response.text();

            const id = placeholder.dataset.id;
            const folder = placeholder.dataset.folder;
            const numberOfImages = parseInt(placeholder.dataset.numberOfImages);
            placeholder.innerHTML = html;

            const track = placeholder.querySelector('.image-slider-track');
            track.id = id;

            generateSliderImages(folder, id, numberOfImages);
        });
    } catch (error) {
        console.error('Error loading slider:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadImageSlider);