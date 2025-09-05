import { Users, Heart, Edit3, Calendar, Globe, Award, Target } from 'lucide-react';

export const LeadershipServiceSlide = () => {
  const leadershipRoles = [
    {
      title: "Director of Medical Education Affairs",
      organization: "Brazilian Association of Medical Students",
      period: "2022-2023"
    },
    {
      title: "President and Founding Member",
      organization: "Association of Medical Students of Rio Grande do Sul",
      period: "2021-2022"
    },
    {
      title: "President / Vice President / Scientific Director",
      organization: "Medical Student Union, University of Caxias do Sul",
      period: "2019-2022"
    },
    {
      title: "Community Builder, Campus Director, Co-lead Impact Summit",
      organization: "Hult Prize Foundation (Global)",
      period: "2020-2023"
    }
  ];

  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Leadership, Service & Innovation
        </h1>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden">
        {/* Leadership Roles - Compact */}
        <div className="bg-gradient-primary p-3 shadow-card text-white">
          <h2 className="text-lg font-bold border-b border-white/30 pb-2 mb-2">
            Leadership & Professional Activities
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {leadershipRoles.map((role, index) => (
              <div key={index} className="bg-white/10 p-2 rounded">
                <p className="text-xs font-bold">{role.title}</p>
                <p className="text-xs opacity-90">{role.organization}</p>
                <p className="text-xs font-semibold">{role.period}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service & Activities - Compact Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Course Organization */}
          <div className="bg-gradient-subtle p-3 border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-primary">Course Organization</h3>
            </div>
            <p className="text-xs font-semibold text-foreground">Mayo Clinic</p>
            <p className="text-xs text-muted-foreground">Rhoton-de Oliveira Skull Base Lab • 2023</p>
          </div>

          {/* Volunteer Work */}
          <div className="bg-gradient-subtle p-3 border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-primary">Volunteer Work</h3>
            </div>
            <p className="text-xs font-semibold text-foreground">Vine Trust "Amazon Hope"</p>
            <p className="text-xs text-muted-foreground">Peru Medical Program • 2023</p>
          </div>

          {/* Editorial Activities */}
          <div className="bg-gradient-subtle p-3 border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Edit3 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-primary">Editorial Activities</h3>
            </div>
            <p className="text-xs font-semibold text-foreground">Regional Editor</p>
            <p className="text-xs text-muted-foreground">J. Brazilian Medical Association • 2020-Present</p>
          </div>

          {/* Committee Service */}
          <div className="bg-gradient-subtle p-3 border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-primary">Committee Service</h3>
            </div>
            <p className="text-xs font-semibold text-foreground">3 Positions</p>
            <p className="text-xs text-muted-foreground">Medical School, History Assoc, ABEM</p>
          </div>
        </div>
      </div>
    </div>
  );
};