import React from 'react';
import { Calendar, Video, ArrowRight, ShieldCheck, Activity, Star } from 'lucide-react';

interface HeroProps {
  onStartLive: () => void;
  onBook: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartLive, onBook }) => {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            AI-Powered Healthcare v2.0 Live
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Healthcare <br />
            <span className="text-gradient">Unified & Intelligent.</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
            Stop relying on outdated systems. Cymedic unifies appointments, patient data, and diagnostics into one automated platform powered by Gemini AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStartLive}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-sakura-900 font-bold hover:bg-gray-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
            >
              <Video size={20} />
              <span>Talk to AI Agent</span>
            </button>
            <button 
              onClick={onBook}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-card text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <span>Book Appointment</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-indigo-400" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-indigo-400" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-yellow-400 fill-current" />
              <span>4.9/5 Ratings</span>
            </div>
          </div>
        </div>

        {/* Right Content - Visual Composition */}
        <div className="relative hidden lg:block h-[600px]">
          {/* Main Hero Image */}
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070" 
              alt="Advanced Medical Technology"
              className="w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sakura-900 via-transparent to-transparent"></div>
          </div>

          {/* Floating Card 1: Live Schedule */}
          <div className="absolute top-10 -right-10 glass-card p-4 rounded-2xl w-64 animate-float">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                 <Video size={20} className="text-indigo-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Telehealth</div>
                <div className="text-xs text-green-400">Live Now</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-2/3 animate-pulse-slow"></div>
              </div>
              <p className="text-xs text-gray-400">Connecting to specialist...</p>
            </div>
          </div>

          {/* Floating Card 2: Doctor Profile */}
          <div className="absolute bottom-20 -left-10 glass-card p-4 rounded-2xl w-72 flex gap-4 items-center animate-float" style={{ animationDelay: '1s' }}>
             <img 
               src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200" 
               alt="Doctor" 
               className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
             />
             <div>
               <div className="text-sm font-bold text-white">Dr. Sarah Chen</div>
               <div className="text-xs text-gray-400">Neurology Specialist</div>
               <div className="flex gap-1 mt-1">
                 {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-yellow-400 fill-current" />)}
               </div>
             </div>
          </div>

          {/* Floating Card 3: Stats */}
          <div className="absolute top-1/2 left-10 glass-card p-3 rounded-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
             <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
               <Activity size={16} />
             </div>
             <div className="text-xs text-white">
                <p className="font-bold">Diagnostics</p>
                <p className="text-gray-500">Analysis Complete</p>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;