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
    productsContainer.innerHTML = products.map(product => {
        const discountedPrice = (product.price * 0.9).toFixed(2); // 10% OFF Calculation
        return `
            <div class="product-card" data-product-id='${product.id}'>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price"> ₹${product.price.toFixed(2)}</p>
                  <p class="discounted-price">Discounted-Price: ₹${discountedPrice}</p>
                <div class="offer-timer">
                    <span>Offer Ends in: </span>
                    <div class="timer-units">
                        <div class="timer-unit">
                            <span class="hours">24</span>
                            <span>Hours</span>
                        </div>
                        <div class="timer-unit">
                            <span class="minutes">00</span>
                            <span>Minutes</span>
                        </div>
                        <div class="timer-unit">
                            <span class="seconds">00</span>
                            <span>Seconds</span>
                        </div>
                    </div>
                </div>
                <button class="add-to-cart" data-product-id=${product.id}>
                    View Product
                </button>
            </div>
        </div>
    `}).join('');
};


    // add event listeners
    addEventListener = () => {
        document.querySelector('#product-sidebar').addEventListener('click', (event) => {
            if(event.target && event.target.classList.contains('add-to-cart')) {
                const productId = event.target.getAttribute('data-product-id');
                this.addToCart(productId);
                this.toggleProductDetail();
            }
        });

        document.querySelector('.products').addEventListener('click', (event) => {
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
            document.querySelector('#product-name').innerHTML = product.name;
            document.querySelector('#product-image').src = product.image;
            document.querySelector('#product-price').innerHTML = `Price: $${product.price}`;
    
            // Display multiple images (Thumbnails)
            let imagesContainer = document.querySelector('#product-images');
            imagesContainer.innerHTML = ''; // Clear previous images
    
            product.images.forEach(imgSrc => {
                let imgElement = document.createElement('img');
                imgElement.src = imgSrc;
                imgElement.classList.add('product-thumbnail'); // Add CSS for styling
                imgElement.onclick = () => {
                    document.querySelector('#product-image').src = imgSrc; // Change main image on click
                };
                imagesContainer.appendChild(imgElement);
            });
    
            // Display selectable sizes
            let sizesContainer = document.querySelector('#product-sizes');
            sizesContainer.innerHTML = ''; // Clear previous sizes
    
            product.sizes.forEach(size => {
                let sizeElement = document.createElement('button');
                sizeElement.innerText = size;
                sizeElement.classList.add('size-option');
                sizeElement.onclick = () => {
                    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('selected'));
                    sizeElement.classList.add('selected');
                };
                sizesContainer.appendChild(sizeElement);
            });
    
            // Show the sidebar
            cartSidebar.style.display = 'block';
        }
    
        cartSidebar.classList.toggle('open');
    };
}


// Function to Add Product to Wishlist
function addToWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if product already exists in wishlist
    let existingItem = wishlist.find(item => item.id === product.id);
    if (existingItem) {
        alert("This item is already in your wishlist!");
        return;
    }

    // Add product to wishlist
    wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.selectedSize || "Not selected" // Default if size isn't selected
    });

    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Refresh wishlist display
    displayWishlist();

    // Show success message
    alert("Product added to wishlist! ❤️");
}


// Add to Wishlist function
// Function to Display Wishlist
function displayWishlist() {
    let wishlistContainer = document.getElementById('wishlist-items');
    wishlistContainer.innerHTML = ''; // Clear existing content

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>0</p>';
        return;
    }

    wishlist.forEach((item, index) => {
        let wishlistItem = document.createElement('div');
        wishlistItem.classList.add('wishlist-item');

        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="wishlist-image">
            <div class="wishlist-details">
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <p>Size: ${item.size}</p>
                <button onclick="removeFromWishlist(${index})">❌ Remove</button>
            </div>
        `;

        wishlistContainer.appendChild(wishlistItem);
    });
}

// Function to Remove Item from Wishlist
function removeFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1); // Remove item by index
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage
    displayWishlist(); // Refresh UI
}

// Call this function when the page loads to show the wishlist
document.addEventListener('DOMContentLoaded', displayWishlist);


// Close Sidebar Function
function closeProductDetail() {
    document.getElementById('product-sidebar').classList.remove('open');
}

// Toggle cart sidebar
toggleCart = () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
    // const DbConnection = new Db();
}


// Hero Section Heading Effect
document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll function
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Expose scroll functions globally
    window.scrollToProducts = function() {
        scrollToElement('products');
    };

    window.scrollToServices = function() {
        scrollToElement('services');
    };

    // Animate stats when they come into view
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    // Service boxes hover effect
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});


document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        const isActive = button.classList.contains("active");

        // Close all open answers
        document.querySelectorAll(".faq-answer").forEach(item => item.style.display = "none");
        document.querySelectorAll(".faq-question").forEach(btn => btn.classList.remove("active"));

        // Open the selected answer
        if (!isActive) {
            answer.style.display = "block";
            button.classList.add("active");
        }
    });
});


// Sales Blocks Timer
function startCountdown(endTime) {
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Update elements with class "hours", "minutes", and "seconds"
        document.querySelectorAll(".hours").forEach(el => el.textContent = formattedHours);
        document.querySelectorAll(".minutes").forEach(el => el.textContent = formattedMinutes);
        document.querySelectorAll(".seconds").forEach(el => el.textContent = formattedSeconds);

        // Update elements with IDs "hours", "minutes", and "seconds"
        if (document.getElementById("hours")) {
            document.getElementById("hours").textContent = formattedHours;
        }
        if (document.getElementById("minutes")) {
            document.getElementById("minutes").textContent = formattedMinutes;
        }
        if (document.getElementById("seconds")) {
            document.getElementById("seconds").textContent = formattedSeconds;
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            ["hours", "minutes", "seconds"].forEach(unit => {
                document.querySelectorAll(`.${unit}`).forEach(el => el.textContent = "00");
                if (document.getElementById(unit)) {
                    document.getElementById(unit).textContent = "00";
                }
            });
        }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// Set countdown end date & time (YYYY, MM (0-based), DD, HH, MM, SS)
const flashSaleEndTime = new Date(2025, 1, 25, 23, 59, 59).getTime();
startCountdown(flashSaleEndTime);



const objCart = new Cart();
// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', objCart.initializePage);