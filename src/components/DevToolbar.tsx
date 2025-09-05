import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useDevMode } from '@/contexts/DevModeContext';
import { Edit, Download, Upload, RotateCcw, Settings, Frame } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { EditableSelect } from '@/components/EditableSelect';

export const DevToolbar = () => {
  const { isDevMode, toggleDevMode, exportContent, importContent, resetContent, updateContent, content } = useDevMode();
  const [showExport, setShowExport] = useState(false);
  const [importText, setImportText] = useState('');

  const frameSettings = content.frameSettings || {
    borderWidth: "border",
    borderColor: "border-border", 
    borderStyle: "border-solid",
    shadow: "shadow-slide"
  };

  const borderWidthOptions = [
    { value: "border-0", label: "No Border" },
    { value: "border", label: "Thin" },
    { value: "border-2", label: "Medium" },
    { value: "border-4", label: "Thick" },
    { value: "border-8", label: "Extra Thick" }
  ];

  const borderColorOptions = [
    { value: "border-border", label: "Default" },
    { value: "border-primary", label: "Primary" },
    { value: "border-accent", label: "Accent" },
    { value: "border-muted", label: "Muted" },
    { value: "border-transparent", label: "Transparent" }
  ];

  const borderStyleOptions = [
    { value: "border-solid", label: "Solid" },
    { value: "border-dashed", label: "Dashed" },
    { value: "border-dotted", label: "Dotted" }
  ];

  const shadowOptions = [
    { value: "shadow-none", label: "No Shadow" },
    { value: "shadow-sm", label: "Small" },
    { value: "shadow", label: "Default" },
    { value: "shadow-md", label: "Medium" },
    { value: "shadow-lg", label: "Large" },
    { value: "shadow-xl", label: "Extra Large" },
    { value: "shadow-2xl", label: "2X Large" },
    { value: "shadow-slide", label: "Slide Shadow" }
  ];

  const handleExport = () => {
    const content = exportContent();
    navigator.clipboard.writeText(content);
    setShowExport(true);
    setTimeout(() => setShowExport(false), 2000);
  };

  const handleImport = () => {
    if (importText.trim()) {
      importContent(importText);
      setImportText('');
    }
  };

  const handleDownload = () => {
    const content = exportContent();
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-6 left-6 bg-card backdrop-blur-sm px-4 py-2 border border-border shadow-elegant z-50">
      <div className="flex items-center gap-2">
        {isDevMode && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Frame className="h-4 w-4" />
                Frame
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Frame Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Border Width</label>
                  <EditableSelect
                    value={frameSettings.borderWidth}
                    onChange={(value) => updateContent('frameSettings.borderWidth', value)}
                    options={borderWidthOptions}
                    placeholder="Select border width"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Border Color</label>
                  <EditableSelect
                    value={frameSettings.borderColor}
                    onChange={(value) => updateContent('frameSettings.borderColor', value)}
                    options={borderColorOptions}
                    placeholder="Select border color"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Border Style</label>
                  <EditableSelect
                    value={frameSettings.borderStyle}
                    onChange={(value) => updateContent('frameSettings.borderStyle', value)}
                    options={borderStyleOptions}
                    placeholder="Select border style"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Shadow</label>
                  <EditableSelect
                    value={frameSettings.shadow}
                    onChange={(value) => updateContent('frameSettings.shadow', value)}
                    options={shadowOptions}
                    placeholder="Select shadow"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        
        <Button
          variant={isDevMode ? "default" : "outline"}
          size="sm"
          onClick={toggleDevMode}
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          {isDevMode ? 'Exit Edit' : 'Edit Mode'}
        </Button>

        {isDevMode && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              {showExport ? 'Copied!' : 'Copy JSON'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Content</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Paste JSON content here..."
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={10}
                  />
                  <Button onClick={handleImport} className="w-full">
                    Import Content
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="sm"
              onClick={resetContent}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </>
        )}
      </div>
    </div>
  );
};