async function getDefinition(word) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const displayDefinition = (definition) => {
    const display = definition.map((data) => {
      const { definition, example } = data;
      return `
        <div id="definition">
          <h3>definition</h3>
          <p>${definition}</p>
          ${example ? `<p>example: ${example}</p>` : ""}
        </div>
      `;
    });
    return display.join("");
  };

  const antonyms = data[0].meanings.map((meaning) => {
    const { antonyms, definitions, partOfSpeech, synonyms } = meaning;
    return `
      <div class="meaning">
        <p><strong>part of speech</strong>: ${partOfSpeech}</p>
        <p><strong>synonyms</strong>: ${synonyms.join(", ")}</p>
        <p><strong>antonyms</strong>: ${antonyms.join(", ")}</p>
        <div class="definition">
          ${displayDefinition(definitions)}
        </div>
      </div>
    `;
  });

  $("#meanings").html(antonyms.join(""));
}

$(window).on("keypress", (e) => {
  if (e.key == "Enter") {
    getDefinition($("#input-el").val());
  }
});

$("#search-btn").on("click", () => {
  getDefinition($("#input-el").val());
});
