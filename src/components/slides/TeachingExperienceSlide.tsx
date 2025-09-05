import { GraduationCap } from 'lucide-react';

const teachingPositions = [
  {
    subject: "Neurology / Neuropsychiatry",
    year: "2022",
    hours: "60 hours",
    supervisor: "Marcelo Mattana, MD",
    description: "Delivered additional lectures and assistance to junior medical students",
    selectionMethod: "Competitive exam"
  },
  {
    subject: "Surgical Technique & Anesthesia",
    year: "2020",
    hours: "60 hours",
    supervisor: "Marcos Dalponte, MD", 
    description: "Assisted with skills-focused teaching and supplemental lectures",
    selectionMethod: "Competitive exam"
  },
  {
    subject: "Human Anatomy (Morphology)", 
    year: "2020",
    hours: "60 hours",
    supervisor: "Fabio Pasqualoto, MD, PhD",
    description: "Delivered additional lectures and assistance to health-sciences students",
    selectionMethod: "Competitive exam"
  },
  {
    subject: "Biophysiology",
    year: "2020", 
    hours: "30 hours",
    supervisor: "Rafael Colombo, PhD",
    description: "Delivered additional lectures and assistance to health-sciences students",
    selectionMethod: "Competitive exam"
  },
  {
    subject: "Neuroanatomy",
    year: "2019-2020",
    hours: "",
    supervisor: "Asdrubal Falavigna, MD, PhD",
    description: "Delivered additional lectures and provided assistance to junior medical and other health-sciences students",
    selectionMethod: "Competitive exam"
  },
  {
    subject: "Neurophysiology",
    year: "2019", 
    hours: "30 hours",
    supervisor: "Asdrubal Falavigna, MD, PhD",
    description: "Delivered additional lectures and assistance to junior medical students",
    selectionMethod: "Competitive exam"
  }
];

export const TeachingExperienceSlide = () => {
  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Teaching Experience
        </h1>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-2 gap-3">
          {teachingPositions.map((position, index) => (
            <div 
              key={index}
              className="bg-gradient-subtle p-3 border border-border shadow-card animate-slide-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-2">
                <GraduationCap className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-sm leading-tight">
                    {position.subject} ({position.year})
                  </h3>
                  {position.hours && (
                    <p className="text-xs text-accent font-semibold mt-1">
                      {position.hours}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Supervisor: {position.supervisor}
                  </p>
                  <p className="text-xs text-foreground mt-2 leading-relaxed">
                    {position.description}
                  </p>
                  <p className="text-xs text-primary font-medium mt-1">
                    Selection: {position.selectionMethod}
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