const Tesseract = require('tesseract.js');
const sharp = require('sharp');

async function extractTextFromImage(buffer) {
  try {
    // Convert image buffer to PNG using sharp
    const pngBuffer = await sharp(buffer)
      .png()
      .toBuffer();

    // Run OCR on converted PNG buffer
    const { data: { text } } = await Tesseract.recognize(pngBuffer, 'eng');
    
    return text;
  } catch (error) {
    console.error(`OCR extraction failed: ${error.message}`);
    return '';
  }
}

module.exports = { extractTextFromImage };
