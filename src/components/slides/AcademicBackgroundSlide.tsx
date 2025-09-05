import { GraduationCap, Brain, BarChart3, Code, FileText } from 'lucide-react';
import { EditableText } from '../EditableText';
import { useDevMode } from '@/contexts/DevModeContext';

export const AcademicBackgroundSlide = () => {
  const { content, updateContent } = useDevMode();
  const educationData = content.education || {};
  const researchData = content.research || {};

  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Academic Background
        </h1>
      </div>

      <div className="flex-1 space-y-6">
        {/* Education & Research Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Section */}
          <div className="bg-gradient-subtle p-6 border border-border shadow-card">
            <h2 className="text-xl font-bold text-primary border-b border-border pb-2 mb-4">
              Education
            </h2>
            <div className="space-y-3">
              <EditableText
                value={educationData.degree || "Doctor of Medicine (M.D.)"}
                onChange={(value) => updateContent('education.degree', value)}
                className="text-lg font-bold text-foreground"
              />
              <EditableText
                value={educationData.institution || "University of Caxias do Sul"}
                onChange={(value) => updateContent('education.institution', value)}
                className="text-base text-primary font-semibold"
              />
              <EditableText
                value={educationData.location || "Caxias do Sul, Brazil"}
                onChange={(value) => updateContent('education.location', value)}
                className="text-sm text-muted-foreground"
              />
              <EditableText
                value={educationData.graduation || "2018 - 2024"}
                onChange={(value) => updateContent('education.graduation', value)}
                className="text-sm text-accent font-semibold"
              />
            </div>
          </div>

          {/* Research Experience Section - Same visual style */}
          <div className="bg-gradient-subtle p-6 border border-border shadow-card">
            <h2 className="text-xl font-bold text-primary border-b border-border pb-2 mb-4">
              Research Experience
            </h2>
            <div className="space-y-3">
              <EditableText
                value={researchData.title || "Scientific Initiation Scholarship Program"}
                onChange={(value) => updateContent('research.title', value)}
                className="text-lg font-bold text-foreground"
              />
              <EditableText
                value={researchData.institution || "University of Caxias do Sul"}
                onChange={(value) => updateContent('research.institution', value)}
                className="text-base text-primary font-semibold"
              />
              <EditableText
                value={researchData.program || "Funded by the National Council for Scientific and Technological Development (CNPq)"}
                onChange={(value) => updateContent('research.program', value)}
                className="text-sm text-muted-foreground"
              />
              <EditableText
                value={researchData.period || "April 2020 - March 2023"}
                onChange={(value) => updateContent('research.period', value)}
                className="text-sm text-accent font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Research Details - Connected visually with dark background */}
        <div className="bg-gradient-primary p-6 shadow-elegant">
          <h2 className="text-xl font-bold text-white text-center border-b border-white/20 pb-2 mb-4">
            Research Focus & Achievements
          </h2>
          
          {/* Detailed description from CV */}
          <div className="text-white/90 text-sm leading-relaxed mb-4 text-center max-w-4xl mx-auto">
            A federally funded national research fellowship focused on healthcare innovation and clinical outcomes prediction.
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="text-center animate-slide-in" style={{ animationDelay: '0s' }}>
              <div className="bg-white/20 p-3 rounded-full w-fit mx-auto mb-2">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">AI/ML Models</h3>
              <p className="text-xs text-white/80 leading-tight">
                Engineered and validated AI/ML models to predict patient outcomes in complex clinical scenarios
              </p>
            </div>
            
            <div className="text-center animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/20 p-3 rounded-full w-fit mx-auto mb-2">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Data Pipelines</h3>
              <p className="text-xs text-white/80 leading-tight">
                Constructed robust Python/Matlab data pipelines to simulate uncertainty in healthcare systems
              </p>
            </div>
            
            <div className="text-center animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/20 p-3 rounded-full w-fit mx-auto mb-2">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Novel Approaches</h3>
              <p className="text-xs text-white/80 leading-tight">
                Investigated novel machine learning approaches for predicting patient-specific variability
              </p>
            </div>
            
            <div className="text-center animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/20 p-3 rounded-full w-fit mx-auto mb-2">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Technical Reports</h3>
              <p className="text-xs text-white/80 leading-tight">
                Authored technical reports and presented findings to faculty and the national funding agency (CNPq)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};