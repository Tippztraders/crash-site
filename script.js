const products = [
  {
    images: ['PH10a.jpg', 'PH10b.jpg', 'PH10c.jpg'],
    name: 'Product 1',
    desc: 'Short description for product 1.',
    price: '$29.99'
  },
  {
    images: ['PH3a.jpg', 'PH3b.jpg', 'PH3c.jpg'],
    name: 'Product 2',
    desc: 'Short description for product 2.',
    price: '$39.99'
  }
  // Add more products here
];

const container = document.getElementById('product-container');

products.forEach((product, index) => {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';

  const swiperId = `swiper-${index}`;

  const imagesHTML = product.images.map((src, i) => `
    <div class="swiper-slide">
      <div class="swiper-zoom-container">
        <img src="${src}" alt="${product.name}" onclick="openFullGallery(${index}, ${i})" />
      </div>
    </div>
  `).join('');

  productCard.innerHTML = `
    <div class="swiper product-swiper" id="${swiperId}">
      <div class="swiper-wrapper">
        ${imagesHTML}
      </div>
    </div>
    <h2>${product.name}</h2>
    <p class="description">${product.desc}</p>
    <p class="price">${product.price}</p>
    <button>Add to Cart</button>
  `;

  container.appendChild(productCard);
});

// Activate all Swipers
window.addEventListener('load', () => {
  document.querySelectorAll('.product-swiper').forEach(swiperEl => {
    new Swiper(swiperEl, {
      zoom: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10
    });
  });
});

let fullGallerySwiper = null;

function openFullGallery(productIndex, startAt = 0) {
  const product = products[productIndex];
  const wrapper = document.getElementById('fullGalleryWrapper');
  wrapper.innerHTML = product.images.map(src => `
    <div class="swiper-slide">
      <div class="swiper-zoom-container">
        <img src="${src}" alt="Full Image" />
      </div>
    </div>
  `).join('');

  document.getElementById('fullGalleryModal').classList.add('active');

  if (fullGallerySwiper) {
    fullGallerySwiper.destroy(true, true);
  }

  fullGallerySwiper = new Swiper('#fullGallerySwiper', {
    zoom: true,
    loop: true,
    slidesPerView: 1,
    initialSlide: startAt,
    spaceBetween: 10
  });
}

function closeFullGallery() {
  document.getElementById('fullGalleryModal').classList.remove('active');
  if (fullGallerySwiper) {
    fullGallerySwiper.destroy(true, true);
    fullGallerySwiper = null;
  }
}
