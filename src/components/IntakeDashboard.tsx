import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/Header';
import { toast } from "sonner"
import { Mail, Link, FileUp, Users } from 'lucide-react';

interface IntakeDashboardProps {
  onLogout: () => void;
}

export const IntakeDashboard = ({ onLogout }: IntakeDashboardProps) => {
  const [clientEmail, setClientEmail] = useState('');
  const [uploadMethod, setUploadMethod] = useState('');
  const [message, setMessage] = useState('');

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientEmail || !uploadMethod) {
        toast("Please fill in all required fields")
    //   toast({
    //     title: "Error",
    //     description: "Please fill in all required fields",
    //     variant: "destructive",
    //   });
      return;
    }

    // Simulate sending request
    const method = uploadMethod === 'email' ? 'email reply' : 'magic link';
    
    // toast({
    //   title: "Upload request sent!",
    //   description: `Sent ${method} request to ${clientEmail}`,
    // });
    toast(`Upload request sent! Sent ${method} request to ${clientEmail}`);

    // Reset form
    setClientEmail('');
    setUploadMethod('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Header onLogout={onLogout} userRole="intake" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Intake Representative Dashboard
            </h2>
            <p className="text-xl text-muted-foreground">
              Request documents from clients via email or magic link
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Send Upload Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileUp className="h-5 w-5" />
                  Request Client Upload
                </CardTitle>
                <CardDescription>
                  Send upload request to a client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Client Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      placeholder="client@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Upload Method</Label>
                    <RadioGroup value={uploadMethod} onValueChange={setUploadMethod}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                          <Mail className="h-4 w-4" />
                          Email Reply Upload
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="magic-link" id="magic-link" />
                        <Label htmlFor="magic-link" className="flex items-center gap-2 cursor-pointer">
                          <Link className="h-4 w-4" />
                          Magic Link Upload
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Please upload your tax documents for 2024..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Upload Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Requests
                </CardTitle>
                <CardDescription>
                  Track sent upload requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">john@example.com</p>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Pending
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Magic Link • 2 hours ago</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">mary@example.com</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Email Reply • 1 day ago</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">bob@example.com</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Magic Link • 3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};