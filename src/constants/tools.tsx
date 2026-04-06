import { Search, FileJson, ArrowLeftRight, Palette, Clock, Globe, Code, Type, Hash } from 'lucide-react';
import { ToolMeta, ToolCategory } from '../types/tool';
import { RegexTool } from '../tools/RegexTool';
import { JsonFormatter } from '../tools/JsonFormatter';
import { Base64Tool } from '../tools/Base64Tool';
import { TimestampTool } from '../tools/TimestampTool';
import { UrlTool } from '../tools/UrlTool';
import { HashTool } from '../tools/HashTool';
import { MarkdownTool } from '../tools/MarkdownTool';
import { UuidTool } from '../tools/UuidTool';

export const TOOLS: ToolMeta[] = [
  {
    id: 'regex',
    name: '正则表达式测试',
    category: ToolCategory.TEXT,
    description: '实时测试正则表达式',
    icon: <Search size={20} />,
    component: RegexTool,
    defaultPath: '/regex'
  },
  {
    id: 'json',
    name: 'JSON 格式化',
    category: ToolCategory.TEXT,
    description: '格式化、压缩 JSON',
    icon: <FileJson size={20} />,
    component: JsonFormatter,
    defaultPath: '/json'
  },
  {
    id: 'base64',
    name: 'Base64 编解码',
    category: ToolCategory.DATA,
    description: 'Base64 编码和解码',
    icon: <ArrowLeftRight size={20} />,
    component: Base64Tool,
    defaultPath: '/base64'
  },
  {
    id: 'timestamp',
    name: '时间戳转换',
    category: ToolCategory.DATA,
    description: 'Unix 时间戳转换',
    icon: <Clock size={20} />,
    component: TimestampTool,
    defaultPath: '/timestamp'
  },
  {
    id: 'url',
    name: 'URL 编解码',
    category: ToolCategory.WEB,
    description: 'URL 编码和解码',
    icon: <Globe size={20} />,
    component: UrlTool,
    defaultPath: '/url'
  },
  {
    id: 'hash',
    name: '哈希生成',
    category: ToolCategory.DATA,
    description: 'MD5/SHA1/SHA256',
    icon: <Hash size={20} />,
    component: HashTool,
    defaultPath: '/hash'
  },
  {
    id: 'markdown',
    name: 'Markdown 预览',
    category: ToolCategory.TEXT,
    description: '实时预览 Markdown',
    icon: <Type size={20} />,
    component: MarkdownTool,
    defaultPath: '/markdown'
  },
  {
    id: 'uuid',
    name: 'UUID 生成器',
    category: ToolCategory.DATA,
    description: '生成 UUID v4',
    icon: <Code size={20} />,
    component: UuidTool,
    defaultPath: '/uuid'
  }
];

// 占位工具（用于展示）
export const PLACEHOLDER_TOOLS: ToolMeta[] = [
  {
    id: 'color',
    name: '颜色转换',
    category: ToolCategory.COLOR,
    description: 'HEX/RGB/HSL 转换',
    icon: <Palette size={20} />,
    component: () => null,
    defaultPath: '/color'
  }
];
