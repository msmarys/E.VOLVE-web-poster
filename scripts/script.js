document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden";

  const startButton = document.getElementById("start-button");
  const saveButton = document.querySelector(".save-button");
  const planesContainer = document.getElementById("planes-container");

  // Функция скролла к сл экрану
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Ошибка`);
    }
  }
  if (startButton) {
    startButton.addEventListener("click", () => {
      console.log("Кнопка 'Полетели!' нажата");
      scrollToSection("second-screen");
    });
  } else {
    console.error("Ошибка");
  }

  // первый эакран - эх, самолеты
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

// второй экран
document.querySelectorAll(".model").forEach((model) => {
  const color = model.dataset.color;
  const placeholder = model.querySelector(".model-placeholder");

  if (placeholder) {
    placeholder.style.backgroundColor = color;
  }
});

const models = document.querySelectorAll(".model");
const selectedModelContainer = document.getElementById(
  "selectedModelContainer"
);
const selectedModelImage = document.getElementById("selectedModelImage");
const selectedModelName = document.getElementById("selectedModelName");
const saveButton = document.querySelector(".save-button");
const modelData = {
  1: {
    previewSrc: "img/model-1.svg",
    name: "Модель №1",
    bgColor: "#F48ABA",
  },
  2: {
    previewSrc: "img/model-2.svg",
    name: "Модель №2",
    bgColor: "#2CB46C",
  },
  3: {
    previewSrc: "img/model-3.svg",
    name: "Модель №3",
    bgColor: "#4E8DFF",
  },
  4: {
    previewSrc: "img/model-4.svg",
    name: "Модель №4",
    bgColor: "#FFCA40",
  },
};

function selectModel(modelKey) {
  const model = modelData[modelKey];
  if (!model) return;

  selectedModelImage.src = model.previewSrc;
  selectedModelName.textContent = model.name;
  selectedModelContainer.style.backgroundColor = model.bgColor;

  sessionStorage.setItem("selectedModel", modelKey);

  models.forEach((m) => m.classList.remove("active"));

  document.querySelector(`[data-model="${modelKey}"]`).classList.add("active");
}

const savedModel = sessionStorage.getItem("selectedModel");
if (savedModel && modelData[savedModel]) {
  selectModel(savedModel);
} else {
  selectModel("1");
}

models.forEach((model) => {
  model.addEventListener("click", function () {
    const modelKey = this.getAttribute("data-model");
    selectModel(modelKey);
  });
});

// переход к 3 экрану
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    console.error("Ошибка");
  }
}

saveButton.addEventListener("click", () => {
  console.log("ура, получилось");
  scrollToSection("third-screen");
});
