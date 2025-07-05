const products = [
  { 
    img: ["PH6.jpg", "PH6b.jpg", "PH6c.jpg"], 
    name: "32L Samsung Microwave", 
    price: "N$1,250", 
    condition: "Trendsetter" 
  },
  { 
    img: ["PH3a.jpg", "PH3b.jpg", "PH3c.jpg"], 
    name: "Office Chair #3", 
    price: "N$750", 
    condition: "Well-Maintained" 
  },
  { 
    img: "PH10a.jpg", 
    name: "Office Chair #1", 
    price: "N$650", 
    condition: "Well-Maintained" 
  },
  { 
    img: "PH3a.jpg", 
    name: "Kitchen Sink", 
    price: "N$1,250", 
    condition: "Well-Maintained" 
  }
];

const container = document.getElementById('products-container');

products.forEach((product, index) => {
  const card = document.createElement('div');
  card.className = 'product-card';

  // Swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.className = `swiper mySwiper swiper-${index}`;

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  const images = Array.isArray(product.img) ? product.img : [product.img];
  images.forEach(src => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const zoomContainer = document.createElement('div');
    zoomContainer.className = 'swiper-zoom-container';

    const img = document.createElement('img');
    img.src = src;
    img.alt = product.name;
    img.loading = 'lazy'; // lazy load image

    zoomContainer.appendChild(img);
    slide.appendChild(zoomContainer);
    swiperWrapper.appendChild(slide);
  });

  swiperContainer.appendChild(swiperWrapper);
  card.appendChild(swiperContainer);

  // Product Info
  const info = document.createElement('div');
  info.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: ${product.price}</p>
    <p>Condition: ${product.condition}</p>
  `;
  card.appendChild(info);

  container.appendChild(card);

  // Init Swiper
  new Swiper(`.swiper-${index}`, {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    zoom: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });
});
