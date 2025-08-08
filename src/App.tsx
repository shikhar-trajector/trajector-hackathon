import React from 'react';
import { Toaster } from "@/components/ui/sonner"
import Entry from './Home';

const App: React.FC = () => {
  return (
    <div>
      <Entry />
      <Toaster />
    </div>
  );
};

export default App;