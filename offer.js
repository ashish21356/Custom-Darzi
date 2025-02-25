document.addEventListener('DOMContentLoaded', function() {
    // Toggle cart panel
    const cartPanel = document.getElementById('shopping-cart');
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartToggleBtn.addEventListener('click', () => {
        cartPanel.classList.toggle('active');
    });

    // Set a common end time for all products (24 hours from now)
    const commonEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Sample products data with sale information
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 79.99,
            originalPrice: 129.99,
            image: "https://example.com/headphones.jpg",
            onSale: true,
            saleEndsIn: commonEndTime
        },
        {
            id: 2,
            name: "Smartwatch",
            price: 149.99,
            originalPrice: 199.99,
            image: "https://example.com/smartwatch.jpg",
            onSale: true,
            saleEndsIn: commonEndTime
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 59.99,
            originalPrice: 89.99,
            image: "https://example.com/speaker.jpg",
            onSale: true,
            saleEndsIn: commonEndTime
        }
    ];

    // Function to format time remaining
    function formatTimeRemaining(endDate) {
        const total = endDate - Date.now();
        const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((total % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update countdown timers
    function updateCountdowns() {
        const countdownElements = document.querySelectorAll('.countdown-timer');
        countdownElements.forEach(element => {
            const endDate = new Date(element.dataset.endsIn);
            const timeRemaining = formatTimeRemaining(endDate);
            element.textContent = `Flash Sale Ends in: ${timeRemaining}`;

            if (endDate <= Date.now()) {
                element.closest('.product-card').remove();
            }
        });
    }

    // Render products
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        productElement.innerHTML = `
            ${product.onSale ? `<div class="sale-badge">-${discount}%</div>` : ''}
            ${product.onSale ? `<div class="countdown-timer" data-ends-in="${product.saleEndsIn.toISOString()}">
                Flash Sale Ends in: ${formatTimeRemaining(product.saleEndsIn)}
            </div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ${product.onSale ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    $${product.price.toFixed(2)}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });

    // Update countdowns every second
    setInterval(updateCountdowns, 1000);

    // Add to cart function
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        updateCart();
    };

    // Update cart function
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;

        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = count;
    }

    // Update quantity function
    window.updateQuantity = function(productId, newQuantity) {
        if (newQuantity < 1) {
            cart = cart.filter(item => item.id !== productId);
        } else {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        }
        updateCart();
    };

    // Checkout function (WhatsApp integration)
    checkoutBtn.addEventListener('click', () => {
        const phoneNumber = '1234567890'; // Replace with your WhatsApp number
        let message = 'New Order:\n\n';
        
        cart.forEach(item => {
            message += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: $${total.toFixed(2)}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    });

    // Initial cart update
    updateCart();
});