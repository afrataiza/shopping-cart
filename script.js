function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
 const item = event.target;
 const ol = document.querySelector('.cart__items');
 ol.removeChild(item);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function displayCartItems(item) {
  const { id, title, price } = await fetchItem(item);
  const ol = document.querySelector('.cart__items');
  ol.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  return ol;
}

async function displayproducts(query) {
  const { results } = await fetchProducts(query);
  const section = document.querySelector('.items');
  results.forEach((product) => {
  const { id, title, thumbnail } = product;
  section.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
});
section.addEventListener('click', async (element) => {
  if (element.target.className === 'item__add') {
    const item = element.target.parentElement;
    const id = getSkuFromProductItem(item)
    displayCartItems(id);
  }
});
}

function emptyCart() {
  const ol = document.querySelector('.cart__items');
  ol.innerHTML = '';
}

window.onload = async () => { 
  displayproducts('computador');
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', emptyCart);
};
