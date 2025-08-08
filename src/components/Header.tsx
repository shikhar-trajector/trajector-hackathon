import { Button } from '@/components/ui/button';
import { FileText, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
  userRole?: 'intake' | 'client';
}

export const Header: React.FC<HeaderProps> = ({ onLogout, userRole }) => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <img src="/TJ_mob_logo.svg" alt="Trajector Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Trajector</h1>
              <p className="text-sm text-muted-foreground">
                {userRole === 'intake' ? 'Intake Representative Portal' : 'Centralized Document System'}
              </p>
            </div>
          </div>
          
          {onLogout && (
            <nav className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </nav>
          )}
      </div>
      </div>
    </header>
  );
};