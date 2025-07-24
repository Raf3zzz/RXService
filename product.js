// Sample product data
const products = [
    {
        id: 1,
        name: "Advanced Discord Moderation Bot",
        category: "discord-bots",
        price: 49.99,
        originalPrice: 79.99,
        description: "Complete moderation solution with auto-mod, custom commands, and advanced logging.",
        tags: ["Premium", "Customizable", "Source Code"],
        discordLink: "https://discord.gg/example1",
        onSale: true
    },
    {
        id: 2,
        name: "Minecraft Server Website Template",
        category: "websites",
        price: 4.99,
        description: "Ready to use minimal color blue with basic store, news page, rules page, staff page and how to join.",
        tags: ["Ready to Use", "Responsive", "Basic"],
        discordLink: "https://discord.gg/F4z4Tm8DMB",
        image: "mineserver.png"
    },
    {
        id: 3,
        name: "Social Media Auto-Poster",
        category: "automation",
        price: 34.99,
        originalPrice: 59.99,
        description: "Automatically post content across multiple social media platforms with scheduling.",
        tags: ["Automation", "Multi-Platform", "Customizable"],
        discordLink: "https://discord.gg/example3",
        onSale: true
    },
    {
        id: 4,
        name: "Custom Discord Music Bot",
        category: "discord-bots",
        price: 69.99,
        description: "High-quality music bot with playlist support, filters, and premium features.",
        tags: ["Premium", "24/7 Support", "Source Code"],
        discordLink: "https://discord.gg/example4"
    },
    {
        id: 5,
        name: "Portfolio Website Dev",
        category: "websites",
        price: 4.49,
        description: "Professional portfolio template with purple/dark themes and contact forms with 2 Lang [italian & english].",
        tags: ["2 Lang", "Modern Design", "Ready to Use"],
        discordLink: "https://discord.gg/F4z4Tm8DMB",
        image: "portfolio.png"
    },
    {
        id: 6,
        name: "Data Scraping Tool",
        category: "automation",
        price: 79.99,
        description: "Powerful web scraping tool with proxy support and data export features.",
        tags: ["Advanced", "Proxy Support", "Export Data"],
        discordLink: "https://discord.gg/example6"
    },
    {
        id: 7,
        name: "Python Discord Framework",
        category: "custom-scripts",
        price: 44.99,
        description: "Complete Python framework for building Discord bots with extensive documentation.",
        tags: ["Framework", "Documentation", "Source Code"],
        discordLink: "https://discord.gg/example7"
    },
    {
        id: 8,
        name: "REST API Service",
        category: "api-services",
        price: 99.99,
        description: "Custom REST API development with authentication and database integration.",
        tags: ["Custom API", "Authentication", "Database"],
        discordLink: "https://discord.gg/example8"
    },
    {
        id: 9,
        name: "MongoDB Setup Service",
        category: "databases",
        price: 149.99,
        description: "Professional MongoDB database setup with optimization and security configuration.",
        tags: ["Professional Setup", "Optimization", "Security"],
        discordLink: "https://discord.gg/example9"
    },
    {
        id: 10,
        name: "Discord Economy Bot",
        category: "discord-bots",
        price: 39.99,
        originalPrice: 64.99,
        description: "Feature-rich economy bot with currency system, shop, and mini-games.",
        tags: ["Economy", "Mini-Games", "Customizable"],
        discordLink: "https://discord.gg/example10",
        onSale: true
    },
    {
        id: 11,
        name: "Landing Page Template",
        category: "websites",
        price: 54.99,
        description: "High-converting landing page template with modern animations and forms.",
        tags: ["High Converting", "Animations", "Forms"],
        discordLink: "https://discord.gg/example11"
    },
    {
        id: 12,
        name: "Bulk Email Sender",
        category: "automation",
        price: 29.99,
        description: "Professional email marketing tool with templates and analytics.",
        tags: ["Email Marketing", "Templates", "Analytics"],
        discordLink: "https://discord.gg/example12"
    }
];

// DOM elements
const categoriesSection = document.getElementById('categories');
const productsSection = document.getElementById('products');
const backToCategoriesBtn = document.getElementById('back-to-categories');
const categoryTitle = document.getElementById('category-title');
const productsGrid = document.getElementById('products-grid');
const priceRange = document.getElementById('price-range');
const maxPriceSpan = document.getElementById('max-price');

