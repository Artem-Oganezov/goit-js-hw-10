
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";





let userSelectedDate = null;
const startBtn = document.querySelector('[data-start]');
const date = document.querySelector('.inp_datetime')
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  onClose(selectedDates) {
      const selectDate = selectedDates[0];
      if (selectDate < new Date) {
        iziToast.error({
          backgroundColor: 'red',
          position: "topRight",
          title: 'Error',
          titleColor: 'white',
          messageColor: 'white',
          message: 'Please choose a date in the future',
        });
        userSelectedDate = null;
      } else {
        userSelectedDate = selectDate;
        startBtn.disabled = false;
      }
  },
};


flatpickr("#datetime-picker", options);

const timer = {
  intervalId: null,
  
  start() {
    this.startTime = Date.now();
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  },
  tick() {
    const now = Date.now();
    const ms = userSelectedDate - now;
    const time = addLeadingZero(convertMs(ms));
    timerDate(time)
    if (ms <= 0) {
      clearInterval(this.intervalId);
      timerDate({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      date.disabled = false;
      return;
    }
  },
  }

startBtn.addEventListener('click', () => {
  
  timer.start();
  date.disabled = true;
  startBtn.disabled = true;
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}


function addLeadingZero({ hours, minutes, seconds, days }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds };
}

function timerDate(time) {
document.querySelector('[data-days]').textContent = time.days;
document.querySelector('[data-hours]').textContent =  time.hours;
document.querySelector('[data-minutes]').textContent = time.minutes;
document.querySelector('[data-seconds]').textContent = time.seconds;
}


