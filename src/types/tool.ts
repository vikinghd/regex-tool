import { ReactNode } from 'react';

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
