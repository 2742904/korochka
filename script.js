const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav'); 

burger.addEventListener('click', function() {
    nav.classList.toggle('nav-open');

    const isOpen = nav.classList.contains('nav-open');
    burger.setAttribute('aria-expanded', isOpen);
});
const navLinks = nav.querySelectorAll('a');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        nav.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
    });
});

const pizzaGrid = document.querySelector('.pizza-grid');
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const category = button.dataset.category;

        filterButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        document.querySelectorAll('.pizza-card').forEach(function(card) {
            const pizzaId = Number(card.dataset.id);
            const pizza = pizzas.find(function(p) {
                return p.id === pizzaId;
            });

            card.hidden = category !== 'all' && !pizza.categories.includes(category);
        });
    });
});
const cartCount = document.querySelector('#cart-count');

let count = getCartCount();

cartCount.textContent = count;
pizzas.forEach(function(pizza) {
    const card = document.createElement('article');
    card.classList.add('pizza-card');
    card.dataset.id = pizza.id;

    card.innerHTML = `
   <a href="pizza.html?id=${pizza.id}" class="pizza-image-link">
    <img src="${pizza.image}" alt="${pizza.name}" onerror="this.onerror=null; this.src='pizza-fallback.png'">
</a>
    <div class="pizza-info">
        <h3>
    <a href="pizza.html?id=${pizza.id}">${pizza.name}</a>
    <span>0${pizza.id}</span>
</h3>
        <p>${pizza.description}</p>

<div class="pizza-sizes">
    <button type="button" class="size-button active" data-size="25">25 см</button>
    <button type="button" class="size-button" data-size="30">30 см</button>
    <button type="button" class="size-button" data-size="35">35 см</button>
</div>

        <div class="pizza-bottom">
            <strong>${pizza.price.toLocaleString('ru-RU')} ₸</strong>
            <button type="button">Выбрать +</button>
        </div>
    </div>
`;

    pizzaGrid.appendChild(card);
    let selectedSize = 25;

const sizeButtons = card.querySelectorAll('.size-button');
const priceElement = card.querySelector('.pizza-bottom strong');

sizeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        selectedSize = Number(button.dataset.size);

        sizeButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        const newPrice = pizza.price + (selectedSize - 25) * 100;
        priceElement.textContent = newPrice.toLocaleString('ru-RU') + ' ₸';
    });
});
    const addButton = card.querySelector('.pizza-bottom button');


addButton.addEventListener('click', function() {
    addToCart(pizza.id, selectedSize);
    count = getCartCount();
    cartCount.textContent = count;
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
    