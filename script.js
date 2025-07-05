const products = [
  { 
    img: ["PH6.jpg", "PH6b.jpg", "PH6c.jpg"], 
    name: "32L Samsung Microwave", 
    price: "N$1,250", 
    condition: "Trendsetter" 
  },
  { 
    img: "PH10a.jpg", 
    name: "Office Chair #3", 
    price: "N$750", 
    condition: "Well-Maintained" 
  },
  { 
    img: "PH1.jpg", 
    name: "Office Chair #1", 
    price: "N$650", 
    condition: "Well-Maintained" 
  },
  { 
    img: "PH10b.jpg", 
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

