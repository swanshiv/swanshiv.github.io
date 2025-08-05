// Timeline Interactive Functionality with Progress
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineProgress = document.querySelector('.timeline-progress-fill');

timelineItems.forEach((item, index) => {
    const title = item.querySelector('.timeline-title');
    const content = item.querySelector('.timeline-item-content');
    
    title.addEventListener('click', () => {
        // Collapse all other items
        timelineItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherContent = otherItem.querySelector('.timeline-item-content');
                otherContent.style.maxHeight = null;
                otherContent.classList.remove('expanded');
            }
        });
        
        // Expand or collapse the clicked item
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = null;
            content.classList.remove('expanded');
        } else {
            // Set a large max-height to ensure content is fully visible
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add('expanded');
        }
        
        // Update progress
        updateTimelineProgress();
    });
});

function updateTimelineProgress() {
    const expandedItems = document.querySelectorAll('.timeline-item-content.expanded');
    const progress = (expandedItems.length / timelineItems.length) * 100;
    timelineProgress.style.height = progress + '%';
}

// Scroll to Top Functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Skills Chart with Loading State
let skillsChart = null;

function initializeSkillsChart() {
    const ctx = document.getElementById('skillsChart');
    const loadingElement = document.querySelector('.chart-loading');
    
    if (!ctx) return;
    
    // Show loading state
    loadingElement.style.display = 'block';
    
    // Simulate loading delay
    setTimeout(() => {
        loadingElement.style.display = 'none';
        
        const skillsData = {
            labels: ['AI / ML', 'Backend & API', 'Databases & Vector Stores', 'Cloud & DevOps', 'Product & Pedagogy'],
            datasets: [{
                label: 'Proficiency',
                data: [5, 4, 4, 3, 5], // Subjective rating: 5=Expert, 4=Advanced, 3=Proficient
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                borderColor: 'rgba(245, 158, 11, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(245, 158, 11, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(245, 158, 11, 1)'
            }]
        };

        skillsChart = new Chart(ctx, {
            type: 'radar',
            data: skillsData,
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                family: 'Aptos Display'
                            },
                            color: '#fbbf24' // amber-400 for visibility on black background
                        },
                        ticks: {
                            backdropColor: 'rgba(0, 0, 0, 0.8)',
                            color: '#fbbf24', // amber-400 for visibility
                            stepSize: 1,
                            beginAtZero: true,
                            max: 5
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }, 1000);
}

// Card Reveal Animation
function animateCards() {
    const cards = document.querySelectorAll('.card-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Parallax Header Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header-parallax');
        if (header) {
            const rate = scrolled * -0.5;
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize skills chart if we're on the skills page
    if (document.getElementById('skillsChart')) {
        setTimeout(initializeSkillsChart, 100);
    }
    
    // Initialize animations
    animateCards();
    initParallax();
    
    // Add focus indicators for accessibility
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #f59e0b';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover sound effects (optional - for enhanced UX)
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.tab-btn, .bg-gray-50, .timeline-title');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.cursor = 'default';
        });
    });
}

// Initialize hover effects
addHoverEffects();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler); 