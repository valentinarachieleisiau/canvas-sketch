const canvasSketch = require('canvas-sketch');

const settings = 
{
  dimensions: [ 1000,1000 ]
};

const sketch = () => {
  return ({ context, width, height }) => 
  {
   //CANVAS
    context.fillStyle = "#fafafa";
    context.fillRect(0, 0, width, height);
    context.beginPath();
    context.rect(10, 10, 100, 100); //rettangolo
    context.lineWidth = 10;
    context.strokeStyle = 'rgb(122, 28, 195)';
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(200, 200, 50, 0, Math.PI * 2); //cerchio
    context.fillStyle = 'rgb(201, 40, 83)';
    context.fill();
    context.closePath();
    
  };
};

canvasSketch(sketch, settings);
