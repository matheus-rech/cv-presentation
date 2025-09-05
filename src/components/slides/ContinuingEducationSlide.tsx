import { BookOpen, Calendar } from 'lucide-react';

export const ContinuingEducationSlide = () => {
  const programs = [
    {
      title: "Principles and Practice of Clinical Research (PPCR)",
      institution: "Harvard T.H. Chan School of Public Health",
      location: "Boston, MA",
      year: "2024",
      description: "9-month postgraduate program providing expertise in biostatistics, epidemiology, and clinical trial design.",
      highlight: true
    },
    {
      title: "Continuing Education Program in Research",
      institution: "AO Spine Latin America",
      location: "",
      year: "2019",
      description: "Intensive training in evidence-based practice, literature search, database management, and manuscript writing.",
      highlight: false
    }
  ];

  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Continuing Education
        </h1>
      </div>

      <div className="flex-1 space-y-4">
        {programs.map((program, index) => (
          <div 
            key={program.title}
            className={`p-4 shadow-card animate-slide-in border-l-4 ${
              program.highlight 
                ? 'bg-gradient-primary border-l-accent text-white' 
                : 'bg-gradient-subtle border-l-primary'
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
              <div className="lg:col-span-1 flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  program.highlight ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <BookOpen className={`h-5 w-5 ${
                    program.highlight ? 'text-white' : 'text-primary'
                  }`} />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-4 w-4 ${
                    program.highlight ? 'text-white/80' : 'text-accent'
                  }`} />
                  <span className={`font-semibold text-sm ${
                    program.highlight ? 'text-white' : 'text-accent'
                  }`}>
                    {program.year}
                  </span>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-2">
                <h2 className={`text-lg font-bold ${
                  program.highlight ? 'text-white' : 'text-foreground'
                }`}>
                  {program.title}
                </h2>
                <h3 className={`text-base font-semibold ${
                  program.highlight ? 'text-white/90' : 'text-primary'
                }`}>
                  {program.institution}
                  {program.location && (
                    <span className={`text-sm font-normal ml-2 ${
                      program.highlight ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      • {program.location}
                    </span>
                  )}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  program.highlight ? 'text-white/90' : 'text-muted-foreground'
                }`}>
                  {program.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};