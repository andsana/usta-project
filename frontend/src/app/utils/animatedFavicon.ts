let isAnimating = false; // Флаг для предотвращения дублирующейся анимации

export const createAnimatedFavicon = () => {
  if (isAnimating) return; // Если уже анимируется, выходим
  isAnimating = true;

  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
  const size = 32; // Размер иконки
  canvas.width = size;
  canvas.height = size;

  let angle = 0; // Начальный угол вращения
  let showIcon = false; // Флаг для отображения иконки

  // Загружаем favicon.svg
  const faviconImage: HTMLImageElement = new Image();
  faviconImage.src = '/favicon.svg'; // Укажи путь к твоей иконке

  const draw = () => {
    if (!isAnimating) return; // Проверка флага перед продолжением анимации
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size); // Очистка перед каждым кадром

    // Рисуем спиннер
    ctx.strokeStyle = '#000'; // Цвет спиннера
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 12, angle, angle + Math.PI * 1.5); // Рисуем дугу (спиннер)
    ctx.stroke();

    // Если иконка загружена и прошло время, рисуем её
    if (showIcon && faviconImage.complete) {
      ctx.drawImage(faviconImage, 8, 8, 16, 16); // Рисуем иконку по центру канваса
    }

    updateFavicon(canvas.toDataURL('image/png')); // Обновляем фавикон
    angle += 0.1; // Увеличиваем угол для вращения
    requestAnimationFrame(draw); // Рекурсивно вызываем анимацию
  };

  // Запускаем анимацию
  draw();

  // Через 2 секунды добавляем иконку
  setTimeout(() => {
    showIcon = true;
  }, 2000); // 2000 мс = 2 секунды
};

export const updateFavicon = (href: string) => {
  let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    document.head.appendChild(favicon);
  }
  favicon.setAttribute('href', href);
};

// Функция для остановки анимации и возврата стандартного фавикона
export const stopAnimatedFavicon = () => {
  isAnimating = false; // Останавливаем анимацию
  updateFavicon('/favicon.svg'); // Возвращаем обычный фавикон
};
