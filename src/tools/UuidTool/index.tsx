import { useState } from 'react';
import { useI18n } from '../../i18n';

type UuidVersion = 'v4' | 'v1' | 'nil';

export function UuidTool() {
  const [version, setVersion] = useState<UuidVersion>('v4');
  const [batchMode, setBatchMode] = useState(false);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);
  const [results, setResults] = useState<string[]>([]);
  const { t } = useI18n();

  function generateUuidV4(): string {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function generateUuidV1(): string {
    const node = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256));
    const timestamp = Date.now() + 12219292800000;
    const timeLow = timestamp & 0xffffffff;
    const timeMid = (timestamp >>> 32) & 0xffff;
    const timeHiAndVersion = ((timestamp >>> 48) & 0x0fff) | 0x1000;
    const clockSeqHiAndReserved = Math.floor(Math.random() * 64) | 0x80;
    const clockSeqLow = Math.floor(Math.random() * 256);

    const hex = (n: number, len: number) => n.toString(16).padStart(len, '0');

    return `${hex(timeLow, 8)}-${hex(timeMid, 4)}-${hex(timeHiAndVersion, 4)}-${hex(clockSeqHiAndReserved, 2)}${hex(clockSeqLow, 2)}-${node.map(b => hex(b, 2)).join('')}`;
  }

  function generateNilUuid(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  function generateUuid(): string {
    let uuid: string;
    switch (version) {
      case 'v1':
        uuid = generateUuidV1();
        break;
      case 'nil':
        uuid = generateNilUuid();
        break;
      default:
        uuid = generateUuidV4();
    }

    if (!withHyphens) {
      uuid = uuid.replace(/-/g, '');
    }

    if (uppercase) {
      uuid = uuid.toUpperCase();
    }

    return uuid;
  }

  function generate() {
    if (batchMode) {
      const newResults: string[] = [];
      for (let i = 0; i < count; i++) {
        newResults.push(generateUuid());
      }
      setResults(newResults);
    } else {
      const uuid = generateUuid();
      setResults([uuid]);
    }
  }

  function copyToClipboard(text: string) {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  }

  function copyAll() {
    if (results.length > 0) {
      navigator.clipboard.writeText(results.join('\n'));
    }
  }

  function clear() {
    setResults([]);
  }

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('uuid.title')}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('uuid.version')}</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as UuidVersion)}
              className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              <option value="v4">UUID v4 (随机)</option>
              <option value="v1">UUID v1 (时间戳)</option>
              <option value="nil">UUID Nil (全零)</option>
            </select>
          </div>

          {batchMode && (
            <div>
              <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('uuid.count')}</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm"
              />
            </div>
          )}

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={batchMode}
                onChange={(e) => setBatchMode(e.target.checked)}
                className="w-4 h-4 rounded bg-[var(--color-bg-muted)] border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              {t('uuid.generateMultiple')}
            </label>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded bg-[var(--color-bg-muted)] border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              {t('uuid.uppercase')}
            </label>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={withHyphens}
                onChange={(e) => setWithHyphens(e.target.checked)}
                className="w-4 h-4 rounded bg-[var(--color-bg-muted)] border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              {t('uuid.hyphens')}
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={generate}
            className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            {t('uuid.generate')}
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors text-sm"
          >
            {t('uuid.clear')}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-[var(--color-bg-muted)] rounded-xl border border-[var(--color-border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">{t('uuid.result')}</h2>
            {results.length > 1 && (
              <button
                onClick={copyAll}
                className="px-3 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded text-xs hover:bg-[var(--color-bg-surface)] transition-colors"
              >
                {t('uuid.copyAll')}
              </button>
            )}
          </div>
          <div className="space-y-2">
            {results.map((uuid, index) => (
              <div key={index} className="flex items-center gap-3 bg-[var(--color-bg-surface)] rounded-lg p-3 border border-[var(--color-border)]">
                <span className="text-[var(--color-text-muted)] text-xs font-mono w-6">{index + 1}</span>
                <code className="flex-1 text-[var(--color-accent)] font-mono text-sm tracking-wide">{uuid}</code>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="px-3 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded text-xs hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {t('uuid.copy')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
