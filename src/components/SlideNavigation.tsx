import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onHome: () => void;
}

export const SlideNavigation = ({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext, 
  onHome 
}: SlideNavigationProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-card backdrop-blur-sm px-6 py-3 shadow-elegant border-2 border-border">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onHome}
        className="hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className="hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm font-bold text-foreground px-4 py-1 bg-primary text-primary-foreground border border-primary">
        {currentSlide + 1} / {totalSlides}
      </span>
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};