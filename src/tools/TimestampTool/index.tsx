import { useState } from 'react';
import { useI18n } from '../../i18n';

export function TimestampTool() {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const { t, language } = useI18n();

  const now = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(ts.toString());
    const dt = new Date(ts * 1000);
    setDateTime(dt.toISOString().slice(0, 16));
  };

  const fromTimestamp = () => {
    if (!timestamp) return;
    const ts = parseInt(timestamp, 10);
    const dt = new Date(ts * 1000);
    setDateTime(dt.toISOString().slice(0, 16));
  };

  const fromDateTime = () => {
    if (!dateTime) return;
    const dt = new Date(dateTime);
    const ts = Math.floor(dt.getTime() / 1000);
    setTimestamp(ts.toString());
  };

  const copyTimestamp = async () => {
    if (timestamp) {
      await navigator.clipboard.writeText(timestamp);
    }
  };

  const formats = timestamp ? (() => {
    const ts = parseInt(timestamp, 10);
    const date = new Date(ts * 1000);
    const locale = language === 'zh-CN' ? 'zh-CN' : 'en-US';
    return {
      utc: date.toUTCString(),
      local: date.toLocaleString(locale),
      iso: date.toISOString(),
      date: date.toLocaleDateString(locale),
      time: date.toLocaleTimeString(locale)
    };
  })() : null;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">{t('timestamp.title')}</h2>
          <button
            onClick={now}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            {t('common.now')}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm text-slate-400">{t('timestamp.unixLabel')}</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                onBlur={fromTimestamp}
                placeholder="1711800000"
                className="flex-1 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={copyTimestamp}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                {t('common.copy')}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-slate-400">{t('timestamp.datetimeLabel')}</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              onBlur={fromDateTime}
              className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {formats && (
        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('timestamp.formats')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <FormatItem label={t('timestamp.iso')} value={formats.iso} />
            <FormatItem label={t('common.utc')} value={formats.utc} />
            <FormatItem label={t('common.localDate')} value={formats.date} />
            <FormatItem label={t('common.localTime')} value={formats.time} />
            <FormatItem label={t('common.localFull')} value={formats.local} fullWidth />
          </div>
        </div>
      )}
    </div>
  );
}

function FormatItem({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
  const { t } = useI18n();
  const copy = async () => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className={`${fullWidth ? 'md:col-span-2' : ''} flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700`}>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm text-slate-200 font-mono">{value}</p>
      </div>
      <button
        onClick={copy}
        className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-xs hover:bg-slate-600 transition-colors"
      >
        {t('common.copy')}
      </button>
    </div>
  );
}
