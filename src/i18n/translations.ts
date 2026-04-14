export type TranslationKey =
  | 'app.title'
  | 'app.description'
  | 'app.version'
  | 'tools.regex.name'
  | 'tools.regex.description'
  | 'tools.json.name'
  | 'tools.json.description'
  | 'tools.base64.name'
  | 'tools.base64.description'
  | 'tools.timestamp.name'
  | 'tools.timestamp.description'
  | 'tools.url.name'
  | 'tools.url.description'
  | 'tools.color.name'
  | 'tools.color.description'
  | 'tools.regexGen.name'
  | 'tools.regexGen.description'
  | 'tools.hash.name'
  | 'tools.hash.description'
  | 'tools.uuid.name'
  | 'tools.uuid.description'
  | 'tools.markdown.name'
  | 'tools.markdown.description'
  | 'category.text'
  | 'category.data'
  | 'category.color'
  | 'category.web'
  | 'category.other'
  | 'common.comingSoon'
  | 'common.copy'
  | 'common.clear'
  | 'common.encode'
  | 'common.decode'
  | 'common.now'
  | 'common.output'
  | 'common.input'
  | 'common.placeholderRegex'
  | 'common.placeholderText'
  | 'common.placeholderJson'
  | 'common.placeholderUrlEncode'
  | 'common.placeholderUrlDecode'
  | 'common.placeholderResult'
  | 'common.flags'
  | 'common.error'
  | 'common.valid'
  | 'common.matches'
  | 'common.match'
  | 'common.highlight'
  | 'common.details'
  | 'common.position'
  | 'common.groups'
  | 'common.examples'
  | 'common.flagRef'
  | 'common.format'
  | 'common.minify'
  | 'common.indent'
  | 'common.indent2'
  | 'common.indent4'
  | 'common.indent8'
  | 'common.swap'
  | 'common.utc'
  | 'common.localDate'
  | 'common.localTime'
  | 'common.localFull'
  | 'common.encoded'
  | 'common.decoded'
  | 'common.urlEncodeNote'
  | 'common.urlReserved'
  | 'common.urlSpace'
  | 'common.urlChinese'
  | 'regex.title'
  | 'regex.testText'
  | 'regex.matchResults'
  | 'regex.invalidRegex'
  | 'json.input'
  | 'json.outputPlaceholder'
  | 'json.invalidJson'
  | 'base64.inputText'
  | 'base64.inputBase64'
  | 'base64.placeholderEncode'
  | 'base64.placeholderDecode'
  | 'base64.resultEncode'
  | 'base64.resultDecode'
  | 'base64.encodeError'
  | 'base64.decodeError'
  | 'timestamp.title'
  | 'timestamp.unixLabel'
  | 'timestamp.datetimeLabel'
  | 'timestamp.formats'
  | 'timestamp.iso'
  | 'url.inputText'
  | 'url.inputUrlEncoded'
  | 'url.encodeError'
  | 'url.decodeError'
  | 'url.note1'
  | 'url.note2'
  | 'url.note3'
  | 'url.note4'
  | 'flag.g'
  | 'flag.i'
  | 'flag.m'
  | 'flag.s'
  | 'flag.u'
  | 'flag.y'
  | 'hash.title'
  | 'hash.input'
  | 'hash.algorithm'
  | 'hash.generate'
  | 'hash.uppercase'
  | 'hash.result'
  | 'hash.copy'
  | 'markdown.title'
  | 'markdown.input'
  | 'markdown.preview'
  | 'markdown.clear'
  | 'markdown.sample'
  | 'uuid.title'
  | 'uuid.version'
  | 'uuid.generate'
  | 'uuid.generateMultiple'
  | 'uuid.count'
  | 'uuid.uppercase'
  | 'uuid.hyphens'
  | 'uuid.result'
  | 'uuid.copy'
  | 'uuid.copyAll'
  | 'uuid.clear'
  | 'password.title'
  | 'password.length'
  | 'password.includeUppercase'
  | 'password.includeLowercase'
  | 'password.includeNumbers'
  | 'password.includeSymbols'
  | 'password.excludeSimilar'
  | 'password.generate'
  | 'password.result'
  | 'password.copy'
  | 'password.strength'
  | 'password.weak'
  | 'password.fair'
  | 'password.good'
  | 'password.strong'
  | 'password.excellent'
  | 'color.title'
  | 'color.inputFormat'
  | 'color.outputFormat'
  | 'color.preview'
  | 'color.copy'
  | 'color.swap'
  | 'color.random'
  | 'color.clear'
  | 'color.hex'
  | 'color.rgb'
  | 'color.hsl'
  | 'color.hexPlaceholder'
  | 'color.rgbPlaceholder'
  | 'color.hslPlaceholder'
  | 'color.invalid'
  | 'regexGen.title'
  | 'regexGen.description'
  | 'regexGen.inputPlaceholder'
  | 'regexGen.example'
  | 'regexGen.generate'
  | 'regexGen.result'
  | 'regexGen.copy'
  | 'regexGen.test'
  | 'regexGen.apiUrl'
  | 'regexGen.apiKey'
  | 'regexGen.save'
  | 'regexGen.loading'
  | 'regexGen.error'
  | 'regexGen.example1'
  | 'regexGen.example2'
  | 'regexGen.example3'
  | 'regexGen.example4';

