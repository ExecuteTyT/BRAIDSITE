import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Blog: React.FC = () => {
  const { content } = useLanguage();

  const posts = content.blog.posts.map((post, i) => ({
      ...post,
      image: [
          "bg-gradient-to-br from-blue-900 to-black",
          "bg-gradient-to-br from-purple-900 to-black",
          "bg-gradient-to-br from-gray-800 to-black"
      ][i]
  }));

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">{content.blog.header}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
             <article key={i} className="group cursor-pointer">
                <div className={`w-full aspect-video rounded-2xl mb-6 overflow-hidden relative ${post.image}`}>
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                   {/* Abstract graphic overlay */}
                   <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-3">
                   <span className="text-brand-primary uppercase">{post.category}</span>
                   <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors flex items-start justify-between">
                   {post.title}
                   <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </h3>
             </article>
          ))}
        </div>
      </div>
    </div>
  );
};