// When filtering option by type
export const setTypesInCombobox = (types) => {
  let htmlData = "";
  htmlData += types.map(type => {
    return `<option value="${type.name}">${type.name}</option>`
  });
  document.querySelector("#js-types").innerHTML = htmlData;
}

// When showing suggestions for user's input
export const getMatchingPokemons = (pokemons, currentInput) => {
  const matchedPokeNames = currentInput != "" ? pokemons.filter(pokemon => pokemon.pokemon.name.startsWith(currentInput)) : [];
  const firstFiveMatches = matchedPokeNames.slice(0, 5);
  return firstFiveMatches;
}

export const showSuggestions = (pokeNames) => {
  // Construct html for suggestions and insert
  let htmlData = pokeNames
  .map(pokeName => {
    return `<div class="suggestion-item">${pokeName.pokemon.name}</div>`;
  })
  .join("");
  htmlData = `<div class="suggestion-list">${htmlData}</div>`
  document.querySelector("#js-result").innerHTML = htmlData;

  // Add event listener for each suggestion to enable form submission upon click
  document.querySelectorAll(".suggestion-item")
  .forEach(suggestion => {
    // Play sound when a mouse hover over the suggestion
    suggestion.addEventListener("mouseover", (e)=>{
      const hoverSound = new Audio("/hover_sound.mp3");
      hoverSound.currentTime = 0;
      hoverSound.play();
    })

    // 
    suggestion.addEventListener("click", (e) => {
      // Play select sound
      const selectSound = new Audio("/select_sound.mp3");
      selectSound.play();

      // Fill out the input field and submit
      const $form = document.querySelector("#js-form");
      $form.elements.pokeName.value = e.target.textContent;
      $form.elements.submitBtn.click();
    });
  })

}
