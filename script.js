document.addEventListener('DOMContentLoaded', function() {
    // Menu items data
    const menuItems = [
        {
            id: 1,
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and basil",
            price: 12.99,
            category: "pizza",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 2,
            name: "Pepperoni Pizza",
            description: "Pizza with tomato sauce, mozzarella, and pepperoni",
            price: 14.99,
            category: "pizza",
            image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 3,
            name: "Veggie Pizza",
            description: "Pizza with tomato sauce, mozzarella, and assorted vegetables",
            price: 13.99,
            category: "pizza",
            image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 4,
            name: "Classic Burger",
            description: "Beef patty with lettuce, tomato, onion, and special sauce",
            price: 8.99,
            category: "burger",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 5,
            name: "Cheeseburger",
            description: "Classic burger with a slice of American cheese",
            price: 9.99,
            category: "burger",
            image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 6,
            name: "Bacon Burger",
            description: "Classic burger with crispy bacon strips",
            price: 10.99,
            category: "burger",
            image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 7,
            name: "Spaghetti Carbonara",
            description: "Pasta with creamy egg sauce, pancetta, and parmesan",
            price: 11.99,
            category: "pasta",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 8,
            name: "Penne Arrabiata",
            description: "Penne pasta with spicy tomato sauce",
            price: 10.99,
            category: "pasta",
            image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 9,
            name: "Greek Salad",
            description: "Fresh salad with tomatoes, cucumber, olives, and feta cheese",
            price: 8.99,
            category: "salad",
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: 10,
            name: "Caesar Salad",
            description: "Romaine lettuce with croutons, parmesan, and Caesar dressing",
            price: 9.99,
            category: "salad",
            image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    // Cart functionality
    let cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');

    // Load menu items
    function loadMenuItems(category = 'all') {
        const menuItemsContainer = document.getElementById('menu-items');
        menuItemsContainer.innerHTML = '';

        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);

        if (filteredItems.length === 0) {
            menuItemsContainer.innerHTML = '<p class="empty-menu">No items found in this category</p>';
            return;
        }

        filteredItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menu-item');
            menuItemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="item-price">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(menuItemElement);
        });

        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Add item to cart
    function addToCart(e) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const item = menuItems.find(item => item.id === itemId);
        
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
        }
        
        updateCart();
    }

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart modal if open
        if (cartModal.style.display === 'flex') {
            renderCartItems();
        }
    }

    // Render cart items in modal
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">&times;</div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        cartTotal.textContent = total.toFixed(2);
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }

    // Decrease item quantity
    function decreaseQuantity(e) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === itemId);
        
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== itemId);
        }
        
        updateCart();
    }

    // Increase item quantity
    function increaseQuantity(e) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === itemId);
        item.quantity += 1;
        updateCart();
    }

    // Remove item from cart
    function removeItem(e) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    }

    // Initialize the page
    function init() {
        // Load all menu items initially
        loadMenuItems();
        
        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                const category = this.getAttribute('data-category');
                loadMenuItems(category);
            });
        });
        
        // Cart icon click
        document.querySelector('.cart-icon').addEventListener('click', function() {
            cartModal.style.display = 'flex';
            renderCartItems();
        });
        
        // Close cart modal
        document.querySelector('.close-cart').addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });
        
        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', function() {
            if (cart.length > 0) {
                alert('Order placed successfully! Thank you for your purchase.');
                cart = [];
                updateCart();
                cartModal.style.display = 'none';
            } else {
                alert('Your cart is empty. Please add items to proceed.');
            }
        });
        
        // Order now button in hero section
        document.querySelector('.order-btn').addEventListener('click', function() {
            document.querySelector('.category-btn.active').click();
            window.scrollTo({
                top: document.getElementById('menu').offsetTop - 80,
                behavior: 'smooth'
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
    }

    init();
});