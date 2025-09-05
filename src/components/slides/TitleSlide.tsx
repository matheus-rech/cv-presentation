import { Mail, Phone, MapPin, Globe, Languages } from 'lucide-react';
import { EditableText } from '../EditableText';
import { EditableSelect } from '../EditableSelect';
import { useDevMode } from '@/contexts/DevModeContext';

export const TitleSlide = () => {
  const { content, updateContent, isDevMode } = useDevMode();
  const titleData = content.title || {};
  const photoSettings = titleData.photoSettings || {
    size: "w-64 h-64",
    borderWidth: "border-4", 
    borderColor: "border-primary",
    shadow: "shadow-2xl"
  };

  const sizeOptions = [
    { value: "w-48 h-48", label: "Small (48)" },
    { value: "w-56 h-56", label: "Medium (56)" },
    { value: "w-64 h-64", label: "Large (64)" },
    { value: "w-72 h-72", label: "Extra Large (72)" },
    { value: "w-80 h-80", label: "Huge (80)" }
  ];

  const borderWidthOptions = [
    { value: "border-0", label: "No Border" },
    { value: "border-2", label: "Thin (2px)" },
    { value: "border-4", label: "Medium (4px)" },
    { value: "border-8", label: "Thick (8px)" }
  ];

  const borderColorOptions = [
    { value: "border-primary", label: "Primary" },
    { value: "border-accent", label: "Accent" },
    { value: "border-border", label: "Border" },
    { value: "border-muted", label: "Muted" }
  ];

  const shadowOptions = [
    { value: "shadow-none", label: "No Shadow" },
    { value: "shadow-lg", label: "Subtle" },
    { value: "shadow-xl", label: "Normal" },
    { value: "shadow-2xl", label: "Dramatic" }
  ];

  return (
    <div className="h-full flex flex-col justify-center py-8 px-8">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        
        {/* Top Section: Photo and Name/Title */}
        <div className="flex items-center gap-12">
          {/* Photo */}
          <div className="flex-shrink-0 space-y-4">
            <img 
              src="/lovable-uploads/ac39a80a-0286-4a02-862d-ba3e3b4f65b7.png" 
              alt="Matheus Machado Rech" 
              className={`${photoSettings.size} rounded-full object-cover ${photoSettings.borderWidth} ${photoSettings.borderColor} ${photoSettings.shadow}`}
            />
            
            {/* Photo Controls - Only show in dev mode */}
            {isDevMode && (
              <div className="space-y-2 p-4 bg-card border border-border rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-3">Photo Settings</h4>
                
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Size</label>
                  <EditableSelect
                    value={photoSettings.size}
                    onChange={(value) => updateContent('title.photoSettings.size', value)}
                    options={sizeOptions}
                    className="text-xs"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Border Width</label>
                  <EditableSelect
                    value={photoSettings.borderWidth}
                    onChange={(value) => updateContent('title.photoSettings.borderWidth', value)}
                    options={borderWidthOptions}
                    className="text-xs"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Border Color</label>
                  <EditableSelect
                    value={photoSettings.borderColor}
                    onChange={(value) => updateContent('title.photoSettings.borderColor', value)}
                    options={borderColorOptions}
                    className="text-xs"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Shadow</label>
                  <EditableSelect
                    value={photoSettings.shadow}
                    onChange={(value) => updateContent('title.photoSettings.shadow', value)}
                    options={shadowOptions}
                    className="text-xs"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Name and Degree */}
          <div className="flex-1 space-y-3">
            <EditableText
              value={titleData.name || "Matheus Machado Rech"}
              onChange={(value) => updateContent('title.name', value)}
              className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent"
              as="h1"
            />
            <EditableText
              value={titleData.degree || "M.D."}
              onChange={(value) => updateContent('title.degree', value)}
              className="text-3xl text-muted-foreground font-medium"
              as="h2"
            />
          </div>
        </div>

        {/* Bottom Section: Three Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
              Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <EditableText
                  value={titleData.phone || "+55 54 9 96921904"}
                  onChange={(value) => updateContent('title.phone', value)}
                  className="text-base text-foreground"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <EditableText
                  value={titleData.email || "mmrech.md@gmail.com"}
                  onChange={(value) => updateContent('title.email', value)}
                  className="text-base text-foreground"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-accent flex-shrink-0" />
                <EditableText
                  value={titleData.linkedin || "LinkedIn: /in/mmrech/"}
                  onChange={(value) => updateContent('title.linkedin', value)}
                  className="text-base text-foreground"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                <EditableText
                  value={titleData.location || "Caxias do Sul, RS, Brazil"}
                  onChange={(value) => updateContent('title.location', value)}
                  className="text-base text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
              Languages
            </h3>
            
            <div className="space-y-4">
              {(titleData.languages || []).map((language: any, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl">
                    <EditableText
                      value={language.flag || "🇺🇸"}
                      onChange={(value) => updateContent(`title.languages.${index}.flag`, value)}
                      className="w-8"
                    />
                  </span>
                  <div className="flex flex-col">
                    <EditableText
                      value={language.name || "English"}
                      onChange={(value) => updateContent(`title.languages.${index}.name`, value)}
                      className="text-base font-medium text-foreground"
                    />
                    <EditableText
                      value={language.level || "Proficient"}
                      onChange={(value) => updateContent(`title.languages.${index}.level`, value)}
                      className="text-sm text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional ID */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
              Professional ID
            </h3>
            
            <div className="bg-gradient-subtle p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-base font-medium text-foreground">ORCID</span>
              </div>
              <EditableText
                value={titleData.orcid || "ORCID: 0000-0002-2961-9443"}
                onChange={(value) => updateContent('title.orcid', value)}
                className="text-sm text-accent font-mono break-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};