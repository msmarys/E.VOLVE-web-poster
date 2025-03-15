document.addEventListener("DOMContentLoaded", () => {
  // полет самолетов на первом экране
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

//  выбор модели самолета
const models = document.querySelectorAll(".model-placeholder");
const previewContainer = document.getElementById("preview-container");
const previewImage = document.getElementById("preview-image");
const modelName = document.getElementById("model-name");
const saveButton = document.querySelector(".save-button");
const defaultModel = {
  src: "img/model1.svg",
  name: "Модель №1",
  bgColor: "#F0E5FF",
};

const modelData = {
  model1: { src: "img/model1.svg", name: "Модель №1", bgColor: "#F0E5FF" },
  model2: { src: "img/model2.svg", name: "Модель №2", bgColor: "#E5FFF5" },
  model3: { src: "img/model3.svg", name: "Модель №3", bgColor: "#FFE5E5" },
  model4: { src: "img/model4.svg", name: "Модель №4", bgColor: "#E5E9FF" },
};

function applyModel(modelKey) {
  const model = modelData[modelKey] || defaultModel;

  previewImage.src = model.src;
  previewImage.style.width = "705px";
  previewImage.style.height = "580px";

  modelName.textContent = model.name;
  modelName.style.fontFamily = "'Feature Mono', monospace";
  modelName.style.fontWeight = "700";
  modelName.style.fontSize = "70px";
  modelName.style.lineHeight = "110%";
  modelName.style.color = "#232323";
  modelName.style.position = "absolute";
  modelName.style.bottom = "40px";
  modelName.style.left = "50%";
  modelName.style.transform = "translateX(-50%)";

  previewContainer.style.backgroundColor = model.bgColor;

  sessionStorage.setItem("selectedModel", modelKey);
}

applyModel("model1");

models.forEach((model) => {
  model.addEventListener("click", function () {
    models.forEach((m) => m.classList.remove("active"));
    this.classList.add("active");
    const modelKey = this.getAttribute("data-model");
    applyModel(modelKey);
  });
});

saveButton.addEventListener("click", () => {
  window.location.href = "next-screen.html";
});
