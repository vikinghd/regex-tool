import { useState } from 'react';
import { useI18n } from '../../i18n';

type ColorFormat = 'hex' | 'rgb' | 'hsl';

interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export function ColorTool() {
  const [inputFormat, setInputFormat] = useState<ColorFormat>('hex');
  const [outputFormat, setOutputFormat] = useState<ColorFormat>('rgb');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [currentColor, setCurrentColor] = useState<Color | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useI18n();

  function parseHex(hex: string): Color | null {
    hex = hex.replace('#', '').trim();
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
      };
    }
    if (hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: parseInt(hex.slice(6, 8), 16) / 255
      };
    }
    return null;
  }

  function parseRgb(rgb: string): Color | null {
    const match = rgb.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/i);
    if (match) {
      const r = Math.max(0, Math.min(255, parseInt(match[1])));
      const g = Math.max(0, Math.min(255, parseInt(match[2])));
      const b = Math.max(0, Math.min(255, parseInt(match[3])));
      const a = match[4] ? Math.max(0, Math.min(1, parseFloat(match[4]))) : undefined;
      return { r, g, b, a };
    }
    return null;
  }

  function parseHsl(hsl: string): Color | null {
    const match = hsl.match(/hsla?\s*\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+))?\s*\)/i);
    if (match) {
      const h = parseInt(match[1]) % 360;
      const s = Math.max(0, Math.min(100, parseFloat(match[2]))) / 100;
      const l = Math.max(0, Math.min(100, parseFloat(match[3]))) / 100;
      const a = match[4] ? Math.max(0, Math.min(1, parseFloat(match[4]))) : undefined;
      return { ...hslToRgb(h, s, l), a };
    }
    return null;
  }

  function hslToRgb(h: number, s: number, l: number): Color {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  function rgbToHsl(color: Color): { h: number; s: number; l: number } {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function colorToHex(color: Color): string {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
    if (color.a !== undefined && color.a < 1) {
      return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${toHex(color.a * 255)}`;
    }
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
  }

  function colorToRgb(color: Color): string {
    if (color.a !== undefined && color.a < 1) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  }

  function colorToHsl(color: Color): string {
    const { h, s, l } = rgbToHsl(color);
    if (color.a !== undefined && color.a < 1) {
      return `hsla(${h}, ${s}%, ${l}%, ${color.a})`;
    }
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  function parseColor(value: string, format: ColorFormat): Color | null {
    switch (format) {
      case 'hex': return parseHex(value);
      case 'rgb': return parseRgb(value);
      case 'hsl': return parseHsl(value);
      default: return null;
    }
  }

  function convertColor(color: Color, format: ColorFormat): string {
    switch (format) {
      case 'hex': return colorToHex(color);
      case 'rgb': return colorToRgb(color);
      case 'hsl': return colorToHsl(color);
      default: return '';
    }
  }

  function handleInputChange(value: string) {
    setInputValue(value);
    setError(null);

    if (!value.trim()) {
      setCurrentColor(null);
      setOutputValue('');
      return;
    }

    const color = parseColor(value, inputFormat);
    if (color) {
      setCurrentColor(color);
      setOutputValue(convertColor(color, outputFormat));
    } else {
      setCurrentColor(null);
      setOutputValue('');
      setError(t('color.invalid'));
    }
  }

  function swapFormats() {
    const newInputFormat = outputFormat;
    const newOutputFormat = inputFormat;
    const newValue = outputValue;

    setInputFormat(newInputFormat);
    setOutputFormat(newOutputFormat);
    setInputValue(newValue);
    setCurrentColor(currentColor);
    setOutputValue(inputValue);
  }

  function generateRandom() {
    const color: Color = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };

    setCurrentColor(color);
    setInputValue(convertColor(color, inputFormat));
    setOutputValue(convertColor(color, outputFormat));
    setError(null);
  }

  function clear() {
    setInputValue('');
    setOutputValue('');
    setCurrentColor(null);
    setError(null);
  }

  function copyToClipboard(value: string) {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  }

  const previewColor = currentColor
    ? `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${currentColor.a ?? 1})`
    : '#e2e8f0';

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">{t('color.title')}</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('color.inputFormat')}</label>
            <select
              value={inputFormat}
              onChange={(e) => {
                setInputFormat(e.target.value as ColorFormat);
                if (currentColor) {
                  setInputValue(convertColor(currentColor, e.target.value as ColorFormat));
                }
              }}
              className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              <option value="hex">{t('color.hex')}</option>
              <option value="rgb">{t('color.rgb')}</option>
              <option value="hsl">{t('color.hsl')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[var(--color-text-secondary)] mb-2">{t('color.outputFormat')}</label>
            <select
              value={outputFormat}
              onChange={(e) => {
                setOutputFormat(e.target.value as ColorFormat);
                if (currentColor) {
                  setOutputValue(convertColor(currentColor, e.target.value as ColorFormat));
                }
              }}
              className="w-full px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg text-sm"
            >
              <option value="hex">{t('color.hex')}</option>
              <option value="rgb">{t('color.rgb')}</option>
              <option value="hsl">{t('color.hsl')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={inputFormat === 'hex' ? t('color.hexPlaceholder') : inputFormat === 'rgb' ? t('color.rgbPlaceholder') : t('color.hslPlaceholder')}
                className="flex-1 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-text-muted)]"
              />
              <button
                onClick={() => copyToClipboard(inputValue)}
                disabled={!inputValue}
                className="px-3 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm disabled:opacity-50"
              >
                {t('color.copy')}
              </button>
            </div>
            {error && (
              <p className="text-[var(--color-error)] text-sm">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={outputValue}
                placeholder={outputFormat === 'hex' ? t('color.hexPlaceholder') : outputFormat === 'rgb' ? t('color.rgbPlaceholder') : t('color.hslPlaceholder')}
                className="flex-1 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none placeholder-[var(--color-text-muted)]"
              />
              <button
                onClick={() => copyToClipboard(outputValue)}
                disabled={!outputValue}
                className="px-3 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm disabled:opacity-50"
              >
                {t('color.copy')}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={swapFormats}
            className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm"
          >
            {t('color.swap')}
          </button>
          <button
            onClick={generateRandom}
            className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
          >
            {t('color.random')}
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm"
          >
            {t('color.clear')}
          </button>
        </div>
      </div>

      {(currentColor || inputValue) && (
        <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">{t('color.preview')}</h3>
          <div
            className="w-full h-32 rounded-lg border border-[var(--color-border)] transition-colors"
            style={{ backgroundColor: previewColor }}
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('color.hex')}</p>
              <p className="text-sm font-mono text-[var(--color-text-primary)]">{colorToHex(currentColor || { r: 0, g: 0, b: 0 })}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('color.rgb')}</p>
              <p className="text-sm font-mono text-[var(--color-text-primary)]">{colorToRgb(currentColor || { r: 0, g: 0, b: 0 })}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[var(--color-text-muted)] mb-1">{t('color.hsl')}</p>
              <p className="text-sm font-mono text-[var(--color-text-primary)]">{colorToHsl(currentColor || { r: 0, g: 0, b: 0 })}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
