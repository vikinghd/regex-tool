import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Sidebar } from './components/Sidebar';
import { ToolMeta } from './types/tool';
import { TOOLS } from './constants/tools';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentTool = TOOLS.find((t: ToolMeta) =>
    t.defaultPath === location.pathname ||
    (location.pathname === '/' && t.id === 'regex')
  ) || TOOLS[0];

  const handleToolSelect = (tool: ToolMeta) => {
    navigate(tool.defaultPath);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/regex', { replace: true });
    }
  }, [location.pathname, navigate]);

  const ToolComponent = currentTool.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Helmet>
        <title>{currentTool.name} | DevTools Box</title>
        <meta name="description" content={`${currentTool.description} - 免费在线开发者工具箱`} />
        <meta property="og:title" content={`${currentTool.name} | DevTools Box`} />
        <meta property="og:description" content={`${currentTool.description} - 免费在线开发者工具箱`} />
        <meta property="og:url" content={`https://www.vikinghd.me${currentTool.defaultPath}`} />
      </Helmet>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "DevTools Box",
        "description": "免费在线开发者工具箱：正则表达式测试、JSON格式化、Base64编解码、时间戳转换、URL编解码等工具",
        "url": "https://www.vikinghd.me/",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "CNY"
        }
      })}} />

      <Sidebar currentToolId={currentTool.id} onToolSelect={handleToolSelect} />

      <main className="lg:ml-64 min-h-screen">
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-20">
          <div className="px-4 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-200">{currentTool.name}</h1>
                <p className="text-sm text-slate-400">{currentTool.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-500/30">
                  v0.5.0
                </span>
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
