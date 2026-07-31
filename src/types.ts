export interface Personal {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    summary: string;
    dataAnalystTitle: string;
    dataAnalystSummary: string;
    developerTitle: string;
    developerSummary: string;
    teacherTitle: string;
    teacherSummary: string;
}

export interface Experience {
    title: string;
    company: string;
    date: string;
    location: string;
    relevantTo?: string[];
    responsibilities: string[];
}

export interface Education {
    degree: string;
    institution: string;
    date: string;
    courses: string;
    gpa: string;
    honors?: string;
}

export interface Project {
    title: string;
    description: string;
    shortDescription: string;
    date: string;
    technologies: string[];
    github: string | null;
    live: string | null;
    caseStudy?: string;
    image: string;
    featured: boolean;
    category: string[];
}

export interface Certification {
    title: string;
    issuer: string;
    date: string;
    icon: string;
}

export interface BlogPost {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
    url: string;
}

export interface Recommendation {
    name: string;
    title: string;
    date: string;
    relationship: string;
    quote: string;
}

export interface PortfolioData {
    personal: Personal;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: Record<string, string[]>;
    certifications: Certification[];
    achievements: string[];
    blog: BlogPost[];
    recommendations: Recommendation[];
}

export type RoleTrack = 'dataAnalyst' | 'developer' | 'teacher';
