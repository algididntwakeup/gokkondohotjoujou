/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// const sections = document.querySelectorAll('section[id]');

// function scrollActive() {
//   const scrollY = window.pageYOffset;

//   sections.forEach((current) => {
//     const sectionHeight = current.offsetHeight,
//       sectionTop = current.offsetTop - 50,
//       sectionId = current.getAttribute('id');

//     if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//       document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
//     } else {
//       document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
//     }
//   });
// }
// window.addEventListener('scroll', scrollActive);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById('header');
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

// Target date (6th July 2024)
const targetDate = new Date('2024-10-12T00:00:00');

function updateCountdown() {
  const currentDate = new Date();

  // Calculate difference for countdown-container 1
  const difference1 = targetDate - currentDate;
  if (difference1 <= 0) {
    // Countdown is over
    document.getElementById('days-value').textContent = '00';
    document.getElementById('hours-value').textContent = '00';
    document.getElementById('minutes-value').textContent = '00';
    document.getElementById('seconds-value').textContent = '00';
  } else {
    // Calculate remaining time for countdown-container 1
    let days1 = Math.floor(difference1 / (1000 * 60 * 60 * 24));
    let hours1 = Math.floor((difference1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes1 = Math.floor((difference1 % (1000 * 60 * 60)) / (1000 * 60));
    let seconds1 = Math.floor((difference1 % (1000 * 60)) / 1000);

    // Update the display for countdown-container 1
    document.getElementById('days-value').textContent = formatTime(days1);
    document.getElementById('hours-value').textContent = formatTime(hours1);
    document.getElementById('minutes-value').textContent = formatTime(minutes1);
    document.getElementById('seconds-value').textContent = formatTime(seconds1);
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Call updateCountdown every second
setInterval(updateCountdown, 1000);

// Initial call to set the countdown immediately
updateCountdown();

// Copy Button 1
document.getElementById('copyButton1').addEventListener('click', function () {
  copyText('1270004552194', 'copyStatus1');
});

function copyText(text, statusElementId) {
  // Membuat elemen textarea sementara untuk menyalin teks
  var tempTextarea = document.createElement('textarea');
  tempTextarea.value = text;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999);

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'No Rek berhasil disalin!' : 'Gagal menyalin teks.';
    document.getElementById(statusElementId).textContent = msg;
  } catch (err) {
    document.getElementById(statusElementId).textContent = 'Gagal menyalin No Rek.';
  }

  document.body.removeChild(tempTextarea);
}

// Copy Button 2
document.getElementById('copyButton2').addEventListener('click', function () {
  copyText('2671751436', 'copyStatus2');
});

function copyText(text, statusElementId) {
  var tempTextarea = document.createElement('textarea');
  tempTextarea.value = text;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999);

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'No Rek berhasil disalin!' : 'Gagal menyalin teks.';
    document.getElementById(statusElementId).textContent = msg;
  } catch (err) {
    document.getElementById(statusElementId).textContent = 'Gagal menyalin No Rek.';
  }

  document.body.removeChild(tempTextarea);
}
