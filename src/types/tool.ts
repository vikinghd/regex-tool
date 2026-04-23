import { ReactNode } from 'react';

export enum ToolGroup {
  DEV = 'dev',
  NET = 'net'
}

export const GROUP_NAMES: Record<ToolGroup, string> = {
  [ToolGroup.DEV]: '开发者工具',
  [ToolGroup.NET]: '网络工具'
};

export const GROUP_NAMES_EN: Record<ToolGroup, string> = {
  [ToolGroup.DEV]: 'Developer Tools',
  [ToolGroup.NET]: 'Network Tools'
};

export enum ToolCategory {
  TEXT = 'text',
  DATA = 'data',
  COLOR = 'color',
  WEB = 'web',
  OTHER = 'other'
}

export interface ToolMeta {
  id: string;
  name: string;
  group: ToolGroup;
  category: ToolCategory;
  description: string;
  icon: ReactNode;
  component: React.ComponentType;
  defaultPath: string;
}

export const CATEGORY_NAMES: Record<ToolCategory, string> = {
  [ToolCategory.TEXT]: '文本处理',
  [ToolCategory.DATA]: '数据转换',
  [ToolCategory.COLOR]: '颜色工具',
  [ToolCategory.WEB]: 'Web开发',
  [ToolCategory.OTHER]: '其他工具'
};

export const SUBCATEGORY_NAMES: Record<string, string> = {
  // dev 子分类
  'convert': '格式转换',
  'encode': '编码解码',
  'format': '格式化',
  'security': '安全加密',
  'regex': '正则工具',
  'id': 'ID 生成',
  // net 子分类
  'ipinfo': 'IP 信息',
};

export const SUBCATEGORY_NAMES_EN: Record<string, string> = {
  'convert': 'Converters',
  'encode': 'Encode/Decode',
  'format': 'Formatters',
  'security': 'Security',
  'regex': 'Regex Tools',
  'id': 'ID Generation',
  'ipinfo': 'IP Info',
};