export interface Translations {
  [key: string]: string;
}

export const zhCN: Translations = {
  'app.title': 'DevTools Box - 开发者在线工具箱',
  'app.description': '免费在线开发者工具箱',
  'app.version': '版本',
  'tools.regex.name': '正则表达式测试',
  'tools.regex.description': '实时测试正则表达式',
  'tools.json.name': 'JSON 格式化',
  'tools.json.description': '格式化、压缩 JSON',
  'tools.base64.name': 'Base64 编解码',
  'tools.base64.description': 'Base64 编码和解码',
  'tools.timestamp.name': '时间戳转换',
  'tools.timestamp.description': 'Unix 时间戳转换',
  'tools.url.name': 'URL 编解码',
  'tools.url.description': 'URL 编码和解码',
  'tools.color.name': '颜色转换',
  'tools.color.description': 'HEX/RGB/HSL 转换',
  'tools.regexGen.name': '正则表达式生成器',
  'tools.regexGen.description': 'AI 生成正则表达式',
  'tools.hash.name': '哈希生成',
  'tools.hash.description': 'MD5/SHA1/SHA256',
  'tools.uuid.name': 'UUID 生成器',
  'tools.uuid.description': '生成 UUID v4',
  'tools.markdown.name': 'Markdown 预览',
  'tools.markdown.description': '实时预览 Markdown',
  'category.text': '文本处理',
  'category.data': '数据转换',
  'category.color': '颜色工具',
  'category.web': 'Web开发',
  'category.other': '其他工具',
  'common.comingSoon': '即将上线',
  'common.copy': '复制',
  'common.clear': '清空',
  'common.encode': '编码',
  'common.decode': '解码',
  'common.now': '当前时间',
  'common.output': '输出',
  'common.input': '输入文本',
  'common.placeholderRegex': '输入正则表达式...',
  'common.placeholderText': '在此输入要测试的文本...',
  'common.placeholderJson': '{"name": "test", "value": 123}',
  'common.placeholderUrlEncode': '输入要编码的文本...',
  'common.placeholderUrlDecode': '输入要解码的 URL 编码...',
  'common.placeholderResult': '结果将显示在这里...',
  'common.flags': '修饰符',
  'common.error': '错误',
  'common.valid': '正则表达式有效',
  'common.matches': '个匹配',
  'common.match': '匹配',
  'common.highlight': '高亮显示',
  'common.details': '详细信息',
  'common.position': '位置',
  'common.groups': '分组',
  'common.examples': '常用正则',
  'common.flagRef': '修饰符说明',
  'common.format': '格式化',
  'common.minify': '压缩',
  'common.indent': '缩进',
  'common.indent2': '2 空格',
  'common.indent4': '4 空格',
  'common.indent8': '8 空格',
  'common.swap': '互换',
  'common.utc': 'UTC 时间',
  'common.localDate': '本地日期',
  'common.localTime': '本地时间',
  'common.localFull': '本地完整',
  'common.encoded': 'URL 编码结果',
  'common.decoded': '解码结果',
  'common.urlEncodeNote': 'URL 编码说明',
  'common.urlReserved': '保留字符',
  'common.urlSpace': '空格会被编码为',
  'common.urlChinese': '中文会被编码为多个',
  'regex.title': '正则表达式',
  'regex.testText': '测试文本',
  'regex.matchResults': '匹配结果',
  'regex.invalidRegex': '无效的正则表达式',
  'json.input': 'JSON 输入',
  'json.outputPlaceholder': '格式化后的 JSON 将显示在这里...',
  'json.invalidJson': '无效的 JSON',
  'base64.inputText': '输入文本',
  'base64.inputBase64': '输入 Base64',
  'base64.placeholderEncode': '输入要编码的文本...',
  'base64.placeholderDecode': '输入要解码的 Base64...',
  'base64.resultEncode': 'Base64 结果',
  'base64.resultDecode': '解码结果',
  'base64.encodeError': '编码失败',
  'base64.decodeError': '无效的 Base64 字符串',
  'timestamp.title': '时间戳转换',
  'timestamp.unixLabel': 'Unix 时间戳（秒）',
  'timestamp.datetimeLabel': '日期时间',
  'timestamp.formats': '时间格式',
  'timestamp.iso': 'ISO 8601',
  'url.inputText': '输入文本',
  'url.inputUrlEncoded': '输入 URL 编码',
  'url.encodeError': '编码失败',
  'url.decodeError': '无效的 URL 编码字符串',
  'url.note1': 'URL 编码会将特殊字符转换为',
  'url.note2': '保留字符：A-Z、a-z、0-9、- _ . ~',
  'url.note3': '空格会被编码为',
  'url.note4': '中文会被编码为多个',
  'flag.g': '全局匹配',
  'flag.i': '忽略大小写',
  'flag.m': '多行匹配',
  'flag.s': '. 匹配换行符',
  'flag.u': 'Unicode 模式',
  'flag.y': '粘性匹配',
  'hash.title': '哈希生成',
  'hash.input': '输入文本',
  'hash.algorithm': '算法',
  'hash.generate': '生成',
  'hash.uppercase': '大写',
  'hash.result': '结果',
  'hash.copy': '复制',
  'markdown.title': 'Markdown 预览',
  'markdown.input': 'Markdown 输入',
  'markdown.preview': '预览',
  'markdown.clear': '清空',
  'markdown.sample': '示例',
  'uuid.title': 'UUID 生成器',
  'uuid.version': '版本',
  'uuid.generate': '生成',
  'uuid.generateMultiple': '批量生成',
  'uuid.count': '数量',
  'uuid.uppercase': '大写',
  'uuid.hyphens': '含连字符',
  'uuid.result': '结果',
  'uuid.copy': '复制',
  'uuid.copyAll': '复制全部',
  'uuid.clear': '清空',
  'password.title': '密码生成器',
  'password.length': '长度',
  'password.includeUppercase': '大写字母',
  'password.includeLowercase': '小写字母',
  'password.includeNumbers': '数字',
  'password.includeSymbols': '特殊符号',
  'password.excludeSimilar': '排除相似字符',
  'password.generate': '生成密码',
  'password.result': '生成的密码',
  'password.copy': '复制',
  'password.strength': '密码强度',
  'password.weak': '弱',
  'password.fair': '一般',
  'password.good': '良好',
  'password.strong': '强',
  'password.excellent': '非常强',
  'color.title': '颜色转换',
  'color.inputFormat': '输入格式',
  'color.outputFormat': '输出格式',
  'color.preview': '预览',
  'color.copy': '复制',
  'color.swap': '互换',
  'color.random': '随机',
  'color.clear': '清空',
  'color.hex': 'HEX',
  'color.rgb': 'RGB',
  'color.hsl': 'HSL',
  'color.hexPlaceholder': '#000000',
  'color.rgbPlaceholder': 'rgb(0, 0, 0)',
  'color.hslPlaceholder': 'hsl(0, 0%, 0%)',
  'color.invalid': '无效的颜色格式',
  'regexGen.title': '正则表达式生成器',
  'regexGen.description': '用自然语言描述，AI 帮你生成正则',
  'regexGen.inputPlaceholder': '描述你想要匹配的内容...',
  'regexGen.example': '示例',
  'regexGen.generate': '生成正则',
  'regexGen.result': '生成的正则',
  'regexGen.copy': '复制',
  'regexGen.test': '测试',
  'regexGen.apiUrl': 'API 地址',
  'regexGen.apiKey': 'API Key',
  'regexGen.save': '保存配置',
  'regexGen.loading': '生成中...',
  'regexGen.error': '生成失败',
  'regexGen.example1': '匹配邮箱地址',
  'regexGen.example2': '匹配手机号（中国）',
  'regexGen.example3': '匹配 URL',
  'regexGen.example4': '匹配日期格式 YYYY-MM-DD'
};

