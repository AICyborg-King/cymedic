import React from 'react';
import { User } from '../types';
import { LogIn, User as UserIcon, Menu } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onNavigate: (page: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 border-b border-white/5 bg-sakura-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('HOME')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
             <span className="text-white font-bold">C</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">CYMEDIC</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <button onClick={() => onNavigate('HOME')} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => onNavigate('BOOKING')} className="hover:text-white transition-colors">Appointments</button>
          <button onClick={() => onNavigate('LEADS')} className="hover:text-white transition-colors">Services</button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <span className="text-sm text-gray-300 hidden sm:block">{user.name}</span>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-indigo-400">
                <UserIcon size={18} />
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              <span>Sign In</span>
              <LogIn size={16} />
            </button>
          )}
          
          <button className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;