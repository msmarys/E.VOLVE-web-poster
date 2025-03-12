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

    animatePlane(plane);

    setTimeout(() => {
      plane.classList.add("fade-out");
      setTimeout(() => plane.remove(), 2000);
    }, 8000);
  }

  function animatePlane(plane) {
    let posX = parseInt(plane.style.left, 10);
    let posY = parseInt(plane.style.top, 10);
    let angle = Math.random() * 40 - 20;
    let speedX = Math.random() * 2 + 1;
    let speedY = Math.random() * 2 - 1;

    function move() {
      if (!document.body.contains(plane)) return;

      posX += speedX;
      posY += speedY;

      if (posX > window.innerWidth || posY < 0 || posY > window.innerHeight) {
        plane.remove();
        return;
      }

      plane.style.transform = `translate(${posX}px, ${posY}px) rotate(${angle}deg)`;
      requestAnimationFrame(move);
    }

    move();
  }
});
