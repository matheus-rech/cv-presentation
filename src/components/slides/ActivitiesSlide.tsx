import { Stethoscope, Users, Book, Globe2 } from 'lucide-react';

export const ActivitiesSlide = () => {
  const activities = [
    {
      category: "Course & Event Organization",
      items: [
        {
          title: "Mayo Clinic School of Continuous Professional Development",
          subtitle: "Staff, Rhoton-de Oliveira Skull Base Lab Course",
          location: "Jacksonville, FL",
          date: "March 2023"
        }
      ],
      icon: Book,
      color: "primary"
    },
    {
      category: "Voluntary Work", 
      items: [
        {
          title: "Vine Trust – 'Amazon Hope' Medical Program",
          subtitle: "Volunteer Medical Student",
          location: "Loreto Region, Peru",
          date: "January–February 2023"
        }
      ],
      icon: Globe2,
      color: "accent"
    },
    {
      category: "Committee Service",
      items: [
        {
          title: "University of Caxias do Sul",
          subtitle: "Student Representative, Medical School Council",
          location: "Caxias do Sul, Brazil",
          date: "2023"
        },
        {
          title: "Gaucho Association of History of Medicine",
          subtitle: "Elected Member, Fiscal Council",
          location: "Porto Alegre, Brazil", 
          date: "2020–2024"
        },
        {
          title: "Brazilian Association of Medical Education",
          subtitle: "Elected Student Delegate, National Assembly",
          location: "Brasília, Brazil",
          date: "2020"
        }
      ],
      icon: Users,
      color: "primary"
    },
    {
      category: "Editorial Activities",
      items: [
        {
          title: "Journal of the Brazilian Medical Association",
          subtitle: "Regional Editor – Junior Doctors Section", 
          location: "",
          date: "2020–Present"
        }
      ],
      icon: Stethoscope,
      color: "accent"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Professional Activities
        </h1>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {activities.map((activity, categoryIndex) => {
          const IconComponent = activity.icon;
          const isAccent = activity.color === "accent";
          
          return (
            <div 
              key={activity.category}
              className="animate-slide-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-full ${
                  isAccent ? 'bg-gradient-accent' : 'bg-gradient-primary'
                }`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {activity.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activity.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="bg-gradient-subtle rounded-lg p-6 shadow-card hover:shadow-elegant transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-primary font-medium mb-2">
                      {item.subtitle}
                    </p>
                    {item.location && (
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.location}
                      </p>
                    )}
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      isAccent ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                    }`}>
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};