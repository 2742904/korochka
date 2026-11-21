
const params = new URLSearchParams(window.location.search);
const pizzaId = Number(params.get('id'));

const pizza = pizzas.find(item => item.id === pizzaId);
const pizzaDetails = document.querySelector('#pizza-details');

if (pizza) {
    pizzaDetails.innerHTML = `
        <div class="pizza-detail">
            <img src="${pizza.image}" alt="${pizza.name}">
            <div class="pizza-detail-info">
                <h1>${pizza.name}</h1>
                <p>${pizza.description}</p>
                <p id="detail-weight">Вес: ${pizza.weight} г</p>
                <h2 id="detail-price">${pizza.price.toLocaleString('ru-RU')} ₸</h2>
                <div class="pizza-sizes">
    <button class="size-button active" data-size="25">25 см</button>
    <button class="size-button" data-size="30">30 см</button>
    <button class="size-button" data-size="35">35 см</button>
</div>

<button class="detail-add-button" type="button">В корзину +</button>
            </div>
        </div>
    `;
} else {
    pizzaDetails.innerHTML = '<h2>Пицца не найдена</h2>';
}

if (pizza) {
    const sizeButtons = document.querySelectorAll('.pizza-detail .size-button');
    const priceElement = document.querySelector('#detail-price');

    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedSize = Number(button.dataset.size);
            const newPrice = pizza.price + (selectedSize - 25) * 100;

            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            priceElement.textContent = `${newPrice.toLocaleString('ru-RU')} ₸`;
        });
    });
}
if (pizza) {
    const addButton = document.querySelector('.detail-add-button');

    addButton.addEventListener('click', function() {
        const activeSize = document.querySelector('.pizza-detail .size-button.active');
        const selectedSize = Number(activeSize.dataset.size);

        addToCart(pizza.id, selectedSize);
        detailCartCount.textContent = getCartCount();
        console.log('Корзина после добавления:', cart);
        console.log('Сохранено:', localStorage.getItem('pizzaCart'));

        addButton.textContent = 'Добавлено ✓';

        setTimeout(function() {
            addButton.textContent = 'В корзину +';
        }, 1200);
    });
}
const detailCartCount = document.querySelector('#detail-cart-count');

detailCartCount.textContent = getCartCount();
const detailCartButton = document.querySelector('#detail-cart-button');
const detailCartModal = document.querySelector('#cart-modal');
const detailCloseCart = document.querySelector('#close-cart');

detailCartButton.addEventListener('click', function() {
    renderCart();
    detailCartModal.hidden = false;
});

detailCloseCart.addEventListener('click', function() {
    detailCartModal.hidden = true;
});