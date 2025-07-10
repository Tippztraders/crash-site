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
               ${product.images.map(() => `<div style="width: 8px; height: 8px; background: #999; border-radius: 50%; opacity: 0.7;"></div>`).join('')}
             </div>`
          : ''
      }
    </div>
    <h4>${product.name}</h4>
    <p class="price">${product.price}</p>
    <span class="condition faded-badge">${product.condition}</span>
    <p class="status">In Stock</p>
    <div class="like-section">
      <i class="fas fa-heart" onclick="toggleLike(this, '${'item' + (i + 1)}')"></i>
      <span class="like-count">0</span>
    </div>
    <a href="#" onclick="sendWhatsApp(${i})" class="whatsapp-button">
      <i class="fab fa-whatsapp"></i> WhatsApp Seller
    </a>
  </div>
`).join('');

// Lightbox logic
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

// Swipe left/right + swipe down
let startX = 0;
let startY = 0;
const img = document.getElementById("lightboxImage");

img.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

img.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  const images = products[currentProductIndex].images;

  if (deltaX > 50 && currentImageIndex > 0) {
    currentImageIndex--;
    updateLightbox();
  } else if (deltaX < -50 && currentImageIndex < images.length - 1) {
    currentImageIndex++;
    updateLightbox();
  } else if (deltaY > 100) {
    closeLightbox();
  }
});

// Like logic + animation + localStorage
function toggleLike(icon, id) {
  const liked = icon.classList.contains("liked");
  const count = icon.nextElementSibling;
  let number = parseInt(count.textContent);

  if (!liked) {
    icon.classList.add("liked");
    count.textContent = number + 1;
    localStorage.setItem(id, 'liked');

    const burst = document.createElement('div');
    burst.className = 'burst-text';
    burst.textContent = "I 💖 this 😎";
    icon.parentElement.appendChild(burst);

    setTimeout(() => burst.remove(), 1500);
  } else {
    icon.classList.remove("liked");
    count.textContent = number > 0 ? number - 1 : 0;
    localStorage.removeItem(id);
  }
}

// Restore likes on page load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card').forEach(card => {
    const heart = card.querySelector('.fa-heart');
    const id = card.id;
    if (localStorage.getItem(id) === 'liked') {
      heart.classList.add('liked');
    }
  });
});

// WhatsApp Function
function sendWhatsApp(index) {
  const product = products[index];
  const message = `Hello Tippz, I am interested in this item: ${product.name} (${product.condition})`;
  const url = `https://wa.me/264817859603?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
