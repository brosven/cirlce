const damages_canvas = document.getElementById("damages-area");
const ctx_damages = damages_canvas.getContext("2d");
const circles = [];
const markerColor = "red";
let offsetX = damages_canvas.offsetLeft;
let offsetY = damages_canvas.offsetTop;
let isMouseDown = false;
let arrX = [];
let arrY = [];

damages_canvas.addEventListener("mousedown", mouseDown);
damages_canvas.addEventListener("mousemove", mouseMove);
damages_canvas.addEventListener("mouseup", mouseUp);

function Circle(startX, startY, radius) {
  this.startX = startX;
  this.startY = startY;
  this.radius = radius;
  this.draw = function () {
    ctx_damages.beginPath();
    ctx_damages.arc(
      this.startX,
      this.startY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx_damages.strokeStyle = markerColor;
    ctx_damages.stroke();
  };
}

function getRadius(x1, y1, x2, y2) {
  return Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)));
}

function mouseDown(evt) {
  ctx_damages.clearRect(0, 0, damages_canvas.width, damages_canvas.height);
  isMouseDown = true;
  const startX = parseInt(evt.clientX - offsetX);
  const startY = parseInt(evt.clientY - offsetY);

  arrX.push(startX);
  arrY.push(startY);
}

function mouseMove(evt) {
  if (!isMouseDown) {
    return;
  }
  arrX.push(parseInt(evt.clientX - offsetX));
  arrY.push(parseInt(evt.clientY - offsetY));
}

function mouseUp() {
  isMouseDown = false;
  const xCenterCoords = arrX[parseInt((arrX.length - 1) / 2)];
  const xOpposite = arrX[parseInt((arrX.length - 1) / 2)];
  const yOpposite = arrY[parseInt((arrY.length - 1) / 2)];
  const yCenterCoords = parseInt(arrY[parseInt((arrY.length - 1) / 2)]);
  const radius = parseInt(
    getRadius(xCenterCoords, yCenterCoords, arrX[0], arrY[0]) / 2
  );

  if (Math.abs(arrY[0] - yOpposite) > 100 && arrY[0] < yOpposite) {
    const circle = new Circle(xCenterCoords, arrY[0] + radius, radius);
    circle.draw();
    arrY = [];
    arrX = [];
  } else if (Math.abs(arrY[0] - yOpposite) > 100 && yOpposite < arrY[0]) {
    const circle = new Circle(xCenterCoords, arrY[0] - radius, radius);
    circle.draw();
    arrY = [];
    arrX = [];
  } else if (Math.abs(arrX[0] - xOpposite) > 100 && xOpposite < arrX[0]) {
    const circle = new Circle(arrX[0] - radius, yCenterCoords, radius);
    circle.draw();
    arrY = [];
    arrX = [];
  } else if (Math.abs(arrX[0] - xOpposite) > 100 && arrX[0] < xOpposite) {
    const circle = new Circle(arrX[0] + radius, yCenterCoords, radius);
    circle.draw();
    arrY = [];
    arrX = [];
  }
}
