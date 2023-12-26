let minsContainer = document.querySelector("#minutes");
let secsContainer = document.querySelector("#seconds");
let msecsContainer = document.querySelector("#milisecs");

const lapsDiv = document.querySelector(".laps-div");
const lapsUl = document.querySelector(".lap-track");

const startBtn = document.querySelector("#play");
const stopBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const lapBtn = document.querySelector("#lap");
const clearLapsBtn = document.querySelector("#clearLaps");

let interval;
let minutes = 0;
let seconds = 0;
let milisecs = 0;
let lapNum = 0;

const startTimer = () => {
    resetBtn.disabled = false;
    lapBtn.disabled = false;

    milisecs++;
    msecsContainer.innerHTML = formatearNum(milisecs);

    if (milisecs > 99) {
        seconds++;
        secsContainer.innerHTML = formatearNum(seconds);
        milisecs = 0;
        msecsContainer.innerHTML = formatearNum(milisecs);
    }

    if (seconds > 59) {
        minutes++;
        minsContainer.innerHTML = formatearNum(minutes);
        seconds = 0;
        secsContainer.innerHTML = formatearNum(seconds);
    }
};

startBtn.onclick = () => {
    toggleHide(stopBtn, startBtn);
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
};

stopBtn.onclick = () => {
    toggleHide(startBtn, stopBtn);
    clearInterval(interval);
};

resetBtn.onclick = () => {
    clearInterval(interval);
    minutes = seconds = milisecs = 0;
    minsContainer.innerHTML = formatearNum(minutes);
    secsContainer.innerHTML = formatearNum(seconds);
    msecsContainer.innerHTML = formatearNum(milisecs);
    toggleHide(startBtn, stopBtn);
    clearLaps();
    resetBtn.disabled = true;
    lapBtn.disabled = true;
};

lapBtn.onclick = () => {
    let html = "";
    let mins = formatearNum(minutes);
    let secs = formatearNum(seconds);
    let msecs = formatearNum(milisecs);
    html = /* html */ `
        <li class="lap-item">
            <span class="number">${++lapNum})</span>
            <span class="lap">${mins} : ${secs} : ${msecs}</span>
        </li>
    `;

    lapsUl.innerHTML += html;
    lapsDiv.classList.remove("hide");
};

clearLapsBtn.addEventListener("click", clearLaps);

function formatearNum(num) {
    let newNum;

    if (num < 10) {
        newNum = `0${num}`;
    } else {
        newNum = num;
    }

    return newNum;
}

function toggleHide(btnToShow, btnToHide) {
    btnToShow.classList.remove("hide");
    btnToHide.classList.add("hide");
}

function clearLaps() {
    lapsDiv.classList.add("hide");
    lapsUl.innerHTML = "";
    lapNum = 0;
}