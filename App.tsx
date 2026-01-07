import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import BlogSection from './components/BlogSection';
import BlogPost from './components/BlogPost';
import VoiceAgent from './components/VoiceAgent';
import AppointmentForm from './components/AppointmentForm';
import LeadsForm from './components/LeadsForm';
import AuthModal from './components/AuthModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { User, ViewState, BlogPostData } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);

  const handleViewPost = (post: BlogPostData) => {
    setSelectedPost(post);
    setView(ViewState.BLOG_POST);
  };

  // Simple routing logic
  const renderView = () => {
    switch (view) {
      case ViewState.HOME:
        return (
          <>
            <Hero 
              onStartLive={() => setShowVoiceAgent(true)} 
              onBook={() => setView(ViewState.BOOKING)} 
            />
            <Features />
            <BlogSection onViewPost={handleViewPost} />
            <LeadsForm />
          </>
        );
      case ViewState.BOOKING:
        return (
          <div className="pt-32 pb-20 px-6">
             <AppointmentForm />
          </div>
        );
      case ViewState.LEADS:
        return (
          <div className="pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-center mb-10">
               <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
               <p className="text-gray-400">Comprehensive AI-driven solutions for modern healthcare.</p>
            </div>
            <Features />
            <LeadsForm />
          </div>
        );
      case ViewState.BLOG_POST:
        return selectedPost ? (
          <BlogPost 
            post={selectedPost} 
            onBack={() => setView(ViewState.HOME)} 
          />
        ) : (
          // Fallback if no post selected
          <Hero onStartLive={() => setShowVoiceAgent(true)} onBook={() => setView(ViewState.BOOKING)} />
        );
      default:
        return <Hero onStartLive={() => setShowVoiceAgent(true)} onBook={() => setView(ViewState.BOOKING)} />;
    }
  };

  return (
    <div className="min-h-screen bg-sakura-900 text-slate-50 font-sans selection:bg-indigo-500/30">
      <Navbar 
        user={user} 
        onLoginClick={() => setShowAuthModal(true)} 
        onNavigate={(v) => setView(v)}
      />
      
      <main>
        {renderView()}
      </main>

      <footer className="border-t border-white/5 py-12 bg-sakura-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Cymedic Health Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      {/* Modals */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLogin={(u) => { setUser(u); setShowAuthModal(false); }} 
        />
      )}

      {showVoiceAgent && (
        <VoiceAgent onClose={() => setShowVoiceAgent(false)} />
      )}
    </div>
  );
};

export default App;