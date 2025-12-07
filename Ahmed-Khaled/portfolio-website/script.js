// ===== Smooth Scroll Effect =====
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    document.getElementById("nav-links").classList.remove("show");
  });
});

// ===== Fade-In on Scroll =====
const sections = document.querySelectorAll("section");
const options = { threshold: 0.2 };
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, options);
sections.forEach(section => observer.observe(section));

// ===== Active Navbar Highlight =====
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ===== Hamburger Toggle =====
const menuToggle = document.getElementById("menu-toggle");
const navLinksContainer = document.getElementById("nav-links");
menuToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("show");
});
