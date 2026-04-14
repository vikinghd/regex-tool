import { useState } from 'react';
import { useI18n } from '../../i18n';

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = '0O1lI';

type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export function PasswordTool() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const { t } = useI18n();

  function getCharacterPool(): string {
    let pool = '';
    if (includeUppercase) pool += UPPERCASE_CHARS;
    if (includeLowercase) pool += LOWERCASE_CHARS;
    if (includeNumbers) pool += NUMBER_CHARS;
    if (includeSymbols) pool += SYMBOL_CHARS;

    if (excludeSimilar) {
      pool = pool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }

    return pool;
  }

  function getRandomChar(pool: string): string {
    if (crypto?.getRandomValues) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      return pool[array[0] % pool.length];
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function generatePassword() {
    const pool = getCharacterPool();
    if (pool.length === 0) {
      setPassword('');
      return;
    }

    let result = '';
    const guaranteedChars: string[] = [];

    if (includeUppercase) {
      let upperPool = UPPERCASE_CHARS;
      if (excludeSimilar) upperPool = upperPool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
      if (upperPool.length > 0) guaranteedChars.push(getRandomChar(upperPool));
    }
    if (includeLowercase) {
      let lowerPool = LOWERCASE_CHARS;
      if (excludeSimilar) lowerPool = lowerPool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
      if (lowerPool.length > 0) guaranteedChars.push(getRandomChar(lowerPool));
    }
    if (includeNumbers) {
      let numPool = NUMBER_CHARS;
      if (excludeSimilar) numPool = numPool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
      if (numPool.length > 0) guaranteedChars.push(getRandomChar(numPool));
    }
    if (includeSymbols) {
      if (SYMBOL_CHARS.length > 0) guaranteedChars.push(getRandomChar(SYMBOL_CHARS));
    }

    const remainingLength = Math.max(0, length - guaranteedChars.length);
    for (let i = 0; i < remainingLength; i++) {
      result += getRandomChar(pool);
    }

    const allChars = [...guaranteedChars, ...result];
    for (let i = allChars.length - 1; i > 0; i--) {
      const j = crypto?.getRandomValues ?
        (new Uint32Array(1), crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1)) :
        Math.floor(Math.random() * (i + 1));
      [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
    }

    setPassword(allChars.join(''));
  }

  function calculateStrength(): PasswordStrength {
    let score = 0;

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;

    return Math.min(4, Math.floor(score / 2)) as PasswordStrength;
  }

  function getStrengthLabel(strength: PasswordStrength): string {
    const labels: Record<PasswordStrength, string> = {
      0: t('password.weak'),
      1: t('password.fair'),
      2: t('password.good'),
      3: t('password.strong'),
      4: t('password.excellent'),
    };
    return labels[strength];
  }

  function getStrengthColor(strength: PasswordStrength): string {
    const colors: Record<PasswordStrength, string> = {
      0: 'bg-red-500',
      1: 'bg-orange-500',
      2: 'bg-yellow-500',
      3: 'bg-lime-500',
      4: 'bg-emerald-500',
    };
    return colors[strength];
  }

  function copyToClipboard() {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  }

  const strength = calculateStrength();
  const hasSelection = includeUppercase || includeLowercase || includeNumbers || includeSymbols;

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-200 mb-4">{t('password.title')}</h2>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {t('password.length')}: {length}
              </label>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>4</span>
                <span>64</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">{t('password.strength')}:</span>
                <div className="flex-1">
                  <div className="flex gap-1 h-3 mb-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-colors ${
                          i <= strength ? getStrengthColor(strength) : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-medium ${
                    strength <= 1 ? 'text-red-400' :
                    strength === 2 ? 'text-yellow-400' :
                    'text-emerald-400'
                  }`}>
                    {getStrengthLabel(strength)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                disabled={!includeLowercase && !includeNumbers && !includeSymbols}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500 disabled:opacity-50"
              />
              {t('password.includeUppercase')} (ABC)
            </label>

            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                disabled={!includeUppercase && !includeNumbers && !includeSymbols}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500 disabled:opacity-50"
              />
              {t('password.includeLowercase')} (abc)
            </label>

            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                disabled={!includeUppercase && !includeLowercase && !includeSymbols}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500 disabled:opacity-50"
              />
              {t('password.includeNumbers')} (123)
            </label>

            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                disabled={!includeUppercase && !includeLowercase && !includeNumbers}
                className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500 disabled:opacity-50"
              />
              {t('password.includeSymbols')} (!@#)
            </label>
          </div>

          <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-slate-600 text-amber-500 focus:ring-amber-500"
            />
            {t('password.excludeSimilar')} (0, O, 1, l, I)
          </label>

          <div className="flex gap-2">
            <button
              onClick={generatePassword}
              disabled={!hasSelection}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('password.generate')}
            </button>
          </div>
        </div>
      </div>

      {password && (
        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-slate-400">{t('password.result')}</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-slate-700 text-slate-200 rounded text-xs hover:bg-slate-600 transition-colors"
            >
              {t('password.copy')}
            </button>
          </div>
          <input
            type="text"
            readOnly
            value={password}
            className="w-full px-4 py-3 bg-slate-900 text-slate-200 border border-slate-600 rounded-lg font-mono text-lg text-center tracking-wider focus:outline-none placeholder-slate-500"
          />
        </div>
      )}
    </div>
  );
}
