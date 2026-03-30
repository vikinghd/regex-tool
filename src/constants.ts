import { RegexExample } from './types';

export const REGEX_EXAMPLES: RegexExample[] = [
  {
    name: '邮箱验证',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    flags: '',
    description: '验证标准邮箱格式',
    testText: 'contact@example.com, user.name+tag@domain.co.uk'
  },
  {
    name: '手机号（中国）',
    pattern: '^1[3-9]\\d{9}$',
    flags: '',
    description: '验证中国大陆手机号',
    testText: '13812345678, 15987654321'
  },
  {
    name: 'URL链接',
    pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)',
    flags: 'gi',
    description: '匹配HTTP/HTTPS URL',
    testText: '访问 https://www.example.com 或 http://test.org/path?query=123'
  },
  {
    name: 'IP地址（IPv4）',
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    flags: '',
    description: '验证IPv4地址',
    testText: '192.168.1.1, 10.0.0.1, 255.255.255.0'
  },
  {
    name: '身份证号（中国）',
    pattern: '^[1-9]\\d{5}(?:18|19|20)\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]$',
    flags: '',
    description: '验证18位中国身份证号',
    testText: '110101199001011234'
  },
  {
    name: '日期（YYYY-MM-DD）',
    pattern: '^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$',
    flags: '',
    description: '匹配年-月-日格式',
    testText: '2024-01-15, 2024-12-31'
  },
  {
    name: '时间（HH:MM:SS）',
    pattern: '^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$',
    flags: '',
    description: '匹配24小时制时间',
    testText: '14:30:00, 09:05:30'
  },
  {
    name: '十六进制颜色',
    pattern: '#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})',
    flags: 'gi',
    description: '匹配3位或6位十六进制颜色码',
    testText: '#ff0000, #FFF, 00ff00'
  },
  {
    name: '中文字符',
    pattern: '[\\u4e00-\\u9fa5]+',
    flags: 'g',
    description: '匹配中文字符',
    testText: '这是中文，This is English'
  },
  {
    name: '空白行',
    pattern: '^\\s*$',
    flags: 'gm',
    description: '匹配空白行',
    testText: 'line1\n\nline3\n  \nline5'
  },
  {
    name: 'HTML标签',
    pattern: '<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)',
    flags: 'gi',
    description: '匹配HTML标签',
    testText: '<div class="test">内容</div><br/><img src="pic.jpg"/>'
  },
  {
    name: '数字（整数/小数）',
    pattern: '-?\\d+(?:\\.\\d+)?',
    flags: 'g',
    description: '匹配整数和小数',
    testText: '123, -45, 3.14, -0.5, 1000'
  }
];
