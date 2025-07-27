/**
 * L'Oréal Website Clone - JavaScript Module
 * Handles all interactive functionality and user experience enhancements
 */

// Main application object to avoid global namespace pollution
const LorealApp = {
    // Configuration
    config: {
        searchDelay: 300,
        animationDuration: 300,
        scrollOffset: 80
    },

    // Initialize the application
    init() {
        this.bindEvents();
        this.setupSearch();
        this.setupNavigation();
        this.setupButtons();
        this.setupAccessibility();
        console.log('L\'Oréal website initialized successfully');
    },

    // Bind all event listeners
    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMReady();
        });

        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 100));

        window.addEventListener('resize', this.throttle(() => {
            this.handleResize();
        }, 250));
    },

    // Handle DOM ready state
    handleDOMReady() {
        this.setupAnimations();
        this.preloadImages();
    },

    // Setup search functionality
    setupSearch() {
        const searchInput = document.querySelector('input[type="text"]');
        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, this.config.searchDelay);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(e.target.value);
            }
        });

        // Add search icon click handler
        const searchIcon = document.querySelector('.fa-search');
        if (searchIcon) {
            searchIcon.addEventListener('click', () => {
                this.performSearch(searchInput.value);
            });
        }
    },

    // Handle search input changes
    handleSearch(query) {
        if (query.length > 2) {
            console.log('Searching for:', query);
            // Here you would typically make an API call
            this.showSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    },

    // Perform actual search
    performSearch(query) {
        if (!query.trim()) return;
        
        console.log('Performing search for:', query);
        alert(`Search functionality would be implemented here for: "${query}"`);
        
        // Analytics tracking (demo)
        this.trackEvent('search', 'perform', query);
    },

    // Show search suggestions (demo)
    showSearchSuggestions(query) {
        // This would typically show a dropdown with suggestions
        console.log('Showing suggestions for:', query);
    },

    // Hide search suggestions
    hideSearchSuggestions() {
        console.log('Hiding search suggestions');
    },

    // Setup smooth scrolling navigation
    setupNavigation() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    },

    // Smooth scroll to element
    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - this.config.scrollOffset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Setup button interactions
    setupButtons() {
        const buttons = document.querySelectorAll('button, .btn-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e, button);
            });

            // Add loading state functionality
            button.addEventListener('mousedown', () => {
                this.addButtonLoadingState(button);
            });
        });
    },

    // Handle button clicks
    handleButtonClick(event, button) {
        const buttonText = button.textContent.trim();
        
        // Prevent default for buttons without href
        if (!button.getAttribute('href')) {
            event.preventDefault();
        }

        console.log('Button clicked:', buttonText);
        
        // Track button clicks
        this.trackEvent('button', 'click', buttonText);

        // Handle specific button actions
        switch (buttonText.toLowerCase()) {
            case 'see more':
                this.handleSeeMore();
                break;
            case 'discover':
                this.handleDiscover();
                break;
            case 'find out more about l\'oréal':
                this.handleLearnMore();
                break;
            default:
                this.handleGenericButton(buttonText);
        }
    },

    // Add loading state to button
    addButtonLoadingState(button) {
        button.classList.add('btn-loading');
        
        setTimeout(() => {
            button.classList.remove('btn-loading');
        }, 1000);
    },

    // Handle "See More" button
    handleSeeMore() {
        console.log('Showing more content...');
        // Scroll to stories section
        const storiesSection = document.querySelector('section:nth-of-type(2)');
        if (storiesSection) {
            this.smoothScrollTo(storiesSection);
        }
    },

    // Handle "Discover" button
    handleDiscover() {
        console.log('Discovering content...');
        // Scroll to featured content
        const featuredSection = document.querySelector('section:nth-of-type(3)');
        if (featuredSection) {
            this.smoothScrollTo(featuredSection);
        }
    },

    // Handle "Learn More" button
    handleLearnMore() {
        console.log('Learning more about L\'Oréal...');
        alert('This would typically navigate to an about page or show more information.');
    },

    // Handle generic button clicks
    handleGenericButton(buttonText) {
        console.log(`Generic button action for: ${buttonText}`);
    },

    // Setup accessibility features
    setupAccessibility() {
        // Add keyboard navigation support
        this.setupKeyboardNavigation();
        
        // Add ARIA labels where needed
        this.enhanceARIA();
        
        // Setup focus management
        this.setupFocusManagement();
    },

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Handle escape key
            if (e.key === 'Escape') {
                this.handleEscape();
            }
            
            // Handle tab navigation
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    },

    // Enhance ARIA attributes
    enhanceARIA() {
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput && !searchInput.getAttribute('aria-label')) {
            searchInput.setAttribute('aria-label', 'Search L\'Oréal website');
        }

        // Add role attributes to navigation
        const nav = document.querySelector('nav');
        if (nav && !nav.getAttribute('role')) {
            nav.setAttribute('role', 'navigation');
        }
    },

    // Setup focus management
    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },

    // Handle escape key press
    handleEscape() {
        // Close any open modals or dropdowns
        this.hideSearchSuggestions();
        
        // Remove focus from current element
        if (document.activeElement) {
            document.activeElement.blur();
        }
    },

    // Handle tab navigation
    handleTabNavigation(event) {
        // Custom tab navigation logic if needed
        console.log('Tab navigation');
    },

    // Setup animations
    setupAnimations() {
        // Intersection Observer for fade-in animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe elements that should animate
            const animateElements = document.querySelectorAll('.fade-in');
            animateElements.forEach(el => observer.observe(el));
        }
    },

    // Preload important images
    preloadImages() {
        const imagesToPreload = [
            // Add any critical images here
        ];

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    },

    // Handle scroll events
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scroll-based effects here
        if (scrollTop > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    },

    // Handle resize events
    handleResize() {
        // Handle responsive behavior
        console.log('Window resized');
    },

    // Analytics tracking (demo)
    trackEvent(category, action, label) {
        console.log('Analytics Event:', { category, action, label });
        
        // Here you would integrate with your analytics service
        // Example: gtag('event', action, { category, label });
    },

    // Utility function: Throttle
    throttle(func, limit) {
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
    },

    // Utility function: Debounce
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};

