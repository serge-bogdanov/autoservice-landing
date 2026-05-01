const body = document.body;
const burger = document.querySelector(".burger");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__menu-link");

burger.addEventListener("click", () => {
  body.classList.toggle("active-menu");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("active-menu");
  });
});

const mediaQuery = window.matchMedia("(max-width: 1180px)");

function addMobileMenuElements() {
  if (document.querySelector(".menu__logo")) return;

  const menuLogo = document.querySelector(".logo").cloneNode(true);
  menuLogo.classList.add("menu__logo");
  menu.prepend(menuLogo);

  const menuPhoneNumber = document.createElement("a");
  menuPhoneNumber.textContent = "+7 (912) 974-78-98";
  menuPhoneNumber.setAttribute("href", "tel:+79129747898");
  menuPhoneNumber.classList.add("menu__number");
  menu.append(menuPhoneNumber);

  const menuSocials = document
    .querySelector(".footer__contact-value-socials")
    .cloneNode(true);
  menuSocials.classList.add("menu__socials");
  menu.append(menuSocials);

  const menuCopyright = document
    .querySelector(".footer__copyright")
    .cloneNode(true);
  menuCopyright.classList.add("menu__copyright");
  menu.append(menuCopyright);
}

function removeMobileMenuElements() {
  document.querySelector(".menu__logo")?.remove();
  document.querySelector(".menu__number")?.remove();
  document.querySelector(".menu__socials")?.remove();
  document.querySelector(".menu__copyright")?.remove();
}

function handleMobileMenu(e) {
  if (e.matches) {
    addMobileMenuElements();
  } else {
    removeMobileMenuElements();
    body.classList.remove("active-menu");
  }
}

mediaQuery.addEventListener("change", handleMobileMenu);
handleMobileMenu(mediaQuery);

function initCarousels() {
  const allCarousels = document.querySelectorAll("[data-js-carousel]");
  allCarousels.forEach((carousel) => {
    const track = document.querySelector("[data-js-track]");
    const prevButton = document.querySelector("[data-js-prev]");
    const nextButton = document.querySelector("[data-js-next]");

    let currentIndex = 0;
    
    const slideWidth = track.firstElementChild.offsetWidth;
    // track.style.transition = "none";
    // track.style.translate = `-${slideWidth * (currentIndex + 1)}px`;


    if (!track || !prevButton || !nextButton) return;

    const ANIMATION_TIME = 0.5;

    images = [...track.children];
  });
}

initCarousels();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#" || href === "#!") return;

    const targetElement = document.querySelector(href);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
  [
    ".solutions__card",
    ".about-us__item",
    ".guarantees__item",
    ".benefits__item",
    ".team__card",
    ".achievement__header-highlight",
  ].join(", "),
);

elementsToAnimate.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});

document.querySelectorAll(".button, .consult__button").forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.closest("form")) return;

    const consultSection = document.querySelector(".consult");
    if (consultSection) {
      consultSection.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        const input = document.querySelector(".consult__input");
        if (input) input.focus();
      }, 500);
    }
  });
});

const phoneInput = document.querySelector(".consult__input");
if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    let formattedValue = "+7 ";
    if (value.length > 1) formattedValue += `(${value.slice(1, 4)}`;
    if (value.length >= 4) formattedValue += `) ${value.slice(4, 7)}`;
    if (value.length >= 7) formattedValue += `-${value.slice(7, 9)}`;
    if (value.length >= 9) formattedValue += `-${value.slice(9, 11)}`;

    e.target.value = formattedValue;
  });
}

const consultForm = document.querySelector(".consult__form-body");
if (consultForm) {
  consultForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const phoneInput = consultForm.querySelector(".consult__input");
    const phoneValue = phoneInput.value.replace(/\D/g, "");

    if (phoneValue.length < 11) {
      showNotification("Пожалуйста, введите полный номер телефона", "error");
      phoneInput.focus();
      return;
    }

    const agreementCheckbox = consultForm.querySelector(
      ".consult__agree-checkbox",
    );
    if (!agreementCheckbox.checked) {
      showNotification(
        "Пожалуйста, согласитесь с политикой конфиденциальности",
        "error",
      );
      return;
    }

    showNotification("Спасибо! Мы перезвоним вам в течение 5 минут", "success");
    consultForm.reset();
    agreementCheckbox.checked = true;
  });
}

function showNotification(message, type = "success") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) existingNotification.remove();

  const notification = document.createElement("div");
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    background-color: ${type === "success" ? "#4CAF50" : "#f44336"};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .is-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(styleSheet);
