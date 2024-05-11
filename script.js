'use strict';

const timerDisplay = document.querySelector('.timer p');
const startButton = document.querySelector('.buttons button:nth-of-type(1)');
const pauseButton = document.querySelector('.buttons button:nth-of-type(2)');
const resetButton = document.querySelector('.buttons button:nth-of-type(3)');
const splitButton = document.querySelector('.buttons button:nth-of-type(4)');
const timestampsList = document.querySelector('.timestamps ul');

let startTime;
let elapsedTime = 0;
let timerInterval;

pauseButton.disabled = true;
resetButton.disabled = true;
splitButton.disabled = true;

function startTimer() {
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = true;
  splitButton.disabled = false;

  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;
  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pauseTimer() {
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = false;
  splitButton.disabled = true;

  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
}

function resetTimer() {
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  splitButton.disabled = true;

  clearInterval(timerInterval);
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00';
  timestampsList.innerHTML = '';
}

function splitTime() {
  pauseButton.disabled = false;
  resetButton.disabled = false;
  splitButton.disabled = false;

  const elapsedTimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(elapsedTimeInSeconds / 3600);
  const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
  const seconds = elapsedTimeInSeconds % 60;
  const timestamp = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const li = document.createElement('li');
  li.textContent = timestamp;
  timestampsList.appendChild(li);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
splitButton.addEventListener('click', splitTime);
