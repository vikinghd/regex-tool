import { useState } from 'react';
import { useI18n } from '../../i18n';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const { t } = useI18n();

  const format = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('json.invalidJson'));
      setOutput('');
    }
  };

  const minify = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('json.invalidJson'));
      setOutput('');
    }
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
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">{t('json.input')}</h2>
          <div className="flex gap-2">
            <button
              onClick={format}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              {t('common.format')}
            </button>
            <button
              onClick={minify}
              className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              {t('common.minify')}
            </button>
            <button
              onClick={clear}
              className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              {t('common.clear')}
            </button>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('common.placeholderJson')}
          className="w-full h-48 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none placeholder-slate-500"
        />

        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm">
            <span className="font-medium">{t('common.error')}：</span> {error}
          </div>
        )}
      </div>

      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">{t('common.output')}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-sm">{t('common.indent')}:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-2 py-1 bg-slate-900 text-slate-200 border border-slate-600 rounded text-sm"
              >
                <option value={2}>{t('common.indent2')}</option>
                <option value={4}>{t('common.indent4')}</option>
                <option value={8}>{t('common.indent8')}</option>
              </select>
            </div>
            {output && (
              <button
                onClick={copyOutput}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                {t('common.copy')}
              </button>
            )}
          </div>
        </div>

        <textarea
          value={output}
          readOnly
          placeholder={t('json.outputPlaceholder')}
          className="w-full h-48 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none resize-none placeholder-slate-500"
        />
      </div>
    </div>
  );
}
