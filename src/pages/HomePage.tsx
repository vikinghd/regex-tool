import { useNavigate } from 'react-router-dom';
import { ToolMeta, ToolGroup } from '../types/tool';
import { TOOLS } from '../constants/tools';
import { useI18n } from '../i18n';

const TOOL_GRADIENTS: Record<string, string> = {
  regex: 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
  json: 'linear-gradient(135deg, #FFE66D, #4ECDC4)',
  base64: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
  timestamp: 'linear-gradient(135deg, #45B7D1, #7B68EE)',
  url: 'linear-gradient(135deg, #7B68EE, #FF6B6B)',
  hash: 'linear-gradient(135deg, #FF6B6B, #FF8C42)',
  markdown: 'linear-gradient(135deg, #FF8C42, #FFD93D)',
  uuid: 'linear-gradient(135deg, #6BCB77, #4D96FF)',
  password: 'linear-gradient(135deg, #4D96FF, #845EC2)',
  color: 'linear-gradient(135deg, #845EC2, #FF6B6B)',
  regexGen: 'linear-gradient(135deg, #FF9FF3, #FEC260)',
  ipinfo: 'linear-gradient(135deg, #00D9FF, #0092FF)',
};

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
          <h2 className="text-xl font-bold mb-6 text-gray-900 relative inline-block">
            {groupNames[group as keyof typeof groupNames]}
            <span className="absolute -bottom-1 left-0 w-12 h-1 rounded-full" style={{ background: group === 'dev' ? 'linear-gradient(90deg, #FF6B6B, #FFE66D)' : 'linear-gradient(90deg, #00D9FF, #0092FF)' }}></span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div
  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white"
  style={{ background: TOOL_GRADIENTS[tool.id] || 'linear-gradient(135deg, #FF6B6B, #FFE66D)' }}
>
  {tool.icon}
</div>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  {getToolName(tool.id)}
                </span>
                <span className="text-xs text-gray-500 text-center mt-1">
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
