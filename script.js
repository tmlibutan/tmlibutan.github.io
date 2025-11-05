// Mobile Navigation Toggle
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.createElement('button');
toggleButton.className = 'nav-toggle';
toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
toggleButton.setAttribute('aria-expanded', 'false');
toggleButton.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';

document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active');
    toggleButton.setAttribute('aria-expanded', isActive.toString());
    // Hide hamburger button when sidebar is open (mobile only)
    if (isActive && window.innerWidth <= 768) {
        toggleButton.style.display = 'none';
    } else if (window.innerWidth <= 768) {
        toggleButton.style.display = 'block';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
        // Show hamburger button when sidebar is closed (mobile only)
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'block';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
        sidebar.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
        // Show hamburger button when sidebar is closed (mobile only)
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'block';
        }
    }
});

// Show/hide mobile toggle button
function handleResize() {
    if (window.innerWidth <= 768) {
        toggleButton.style.display = 'block';
        // If sidebar is open on mobile, hide hamburger
        if (sidebar.classList.contains('active')) {
            toggleButton.style.display = 'none';
        }
    } else {
        toggleButton.style.display = 'none';
        sidebar.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
    }
}

window.addEventListener('resize', handleResize);
handleResize();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Experience Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding panel
        const targetPanel = document.getElementById(button.getAttribute('data-tab'));
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', throttle(() => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the very top of the page
    const isAtTop = scrollPosition < 100;
    
    // Check if we're at the very bottom of the page (with larger threshold)
    const isAtBottom = scrollPosition + windowHeight >= documentHeight - 50;
    
    if (isAtTop && sections.length > 0) {
        // If at top, highlight the first section (about)
        current = sections[0].getAttribute('id');
    } else if (isAtBottom && sections.length > 0) {
        // If at bottom, highlight the last section (contact)
        current = sections[sections.length - 1].getAttribute('id');
    } else {
        // Normal section detection - check each section
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            const isLastSection = index === sections.length - 1;
            
            // For the last section, extend the detection range to catch bottom of page
            if (isLastSection && scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            } else if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100));

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-item, .about-text, .tab-panel');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Typing effect for name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Calculate duration between dates
function calculateDuration(startDate, endDate = null) {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const startDay = start.getDate();
    
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    const endDay = end.getDate();
    
    // Calculate base months difference
    let totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth);
    
    // Add 1 to count both start and end months inclusively
    // Only subtract if we haven't reached the start day in the end month
    if (endMonth === startMonth && endYear === startYear) {
        // Same month: show 1 month if we've reached/passed the start day
        totalMonths = endDay >= startDay ? 1 : 0;
    } else {
        // Different months: add 1 for inclusive counting
        totalMonths += 1;
        // If we haven't reached the start day in the end month, subtract 1
        if (endDay < startDay) {
            totalMonths--;
        }
    }
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (years > 0 && months > 0) {
        return `${years} yr ${months} mos`;
    } else if (years > 0) {
        return `${years} yr`;
    } else {
        return `${months} mos`;
    }
}

// Update current role duration automatically
function updateCurrentRoleDuration() {
    const currentRoleDuration = document.querySelector('#tab1 .duration');
    if (currentRoleDuration) {
        const startDate = '2025-01-01'; // Jan 2025
        const duration = calculateDuration(startDate);
        currentRoleDuration.textContent = `Jan 2025 — Present · ${duration}`;
    }
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 150);
    }
    
    // Update current role duration
    updateCurrentRoleDuration();
});