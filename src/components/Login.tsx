import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner"


interface LoginProps {
  onLogin: (email: string, role: 'intake' | 'client') => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
    //   toast({
    //     title: "Error",
    //     description: "Please enter both email and password",
    //     variant: "destructive",
    //   });
    toast("Please enter both email and password");
      return;
    }

    // Simple role detection based on email
    const role = email === 'intake@email' ? 'intake' : 'client';
    
    // Store in localStorage for prototype
    localStorage.setItem('trajector_user', JSON.stringify({ email, role }));
    
    onLogin(email, role);
    
    // toast({
    //   title: "Login successful",
    //   description: `Welcome ${role === 'intake' ? 'Intake Representative' : 'Client'}!`,
    // });
    toast("Login successful. Welcome " + (role === 'intake' ? 'Intake Representative' : 'Client') + "!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Trajector</CardTitle>
          <CardDescription>
            Centralized Document Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Use "intake@email" for intake rep access
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};