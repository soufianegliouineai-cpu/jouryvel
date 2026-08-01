// JOURYVEL Perfume Maison - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything when DOM is loaded
    initNavigation();
    initScrollEffects();
    initProductCards();
    initBottleShowcase();
    initFormValidation();
    initStaggeredAnimation();
    initFormulaCalculator();
    initBottle3DEffect();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Add smooth scroll to all links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in and slide-up elements
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

// Product card interactions
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            createRipple(event, this);
            
            // Highlight effect
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Add hover sound effect (visual)
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Bottle showcase interactions
function initBottleShowcase() {
    const bottleMockups = document.querySelectorAll('.bottle-mockup');
    
    bottleMockups.forEach(bottle => {
        bottle.addEventListener('click', function() {
            // Bottle selection effect
            bottleMockups.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show bottle details
            const bottleName = this.querySelector('.bottle-name').textContent;
            const bottleVolume = this.querySelector('.bottle-volume').textContent;
            
            showBottleDetails(bottleName, bottleVolume);
        });
    });
}

// Show bottle details modal
function showBottleDetails(name, volume) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--primary-gold), #ffd700);
        color: var(--text-dark);
        padding: 30px 50px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 1.2em;
        z-index: 10000;
        box-shadow: var(--shadow-elegant);
        animation: fadeIn 0.3s ease;
    `;
    toast.textContent = `${name} - ${volume}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            let isValid = true;
            
            // Simple validation
            form.querySelectorAll('.form-control').forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    field.style.borderColor = '#ff6b6b';
                    isValid = false;
                } else {
                    field.style.borderColor = 'var(--glass-border)';
                }
            });
            
            if (isValid) {
                showSuccessMessage('Thank you for your message! We will contact you soon.');
                form.reset();
            } else {
                showErrorMessage('Please fill in all required fields.');
            }
        });
    });
}

// Show success message
function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: var(--shadow-elegant);
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
}

// Show error message
function showErrorMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #f87171, #ef4444);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: var(--shadow-elegant);
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Ripple effect creator
function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Staggered animation for elements
function initStaggeredAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const slideElements = document.querySelectorAll('.slide-up');
    slideElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Formula Calculator
function initFormulaCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    if (!calculatorForm) return;
    
    const oilInput = document.getElementById('oil-ml');
    const dpgInput = document.getElementById('dpg-ml');
    const alcoholInput = document.getElementById('alcohol-ml');
    const bottleSizeSelect = document.getElementById('bottle-size');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsDiv = document.getElementById('calculation-results');
    
    calculateBtn.addEventListener('click', function() {
        const oil = parseFloat(oilInput.value) || 0;
        const dpg = parseFloat(dpgInput.value) || 0;
        const alcohol = parseFloat(alcoholInput.value) || 0;
        const bottleSize = bottleSizeSelect.value;
        
        // Calculate percentages
        const oilPercent = ((oil / bottleSize) * 100).toFixed(1);
        const dpgPercent = ((dpg / bottleSize) * 100).toFixed(1);
        const alcoholPercent = ((alcohol / bottleSize) * 100).toFixed(1);
        
        // Calculate total and verify
        const total = oil + dpg + alcohol;
        const totalPercent = ((total / bottleSize) * 100).toFixed(1);
        
        // Display results
        resultsDiv.innerHTML = `
            <div class="calculation-result">
                <h4>Calculation Results for ${bottleSize}ml Bottle</h4>
                <div class="calculation-details">
                    <div class="calculation-item">
                        <span class="label">Oil:</span>
                        <span class="value">${oil}ml (${oilPercent}%)</span>
                    </div>
                    <div class="calculation-item">
                        <span class="label">DPG:</span>
                        <span class="value">${dpg}ml (${dpgPercent}%)</span>
                    </div>
                    <div class="calculation-item">
                        <span class="label">Alcohol:</span>
                        <span class="value">${alcohol}ml (${alcoholPercent}%)</span>
                    </div>
                    <div class="calculation-item total">
                        <span class="label">Total:</span>
                        <span class="value">${total}ml (${totalPercent}%)</span>
                    </div>
                </div>
                <div class="calculation-note">
                    <strong>Note:</strong> Target formula: 40% Oil, 15% DPG, 45% Alcohol
                </div>
            </div>
        `;
        
        // Add animation
        resultsDiv.classList.add('fade-in');
        setTimeout(() => {
            resultsDiv.classList.remove('fade-in');
        }, 1000);
    });
    
    // Auto-calculate when inputs change
    [oilInput, dpgInput, alcoholInput, bottleSizeSelect].forEach(input => {
        input.addEventListener('input', function() {
            setTimeout(() => {
                calculateBtn.click();
            }, 500);
        });
    });
}

// 3D Bottle Effect
function initBottle3DEffect() {
    const bottle = document.querySelector('.bottle-visual');
    if (!bottle) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    bottle.addEventListener('mouseenter', function() {
        this.style.transition = 'none';
    });
    
    bottle.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX = (e.clientX - centerX) / 20;
        mouseY = (e.clientY - centerY) / 20;
        
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        this.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg) translateZ(10px)`;
    });
    
    bottle.addEventListener('mouseleave', function() {
        currentX += (0 - currentX) * 0.1;
        currentY += (0 - currentY) * 0.1;
        
        this.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg)`;
    });
}

// Add CSS animations dynamically
function addCustomCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .calculation-result {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin-top: 20px;
            animation: slideUp 0.5s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .calculation-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }
        
        .calculation-item {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
        }
        
        .calculation-item.total {
            background: rgba(212, 175, 55, 0.2);
            border: 1px solid rgba(212, 175, 55, 0.5);
            font-weight: 700;
        }
        
        .label {
            color: var(--primary-gold);
        }
        
        .value {
            color: var(--text-light);
        }
        
        .calculation-note {
            text-align: center;
            color: rgba(212, 175, 55, 0.8);
            font-style: italic;
            margin-top: 15px;
        }
        
        .selected {
            border: 2px solid var(--primary-gold);
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
        }
        
        .bottle-mockup.selected::before {
            animation: selectedPulse 2s infinite;
        }
        
        @keyframes selectedPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize custom CSS
addCustomCSS();