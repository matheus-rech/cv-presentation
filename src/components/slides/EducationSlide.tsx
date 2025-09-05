import { GraduationCap } from 'lucide-react';
import { EditableText } from '../EditableText';
import { useDevMode } from '@/contexts/DevModeContext';

export const EducationSlide = () => {
  const { content, updateContent } = useDevMode();
  const education = content.education || {};
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Education
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-secondary border-2 border-border p-10 shadow-card">
          <div className="flex items-start gap-6">
            <div className="bg-primary p-4 border border-border">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2 border-b-2 border-primary pb-2">
                  <EditableText
                    value={education.degree || "Doctor of Medicine (M.D.)"}
                    onChange={(value) => updateContent('education.degree', value)}
                  />
                </h2>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  <EditableText
                    value={education.institution || "University of Caxias do Sul"}
                    onChange={(value) => updateContent('education.institution', value)}
                  />
                </h3>
                <p className="text-muted-foreground font-medium">
                  <EditableText
                    value={education.location || "Caxias do Sul, Brazil"}
                    onChange={(value) => updateContent('education.location', value)}
                  />
                </p>
              </div>
              
              <div className="bg-accent text-accent-foreground p-4 border-l-4 border-primary mt-6">
                <p className="font-bold text-lg tracking-wide">
                  <EditableText
                    value={education.graduation || "GRADUATED: JANUARY 2024"}
                    onChange={(value) => updateContent('education.graduation', value)}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};