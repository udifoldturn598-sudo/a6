document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal observer
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-seen');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach((el) => {
            observer.observe(el);
        });
    }

    // Concentric Target Gauges Animation
    const targets1 = document.querySelectorAll('.gauge-target-1');
    const targets2 = document.querySelectorAll('.gauge-target-2');
    
    const animateCircle = (circle, value, circumference) => {
        const targetOffset = circumference - (circumference * value / 100);
        let currentOffset = circumference;
        const speed = 3.5;
        
        const animate = () => {
            if (currentOffset > targetOffset) {
                currentOffset -= speed;
                circle.style.strokeDashoffset = currentOffset;
                requestAnimationFrame(animate);
            } else {
                circle.style.strokeDashoffset = targetOffset;
            }
        };
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(animate, 100);
    };

    if (targets1.length > 0) {
        const targetObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const c1 = entry.target;
                    const value = parseInt(c1.getAttribute('data-value'), 10);
                    animateCircle(c1, value, 251.2);
                    
                    // Find brother inner circle
                    const parent = c1.closest('.target-svg-container');
                    const c2 = parent.querySelector('.gauge-target-2');
                    if (c2) {
                        animateCircle(c2, value * 0.85, 175.9);
                    }
                    
                    targetObserver.unobserve(c1);
                }
            });
        }, {
            threshold: 0.5
        });

        targets1.forEach(t => targetObserver.observe(t));
    }
});
