import { Users, Award, Clock, UserCheck, Target, Calendar } from 'lucide-react';

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

const leadershipRoles = [
  {
    title: "Director of Medical Education Affairs",
    organization: "Brazilian Association of Medical Students",
    location: "Brazil",
    period: "2022-2023",
    icon: UserCheck,
    color: "primary"
  },
  {
    title: "President and Founding Member",
    organization: "Association of Medical Students of Rio Grande do Sul",
    location: "Porto Alegre, Brazil",
    period: "2021-2022",
    icon: Target,
    color: "accent"
  },
  {
    title: "President / Vice President / Scientific Director",
    organization: "Medical Student Union, University of Caxias do Sul",
    location: "Caxias do Sul, Brazil",
    period: "2019-2022",
    icon: Users,
    color: "primary"
  },
  {
    title: "Community Builder, Campus Director, Co-lead Impact Summit",
    organization: "Hult Prize Foundation",
    location: "Global",
    period: "2020-2023",
    icon: Target,
    color: "accent"
  }
];

export const ProfessionalExperienceSlide = () => {
  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Professional Experience
        </h1>
      </div>

      <div className="flex-1 space-y-4">
        {/* Teaching Experience */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-primary border-b border-border pb-1">
            Teaching Experience
          </h2>
          
          <div className="grid grid-cols-2 gap-2">
            {teachingPositions.map((position, index) => (
              <div 
                key={index}
                className="bg-gradient-subtle p-2 border border-border shadow-card animate-slide-in text-xs"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="font-bold text-foreground mb-1 text-xs">
                  {position.subject} ({position.year})
                </h3>
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <div className="flex justify-between">
                    <span>{position.hours}</span>
                    <span>{position.selectionMethod}</span>
                  </div>
                  <p>Supervisor: {position.supervisor}</p>
                </div>
                <p className="text-xs text-foreground mt-1 leading-tight">
                  {position.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Professional Activities */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-primary border-b border-border pb-1">
            Leadership & Professional Activities
          </h2>
          
          <div className="grid grid-cols-1 gap-2">
            {leadershipRoles.map((role, index) => {
              const IconComponent = role.icon;
              const isAccent = role.color === "accent";
              
              return (
                <div 
                  key={index}
                  className={`p-3 shadow-card animate-slide-in border-l-4 ${
                    isAccent 
                      ? 'bg-gradient-accent border-l-accent-glow text-white' 
                      : 'bg-gradient-primary border-l-primary-glow text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {role.title}
                      </h3>
                      <h4 className="text-xs font-semibold text-white/90">
                        {role.organization}
                      </h4>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <span>{role.location}</span>
                        <span>•</span>
                        <span className="font-medium">{role.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};