import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/1234567890" // Replace with real number
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all duration-300 font-medium group"
    >
      <MessageCircle size={24} className="fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
};