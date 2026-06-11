const animatedItems = document.querySelectorAll(
  ".fade-item, .project-card, .service-card, .proof-card, .testimonial-card"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

animatedItems.forEach(item => {
  item.classList.add("hidden");
  observer.observe(item);
});

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button");
    const formData = new FormData(contactForm);

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
    formMessage.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();
        formMessage.textContent = "Message sent. I’ll get back to you soon.";
        formMessage.classList.add("is-success");
        formMessage.classList.remove("is-error");
      } else {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.classList.add("is-error");
        formMessage.classList.remove("is-success");
      }
    } catch (error) {
      formMessage.textContent = "Something went wrong. Please try again.";
      formMessage.classList.add("is-error");
      formMessage.classList.remove("is-success");
    }

    submitButton.textContent = "Send message";
    submitButton.disabled = false;
  });
}

document.querySelectorAll(".mobile-carousel-wrap").forEach((wrap) => {
  const carousel = wrap.querySelector(".mobile-carousel, .project-grid, .reel-grid, .copy-grid");
  const leftArrow = wrap.querySelector(".carousel-arrow-left");
  const rightArrow = wrap.querySelector(".carousel-arrow-right");

  if (!carousel || !leftArrow || !rightArrow) return;

  function scrollCarousel(direction) {
    const card = carousel.querySelector(".project-card, .video-card, .copy-card");
    const gap = parseFloat(getComputedStyle(carousel).gap) || 18;

    const scrollAmount = card
      ? card.getBoundingClientRect().width + gap
      : carousel.clientWidth * 0.85;

    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  }

  rightArrow.addEventListener("click", () => scrollCarousel(1));
  leftArrow.addEventListener("click", () => scrollCarousel(-1));
});
