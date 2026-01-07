import React, { useEffect, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, User, Calendar, Share2, Clock, Loader } from 'lucide-react';
import { BlogPostData } from '../types';

interface BlogPostProps {
  post: BlogPostData;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when post changes
    setContent('');
    setLoading(true);
    
    // Scroll to top
    window.scrollTo(0, 0);

    const fetchContent = async () => {
      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
             setContent("## Error\n\nAPI Key is missing. Unable to generate content.");
             setLoading(false);
             return;
        }

        const ai = new GoogleGenAI({ apiKey });
        
        // Use gemini-3-flash-preview for fast, high-quality text generation
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Write a comprehensive, professional, yet accessible health blog post titled "${post.title}". 
            Context: ${post.excerpt}.
            Target Audience: Patients and health-conscious individuals.
            Tone: Informative, empathetic, and trustworthy.
            Format: Markdown. 
            Structure:
            1. Introduction (Hook the reader)
            2. Understanding the Condition/Topic
            3. 3-4 Key Insights or Latest Medical Developments
            4. Practical Tips for Patients
            5. Conclusion
            6. Medical Disclaimer (Standard).
            
            Do not include the title in the output (it is already displayed).`
        });
        
        if (response.text) {
            setContent(response.text);
        } else {
            setContent("## Content Unavailable\n\nWe couldn't generate this article at the moment. Please try again.");
        }
      } catch (e) {
        console.error(e);
        setContent("## Error\n\nFailed to load article content. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [post]);

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Articles</span>
      </button>

      {/* Hero Section */}
      <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
         <div className="absolute inset-0 bg-gradient-to-t from-sakura-900 via-transparent to-transparent z-10"></div>
         <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
         <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-600/80 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider">
               {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <span>{post.author}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>5 min read</span>
               </div>
            </div>
         </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12">
         {/* Main Text */}
         <div className="flex-1">
            {loading ? (
                <div className="glass-card p-12 rounded-3xl flex flex-col items-center justify-center text-center min-h-[400px]">
                    <div className="relative mb-6">
                        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-indigo-400">
                             <BrainIcon size={24} />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Generating Article...</h3>
                    <p className="text-gray-400 max-w-sm">Our AI is researching and writing this article for you in real-time. This usually takes about 5-10 seconds.</p>
                </div>
            ) : (
                <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>
            )}
         </div>

         {/* Sidebar */}
         <div className="w-full lg:w-80 space-y-8">
            <div className="glass-card p-6 rounded-2xl sticky top-28">
               <h4 className="text-lg font-bold text-white mb-4">Share this article</h4>
               <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">Twitter</button>
                  <button className="flex-1 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 text-white font-medium transition-colors">Facebook</button>
               </div>
               <button className="w-full mt-2 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 font-medium transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} /> Copy Link
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

// Simple Icon component for the loader
const BrainIcon = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

export default BlogPost;