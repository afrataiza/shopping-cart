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
 const item = event.target.parentElement;
 cartList.removeChild(item);
 const list = cartList.innerHTML;
 saveCartItems(list);
 const price = parseFloat(item.lastChild.innerText.split('R$')[1].replace('.', '').replace(',', '.'));
 result -= price;
 totalPrice.innerText = result.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
 localStorage.total = totalPrice.innerText; 
}

function createCartItemElement({ image, salePrice }) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const remove = document.createElement('span');
  li.className = 'cart__item';
  remove.id = 'remove';
  img.src = image
  span.innerText = salePrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  remove.innerText = 'x';
  li.appendChild(remove);
  li.appendChild(img);
  li.appendChild(span);
  remove.addEventListener('click', cartItemClickListener);
  return li;
}

async function displayCartItems(item) {
  const { price, thumbnail } = await fetchItem(item);
  cartList.appendChild(createCartItemElement({ salePrice: price, image: thumbnail }));
  result += price;
  totalPrice.innerText = result.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
  const list = cartList.innerHTML;
  saveCartItems(list);
  localStorage.total = totalPrice.innerText; 
  return cartList;
}

function loadingCart() {
  if (localStorage.cartItems) {
    const list = getSavedCartItems();
    cartList.innerHTML = list;
    result = Number(localStorage.getItem('total').split('R$')[1].replace('.', '').replace(',', '.'));

    totalPrice.innerText = result.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
    const loadingList = document.querySelectorAll('ol');
    loadingList.forEach((li) => li.addEventListener('click', cartItemClickListener));
  }
}

function emptyCart() {
  cartList.innerHTML = '';
  result = 0;
  totalPrice.innerText = result.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
  localStorage.clear();
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
  loadingCart();
};
