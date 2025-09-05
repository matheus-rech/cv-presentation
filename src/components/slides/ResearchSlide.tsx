import { Brain, Code, BarChart3 } from 'lucide-react';

export const ResearchSlide = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI/ML Models",
      description: "Engineered and validated models to predict patient outcomes"
    },
    {
      icon: Code,
      title: "Data Pipelines",
      description: "Constructed robust Python/Matlab pipelines for healthcare systems"
    },
    {
      icon: BarChart3,
      title: "Patient Variability",
      description: "Investigated ML approaches for patient-specific predictions"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Research Experience
        </h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-gradient-subtle rounded-xl p-8 shadow-card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Undergraduate Research Fellow
            </h2>
            <h3 className="text-xl font-semibold text-primary mb-2">
              University of Caxias do Sul, Department of Biomedical Engineering
            </h3>
            <p className="text-muted-foreground mb-4">
              PIBIC/CNPq Program | April 2020 – March 2023
            </p>
            <div className="bg-accent/10 rounded-lg p-3 inline-block">
              <p className="text-accent font-medium">
                Federally funded national research fellowship
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div 
                  key={highlight.title}
                  className="bg-background rounded-lg p-6 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-accent p-3 rounded-full w-fit mb-4">
                    <IconComponent className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};