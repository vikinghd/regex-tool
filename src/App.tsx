import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { ToolMeta } from './types/tool';
import { TOOLS } from './constants/tools';
import { useI18n } from './i18n';

function HomePageWrapper({ onToolSelect }: { onToolSelect: (tool: ToolMeta) => void }) {
  const { language } = useI18n();
  return (
    <>
      <Helmet>
        <title>DevTools Box - 开发者与网络工具箱</title>
        <meta name="description" content="免费在线开发者工具箱，包含正则表达式、JSON格式化、Base64编解码、哈希生成、颜色转换等工具。同时提供IP信息解析等网络工程师必备工具。" />
        <meta property="og:title" content="DevTools Box - 开发者与网络工具箱" />
        <meta property="og:description" content="免费在线开发者工具与网络工程师工具箱" />
        <meta property="og:url" content="https://www.vikinghd.me/" />
        <link rel="canonical" href="https://www.vikinghd.me/" />
        <meta name="keywords" content="开发者工具, 正则表达式, JSON格式化, Base64, 哈希, 颜色转换, IP地址, 网络工具" />
      </Helmet>
      <HomePage onToolSelect={onToolSelect} />
    </>
  );
}

function AppContent({ onToolSelect }: { onToolSelect: (tool: ToolMeta) => void }) {
  const location = useLocation();
  const { language, getToolName, getToolDescription, getToolSeoDescription, getCategoryName } = useI18n();

  const currentTool = TOOLS.find((t: ToolMeta) =>
    t.defaultPath === location.pathname
  ) || TOOLS[0];

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

      <Sidebar currentToolId={currentTool.id} onToolSelect={onToolSelect} />

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
  const navigate = useNavigate();

  const handleToolSelect = (tool: ToolMeta) => {
    navigate(tool.defaultPath);
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePageWrapper onToolSelect={handleToolSelect} />} />
          <Route path="/*" element={<AppContent onToolSelect={handleToolSelect} />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
