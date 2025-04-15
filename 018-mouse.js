const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [800, 800],
  resizeCanvas: true,
  animate: true
};

const sketch = ({ canvas, width, height }) => {
  // Per memorizzare la posizione del mouse
  const mouse = { x: 0, y: 0 };
  
  // Gestione dell'evento mousemove, ovvero quando il mouse si muove nel canvas  
  const onMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect(); // Ottieni le dimensioni del canvas
    // Converti le coordinate dal sistema di coordinate della finestra al sistema di coordinate del canvas
    mouse.x = (e.clientX - rect.left) * (width / rect.width);
    mouse.y = (e.clientY - rect.top) * (height / rect.height);
  };
  
  // Aggiungi l'event listener, ovver una sorta di guardiano in attesa che qualcosa succeda, in questo caso il movimento del mouse
  canvas.addEventListener('mousemove', onMouseMove);
  
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    // Disegna un cerchio nella posizione del mouse
    context.beginPath();
    context.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
  };
};

canvasSketch(sketch, settings);