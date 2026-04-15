import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Sidebar } from './components/Sidebar';
import { ToolMeta } from './types/tool';
import { TOOLS } from './constants/tools';
import { useI18n } from './i18n';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, getToolName, getToolDescription, getToolSeoDescription, getCategoryName } = useI18n();

  const currentTool = TOOLS.find((t: ToolMeta) =>
    t.defaultPath === location.pathname ||
    (location.pathname === '/' && t.id === 'regex')
  ) || TOOLS[0];

  const handleToolSelect = (tool: ToolMeta) => {
    navigate(tool.defaultPath);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/regex-tester', { replace: true });
    }
  }, [location.pathname, navigate]);

  const ToolComponent = currentTool.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-bg-base)] via-[var(--color-bg-surface)] to-[var(--color-bg-base)]">
      <Helmet>
        <title>{getToolName(currentTool.id)} | DevTools Box</title>
        <meta name="description" content={getToolSeoDescription(currentTool.id)} />
        <meta property="og:title" content={`${getToolName(currentTool.id)} | DevTools Box`} />
        <meta property="og:description" content={getToolSeoDescription(currentTool.id)} />
        <meta property="og:url" content={`https://www.vikinghd.me${currentTool.defaultPath}`} />
        <link rel="canonical" href={`https://www.vikinghd.me${currentTool.defaultPath}`} />
        <meta name="keywords" content={`${getToolName(currentTool.id)}, ${getToolDescription(currentTool.id)}, online tool, developer tools, free tools`} />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": `${getToolName(currentTool.id)} | DevTools Box`,
        "description": getToolSeoDescription(currentTool.id),
        "url": `https://www.vikinghd.me${currentTool.defaultPath}`,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "vikinghd",
          "url": "https://github.com/vikinghd"
        }
      })}} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": language === 'zh-CN' ? '首页' : 'Home',
            "item": "https://www.vikinghd.me/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": getCategoryName(currentTool.category),
            "item": `https://www.vikinghd.me${currentTool.defaultPath}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": getToolName(currentTool.id),
            "item": `https://www.vikinghd.me${currentTool.defaultPath}`
          }
        ]
      })}} />

      <Sidebar currentToolId={currentTool.id} onToolSelect={handleToolSelect} />

      <main className="lg:ml-64 min-h-screen">
        <header className="bg-[var(--color-bg-surface)]/80 backdrop-blur-sm border-b border-[var(--color-border)] sticky top-0 z-20">
          <div className="px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-[var(--color-text-primary)]">{getToolName(currentTool.id)}</h1>
                <p className="text-sm text-[var(--color-text-secondary)]">{getToolDescription(currentTool.id)}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          <ToolComponent />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
