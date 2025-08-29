// Projects Page JavaScript
// Handles project filtering, animations, and interactions

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initProjectAnimations();
    initProjectHoverEffects();
    initLazyLoading();
});

// Project Filtering System
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length === 0 || projectItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectItems);
        });
    });
}

function filterProjects(filter, projectItems) {
    projectItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
            // Show project with animation
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            // Hide project with animation
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
    
    // Update project count
    updateProjectCount(filter, projectItems);
}

function updateProjectCount(filter, projectItems) {
    const visibleProjects = Array.from(projectItems).filter(item => {
        if (filter === 'all') return true;
        const categories = item.getAttribute('data-category').split(' ');
        return categories.includes(filter);
    });
    
    // You can add a counter display here if needed
    console.log(`${visibleProjects.length} projects found for filter: ${filter}`);
}

// Project Animations
function initProjectAnimations() {
    const projectItems = document.querySelectorAll('.project-item');
    
    // Add initial animation classes
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        
        // Stagger animation
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Project Hover Effects
function initProjectHoverEffects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const image = item.querySelector('.project-image');
        const overlay = item.querySelector('.project-overlay');
        
        if (image && overlay) {
            // Enhanced hover effects
            item.addEventListener('mouseenter', function() {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
                
                // Add subtle shadow effect
                item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            item.addEventListener('mouseleave', function() {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
                item.style.boxShadow = '';
            });
        }
    });
}

// Lazy Loading for Project Images
function initLazyLoading() {
    const projectImages = document.querySelectorAll('.project-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    loadProjectImage(image);
                    imageObserver.unobserve(image);
                }
            });
        });
        
        projectImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for older browsers
        projectImages.forEach(image => {
            loadProjectImage(image);
        });
    }
}

function loadProjectImage(imageElement) {
    // Add loading animation
    imageElement.style.opacity = '0.7';
    
    // Simulate image loading (in real implementation, you'd load actual images)
    setTimeout(() => {
        imageElement.style.opacity = '1';
        imageElement.classList.add('loaded');
    }, 300);
}

// Project Search Functionality
function initProjectSearch() {
    const searchInput = document.querySelector('#projectSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', Utils.debounce(function() {
        const searchTerm = this.value.toLowerCase();
        const projectItems = document.querySelectorAll('.project-item');
        
        projectItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(item.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           technologies.some(tech => tech.includes(searchTerm));
            
            if (matches) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }, 300));
}

// Project Modal/Detail View
function initProjectModal() {
    const projectLinks = document.querySelectorAll('.project-link-btn');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectItem = this.closest('.project-item');
            const projectTitle = projectItem.querySelector('h3').textContent;
            const projectDescription = projectItem.querySelector('p').textContent;
            const projectTech = Array.from(projectItem.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent);
            
            showProjectModal(projectTitle, projectDescription, projectTech);
        });
    });
}

function showProjectModal(title, description, technologies) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="modal-tech">
                        <h4>Technologies Used:</h4>
                        <div class="tech-tags">
                            ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary">View Live Demo</button>
                    <button class="btn btn-secondary">View Source Code</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(modal);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal(modal);
    });
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .project-modal {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .modal-header {
        padding: 1.5rem 1.5rem 1rem;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        margin: 0;
        color: #1e293b;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748b;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .modal-close:hover {
        background: #f1f5f9;
        color: #1e293b;
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .modal-body p {
        margin-bottom: 1.5rem;
        line-height: 1.6;
        color: #64748b;
    }
    
    .modal-tech h4 {
        margin-bottom: 1rem;
        color: #1e293b;
    }
    
    .modal-tech .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .modal-footer {
        padding: 1rem 1.5rem 1.5rem;
        border-top: 1px solid #e2e8f0;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
        }
        
        .modal-footer {
            flex-direction: column;
        }
        
        .modal-footer .btn {
            width: 100%;
        }
    }
`;
document.head.appendChild(modalStyles);

// Initialize additional features if elements exist
document.addEventListener('DOMContentLoaded', function() {
    // Check if search functionality should be initialized
    if (document.querySelector('#projectSearch')) {
        initProjectSearch();
    }
    
    // Initialize project modal if needed
    if (document.querySelector('.project-link-btn')) {
        initProjectModal();
    }
});

// Export functions for potential external use
window.ProjectManager = {
    filterProjects,
    showProjectModal,
    closeModal
};
