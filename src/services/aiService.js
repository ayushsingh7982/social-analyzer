const axios = require('axios');

async function makeApiRequest(apiUrl, apiKey, prompt) {
  const response = await axios.post(
    apiUrl,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    }
  );
  return response.data.choices[0].message.content;
}

function validateFields(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  if (!data.sentiment || data.sentiment.trim() === '') {
    return false;
  }
  
  if (data.engagement_score === undefined || data.engagement_score === null || data.engagement_score === '') {
    return false;
  }
  
  return true;
}

async function analyzeText(text) {
  const apiKey = process.env.AI_API_KEY;
  const apiUrl = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';

  if (!apiKey) {
    throw new Error('AI_API_KEY not configured in environment variables');
  }

  // Skip AI analysis if text is too short
  if (!text || text.length < 40) {
    console.log('Text too short for analysis, skipping AI');
    return null;
  }

  const fallbackResponse = {
    sentiment: 'neutral',
    engagement_score: '50',
    readability_level: 'moderate',
    improvement_suggestions: ['Unable to analyze content'],
    recommended_hashtags: []
  };

  try {
    const prompt = `You are a strict API that returns ONLY JSON.

Rules:
- No explanation
- No markdown
- No extra text
- engagement_score must be number between 1-10
- improvement_suggestions must contain at least 3 items
- recommended_hashtags must contain 5 relevant hashtags without #

Return this exact structure:

{
  "sentiment": "positive | neutral | negative",
  "engagement_score": number,
  "readability_level": "easy | medium | hard",
  "improvement_suggestions": [],
  "recommended_hashtags": []
}

Post: """ ${text} """`;
    
    let content = await makeApiRequest(apiUrl, apiKey, prompt);
    
    try {
      let parsedData = JSON.parse(content);
      
      // Validate fields
      if (!validateFields(parsedData)) {
        console.error('Invalid fields detected, retrying with validation instruction');
        
        // Retry with validation instruction
        const retryPrompt = `Respond only with valid JSON. Do not leave fields empty. ${prompt}`;
        content = await makeApiRequest(apiUrl, apiKey, retryPrompt);
        
        try {
          parsedData = JSON.parse(content);
          
          if (!validateFields(parsedData)) {
            console.error('Fields still invalid after retry, returning null');
            return null;
          }
          
          return parsedData;
        } catch (retryParseError) {
          console.error('JSON parse failed after validation retry');
          return null;
        }
      }
      
      return parsedData;
    } catch (parseError) {
      console.error('JSON parse failed, retrying with strict instruction');
      
      // Retry with strict JSON instruction
      const retryPrompt = `Respond strictly in JSON. ${prompt}`;
      content = await makeApiRequest(apiUrl, apiKey, retryPrompt);
      
      try {
        return JSON.parse(content);
      } catch (retryParseError) {
        console.error('JSON parse failed after retry, returning fallback');
        return fallbackResponse;
      }
    }
  } catch (error) {
    console.error(`AI analysis failed: ${error.message}`);
    return fallbackResponse;
  }
}

module.exports = { analyzeText };
