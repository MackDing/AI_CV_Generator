export interface ResumeForm {
  name: string;
  targetPosition: string;
  workExperience: string;
  education: string;
  skills: string;
  additionalInfo?: string;
  template: string;
}

export interface AIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export interface Template {
  id: string;
  name: string;
  prompt: string;
}

export interface ResumeHistory {
  id: string;
  form: ResumeForm;
  content: string;
  createdAt: string;
}