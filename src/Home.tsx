import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { FileUpload } from '@/components/FileUpload';
import { Login } from '@/components/Login';
import { IntakeDashboard } from '@/components/IntakeDashboard';
import { toast } from "sonner"

interface User {
  email: string;
  role: 'intake' | 'client';
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('trajector_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string, role: 'intake' | 'client') => {
    setUser({ email, role });
  };

  const handleLogout = () => {
    localStorage.removeItem('trajector_user');
    setUser(null);
    // toast({
    //   title: "Logged out",
    //   description: "You have been successfully logged out.",
    // });
    toast("Logged out");
  };

  const handleFileSubmit = (files: File[]) => {
    // Here you would typically upload files to your backend
    console.log('Files to upload:', files);
    
    // toast({
    //   title: "Files uploaded successfully!",
    //   description: `${files.length} ${files.length === 1 ? 'document' : 'documents'} uploaded to Trajector.`,
    // });
    toast(`Files uploaded successfully! ${files.length} ${files.length === 1 ? 'document' : 'documents'} uploaded to Trajector.`);
  };

  // Show login if no user
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Show intake dashboard for intake role
  if (user.role === 'intake') {
    return <IntakeDashboard onLogout={handleLogout} />;
  }

  // Show client upload interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header onLogout={handleLogout} userRole="client" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Upload Your Documents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Securely store and manage your documents in one centralized location. 
              Drag and drop files or browse to get started.
            </p>
          </div>
          
          <FileUpload onSubmit={handleFileSubmit} />
        </div>
      </main>
    </div>
  );
};

export default Index;