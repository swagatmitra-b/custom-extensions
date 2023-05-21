const input = document.querySelector("input");
const answer = document.querySelector(".result");
const fetching = document.querySelector(".fetching");
let query;

input.addEventListener("keyup", async (e) => {
  query = e.target.value;
  if (e.key == "Enter") {
    fetching.textContent = "Fetching data...";
    input.blur();
    chatReq();
  }
});

async function chatReq() {
  const url = "https://chatgpt53.p.rapidapi.com/";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "8f7fd4b5d0msh19b52b754d51cccp1a6032jsn25b130a95a35",
      "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: `${query}`,
        },
      ],
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    let reply = result.choices[0].message.content;
    fetching.style.display = "none";
    answer.innerHTML += `<p style="font-size: 1.1rem">${reply}<p>`;
  } catch (error) {
    console.error(error);
  }
}
