import React from 'react';
import { Brain, Heart, Stethoscope, Microscope, Clock, Shield, Video } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-sakura-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">The Future of Medical Care</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Experience healthcare reimagined with cutting-edge technology and compassionate professionals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1: AI Diagnostics (Large) */}
          <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group min-h-[300px] flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2070" 
              alt="Lab" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="relative z-20">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 text-white">
                <Brain size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Diagnostics</h3>
              <p className="text-gray-300 max-w-lg">Our Gemini-powered algorithms assist doctors in detecting anomalies with 99.9% accuracy, ensuring you get the right treatment faster.</p>
            </div>
          </div>

          {/* Feature 2: 24/7 Care */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-4">
               <Clock size={24} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white mb-2">24/7 Instant Access</h3>
               <p className="text-gray-400 text-sm">Talk to our AI health agents or on-call doctors anytime, day or night.</p>
             </div>
          </div>

          {/* Feature 3: Expert Team */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-4">
               <Stethoscope size={24} />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white mb-2">Top Specialists</h3>
               <p className="text-gray-400 text-sm">Access a network of board-certified specialists across 50+ medical fields.</p>
             </div>
          </div>

          {/* Feature 4: Telemedicine (Large) */}
          <div className="md:col-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group min-h-[300px] flex flex-col justify-end md:order-last">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
             <img 
               src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=2128" 
               alt="Telemedicine" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="relative z-20">
               <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 text-white">
                 <Video size={24} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">Seamless Telemedicine</h3>
               <p className="text-gray-300 max-w-lg">High-definition video consultations that feel like you're in the same room. Secure, private, and convenient.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;