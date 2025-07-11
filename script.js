const products = [/* same array as before, unchanged */];

const productContainer = document.querySelector(".product-grid");

function renderProducts() {
  productContainer.innerHTML = products.map((product, i) => `
    <div class="product-card" id="item${i + 1}">
      <div class="image-wrapper" style="position: relative;">
        <img src="${product.images[0]}" alt="${product.name}" onclick="openLightbox(${i}, 0)" />
        ${product.images.length > 1
          ? `<div class="image-dots" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
               ${product.images.map(() => `<div style="width: 8px; height: 8px; background: #999; border-radius: 50%; opacity: 0.7;"></div>`).join('')}
             </div>`
          : ''}
      </div>
      <h4>${product.name}</h4>
      <p class="price">${product.price}</p>
      <span class="condition faded-badge">${product.condition}</span>
      <p class="status">In Stock</p>
      <div class="like-section">
        <i class="fas fa-heart" onclick="toggleLike(this, ${i})"></i>
      </div>
      <a href="#" class="whatsapp-button" onclick="sendWhatsappMessage(event, ${i})">
        <i class="fab fa-whatsapp"></i> WhatsApp Seller
      </a>
    </div>
  `).join('');
}

renderProducts();

let currentProductIndex = 0;
let currentImageIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxDots = document.getElementById("lightboxDots");

function openLightbox(productIndex, imageIndex) {
  currentProductIndex = productIndex;
  currentImageIndex = imageIndex;
  updateLightbox();
  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden";
  startY = null;
  startX = null;
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "";

  const productCard = document.getElementById(`item${currentProductIndex + 1}`);
  if (productCard) {
    productCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function updateLightbox() {
  const images = products[currentProductIndex].images;
  lightboxImage.src = images[currentImageIndex];
  lightboxDots.innerHTML = images.map((_, i) => `
    <div class="${i === currentImageIndex ? 'active' : ''}" onclick="goToImage(${i})"></div>
  `).join('');
}

function goToImage(i) {
  currentImageIndex = i;
  updateLightbox();
}

function toggleLike(icon, productIndex) {
  const likedKey = `liked_${productIndex}`;
  const isLiked = localStorage.getItem(likedKey) === 'true';

  if (isLiked) {
    localStorage.removeItem(likedKey);
    icon.classList.remove('liked');
  } else {
    localStorage.setItem(likedKey, 'true');
    icon.classList.add('liked');
    createBurstHearts(icon);
    showLoveText(icon);
  }
}

function initLikes() {
  const likeIcons = document.querySelectorAll('.fa-heart');
  likeIcons.forEach((icon, idx) => {
    if (localStorage.getItem(`liked_${idx}`) === 'true') {
      icon.classList.add('liked');
    }
  });
}

function createBurstHearts(targetIcon) {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('div');
    heart.classList.add('burst-heart');
    heart.style.setProperty('--x', (Math.random() * 2 - 1).toFixed(2));
    heart.style.setProperty('--y', (Math.random() * 2 - 1).toFixed(2));

    const rect = targetIcon.getBoundingClientRect();
    heart.style.position = 'fixed';
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 800);
  }
}

function showLoveText(targetIcon) {
  const loveText = document.createElement('div');
  loveText.textContent = "I 💖 this 😎";
  loveText.style.position = 'fixed';
  loveText.style.color = 'red';
  loveText.style.fontWeight = 'bold';
  loveText.style.fontSize = '14px';
  loveText.style.left = `${targetIcon.getBoundingClientRect().left}px`;
  loveText.style.top = `${targetIcon.getBoundingClientRect().top - 20}px`;
  loveText.style.userSelect = 'none';
  document.body.appendChild(loveText);

  setTimeout(() => loveText.remove(), 1500);
}

function sendWhatsappMessage(e, productIndex) {
  e.preventDefault();
  const productName = products[productIndex].name;
  const message = encodeURIComponent(`Hello Tippz, I am interested in your product: "${productName}". Please provide more details.`);
  const whatsappNumber = "+264817859603";
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}

// Swipe detection
let startY = null;
let startX = null;

lightbox.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchmove', e => {
  if (!startY) return;
  const y = e.touches[0].clientY;
  const x = e.touches[0].clientX;
  const yDiff = y - startY;
  const xDiff = x - startX;

  if (yDiff > 50 && Math.abs(yDiff) > Math.abs(xDiff)) {
    closeLightbox();
    startY = null;
  }
});

window.onload = () => {
  initLikes();
};
