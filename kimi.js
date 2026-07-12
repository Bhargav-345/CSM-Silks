// Clear cart on every page reload 
localStorage.removeItem('scm_cart');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('scm_cart')) || [];

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('scm_cart', JSON.stringify(cart));
    updateCartCount();
}

const buyButtons = document.querySelectorAll('.buy');

buyButtons.forEach(button => {
    button.addEventListener('click', function () {
        const product = {
            name: this.getAttribute('data-name'),
            price: parseFloat(this.getAttribute('data-price')),
            image: this.getAttribute('data-image')
        };

        addToCart(product);
        alert(product.name + ' added to cart! (' + cart.length + ' items)');

    });
});

updateCartCount();

// wish//
localStorage.removeItem('scm_wish');

let wish = JSON.parse(localStorage.getItem('scm_wish')) || [];

function updatewishcount() {
    const count = document.getElementById('wish-count')
    if (count) {
        count.textContent = wish.length;
    }
}

function addToWish(productdetails) {
    wish.push(productdetails);
    localStorage.setItem('scm_wish', JSON.stringify(wish));
    updatewishcount();
}

const wishbuttons = document.querySelectorAll('.wish');

wishbuttons.forEach(button => {
    button.addEventListener('click', function () {
        const productdetails = {
            name: this.getAttribute('data-name'),
            price: parseFloat(this.getAttribute('data-price')),
            image: this.getAttribute('data-image')
        };

        addToWish(productdetails);
        alert(productdetails.name + 'added to wishlist (' + wish.length + 'items)');
    });
});

updatewishcount();

// scroller
document.querySelectorAll('.scroll-section').forEach(section => {
    const container = section.querySelector('.scroll-container');
    const leftBtn = section.querySelector('.scroll-arrow.left');
    const rightBtn = section.querySelector('.scroll-arrow.right');

    leftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
    });
});