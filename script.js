const products = [
  { 
    img: ["PH 6.jpg", "PH 6b.jpg", "PH 6c.jpg"], 
    name: "32L Samsung Microwave", 
    price: "N$1,250", 
    condition: "Trendsetter" 
  },
  { 
    img: "PH 7.jpg", 
    name: "Office Chair #3", 
    price: "N$750", 
    condition: "Well-Maintained" 
  },
  { 
    img: "PH 8.jpg", 
    name: "Office Chair #1", 
    price: "N$650", 
    condition: "Well-Maintained" 
  },
  { 
    img: "PH 9.jpg", 
    name: "Kitchen Sink", 
    price: "N$1,250", 
    condition: "Well-Maintained" 
  }
];

const container = document.getElementById('products-container');

products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'product-card';

  // Create image area
  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';

  if (Array.isArray(product.img)) {
    product.img.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'product-img';
      imgContainer.appendChild(img);
    });
  } else {
    const img = document.createElement('img');
    img.src = product.img;
    img.className = 'product-img';
    imgContainer.appendChild(img);
  }

  // Create text info
  const info = document.createElement('div');
  info.innerHTML = `
    <h3>${product.name}</h3>
    <p>Price: ${product.price}</p>
    <p>Condition: ${product.condition}</p>
  `;

  card.appendChild(imgContainer);
  card.appendChild(info);
  container.appendChild(card);
});

