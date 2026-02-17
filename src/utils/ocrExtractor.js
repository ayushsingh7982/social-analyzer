const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function extractTextFromImage(filePath) {
  let tempPngPath = null;

  try {
    // Convert image to PNG using sharp
    const ext = path.extname(filePath).toLowerCase();
    tempPngPath = filePath.replace(ext, '-temp.png');
    
    await sharp(filePath)
      .png()
      .toFile(tempPngPath);

    // Run OCR on converted PNG
    const { data: { text } } = await Tesseract.recognize(tempPngPath, 'eng');
    
    // Clean up temporary file
    if (fs.existsSync(tempPngPath)) {
      fs.unlinkSync(tempPngPath);
    }
    
    return text;
  } catch (error) {
    // Clean up temporary file on error
    if (tempPngPath && fs.existsSync(tempPngPath)) {
      try {
        fs.unlinkSync(tempPngPath);
      } catch (cleanupError) {
        console.error('Failed to clean up temp file:', cleanupError.message);
      }
    }
    console.error(`OCR extraction failed: ${error.message}`);
    return '';
  }
}

module.exports = { extractTextFromImage };
