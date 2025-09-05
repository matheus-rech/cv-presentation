import { useState, useEffect } from 'react';
import { SlideContainer } from './SlideContainer';
import { SlideNavigation } from './SlideNavigation';
import { DevToolbar } from './DevToolbar';
import { DevModeProvider } from '@/contexts/DevModeContext';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { TitleSlide } from './slides/TitleSlide';
import { AcademicBackgroundSlide } from './slides/AcademicBackgroundSlide';
import { TeachingExperienceSlide } from './slides/TeachingExperienceSlide';
import { ContinuingEducationSlide } from './slides/ContinuingEducationSlide';
import { LeadershipServiceSlide } from './slides/LeadershipServiceSlide';
import { HonorsSlide } from './slides/HonorsSlide';
import { PublicationsSlide } from './slides/PublicationsSlide';
import { AbstractsPresentationsSlide } from './slides/AbstractsPresentationsSlide';

const slides = [
  { component: TitleSlide, title: "Dr. Matheus Machado Rech" },
  { component: AcademicBackgroundSlide, title: "Academic Background" },
  { component: TeachingExperienceSlide, title: "Teaching Experience" },
  { component: ContinuingEducationSlide, title: "Continuing Education" },
  { component: LeadershipServiceSlide, title: "Leadership, Service & Innovation" },
  { component: HonorsSlide, title: "Honors & Awards" },
  { component: PublicationsSlide, title: "Peer-Reviewed Articles" },
  { component: AbstractsPresentationsSlide, title: "Abstracts & Presentations" }
];

export const CVPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCleanMode, setIsCleanMode] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      } else if (event.key === 'Home') {
        setCurrentSlide(0);
      } else if (event.key === 'End') {
        setCurrentSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;

  const goToPrevious = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const goToNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const goToHome = () => {
    setCurrentSlide(0);
  };

  return (
    <DevModeProvider>
      <div className="relative">
        {!isCleanMode && <DevToolbar />}
        
        <SlideContainer key={currentSlide}>
          <CurrentSlideComponent />
        </SlideContainer>
        
        {!isCleanMode && (
          <SlideNavigation
            currentSlide={currentSlide}
            totalSlides={slides.length}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onHome={goToHome}
          />
        )}
        
        {/* Slide indicator */}
        {!isCleanMode && (
          <div className="fixed top-6 right-6 bg-card backdrop-blur-sm px-4 py-2 shadow-elegant border-2 border-border">
            <span className="text-sm font-bold text-foreground tracking-wide">
              {slides[currentSlide].title}
            </span>
          </div>
        )}
        
        {/* Keyboard shortcuts hint */}
        {!isCleanMode && (
          <div className="fixed bottom-6 right-6 bg-card backdrop-blur-sm px-3 py-2 shadow-elegant border-2 border-border">
            <p className="text-xs text-muted-foreground font-medium">
              Use ← → arrow keys or click to navigate
            </p>
          </div>
        )}
        
        {/* Clean mode toggle - always visible */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCleanMode(!isCleanMode)}
          className="fixed bottom-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card border border-border z-50 p-2"
        >
          {isCleanMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
    </DevModeProvider>
  );
};