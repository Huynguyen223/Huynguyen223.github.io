import React from 'react';
import { Article } from '../../types';
import { Image } from './Image';
import { Calendar, Tag } from 'lucide-react';
import { Link } from './Link';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <Image 
          src={article.image} 
          alt={article.altText}
          fill
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <Tag className="w-3 h-3" />
          {article.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
          <Calendar className="w-4 h-4" />
          <time>{article.date}</time>
        </div>
        
        <h3 className="font-bold text-xl text-stone-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-stone-100">
          <Link href={`/articles/${article.id}`} className="text-orange-600 font-medium text-sm hover:text-orange-700 transition-colors inline-flex items-center gap-1">
            Read Full Article &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
