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
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('uuid.title')}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm text-slate-400 mb-2">{t('uuid.version')}</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as UuidVersion)}
              className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg text-sm"
            >
              <option value="v4">UUID v4 (随机)</option>
              <option value="v1">UUID v1 (时间戳)</option>
              <option value="nil">UUID Nil (全零)</option>
            </select>
          </div>

          {batchMode && (
            <div>
              <label className="block text-sm text-slate-400 mb-2">{t('uuid.count')}</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg text-sm"
              />
            </div>
          )}

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={batchMode}
                onChange={(e) => setBatchMode(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500"
              />
              {t('uuid.generateMultiple')}
            </label>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500"
              />
              {t('uuid.uppercase')}
            </label>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={withHyphens}
                onChange={(e) => setWithHyphens(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500"
              />
              {t('uuid.hyphens')}
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={generate}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            {t('uuid.generate')}
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600 transition-colors text-sm"
          >
            {t('uuid.clear')}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="bg-slate-900/80 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">{t('uuid.result')}</h2>
            {results.length > 1 && (
              <button
                onClick={copyAll}
                className="px-3 py-1 bg-slate-700 text-slate-200 rounded text-xs hover:bg-slate-600 transition-colors"
              >
                {t('uuid.copyAll')}
              </button>
            )}
          </div>
          <div className="space-y-2">
            {results.map((uuid, index) => (
              <div key={index} className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <span className="text-slate-600 text-xs font-mono w-6">{index + 1}</span>
                <code className="flex-1 text-amber-400 font-mono text-sm tracking-wide">{uuid}</code>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-xs hover:bg-slate-600 hover:text-amber-400 transition-colors"
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
