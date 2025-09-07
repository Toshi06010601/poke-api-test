// When showing suggestions for user's input
export const getMatchingPokemons = (pokemons, currentInput) => {
  const matchedPokeNames = currentInput != "" ? pokemons.filter(pokemon => pokemon.name.startsWith(currentInput)) : [];
  const firstFiveMatches = matchedPokeNames.slice(0, 5);
  return firstFiveMatches;
}

export const showSuggestions = (pokeNames) => {
  // Construct html for suggestions and insert
  const htmlData = pokeNames
  .map(pokeName => {
    return `<div class="suggestion">${pokeName.name}</div>`;
  })
  .join("");
  document.querySelector("#js-result").innerHTML = htmlData;

  // Add event listener for each suggestion to enable form submission upon click
  document.querySelectorAll(".suggestion")
  .forEach(suggestion => {
    suggestion.addEventListener("click", (e) => {
      const $form = document.querySelector("#js-form");
      $form.elements.pokeName.value = e.target.textContent;
      $form.elements.submitBtn.click();
    })
  })

}
