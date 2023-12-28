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

// API consuming

document.addEventListener("DOMContentLoaded", async () => {
  const gridContainer = document.querySelector(".characters-page__grid");

  const fetchCharacters = async (start, end) => {
    const characters = [];
    for (let i = start; i <= end; i++) {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${i}`
        );
        const characterData = await response.json();
        characters.push(characterData);
      } catch (error) {
        console.error("Erro ao carregar personagem:", error);
      }
    }
    return characters;
  };

  const createCharacterCard = (character) => {
    const card = document.createElement("div");
    card.className = "characters-page__card__container";

    card.innerHTML = `
          <article class="characters-page__card" style="background-image: linear-gradient(180deg, #06090f00 0%, #06090f 80.79%), url('${character.image}');">
            <h3 class="characters-page__card__subtitle">${character.species}</h3>
          </article>
          <h2 class="characters-page__card__title" style="text-align: center;">${character.name}</h2>
    `;

    return card;
  };

  const characters = await fetchCharacters(1, 12);
  characters.forEach((character) => {

    const characterCard = createCharacterCard(character);
    gridContainer.appendChild(characterCard);
  });
});
