import { AOS } from './aos.js';
import { comment } from './comment.js';
import { storage } from './storage.js';
import { bootstrap } from './bootstrap.js';
import { request, HTTP_GET } from './request.js';

export const util = (() => {
  const opacity = (id, speed = 0.01) => {
    const element = document.getElementById(id);
    let op = parseInt(element.style.opacity);

    let clear = null;
    clear = setInterval(() => {
      if (op > 0) {
        element.style.opacity = op.toString();
        op -= speed;
      } else {
        clearInterval(clear);
        clear = null;
        element.remove();
      }
    }, 10);
  };

  const escapeHtml = (unsafe) => {
    return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  };

  const disableButton = (button, message = 'Loading..') => {
    button.disabled = true;
    let tmp = button.innerHTML;
    button.innerHTML = message;

    const restore = () => {
      button.innerHTML = tmp;
      button.disabled = false;
    };

    return {
      restore,
    };
  };

  const animate = (svg, timeout, classes) => {
    setTimeout(() => {
      svg.classList.add(classes);
    }, timeout);
  };

  const guest = () => {
    const name = new URLSearchParams(window.location.search).get('to');
    const guest = document.getElementById('guest-name');

    if (!name) {
      guest.remove();
      return;
    }

    const div = document.createElement('div');
    div.classList.add('m-2');
    div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0 text-light">${guest.getAttribute('data-message')}</p><h2 class="text-light">${escapeHtml(name)}</h2>`;

    document.getElementById('form-name').value = name;
    guest.appendChild(div);
  };

  const show = () => {
    guest();
    opacity('loading', 0.025);
    window.scrollTo(0, 0);
  };

  const modal = (img) => {
    document.getElementById('show-modal-image').src = img.src;
    new bootstrap.Modal('#modal-image').show();
  };

  const countDownDate = () => {
    const until = document.getElementById('count-down').getAttribute('data-time').replace(' ', 'T');
    const count = new Date(until).getTime();

    setInterval(() => {
      const distance = Math.abs(count - new Date().getTime());

      document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
      document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  };

  const copy = async (button, message, timeout = 1500) => {
    try {
      await navigator.clipboard.writeText(button.getAttribute('data-copy'));
    } catch {
      alert('Failed to copy');
      return;
    }

    button.disabled = true;
    let tmp = button.innerText;
    button.innerText = message;

    let clear = null;
    clear = setTimeout(() => {
      button.disabled = false;
      button.innerText = tmp;

      clearTimeout(clear);
      clear = null;
      return;
    }, timeout);
  };

  const storeConfig = async (token) => {
    storage('session').set('token', token);

    const config = storage('config');
    return await request(HTTP_GET, '/api/config')
      .token(token)
      .then((res) => {
        for (let [key, value] of Object.entries(res.data)) {
          config.set(key, value);
        }

        return res.code;
      });
  };

  const open = async (button) => {
    button.disabled = true;
    confetti({
      origin: { y: 1 },
      zIndex: 1057,
    });

    document.querySelector('body').style.overflowY = 'scroll';
    if (storage('information').get('info')) {
      document.getElementById('information').remove();
    }

    const token = document.querySelector('body').getAttribute('data-key');
    if (!token || token.length === 0) {
      document.getElementById('ucapan').remove();
      document.querySelector('a.nav-link[href="#ucapan"]').closest('li.nav-item').remove();
    }

    AOS.init();

    countDownDate();
    opacity('welcome', 0.025);

    audio.play();
    audio.showButton();

    theme.check();
    theme.showButtonChangeTheme();

    if (!token || token.length === 0) {
      return;
    }

    const status = await storeConfig(token);
    if (status === 200) {
      animation();
      await comment.comment();
    }
  };

  const close = () => {
    storage('information').set('info', true);
  };

  return {
    open,
    copy,
    show,
    close,
    modal,
    opacity,
    animate,
    animation,
    escapeHtml,
    countDownDate,
    disableButton,
  };
})();
