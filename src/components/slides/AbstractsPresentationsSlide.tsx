import { Mic, FileText, Users } from 'lucide-react';
import { useDevMode } from '@/contexts/DevModeContext';

export const AbstractsPresentationsSlide = () => {
  const { content } = useDevMode();
  const abstracts = content.abstracts || [];

  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Abstracts & Presentations
        </h1>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {abstracts.map((abstract: any, index: number) => {
          // Determine icon based on presentation type
          let IconComponent = FileText;
          if (abstract.type?.toLowerCase().includes('oral')) {
            IconComponent = Mic;
          } else if (abstract.type?.toLowerCase().includes('poster')) {
            IconComponent = Users;
          }

          return (
            <div 
              key={index}
              className="bg-gradient-subtle p-4 border border-border shadow-card animate-slide-in hover:shadow-elegant transition-shadow"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-sm font-bold text-foreground leading-tight">
                    {abstract.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-primary">
                      {abstract.event}
                    </span>
                    {abstract.location && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {abstract.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <span className="bg-accent text-white px-2 py-1 rounded text-xs font-bold">
                    {abstract.year}
                  </span>
                  {abstract.type && (
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {abstract.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};