const products = [
  {
    images: ["PH1.jpg"],
    name: "White Office Chair",
    price: "N$850",
    condition: "Excellent Condition"
  },
  {
    images: ["PH2.jpg"],
    name: "32L Samsung Microwave",
    price: "N$950",
    condition: "Pre-Loved"
  },
  {
    images: ["PH3a.jpg", "PH3b.jpg", "PH3c.jpg"],
    name: "Electrical Frying Pan",
    price: "N$450",
    condition: "Pre-Loved"
  },
  {
    images: ["PH4.jpg"],
    name: "Traditional Pot #3",
    price: "N$350",
    condition: "Showroom Quality"
  },
  {
    images: ["PH5.jpg"],
    name: "Traditional Pot #2",
    price: "N$250",
    condition: "Showroom Quality"
  },
  {
    images: ["PH6a.jpg", "PH6b.jpg", "PH6c.jpg"],
    name: "32L Samsung Microwave",
    price: "N$1,250",
    condition: "Trendsetter"
  },
  {
    images: ["PH7.jpg"],
    name: "Office Chair #3",
    price: "N$750",
    condition: "Well-Maintained"
  },
  {
    images: ["PH8.jpg"],
    name: "Office Chair #1",
    price: "N$650",
    condition: "Well-Maintained"
  },
  {
    images: ["PH9.jpg"],
    name: "Kitchen Sink",
    price: "N$1,250",
    condition: "Well-Maintained"
  },
  {
    images: ["PH10a.jpg", "PH10b.jpg"],
    name: "Event Tables",
    price: "N$2,700",
    condition: "Excellent Condition"
  },
  {
    images: ["PH11a.jpg", "PH11b.jpg", "PH11c.jpg", "PH11d.jpg", "PH11e.jpg"],
    name: "Assorted Fabric",
    price: "N$20 per meter",
    condition: "Excellent Condition"
  },
  {
    images: ["PH12.jpg"],
    name: "Mirror #1",
    price: "N$1,250",
    condition: "Excellent Condition"
  },
  {
    images: ["PH14.jpg"],
    name: "Electrical Cable",
    price: "N$50",
    condition: "New"
  }
];

// Render products
document.querySelector(".product-grid").innerHTML = products.map((product, i) => `
  <div class="product-card" id="item${i + 1}">
    <div class="image-wrapper" style="position: relative;">
      <img src="${product.images[0]}" alt="${product.name}" onclick="openLightbox(${i}, 0)" />
      ${
        product.images.length > 1
          ? `<div class="image-dots" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
               ${product.images.map((_, dotIndex) => `
                 <div style="width: 8px; height: 8px; background: #999; border-radius: 50%; opacity: 0.7;"></div>
               `).join('')}
             </div>`
          : ''
      }
    </div>
    <h4>${product.name}</h4>
    <p class="price">${product.price}</p>
    <span class="condition faded-badge">${product.condition}</span>
    <p class="status">In Stock</p>
    <div class="like-section">
      <i class="fas fa-heart" onclick="toggleLike(this)"></i> <span class="like-count">0</span>
    </div>
    <a href="https://wa.me/264817859603" target="_blank" class="whatsapp-button">
      <i class="fab fa-whatsapp"></i> WhatsApp Seller
    </a>
  </div>
`).join('');

// Lightbox Logic
let currentProductIndex = 0;
let currentImageIndex = 0;

function openLightbox(productIndex, imageIndex) {
  currentProductIndex = productIndex;
  currentImageIndex = imageIndex;
  updateLightbox();
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function updateLightbox() {
  const img = document.getElementById("lightboxImage");
  const dotsContainer = document.getElementById("lightboxDots");
  const images = products[currentProductIndex].images;

  img.src = images[currentImageIndex];
  dotsContainer.innerHTML = images.map((_, i) => `
    <div class="${i === currentImageIndex ? 'active' : ''}" onclick="goToImage(${i})"></div>
  `).join('');
}

function goToImage(i) {
  currentImageIndex = i;
  updateLightbox();
}

// Like button logic
function toggleLike(icon) {
  const count = icon.nextElementSibling;
  let number = parseInt(count.textContent);
  icon.classList.toggle('liked');
  count.textContent = icon.classList.contains('liked') ? number + 1 : number - 1;
}

// Swipe Support for Lightbox
let startX = 0;
const img = document.getElementById("lightboxImage");

img.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

img.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const delta = endX - startX;
  const images = products[currentProductIndex].images;

  if (delta > 50 && currentImageIndex > 0) {
    currentImageIndex--;
    updateLightbox();
  } else if (delta < -50 && currentImageIndex < images.length - 1) {
    currentImageIndex++;
    updateLightbox();
  }
});
