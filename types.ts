
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  location?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    linkedin: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
}
