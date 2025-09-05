import { ReactNode } from 'react';
import { useDevMode } from '@/contexts/DevModeContext';

interface SlideContainerProps {
  children: ReactNode;
  className?: string;
}

export const SlideContainer = ({ children, className = "" }: SlideContainerProps) => {
  const { content } = useDevMode();
  const frameSettings = content.frameSettings || {
    borderWidth: "border",
    borderColor: "border-border", 
    borderStyle: "border-solid",
    shadow: "shadow-slide"
  };

  const frameClasses = `${frameSettings.borderWidth} ${frameSettings.borderColor} ${frameSettings.borderStyle} ${frameSettings.shadow}`;

  return (
    <div className={`min-h-screen w-full bg-gradient-structure flex items-center justify-center ${className}`}>
      <div 
        className={`bg-card animate-fade-in ${frameClasses}`}
        style={{
          width: '95vw',
          maxWidth: '1920px',
          height: '90vh',
          maxHeight: '1080px',
          aspectRatio: '16/9',
          padding: '3rem',
          overflow: 'hidden'
        }}
      >
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};