// Initialize the application
LorealApp.init();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LorealApp;
}

// ===============================
// AI Chatbot Feature
// ===============================

// Store conversation history
let chatbotMessages = [
  { role: "system", content: "You are a helpful assistant." }
];

// Wait for DOM to be ready before accessing chatbot elements
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements for chatbot
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotMessagesDiv = document.getElementById("chatbotMessages");

  // Toggle chat window visibility
  if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener("click", () => {
      if (chatbotWindow.style.display === "none") {
        chatbotWindow.style.display = "flex";
        chatbotToggle.textContent = "Close Chat";
        renderChatbotMessages();
      } else {
        chatbotWindow.style.display = "none";
        chatbotToggle.textContent = "Chat with AI";
      }
    });
  }

  // Handle sending a message
  if (chatbotForm && chatbotInput && chatbotMessagesDiv) {
    chatbotForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userMsg = chatbotInput.value.trim();
      if (!userMsg) return;

      // Add user message to history
      chatbotMessages.push({ role: "user", content: userMsg });
      renderChatbotMessages();
      chatbotInput.value = "";

      // Show loading message
      chatbotMessagesDiv.innerHTML += `<div style=\"color: #888;\">AI is typing...</div>`;

      // Fetch AI response from Cloudflare Worker
      try {
        // Replace with your actual Cloudflare Worker URL
        const response = await fetch("https://chill-worker.mikkaeldumancas.workers.dev/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatbotMessages })
        });
        const data = await response.json();

        // Get AI reply from OpenAI response
        const aiReply = data.choices[0].message.content;
        chatbotMessages.push({ role: "assistant", content: aiReply });
        renderChatbotMessages();
      } catch (err) {
        chatbotMessagesDiv.innerHTML += `<div style=\"color: red;\">Error: Could not get AI response.</div>`;
      }
    });
  }

  // Render conversation history in chat window
  function renderChatbotMessages() {
    chatbotMessagesDiv.innerHTML = "";
    chatbotMessages.forEach(msg => {
      if (msg.role === "user") {
        chatbotMessagesDiv.innerHTML += `<div style=\"text-align: right; margin: 6px 0;\"><b>You:</b> ${msg.content}</div>`;
      } else if (msg.role === "assistant") {
        chatbotMessagesDiv.innerHTML += `<div style=\"text-align: left; margin: 6px 0;\"><b>AI:</b> ${msg.content}</div>`;
      }
    });
    chatbotMessagesDiv.scrollTop = chatbotMessagesDiv.scrollHeight;
  }
});

// /* DOM elements */
// const chatForm = document.getElementById("chatForm");
// const userInput = document.getElementById("userInput");
// const chatWindow = document.getElementById("chatWindow");

// // Set initial message
// chatWindow.textContent = "👋 Hello! How can I help you today?";

// /* Handle form submit */
// chatForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // When using Cloudflare, you'll need to POST a `messages` array in the body,
//   // and handle the response using: data.choices[0].message.content

//   // Show message
//   chatWindow.innerHTML = "Connect to the OpenAI API for a response!";
// });
