// Mobile Navigation Toggle
const sidebar = document.querySelector('.sidebar');
const toggleButton = document.createElement('button');
toggleButton.className = 'nav-toggle';
toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
toggleButton.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1002;
    background: #0a192f;
    border: none;
    color: #64ffda;
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
    display: none;
`;

document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    // Hide hamburger button when sidebar is open
    if (sidebar.classList.contains('active')) {
        toggleButton.style.display = 'none';
    } else {
        toggleButton.style.display = 'block';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        // Show hamburger button when sidebar is closed
        toggleButton.style.display = 'block';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
        sidebar.classList.remove('active');
        // Show hamburger button when sidebar is closed
        toggleButton.style.display = 'block';
    }
});

// Show/hide mobile toggle button
function handleResize() {
    if (window.innerWidth <= 768) {
        toggleButton.style.display = 'block';
    } else {
        toggleButton.style.display = 'none';
        sidebar.classList.remove('active');
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

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the very bottom of the page
    const isAtBottom = scrollPosition + windowHeight >= documentHeight - 10;
    
    if (isAtBottom && sections.length > 0) {
        // If at bottom, highlight the last section (contact)
        current = sections[sections.length - 1].getAttribute('id');
    } else {
        // Normal section detection
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
});

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
    
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    
    let totalMonths = yearDiff * 12 + monthDiff;
    
    // Adjust if the end day is before the start day
    if (end.getDate() < start.getDate()) {
        totalMonths--;
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