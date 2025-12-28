
export interface TranslatedText {
  [languageCode: string]: string; // e.g., { en: "Engineer", fr: "Ingénieur" }
}

export interface CandidateProfile {
  id: string;
  fullName: TranslatedText;
  email: string;
  phone?: string;
  location?: TranslatedText;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  avatar?: string;
  skills: TranslatedText[];
  experience: Experience[];
  education: Education[];
  videoVaultCount?: number;
  matchScore?: number;
  aiInsights?: string;
}

export interface Experience {
  id?: string;
  company: TranslatedText;
  role: TranslatedText;
  period: { start: string; end?: string };
  location: TranslatedText;
  description: TranslatedText;
}

export interface Education {
  id?: string;
  institution: TranslatedText;
  degree: TranslatedText;
  year: number;
  gpa?: string;
}

export interface JobDescription {
  id: string;
  title: TranslatedText;
  company: TranslatedText;
  description: TranslatedText;
  requirements: SkillRequirement[];
  location?: TranslatedText;
  matchAnalysis?: TranslatedText;
}

export interface SkillRequirement {
  skill: TranslatedText;
  level?: 'Beginner' | 'Intermediate' | 'Expert';
}

export type SupportedLanguage = 'en' | 'fr' | 'ur' | 'ar' | 'es';

export interface InterviewSession {
  role: string;
  level: string;
  cvContent: string;
  jobContent: string;
  questions: Array<{ question: string; context: string }>;
  currentIdx: number;
  history: Array<{ type: 'bot' | 'user'; content: string }>;
  scores: number[];
}
