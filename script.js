class Db {
    constructor() {
        this.request = window.indexedDB.open('ashish-site-local', 4);
        this.db = null;

        this.request.onsuccess = () => {
            this.db = this.request.result;
        }
        
        // this.db = this.request.result || null;

        this.request.onupgradeneeded = (event) => {
            this.request.result.createObjectStore('cart', {keyPath: 'id'}).createIndex('cartId', 'id');
        };

        this.request.onerror = (err) => {
            console.log(err);
        }
    }

    getStore = () => {
        const transaction = this.db.transaction('cart', 'readwrite');
        const store = transaction.objectStore('cart');

        transaction.oncomplete = (e) => {
            console.log('Transaction completed ###', e);
        }
        return store;
    }

    removeItem = (key) => {
        return new Promise((resolve, reject) => {
            if(this.db) {
                try {
                    const store = this.getStore();
                    const req = store.delete(key);
                    req.onsuccess = (event) => {
                        console.log('deleted  ###', event.target, typeof key);
                        resolve();
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                reject('');
            }
        })
    }

    updateItem = (item, key) => {
        return new Promise((resolve, reject) => {
            if(this.db) {
                try {
                    const store = this.getStore();
                    const req = store.put(item);
                    req.onsuccess = event => {
                        resolve(event.target.result);
                    }
                    req.onerror = event => {
                        reject(event.target.result);
                    }
                } catch (error) {
                    reject(error);
                }
            }
        })
    }

    addItem = (item) => {
        return new Promise((resolve, reject) => {
            if(this.db) {
                try {
                    const store = this.getStore();
                    const req = store.add({cartId: new Date().getTime(), ...item});
                    req.onsuccess = (event) =>  resolve(event.target.result);
                } catch (error) {
                    reject(error);
                }
            }else {
                reject('');
            }
        })
    }

    getItems = () => {
        return new Promise((resolve, reject) => {
            if(this.db) {
                try {
                    const store = this.getStore();
                    const result = store.getAll();
                    result.onsuccess = (event) => {
                        resolve(event.target.result || []);
                    }
                } catch (error) {
                    reject(error);
                }
            } else {
                reject('Db instance not available!!!');
            }
        })
        
    }
}

// Cart state
let cart = [];
class Cart {
    constructor() {
        this.products = [];
    }

    loadLocalProducts = async () => {
    try {
            const resp = await fetch('./product.metadata.json');
            const products = await resp.json();
            return products || []
        } catch (error) {
            return [];
        }
    }

    // Initialize the page
    initializePage = () => {
        this.dbInstance = new Db();
        this.loadLocalProducts().then(list => {
            this.products = list.products;
            this.displayProducts(list.products);
            this.loadCart();
            this.addEventListener();
        });
    }
    
    // Display products
    displayProducts = (products) => {
        const productsContainer = document.getElementById('products');
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card" data-product-id='${product.id}'>
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price"> ₹${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-product-id=${product.id}>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // add event listeners
    addEventListener = () => {
        document.querySelector('.products').addEventListener('click', (event) => {
            if(event.target && event.target.classList.contains('add-to-cart')) {
                const productId = event.target.getAttribute('data-product-id');
                this.addToCart(productId);
                // event.stopPropagation();
            }

            if(event.target && event.target.closest('.product-card')) {
                
                const productId = event.target.closest('.product-card').getAttribute('data-product-id');
                
                const product = this.products.find(product => `${product.id}` === `${productId}`);
                this.toggleProductDetail(product);
            }
        })
        
        document.querySelector('#cart-items').addEventListener('click', (event) => {
            if(event.target && event.target.classList.contains('quantity-btn')) {
                const productId = event.target.getAttribute('data-product-id');
                const action = event.target.getAttribute('data-product-action');
                this.updateQuantity(productId, action);
            }
        })
    }

    // Load cart from localStorage
    loadCart = async () => {
        const savedCart = localStorage.getItem('cart');

        // await this.dbInstance.removeItem(1);

        const cartItems = await this.dbInstance.getItems();
        cart = cartItems;
        this.updateCartCount();
        this.updateCartDisplay();
    }
    
    // Add to cart
    addToCart = async (productId) => {
        const product = this.products.find(p => `${p.id}` === `${productId}`);
        const cartItem = cart.find(item => item.id === productId) || {...product, quantity: 0};
    
        cartItem.quantity += 1;
        
        await this.dbInstance.addItem(cartItem);
        cart = await this.dbInstance.getItems();
    
        this.updateCartDisplay();
        this.updateCartCount();
    }

    // Update cart count
    updateCartCount = () => {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }
    
    // Update cart display
    updateCartDisplay = () => {
        const cartItems = document.getElementById('cart-items');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" data-product-action='decrement' data-product-id=${item.id}>-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-product-action='increment' data-product-id=${item.id}>+</button>
                    </div>
                </div>
            </div>
        `).join('');
    
        document.getElementById('cart-total').textContent = total.toFixed(2);
    }
    
    // Update quantity
    updateQuantity = async (productId, action = 0) => {
        const item = cart.find(item => `${item.id}` === `${productId}`);
        if(action === 'increment') {
            item.quantity += 1;
        }else {
            item.quantity -= 1;
        }

        // If all items removed, remove it from store
        if(!item.quantity) {
            await this.dbInstance.removeItem(+productId);
        }else {
            await this.dbInstance.updateItem(item, productId);
        }
        cart = await this.dbInstance.getItems();

        this.updateCartDisplay();
        this.updateCartCount();
    }
    
    // Checkout function
    checkout = () => {
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

    // Toggle cart sidebar
    toggleProductDetail = (product) => {
        const cartSidebar = document.getElementById('product-sidebar');
        
        if (product) {
            // const product = this.products.filter(`${product.id}` === `${productId}`);
            
            document.querySelector('#product-name').innerHTML = product.name;
            // objCart.addToCart(product.id);
        }
        cartSidebar.classList.toggle('open');
    }
}

<<<<<<< Updated upstream
// Toggle cart sidebar
toggleCart = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
    // const DbConnection = new Db();
}

const objCart = new Cart();
=======
// Hero Section Heading Effect
document.addEventListener("DOMContentLoaded", function () {
    let heroHeading = document.getElementById("hero-heading");
    let colors = ["#ffcc00", "#ff5733", "#33ff57", "#3399ff"];
    let index = 0;

    setInterval(() => {
        heroHeading.style.color = colors[index];
        index = (index + 1) % colors.length;
    }, 1000);
});


>>>>>>> Stashed changes
// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', objCart.initializePage);