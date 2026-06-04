document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.style.display =
                mobileMenu.style.display === "block"
                    ? "none"
                    : "block";
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.style.display = "none";
            });
        });

        document.addEventListener("click", () => {
            mobileMenu.style.display = "none";
        });
    }

    const contactForm = document.querySelector(".developer-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const data = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value
            };

            try {

                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.text();

                if (response.ok) {
                    alert("✅ Message sent successfully!");
                    contactForm.reset();
                    console.log(result);
                } else {
                    alert("❌ Form submission failed!");
                    console.error(result);
                }

            } catch (error) {
                console.error(error);
                alert("❌ Network error!");
            }
        });
    }
});