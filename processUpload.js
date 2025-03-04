// processUpload.js
document.getElementById('processButton').addEventListener('click', function() {
  const input = document.getElementById('imageInput');
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const canvas = document.getElementById('imageCanvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = function() {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Dibujar la imagen
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Dibujar los rectángulos áureos
        drawGoldenRectangles(ctx, canvas.width, canvas.height);
      }
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

function drawGoldenRectangles(ctx, width, height) {
  const phi = (1 + Math.sqrt(5)) / 2;
  let rectWidth = width / 1.5; // Hacer el primer rectángulo un poco más pequeño
  let rectHeight = height / 1.5; // Hacer el primer rectángulo un poco más pequeño
  let x = (width - rectWidth) / 2;
  let y = (height - rectHeight) / 2;

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;

  while (rectWidth > 1 && rectHeight > 1) {
    ctx.strokeRect(x, y, rectWidth, rectHeight);
    if (rectWidth > rectHeight) {
      rectWidth /= phi;
      x += rectWidth;
    } else {
      rectHeight /= phi;
      y += rectHeight;
    }
  }
}

function drawGoldenRectangle(ctx, width, height) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const rectWidth = width / phi;
  const rectHeight = height / phi;
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.strokeRect((width - rectWidth) / 2, (height - rectHeight) / 2, rectWidth, rectHeight);
}

function drawGoldenSpiral(ctx, x, y, width, height) {
  const phi = (1 + Math.sqrt(5)) / 2;
  let a = width;
  let b = height;
  let angle = 0;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < 10; i++) {
    const nextX = x + a * Math.cos(angle);
    const nextY = y + a * Math.sin(angle);
    ctx.arc(x, y, a, angle, angle + Math.PI / 2, false);
    x = nextX;
    y = nextY;
    const temp = a;
    a = b;
    b = temp / phi;
    angle += Math.PI / 2;
  }
  ctx.stroke();
}
