let time = document.querySelector("input");
let div = document.querySelector(".text");
let button = document.querySelector("button");
let alarm = document.querySelector("audio");

let target;

const timer = function () {
  button.addEventListener("click", () => {
    let today = new Date();
    target = time.value.split(":");
    if (target.length == 1) return;

    let targetTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      target[0],
      target[1]
    );

    targetTime = targetTime.getTime();

    const seconds = (targetTime - today) / 1000;
    const hoursLeft = Math.floor(seconds / 3600) % 24;
    const minutesLeft = Math.floor(seconds / 60) % 60;

    button.style.backgroundColor = "lightgreen";
    button.style.borderRadius = "0.3rem";

    div.textContent = `Alarm set for ${hoursLeft} hour${
      hoursLeft > 1 || hoursLeft == 0 ? "s" : ""
    } and ${minutesLeft} minute${
      minutesLeft > 1 || minutesLeft == 0 ? "s" : ""
    } from now`;

    setTimeout(() => {
      div.textContent = "";
    }, 5000);

    chrome.runtime.sendMessage({ targetTime }, (response) => {
      if (response.message == "play") {
        alarm.play();
        div.innerHTML = `<button>Snooze</button>
        <button>Dismiss</button>`;

        const buttons = div.querySelectorAll("button");
        const snooze = buttons[0];
        const dismiss = buttons[1];

        snooze.addEventListener("click", () => {
          alarm.pause();
          div.style.display = "none"
          
          setTimeout(() => {
            alarm.play();
            div.style.display = "block";
          }, 180000);
        });

        dismiss.addEventListener("click", () => {
          alarm.pause();
          alarm.currentTime = 0;
          div.innerHTML = "";
        });
      }
    });
  });
};

timer();
