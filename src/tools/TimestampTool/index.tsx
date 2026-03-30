import { useState } from 'react';

export function TimestampTool() {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');

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
    return {
      utc: date.toUTCString(),
      local: date.toLocaleString('zh-CN'),
      iso: date.toISOString(),
      date: date.toLocaleDateString('zh-CN'),
      time: date.toLocaleTimeString('zh-CN')
    };
  })() : null;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-200">时间戳转换</h2>
          <button
            onClick={now}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            当前时间
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm text-slate-400">Unix 时间戳（秒）</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                onBlur={fromTimestamp}
                placeholder="1711800000"
                className="flex-1 px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button
                onClick={copyTimestamp}
                className="px-3 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                复制
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm text-slate-400">日期时间</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              onBlur={fromDateTime}
              className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      {formats && (
        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
          <h2 className="text-lg font-semibold text-slate-200 mb-4">时间格式</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <FormatItem label="ISO 8601" value={formats.iso} />
            <FormatItem label="UTC" value={formats.utc} />
            <FormatItem label="本地日期" value={formats.date} />
            <FormatItem label="本地时间" value={formats.time} />
            <FormatItem label="本地完整" value={formats.local} fullWidth />
          </div>
        </div>
      )}
    </div>
  );
}

function FormatItem({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
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
        复制
      </button>
    </div>
  );
}
