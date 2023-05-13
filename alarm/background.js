chrome.runtime.onMessage.addListener((message, sender, response) => {
  const { targetTime } = message;

  console.log(targetTime);

  async function count(targetTime) {
    let now = Date.now();
    let inSeconds = (targetTime - now) / 1000;
    console.log(inSeconds.toFixed(0));

    if (inSeconds < 0) {
      clearInterval(go);
      response({ message: "play" });      
    }
  }

  const go = setInterval(() => count(targetTime), 1000);

  return true;
});
