import React from 'react';
import { Toaster } from "@/components/ui/sonner"
import Entry from './Home';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div>
      <Entry />
      <Toaster />
    </div>
    </BrowserRouter>
  );
};

export default App;