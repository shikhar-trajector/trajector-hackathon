import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

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
    <div className={`w-full max-w-2xl mx-auto space-y-6 ${className || ''}`}>
      {/* Upload Zone */}
      <div
        className={`trajector-upload-zone hover-scale hover-shadow ${dragActive ? 'active' : ''}`}
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
          className="hidden-input"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.zip,.rar"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center transition-all ${dragActive ? 'hover-scale' : ''}`}>
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
          
          <button type="button" className="trajector-button trajector-button-outline trajector-button-sm mt-4">
            Browse Files
          </button>
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
              <div key={index} className="trajector-file-item">
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
                
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="trajector-button trajector-button-outline trajector-button-sm text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {files.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="trajector-button trajector-button-primary trajector-button-lg bg-gradient-primary hover-scale shadow-elegant"
            style={{ minWidth: '12rem' }}
          >
            Upload {files.length} {files.length === 1 ? 'Document' : 'Documents'}
          </button>
        </div>
      )}
    </div>
  );
};