const input = document.querySelector("input");
const search = document.querySelector("button");
const selector = document.querySelector("select");
const results = document.querySelector(".results")
let word = "";
let mode = "ml";

input.addEventListener("keyup", (e) => {
  word = e.target.value;
  console.log("word", word)
  if (e.key == "Enter") wordplay();
});

selector.addEventListener("change", (e) => {
  let value = e.target.value;
  switch (value) {
    case "mean":
      mode = "ml";
      break;
    case "sound":
      mode = "sl";
      break;
    case "spell":
      mode = "sp";
      break;
    case "rhyme":
      mode = "rel_rhy";
      break;
  }
  console.log(value);
  console.log("word", word);
});

search.addEventListener("click", wordplay);

async function wordplay() {
  results.innerHTML = ""
  let url = `https://api.datamuse.com/words?${mode}=${word}`;
  if (word == "") alert("Enter a word or phrase!");
  else {
    try {
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      data.forEach((wordObj) => {
        results.innerHTML += `<p>${wordObj.word}<p>`
      })
    } catch (error) {
      console.log("ERROR! ", error);
    }
  }
}
