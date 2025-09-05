import { Crown, Globe, Building, Award } from 'lucide-react';

export const LeadershipSlide = () => {
  const roles = [
    {
      title: "Director of Medical Education Affairs",
      organization: "Brazilian Association of Medical Students",
      location: "Brazil",
      period: "2022–2023",
      icon: Crown,
      color: "primary"
    },
    {
      title: "President and Founding Member", 
      organization: "Association of Medical Students of Rio Grande do Sul",
      location: "Porto Alegre, Brazil",
      period: "2021–2022",
      icon: Building,
      color: "accent"
    },
    {
      title: "President (2021–2022), Vice President (2020–2021), Scientific Director (2019–2020)",
      organization: "Medical Student Union, University of Caxias do Sul",
      location: "Caxias do Sul, Brazil", 
      period: "2019–2022",
      icon: Award,
      color: "primary"
    },
    {
      title: "Community Builder, Campus Director, Co-lead Impact Summit, Global Semifinals Staff",
      organization: "Hult Prize Foundation",
      location: "Global",
      period: "2020–2023",
      icon: Globe,
      color: "accent"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Leadership & Activities
        </h1>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        {roles.map((role, index) => {
          const IconComponent = role.icon;
          const isAccent = role.color === "accent";
          
          return (
            <div 
              key={index}
              className={`rounded-xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-in ${
                isAccent ? 'bg-gradient-accent' : 'bg-gradient-primary'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-6">
                <div className="bg-white/20 p-4 rounded-full">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <h2 className="text-2xl font-bold text-white leading-tight">
                    {role.title}
                  </h2>
                  <h3 className="text-xl font-semibold text-white/90">
                    {role.organization}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-white/80">
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
  );
};