export const enUS: Translations = {
  'app.title': 'DevTools Box - Online Developer Tools',
  'app.description': 'Free online developer tools',
  'app.version': 'Version',
  'tools.regex.name': 'Regex Tester',
  'tools.regex.description': 'Test regular expressions in real-time',
  'tools.json.name': 'JSON Formatter',
  'tools.json.description': 'Format and minify JSON',
  'tools.base64.name': 'Base64 Encode/Decode',
  'tools.base64.description': 'Base64 encoding and decoding',
  'tools.timestamp.name': 'Timestamp Converter',
  'tools.timestamp.description': 'Unix timestamp converter',
  'tools.url.name': 'URL Encode/Decode',
  'tools.url.description': 'URL encoding and decoding',
  'tools.color.name': 'Color Converter',
  'tools.color.description': 'HEX/RGB/HSL converter',
  'tools.regexGen.name': 'Regex Generator',
  'tools.regexGen.description': 'AI-powered regex generator',
  'tools.hash.name': 'Hash Generator',
  'tools.hash.description': 'MD5/SHA1/SHA256',
  'tools.uuid.name': 'UUID Generator',
  'tools.uuid.description': 'Generate UUID v4',
  'tools.markdown.name': 'Markdown Preview',
  'tools.markdown.description': 'Real-time Markdown preview',
  'category.text': 'Text Processing',
  'category.data': 'Data Conversion',
  'category.color': 'Color Tools',
  'category.web': 'Web Development',
  'category.other': 'Other Tools',
  'common.comingSoon': 'Coming Soon',
  'common.copy': 'Copy',
  'common.clear': 'Clear',
  'common.encode': 'Encode',
  'common.decode': 'Decode',
  'common.now': 'Now',
  'common.output': 'Output',
  'common.input': 'Input',
  'common.placeholderRegex': 'Enter regex pattern...',
  'common.placeholderText': 'Enter text to test...',
  'common.placeholderJson': '{"name": "test", "value": 123}',
  'common.placeholderUrlEncode': 'Enter text to encode...',
  'common.placeholderUrlDecode': 'Enter URL encoded text...',
  'common.placeholderResult': 'Result will appear here...',
  'common.flags': 'Flags',
  'common.error': 'Error',
  'common.valid': 'Valid regex',
  'common.matches': 'matches',
  'common.match': 'Match',
  'common.highlight': 'Highlight',
  'common.details': 'Details',
  'common.position': 'Position',
  'common.groups': 'Groups',
  'common.examples': 'Common Patterns',
  'common.flagRef': 'Flag Reference',
  'common.format': 'Format',
  'common.minify': 'Minify',
  'common.indent': 'Indent',
  'common.indent2': '2 spaces',
  'common.indent4': '4 spaces',
  'common.indent8': '8 spaces',
  'common.swap': 'Swap',
  'common.utc': 'UTC Time',
  'common.localDate': 'Local Date',
  'common.localTime': 'Local Time',
  'common.localFull': 'Local Full',
  'common.encoded': 'URL Encoded',
  'common.decoded': 'Decoded Result',
  'common.urlEncodeNote': 'URL Encoding Notes',
  'common.urlReserved': 'Reserved characters',
  'common.urlSpace': 'Spaces are encoded as',
  'common.urlChinese': 'Chinese characters become multiple',
  'regex.title': 'Regular Expression',
  'regex.testText': 'Test Text',
  'regex.matchResults': 'Match Results',
  'regex.invalidRegex': 'Invalid regular expression',
  'json.input': 'JSON Input',
  'json.outputPlaceholder': 'Formatted JSON will appear here...',
  'json.invalidJson': 'Invalid JSON',
  'base64.inputText': 'Input Text',
  'base64.inputBase64': 'Input Base64',
  'base64.placeholderEncode': 'Enter text to encode...',
  'base64.placeholderDecode': 'Enter Base64 to decode...',
  'base64.resultEncode': 'Base64 Result',
  'base64.resultDecode': 'Decoded Result',
  'base64.encodeError': 'Encoding failed',
  'base64.decodeError': 'Invalid Base64 string',
  'timestamp.title': 'Timestamp Converter',
  'timestamp.unixLabel': 'Unix Timestamp (seconds)',
  'timestamp.datetimeLabel': 'Date Time',
  'timestamp.formats': 'Time Formats',
  'timestamp.iso': 'ISO 8601',
  'url.inputText': 'Input Text',
  'url.inputUrlEncoded': 'Input URL Encoded',
  'url.encodeError': 'Encoding failed',
  'url.decodeError': 'Invalid URL encoded string',
  'url.note1': 'URL encoding converts special characters to',
  'url.note2': 'Reserved characters: A-Z, a-z, 0-9, - _ . ~',
  'url.note3': 'Spaces are encoded as',
  'url.note4': 'Chinese characters become multiple',
  'flag.g': 'Global match',
  'flag.i': 'Case-insensitive',
  'flag.m': 'Multiline',
  'flag.s': '. matches newline',
  'flag.u': 'Unicode mode',
  'flag.y': 'Sticky mode',
  'hash.title': 'Hash Generator',
  'hash.input': 'Input Text',
  'hash.algorithm': 'Algorithm',
  'hash.generate': 'Generate',
  'hash.uppercase': 'Uppercase',
  'hash.result': 'Result',
  'hash.copy': 'Copy',
  'markdown.title': 'Markdown Preview',
  'markdown.input': 'Markdown Input',
  'markdown.preview': 'Preview',
  'markdown.clear': 'Clear',
  'markdown.sample': 'Sample',
  'uuid.title': 'UUID Generator',
  'uuid.version': 'Version',
  'uuid.generate': 'Generate',
  'uuid.generateMultiple': 'Generate Multiple',
  'uuid.count': 'Count',
  'uuid.uppercase': 'Uppercase',
  'uuid.hyphens': 'With Hyphens',
  'uuid.result': 'Result',
  'uuid.copy': 'Copy',
  'uuid.copyAll': 'Copy All',
  'uuid.clear': 'Clear',
  'password.title': 'Password Generator',
  'password.length': 'Length',
  'password.includeUppercase': 'Uppercase Letters',
  'password.includeLowercase': 'Lowercase Letters',
  'password.includeNumbers': 'Numbers',
  'password.includeSymbols': 'Symbols',
  'password.excludeSimilar': 'Exclude Similar Characters',
  'password.generate': 'Generate Password',
  'password.result': 'Generated Password',
  'password.copy': 'Copy',
  'password.strength': 'Password Strength',
  'password.weak': 'Weak',
  'password.fair': 'Fair',
  'password.good': 'Good',
  'password.strong': 'Strong',
  'password.excellent': 'Excellent',
  'color.title': 'Color Converter',
  'color.inputFormat': 'Input Format',
  'color.outputFormat': 'Output Format',
  'color.preview': 'Preview',
  'color.copy': 'Copy',
  'color.swap': 'Swap',
  'color.random': 'Random',
  'color.clear': 'Clear',
  'color.hex': 'HEX',
  'color.rgb': 'RGB',
  'color.hsl': 'HSL',
  'color.hexPlaceholder': '#000000',
  'color.rgbPlaceholder': 'rgb(0, 0, 0)',
  'color.hslPlaceholder': 'hsl(0, 0%, 0%)',
  'color.invalid': 'Invalid color format',
  'regexGen.title': 'Regex Generator',
  'regexGen.description': 'Describe in natural language, AI generates regex for you',
  'regexGen.inputPlaceholder': 'Describe what you want to match...',
  'regexGen.example': 'Examples',
  'regexGen.generate': 'Generate Regex',
  'regexGen.result': 'Generated Regex',
  'regexGen.copy': 'Copy',
  'regexGen.test': 'Test',
  'regexGen.apiUrl': 'API URL',
  'regexGen.apiKey': 'API Key',
  'regexGen.save': 'Save Config',
  'regexGen.loading': 'Generating...',
  'regexGen.error': 'Generation failed',
  'regexGen.example1': 'Match email addresses',
  'regexGen.example2': 'Match phone numbers (China)',
  'regexGen.example3': 'Match URLs',
  'regexGen.example4': 'Match date format YYYY-MM-DD'
};
