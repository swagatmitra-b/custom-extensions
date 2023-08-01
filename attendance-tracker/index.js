const attended = document.querySelector(".attended");
const totalDays = document.querySelector(".total");
const incrementer = Array.from(document.querySelectorAll(".incrementer"));
const decrementer = Array.from(document.querySelectorAll(".decrementer"));
const percentage = document.querySelector(".percentage");
const input = document.querySelector("input");
const selection = document.getElementById("selection");
const clearRecord = document.getElementById("clear-record");
const clearSubject = document.getElementById("clear-subject");
const deleteSubject = document.getElementById("delete-subject");

let dayCounter = 0;
let attendedCounter = 0;

let subjects = [];

clearRecord.onclick = () => {
  const postive = confirm(
    "Are you sure to clear all records across all subjects?"
  );
  if (postive) {
    localStorage.clear();
    subjects.length = 0;
    subjectLoader();
    clearRecord.disabled = true;
    location.reload();
  }
};

clearSubject.addEventListener("change", () => {
  deleteSubject.disabled = false;
});

deleteSubject.onclick = () => {
  if (!confirm('Are you sure you want to remove this subject?')) return;
  const subject = clearSubject.value;
  const index = subjects.indexOf(subject);
  subjects.splice(index, 1);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  localStorage.removeItem(subject);
  subjectLoader();
  location.reload();
};

onload = () => {
  const subjectArray = JSON.parse(localStorage.getItem("subjects")) || [];
  if (subjectArray.length == 0) return;
  else {
    clearRecord.disabled = false;
    subjects = subjectArray;
    subjectLoader();
    const subject = JSON.parse(localStorage.getItem(selection.value));
    if (!subject) return;
    let [attendedDays, total] = subject;
    forFuncSake(attendedDays, total);
  }
};

incrementer.forEach((button, i) => {
  button.addEventListener("click", () => {
    if (i == 0) {
      attendedCounter++;
      attended.innerText = attendedCounter;
      dayCounter !== 0 ? calculatePercent(attendedCounter, dayCounter) : null;
      saveData();
    } else if (i == 1) {
      dayCounter++;
      totalDays.innerText = dayCounter;
      dayCounter !== 0 ? calculatePercent(attendedCounter, dayCounter) : null;
      saveData();
    }
  });
});

decrementer.forEach((button, i) => {
  button.addEventListener("click", () => {
    if (i == 0) {
      attendedCounter !== 0 ? attendedCounter-- : null;
      attended.innerText = attendedCounter;
      dayCounter !== 0 ? calculatePercent(attendedCounter, dayCounter) : null;
      saveData();
    } else if (i == 1) {
      dayCounter !== 0 ? dayCounter-- : null;
      totalDays.innerText = dayCounter;
      dayCounter !== 0
        ? calculatePercent(attendedCounter, dayCounter)
        : (percentage.innerText = "0.00%");
      saveData();
    }
  });
});

function calculatePercent(attended, total) {
  const percent = (attended / total) * 100;
  if (total == 0) {
    percentage.textContent = "0%";
    return;
  }
  percentage.textContent = percent.toFixed(2) + "%";
}

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (subjects.includes(e.target.value) || e.target.value == " ") return;
    subjects.push(e.target.value);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    subjectLoader();
    clearRecord.disabled = false;
    input.value = '';
  }
});

document.addEventListener("DOMContentLoaded", subjectLoader);

function subjectLoader() {
  selection.innerHTML = "";
  subjects.forEach((subject, i) => {
    selection.innerHTML += `
         ${
           i == 0
             ? `<option selected>${subject}</option>`
             : `<option>${subject}</option>`
         }
        `;
  });
  clearSubject.innerHTML = "";
  subjects.forEach((subject, i) => {
    clearSubject.innerHTML += `
         ${
           i == 0
             ? `<option>${subject}</option>`
             : `<option>${subject}</option>`
         }
        `;
  });
}

selection.addEventListener("change", () => {
  const subject = JSON.parse(localStorage.getItem(selection.value));
  if (!subject) {
    attendedCounter = 0;
    dayCounter = 0;
    attended.innerText = attendedCounter;
    totalDays.innerText = dayCounter;
    calculatePercent(attendedCounter, dayCounter);
    return;
  }
  let [attendedDays, total] = subject;
  forFuncSake(attendedDays, total);
});

function saveData() {
  if (selection.value != "") {
    localStorage.setItem(
      selection.value,
      JSON.stringify([attendedCounter, dayCounter])
    );
  }
}

function forFuncSake(attendedDays, total) {
  attendedCounter = attendedDays;
  dayCounter = total;
  attended.innerText = attendedCounter;
  totalDays.innerText = dayCounter;
  calculatePercent(attendedCounter, dayCounter);
}