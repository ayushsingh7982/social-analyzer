# 📊 Social Media Content Analyzer

> Upload a screenshot of a post → extract text → predict audience reaction → get improvement suggestions

A lightweight AI + OCR powered web app that evaluates social media posts for sentiment, engagement potential and optimization tips.

---

## 🚀 Live Demo

Add your deployed link here:

```
https://social-analyzer-4yqd.onrender.com/
```

---

## ✨ What This App Does

1. Upload a screenshot (Instagram, Twitter/X, LinkedIn etc.)
2. OCR extracts text from the image/PDF
3. AI analyzes the content
4. You receive:

   * Audience sentiment
   * Engagement score
   * Readability level
   * Growth suggestions
   * Recommended hashtags

---

## 🧠 Core Capabilities

| Feature               | Description                              |
| --------------------- | ---------------------------------------- |
| OCR Extraction        | Reads text from images & PDFs            |
| Sentiment Detection   | Positive / Neutral / Negative perception |
| Engagement Prediction | Estimates audience interaction potential |
| Content Feedback      | Actionable improvement tips              |
| Hashtag Generation    | Relevant discoverability tags            |
| Fallback Handling     | Graceful handling of low‑quality text    |

---

## 🏗 Tech Stack

### Backend

* Node.js
* Express.js
* Multer (uploads)
* pdf-parse
* Tesseract.js (OCR)

### Frontend

* EJS Templates
* TailwindCSS UI

### AI

* External AI API (text analysis + structured JSON response)

### Deployment

* Render

---

## 📁 Project Structure

```
social-analyzer/
│
├── src/
│   ├── app.js
│   ├── routes/
│   │   └── analyze.js
│   ├── services/
│   │   ├── ocrService.js
│   │   └── aiService.js
│   ├── views/
│   │   ├── index.ejs
│   │   └── result.ejs
│   └── public/
│
├── uploads/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone

```
git clone https://github.com/yourusername/social-analyzer.git
cd social-analyzer
```

### 2. Install

```
npm install
```

### 3. Environment Variables

Create `.env`

```
AI_API_KEY=your_api_key_here
PORT=3000
```

### 4. Run

```
npm run dev
```

Open → [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Render)

**Build Command**

```
npm install
```

**Start Command**

```
npm start
```

Add Environment Variable:

```
AI_API_KEY = your_api_key_here
```

---

## 🔍 Example AI Output

```json
{
  "sentiment": "positive",
  "engagement_score": 7,
  "readability_level": "easy",
  "improvement_suggestions": [
    "Engage with followers",
    "Post consistently",
    "Use visuals"
  ],
  "recommended_hashtags": [
    "branding",
    "socialmedia",
    "engagement"
  ]
}
```

---

## ⚠️ Limitations

* OCR accuracy depends on image clarity
* Very short text cannot be analyzed
* Uploaded files are temporary

---

## 🔮 Future Improvements

* Multi‑language support
* Analytics dashboard
* Save history
* Platform‑specific suggestions

---

## 👨‍💻 Author

Ayush Singh

---

## 📜 License

Educational / Demonstration project


---

## Deployment on Render

### Prerequisites

1. Push your code to GitHub
2. Sign up for a free account at [Render](https://render.com)
3. Have your OpenAI API key ready

### Deployment Steps

1. **Connect Repository**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `social-content-analyzer` (or your choice)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   - Add `AI_API_KEY` with your OpenAI API key
   - Add `AI_API_URL` = `https://api.openai.com/v1/chat/completions`
   - Add `NODE_ENV` = `production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your app will be live at `https://your-app-name.onrender.com`

### Using render.yaml (Alternative)

The project includes a `render.yaml` file for automatic configuration:

1. Push code to GitHub
2. In Render Dashboard, select "New +" → "Blueprint"
3. Connect repository
4. Render will auto-detect `render.yaml` and configure everything
5. Just add your `AI_API_KEY` in the environment variables

### Important Notes

- The app uses **memory-based file storage** (no disk writes)
- Works seamlessly on Render's ephemeral filesystem
- Free tier may have cold starts (first request takes longer)
- Uploads are limited to 5MB

---
