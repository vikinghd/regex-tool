import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ToolMeta } from './types/tool';
import { TOOLS } from './constants/tools';

function App() {
  const [currentToolId, setCurrentToolId] = useState<string>('regex');

  const currentTool = TOOLS.find((t: ToolMeta) => t.id === currentToolId) || TOOLS[0];

  const handleToolSelect = (tool: ToolMeta) => {
    setCurrentToolId(tool.id);
    window.history.pushState(null, '', tool.defaultPath);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const tool = TOOLS.find(t => t.defaultPath === path);
    if (tool) {
      setCurrentToolId(tool.id);
    }
  }, []);

  const ToolComponent = currentTool.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Sidebar currentToolId={currentToolId} onToolSelect={handleToolSelect} />

      <main className="lg:pl-64 min-h-screen">
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
          <div className="px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-200">{currentTool.name}</h1>
                <p className="text-sm text-slate-400">{currentTool.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full border border-violet-500/30">
                  v0.2.0
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8">
          <ToolComponent />
        </div>
      </main>
    </div>
  );
}

export default App;
