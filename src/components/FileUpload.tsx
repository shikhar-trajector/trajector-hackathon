import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onSubmit: (files: File[]) => void;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onSubmit, className }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onSubmit(files);
      setFiles([]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto space-y-6', className)}>
      {/* Upload Zone */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300',
          'bg-[hsl(var(--upload-bg))] hover:bg-[hsl(var(--upload-hover))]',
          'border-[hsl(var(--upload-border))] hover:border-primary',
          dragActive && 'border-primary bg-accent/50 scale-[1.02]',
          'shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elegant)]'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.zip,.rar"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
            'bg-gradient-to-br from-primary to-primary-glow',
            dragActive && 'scale-110'
          )}>
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Drop your documents here
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Or click to browse files from your computer. Supports PDF, DOC, images, and more.
            </p>
          </div>
          
          <Button variant="outline" size="sm" className="mt-4">
            Browse Files
          </Button>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-foreground">
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-card rounded-lg border shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <File className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {files.length > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            size="lg"
            className="min-w-48 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300 shadow-[var(--shadow-elegant)] hover:shadow-lg hover:scale-105"
          >
            Upload {files.length} {files.length === 1 ? 'Document' : 'Documents'}
          </Button>
        </div>
      )}
    </div>
  );
};