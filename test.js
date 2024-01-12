function generateGuessLine() {
  let hiddenLine = "_";
  let newLine = "";
  for (let i = 0; i < hiddenWord.length - 1; i++) {
    hiddenLine = hiddenLine + "_";
  }
  console.log(hiddenLine);
}

function convertToGuessLine(hiddenWord) {
  return "_".repeat(hiddenWord.length);
}
const hiddenWord = "TEST";

const guessLine = convertToGuessLine(hiddenWord);

console.log(guessLine);
