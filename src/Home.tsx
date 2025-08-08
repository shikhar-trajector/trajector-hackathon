import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Login } from '@/components/Login';
import { IntakeDashboard } from '@/components/IntakeDashboard';
import { ClientPortal } from '@/components/ClientPortal';
import { toast } from "sonner"
import UploadPortal from './components/UploadPortal';

interface User {
  email: string;
  role: 'intake' | 'client';
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('trajector_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email: string, role: 'intake' | 'client') => {
    const userObj = { email, role };
    setUser(userObj);
    localStorage.setItem('trajector_user', JSON.stringify(userObj));
    toast(`Welcome ${role === 'intake' ? 'Intake Representative' : 'Client'}!`);
    navigate(role === 'intake' ? '/admin' : '/client');
  };

  const handleLogout = () => {
    localStorage.removeItem('trajector_user');
    setUser(null);
    toast('You have been successfully logged out.');
    navigate('/login');
  };

  const handleFileSubmit = (files: File[]) => {
    console.log('Files to upload:', files);
    toast(
      `${files.length} ${files.length === 1 ? 'document' : 'documents'} uploaded to Trajector.`,);
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === 'intake' ? (
                <IntakeDashboard onLogout={handleLogout} />
              ) : (
                <ClientPortal onLogout={handleLogout} />
              )
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/admin"
          element={
            user && user.role === 'intake' ? (
              <IntakeDashboard onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/client"
          element={
            user && user.role === 'client' ? (
              <ClientPortal onLogout={handleLogout} />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/upload"
          element={
              <UploadPortal />
          }
        />
      </Routes>
    </>
  );
};

export default Home;