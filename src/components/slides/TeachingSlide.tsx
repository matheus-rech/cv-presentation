import { Users, Clock, Award } from 'lucide-react';

export const TeachingSlide = () => {
  const positions = [
    {
      subject: "Neuroanatomy",
      year: "2019–2020",
      hours: "",
      supervisor: "Asdrubal Falavigna, MD, PhD",
      description: "Delivered additional lectures and provided assistance to junior medical and other health-sciences students under faculty supervision."
    },
    {
      subject: "Neurophysiology", 
      year: "2019",
      hours: "30 contact hours",
      supervisor: "Asdrubal Falavigna, MD, PhD",
      description: "Delivered additional lectures and assistance to junior medical students."
    },
    {
      subject: "Biophysiology",
      year: "2020", 
      hours: "30 contact hours",
      supervisor: "Rafael Colombo, PhD",
      description: "Delivered additional lectures and assistance to health-sciences students."
    },
    {
      subject: "Human Anatomy (Morphology)",
      year: "2020",
      hours: "60 contact hours", 
      supervisor: "Fabio Pasqualoto, MD, PhD",
      description: "Delivered additional lectures and assistance to health-sciences students."
    },
    {
      subject: "Surgical Technique & Anesthesia",
      year: "2020",
      hours: "60 contact hours",
      supervisor: "Marcos Dalponte, MD", 
      description: "Assisted with skills-focused teaching and supplemental lectures."
    },
    {
      subject: "Neurology / Neuropsychiatry",
      year: "2022",
      hours: "60 contact hours",
      supervisor: "Marcelo Mattana, MD",
      description: "Delivered additional lectures and assistance to junior medical students under faculty supervision."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Teaching Experience
        </h1>
        <p className="text-xl text-muted-foreground">University of Caxias do Sul, Caxias do Sul, Brazil</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position, index) => (
            <div 
              key={position.subject}
              className="bg-gradient-subtle rounded-xl p-6 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gradient-accent p-2 rounded-full">
                    <Users className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                    Teaching Assistant
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground leading-tight">
                  {position.subject}
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium text-accent">{position.year}</span>
                  </div>
                  
                  {position.hours && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary">{position.hours}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {position.description}
                </p>
                
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Supervisor:</span> {position.supervisor}
                  </p>
                  <p className="text-xs text-accent mt-1">
                    Selection: competitive exam
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};