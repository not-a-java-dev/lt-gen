const size = 768; // borken :(
const text = "wath";
const fontSize = 250;
const blackStroke = 16;


const { registerFont, createCanvas, Image } = require('canvas');
const fs = require('fs');
registerFont(__dirname + '/PUSAB.otf', { family: 'Pusab' });
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');


const c = [canvas.width/2, canvas.height/2];
ctx.font = `${fontSize}px "Pusab"`;
ctx.strokeStyle = "black";
ctx.textAlign = "center";
ctx.lineWidth = blackStroke;
ctx.strokeText(text, c[0], c[1]+50);
ctx.fillStyle = "white";
ctx.fillText(text, c[0], c[1]+50);

const img = new Image();
img.onload = () => ctx.drawImage(img, 0, 0);
img.onerror = err => { throw err };
img.src = __dirname + '/template.png';

const out = fs.createWriteStream(__dirname + '/output.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () =>  console.log('done'));
