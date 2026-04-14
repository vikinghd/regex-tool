import { Search, FileJson, ArrowLeftRight, Palette, Clock, Globe, Code, Type, Hash, Key, Sparkles } from 'lucide-react';
import { ToolMeta, ToolCategory } from '../types/tool';
import { RegexTool } from '../tools/RegexTool';
import { JsonFormatter } from '../tools/JsonFormatter';
import { Base64Tool } from '../tools/Base64Tool';
import { TimestampTool } from '../tools/TimestampTool';
import { UrlTool } from '../tools/UrlTool';
import { HashTool } from '../tools/HashTool';
import { MarkdownTool } from '../tools/MarkdownTool';
import { UuidTool } from '../tools/UuidTool';
import { PasswordTool } from '../tools/PasswordTool';
import { ColorTool } from '../tools/ColorTool';
import { RegexGenTool } from '../tools/RegexGenTool';

export const TOOLS: ToolMeta[] = [
  {
    id: 'regex',
    name: '正则表达式测试',
    category: ToolCategory.TEXT,
    description: '实时测试正则表达式',
    icon: <Search size={20} />,
    component: RegexTool,
    defaultPath: '/regex-tester'
  },
  {
    id: 'json',
    name: 'JSON 格式化',
    category: ToolCategory.TEXT,
    description: '格式化、压缩 JSON',
    icon: <FileJson size={20} />,
    component: JsonFormatter,
    defaultPath: '/json-formatter'
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    category: ToolCategory.DATA,
    description: 'Base64 编码和解码',
    icon: <ArrowLeftRight size={20} />,
    component: Base64Tool,
    defaultPath: '/base64-encoder-decoder'
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    category: ToolCategory.DATA,
    description: 'Unix 时间戳转换',
    icon: <Clock size={20} />,
    component: TimestampTool,
    defaultPath: '/timestamp-converter'
  },
  {
    id: 'url',
    name: 'URL 编解码',
    category: ToolCategory.WEB,
    description: 'URL 编码和解码',
    icon: <Globe size={20} />,
    component: UrlTool,
    defaultPath: '/url-encoder-decoder'
  },
  {
    id: 'hash',
    name: '哈希生成',
    category: ToolCategory.DATA,
    description: 'MD5/SHA1/SHA256',
    icon: <Hash size={20} />,
    component: HashTool,
    defaultPath: '/hash-generator'
  },
  {
    id: 'markdown',
    name: 'Markdown 预览',
    category: ToolCategory.TEXT,
    description: '实时预览 Markdown',
    icon: <Type size={20} />,
    component: MarkdownTool,
    defaultPath: '/markdown-preview'
  },
  {
    id: 'uuid',
    name: 'UUID 生成器',
    category: ToolCategory.DATA,
    description: '生成 UUID v4',
    icon: <Code size={20} />,
    component: UuidTool,
    defaultPath: '/uuid-generator'
  },
  {
    id: 'password',
    name: '密码生成器',
    category: ToolCategory.OTHER,
    description: '安全密码生成',
    icon: <Key size={20} />,
    component: PasswordTool,
    defaultPath: '/password-generator'
  },
  {
    id: 'color',
    name: '颜色转换',
    category: ToolCategory.COLOR,
    description: 'HEX/RGB/HSL 转换',
    icon: <Palette size={20} />,
    component: ColorTool,
    defaultPath: '/color-converter'
  },
  {
    id: 'regexGen',
    name: '正则表达式生成器',
    category: ToolCategory.TEXT,
    description: 'AI 生成正则表达式',
    icon: <Sparkles size={20} />,
    component: RegexGenTool,
    defaultPath: '/regex-generator'
  }
];

// 占位工具（用于展示）
export const PLACEHOLDER_TOOLS: ToolMeta[] = [];
