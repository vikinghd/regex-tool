import { useState, useCallback } from 'react';
import { useI18n } from '../../i18n';

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export function HashTool() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [uppercase, setUppercase] = useState(false);
  const [result, setResult] = useState('');
  const { t } = useI18n();

  const generateHash = useCallback(async (text: string, algo: HashAlgorithm): Promise<string> => {
    if (!text) return '';

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    let hashBuffer: ArrayBuffer;
    switch (algo) {
      case 'MD5':
        return md5(text);
      case 'SHA-1':
        hashBuffer = await crypto.subtle.digest('SHA-1', data);
        break;
      case 'SHA-256':
        hashBuffer = await crypto.subtle.digest('SHA-256', data);
        break;
      case 'SHA-384':
        hashBuffer = await crypto.subtle.digest('SHA-384', data);
        break;
      case 'SHA-512':
        hashBuffer = await crypto.subtle.digest('SHA-512', data);
        break;
    }

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }, []);

  function md5(string: string): string {
    function rotateLeft(x: number, n: number): number {
      return (x << n) | (x >>> (32 - n));
    }

    function addUnsigned(x: number, y: number): number {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    function F(x: number, y: number, z: number): number {
      return (x & y) | ((~x) & z);
    }

    function G(x: number, y: number, z: number): number {
      return (x & z) | (y & (~z));
    }

    function H(x: number, y: number, z: number): number {
      return x ^ y ^ z;
    }

    function I(x: number, y: number, z: number): number {
      return y ^ (x | (~z));
    }

    function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
      a = addUnsigned(addUnsigned(addUnsigned(a, F(b, c, d)), x), ac);
      return addUnsigned(rotateLeft(a, s), b);
    }

    function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
      a = addUnsigned(addUnsigned(addUnsigned(a, G(b, c, d)), x), ac);
      return addUnsigned(rotateLeft(a, s), b);
    }

    function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
      a = addUnsigned(addUnsigned(addUnsigned(a, H(b, c, d)), x), ac);
      return addUnsigned(rotateLeft(a, s), b);
    }

    function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
      a = addUnsigned(addUnsigned(addUnsigned(a, I(b, c, d)), x), ac);
      return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(string: string): number[] {
      const wordArray: number[] = [];
      for (let i = 0; i < string.length * 8; i += 8) {
        wordArray[i >> 5] |= (string.charCodeAt(i / 8) & 0xFF) << (i % 32);
      }
      return wordArray;
    }

    function utf8Encode(string: string): string {
      string = string.replace(/\r\n/g, '\n');
      let output = '';
      for (let n = 0; n < string.length; n++) {
        const c = string.charCodeAt(n);
        if (c < 128) {
          output += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          output += String.fromCharCode((c >> 6) | 192);
          output += String.fromCharCode((c & 63) | 128);
        } else {
          output += String.fromCharCode((c >> 12) | 224);
          output += String.fromCharCode(((c >> 6) & 63) | 128);
          output += String.fromCharCode((c & 63) | 128);
        }
      }
      return output;
    }

    function wordToHex(value: number): string {
      let hexTab = '0123456789abcdef';
      let str = '';
      let x;
      for (let i = 0; i <= 3; i++) {
        x = (value >> (i * 8 + 4)) & 0x0F;
        str += hexTab.charAt(x);
        x = (value >> (i * 8)) & 0x0F;
        str += hexTab.charAt(x);
      }
      return str;
    }

    let x: number[];
    let len: number;
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    string = utf8Encode(string);
    x = convertToWordArray(string);
    len = string.length * 8;
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    for (let k = 0; k < x.length; k += 16) {
      let AA = a, BB = b, CC = c, DD = d;

      a = FF(a, b, c, d, x[k + 0], 7, -680876936);
      d = FF(d, a, b, c, x[k + 1], 12, -389564586);
      c = FF(c, d, a, b, x[k + 2], 17, 606105819);
      b = FF(b, c, d, a, x[k + 3], 22, -1044525330);
      a = FF(a, b, c, d, x[k + 4], 7, -176418897);
      d = FF(d, a, b, c, x[k + 5], 12, 1200080426);
      c = FF(c, d, a, b, x[k + 6], 17, -1473231341);
      b = FF(b, c, d, a, x[k + 7], 22, -45705983);
      a = FF(a, b, c, d, x[k + 8], 7, 1770035416);
      d = FF(d, a, b, c, x[k + 9], 12, -1958414417);
      c = FF(c, d, a, b, x[k + 10], 17, -42063);
      b = FF(b, c, d, a, x[k + 11], 22, -1990404162);
      a = FF(a, b, c, d, x[k + 12], 7, 1804603682);
      d = FF(d, a, b, c, x[k + 13], 12, -40341101);
      c = FF(c, d, a, b, x[k + 14], 17, -1502002290);
      b = FF(b, c, d, a, x[k + 15], 22, 1236535329);

      a = GG(a, b, c, d, x[k + 1], 5, -165796510);
      d = GG(d, a, b, c, x[k + 6], 9, -1069501632);
      c = GG(c, d, a, b, x[k + 11], 14, 643717713);
      b = GG(b, c, d, a, x[k + 0], 20, -373897302);
      a = GG(a, b, c, d, x[k + 5], 5, -701558691);
      d = GG(d, a, b, c, x[k + 10], 9, 38016083);
      c = GG(c, d, a, b, x[k + 15], 14, -660478335);
      b = GG(b, c, d, a, x[k + 4], 20, -405537848);
      a = GG(a, b, c, d, x[k + 9], 5, 568446438);
      d = GG(d, a, b, c, x[k + 14], 9, -1019803690);
      c = GG(c, d, a, b, x[k + 3], 14, -187363961);
      b = GG(b, c, d, a, x[k + 8], 20, 1163531501);
      a = GG(a, b, c, d, x[k + 13], 5, -1444681467);
      d = GG(d, a, b, c, x[k + 2], 9, -51403784);
      c = GG(c, d, a, b, x[k + 7], 14, 1735328473);
      b = GG(b, c, d, a, x[k + 12], 20, -1926607734);

      a = HH(a, b, c, d, x[k + 5], 4, -378558);
      d = HH(d, a, b, c, x[k + 8], 11, -2022574463);
      c = HH(c, d, a, b, x[k + 11], 16, 1839030562);
      b = HH(b, c, d, a, x[k + 14], 23, -35309556);
      a = HH(a, b, c, d, x[k + 1], 4, -1530992060);
      d = HH(d, a, b, c, x[k + 4], 11, 1272893353);
      c = HH(c, d, a, b, x[k + 7], 16, -155497632);
      b = HH(b, c, d, a, x[k + 10], 23, -1094730640);
      a = HH(a, b, c, d, x[k + 13], 4, 681279174);
      d = HH(d, a, b, c, x[k + 0], 11, -358537222);
      c = HH(c, d, a, b, x[k + 3], 16, -722521979);
      b = HH(b, c, d, a, x[k + 6], 23, 76029189);
      a = HH(a, b, c, d, x[k + 9], 4, -640364487);
      d = HH(d, a, b, c, x[k + 12], 11, -421815835);
      c = HH(c, d, a, b, x[k + 15], 16, 530742520);
      b = HH(b, c, d, a, x[k + 2], 23, -995338651);

      a = II(a, b, c, d, x[k + 0], 6, -198630844);
      d = II(d, a, b, c, x[k + 7], 10, 1126891415);
      c = II(c, d, a, b, x[k + 14], 15, -1416354905);
      b = II(b, c, d, a, x[k + 5], 21, -57434055);
      a = II(a, b, c, d, x[k + 12], 6, 1700485571);
      d = II(d, a, b, c, x[k + 3], 10, -1894986606);
      c = II(c, d, a, b, x[k + 10], 15, -1051523);
      b = II(b, c, d, a, x[k + 1], 21, -2054922799);
      a = II(a, b, c, d, x[k + 8], 6, 1873313359);
      d = II(d, a, b, c, x[k + 15], 10, -30611744);
      c = II(c, d, a, b, x[k + 6], 15, -1560198380);
      b = II(b, c, d, a, x[k + 13], 21, 1309151649);
      a = II(a, b, c, d, x[k + 4], 6, -145523070);
      d = II(d, a, b, c, x[k + 11], 10, -1120210379);
      c = II(c, d, a, b, x[k + 2], 15, 718787259);
      b = II(b, c, d, a, x[k + 9], 21, -343485551);

      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }

    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }

  const generateSelectedHash = useCallback(async () => {
    const hash = await generateHash(input, algorithm);
    setResult(hash);
  }, [input, algorithm, generateHash]);

  const copyToClipboard = async (text: string) => {
    if (text) {
      await navigator.clipboard.writeText(text);
    }
  };

  const formatHash = (hash: string) => {
    if (!hash) return '';
    return uppercase ? hash.toUpperCase() : hash.toLowerCase();
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('hash.title')}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('hash.input')}</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('common.placeholderText')}
              className="w-full h-32 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none placeholder-[var(--color-text-muted)]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-[var(--color-text-secondary)] text-sm">{t('hash.algorithm')}:</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
                  className="px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm"
                >
                  <option value="MD5">MD5</option>
                  <option value="SHA-1">SHA-1</option>
                  <option value="SHA-256">SHA-256</option>
                  <option value="SHA-384">SHA-384</option>
                  <option value="SHA-512">SHA-512</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 rounded bg-[var(--color-bg-muted)] border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
                {t('hash.uppercase')}
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={generateSelectedHash}
                className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
              >
                {t('hash.generate')}
              </button>
              <button
                onClick={() => { setInput(''); setResult(''); }}
                className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm"
              >
                {t('common.clear')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('hash.result')}</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">{algorithm}</span>
            {result && (
              <button
                onClick={() => copyToClipboard(formatHash(result))}
                className="px-3 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded text-xs hover:bg-[var(--color-bg-elevated)] transition-colors"
              >
                {t('hash.copy')}
              </button>
            )}
          </div>
          <input
            type="text"
            readOnly
            value={formatHash(result)}
            placeholder={t('common.placeholderResult')}
            className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none placeholder-[var(--color-text-muted)]"
          />
        </div>
      </div>
    </div>
  );
}
