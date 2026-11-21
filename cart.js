
let cart = JSON.parse(localStorage.getItem('pizzaCart') || '[]');

function saveCart() {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
}

function addToCart(pizzaId, size) {
    const item = cart.find(function(element) {
        return element.id === pizzaId && (element.size || 25) === size;
    });

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            id: pizzaId,
            size: size,
            quantity: 1
        });
    }

    saveCart();
}

function getCartCount() {
    return cart.reduce(function(sum, item) {
        return sum + item.quantity;
    }, 0);
}

function renderCart() {
    const cartItems = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');

    cartItems.innerHTML = '';

    if (cart.length === 0) {
    cartItems.textContent = 'Корзина пуста';
    cartTotal.textContent = '0 ₸';

    const mainCount = document.querySelector('#cart-count');
    const detailCount = document.querySelector('#detail-cart-count');

    if (mainCount) mainCount.textContent = '0';
    if (detailCount) detailCount.textContent = '0';

    return;
}

    let total = 0;

    cart.forEach(function(item) {
        const pizza = pizzas.find(function(p) {
            return p.id === item.id;
        });

        if (!pizza) return;

        const size = item.size || 25;
        const itemPrice = pizza.price + (size - 25) * 100;
        total += itemPrice * item.quantity;

        const row = document.createElement('div');

        row.innerHTML = `
            <span>${pizza.name} ${size} см — ${(itemPrice * item.quantity).toLocaleString('ru-RU')} ₸</span>
            <button class="minus-button" type="button">−</button>
            <span>${item.quantity} шт.</span>
            <button class="plus-button" type="button">+</button>
        `;

        cartItems.appendChild(row);

        row.querySelector('.plus-button').addEventListener('click', function() {
            item.quantity++;
            saveCart();
            renderCart();
        });

        row.querySelector('.minus-button').addEventListener('click', function() {
            item.quantity--;

            if (item.quantity <= 0) {
                cart.splice(cart.indexOf(item), 1);
            }

            saveCart();
            renderCart();
        });
    });

    cartTotal.textContent = total.toLocaleString('ru-RU') + ' ₸';

    const mainCount = document.querySelector('#cart-count');
    const detailCount = document.querySelector('#detail-cart-count');

    if (mainCount) mainCount.textContent = getCartCount();
    if (detailCount) detailCount.textContent = getCartCount();
}

const clearCartButton = document.querySelector('#clear-cart');
const checkoutButton = document.querySelector('#checkout-button');
const orderForm = document.querySelector('#order-form');

clearCartButton.addEventListener('click', function() {
    cart.length = 0;
    saveCart();
    renderCart();
});

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
    saveCart();
    renderCart();

    orderForm.reset();
    orderForm.hidden = true;
    document.querySelector('#cart-modal').hidden = true;
});
