import { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';

function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === String(num);
  });
}

function getIPType(ip: string): { type: string; isPrivate: boolean } {
  const first = parseInt(ip.split('.')[0], 10);

  if (first >= 1 && first <= 126) return { type: 'Class A (公网)', isPrivate: false };
  if (first >= 128 && first <= 191) return { type: 'Class B (公网)', isPrivate: false };
  if (first >= 192 && first <= 223) return { type: 'Class C (公网)', isPrivate: false };
  if (first >= 224 && first <= 239) return { type: '组播 (Multicast)', isPrivate: false };
  if (first >= 240) return { type: '保留 (Reserved)', isPrivate: false };
  if (first === 10) return { type: '私有 A 类 (10.0.0.0/8)', isPrivate: true };
  if (first === 172 && parseInt(ip.split('.')[1], 10) >= 16 && parseInt(ip.split('.')[1], 10) <= 31) {
    return { type: '私有 B 类 (172.16.0.0/12)', isPrivate: true };
  }
  if (first === 192 && parseInt(ip.split('.')[1], 10) === 168) {
    return { type: '私有 C 类 (192.168.0.0/16)', isPrivate: true };
  }
  return { type: '未知', isPrivate: false };
}

function ipToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

export function IpInfoTool() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

  const isValid = input && isValidIPv4(input);
  const ipType = input && isValid ? getIPType(input) : null;
  const ipNumber = input && isValid ? ipToNumber(input) : null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-medium mb-4">IP 地址输入</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例如: 192.168.1.1"
          className="w-full px-4 py-3 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg text-lg font-mono focus:outline-none focus:border-[var(--color-accent)]"
        />
        {input && !isValid && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle size={14} /> 无效的 IPv4 地址
          </p>
        )}
      </div>

      {isValid && ipType && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">IP 类型</h3>
            <p className="text-xl font-semibold">{ipType.type}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs ${ipType.isPrivate ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
              {ipType.isPrivate ? '私有地址' : '公网地址'}
            </span>
          </div>

          <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">十进制</h3>
            <p className="text-xl font-mono">{ipNumber}</p>
            <button
              onClick={() => handleCopy(String(ipNumber), 'dec')}
              className="mt-2 text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              {copied === 'dec' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'dec' ? '已复制' : '复制'}
            </button>
          </div>

          <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">二进制</h3>
            <p className="text-lg font-mono break-all">{input.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.')}</p>
            <button
              onClick={() => handleCopy(input.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('.'), 'bin')}
              className="mt-2 text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              {copied === 'bin' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'bin' ? '已复制' : '复制'}
            </button>
          </div>

          <div className="bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] p-6">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">十六进制</h3>
            <p className="text-lg font-mono">0x{ipNumber?.toString(16).toUpperCase().padStart(8, '0')}</p>
            <button
              onClick={() => handleCopy('0x' + ipNumber?.toString(16).toUpperCase().padStart(8, '0'), 'hex')}
              className="mt-2 text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              {copied === 'hex' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'hex' ? '已复制' : '复制'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
