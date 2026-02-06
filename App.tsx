import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Technology } from './pages/Technology';
import { Pricing } from './pages/Pricing';
import { Locations } from './pages/Locations';
import { DownloadPage } from './pages/Download';
import { Blog } from './pages/Blog';
import { ArticlePage } from './pages/ArticlePage';
import { YouTubeNoAds } from './pages/YouTubeNoAds';
import { PriBlockirovkah } from './pages/PriBlockirovkah';
import { ChatGPTPage } from './pages/ChatGPT';
import { PlatformPage } from './pages/PlatformPage';
import { NotFound } from './pages/NotFound';
import { LanguageProvider } from './contexts/LanguageContext';
import { initTelegramTracking } from './utils/telegramTracking';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Инициализация отслеживания Telegram ссылок
  React.useEffect(() => {
    // Небольшая задержка для загрузки DOM
    const timer = setTimeout(() => {
      initTelegramTracking();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans text-gray-200 antialiased selection:bg-brand-primary selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/download" element={<DownloadPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:articleId" element={<ArticlePage />} />
              {/* SEO Landing Pages */}
              <Route path="/youtube-bez-reklamy" element={<YouTubeNoAds />} />
              <Route path="/pri-blokirovkah" element={<PriBlockirovkah />} />
              <Route path="/chatgpt" element={<ChatGPTPage />} />
              {/* Platform Pages */}
              <Route path="/android" element={<PlatformPage platform="android" />} />
              <Route path="/ios" element={<PlatformPage platform="ios" />} />
              <Route path="/windows" element={<PlatformPage platform="windows" />} />
              <Route path="/mac" element={<PlatformPage platform="mac" />} />
              <Route path="/legal" element={<div className="pt-32 text-center">Legal Page Placeholder</div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
