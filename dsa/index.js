import { qs } from "./questions.js";

const sectionDone = document.querySelector(".done");
const sectionRem = document.querySelector(".remaining");
const done = document.querySelector(".donumber");
const tbd = document.querySelector(".remainumber");

let current = [];

const loader = () => {
  done.textContent = `(${current.completed.length})`;
  tbd.textContent = `(${current.remaining.length})`;
  const boxes = Array.from(document.querySelectorAll(".check"));
  boxes.forEach((question) => {
    question.addEventListener("change", (e) => {
      if (e.target.checked) {
        const qt = question.nextElementSibling.textContent;
        current.completed.push({
          name: qt,
          link: current.remaining.find((q) => q.name == qt).link,
        });
        current.remaining = current.remaining.filter((q) => q.name != qt);
        done.textContent = `(${current.completed.length})`;
        tbd.textContent = `(${current.remaining.length})`;
        localStorage.setItem("questions", JSON.stringify(current));
        domLoad();
      } else {
        const qt = question.nextElementSibling.textContent;
        current.remaining.push({
          name: qt,
          link: current.completed.find((q) => q.name == qt).link,
        });
        current.completed = current.completed.filter((q) => q.name != qt);
        localStorage.setItem("questions", JSON.stringify(current));
        domLoad();
      }
    });
  });
};

const questionLoader = () => {
  for (let { name, link } of current.completed) {
    sectionDone.innerHTML += `
            <div class="box">
              <input type="checkbox" class="check" checked> <a href="${link}" target="_blank">${name}</a>
            </div>
          `;
  }
  for (let { name, link } of current.remaining) {
    sectionRem.innerHTML += `
            <div class="box">
              <input type="checkbox" class="check"> <a href="${link}" target="_blank">${name}</a>
            </div>
          `;
  }
};

const domLoad = () => {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  if (questions.length == 0) current = qs;
  else current = questions;
  sectionDone.innerHTML = "";
  sectionRem.innerHTML = "";
  questionLoader();
  loader();
};

document.addEventListener("DOMContentLoaded", domLoad);
