
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

        function updateCounter() {
            if (messageField && counter) {
                counter.textContent = messageField.value.length + " / 200";
            }
        }

        if (messageField) {
            messageField.addEventListener("input", updateCounter);
            updateCounter();
        }

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let isValid = true;

            [nameError, emailError, messageError].forEach(function (element) {
                if (element) {
                    element.textContent = "";
                    element.classList.remove("error");
                }
            });

            if (result) {
                result.textContent = "";
                result.classList.remove("error", "success");
            }

            function showError(element, message) {
                if (element) {
                    element.textContent = message;
                    element.classList.add("error");
                }
                isValid = false;
            }

            const name = nameField ? nameField.value.trim() : "";
            const email = emailField ? emailField.value.trim() : "";
            const message = messageField ? messageField.value.trim() : "";

            if (name.length < 3) {
                showError(nameError, "Name must be at least 3 characters.");
            }

            if (!email.includes("@") || !email.includes(".")) {
                showError(emailError, "Please enter a valid email.");
            }

            if (message.length < 10) {
                showError(messageError, "Message must be at least 10 characters.");
            }

            if (isValid && result) {
                result.textContent = "Thank you, " + name + "! Your message is ready.";
                result.classList.add("success");
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
