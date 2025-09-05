import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ContentData {
  [key: string]: any;
}

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  content: ContentData;
  updateContent: (key: string, value: any) => void;
  exportContent: () => string;
  importContent: (jsonContent: string) => void;
  resetContent: () => void;
}

const DevModeContext = createContext<DevModeContextType | null>(null);

import { defaultPublications, defaultAbstracts } from '@/lib/publications-data';

const defaultContent: ContentData = {
  title: {
    name: "Matheus Machado Rech",
    degree: "M.D.",
    phone: "+55 54 9 96921904",
    email: "mmrech.md@gmail.com",
    linkedin: "LinkedIn: /in/mmrech/",
    location: "Caxias do Sul, RS, Brazil",
    orcid: "ORCID: 0000-0002-2961-9443",
    languages: [
      { name: "English", level: "Proficient", flag: "🇺🇸" },
      { name: "Spanish", level: "Proficient", flag: "🇪🇸" },
      { name: "Portuguese", level: "Native", flag: "🇧🇷" }
    ],
    photoSettings: {
      size: "w-64 h-64",
      borderWidth: "border-4",
      borderColor: "border-primary",
      shadow: "shadow-2xl"
    }
  },
  frameSettings: {
    borderWidth: "border",
    borderColor: "border-border",
    borderStyle: "border-solid",
    shadow: "shadow-slide"
  },
  education: {
    degree: "Doctor of Medicine (M.D.)",
    institution: "University of Caxias do Sul",
    location: "Caxias do Sul, Brazil",
    graduation: "2018 - 2024"
  },
  research: {
    title: "Scientific Initiation Scholarship Program",
    institution: "University of Caxias do Sul",
    program: "Funded by the National Council for Scientific and Technological Development (CNPq)",
    period: "April 2020 - March 2023"
  },
  publications: defaultPublications,
  abstracts: defaultAbstracts,
  academic: {
    honors: [],
    publications: [],
    continuingEducation: []
  },
  professional: {
    teaching: [],
    leadership: [],
    activities: []
  }
};

export const DevModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [content, setContent] = useState<ContentData>(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('cv-content');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cv-content', JSON.stringify(content));
  }, [content]);

  const toggleDevMode = () => {
    setIsDevMode(prev => !prev);
  };

  const updateContent = (key: string, value: any) => {
    setContent(prev => {
      const keys = key.split('.');
      const newContent = { ...prev };
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const exportContent = () => {
    return JSON.stringify(content, null, 2);
  };

  const importContent = (jsonContent: string) => {
    try {
      const parsedContent = JSON.parse(jsonContent);
      setContent(parsedContent);
    } catch (error) {
      console.error('Error importing content:', error);
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem('cv-content');
  };

  return (
    <DevModeContext.Provider value={{
      isDevMode,
      toggleDevMode,
      content,
      updateContent,
      exportContent,
      importContent,
      resetContent
    }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};