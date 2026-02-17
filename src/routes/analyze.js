const express = require('express');
const multer = require('multer');
const { extractTextFromFile } = require('../services/fileService');
const { analyzeText } = require('../services/aiService');

const router = express.Router();

// Configure multer with memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// POST route for file upload
router.post('/analyze', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.render('result', {
          error: 'File size exceeds 5MB limit. Please upload a smaller file.',
          analysis: null
        });
      }
      return res.render('result', {
        error: `Upload error: ${err.message}`,
        analysis: null
      });
    } else if (err) {
      return res.render('result', {
        error: `Error: ${err.message}`,
        analysis: null
      });
    }
    next();
  });
}, async (req, res) => {
  const startTime = Date.now();
  
  if (!req.file) {
    console.log('No file uploaded');
    return res.redirect('/');
  }

  try {
    console.log('Uploaded file info:');
    console.log('Original name:', req.file.originalname);
    console.log('Mimetype:', req.file.mimetype);
    console.log('Size:', req.file.size, 'bytes');
    
    const extractedText = await extractTextFromFile(req.file);
    console.log('\nExtracted text:');
    console.log(extractedText);
    
    // Check if text extraction was successful
    if (!extractedText || extractedText === 'No readable text detected') {
      const processingTime = Date.now() - startTime;
      return res.render('result', {
        error: 'No readable text could be extracted from the file',
        analysis: null,
        processingTime
      });
    }
    
    // Call AI service for analysis
    const analysis = await analyzeText(extractedText);
    console.log('\nAI Analysis:');
    console.log(JSON.stringify(analysis, null, 2));
    
    const processingTime = Date.now() - startTime;
    res.render('result', {
      error: null,
      analysis: analysis,
      extractedText: extractedText,
      processingTime
    });
  } catch (error) {
    console.error('Error processing file:', error.message);
    const processingTime = Date.now() - startTime;
    res.render('result', {
      error: error.message,
      analysis: null,
      processingTime
    });
  }
});

module.exports = router;
