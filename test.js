// texture.js
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const color = require('canvas-sketch-util/color');
const Tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
  fps: 24,
};

const params = {
  characters: '=/+*-',
  cellSize: 40,
  baseFontSize: 30,
  fontSizeVariation: 20,
  noiseFreq: 0.02,
  noiseAmp: 1, // Ampiezza per influenzare dimensione/scelta
  baseColor: '#ffffff',
  bgColor: '#000000',
  seed: 42,
  animateNoise: false, // Manteniamo statico per default
};

const sketch = ({ context, width, height }) => {

  const characters = params.characters.split(''); // Array di caratteri disponibili

  if (!params.animateNoise) {
    random.setSeed(params.seed);
  }

  // Funzione di disegno
  const drawGrid = (time = 0) => {
    context.fillStyle = params.bgColor;
    context.fillRect(0, 0, width, height);

    const cols = Math.floor(width / params.cellSize);
    const rows = Math.floor(height / params.cellSize);
    const numCells = cols * rows;

    const marginX = (width - cols * params.cellSize) * 0.5;
    const marginY = (height - rows * params.cellSize) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = marginX + col * params.cellSize + params.cellSize * 0.5; // Centro cella X
      const y = marginY + row * params.cellSize + params.cellSize * 0.5; // Centro cella Y

      // Noise 3D/4D per variazione
      const noiseTime = params.animateNoise ? time * 0.2 : 0;
      // Usiamo noise diversi per diverse proprietà
      const n = random.noise3D(x * params.noiseFreq, y * params.noiseFreq, noiseTime + params.seed); // Noise per dimensione/rotazione
      const n2 = random.noise3D(x * params.noiseFreq, y * params.noiseFreq, noiseTime + params.seed + 50); // Noise per scelta carattere

      // Mappa il noise [ -1, 1 ] a un indice per i caratteri [ 0, N-1 ]
      const charIndex = Math.floor(math.mapRange(n2, -1, 1, 0, characters.length));
      const character = characters[charIndex];

      // Mappa il noise [ -1, 1 ] a una variazione di dimensione
      const fontSize = params.baseFontSize + n * params.fontSizeVariation;

      // Potresti usare n anche per la rotazione
      // const angle = n * Math.PI;

      if (fontSize <= 0) continue; // Salta se la dimensione è troppo piccola

      context.fillStyle = params.baseColor;
      context.font = `${fontSize}px Monospace`; // Usiamo Monospace per consistenza
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      context.save();
      context.translate(x, y);
      // context.rotate(angle); // Aggiungere se si vuole rotazione
      context.fillText(character, 0, 0);
      context.restore();
    }
  };

  return ({ context, width, height, time }) => {
    drawGrid(time);
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid & Characters' });
  folder.addInput(params, 'characters');
  folder.addInput(params, 'cellSize', { min: 5, max: 100, step: 1 });

  folder = pane.addFolder({ title: 'Appearance' });
  folder.addInput(params, 'baseFontSize', { min: 1, max: 100, step: 1 });
  folder.addInput(params, 'fontSizeVariation', { min: 0, max: 100, step: 1 });
  folder.addInput(params, 'baseColor', { view: 'color' });
  folder.addInput(params, 'bgColor', { view: 'color' });

  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'noiseFreq', { min: 0.001, max: 0.1, step: 0.001 });
  folder.addInput(params, 'noiseAmp', { min: 0, max: 2, step: 0.01 }); // Amplificatore per noise mappato
  folder.addInput(params, 'animateNoise');
  folder.addInput(params, 'seed', { min: 0, max: 10000, step: 1 });
};

createPane();
canvasSketch(sketch, settings);