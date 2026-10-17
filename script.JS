
/* ======================================
   ARAF KHAN DIGITAL STUDIO
   WEBSITE INTERACTIONS
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION MENU
    const menuButton = document.querySelector(
        ".menu-toggle, .menu-btn, #menu-toggle"
    );

    const navLinks = document.querySelector(
        ".nav-links, .navbar nav"
    );

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 2. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 3. CONTACT FORM VALIDATION
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");
  const messageField = document.querySelector("#message");

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const messageError = document.querySelector("#messageError");

  const counter = document.querySelector("#counter");
  const result = document.querySelector("#result");

  // Count message characters
  if (messageField && counter) {
    messageField.addEventListener("input", function () {
      counter.textContent = messageField.value.length;
    });
  }

  // Validate the form
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
    if (messageError) messageError.textContent = "";
    if (result) result.textContent = "";

    if (!nameField || nameField.value.trim() === "") {
      if (nameError) nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailField || !emailPattern.test(emailField.value.trim())) {
      if (emailError) emailError.textContent = "Please enter a valid email.";
      isValid = false;
    }

    if (!messageField || messageField.value.trim() === "") {
      if (messageError) messageError.textContent = "Please enter a message.";
      isValid = false;
    }

    if (isValid && result) {
      result.textContent =
        "Thank you, " + nameField.value.trim() + "! Your form is ready.";
      contactForm.reset();

      if (counter) counter.textContent = "0";
    }
  });
}
    

    // 4. BUTTON CLICK FEEDBACK
    document.querySelectorAll("[data-scroll]").forEach(function (button) {
        button.addEventListener("click", function () {
            const selector = button.getAttribute("data-scroll");
            const target = selector
                ? document.querySelector(selector)
                : null;

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 5. REVEAL ELEMENTS WHEN SCROLLING
    const revealElements = document.querySelectorAll(
        ".service-card, .service-item, .portfolio-card, " +
        ".project-card, .feature-card, .testimonial-card"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            element.classList.add("reveal");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // 6. CURRENT YEAR IN FOOTER
    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