// State
let currentCategory = 'all';
let filteredProducts = [...products];

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    renderProducts(products);
    initializeAnimations();
});

function initializeEventListeners() {
    // Category cards click
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showProductsForCategory(category);
        });
    });

    // Back to categories button
    backToCategoriesBtn.addEventListener('click', function() {
        showCategories();
    });

    // Price range filter
    priceRange.addEventListener('input', function() {
        const maxPrice = this.value;
        maxPriceSpan.textContent = `€${maxPrice}`;
        filterProducts();
    });

    // Category filters
    document.querySelectorAll('.category-filters input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Feature filters
    document.querySelectorAll('.feature-filters input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
}

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe category cards
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });

    // Add parallax effect to floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        document.querySelectorAll('.floating-dot').forEach((dot, index) => {
            const speed = (index + 1) * 0.1;
            dot.style.transform = `translateY(${parallax * speed}px)`;
        });
    });

    // Add mouse move effect for cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function showProductsForCategory(category) {
    currentCategory = category;
    categoriesSection.style.display = 'none';
    productsSection.style.display = 'block';
    
    // Update category title
    const categoryNames = {
        'discord-bots': 'Discord Bots',
        'websites': 'Websites',
        'automation': 'Automation Tools',
        'custom-scripts': 'Custom Scripts',
        'api-services': 'API Services',
        'databases': 'Databases'
    };
    
    categoryTitle.textContent = categoryNames[category] || 'All Products';
    
    // Filter and render products
    filterProducts();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCategories() {
    productsSection.style.display = 'none';
    categoriesSection.style.display = 'block';
    currentCategory = 'all';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterProducts() {
    let filtered = [...products];
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    // Filter by price
    const maxPrice = parseFloat(priceRange.value);
    filtered = filtered.filter(product => product.price <= maxPrice);
    
    // Filter by selected categories (checkboxes)
    const selectedCategories = Array.from(document.querySelectorAll('.category-filters input[type="checkbox"]:checked'))
        .map(cb => cb.value)
        .filter(value => value !== 'all');
    
    if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
        filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Filter by features
    const selectedFeatures = Array.from(document.querySelectorAll('.feature-filters input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    if (selectedFeatures.length > 0) {
        filtered = filtered.filter(product => {
            return selectedFeatures.some(feature => {
                switch(feature) {
                    case 'premium':
                        return product.tags.some(tag => tag.toLowerCase().includes('premium'));
                    case 'customizable':
                        return product.tags.some(tag => tag.toLowerCase().includes('customizable'));
                    case 'ready-to-use':
                        return product.tags.some(tag => tag.toLowerCase().includes('ready'));
                    case 'source-code':
                        return product.tags.some(tag => tag.toLowerCase().includes('source'));
                    default:
                        return false;
                }
            });
        });
    }
    
    filteredProducts = filtered;
    renderProducts(filtered);
}

function renderProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3 style="color: #666; margin-bottom: 1rem;">No products found</h3>
                <p style="color: #999;">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image" style="position:relative;overflow:hidden;border-radius:1rem;width:100%;height:200px;background:#f8f9fa;">
                ${product.image ? `
                    <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;display:block;" />
                    <a href="${product.discordLink}" target="_blank" class="discord-link" onclick="event.stopPropagation()" style="position:absolute;top:1rem;right:1rem;z-index:2;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </a>
                ` : `
                    <a href="${product.discordLink}" target="_blank" class="discord-link" onclick="event.stopPropagation()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </a>
                `}
            </div>
            <div class="product-info">
                <div class="product-meta">
                    ${product.tags.map(tag => `
                        <span class="product-tag ${product.onSale && tag === product.tags[0] ? 'sale' : ''}">${tag}</span>
                    `).join('')}
                    ${product.onSale ? '<span class="product-tag sale">Sale!</span>' : ''}
                </div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-pricing">
                    <span class="current-price">€${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">€${product.originalPrice}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click event listeners to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.discord-link')) return;
            
            const productId = parseInt(this.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            if (product) {
                window.open(product.discordLink, '_blank');
            }
        });
    });
}

// Smooth scrolling for better UX
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize price range display
priceRange.addEventListener('input', function() {
    maxPriceSpan.textContent = `€${this.value}`;
});