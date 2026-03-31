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
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {t('common.encode')}
            </button>
            <button
              onClick={swap}
              className="p-2 bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600 transition-colors"
              title={t('common.swap')}
            >
              ⇄
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {t('common.decode')}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={process}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              {mode === 'encode' ? t('common.encode') : t('common.decode')}
            </button>
            <button
              onClick={clear}
              className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              {t('common.clear')}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              {mode === 'encode' ? t('url.inputText') : t('url.inputUrlEncoded')}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? t('common.placeholderUrlEncode') : t('common.placeholderUrlDecode')}
              className="w-full h-32 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none placeholder-slate-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm">
              <span className="font-medium">{t('common.error')}：</span> {error}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-slate-400">
                {mode === 'encode' ? t('common.encoded') : t('common.decoded')}
              </label>
              {output && (
                <button
                  onClick={copyOutput}
                  className="px-3 py-1 bg-slate-700 text-slate-200 rounded text-xs hover:bg-slate-600 transition-colors"
                >
                  {t('common.copy')}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder={t('common.placeholderResult')}
              className="w-full h-32 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none resize-none placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('common.urlEncodeNote')}</h2>
        <div className="space-y-2 text-sm text-slate-400">
          <p>• {t('url.note1')} <code className="bg-slate-700 px-1 rounded">%XX</code> 格式</p>
          <p>• {t('url.note2')}</p>
          <p>• {t('url.note3')} <code className="bg-slate-700 px-1 rounded">%20</code></p>
          <p>• {t('url.note4')} <code className="bg-slate-700 px-1 rounded">%XX</code> 序列</p>
        </div>
      </div>
    </div>
  );
}
