const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  units: 'mm',
  pixelsPerInch: 300,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.font = '80px Moo Lah Lah, sans-serif';
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "red";
    context.fillText("Moo!", width/2, height/2);
  };
};

// Carica il font e avvia il disegno solo quando è pronto
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Moo+Lah+Lah&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap';
  document.head.appendChild(link);
  
  // Avvia solo quando il font è caricato
  link.onload = () => {
    // Piccolo ritardo per assicurarsi che il font sia applicato
    setTimeout(() => {
      canvasSketch(sketch, settings);
    }, 100);
  };
} else {
  canvasSketch(sketch, settings);
}