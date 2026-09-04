// Arjay Moldez Portfolio JavaScript

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const sidebar = document.getElementById("sidebar");
    const menuOpen = document.getElementById("menuOpen");
    const menuClose = document.getElementById("menuClose");
    const themeToggle = document.getElementById("themeToggle");
    const fontToggle = document.getElementById("fontToggle");
    const yearElement = document.getElementById("year");

    // Current year
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile menu
    if (menuOpen && sidebar) {
        menuOpen.addEventListener("click", function () {
            sidebar.classList.add("open");
        });
    }

    if (menuClose && sidebar) {
        menuClose.addEventListener("click", function () {
            sidebar.classList.remove("open");
        });
    }

    // Close mobile menu after clicking a navigation link
    const sideLinks = document.querySelectorAll(".side-nav a");

    sideLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (sidebar) {
                sidebar.classList.remove("open");
            }
        });
    });

    // Dark mode
    if (localStorage.getItem("portfolio-theme") === "dark") {
        body.classList.add("dark");

        if (themeToggle) {
            themeToggle.textContent = "☾";
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            body.classList.toggle("dark");

            const isDark = body.classList.contains("dark");

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            themeToggle.textContent = isDark ? "☾" : "☼";
        });
    }

    // Font size toggle
    let largeText = false;

    if (fontToggle) {
        fontToggle.addEventListener("click", function () {
            largeText = !largeText;

            document.documentElement.style.fontSize =
                largeText ? "110%" : "";
        });
    }

    // Highlight the current sidebar section
    const sections = document.querySelectorAll(".section-anchor");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.id;

                    sideLinks.forEach(function (link) {
                        const href = link.getAttribute("href");

                        link.classList.toggle(
                            "active",
                            href === "#" + id
                        );
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", function (event) {

        // Alt + K = scroll to email/contact
        if (
            event.altKey &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();

            const email = document.querySelector(".email-link");

            if (email) {
                email.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }

        // Alt + J = change font size
        if (
            event.altKey &&
            event.key.toLowerCase() === "j"
        ) {
            event.preventDefault();

            if (fontToggle) {
                fontToggle.click();
            }
        }

        // Escape = close mobile menu
        if (event.key === "Escape") {
            if (sidebar) {
                sidebar.classList.remove("open");
            }
        }
    });
});