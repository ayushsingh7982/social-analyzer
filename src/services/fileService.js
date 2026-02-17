const { extractTextFromPDF } = require('../utils/pdfExtractor');
const { extractTextFromImage } = require('../utils/ocrExtractor');

function cleanText(text) {
  if (!text) return '';
  
  // Remove repeated special characters (3 or more in a row)
  text = text.replace(/([^\w\s])\1{2,}/g, '$1');
  
  // Collapse multiple spaces into single space
  text = text.replace(/\s+/g, ' ');
  
  // Remove isolated single letters (except 'a' and 'I')
  text = text.replace(/\b(?![aAiI]\b)[a-zA-Z]\b/g, '');
  
  // Collapse multiple spaces again after removing single letters
  text = text.replace(/\s+/g, ' ');
  
  // Trim whitespace
  text = text.trim();
  
  // Limit to 4000 characters
  if (text.length > 4000) {
    text = text.substring(0, 4000);
  }
  
  return text;
}

async function extractTextFromFile(file) {
  const { mimetype, buffer } = file;

  try {
    let text = '';
    
    if (mimetype === 'application/pdf') {
      text = await extractTextFromPDF(buffer);
    } else if (mimetype.startsWith('image/')) {
      text = await extractTextFromImage(buffer);
    } else {
      throw new Error(`Unsupported file type: ${mimetype}`);
    }
    
    // Clean the extracted text
    text = cleanText(text);
    
    // Return fallback message if no text was extracted
    return text || 'No readable text detected';
  } catch (error) {
    throw new Error(`Text extraction failed: ${error.message}`);
  }
}

module.exports = { extractTextFromFile };
