// 初始化 Swiper（竖向翻页）
const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  pagination: { el: '.swiper-pagination' },
  speed: 450,
});

// 音乐播放（微信内通常要求用户手势触发）
const bgm = document.getElementById('bgm');
const btn = document.getElementById('musicBtn');
const icon = document.getElementById('musicIcon');

let playing = false;

btn.addEventListener('click', async () => {
  try {
    if (!playing) {
      await bgm.play();
      playing = true;
      icon.textContent = '⏸';
    } else {
      bgm.pause();
      playing = false;
      icon.textContent = '▶';
    }
  } catch (e) {
    alert('微信内可能需要先点击页面任意位置再播放音乐。');
  }
});

// 额外兜底：用户第一次触摸页面时尝试自动播放（可能仍会被限制）
document.addEventListener('touchstart', () => {
  if (!playing) {
    bgm.play().then(() => {
      playing = true;
      icon.textContent = '⏸';
    }).catch(() => {});
  }
}, { once: true });