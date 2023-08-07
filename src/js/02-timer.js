import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector("input[type='text']");
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

flatpickr("input[type='text']", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const inputDate = new Date(selectedDates);
    const currentDate = new Date();

    if (inputDate < currentDate) {
      startBtn.setAttribute('disabled', 'disabled');
      return Report.failure(
        'Wrong date',
        'Please choose a date in the future',
        'Okay'
      );
    } else {
      startBtn.removeAttribute('disabled', 'disabled');
    }

    startBtn.addEventListener('click', () => {
      let timerInterval = setInterval(() => {
        const ms = inputDate.getTime() - new Date().getTime();
        const timeLeft = convertMs(ms);

        daysValue.textContent = addLeadingZero(timeLeft.days);
        hoursValue.textContent = addLeadingZero(timeLeft.hours);
        minutesValue.textContent = addLeadingZero(timeLeft.minutes);
        secondsValue.textContent = addLeadingZero(timeLeft.seconds);
        startBtn.setAttribute('disabled', 'disabled');
        input.setAttribute('disabled', 'disabled');

        if (ms <= 0) {
          clearInterval(timerInterval);
          daysValue.textContent = '00';
          hoursValue.textContent = '00';
          minutesValue.textContent = '00';
          secondsValue.textContent = '00';
          input.removeAttribute('disabled');
          startBtn.removeAttribute('disabled');
        }
      }, 1000);
    });
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
