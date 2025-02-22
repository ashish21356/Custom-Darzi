// Sample product data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
    },
    {
        id: 3,
        name: 'Laptop Backpack',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
    },
    {
        id: 4,
        name: 'Wireless Mouse',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
    }
];

// Cart state
let cart = [];

// Initialize the page
function initializePage() {
    displayProducts();
    loadCart();
    updateCartCount();
}

// Display products
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const message = cart
        .map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
        .join('\n');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const whatsappMessage = encodeURIComponent(`My Order:\n${message}\n\nTotal: $${total.toFixed(2)}`);
    window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);