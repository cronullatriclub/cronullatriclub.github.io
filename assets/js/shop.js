let shopCurrentSlide = 0;
let shopProducts = [];
let shopTotalSlides = 0;
let currentProductImageIndex = 0; 
let currentProductImages = [];

function initShopSlider() {

    shopProducts = [
        { 
            image: '/assets/images/shop/trisuit.avif', 
            title: 'Junior Trisuit Rental', 
            price: '$25.00',
            description: 'With the rate that your kids are growing, it\u0027s hard to keep them in a tri suit that fits.\nIf this sounds like your kids, contact the junior coach by emailing juniors@cronullatriclub.com.au or email train@cronullatriclub.com.au',
            link: 'https://buy.stripe.com/test_9B63cv4VxdagaRAfDrbsc01'
        },
        { 
            image: '/assets/images/shop/bike.avif', 
            title: 'Beginner Bike Rental', 
            price: '$100.00', 
            description: 'Perfect for those new to the sport looking to try out triathlon without the commitment of purchasing equipment.\n If you would like to rent a bike before making a commitment, contact us at train@cronullatriclub.com.au',
            link: 'https://buy.stripe.com/test_6oU00jgEfc6c8Jsdvjbsc0e' // No sizes, direct link
        },
        { 
            image: '/assets/images/shop/socks-right.avif', 
            images: [
                '/assets/images/shop/socks-right.avif',
                '/assets/images/shop/socks-left.avif'
            ],
            title: 'Long Socks', 
            price: '$20.00',
            description: 'Cycling specific high top sock.\n Mesh weave ventilation for the top of the foot.\nSuperior wicking to keep feet dry.',
            sizes: [
                { name: 'Small', link: 'https://buy.stripe.com/test_bJe28r0Fhc6ccZIfDrbsc0c' },
                { name: 'Medium', link: 'https://buy.stripe.com/test_6oUeVd1Jlgms7FofDrbsc0b' },
                { name: 'Large', link: 'https://buy.stripe.com/test_6oU5kD2Npgmsf7Q76Vbsc0a' }
            ]
        },
        { 
            image: '/assets/images/shop/caps.avif', 
            title: 'Running Visor', 
            price: '$20.00', 
            description: 'Lightweight, breathable running visor with CTC logo. Perfect for sunny training sessions and race day.',
            link: 'https://buy.stripe.com/test_bJe9ATew7c6c7Fo3UJbsc08' 
        },
        { 
            image: '/assets/images/shop/jersey-front.avif', 
            images: [
                '/assets/images/shop/jersey-front.avif',
                '/assets/images/shop/jersey-back.avif'
            ],
            title: 'Race Jersey', 
            price: '$66.50',
            description: 'Tineli\u0027s drive to make the best race-day jersey possible has delivered the Aero Pro. It\u0027s lightweight, extremely aerodynamic and surprisingly comfortable for such a focused item. Tineli is proud to bring cutting edge, pro-level tech to the custom market. For size 152: Chest 78cm Length 55cm',
            sizes: [
                { name: 'Youth - 152', link: 'https://buy.stripe.com/test_dRm14n5ZB5HOf7QgHvbsc09' }
            ]
        },
        { 
            image: '/assets/images/shop/polo-front.avif', 
            images: [
                '/assets/images/shop/polo-front.avif',
                '/assets/images/shop/polo-back.avif'
            ],
            title: 'Polo Shirt', 
            price: '$37.80', 
            description: '140gsm QuickDry enhanced moisture management fabric. Button up opening. Double stitched hems for uncompromised durability.',
            sizes: [
                { name: 'Womens - Small', link: 'https://buy.stripe.com/test_3cI5kDfAbfio4tc9f3bsc0d' }
            ] 
        },
                { 
            image: '/assets/images/shop/jacket.avif', 
            images: [
                '/assets/images/shop/jacket.avif',
                '/assets/images/shop/jacket-size.avif',
                '/assets/images/shop/jacket-logo.avif'
            ],
            title: 'Club Champs Jacket', 
            description: 'Lightweight, water-resistant jacket perfect for training and race day. Club Champs 40 Years Jacket.',
            price: '$24.00',
            sizes: [
                { name: 'Womens - 8', link: 'https://buy.stripe.com/test_aFa6oHcnZc6ccZI0Ixbsc06' },
                { name: 'Womens - 10', link: 'https://buy.stripe.com/test_aFa3cvbjV1ry6Bk3UJbsc07' }
            ]
        },
        { 
            image: '/assets/images/shop/beanie.avif', 
            title: 'Club Beanie', 
            price: '$8.00', 
            description: 'Keep the noggin warm during those cool winter training sessions with a CTC Fleece beanie.',
            link: 'https://buy.stripe.com/test_6oUaEXafRdage3M62Rbsc05' 
        },
        { 
            image: '/assets/images/shop/swim.avif', 
            title: 'Swimwear', 
            price: '$42.00', 
            description: 'High quality, comfortable swimwear perfect for training and racing.',
            sizes: [
                { name: 'Womens - XXL', link: 'https://buy.stripe.com/test_9B614n1Jl3zG0cWfDrbsc02' },
                { name: 'Womens - XXXL', link: 'https://buy.stripe.com/test_28EaEXds3fio6Bk4YNbsc03' }
            ]
        },
        { 
            image: '/assets/images/shop/towel-front.avif', 
            images: [
                '/assets/images/shop/towel-front.avif',
                '/assets/images/shop/towel-back.avif',
                '/assets/images/shop/towel-side.avif'
            ],
            title: 'Hooded Towel', 
            price: '$52.00', 
            description: 'No more embarrassing, awkward changes at the beach car park or the pool change room. Take your hooded towel to the gym, swim club, sport carnivals, water park and even camping. Ideal for all occasions.',
            link: 'https://buy.stripe.com/test_5kQ3cvafR1ry8Js9f3bsc04' 
        },
    ];
    
    buildShopSlider();
    updateShopSlider();
}

