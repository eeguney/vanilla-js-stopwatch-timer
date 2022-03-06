let millisecond = document.querySelector("#millisecond");
let second = document.querySelector("#second");
let minute = document.querySelector("#minute");
let hour = document.querySelector("#hour");
let start = document.querySelector("#start");
let pause = document.querySelector("#pause");
let stop = document.querySelector("#stop");
let historyDiv = document.querySelector(".history");
let historyList = document.querySelector(".history-list");
let historyButton = document.querySelector(".historyButton");

start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
stop.addEventListener("click", stopTimer);
historyButton.addEventListener("click", toggleHistory);

let count;
let historyToggle = false;
let history = [];

const MILLISECOND = "millisecond";
const SECOND = "second";
const MINUTE = "minute";
const HOUR = "hour";

let types = [
  { name: MILLISECOND, value: millisecond },
  { name: SECOND, value: second },
  { name: MINUTE, value: minute },
  { name: HOUR, value: hour },
];

function timerHandler(type) {
  let currentIndex = types.findIndex((object) => {
    return object.name === type;
  });

  if (type === MILLISECOND) {
    if (types[currentIndex].value.innerHTML < 10) {
      types[currentIndex].value.innerHTML = `0${
        Number(types[currentIndex].value.innerHTML) + 1
      }`;
    } else {
      types[currentIndex].value.innerHTML =
        Number(types[currentIndex].value.innerHTML) + 1;
    }
  } else {
    if (type === SECOND) {
      if (Number(types[currentIndex - 1].value.innerHTML) >= 99) {
        // if lower than 10 add 0 to front
        if (types[currentIndex].value.innerHTML < 10) {
          types[currentIndex].value.innerHTML = `0${
            Number(types[currentIndex].value.innerHTML) + 1
          }`;
          types[currentIndex - 1].value.innerHTML = 00;
        } else {
          types[currentIndex].value.innerHTML =
            Number(types[currentIndex].value.innerHTML) + 1;
          types[currentIndex - 1].value.innerHTML = 00;
        }
      }
    } else {
      if (Number(types[currentIndex - 1].value.innerHTML) === 59) {
        // if lower than 10 add 0 to front
        if (types[currentIndex].value.innerHTML < 10) {
          types[currentIndex].value.innerHTML = `0${
            Number(types[currentIndex].value.innerHTML) + 1
          }`;
          types[currentIndex - 1].value.innerHTML = 00;
        } else {
          types[currentIndex].value.innerHTML =
            Number(types[currentIndex].value.innerHTML) + 1;
          types[currentIndex - 1].value.innerHTML = 00;
        }
      }
    }
  }
}

function startTimer() {
  count = setInterval(() => {
    types.forEach((element) => {
      timerHandler(element.name);
    });
  }, 10);
}

function pauseTimer() {
  clearInterval(count);
}

function resetTime() {
  hour.innerHTML = "00";
  minute.innerHTML = "00";
  second.innerHTML = "00";
  millisecond.innerHTML = "00";
}

function askModal() {
  let name = "";
  const modal =
    '<div class="askModal">\
  <input type="text" class="recordName" placeholder="Name"/>\
  <div class="row"><button type="button" class="removeRecord">Remove</button><button type="button" class="addRecord">Save</button></div>\
  </div>';
  historyDiv.insertAdjacentHTML("afterend", modal);
  const modalDiv = document.querySelector(".askModal");

  document.querySelector(".removeRecord").addEventListener("click", closeModal);
  document.querySelector(".addRecord").addEventListener("click", saveRecord);
  document
    .querySelector(".recordName")
    .addEventListener("change", saveRecordName);

  function closeModal() {
    modalDiv.parentNode.removeChild(modalDiv);
    resetTime();
    return false;
  }

  function saveRecordName(event) {
    name = event.target.value;
  }

  function saveRecord() {
    modalDiv.parentNode.removeChild(modalDiv);
    const newRecord = {
      name,
      hour: hour.innerHTML,
      minute: minute.innerHTML,
      second: second.innerHTML,
      millisecond: millisecond.innerHTML,
    };
    history.push(newRecord);
    historyDiv.classList.add("historyAnimation");
    historyList.innerHTML =
      "<ul>" +
      history.map(function (item) {
        return `<li>
        <div class="name"><label>Name</label>${item.name}</div>
        <div class="time"><label>Time:</label><span>${item.hour}</span>
        <span>.${item.minute}.</span>
        <span>${item.second}.</span>
        <span>${item.millisecond}</span>
        </div>
      </li>`;
      }).join("") +
      "</ul>";
    resetTime();
  }
}

function stopTimer() {
  clearInterval(count);
  askModal();
}

function toggleHistory() {
  if (historyToggle) {
    historyDiv.classList.remove("showHistory");
    historyToggle = false;
    historyButton.innerHTML = "History";
  } else {
    historyDiv.classList.add("showHistory");
    historyToggle = true;
    historyButton.innerHTML = "Close";
  }
}
