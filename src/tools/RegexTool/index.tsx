import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { REGEX_EXAMPLES } from '../../constants';
import { RegexExample, MatchResult } from '../../types';
import { useI18n } from '../../i18n';

export function RegexTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { t, language } = useI18n();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { presetRegex?: string };
    if (state?.presetRegex) {
      setPattern(state.presetRegex);
    }
  }, [location.state]);

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
          className="bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent-hover)]/80 text-white px-0.5 rounded whitespace-pre-wrap"
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
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('regex.title')}</h2>

        <div className="flex gap-2">
          <span className="flex items-center px-3 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-l-lg font-mono text-lg border border-[var(--color-border)] border-r-0">
            /
          </span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t('common.placeholderRegex')}
            className="flex-1 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border-y border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)]"
          />
          <span className="flex items-center px-3 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] font-mono text-lg border border-[var(--color-border)] border-l-0">
            /
          </span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="gimsuy"
            className="w-32 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] rounded-r-lg border border-[var(--color-border)] text-lg font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)]"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="text-[var(--color-text-muted)]">{t('common.flags')}：</span>
          {flagDescriptions.map(({ key, descKey }) => (
            <button
              key={key}
              onClick={() => {
                setFlags(flags.includes(key) ? flags.replace(key, '') : flags + key);
              }}
              aria-label={t(descKey as any)}
              aria-pressed={flags.includes(key)}
              className={`px-2 py-0.5 rounded border transition-colors ${
                flags.includes(key)
                  ? 'bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white border-[var(--color-accent)]'
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-bg-elevated)]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-3 p-3 bg-[var(--color-error)]/20 border border-[var(--color-error)]/50 rounded-lg text-[var(--color-error)]">
            <span className="font-medium">{t('common.error')}：</span> {error}
          </div>
        )}

        {!error && pattern && (
          <div className="mt-3 p-3 bg-[var(--color-success)]/20 border border-[var(--color-success)]/50 rounded-lg text-[var(--color-success)]">
            <span className="font-medium">✓</span> {t('common.valid')}
          </div>
        )}
      </div>

      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('regex.testText')}</h2>
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder={t('common.placeholderText')}
          className="w-full h-40 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none placeholder-[var(--color-text-muted)]"
        />
      </div>

      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border-l-4 border-l-[var(--color-accent)] border-t border-r border-b border-[var(--color-border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('regex.matchResults')}</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            results.matches.length > 0
              ? 'bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/50'
              : 'bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
          }`}>
            {results.matches.length} {t('common.matches')}
          </span>
        </div>

        {testText && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('common.highlight')}</h3>
            <div className="p-4 bg-[var(--color-bg-muted)] rounded-lg font-mono text-sm border border-[var(--color-border)] min-h-24 text-[var(--color-text-primary)]">
              {highlightedText}
            </div>
          </div>
        )}

        {results.matches.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('common.details')}</h3>
            <div className="space-y-2">
              {results.matches.map((result, i) => (
                <div key={i} className="p-3 bg-[var(--color-bg-muted)] rounded-lg border border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white rounded-full text-sm font-medium">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono bg-[var(--color-bg-surface)] px-2 py-0.5 rounded text-[var(--color-text-primary)]">
                        {JSON.stringify(result.match)}
                      </code>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {t('common.position')}: {result.index} - {result.index + result.match.length}
                      </p>
                    </div>
                  </div>
                  {result.groups && Object.keys(result.groups).length > 0 && (
                    <div className="mt-2 ml-11 pl-3 border-l-2 border-[var(--color-border)]">
                      <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-1">{t('common.groups')}：</p>
                      {Object.entries(result.groups).map(([key, value]) => (
                        <p key={key} className="text-xs text-[var(--color-text-secondary)]">
                          <span className="font-mono text-[var(--color-accent)]">{key}:</span>{' '}
                          <code className="bg-[var(--color-bg-surface)] px-1 rounded text-[var(--color-text-primary)]">{JSON.stringify(value)}</code>
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
        {/* Examples - lighter reference style */}
        <div className="bg-[var(--color-bg-surface)]/50 rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">{t('common.examples')}</h2>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {REGEX_EXAMPLES.map((example, i) => (
              <button
                key={i}
                onClick={() => handleExampleClick(example)}
                className="text-left p-2 rounded-lg hover:bg-[var(--color-bg-elevated)]/70 transition-colors group"
              >
                <div className="font-medium text-[var(--color-text-primary)] text-xs group-hover:text-[var(--color-accent)] transition-colors">{getExampleName(example)}</div>
                <div className="text-xs text-[var(--color-text-muted)] truncate font-mono">
                  /{example.pattern}/{example.flags}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Flag reference - compact reference style */}
        <div className="bg-[var(--color-bg-surface)]/50 rounded-xl border border-[var(--color-border)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">{t('common.flagRef')}</h2>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {flagDescriptions.map(({ key, descKey }) => (
              <div key={key} className="flex items-center gap-2">
                <code className="w-6 h-6 text-center bg-[var(--color-bg-elevated)] text-[var(--color-accent)] rounded border border-[var(--color-border)] text-xs">{key}</code>
                <span className="text-[var(--color-text-secondary)] text-xs">{t(descKey as any)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
