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
    images: ["PH10a.jpg", "PH10b.jpg", "PH10c.jpg"],
    name: "Event Tables Combo:Kickstart your dream business today;Was:3550 for both tables",
    price: "Now only: N$2,900",
    condition: "Pre-Loved"
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

// Render products with image dots, like button, WhatsApp button
const productContainer = document.querySelector(".product-grid");

function renderProducts() {
  productContainer.innerHTML = products.map((product, i) => `
    <div class="product-card" id="item${i + 1}">
      <div class="image-wrapper" style="position: relative;">
        <img src="${product.images[0]}" alt="${product.name}" onclick="openLightbox(${i}, 0)" />
        ${
          product.images.length > 1
            ? `<div class="image-dots" style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
                 ${product.images.map((_, dotIndex) => `<div style="width: 8px; height: 8px; background: #999; border-radius: 50%; opacity: 0.7;"></div>`).join('')}
               </div>`
            : ''
        }
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

// Lightbox Logic
let currentProductIndex = 0;
let currentImageIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxDots = document.getElementById("lightboxDots");

// Open lightbox and show image at imageIndex
function openLightbox(productIndex, imageIndex) {
  currentProductIndex = productIndex;
  currentImageIndex = imageIndex;
  updateLightbox();
  lightbox.style.display = "flex";
  // Reset swipe tracking
  startY = null;
  startX = null;
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = "none";
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

// Like button logic with burst hearts and text "I 💖 this 😎"
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

// Initialize like buttons from localStorage on load
function initLikes() {
  const likeIcons = document.querySelectorAll('.fa-heart');
  likeIcons.forEach((icon, idx) => {
    if(localStorage.getItem(`liked_${idx}`) === 'true') {
      icon.classList.add('liked');
    }
  });
}

// Burst hearts animation
function createBurstHearts(targetIcon) {
  for(let i=0; i<6; i++) {
    const heart = document.createElement('div');
    heart.classList.add('burst-heart');
    // random directions for burst
    heart.style.setProperty('--x', (Math.random() * 2 - 1).toFixed(2));
    heart.style.setProperty('--y', (Math.random() * 2 - 1).toFixed(2));
    // Position near icon
    const rect = targetIcon.getBoundingClientRect();
    heart.style.position = 'fixed';
    heart.style.left = `${rect.left + rect.width/2}px`;
    heart.style.top = `${rect.top + rect.height/2}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 800);
  }
}

// Show temporary "I 💖 this 😎" text near icon
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

  setTimeout(() => {
    loveText.remove();
  }, 1500);
}

// WhatsApp message function
function sendWhatsappMessage(e, productIndex) {
  e.preventDefault();
  const productName = products[productIndex].name;
  const message = encodeURIComponent(`Hello, I am interested in your product: "${productName}". Please provide more details.`);
  const whatsappNumber = "+264817859603"; // Your WhatsApp number
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(url, "_blank");
}

// Lightbox swipe down to close logic
let startY = null;
let startX = null;

lightbox.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchmove', e => {
  if(!startY) return;

  let y = e.touches[0].clientY;
  let x = e.touches[0].clientX;
  let yDiff = y - startY;
  let xDiff = x - startX;

  // If mostly vertical swipe down by 50+ pixels -> close
  if(yDiff > 50 && Math.abs(yDiff) > Math.abs(xDiff)) {
    closeLightbox();
    startY = null;
  }
});

// Initialize likes on page load
window.onload = () => {
  initLikes();
};
