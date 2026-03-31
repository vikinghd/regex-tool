import { useState, useMemo } from 'react';
import { REGEX_EXAMPLES } from '../../constants';
import { RegexExample, MatchResult } from '../../types';
import { useI18n } from '../../i18n';

export function RegexTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useI18n();

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
      setError(e instanceof Error ? e.message : t('regex.invalidRegex'));
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
          className="bg-gradient-to-r from-violet-500/80 to-purple-500/80 text-white px-0.5 rounded whitespace-pre-wrap"
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

  const flagDescriptions = [
    { key: 'g', descKey: 'flag.g' },
    { key: 'i', descKey: 'flag.i' },
    { key: 'm', descKey: 'flag.m' },
    { key: 's', descKey: 'flag.s' },
    { key: 'u', descKey: 'flag.u' },
    { key: 'y', descKey: 'flag.y' },
  ];

  const getExampleName = (example: RegexExample) => {
    if (language === 'en-US') {
      const enNames: Record<string, string> = {
        '邮箱验证': 'Email Validation',
        '手机号（中国）': 'Phone (China)',
        'URL链接': 'URL Link',
        'IP地址（IPv4）': 'IP Address (IPv4)',
        '身份证号（中国）': 'ID Card (China)',
        '日期（YYYY-MM-DD）': 'Date (YYYY-MM-DD)',
        '时间（HH:MM:SS）': 'Time (HH:MM:SS)',
        '十六进制颜色': 'Hex Color',
        '中文字符': 'Chinese Characters',
        '空白行': 'Empty Lines',
        'HTML标签': 'HTML Tags',
        '数字（整数/小数）': 'Numbers (Int/Float)',
      };
      return enNames[example.name] || example.name;
    }
    return example.name;
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('regex.title')}</h2>

        <div className="flex gap-2">
          <span className="flex items-center px-3 py-2 bg-slate-700 text-slate-400 rounded-l-lg font-mono text-lg border border-slate-600 border-r-0">
            /
          </span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t('common.placeholderRegex')}
            className="flex-1 px-3 py-2 bg-slate-900 text-slate-200 border-y border-slate-600 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-slate-500"
          />
          <span className="flex items-center px-3 py-2 bg-slate-700 text-slate-400 font-mono text-lg border border-slate-600 border-l-0">
            /
          </span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gimsuy"
            className="w-32 px-3 py-2 bg-slate-900 text-slate-200 rounded-r-lg border border-slate-600 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-slate-500"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="text-slate-500">{t('common.flags')}：</span>
          {['g', 'i', 'm', 's', 'u', 'y'].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFlags(flags.includes(f) ? flags.replace(f, '') : flags + f);
              }}
              className={`px-2 py-0.5 rounded border transition-colors ${
                flags.includes(f)
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-violet-500'
                  : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-400">
            <span className="font-medium">{t('common.error')}：</span> {error}
          </div>
        )}

        {!error && pattern && (
          <div className="mt-3 p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-lg text-emerald-400">
            <span className="font-medium">✓</span> {t('common.valid')}
          </div>
        )}
      </div>

      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('regex.testText')}</h2>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder={t('common.placeholderText')}
          className="w-full h-40 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none placeholder-slate-500"
        />
      </div>

      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">{t('regex.matchResults')}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            results.matches.length > 0
              ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-700/50'
              : 'bg-slate-700 text-slate-400 border border-slate-600'
          }`}>
            {results.matches.length} {t('common.matches')}
          </span>
        </div>

        {testText && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-slate-400 mb-2">{t('common.highlight')}</h3>
            <div className="p-4 bg-slate-900 rounded-lg font-mono text-sm border border-slate-700 min-h-24 text-slate-300">
              {highlightedText}
            </div>
          </div>
        )}

        {results.matches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">{t('common.details')}</h3>
            <div className="space-y-2">
              {results.matches.map((result, i) => (
                <div key={i} className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-sm font-medium">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-200">
                        {JSON.stringify(result.match)}
                      </code>
                      <p className="text-xs text-slate-500 mt-1">
                        {t('common.position')}: {result.index} - {result.index + result.match.length}
                      </p>
                    </div>
                  </div>
                  {result.groups && Object.keys(result.groups).length > 0 && (
                    <div className="mt-2 ml-11 pl-3 border-l-2 border-slate-600">
                      <p className="text-xs font-medium text-slate-400 mb-1">{t('common.groups')}：</p>
                      {Object.entries(result.groups).map(([key, value]) => (
                        <p key={key} className="text-xs text-slate-400">
                          <span className="font-mono text-violet-400">{key}:</span>{' '}
                          <code className="bg-slate-800 px-1 rounded text-slate-200">{JSON.stringify(value)}</code>
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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('common.examples')}</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {REGEX_EXAMPLES.map((example, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-3 rounded-lg border border-slate-700 hover:bg-slate-700/50 hover:border-violet-500/50 transition-all"
              >
                <div className="font-medium text-slate-200 text-sm">{getExampleName(example)}</div>
                <div className="text-xs text-slate-500 mt-1 truncate font-mono">
                  /{example.pattern}/{example.flags}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('common.flagRef')}</h2>
          <div className="space-y-2 text-sm">
            {flagDescriptions.map(({ key, descKey }) => (
              <div key={key} className="flex gap-2 items-center">
                <code className="w-6 text-center bg-slate-700 text-violet-400 rounded border border-slate-600">{key}</code>
                <span className="text-slate-400">{t(descKey as any)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
