import { useState } from 'react';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);

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
      setError(e instanceof Error ? e.message : '无效的 JSON');
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
      setError(e instanceof Error ? e.message : '无效的 JSON');
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
          <h2 className="text-lg font-semibold text-slate-200">JSON 输入</h2>
          <div className="flex gap-2">
            <button
              onClick={format}
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              格式化
            </button>
            <button
              onClick={minify}
              className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              压缩
            </button>
            <button
              onClick={clear}
              className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              清空
            </button>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "test", "value": 123}'
          className="w-full h-48 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none placeholder-slate-500"
        />

        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400 text-sm">
            <span className="font-medium">错误：</span> {error}
          </div>
        )}
      </div>

      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">输出</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-slate-400 text-sm">缩进:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(Number(e.target.value))}
                className="px-2 py-1 bg-slate-900 text-slate-200 border border-slate-600 rounded text-sm"
              >
                <option value={2}>2 空格</option>
                <option value={4}>4 空格</option>
                <option value={8}>8 空格</option>
              </select>
            </div>
            {output && (
              <button
                onClick={copyOutput}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                复制
              </button>
            )}
          </div>
        </div>

        <textarea
          value={output}
          readOnly
          placeholder="格式化后的 JSON 将显示在这里..."
          className="w-full h-48 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none resize-none placeholder-slate-500"
        />
      </div>
    </div>
  );
}
