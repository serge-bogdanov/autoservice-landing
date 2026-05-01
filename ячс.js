const images = [
  "https://placehold.co/800x400?text=Slice+1",
  "https://placehold.co/800x400?text=Slice+2",
  "https://placehold.co/800x400?text=Slice+3",
  "https://placehold.co/800x400?text=Slice+4",
  "https://placehold.co/800x400?text=Slice+5",
];

const slider = document.querySelector("[data-slider]");
const prevButton = document.querySelector("[data-btn-prev]");
const nextButton = document.querySelector("[data-btn-next]");

let currentIndex = 0;
const ANIMATION_TIME = 0.4;

function setupSlide() {
  images.forEach((imageUrl, index) => {
    const image = document.createElement("img");
    image.classList.add("slide-image");
    image.src = imageUrl;
    image.dataset.index = index;
    image.alt = `slide ${index + 1}`;

    slider.appendChild(image);
  });
  const firstClone = slider.firstElementChild.cloneNode(true);
  const lastClone = slider.lastElementChild.cloneNode(true);
  firstClone.classList.add("slide-image--clone");
  lastClone.classList.add("slide-image--clone");

  slider.append(firstClone);
  slider.prepend(lastClone);
}

function initSlider() {
  const slideWidth = slider.firstElementChild.offsetWidth;
  slider.style.transition = "none";
  slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
}

nextButton.addEventListener("click", goToNextSlide);
prevButton.addEventListener("click", goToPrevSlide);

function goToNextSlide() {
  const slideWidth = slider.firstElementChild.offsetWidth;

  currentIndex++;

  if (currentIndex <= images.length) {
    slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
    nextButton.disabled = true;

    setTimeout(() => {
      nextButton.disabled = false;
    }, ANIMATION_TIME * 900);
  }
  slider.addEventListener(
    "transitionend",
    () => {
      if (currentIndex >= images.length) {
        currentIndex = 0;
        slider.style.transition = "none";
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
      }
    },
    { once: true },
  );
}
function goToPrevSlide() {
  const slideWidth = slider.firstElementChild.offsetWidth;

  currentIndex--;

  slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
  slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
  prevButton.disabled = true;
  setTimeout(() => {
    prevButton.disabled = false;
  }, ANIMATION_TIME * 900);

  slider.addEventListener(
    "transitionend",
    () => {
      if (currentIndex < 0) {
        currentIndex = images.length - 1;
        slider.style.transition = "none";
        slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
      }
    },
    { once: true },
  );
}

setupSlide();
initSlider();

window.addEventListener("resize", initSlider);
