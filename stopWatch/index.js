let startTime, elapsedTime = 0, timerInterval;
let running = false;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        document.getElementById("startStopBtn").textContent = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        document.getElementById("startStopBtn").textContent = "Start";
        running = false;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    
    millisecondsElement.textContent = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
    minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    document.getElementById("startStopBtn").textContent = "Start";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    millisecondsElement.textContent = "00";
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (running) {
        const lapTime = `${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${document.getElementById("laps").childElementCount + 1}: ${lapTime}`;
        document.getElementById("laps").appendChild(lapItem);
    }
}

document.getElementById("startStopBtn").addEventListener("click", startStop);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", recordLap);
