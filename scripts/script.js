document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const saveButton = document.querySelector(".save-button");
  const planesContainer = document.getElementById("planes-container");

  // Функция плавного скролла к секции
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Ошибка: секция ${sectionId} не найдена!`);
    }
  }

  // Переход с первого экрана ко второму по кнопке "Полетели!"
  if (startButton) {
    startButton.addEventListener("click", () => {
      console.log("Кнопка 'Полетели!' нажата");
      scrollToSection("second-screen");
    });
  } else {
    console.error("Ошибка: кнопка start-button не найдена!");
  }

  // Переход со второго экрана на третий
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      console.log("Выбор сохранён, переходим к третьему экрану");
      scrollToSection("third-screen");
    });
  } else {
    console.error("Ошибка: кнопка сохранения не найдена!");
  }

  // Создание случайных самолетиков при клике в любом месте экрана
  document.addEventListener("click", (event) => {
    if (event.target !== startButton) {
      createRandomPlane(event.clientX, event.clientY);
    }
  });

  function createRandomPlane(x, y) {
    const planeImages = ["img/plane1.svg", "img/plane2.svg", "img/plane3.svg"];
    const plane = document.createElement("img");
    plane.src = planeImages[Math.floor(Math.random() * planeImages.length)];
    plane.classList.add("plane");
    planesContainer.appendChild(plane);

    plane.style.left = `${x}px`;
    plane.style.top = `${y}px`;

    let angle = Math.random() * 360;
    let speed = 2 + Math.random() * 3;
    plane.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
      animatePlane(plane, angle, speed);
    }, 100);

    setTimeout(() => {
      plane.classList.add("fade-out");
      setTimeout(() => plane.remove(), 2000);
    }, 10000);
  }

  function animatePlane(plane, angle, speed) {
    let posX = parseFloat(plane.style.left);
    let posY = parseFloat(plane.style.top);

    function move() {
      if (!document.body.contains(plane)) return;

      let radians = (angle * Math.PI) / 180;
      let newX = posX + Math.cos(radians) * speed;
      let newY = posY + Math.sin(radians) * speed;

      let planeWidth = plane.clientWidth;
      let planeHeight = plane.clientHeight;
      let minX = 0;
      let maxX = window.innerWidth - planeWidth;
      let minY = 0;
      let maxY = window.innerHeight - planeHeight;

      let bounced = false;

      if (newX <= minX) {
        angle = 180 - angle;
        newX = minX + 2;
        bounced = true;
      } else if (newX >= maxX) {
        angle = 180 - angle;
        newX = maxX - 2;
        bounced = true;
      }

      if (newY <= minY) {
        angle = -angle;
        newY = minY + 2;
        bounced = true;
      } else if (newY >= maxY) {
        angle = -angle;
        newY = maxY - 2;
        bounced = true;
      }

      if (bounced) {
        angle += (Math.random() - 0.5) * 10;
        angle = angle % 360;
      }

      posX = newX;
      posY = newY;

      plane.style.left = `${posX}px`;
      plane.style.top = `${posY}px`;
      plane.style.transform = `rotate(${angle}deg)`;

      requestAnimationFrame(move);
    }

    move();
  }
});
