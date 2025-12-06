        document.addEventListener('DOMContentLoaded', function() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            const animateSkillBars = () => {
                skillBars.forEach(bar => {
                    const barPosition = bar.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.2;
                    
                    if(barPosition < screenPosition) {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    }
                });
            };
            
            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });
            
            window.addEventListener('scroll', animateSkillBars);
            
            animateSkillBars();
            
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const subject = this.querySelector('input[placeholder="Subject"]').value;
    const message = this.querySelector('textarea[placeholder="Your Message"]').value;

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Failed to submit form");
        }
        return res.json();
    })
    .then(data => {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();   
    })
    .catch(err => {
        alert("Something went wrong!");   
        console.error(err);
    });
});




            
            window.addEventListener('scroll', function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.style.backgroundColor = 'rgba(26, 37, 47, 0.95)';
                    navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.backgroundColor = 'var(--primary-color)';
                    navbar.style.boxShadow = 'none';
                }
            });
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if(targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight / 1.2;

            if (barTop < windowHeight && bar.style.width === '0%') {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
            }
        });
    }

    progressBars.forEach(bar => bar.style.width = '0%');

    window.addEventListener('scroll', animateProgressBars);

    animateProgressBars();
});

