# Social Media Content Analyzer

A web application that analyzes screenshots or PDFs of social media posts. The system extracts text using OCR, evaluates engagement quality using AI, and provides actionable suggestions and hashtags.

---

## Features

* Upload image or PDF of a social media post
* Automatic text extraction (OCR + PDF parsing)
* AI-based sentiment and engagement analysis
* Readability evaluation
* Improvement suggestions
* Recommended hashtags
* Graceful handling of unreadable or short text
* File size safety limits

---

## System Flow

1. User uploads screenshot or PDF
2. Server extracts text from file
3. Text is cleaned and validated
4. AI analyzes the content
5. Structured results are rendered on a dashboard

```
Upload → OCR/PDF → Clean Text → AI Analysis → Result Page
```

---

## Tech Stack

### Backend

* Node.js
* Express.js
* Multer (file uploads)
* Tesseract OCR
* PDF parsing libraries
* OpenAI API (structured analysis)

### Frontend

* EJS templates
* Tailwind CSS

---

## Project Structure

```
src/
 ├── routes/
 │    └── analyze.js
 ├── services/
 │    ├── fileService.js
 │    └── aiService.js
 ├── views/
 │    ├── index.ejs
 │    ├── result.ejs
 │    └── error.ejs
 └── app.js

uploads/
.env
README.md
```

---

## Environment Setup

Create a `.env` file in the root directory:

```
AI_API_KEY=your_api_key_here
PORT=3000
```

---

## Run Locally

```
npm install
npm run dev
```

Then open:

[http://localhost:3000](http://localhost:3000)

---

## Validation & Safety

* Maximum upload size: 5MB
* Short or unreadable text is skipped safely
* Structured JSON validation prevents broken responses
* Global error handler prevents server crashes

---

## Limitations

* OCR accuracy depends on image quality
* Complex memes may produce partial text
* AI suggestions are heuristic guidance, not guaranteed performance

---

## Future Improvements

* Support video thumbnails
* Multi-language analysis
* Historical performance comparison
* Batch upload processing

---

## License

For educational and demonstration purposes only.
