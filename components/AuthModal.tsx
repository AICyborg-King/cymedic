import React, { useState } from 'react';
import { X, Mail, Lock, Github } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin({
      id: '1',
      name: 'Dr. Alex Thompson',
      email: 'alex@example.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-sakura-900 border border-white/10 w-full max-w-md rounded-2xl p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-400 text-sm">Enter your details to access your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-indigo-500 focus:outline-none" placeholder="name@company.com" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input type="password" className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 text-white text-sm focus:border-indigo-500 focus:outline-none" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-sm transition-colors mt-2">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-white/5 flex-1"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>

        <button className="w-full py-2.5 mt-6 border border-white/10 rounded-lg flex items-center justify-center gap-2 text-white text-sm hover:bg-white/5 transition-colors">
          <Github size={16} />
          <span>Continue with GitHub</span>
        </button>

        <p className="mt-6 text-center text-xs text-gray-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-400 hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;