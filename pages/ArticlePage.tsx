import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Send, Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { ArticleRenderer } from '../components/ArticleRenderer';
import { articleBySlug, articles, loadArticle } from '../data/blog';
import type { ArticleSection } from '../data/blog';
import { applySeo, articleLd } from '../utils/meta';
import { useScrollDepth, Goals } from '../utils/analytics';

import { tgBotUrl } from '../utils/telegram';

export const ArticlePage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  // Metadata is available synchronously (header + SEO render immediately);
  // the heavy body (sections) loads lazily as its own chunk.
  const article = articleId ? articleBySlug(articleId) : undefined;
  const [sections, setSections] = useState<ArticleSection[] | null>(null);

  useEffect(() => {
    if (!articleId) return;
    let active = true;
    setSections(null);
    loadArticle(articleId).then((full) => {
      if (active) setSections(full?.sections ?? []);
    });
    return () => { active = false; };
  }, [articleId]);

  // Fire ARTICLE_READ goal when the visitor crosses 50 % depth on the article.
  useScrollDepth({ extraGoalAt50: Goals.ARTICLE_READ });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!article || !articleId) return;

    applySeo({
      title: `${article.title} | BRAID VPN`,
      description: article.metaDescription,
      path: `/blog/${articleId}`,
      keywords: article.keywords,
      ogType: 'article',
      jsonLd: articleLd({
        title: article.title,
        description: article.metaDescription,
        keywords: article.keywords,
        datePublished: article.date,
        path: `/blog/${articleId}`,
      }),
    });
  }, [articleId, article]);

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Статья не найдена</h1>
        <NavLink to="/blog" className="text-brand-primary hover:underline">
          Вернуться к блогу
        </NavLink>
      </div>
    );
  }

  const relatedArticles = (article.relatedSlugs ?? [])
    .map(slug => articleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 3);

  // Fallback if no related slugs — pick latest non-self
  const related = relatedArticles.length > 0
    ? relatedArticles
    : articles.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к блогу
        </button>
      </div>

      <header className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {article.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
          {article.metaDescription}
        </p>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <a
          href={tgBotUrl(`blog_top_${articleId ?? 'unknown'}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-4 glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 hover:border-brand-primary/50 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm sm:text-base font-semibold text-white">Нужен рабочий VPN? 7 дней бесплатно</div>
            <div className="text-xs sm:text-sm text-gray-400">Ключ в Telegram за 30 секунд — без карты, до 5 устройств</div>
          </div>
          <Button variant="primary" className="flex-shrink-0 text-sm px-4 sm:px-6 py-2.5 whitespace-nowrap">
            <Send className="w-4 h-4" />Получить ключ
          </Button>
        </a>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none
          prose-headings:font-display prose-headings:font-bold prose-headings:text-white
          prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:sm:mt-12 prose-h2:mb-4 prose-h2:sm:mb-6
          prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:sm:mt-8 prose-h3:mb-3 prose-h3:sm:mb-4
          prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4 prose-p:sm:mb-6
          prose-li:text-gray-400 prose-li:my-1 prose-li:sm:my-2
          prose-strong:text-white prose-strong:font-semibold
          prose-a:text-brand-primary prose-a:no-underline hover:prose-a:underline
          prose-table:w-full prose-table:text-sm prose-table:sm:text-base
          prose-th:bg-white/5 prose-th:px-3 prose-th:sm:px-4 prose-th:py-2 prose-th:sm:py-3 prose-th:text-left prose-th:text-white prose-th:font-semibold prose-th:border-b prose-th:border-white/10
          prose-td:px-3 prose-td:sm:px-4 prose-td:py-2 prose-td:sm:py-3 prose-td:border-b prose-td:border-white/5 prose-td:text-gray-400
          [&_.lead]:text-lg [&_.lead]:sm:text-xl [&_.lead]:text-gray-300 [&_.lead]:leading-relaxed [&_.lead]:mb-6 [&_.lead]:sm:mb-8
          [&_.info-box]:bg-brand-primary/10 [&_.info-box]:border [&_.info-box]:border-brand-primary/30 [&_.info-box]:rounded-xl [&_.info-box]:sm:rounded-2xl [&_.info-box]:p-4 [&_.info-box]:sm:p-6 [&_.info-box]:my-6 [&_.info-box]:sm:my-8
          [&_.info-box.success]:bg-green-500/10 [&_.info-box.success]:border-green-500/30
          [&_.info-box.warning]:bg-yellow-500/10 [&_.info-box.warning]:border-yellow-500/30
          [&_.info-box_h4]:text-base [&_.info-box_h4]:sm:text-lg [&_.info-box_h4]:font-bold [&_.info-box_h4]:text-white [&_.info-box_h4]:mb-2 [&_.info-box_h4]:mt-0
          [&_.info-box_p]:text-sm [&_.info-box_p]:sm:text-base [&_.info-box_p]:text-gray-400 [&_.info-box_p]:mb-0
        ">
          {sections === null ? (
            <div className="space-y-4 animate-pulse" aria-hidden="true">
              <div className="h-4 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-full" />
              <div className="h-4 bg-white/5 rounded w-5/6" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
            </div>
          ) : (
            <ArticleRenderer sections={sections} />
          )}
        </div>
      </article>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-3 sm:mb-4">
              Попробуйте BRAID VPN бесплатно
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
              7 дней полного доступа без оплаты. Без данных карты. До 5 устройств одновременно.
              Протокол VLESS Reality — обходит любые блокировки.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 sm:mb-8">
              <a href={tgBotUrl(`blog_${articleId ?? 'unknown'}`)} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                  Получить ключ в Telegram
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <NavLink to="/besplatno" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  Бесплатно 7 дней
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </NavLink>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                Работает в России
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                YouTube без рекламы
              </span>
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                Скорость 10 Гбит/с
              </span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-6 sm:mb-8 text-center">
            Читайте также
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {related.map((relatedPost) => (
              <NavLink
                key={relatedPost.slug}
                to={`/blog/${relatedPost.slug}`}
                className="glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-brand-primary/50 transition-all group"
              >
                <div className="text-[10px] sm:text-xs text-gray-500 mb-2">{relatedPost.date} • {relatedPost.category}</div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-primary transition-colors mb-2 line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{relatedPost.excerpt}</p>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
