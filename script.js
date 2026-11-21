const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav'); 

burger.addEventListener('click', function() {
    nav.classList.toggle('nav-open');

    const isOpen = nav.classList.contains('nav-open');
    burger.setAttribute('aria-expanded', isOpen);
});

const pizzas = [
    {
        id: 1,
        name: 'Маргарита',
        description: 'Томатный соус, моцарелла, базилик',
        price: 2500,
       image: 'https://images.pexels.com/photos/31450849/pexels-photo-31450849.jpeg'
    },
    {
        id: 2,
        name: 'Пепперони',
        description: 'Пепперони, моцарелла, томатный соус',
        price: 2900,
        image: 'https://images.pexels.com/photos/6488932/pexels-photo-6488932.jpeg'
    },
    {
        id: 3,
        name: 'Сырная',
        description: 'Моцарелла, чеддер, пармезан',
        price: 2800,
       image: 'https://images.pexels.com/photos/33592983/pexels-photo-33592983.jpeg'
    }
];
const pizzaGrid = document.querySelector('.pizza-grid');

const cartCount = document.querySelector('#cart-count');
let cart = JSON.parse(localStorage.getItem('pizzaCart') || '[]');

let count = cart.reduce(function(sum, item) {
    return sum + item.quantity;
}, 0);

cartCount.textContent = count;
pizzas.forEach(function(pizza) {
    const card = document.createElement('article');
    card.classList.add('pizza-card');

    card.innerHTML = `
   <img src="${pizza.image}" alt="${pizza.name}" onerror="this.onerror=null; this.src='pizza-fallback.png'">
    <div class="pizza-info">
        <h3>${pizza.name} <span>0${pizza.id}</span></h3>
        <p>${pizza.description}</p>

        <div class="pizza-bottom">
            <strong>${pizza.price.toLocaleString('ru-RU')} ₸</strong>
            <button type="button">Выбрать +</button>
        </div>
    </div>
`;

    pizzaGrid.appendChild(card);
    const addButton = card.querySelector('button');

addButton.addEventListener('click', function() {
    const item = cart.find(function(element) {
        return element.id === pizza.id;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: pizza.id,
            quantity: 1
        });
    }

    count++;
    cartCount.textContent = count;

    console.log(cart);
});
});
const cartButton = document.querySelector('.cart-button');
const cartModal = document.querySelector('#cart-modal');
const closeCart = document.querySelector('#close-cart');

cartButton.addEventListener('click', function() {
    renderCart();
    cartModal.hidden = false;
});

closeCart.addEventListener('click', function() {
    cartModal.hidden = true;
});
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');

function renderCart() {
    saveCart();
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.textContent = 'Корзина пуста';
        cartTotal.textContent = '0 ₸';
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        const pizza = pizzas.find(function(p) {
            return p.id === item.id;
        });

        total += pizza.price * item.quantity;

       const row = document.createElement('div');

row.innerHTML = `
    <span>${pizza.name} — ${pizza.price * item.quantity} ₸</span>
    <button class="minus-button" type="button">−</button>
    <span>${item.quantity} шт.</span>
    <button class="plus-button" type="button">+</button>
`;

cartItems.appendChild(row);
const plusButton = row.querySelector('.plus-button');
const minusButton = row.querySelector('.minus-button');

plusButton.addEventListener('click', function() {
    item.quantity++;
    count++;
    cartCount.textContent = count;
    renderCart();
});

minusButton.addEventListener('click', function() {
    item.quantity--;
    count--;

    if (item.quantity === 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }

    cartCount.textContent = count;
    renderCart();
});
    });

    cartTotal.textContent = total.toLocaleString('ru-RU') + ' ₸';
}
    const clearCartButton = document.querySelector('#clear-cart');

clearCartButton.addEventListener('click', function() {
    cart.length = 0;
    count = 0;
    cartCount.textContent = count;
    renderCart();
});
function saveCart() {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
}
const checkoutButton = document.querySelector('#checkout-button');
const orderForm = document.querySelector('#order-form');

checkoutButton.addEventListener('click', function() {
    orderForm.hidden = false;
});
orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#customer-name').value.trim();
    const phone = document.querySelector('#customer-phone').value.trim();

    if (name === '' || phone === '') {
        alert('Заполните имя и телефон!');
        return;
    }

    if (cart.length === 0) {
        alert('Сначала добавьте пиццу в корзину!');
        return;
    }

    alert('Спасибо, ' + name + '! Ваш заказ оформлен!');

    cart.length = 0;
    count = 0;
    cartCount.textContent = count;

    renderCart();
    orderForm.reset();
    orderForm.hidden = true;
    cartModal.hidden = true;
});