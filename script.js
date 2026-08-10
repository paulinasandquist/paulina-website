const animatedItems = document.querySelectorAll(
  ".fade-item, .project-card, .service-card, .proof-card, .testimonial-card"
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  animatedItems.forEach((item) => {
    item.classList.add("hidden");
    observer.observe(item);
  });
} else {
  animatedItems.forEach((item) => item.classList.add("show"));
}

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    const formData = new FormData(contactForm);

    if (submitButton) {
      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
    }

    formMessage.textContent = "";
    formMessage.classList.remove("is-success", "is-error");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      contactForm.reset();

      formMessage.textContent =
        "Message sent. I’ll get back to you soon.";

      formMessage.classList.add("is-success");
    } catch (error) {
      formMessage.textContent =
        "Something went wrong. Please try again.";

      formMessage.classList.add("is-error");
    } finally {
      if (submitButton) {
        submitButton.textContent = "Send message";
        submitButton.disabled = false;
      }
    }
  });
}

document
  .querySelectorAll(".mobile-carousel-wrap")
  .forEach((wrap) => {
    const carousel = wrap.querySelector(
      ".mobile-carousel, .project-grid, .reel-grid, .copy-grid"
    );

    const leftArrow = wrap.querySelector(
      ".carousel-arrow-left"
    );

    const rightArrow = wrap.querySelector(
      ".carousel-arrow-right"
    );

    if (!carousel || !leftArrow || !rightArrow) {
      return;
    }

    const scrollCarousel = (direction) => {
      const card = carousel.querySelector(
        ".project-card, .video-card, .copy-card"
      );

      const gap =
        Number.parseFloat(getComputedStyle(carousel).gap) || 18;

      const scrollAmount = card
        ? card.getBoundingClientRect().width + gap
        : carousel.clientWidth * 0.85;

      carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    };

    rightArrow.addEventListener("click", () => {
      scrollCarousel(1);
    });

    leftArrow.addEventListener("click", () => {
      scrollCarousel(-1);
    });
  });
