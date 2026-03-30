import { useState, useMemo } from 'react';
import { REGEX_EXAMPLES } from './constants';
import { RegexExample, MatchResult } from './types';

function App() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const results = useMemo(() => {
    if (!pattern) {
      setError(null);
      return { isValid: true, matches: [] as MatchResult[] };
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches: MatchResult[] = [];
      const hasGlobal = flags.includes('g');

      if (hasGlobal) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.groups || null
          });
          // 防止无限循环
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.groups || null
          });
        }
      }

      setError(null);
      return { isValid: true, matches };
    } catch (e) {
      setError(e instanceof Error ? e.message : '无效的正则表达式');
      return { isValid: false, matches: [] as MatchResult[] };
    }
  }, [pattern, flags, testText]);

  const handleExampleClick = (example: RegexExample) => {
    setPattern(example.pattern);
    setFlags(example.flags);
    setTestText(example.testText);
  };

  const highlightedText = useMemo(() => {
    if (!results.isValid || results.matches.length === 0) {
      return <span className="whitespace-pre-wrap">{testText}</span>;
    }

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    results.matches.forEach((result, i) => {
      if (result.index > lastIndex) {
        parts.push(
          <span key={`text-${i}`} className="whitespace-pre-wrap">
            {testText.slice(lastIndex, result.index)}
          </span>
        );
      }
      parts.push(
        <mark
          key={`match-${i}`}
          className="bg-yellow-300 text-gray-900 px-0.5 rounded whitespace-pre-wrap"
        >
          {result.match}
        </mark>
      );
      lastIndex = result.index + result.match.length;
    });

    if (lastIndex < testText.length) {
      parts.push(
        <span key="text-end" className="whitespace-pre-wrap">
          {testText.slice(lastIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  }, [testText, results]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">正则表达式测试工具</h1>
          <p className="text-gray-600 mt-1">实时测试、验证和调试你的正则表达式</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Regex Input */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">正则表达式</h2>

              <div className="flex gap-2">
                <span className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 rounded-l-lg font-mono text-lg border border-r-0">
                  /
                </span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="输入正则表达式..."
                  className="flex-1 px-3 py-2 border-y text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex items-center px-3 py-2 bg-gray-100 text-gray-600 font-mono text-lg border border-l-0">
                  /
                </span>
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="gimsuy"
                  className="w-32 px-3 py-2 rounded-r-lg border text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Flags Help */}
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <span className="text-gray-500">修饰符：</span>
                {['g', 'i', 'm', 's', 'u', 'y'].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFlags(flags.includes(f) ? flags.replace(f, '') : flags + f);
                    }}
                    className={`px-2 py-0.5 rounded border ${
                      flags.includes(f)
                        ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <span className="font-medium">错误：</span> {error}
                </div>
              )}

              {!error && pattern && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  <span className="font-medium">✓</span> 正则表达式有效
                </div>
              )}
            </div>

            {/* Test Text */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">测试文本</h2>
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="在此输入要测试的文本..."
                className="w-full h-40 px-3 py-2 border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Results */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">匹配结果</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  results.matches.length > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {results.matches.length} 个匹配
                </span>
              </div>

              {/* Highlighted Text */}
              {testText && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">高亮显示</h3>
                  <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm border min-h-24">
                    {highlightedText}
                  </div>
                </div>
              )}

              {/* Match Details */}
              {results.matches.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">详细信息</h3>
                  <div className="space-y-2">
                    {results.matches.map((result, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-medium">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <code className="text-sm font-mono bg-gray-200 px-2 py-0.5 rounded">
                              {JSON.stringify(result.match)}
                            </code>
                            <p className="text-xs text-gray-500 mt-1">
                              位置: {result.index} - {result.index + result.match.length}
                            </p>
                          </div>
                        </div>
                        {result.groups && Object.keys(result.groups).length > 0 && (
                          <div className="mt-2 ml-11 pl-3 border-l-2 border-gray-300">
                            <p className="text-xs font-medium text-gray-600 mb-1">分组：</p>
                            {Object.entries(result.groups).map(([key, value]) => (
                              <p key={key} className="text-xs text-gray-600">
                                <span className="font-mono">{key}:</span>{' '}
                                <code className="bg-gray-200 px-1 rounded">{JSON.stringify(value)}</code>
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Examples */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">常用正则</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {REGEX_EXAMPLES.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(example)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-medium text-gray-800">{example.name}</div>
                    <div className="text-xs text-gray-500 mt-1 truncate font-mono">
                      /{example.pattern}/{example.flags}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{example.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Flags Reference */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">修饰符说明</h2>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <code className="w-6 text-center bg-gray-100 rounded">g</code>
                  <span className="text-gray-600">全局匹配</span>
                </div>
                <div className="flex gap-2">
                  <code className="w-6 text-center bg-gray-100 rounded">i</code>
                  <span className="text-gray-600">忽略大小写</span>
                </div>
                <div className="flex gap-2">
                  <code className="w-6 text-center bg-gray-100 rounded">m</code>
                  <span className="text-gray-600">多行匹配</span>
                </div>
                <div className="flex gap-2">
                  <code className="w-6 text-center bg-gray-100 rounded">s</code>
                  <span className="text-gray-600">. 匹配换行符</span>
                </div>
                <div className="flex gap-2">
                  <code className="w-6 text-center bg-gray-100 rounded">u</code>
                  <span className="text-gray-600">Unicode 模式</span>
                </div>
                <div className="flex gap-2">
                  <code className="w-6 text-center bg-gray-100 rounded">y</code>
                  <span className="text-gray-600">粘性匹配</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>正则表达式测试工具 · 用 ❤️ 构建</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
