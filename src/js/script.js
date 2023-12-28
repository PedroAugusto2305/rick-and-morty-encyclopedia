const navLinks = document.querySelectorAll(".filter-nav__link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("active")) {
      removeActiveLink();
    }
    link.classList.toggle("active");
  });
});

function removeActiveLink() {
  navLinks.forEach((actLink) => {
    actLink.classList.remove("active");
  });
}
// scroll horizontal
(function () {
  function scrollHorizontally(e) {
    e = e || window.event;
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.querySelector(".filter-nav").scrollLeft -= delta * 40;
    e.preventDefault();
  }
  if (document.querySelector(".filter-nav").addEventListener) {
    document
      .querySelector(".filter-nav")
      .addEventListener("mousewheel", scrollHorizontally, false);
    document
      .querySelector(".filter-nav")
      .addEventListener("DOMMouseScroll", scrollHorizontally, false);
  } else {
    document
      .querySelector(".filter-nav")
      .attachEvent("onmousewheel", scrollHorizontally);
  }
})();
