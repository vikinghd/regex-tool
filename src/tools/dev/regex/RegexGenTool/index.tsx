import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';

interface ApiConfig {
  apiUrl: string;
  apiKey: string;
}

const DEFAULT_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const STORAGE_KEY = 'regexGenApiConfig';

export function RegexGenTool() {
  const [description, setDescription] = useState('');
  const [generatedRegex, setGeneratedRegex] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfig, setShowConfig] = useState(false);
  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    apiUrl: DEFAULT_API_URL,
    apiKey: '',
  });
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setApiConfig(JSON.parse(saved));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  function saveConfig() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apiConfig));
    setShowConfig(false);
  }

  function copyToClipboard() {
    if (generatedRegex) {
      navigator.clipboard.writeText(generatedRegex);
    }
  }

  function testRegex() {
    if (generatedRegex) {
      navigate('/regex-tester', { state: { presetRegex: generatedRegex } });
    }
  }

  async function generateRegex() {
    if (!description.trim()) {
      return;
    }
    if (!apiConfig.apiKey.trim()) {
      setShowConfig(true);
      setError(t('regexGen.error') + ': ' + t('regexGen.apiKey') + ' required');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedRegex('');

    try {
      const response = await fetch(apiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiConfig.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a regex generator. Only return the regex pattern without any explanation, extra text, or formatting. Do not wrap in backticks or quotes. Just the raw regex pattern.',
            },
            {
              role: 'user',
              content: `Generate a JavaScript regular expression for: ${description}`,
            },
          ],
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      let regex = data.choices?.[0]?.message?.content || '';
      regex = regex.trim();
      regex = regex.replace(/^```regex\s*/, '').replace(/```$/, '');
      regex = regex.replace(/^`|`$/g, '');
      regex = regex.replace(/^\/|\/[gimsuy]*$/g, '');
      setGeneratedRegex(regex);
    } catch (err) {
      setError(t('regexGen.error') + ': ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  }

  const examples = [
    t('regexGen.example1'),
    t('regexGen.example2'),
    t('regexGen.example3'),
    t('regexGen.example4'),
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('regexGen.title')}</h2>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="px-3 py-1 text-sm bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded hover:bg-[var(--color-bg-elevated)] transition-colors"
          >
            ⚙️ {t('regexGen.apiUrl')}
          </button>
        </div>

        {showConfig && (
          <div className="mb-6 p-4 bg-[var(--color-bg-muted)]/50 rounded-lg border border-[var(--color-border)]">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-1">{t('regexGen.apiUrl')}</label>
                <input
                  type="text"
                  value={apiConfig.apiUrl}
                  onChange={(e) => setApiConfig({ ...apiConfig, apiUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="https://api.deepseek.com/v1/chat/completions"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-secondary)] mb-1">{t('regexGen.apiKey')}</label>
                <input
                  type="password"
                  value={apiConfig.apiKey}
                  onChange={(e) => setApiConfig({ ...apiConfig, apiKey: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)]"
                  placeholder="sk-..."
                />
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  🔒 API Key 仅保存在本地浏览器中，不会上传到任何服务器
                </p>
              </div>
              <button
                onClick={saveConfig}
                className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg text-sm hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                {t('regexGen.save')}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('regexGen.description')}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)] resize-none"
              rows={3}
              placeholder={t('regexGen.inputPlaceholder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  generateRegex();
                }
              }}
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('regexGen.example')}</label>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setDescription(example)}
                  className="px-3 py-1.5 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-lg text-xs hover:bg-[var(--color-bg-elevated)] transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generateRegex}
              disabled={loading || !description.trim()}
              className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t('regexGen.loading')}
                </>
              ) : (
                <>
                  <span>✨</span>
                  {t('regexGen.generate')}
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-[var(--color-error)]/20 border border-[var(--color-error)] rounded-lg text-sm text-[var(--color-error)]">
              {error}
            </div>
          )}
        </div>
      </div>

      {generatedRegex && (
        <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">{t('regexGen.result')}</h3>
            <div className="flex gap-2">
              <button
                onClick={testRegex}
                className="px-3 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded text-xs hover:bg-[var(--color-bg-elevated)] transition-colors"
              >
                🧪 {t('regexGen.test')}
              </button>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded text-xs hover:bg-[var(--color-bg-elevated)] transition-colors"
              >
                📋 {t('regexGen.copy')}
              </button>
            </div>
          </div>
          <div className="p-4 bg-[var(--color-bg-muted)] rounded-lg border border-[var(--color-border)]">
            <code className="text-lg font-mono text-[var(--color-accent)] break-all">
              {generatedRegex}
            </code>
          </div>
        </div>
      )}

      <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-[var(--color-accent)] mb-2">🔐 安全提示</h3>
        <ul className="text-xs text-[var(--color-accent)]/70 space-y-1">
          <li>• API Key 仅存储在浏览器本地 (localStorage)，不会被发送到任何第三方服务器</li>
          <li>• 建议使用后端代理来保护 API Key，避免在前端直接暴露</li>
          <li>• 可以设置 API Key 的使用限额和监控，防止意外超额使用</li>
          <li>• 如果 API Key 泄露，立即在 Deepseek 控制台撤销并重新生成</li>
        </ul>
      </div>
    </div>
  );
}
