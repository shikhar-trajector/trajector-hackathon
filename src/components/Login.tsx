import React, { useState } from 'react';

interface LoginProps {
  onLogin: (email: string, role: 'intake' | 'client') => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Simple role detection based on email
    const role = email.toLowerCase().includes('intake') ? 'intake' : 'client';
    
    // Store in localStorage for prototype
    localStorage.setItem('trajector_user', JSON.stringify({ email, role }));
    
    onLogin(email, role);
    
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center px-6">
      <div className="trajector-card w-full max-w-md">
        {/* Header */}
        <div className="text-center p-8 pb-6" style={{paddingBottom: '0'}}>
          {/* <img src="/TJ_desk_logo.svg" alt="Trajector Logo" style={{height: "60px"}} /> */}
          <h2 >
            Sign in to your account
          </h2>
        </div>
        
        {/* Form */}
        <div className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="trajector-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="trajector-input"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="trajector-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="trajector-input"
                required
              />
            </div>
            
            <button type="submit" className="trajector-button trajector-button-primary w-full">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};