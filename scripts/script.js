// полет самолетов на первом экране
document.addEventListener("DOMContentLoaded", () => {
  const planesContainer = document.getElementById("planes-container");
  const startButton = document.getElementById("start-button");
  const planeImages = ["img/plane1.svg", "img/plane2.svg", "img/plane3.svg"];

  document.addEventListener("click", (event) => {
    if (event.target !== startButton) {
      createRandomPlane(event.clientX, event.clientY);
    }
  });

  function createRandomPlane(x, y) {
    const plane = document.createElement("img");
    plane.src = planeImages[Math.floor(Math.random() * planeImages.length)];
    plane.classList.add("plane");
    plane.style.left = `${x}px`;
    plane.style.top = `${y}px`;
    planesContainer.appendChild(plane);

    // Закладываем траекторию до появления самолета
    const angle = Math.random() * 360;
    const speed = 4; // Увеличиваем скорость

    setTimeout(() => {
      animatePlane(plane, angle, speed);
    }, 100); // Задержка перед началом анимации

    setTimeout(() => {
      plane.classList.add("fade-out");
      setTimeout(() => plane.remove(), 2000);
    }, 10000);
  }

  function animatePlane(plane, angle, speed) {
    let posX = parseInt(plane.style.left, 10);
    let posY = parseInt(plane.style.top, 10);

    function move() {
      if (!document.body.contains(plane)) return;

      let radians = angle * (Math.PI / 180);
      posX += Math.cos(radians) * speed;
      posY += Math.sin(radians) * speed;

      // Проверка границ экрана
      if (posX <= 0) {
        angle = 180 - angle;
        posX = 0;
      } else if (posX >= window.innerWidth - plane.width) {
        angle = 180 - angle;
        posX = window.innerWidth - plane.width;
      }

      if (posY <= 0) {
        angle = -angle;
        posY = 0;
      } else if (posY >= window.innerHeight - plane.height) {
        angle = -angle;
        posY = window.innerHeight - plane.height;
      }

      plane.style.left = `${posX}px`;
      plane.style.top = `${posY}px`;
      plane.style.transform = `rotate(${angle}deg)`;

      requestAnimationFrame(move);
    }

    move();
  }
});
