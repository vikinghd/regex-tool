import { useState } from 'react';
import { useI18n } from '../../i18n';

export function UrlTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      setError(null);
    } catch (e) {
      setError(t('url.encodeError'));
      setOutput('');
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      setError(null);
    } catch (e) {
      setError(t('url.decodeError'));
      setOutput('');
    }
  };

  const process = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  const swap = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    const oldInput = input;
    setInput(output);
    setOutput(oldInput);
    setError(null);
  };

  const copyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
    }
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white'
                  : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]'
              }`}
            >
              {t('common.encode')}
            </button>
            <button
              onClick={swap}
              className="p-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors"
              aria-label={t('common.swap')}
            >
              ⇄
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white'
                  : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)]'
              }`}
            >
              {t('common.decode')}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={process}
              className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              {mode === 'encode' ? t('common.encode') : t('common.decode')}
            </button>
            <button
              onClick={clear}
              className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm"
            >
              {t('common.clear')}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">
              {mode === 'encode' ? t('url.inputText') : t('url.inputUrlEncoded')}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? t('common.placeholderUrlEncode') : t('common.placeholderUrlDecode')}
              className="w-full h-32 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none placeholder-[var(--color-text-muted)]"
            />
          </div>

          {error && (
            <div className="p-3 bg-[var(--color-error)]/20 border border-[var(--color-error)]/50 rounded-lg text-[var(--color-error)] text-sm">
              <span className="font-medium">{t('common.error')}：</span> {error}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-[var(--color-text-secondary)]">
                {mode === 'encode' ? t('common.encoded') : t('common.decoded')}
              </label>
              {output && (
                <button
                  onClick={copyOutput}
                  className="px-3 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded text-xs hover:bg-[var(--color-bg-elevated)] transition-colors"
                >
                  {t('common.copy')}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder={t('common.placeholderResult')}
              className="w-full h-32 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none resize-none placeholder-[var(--color-text-muted)]"
            />
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('common.urlEncodeNote')}</h2>
        <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <p>• {t('url.note1')} <code className="bg-[var(--color-bg-elevated)] px-1 rounded">%XX</code> 格式</p>
          <p>• {t('url.note2')}</p>
          <p>• {t('url.note3')} <code className="bg-[var(--color-bg-elevated)] px-1 rounded">%20</code></p>
          <p>• {t('url.note4')} <code className="bg-[var(--color-bg-elevated)] px-1 rounded">%XX</code> 序列</p>
        </div>
      </div>
    </div>
  );
}
