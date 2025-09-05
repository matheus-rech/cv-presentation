import { Heart, Users, Edit3, Calendar, Globe } from 'lucide-react';

export const ServiceActivitiesSlide = () => {
  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Service & Activities
        </h1>
      </div>

      <div className="flex-1 space-y-4">
        {/* Course & Event Organization */}
        <div className="bg-gradient-subtle p-4 border border-border shadow-card">
          <h2 className="text-lg font-bold text-primary border-b border-border pb-2 mb-3">
            Course & Event Organization
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-accent mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Mayo Clinic School of Continuous Professional Development
                </p>
                <p className="text-xs text-muted-foreground">
                  Staff, Rhoton-de Oliveira Skull Base Lab Course • Jacksonville, FL • March 2023
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voluntary Work */}
        <div className="bg-gradient-subtle p-4 border border-border shadow-card">
          <h2 className="text-lg font-bold text-primary border-b border-border pb-2 mb-3">
            Voluntary Work
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Heart className="h-4 w-4 text-accent mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Vine Trust – "Amazon Hope" Medical Program
                </p>
                <p className="text-xs text-muted-foreground">
                  Volunteer Medical Student • Loreto Region, Peru • January–February 2023
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Committee Service */}
        <div className="bg-gradient-subtle p-4 border border-border shadow-card">
          <h2 className="text-lg font-bold text-primary border-b border-border pb-2 mb-3">
            Committee Service
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-accent mt-1" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Student Representative, Medical School Council
                </p>
                <p className="text-xs text-muted-foreground">
                  University of Caxias do Sul • 2023
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-accent mt-1" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Elected Member, Fiscal Council
                </p>
                <p className="text-xs text-muted-foreground">
                  Gaucho Association of History of Medicine, Porto Alegre • 2020–2024
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-4 w-4 text-accent mt-1" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Elected Student Delegate, National Assembly
                </p>
                <p className="text-xs text-muted-foreground">
                  Brazilian Association of Medical Education, Brasília • 2020
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Activities */}
        <div className="bg-gradient-subtle p-4 border border-border shadow-card">
          <h2 className="text-lg font-bold text-primary border-b border-border pb-2 mb-3">
            Editorial Activities
          </h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Edit3 className="h-4 w-4 text-accent mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Regional Editor
                </p>
                <p className="text-xs text-muted-foreground">
                  Journal of the Brazilian Medical Association – Junior Doctors Section • 2020–Present
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};