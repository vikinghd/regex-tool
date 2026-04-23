import { useNavigate } from 'react-router-dom';
import { ToolMeta, ToolGroup } from '../types/tool';
import { TOOLS } from '../constants/tools';
import { useI18n } from '../i18n';

interface HomePageProps {
  onToolSelect?: (tool: ToolMeta) => void;
}

export function HomePage({ onToolSelect }: HomePageProps) {
  const navigate = useNavigate();
  const { language, getToolName, getToolDescription } = useI18n();

  const toolsByGroup = TOOLS.reduce((acc, tool) => {
    if (!acc[tool.group]) acc[tool.group] = [];
    acc[tool.group].push(tool);
    return acc;
  }, {} as Record<ToolGroup, ToolMeta[]>);

  const handleToolClick = (tool: ToolMeta) => {
    if (onToolSelect) {
      onToolSelect(tool);
    } else {
      navigate(tool.defaultPath);
    }
  };

  const groupNames = language === 'zh-CN'
    ? { dev: '开发者工具', net: '网络工具' }
    : { dev: 'Developer Tools', net: 'Network Tools' };

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12 text-[var(--color-text-primary)]">
        {language === 'zh-CN' ? 'Developer & Network Tools' : '开发者与网络工具'}
      </h1>

      {Object.entries(toolsByGroup).map(([group, tools]) => (
        <div key={group} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
            {groupNames[group as keyof typeof groupNames]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="flex flex-col items-center p-4 bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <span className="text-sm font-medium text-[var(--color-text-primary)] text-center">
                  {getToolName(tool.id)}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] text-center mt-1">
                  {getToolDescription(tool.id)}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
