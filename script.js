// =========================
// SELECT ELEMENTS
// =========================

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const eventNameInput = document.getElementById("eventName");
const targetDateInput = document.getElementById("targetDate");

const countdown = document.getElementById("countdown");
const emptyState = document.getElementById("emptyState");

const eventTitle = document.getElementById("eventTitle");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const errorMessage = document.getElementById("errorMessage");
const todayDate = document.getElementById("todayDate");

const themeToggle = document.getElementById("themeToggle");

// =========================
// CURRENT DATE
// =========================

const today = new Date();

todayDate.textContent = today.toDateString();

// =========================
// THEME TOGGLE
// =========================

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");

  themeToggle.textContent = isLight ? "☀️" : "🌙";

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Load Theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️";
}

// =========================
// COUNTDOWN LOGIC
// =========================

let countdownInterval;

function startCountdown() {

  const eventName = eventNameInput.value.trim();
  const targetDate = targetDateInput.value;

  // Validation

  if (!eventName || !targetDate) {
    errorMessage.textContent =
      "Please fill all fields.";
    return;
  }

  errorMessage.textContent = "";

  // Save to Local Storage

  localStorage.setItem("eventName", eventName);
  localStorage.setItem("targetDate", targetDate);

  // UI Updates

  emptyState.classList.add("hidden");
  countdown.classList.remove("hidden");

  eventTitle.textContent = eventName;

  // Clear Previous Interval

  clearInterval(countdownInterval);

  // Start Timer

  countdownInterval = setInterval(() => {

    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();

    const distance = target - now;

    // Countdown Finished

    if (distance < 0) {

      clearInterval(countdownInterval);

      eventTitle.textContent = "🎉 Time's Up!";

      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";

      return;
    }

    // Time Calculations

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) / 1000
    );

    // Update UI

    daysEl.textContent =
      String(days).padStart(2, "0");

    hoursEl.textContent =
      String(hours).padStart(2, "0");

    minutesEl.textContent =
      String(minutes).padStart(2, "0");

    secondsEl.textContent =
      String(seconds).padStart(2, "0");

  }, 1000);
}

// =========================
// RESET TIMER
// =========================

function resetCountdown() {

  clearInterval(countdownInterval);

  eventNameInput.value = "";
  targetDateInput.value = "";

  countdown.classList.add("hidden");
  emptyState.classList.remove("hidden");

  localStorage.removeItem("eventName");
  localStorage.removeItem("targetDate");
}

// =========================
// LOAD SAVED DATA
// =========================

function loadSavedCountdown() {

  const savedEvent =
    localStorage.getItem("eventName");

  const savedDate =
    localStorage.getItem("targetDate");

  if (savedEvent && savedDate) {

    eventNameInput.value = savedEvent;
    targetDateInput.value = savedDate;

    startCountdown();
  }
}

// =========================
// ENTER KEY SUPPORT
// =========================

eventNameInput.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {
      startCountdown();
    }
  }
);

// =========================
// EVENT LISTENERS
// =========================

startBtn.addEventListener(
  "click",
  startCountdown
);

resetBtn.addEventListener(
  "click",
  resetCountdown
);

// =========================
// INIT
// =========================

loadSavedCountdown();