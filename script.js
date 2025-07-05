const products = [
  {
    img: "PH1.jpg",
    name: "White Office Chair",
    price: "N$850",
    condition: "Well-Maintained"
  },
  {
    img: "PH2.jpg",
    name: "32L Samsung Microwave",
    price: "N$950",
    condition: "Trendsetter"
  },
  {
    img: ["PH3a.jpg", "PH3b.jpg", "PH3c.jpg"],
    name: "Electrical Frying Pan",
    price: "N$450",
    condition: "Well-Maintained"
  },
  {
    img: "PH4.jpg",
    name: "Traditional Pot #3",
    price: "N$350",
    condition: "Well-Maintained"
  },
  {
    img: "PH5.jpg",
    name: "Traditional Pot #2",
    price: "N$250",
    condition: "Well-Maintained"
  },
  {
    img: ["PH6a.jpg", "PH6b.jpg", "PH6c.jpg"],
    name: "32L Samsung Microwave",
    price: "N$1,250",
    condition: "Trendsetter"
  },
  {
    img: "PH7.jpg",
    name: "Office Chair #3",
    price: "N$750",
    condition: "Well-Maintained"
  },
  {
    img: "PH8.jpg",
    name: "Office Chair #1",
    price: "N$650",
    condition: "Well-Maintained"
  },
  {
    img: "PH9.jpg",
    name: "Kitchen Sink",
    price: "N$1,250",
    condition: "Well-Maintained"
  },
  {
    img: ["PH10a.jpg", "PH10b.jpg"],
    name: "Event Tables",
    price: "N$2,700",
    condition: "Well-Maintained"
  },
  {
    img: ["PH11a.jpg", "PH11b.jpg"],
    name: "Assorted Fabric",
    price: "N$20 per meter",
    condition: "Various Colors"
  },
  {
    img: "PH12.jpg",
    name: "Mirror #1",
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

    const img = document.createElement('img');
    img.src = src;
    img.alt = product.name;

    slide.appendChild(img);
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
    slidesPerView: 1
  });
});