function getItemsPerSlide() {
    const width = window.innerWidth;
    if (width < 480) return 2;   // 1x2 grid on mobile
    if (width < 768) return 4;   // 2x2 grid on small tablets
    if (width < 1200) return 6;  // 3x2 grid on tablets
    return 8;                     // 4x2 grid on desktop
}

function buildShopSlider() {
    const slider = document.getElementById('shopSlider');
    const dotsContainer = document.getElementById('shopSliderDots');
    const itemsPerSlide = getItemsPerSlide();
    
    shopTotalSlides = Math.ceil(shopProducts.length / itemsPerSlide);
    shopCurrentSlide = 0;
    
    slider.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Create slides
    for (let i = 0; i < shopTotalSlides; i++) {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'home-shop-slide';
        
        const startIdx = i * itemsPerSlide;
        const endIdx = Math.min(startIdx + itemsPerSlide, shopProducts.length);
        
        for (let j = startIdx; j < endIdx; j++) {
            const product = shopProducts[j];
            const itemDiv = document.createElement('div');
            itemDiv.className = 'home-shop-item';
            
            // Check if product has sizes or direct link
            let buttonHTML = '';
            if (product.sizes) {
                // Product with size options
                const selectId = `product-size-${j}`;
buttonHTML = `
    <select id="${selectId}" class="product-size-select" onchange="toggleBuyButton('${selectId}')">
        <option value="">Select Size</option>
        ${product.sizes.map(size => `<option value="${size.link}">${size.name}</option>`).join('')}
    </select>
    <button id="buyBtn-${selectId}" class="btn home-shop-button" onclick="buyProductWithSize('${selectId}')" disabled>Buy Now</button>
`;
            } else {
                // Product with direct link
                buttonHTML = `
                <div class="product-no-size-spacer"></div>
                <button class="btn home-shop-button" onclick="window.open('${product.link}', '_blank')">Buy Now</button>`;
            }
            
            itemDiv.innerHTML = `
                <div onclick="openProductModal(${j})">
                <div class="home-shop-item-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                </div>
                ${buttonHTML}
            `;
            
            slideDiv.appendChild(itemDiv);
        }
        
        slider.appendChild(slideDiv);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = 'shop-slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => shopGoToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function toggleBuyButton(selectId) {
    const select = document.getElementById(selectId);
    const buyButton = document.getElementById(`buyBtn-${selectId}`);
    buyButton.disabled = !select.value;
}

// Modal Functions
function openProductModal(productIndex) {
    const product = shopProducts[productIndex];
    const modal = document.getElementById('productModal');
    
    // Set product info
    document.getElementById('productModalTitle').textContent = product.title;
    document.getElementById('productModalPrice').textContent = product.price;
    document.getElementById('productModalDescription').textContent = product.description || 'No description available.';
    
    // Set images
    currentProductImages = product.images || [product.image];
    currentProductImageIndex = 0;
    
    const imagesContainer = document.getElementById('productModalImages');
    imagesContainer.innerHTML = currentProductImages.map(img => `
        <div class="product-modal-image">
            <img src="${img}" alt="${product.title}">
        </div>
    `).join('');
    
    updateProductModalSlider();

    const prevBtn = document.querySelector('.product-modal-slider-btn.prev');
    const nextBtn = document.querySelector('.product-modal-slider-btn.next');
    
    if (currentProductImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
    
    // Set size selector or buy button
    const sizeContainer = document.getElementById('productModalSizeContainer');
    const buttonContainer = document.getElementById('productModalButton');
    
    if (product.sizes) {
        const selectId = 'productModalSize';
        // sizeContainer.innerHTML = `
        //     <select id="${selectId}" class="product-modal-size-select">
        //         <option value="">Select Size</option>
        //         ${product.sizes.map(size => `<option value="${size.link}">${size.name}</option>`).join('')}
        //     </select>
        // `;
        // buttonContainer.innerHTML = `<button class="btn" onclick="buyProductWithSize('${selectId}')">Buy Now</button>`;


        sizeContainer.innerHTML = `
            <select id="${selectId}" class="product-modal-size-select" onchange="toggleBuyButton('${selectId}')">
        <option value="">Select Size</option>
        ${product.sizes.map(size => `<option value="${size.link}">${size.name}</option>`).join('')}
    </select>
        `;
        buttonContainer.innerHTML = `
    <button id="buyBtn-${selectId}" class="btn home-shop-button" onclick="buyProductWithSize('${selectId}')" disabled>Buy Now</button>
`;
    } else {
        sizeContainer.innerHTML = '<div class="product-no-size-spacer"></div>';
        buttonContainer.innerHTML = `<button class="btn home-shop-button" onclick="window.open('${product.link}', '_blank')">Buy Now</button>`;
    }
    
    // Show modal
  //  modal.style.display = 'flex';
    // document.body.style.overflow = 'hidden'; // Prevent background scrolling
      modal.style.display = 'block';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    //document.body.style.overflow = 'auto';
}

function updateProductModalSlider() {
    const imagesContainer = document.getElementById('productModalImages');
    imagesContainer.style.transform = `translateX(-${currentProductImageIndex * 100}%)`;
}

function prevProductImage() {
    currentProductImageIndex = (currentProductImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
    updateProductModalSlider();
}

function nextProductImage() {
    currentProductImageIndex = (currentProductImageIndex + 1) % currentProductImages.length;
    updateProductModalSlider();
}
// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Function to handle size-based purchases
function buyProductWithSize(selectId) {
    const select = document.getElementById(selectId);
    const url = select.value;
    
    if (!url) {
        alert('Please select a size');
        return;
    }
    
    window.open(url, '_blank');
}

function updateShopSlider() {
    const slider = document.getElementById('shopSlider');
    slider.style.transform = `translateX(-${shopCurrentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.shop-slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === shopCurrentSlide);
    });
}

function shopSliderNext() {
    shopCurrentSlide = (shopCurrentSlide + 1) % shopTotalSlides;
    updateShopSlider();
}

function shopSliderPrev() {
    shopCurrentSlide = (shopCurrentSlide - 1 + shopTotalSlides) % shopTotalSlides;
    updateShopSlider();
}

function shopGoToSlide(index) {
    shopCurrentSlide = index;
    updateShopSlider();
}

// Rebuild slider on resize
let shopResizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(shopResizeTimeout);
    shopResizeTimeout = setTimeout(() => {
        const newItemsPerSlide = getItemsPerSlide();
        const oldItemsPerSlide = Math.ceil(shopProducts.length / shopTotalSlides);
        
        if (newItemsPerSlide !== oldItemsPerSlide) {
            buildShopSlider();
            updateShopSlider();
        }
    }, 250);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initShopSlider);