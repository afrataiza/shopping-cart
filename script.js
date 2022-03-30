const cartList = document.querySelector('.cart__items');
let result = 0;
const totalPrice = document.querySelector('.total-price');
const sectionItems = document.querySelector('.items');

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
 cartList.removeChild(item);
 const price = parseFloat(item.innerText.split('$')[1]);
 result -= price;
 totalPrice.innerText = Math.abs(result).toFixed(1);
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
  cartList.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  result += price;
  totalPrice.innerText = result;
  return cartList;
}

async function displayproducts(query) {
  const { results } = await fetchProducts(query);
  results.forEach((product) => {
  const { id, title, thumbnail } = product;
  sectionItems.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
});
sectionItems.addEventListener('click', async (element) => {
  if (element.target.className === 'item__add') {
    const item = element.target.parentElement;
    const id = getSkuFromProductItem(item);
    displayCartItems(id);
  }
});
}

function emptyCart() {
  cartList.innerHTML = '';
  result = 0;
  totalPrice.innerText = result;
}

function addLoading(callback) {
    const span = document.createElement('span');
    span.className = 'loading';
    span.innerText = 'carregando...';
    sectionItems.appendChild(span);
    callback();
}

function removeLoading() {
  const span = document.querySelector('.loading');
  setTimeout(() => {
    sectionItems.removeChild(span);
    displayproducts('computador');
  }, 1000);
}
window.onload = async () => { 
  addLoading(removeLoading);
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', emptyCart);
};
