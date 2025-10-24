// JavaScript animations for header elements
document.addEventListener('DOMContentLoaded', function() {
    const headerLinks = document.querySelectorAll('#header1 li.hyperlink a');
    const brackets = document.querySelectorAll('#header1 li.brackets');
    
    // Add mouse enter animation
    headerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Scale up slightly
            this.style.transform = 'scale(1.05)';
               
            // Add pulsing glow effect
            this.style.animation = 'pulseGlow 1.5s infinite alternate';
        });
               
        link.addEventListener('mouseleave', function() {
            // Reset to normal state
            this.style.transform = 'scale(1)';
            this.style.animation = 'none';
        });
    });
            
    // Add animation to brackets when hovering over adjacent links
    headerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Find adjacent brackets
            const prevBracket = this.parentElement.previousElementSibling;
            const nextBracket = this.parentElement.nextElementSibling;
                
            if (prevBracket && prevBracket.classList.contains('brackets')) {
                animateBracket(prevBracket);
            }
            if (nextBracket && nextBracket.classList.contains('brackets')) {
                animateBracket(nextBracket);
            }
        });
    });
            
    function animateBracket(bracket) {
        // Add a subtle animation to brackets
        bracket.style.transform = 'scale(1.2)';
        bracket.style.color = '#2b78d1';
        bracket.style.transition = 'all 0.3s ease';
                
        // Reset after animation
        setTimeout(() => {
            bracket.style.transform = 'scale(1)';
            bracket.style.color = 'white';
        }, 300);
    }
            
    // Add click animation
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
                    
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
                    
            // Remove ripple element after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
                    
            // Navigate after animation (in a real scenario)
            setTimeout(() => {
                // window.location.href = this.getAttribute('href');
                console.log(`Navigating to: ${this.getAttribute('href')}`);
            }, 300);
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseGlow {
        0% {
            box-shadow: 0 0 5px #2b78d1, 0 0 10px #2b78d1;
        }
        100% {
            box-shadow: 0 0 15px #2b78d1, 0 0 30px #2b78d1, 0 0 40px #2b78d1;
        }
    }
            
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);