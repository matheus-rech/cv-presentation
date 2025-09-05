import { EditableText } from '../EditableText';
import { useDevMode } from '@/contexts/DevModeContext';

export const LanguagesSlide = () => {
  const { content, updateContent } = useDevMode();
  const languages = content.languages || [
    { name: "English", level: "Proficient", flag: "🇺🇸" },
    { name: "Spanish", level: "Proficient", flag: "🇪🇸" },
    { name: "Portuguese", level: "Native", flag: "🇧🇷" }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Languages
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {languages.map((language, index) => (
          <div 
            key={language.name}
            className="bg-card border-2 border-border p-8 text-center shadow-card hover:shadow-elegant transition-all duration-200 animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-6xl mb-4 bg-muted p-4 inline-block">
              <EditableText
                value={language.flag}
                onChange={(value) => {
                  const updatedLanguages = [...languages];
                  updatedLanguages[index] = { ...language, flag: value };
                  updateContent('languages', updatedLanguages);
                }}
              />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2 border-b border-border pb-2">
              <EditableText
                value={language.name}
                onChange={(value) => {
                  const updatedLanguages = [...languages];
                  updatedLanguages[index] = { ...language, name: value };
                  updateContent('languages', updatedLanguages);
                }}
              />
            </h3>
            <div className="bg-primary text-primary-foreground px-4 py-2 mt-4 border border-primary">
              <span className="font-bold tracking-wide">
                <EditableText
                  value={language.level}
                  onChange={(value) => {
                    const updatedLanguages = [...languages];
                    updatedLanguages[index] = { ...language, level: value };
                    updateContent('languages', updatedLanguages);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};