import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const LeadsForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Send to agency email
    const recipient = 'adedamolaisrael4777@gmail.com';
    const subject = 'New Newsletter Subscription';
    const body = `New user wants to subscribe to updates: ${email}`;
    
    // Open email client
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSubmitted(true);
    setEmail('');
  };

  return (
    <div className="py-20 bg-sakura-800/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="glass-card rounded-3xl p-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white mb-4">Stay updated with Cymedic</h3>
            <p className="text-gray-400 mb-6">Join our newsletter to receive health tips, AI updates, and exclusive agency offers directly to your inbox.</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Weekly Updates</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> No Spam</span>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Subscribed!</h4>
                <p className="text-gray-400 mb-4">Your email client has been opened to finalize the subscription.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 font-medium underline"
                >
                  Subscribe with another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
                <button type="submit" className="flex items-center justify-center gap-2 w-full py-4 bg-white text-sakura-900 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                  <span>Subscribe Now</span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsForm;