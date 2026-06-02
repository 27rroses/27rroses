/* ==========================================================================
   PORTFOLIO INTERACTION & LIGHTBOX ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic active navigation links underline
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");
    
    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });

    // 2. Initialize the Lightbox click listener on all images
    initializeLightbox();
});

function initializeLightbox() {
    // Select all image wrappers across single entries and series stacks
    const imageWrappers = document.querySelectorAll(".image-wrapper");

    imageWrappers.forEach(wrapper => {
        // Change cursor to a magnifying glass over images
        wrapper.style.cursor = "zoom-in";

        wrapper.addEventListener("click", (e) => {
            e.preventDefault();
            
            const clickedImg = wrapper.querySelector("img");
            if (!clickedImg) return;

            // Create the dark ambient backdrop overlay
            const overlay = document.createElement("div");
            overlay.className = "lightbox-overlay";

            // Create the expanded image frame copy
            const enlargedImg = document.createElement("img");
            enlargedImg.src = clickedImg.src;
            enlargedImg.className = "lightbox-image";

            // Build the architecture
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            // Prevent background page scrolling while viewing item
            document.body.style.overflow = "hidden";

            // Smooth fade-in presentation transition
            setTimeout(() => {
                overlay.classList.add("active");
            }, 10);

            // Click anywhere on the overlay to close it smoothly
            overlay.addEventListener("click", () => {
                overlay.classList.remove("active");
                document.body.style.overflow = ""; // Restore scrolling
                
                setTimeout(() => {
                    overlay.remove();
                }, 400); // Matches CSS fade out time
            });
        });
    });
}