import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TelegramProxyBanner } from './components/TelegramProxyBanner';
import { Home } from './pages/Home';
import { LanguageProvider } from './contexts/LanguageContext';
import { initTelegramTracking } from './utils/telegramTracking';
import { useRouteTracking } from './utils/analytics';
import { landings } from './data/landings';

// Lazy-load heavy routes to keep initial bundle small.
// Articles registry (~80 files) and landing configs split into their own chunks.
const Technology = lazy(() => import('./pages/Technology').then(m => ({ default: m.Technology })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const Locations = lazy(() => import('./pages/Locations').then(m => ({ default: m.Locations })));
const DownloadPage = lazy(() => import('./pages/Download').then(m => ({ default: m.DownloadPage })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const YouTubeNoAds = lazy(() => import('./pages/YouTubeNoAds').then(m => ({ default: m.YouTubeNoAds })));
const PriBlockirovkah = lazy(() => import('./pages/PriBlockirovkah').then(m => ({ default: m.PriBlockirovkah })));
const ChatGPTPage = lazy(() => import('./pages/ChatGPT').then(m => ({ default: m.ChatGPTPage })));
const PlatformPage = lazy(() => import('./pages/PlatformPage').then(m => ({ default: m.PlatformPage })));
const ServiceLanding = lazy(() => import('./pages/ServiceLanding').then(m => ({ default: m.ServiceLanding })));
const LandingBezopasnost = lazy(() => import('./pages/LandingBezopasnost').then(m => ({ default: m.LandingBezopasnost })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Routes rendered WITHOUT the global Navbar/Footer/TelegramProxyBanner — paid-ad
// landings that must stay free of any "обход блокировок"/РКН wording (which lives
// in the global chrome) to pass Yandex Direct moderation.
const BARE_ROUTES = ['/bezopasnost'];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/** Fires a Yandex.Metrika hit + route-specific goals on every SPA navigation. */
const RouteTrackingProbe = () => {
  useRouteTracking();
  return null;
};

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
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
      {/* Compliant paid-ad landing (bare layout, no global chrome) */}
      <Route path="/bezopasnost" element={<LandingBezopasnost />} />
      {/* Platform Pages */}
      <Route path="/android" element={<PlatformPage platform="android" />} />
      <Route path="/ios" element={<PlatformPage platform="ios" />} />
      <Route path="/windows" element={<PlatformPage platform="windows" />} />
      <Route path="/mac" element={<PlatformPage platform="mac" />} />
      {/* Data-driven Landing Pages (services, games, commercial) */}
      {landings.map((cfg) => (
        <Route key={cfg.path} path={cfg.path} element={<ServiceLanding config={cfg} />} />
      ))}
      <Route path="/legal" element={<div className="pt-32 text-center">Legal Page Placeholder</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const AppShell = () => {
  const { pathname } = useLocation();
  const bare = BARE_ROUTES.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (bare) return <AppRoutes />;

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-200 antialiased selection:bg-brand-primary selection:text-white" style={{ paddingTop: 'var(--banner-height, 0px)' }}>
      <TelegramProxyBanner />
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      initTelegramTracking();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <RouteTrackingProbe />
        <AppShell />
      </Router>
    </LanguageProvider>
  );
};

export default App;
