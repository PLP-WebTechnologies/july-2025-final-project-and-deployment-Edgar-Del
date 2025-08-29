// Contact Page JavaScript
// Handles form validation, submission, and FAQ functionality

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initFormAnimations();
    initContactValidation();
});

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all fields before submission
    if (!validateForm(form)) {
        Utils.showNotification('Please fix the errors in the form.', 'error');
        return;
    }
    
    // Show loading state
    Utils.addLoadingState(submitButton);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Simulate API response
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            showFormSuccess(form);
            Utils.showNotification('Message sent successfully!', 'success');
        } else {
            Utils.showNotification('Failed to send message. Please try again.', 'error');
        }
        
        Utils.removeLoadingState(submitButton);
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !Utils.validateRequired(value)) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value && !Utils.validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    }
    
    // Length validation
    if (fieldName === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }
    
    if (fieldName === 'name' && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long.';
    }
    
    if (fieldName === 'subject' && value.length < 5) {
        isValid = false;
        errorMessage = 'Subject must be at least 5 characters long.';
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    field.classList.add('error');
    field.style.borderColor = '#dc2626';
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('error');
    field.style.borderColor = '';
}

function getFieldLabel(field) {
    const label = field.previousElementSibling;
    return label ? label.textContent.replace(' *', '') : field.name;
}

function showFormSuccess(form) {
    const formContainer = form.closest('.contact-form-container');
    const successMessage = document.getElementById('formSuccess');
    
    if (formContainer && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Show form again after 5 seconds
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            toggleFAQ(item);
        });
    });
}

function toggleFAQ(item) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
    }
}

// Form Animations
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced Contact Validation
function initContactValidation() {
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    if (emailField) {
        emailField.addEventListener('input', function() {
            validateEmailRealTime(this);
        });
    }
    
    if (messageField) {
        messageField.addEventListener('input', function() {
            validateMessageRealTime(this);
        });
    }
}

function validateEmailRealTime(field) {
    const value = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value && !emailRegex.test(value)) {
        field.style.borderColor = '#dc2626';
        field.style.backgroundColor = '#fef2f2';
    } else {
        field.style.borderColor = '';
        field.style.backgroundColor = '';
    }
}

function validateMessageRealTime(field) {
    const value = field.value.trim();
    const charCount = value.length;
    const minLength = 10;
    
    // Add character counter
    let counter = field.parentNode.querySelector('.char-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: 0.875rem;
            color: #64748b;
            text-align: right;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(counter);
    }
    
    counter.textContent = `${charCount}/${minLength} characters`;
    
    if (charCount < minLength) {
        counter.style.color = '#dc2626';
        field.style.borderColor = '#dc2626';
    } else {
        counter.style.color = '#10b981';
        field.style.borderColor = '#10b981';
    }
}

// Contact Method Interactions
function initContactMethodInteractions() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Social Link Interactions
function initSocialLinkInteractions() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Form Auto-save (localStorage)
function initFormAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formInputs = form.querySelectorAll('input, textarea, select');
    
    // Load saved data
    formInputs.forEach(input => {
        const savedValue = localStorage.getItem(`contact_${input.name}`);
        if (savedValue) {
            input.value = savedValue;
        }
    });
    
    // Save data on input
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            localStorage.setItem(`contact_${this.name}`, this.value);
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', function() {
        formInputs.forEach(input => {
            localStorage.removeItem(`contact_${input.name}`);
        });
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initContactMethodInteractions();
    initSocialLinkInteractions();
    initFormAutoSave();
});

// Export functions for potential external use
window.ContactManager = {
    validateForm,
    validateField,
    showFieldError,
    clearFieldError,
    toggleFAQ
};

// Add enhanced form styles
const enhancedFormStyles = document.createElement('style');
enhancedFormStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc2626 !important;
        background-color: #fef2f2;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .contact-method {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    .faq-item {
        transition: all 0.3s ease;
    }
    
    .faq-question {
        cursor: pointer;
        user-select: none;
    }
    
    .faq-question:hover {
        background-color: #f8fafc;
    }
    
    .char-counter {
        font-size: 0.875rem;
        margin-top: 0.25rem;
        text-align: right;
    }
    
    @media (max-width: 768px) {
        .contact-method {
            padding: 1rem;
        }
        
        .social-link {
            padding: 0.75rem;
        }
    }
`;
document.head.appendChild(enhancedFormStyles);
