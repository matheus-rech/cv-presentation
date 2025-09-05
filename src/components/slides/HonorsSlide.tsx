import { Trophy, Star, Award } from 'lucide-react';

export const HonorsSlide = () => {
  const honors = [
    {
      title: "First Place, Secondary Research: Gynecology",
      organization: "Brazilian Congress of Gynecology and Obstetrics",
      location: "Rio de Janeiro, Brazil",
      year: "2025",
      icon: Trophy,
      color: "accent"
    },
    {
      title: "Honorable Mention, Machine Learning Algorithm",
      organization: "UCS Young Researchers Meeting", 
      location: "Caxias do Sul, Brazil",
      year: "2021",
      icon: Star,
      color: "primary"
    },
    {
      title: "Special Prize (Honorable Mention), BRICS International School",
      organization: "Contest for BRICS Young Leaders",
      location: "Moscow, Russia", 
      year: "2020",
      icon: Award,
      color: "accent"
    }
  ];

  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Honors & Awards
        </h1>
      </div>

      <div className="flex-1 space-y-3">
        {honors.map((honor, index) => {
          const IconComponent = honor.icon;
          const isAccent = honor.color === "accent";
          
          return (
            <div 
              key={index}
              className={`p-3 shadow-elegant animate-slide-in border-l-4 ${
                isAccent 
                  ? 'bg-gradient-accent border-l-accent-glow text-white' 
                  : 'bg-gradient-primary border-l-primary-glow text-white'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-sm font-bold text-white leading-tight">
                        {honor.title}
                      </h2>
                      <h3 className="text-xs font-semibold text-white/90">
                        {honor.organization}
                      </h3>
                      <p className="text-xs text-white/80">
                        {honor.location}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-white bg-white/20 px-2 py-1 rounded">
                      {honor.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};