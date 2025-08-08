import { Header } from './Header'
import { FileUpload } from './FileUpload'
import { toast } from "sonner"

const UploadPortal = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Akbar';
    const phone = urlParams.get('phone') || '919670867797';
    const API_HOST = import.meta.env.VITE_API_HOST;
    const handleFileSubmit = async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
      });
      formData.append('name', name);
      formData.append('phone', phone);
      const myHeaders = new Headers();
      myHeaders.append("bypass-tunnel-reminder", "true"); // 👈 Important for LocalTunnel
      
      try {
        const response = await fetch(`${API_HOST}/api/documents/upload`, {
          method: 'POST',
          body: formData,
          // Remove Content-Type header - browser will set it automatically
          headers: myHeaders,
        });

        if (response.ok) {
          toast(
            `${files.length} ${files.length === 1 ? 'document' : 'documents'} uploaded to Trajector.`,
          );
        } else {
          toast('Upload failed. Please try again.');
        }
      } catch (error) {
        toast('An error occurred during upload.');
        console.error(error);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient">
              <Header userRole="client" />
              
              <main className="container py-12">
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
    )
  }
  
  export default UploadPortal