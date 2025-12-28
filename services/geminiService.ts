
import { GoogleGenAI, Type } from "@google/genai";

export const fetchRealTimeJobs = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Find real, current job openings for: "${query}". 
    Provide a list of jobs including title, company, location, and a direct URL to the source (LinkedIn, Indeed, or company career page).`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            company: { type: Type.STRING },
            location: { type: Type.STRING },
            url: { type: Type.STRING },
            matchReason: { type: Type.STRING }
          },
          required: ["title", "company", "url"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse jobs:", response.text);
    return [];
  }
};

export const parseRawCV = async (rawText: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Extract structured CV data from this raw text: "${rawText}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fullName: { type: Type.OBJECT, properties: { en: { type: Type.STRING } } },
          email: { type: Type.STRING },
          phone: { type: Type.STRING },
          location: { type: Type.OBJECT, properties: { en: { type: Type.STRING } } },
          skills: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { en: { type: Type.STRING } } } },
          experience: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                company: { type: Type.OBJECT, properties: { en: { type: Type.STRING } } },
                role: { type: Type.OBJECT, properties: { en: { type: Type.STRING } } },
                period: { type: Type.OBJECT, properties: { start: { type: Type.STRING }, address: { type: Type.STRING } } },
                description: { type: Type.OBJECT, properties: { en: { type: Type.STRING } } }
              }
            } 
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const generatePersonalizedQuestions = async (role: string, level: string, cv: string, jd: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Generate 5 high-quality, personalized technical interview questions.
    Target Role: ${role} (${level})
    Candidate CV: ${cv}
    Target Job Description: ${jd}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            context: { type: Type.STRING }
          },
          required: ["question", "context"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const evaluateInterviewAnswer = async (question: string, answer: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate: Q: ${question}, A: ${answer}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          modelAnswer: { type: Type.STRING }
        },
        required: ["score", "feedback", "modelAnswer"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const getUniversityCareerInsights = async (departmentData: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze placement stats: ${departmentData}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            insight: { type: Type.STRING },
            priority: { type: Type.STRING, enum: ["Low", "Medium", "High"] }
          },
          required: ["title", "insight", "priority"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

// Fix: Implemented getCandidateMatchInsights to resolve missing export error
export const getCandidateMatchInsights = async (jd: string, candidateData: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the match between this Job Description: "${jd}" and this Candidate Profile data: "${candidateData}". 
    Provide a match score (0-100) and specific AI insights about their suitability.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          insights: { type: Type.STRING }
        },
        required: ["score", "insights"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const translateContent = async (text: string, targetLangs: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Translate to: ${targetLangs.join(', ')}. Text: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          translations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                lang: { type: Type.STRING },
                text: { type: Type.STRING }
              },
              required: ["lang", "text"]
            }
          }
        },
        required: ["translations"]
      }
    }
  });
  return JSON.parse(response.text);
};
