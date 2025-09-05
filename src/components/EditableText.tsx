import { useState, useRef, useEffect } from 'react';
import { useDevMode } from '@/contexts/DevModeContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const EditableText = ({ 
  value, 
  onChange, 
  multiline = false, 
  className = "", 
  placeholder = "Click to edit...",
  as: Component = 'span'
}: EditableTextProps) => {
  const { isDevMode } = useDevMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  if (!isDevMode || !isEditing) {
    return (
      <Component
        className={cn(
          className,
          isDevMode && "cursor-pointer border border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors min-h-[1em] px-1 py-0.5",
          isDevMode && ['h1', 'h2', 'h3'].includes(Component) && "block",
          isDevMode && !['h1', 'h2', 'h3'].includes(Component) && "inline-block"
        )}
        onClick={() => isDevMode && setIsEditing(true)}
        title={isDevMode ? "Click to edit" : undefined}
      >
        {value || (isDevMode ? placeholder : "")}
      </Component>
    );
  }

  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className="relative">
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn("w-full", className)}
        placeholder={placeholder}
      />
      <div className="absolute -top-8 right-0 text-xs text-muted-foreground bg-card px-2 py-1 border border-border">
        {multiline ? 'Ctrl+Enter to save' : 'Enter to save'} • Esc to cancel
      </div>
    </div>
  );
};