import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { BlogPostData } from '../types';

interface BlogSectionProps {
  onViewPost: (post: BlogPostData) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onViewPost }) => {
  const posts: BlogPostData[] = [
    {
      id: 1,
      title: "The Role of AI in Early Disease Detection",
      excerpt: "How generative models are changing the landscape of preventative healthcare and saving lives through early pattern recognition.",
      author: "Dr. Emily Chen",
      date: "Mar 15, 2025",
      image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2070",
      category: "Technology"
    },
    {
      id: 2,
      title: "Mental Health in the Digital Age",
      excerpt: "Strategies for maintaining mental wellness in an increasingly connected world, and how digital detoxes can help.",
      author: "Dr. Mark Wilson",
      date: "Mar 10, 2025",
      image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=2070",
      category: "Wellness"
    },
    {
      id: 3,
      title: "Nutrition Myths Debunked",
      excerpt: "Top nutritionists share the truth about common diet trends and what you actually need for a balanced lifestyle.",
      author: "Sarah James, RD",
      date: "Mar 05, 2025",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2053",
      category: "Nutrition"
    }
  ];

  return (
    <section className="py-24 bg-sakura-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Latest Insights</h2>
            <p className="text-gray-400">Read the latest articles from our medical experts.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-indigo-400 hover:text-white transition-colors">
            View all posts <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => onViewPost(post)}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-medium text-white">
                  {post.category}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {post.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight size={16} className="text-indigo-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <button className="inline-flex items-center gap-2 text-indigo-400 hover:text-white transition-colors">
                View all posts <ArrowRight size={16} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;