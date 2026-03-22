import fs from 'fs';
import { Jimp } from 'jimp';

async function main() {
  console.log('Loading br4.jpg...');
  const image = await Jimp.read('./public/br4.jpg');
  
  console.log('Processing pixels...');
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // threshold = 240
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // alpha = 0
    }
  });

  console.log('Resizing for web optimization...');
  // It's a huge 1.8MB image, let's resize it to 600px width since it's only displayed at 65px/85px!
  image.resize(600, Jimp.AUTO);

  console.log('Saving as transparent PNG...');
  await image.write('./public/butterfly.png');
  console.log('Done!');
}

main().catch(console.error);
