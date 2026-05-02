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

   
    function getRandomUniqueIndices(total, max) {
        const indices = new Set();
        while (indices.size < total) {
            indices.add(Math.floor(Math.random() * max) + 1);
        }
        return Array.from(indices);
    }

    let imagesPerSlide = getImagesPerSlide();
    let totalSlides = Math.floor(numberOfImages / imagesPerSlide);

    function buildSlider() {
        imagesPerSlide = getImagesPerSlide();
        totalSlides = Math.floor(numberOfImages / imagesPerSlide);
        const totalImagesNeeded = totalSlides * imagesPerSlide;
        currentIndex = 0;
        // Pick random unique images
        const selectedImages = getRandomUniqueIndices(totalImagesNeeded, numberOfImages);

        slider.innerHTML = '';

        let pointer = 0;

        for (let i = 0; i < totalSlides; i++) {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'image-slider-slide-image-container';

            for (let j = 0; j < imagesPerSlide; j++) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-slider-slide-image';

                const img = document.createElement('img');
                const imageIndex = selectedImages[pointer++];

                img.src = `${imageFolderPath}image${imageIndex}.avif`;
                img.alt = `image${imageIndex}`;
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