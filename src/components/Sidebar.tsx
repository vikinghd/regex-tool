import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Github, ChevronUp } from 'lucide-react';
import { ToolMeta, ToolCategory } from '../types/tool';
import { TOOLS, PLACEHOLDER_TOOLS } from '../constants/tools';
import { useI18n } from '../i18n';

interface SidebarProps {
  currentToolId: string;
  onToolSelect: (tool: ToolMeta) => void;
}

const ALL_TOOLS = [...TOOLS, ...PLACEHOLDER_TOOLS];

export function Sidebar({ currentToolId, onToolSelect }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<ToolCategory>>(
    new Set([ToolCategory.TEXT])
  );
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, getToolName, getCategoryName, t } = useI18n();

  const toggleCategory = (category: ToolCategory) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const toolsByCategory = ALL_TOOLS.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, ToolMeta[]>);

  const renderToolList = () => (
    <nav className="flex-1 overflow-y-auto py-4">
      {Object.entries(toolsByCategory).map(([category, tools]) => {
        const cat = category as ToolCategory;
        const isExpanded = expandedCategories.has(cat);
        return (
          <div key={category} className="mb-2">
            <button
              onClick={() => toggleCategory(cat)}
              className="w-full flex items-center justify-between px-4 py-2 text-content-secondary hover:text-content-primary hover:bg-surface-elevated/50 transition-colors"
              aria-expanded={isExpanded}
              aria-controls={`category-${cat}`}
            >
              <span className="text-sm font-medium">{getCategoryName(cat)}</span>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isExpanded && (
              <div className="space-y-1" id={`category-${cat}`}>
                {tools.map((tool: ToolMeta) => {
                  const isActive = currentToolId === tool.id;
                  const isPlaceholder = !TOOLS.find((t: ToolMeta) => t.id === tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        if (!isPlaceholder) {
                          onToolSelect(tool);
                          setMobileOpen(false);
                        }
                      }}
                      disabled={isPlaceholder}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-accent-hover)]/10 text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]'
                          : isPlaceholder
                          ? 'text-content-muted cursor-not-allowed'
                          : 'text-content-secondary hover:text-content-primary hover:bg-surface-elevated/50'
                      }`}
                    >
                      <span className={isPlaceholder ? 'opacity-50' : ''}>{tool.icon}</span>
                      <span className="truncate">{getToolName(tool.id)}</span>
                      {isPlaceholder && <span className="ml-auto text-xs text-slate-600">{t('common.comingSoon')}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  const LanguageSelector = () => (
    <div className="relative">
      <button
        onClick={() => setLangMenuOpen(!langMenuOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-surface-elevated text-content-primary rounded-lg hover:bg-surface-elevated/80 transition-colors text-sm"
        aria-expanded={langMenuOpen}
        aria-haspopup="listbox"
      >
        <span>{language === 'zh-CN' ? '中文' : 'English'}</span>
        {langMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {langMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setLangMenuOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 w-40 bg-surface-elevated rounded-lg border border-border shadow-lg z-50">
            <button
              onClick={() => {
                setLanguage('zh-CN');
                setLangMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-surface-muted transition-colors rounded-t-lg ${
                language === 'zh-CN' ? 'text-accent bg-accent-muted' : 'text-content-secondary'
              }`}
            >
              🇨🇳 中文
            </button>
            <button
              onClick={() => {
                setLanguage('en-US');
                setLangMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-surface-muted transition-colors rounded-b-lg ${
                language === 'en-US' ? 'text-accent bg-accent-muted' : 'text-content-secondary'
              }`}
            >
              🇺🇸 English
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile menu button - only on mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-surface-elevated text-content-primary rounded-lg border border-border"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar - always visible on lg+ */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 z-30 w-64 bg-surface-base border-r border-border">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold text-[var(--color-accent)] tracking-tight">
            DevTools Box
          </h1>
        </div>
        {renderToolList()}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <a
              href="https://github.com/vikinghd/regex-tool"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-surface-elevated text-content-secondary rounded-lg hover:text-content-primary hover:bg-surface-elevated/80 transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={18} />
            </a>
          </div>
          <span className="text-xs text-content-muted">v0.15.0</span>
        </div>
      </aside>

      {/* Mobile sidebar - slides in */}
      <aside className={`
        lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-surface-base border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-lg font-bold text-[var(--color-accent)] tracking-tight">
            DevTools Box
          </h1>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <a
              href="https://github.com/vikinghd/regex-tool"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-surface-elevated text-content-secondary rounded-lg hover:text-content-primary hover:bg-surface-elevated/80 transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={18} />
            </a>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-content-secondary hover:text-content-primary"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex flex-col h-[calc(100vh-65px)]">
          {renderToolList()}
        </div>
      </aside>
    </>
  );
}
