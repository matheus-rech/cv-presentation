import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, ExternalLink, Plus, Save, Trash2, X } from 'lucide-react';
import { useDevMode } from '@/contexts/DevModeContext';
import type { Publication, AbstractPresentation } from '@/lib/publications-data';

interface InteractivePublicationsProps {
  title?: string;
  className?: string;
  compact?: boolean;
  showAbstracts?: boolean;
}

export const InteractivePublications = ({
  title = "Publications & Presentations",
  className = "",
  compact = false,
  showAbstracts = true,
}: InteractivePublicationsProps) => {
  const { content, updateContent, isDevMode } = useDevMode();
  const [selectedPublication, setSelectedPublication] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPublication, setNewPublication] = useState<Publication>({
    citation: "",
    title: "",
    journal: "",
    year: "",
    volume: "",
    previewImage: "",
  });

  const publications = content.publications || [];
  const abstracts = content.abstracts || [];

  const addPublication = () => {
    if (newPublication.title && newPublication.citation) {
      const updated = [...publications, { ...newPublication }];
      updateContent('publications', updated);
      setNewPublication({
        citation: "",
        title: "",
        journal: "",
        year: "",
        volume: "",
        previewImage: "",
      });
      setShowAddForm(false);
    }
  };

  const deletePublication = (index: number) => {
    const updated = publications.filter((_: any, i: number) => i !== index);
    updateContent('publications', updated);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPublication({ ...newPublication, previewImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const closeModal = () => {
    setSelectedPublication(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      <div className="text-center mb-3">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h1>
        {isDevMode && (
          <div className="mt-2">
            <Button
              onClick={() => setEditMode(!editMode)}
              size="sm"
              variant={editMode ? "destructive" : "outline"}
              className="text-xs"
            >
              <Edit className="w-3 h-3 mr-1" />
              {editMode ? "EXIT EDIT" : "EDIT MODE"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-auto">
        {/* Peer-Reviewed Articles */}
        <div>
          <h2 className="text-lg font-bold text-primary border-b border-border pb-1 mb-2">
            Peer-Reviewed Articles
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {publications.map((pub: Publication, index: number) => (
              <div
                key={index}
                className="bg-gradient-subtle p-2 shadow-card animate-slide-in border-l-2 border-l-primary text-xs cursor-pointer hover:shadow-elegant transition-shadow"
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => !editMode && setSelectedPublication(index)}
              >
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-1 rounded-full flex-shrink-0">
                    <ExternalLink className="h-3 w-3 text-primary" />
                  </div>

                  <div className="flex-1 space-y-0.5">
                    <h3 className="text-xs font-semibold text-foreground leading-tight line-clamp-2">
                      {pub.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-primary truncate text-xs">{pub.journal}</span>
                      <span className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs flex-shrink-0">
                        {pub.year}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {pub.citation}
                    </p>
                  </div>

                  {editMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePublication(index);
                      }}
                      className="text-destructive hover:text-destructive/80 p-1 flex-shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {editMode && (
            <div className="border-2 border-dashed border-border p-4 text-center mt-2">
              {!showAddForm ? (
                <Button
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Publication
                </Button>
              ) : (
                <div className="space-y-3 text-left">
                  <h3 className="text-sm font-bold text-foreground text-center">Add New Publication</h3>

                  <Input
                    placeholder="Publication Title"
                    value={newPublication.title}
                    onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })}
                    className="text-xs"
                  />

                  <textarea
                    placeholder="Full Citation"
                    value={newPublication.citation}
                    onChange={(e) => setNewPublication({ ...newPublication, citation: e.target.value })}
                    className="w-full p-2 border border-input bg-background text-xs h-16 resize-none rounded-md"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Journal"
                      value={newPublication.journal}
                      onChange={(e) => setNewPublication({ ...newPublication, journal: e.target.value })}
                      className="text-xs"
                    />
                    <Input
                      placeholder="Year"
                      value={newPublication.year}
                      onChange={(e) => setNewPublication({ ...newPublication, year: e.target.value })}
                      className="text-xs"
                    />
                    <Input
                      placeholder="Volume"
                      value={newPublication.volume}
                      onChange={(e) => setNewPublication({ ...newPublication, volume: e.target.value })}
                      className="text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Paper Preview Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs"
                    />
                    {newPublication.previewImage && (
                      <img
                        src={newPublication.previewImage}
                        alt="Preview"
                        className="mt-2 max-w-20 max-h-20 object-contain border border-border"
                      />
                    )}
                  </div>

                  <div className="flex gap-2 justify-center">
                    <Button
                      onClick={addPublication}
                      size="sm"
                      className="text-xs"
                    >
                      <Save className="w-3 h-3 mr-1" />
                      Save Publication
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAddForm(false);
                        setNewPublication({
                          citation: "",
                          title: "",
                          journal: "",
                          year: "",
                          volume: "",
                          previewImage: "",
                        });
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Abstracts & Presentations */}
        {showAbstracts && (
          <div>
            <h2 className="text-lg font-bold text-primary border-b border-border pb-1 mb-2">
              Abstracts & Presentations
            </h2>
            <div className="grid grid-cols-1 gap-1">
              {abstracts.map((abstract: AbstractPresentation, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-subtle p-2 shadow-card animate-slide-in border-l-2 border-l-accent text-xs"
                  style={{ animationDelay: `${(publications.length + index) * 0.03}s` }}
                >
                  <div className="flex items-start gap-2">
                    <div className="bg-accent/10 p-1 rounded-full">
                      <ExternalLink className="h-3 w-3 text-accent" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-foreground leading-tight">
                            {abstract.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {abstract.event} • {abstract.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="bg-accent/10 text-accent px-1 py-0.5 rounded text-xs">
                            {abstract.year}
                          </span>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {abstract.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Publication Preview Modal */}
      {selectedPublication !== null && (
        <div 
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-8 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-card border-2 border-border shadow-slide max-w-4xl w-full max-h-[90vh] flex flex-col animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-primary text-primary-foreground p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Publication Preview</h3>
              <button 
                onClick={closeModal} 
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted border-2 border-border p-4 flex items-center justify-center">
                  <img
                    src={publications[selectedPublication]?.previewImage || "/placeholder.svg"}
                    alt={`Preview of ${publications[selectedPublication]?.title}`}
                    className="max-w-full max-h-96 object-contain shadow-card border border-border"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      {publications[selectedPublication]?.title}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold text-foreground">Journal:</span>{" "}
                        <span className="text-muted-foreground">{publications[selectedPublication]?.journal}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Year:</span>{" "}
                        <span className="text-muted-foreground">{publications[selectedPublication]?.year}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Volume:</span>{" "}
                        <span className="text-muted-foreground">{publications[selectedPublication]?.volume}</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t-2 border-border pt-4">
                    <h5 className="font-semibold text-foreground mb-2">Full Citation:</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted p-3 border border-border">
                      {publications[selectedPublication]?.citation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted border-t-2 border-border p-4 flex justify-end">
              <Button
                onClick={closeModal}
                variant="default"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};