document.addEventListener('DOMContentLoaded', function () {
    let created_cart = JSON.parse(localStorage.getItem('scm_cart'));
    let cards_container = document.getElementById('cards-cont');

    if (!created_cart || created_cart.length === 0) {
        cards_container.innerHTML = "<h1>Your cart is empty!</h1>";
        return;
    }

    function calculateTotal() {
        let total = 0;
        let itemCount = 0;
        const allQuantInputs = document.querySelectorAll('input[type="number"]');

        allQuantInputs.forEach((input, index) => {
            const qty = parseInt(input.value);
            itemCount += qty;
            total += created_cart[index].price * qty;
        });

        // Update all price displays
        document.getElementById('total-amount').textContent = total;
        document.getElementById('subtotal').textContent = '₹' + total;
        document.getElementById('total-amount').textContent = '₹' + total;
        document.getElementById('item-count').textContent = itemCount;
        return total;
    }

    // Render each cart item
    created_cart.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'carts-card';

        // Image with lightbox
        const imgwrap = document.createElement('div');
        imgwrap.className = 'img_wrapper';

        const a = document.createElement('a');
        a.href = item.image;
        a.setAttribute('data-lightbox', 'cart');
        a.setAttribute('data-title', item.name + ' - ₹' + item.price);

        const img = document.createElement('img');
        img.src = item.image;

        a.appendChild(img);
        imgwrap.appendChild(a);

        // Product details
        const details = document.createElement('div');
        details.className = 'cart-details';

        const name = document.createElement('p');
        name.textContent = item.name;

        const price = document.createElement('p');
        price.className = 'cart-price';
        price.textContent = '₹' + item.price;

        // Delivery info
        const delivery = document.createElement('p');
        delivery.style.fontSize = '0.85rem';
        delivery.style.color = '#27ae60';
        delivery.textContent = 'FREE Delivery';

        details.appendChild(name);
        details.appendChild(price);
        details.appendChild(delivery);

        // Quantity and actions
        const actions = document.createElement('div');
        actions.className = 'quant_total';

        const quant = document.createElement('input');
        quant.type = 'number';
        quant.value = 1;
        quant.min = 1;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Remove';

        removeBtn.addEventListener('click', function () {
            // Remove from array
            created_cart.splice(index, 1);
            // Update localStorage
            localStorage.setItem('scm_cart', JSON.stringify(created_cart));
            // Remove from DOM
            card.remove();
            // Recalculate
            calculateTotal();

            // If empty, show message
            if (created_cart.length === 0) {
                cards_container.innerHTML = "<h1>Your cart is empty!</h1>";
            }
        });

        // Quantity change
        quant.addEventListener('change', function () {
            const qty = parseInt(this.value);
            if (qty < 1) {
                this.value = 1;
                return;
            }
            price.textContent = '₹' + (item.price * qty);
            calculateTotal();
        });

        actions.appendChild(quant);
        actions.appendChild(removeBtn);

        // Assemble card
        card.appendChild(imgwrap);
        card.appendChild(details);
        card.appendChild(actions);

        cards_container.appendChild(card);
    });

    calculateTotal();
});