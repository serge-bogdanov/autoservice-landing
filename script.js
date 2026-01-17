const body = document.body
const burger = document.querySelector(".burger")
const menu = document.querySelector(".header__menu")
const menuLinks = document.querySelectorAll(".header__menu-link")


burger.addEventListener("click", () => {
  body.classList.toggle("active-menu")
})

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("active-menu")
  })
})

if (document.documentElement.offsetWidth <= 1180) {
  const menuLogo = document.querySelector(".logo").cloneNode(true)
  menuLogo.classList.add("menu__logo")
  menu.prepend(menuLogo)

  const menuPhoneNumber = document.createElement("a")
  menuPhoneNumber.textContent = "8 927 997 12 42"
  menuPhoneNumber.setAttribute("href", "mailto:+79279971242")
  menuPhoneNumber.classList.add("menu__number")
  menu.append(menuPhoneNumber)

  const menuCopyright = document.querySelector(".footer__copyright").cloneNode(true)
  menuCopyright.classList.add("menu__copyright")
  const menuSocials = document.querySelector(".footer__contact-value-socials").cloneNode(true)
  menuSocials.classList.add("menu__socials")
  menu.append(menuSocials)
  menu.append(menuCopyright)

}

const prevButton = document.querySelector("[data-js-prev-button]")
const nextButton = document.querySelector("[data-js-next-button]")
const track = document.querySelector("[data-js-track]")

const getStep = () => {
  const slide = track.firstElementChild;
  if (!slide) {
    return 0;
  }
  const slideWidth = slide.getBoundingClientRect().width;
  const slideGap = parseInt(getComputedStyle(track).getPropertyValue("--slides-gap"));
  return slideWidth + slideGap;
}


prevButton.addEventListener("click", () => {
  track.scrollBy({ left: -getStep(), behavior: "smooth" })
})
nextButton.addEventListener("click", () => {
  track.scrollBy({ left: getStep(), behavior: "smooth" })
})