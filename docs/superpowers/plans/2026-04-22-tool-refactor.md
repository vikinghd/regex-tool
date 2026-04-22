# 工具网站重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有工具网站重构为开发者工具和网络工具两大分类，添加首页分类导航，开发 IP 信息解析工具。

**Architecture:** 保持单目录 `src/tools/`，通过子目录分组（`dev/` 和 `net/`）。首页添加分类卡片网格导航。侧边栏支持分组折叠。新增 `ToolGroup` 类型替代 `ToolCategory` 用于导航分类。

**Tech Stack:** React + TypeScript + TailwindCSS + React Router

---

## 文件结构概览

```
src/
├── constants/
│   └── tools.tsx          # 修改: 更新工具分组和导入路径
├── types/
│   └── tool.ts            # 修改: 添加 ToolGroup 类型
├── components/
│   └── Sidebar.tsx        # 修改: 支持分组折叠
├── i18n/
│   └── translations.ts    # 修改: 添加新分类和 ipinfo 工具翻译
├── App.tsx                # 修改: 首页路由
├── HomePage.tsx           # 新建: 首页分类导航
└── tools/
    ├── dev/               # 新建: 开发者工具分组目录
    │   ├── convert/ColorTool/
    │   ├── encode/Base64Tool, HashTool, UrlTool/
    │   ├── format/JsonFormatter, MarkdownTool, TimestampTool/
    │   ├── security/PasswordTool/
    │   ├── regex/RegexTool, RegexGenTool/
    │   └── id/UuidTool/
    └── net/               # 新建: 网络工具分组目录
        └── ipinfo/        # 新建: IP 信息解析工具
```

---

## Task 1: 创建目录结构并迁移工具

**Files:**
- Create: `src/tools/dev/`, `src/tools/dev/convert/`, `src/tools/dev/encode/`, `src/tools/dev/format/`, `src/tools/dev/security/`, `src/tools/dev/regex/`, `src/tools/dev/id/`, `src/tools/net/`
- Move: `src/tools/ColorTool/` → `src/tools/dev/convert/ColorTool/`
- Move: `src/tools/Base64Tool/` → `src/tools/dev/encode/Base64Tool/`
- Move: `src/tools/HashTool/` → `src/tools/dev/encode/HashTool/`
- Move: `src/tools/UrlTool/` → `src/tools/dev/encode/UrlTool/`
- Move: `src/tools/JsonFormatter/` → `src/tools/dev/format/JsonFormatter/`
- Move: `src/tools/MarkdownTool/` → `src/tools/dev/format/MarkdownTool/`
- Move: `src/tools/TimestampTool/` → `src/tools/dev/format/TimestampTool/`
- Move: `src/tools/PasswordTool/` → `src/tools/dev/security/PasswordTool/`
- Move: `src/tools/RegexTool/` → `src/tools/dev/regex/RegexTool/`
- Move: `src/tools/RegexGenTool/` → `src/tools/dev/regex/RegexGenTool/`
- Move: `src/tools/UuidTool/` → `src/tools/dev/id/UuidTool/`

- [ ] **Step 1: 创建 dev 子目录结构**

```bash
mkdir -p src/tools/dev/convert src/tools/dev/encode src/tools/dev/format src/tools/dev/security src/tools/dev/regex src/tools/dev/id
```

- [ ] **Step 2: 创建 net 目录**

```bash
mkdir -p src/tools/net/ipinfo
```

- [ ] **Step 3: 迁移工具到新目录（Windows git bash）**

```bash
cd src/tools && git mv ColorTool dev/convert/ColorTool && git mv Base64Tool dev/encode/Base64Tool && git mv HashTool dev/encode/HashTool && git mv UrlTool dev/encode/UrlTool && git mv JsonFormatter dev/format/JsonFormatter && git mv MarkdownTool dev/format/MarkdownTool && git mv TimestampTool dev/format/TimestampTool && git mv PasswordTool dev/security/PasswordTool && git mv RegexTool dev/regex/RegexTool && git mv RegexGenTool dev/regex/RegexGenTool && git mv UuidTool dev/id/UuidTool
```

- [ ] **Step 4: 验证目录结构**

```bash
find src/tools -type d | sort
```

Expected output should show:
```
src/tools
src/tools/dev
src/tools/dev/convert/ColorTool
src/tools/dev/encode/Base64Tool HashTool UrlTool
src/tools/dev/format/JsonFormatter MarkdownTool TimestampTool
src/tools/dev/security/PasswordTool
src/tools/dev/regex/RegexTool RegexGenTool
src/tools/dev/id/UuidTool
src/tools/net/ipinfo
```

- [ ] **Step 5: 提交**

```bash
git add -A && git commit -m "refactor: 重组工具目录结构为 dev/net 分组"
```

---

## Task 2: 更新类型定义 - 添加 ToolGroup

**Files:**
- Modify: `src/types/tool.ts`

- [ ] **Step 1: 添加 ToolGroup 枚举**

```typescript
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
```

- [ ] **Step 2: 在 ToolMeta 中添加 group 属性**

```typescript
export interface ToolMeta {
  id: string;
  name: string;
  group: ToolGroup;  // 新增
  category: ToolCategory;
  description: string;
  icon: ReactNode;
  component: React.ComponentType;
  defaultPath: string;
}
```

- [ ] **Step 3: 更新 CATEGORY_NAMES 添加 dev 子分类名称**

```typescript
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
```

- [ ] **Step 4: 提交**

```bash
git add src/types/tool.ts && git commit -m "feat: 添加 ToolGroup 类型和子分类名称"
```

---

## Task 3: 更新 constants/tools.tsx

**Files:**
- Modify: `src/constants/tools.tsx`

- [ ] **Step 1: 更新导入路径**

```typescript
import { RegexTool } from '../tools/dev/regex/RegexTool';
import { JsonFormatter } from '../tools/dev/format/JsonFormatter';
import { Base64Tool } from '../tools/dev/encode/Base64Tool';
import { TimestampTool } from '../tools/dev/format/TimestampTool';
import { UrlTool } from '../tools/dev/encode/UrlTool';
import { HashTool } from '../tools/dev/encode/HashTool';
import { MarkdownTool } from '../tools/dev/format/MarkdownTool';
import { UuidTool } from '../tools/dev/id/UuidTool';
import { PasswordTool } from '../tools/dev/security/PasswordTool';
import { ColorTool } from '../tools/dev/convert/ColorTool';
import { RegexGenTool } from '../tools/dev/regex/RegexGenTool';
```

- [ ] **Step 2: 更新 TOOLS 数组，添加 group 属性并按新分类组织**

```typescript
export const TOOLS: ToolMeta[] = [
  // dev/regex
  {
    id: 'regex',
    name: '正则表达式测试',
    group: ToolGroup.DEV,
    category: ToolCategory.TEXT,
    description: '实时测试正则表达式',
    icon: <Search size={20} />,
    component: RegexTool,
    defaultPath: '/regex-tester'
  },
  // ... 其他工具类似添加 group: ToolGroup.DEV
  // 所有现有 11 个工具都是 ToolGroup.DEV
];
```

- [ ] **Step 3: 提交**

```bash
git add src/constants/tools.tsx && git commit -m "feat: 更新工具配置添加 group 属性"
```

---

## Task 4: 更新 i18n 翻译

**Files:**
- Modify: `src/i18n/translations.ts`

- [ ] **Step 1: 添加新分类翻译**

```typescript
// 在 TranslationKey 中添加
| 'category.dev'
| 'category.net'
| 'tools.ipinfo.name'
| 'tools.ipinfo.description'
| 'tools.ipinfo.seoDescription'
```

- [ ] **Step 2: 在 zhCN 和 enUS 中添加翻译**

zhCN:
```typescript
'category.dev': '开发者工具',
'category.net': '网络工具',
'tools.ipinfo.name': 'IP 信息解析',
'tools.ipinfo.description': 'IP 地址类型与进制转换',
'tools.ipinfo.seoDescription': 'IP地址信息解析工具，判断公网/私有IP类型，查看二进制、十六进制表示。网络工程师必备工具。',
```

enUS:
```typescript
'category.dev': 'Developer Tools',
'category.net': 'Network Tools',
'tools.ipinfo.name': 'IP Info',
'tools.ipinfo.description': 'IP address type and base conversion',
'tools.ipinfo.seoDescription': 'IP address information parser. Identify public/private IP types, view binary and hex representations. Essential tool for network engineers.',
```

- [ ] **Step 3: 提交**

```bash
git add src/i18n/translations.ts && git commit -m "feat: 添加分组分类和网络工具翻译"
```

---

## Task 5: 更新 Sidebar 组件支持分组

**Files:**
- Modify: `src/components/Sidebar.tsx`

- [ ] **Step 1: 更新导入**

```typescript
import { ToolMeta, ToolCategory, ToolGroup } from '../types/tool';
```

- [ ] **Step 2: 修改 expandedGroups state**

```typescript
const [expandedGroups, setExpandedGroups] = useState<Set<ToolGroup>>(
  new Set([ToolGroup.DEV])
);
```

- [ ] **Step 3: 添加 toggleGroup 函数**

```typescript
const toggleGroup = (group: ToolGroup) => {
  setExpandedGroups(prev => {
    const next = new Set(prev);
    if (next.has(group)) {
      next.delete(group);
    } else {
      next.add(group);
    }
    return next;
  });
};
```

- [ ] **Step 4: 重构 renderToolList，按 group 分组展示**

主要逻辑：
- 先按 group 分组（DEV、NET）
- 每个 group 下按 category 子分类展示
- 使用 getGroupName() 获取分组名称

- [ ] **Step 5: 提交**

```bash
git add src/components/Sidebar.tsx && git commit -m "feat: 侧边栏支持分组折叠"
```

---

## Task 6: 创建首页 HomePage 组件

**Files:**
- Create: `src/pages/HomePage.tsx`

- [ ] **Step 1: 创建 HomePage 组件**

```tsx
import { useNavigate } from 'react-router-dom';
import { ToolMeta, ToolGroup } from '../types/tool';
import { TOOLS } from '../constants/tools';
import { useI18n } from '../i18n';

interface HomePageProps {
  onToolSelect?: (tool: ToolMeta) => void;
}

export function HomePage({ onToolSelect }: HomePageProps) {
  const navigate = useNavigate();
  const { language, getToolName, getToolDescription, getCategoryName } = useI18n();

  const toolsByGroup = TOOLS.reduce((acc, tool) => {
    if (!acc[tool.group]) acc[tool.group] = [];
    acc[tool.group].push(tool);
    return acc;
  }, {} as Record<ToolGroup, ToolMeta[]>);

  const handleToolClick = (tool: ToolMeta) => {
    if (onToolSelect) {
      onToolSelect(tool);
    } else {
      navigate(tool.defaultPath);
    }
  };

  const groupNames = language === 'zh-CN'
    ? { dev: '开发者工具', net: '网络工具' }
    : { dev: 'Developer Tools', net: 'Network Tools' };

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12 text-[var(--color-text-primary)]">
        {language === 'zh-CN' ? 'Developer & Network Tools' : '开发者与网络工具'}
      </h1>

      {Object.entries(toolsByGroup).map(([group, tools]) => (
        <div key={group} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
            {groupNames[group as keyof typeof groupNames]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="flex flex-col items-center p-4 bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <span className="text-sm font-medium text-[var(--color-text-primary)] text-center">
                  {getToolName(tool.id)}
                </span>
                <span className="text-xs text-[var(--color-text-secondary)] text-center mt-1">
                  {getToolDescription(tool.id)}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 提交**

```bash
git add src/pages/HomePage.tsx && git commit -m "feat: 创建首页分类导航组件"
```

---

## Task 7: 更新 App.tsx 添加首页路由

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 添加 HomePage 导入并设置根路由**

```typescript
import { HomePage } from './pages/HomePage';

// 在 Routes 中添加
<Route path="/" element={<HomePage />} />
<Route path="/:toolPath" element={<AppContent />} />
```

- [ ] **Step 2: 更新 AppContent 处理首页情况**

当 pathname 为 '/' 时，显示首页而不是默认跳转。

- [ ] **Step 3: 提交**

```bash
git add src/App.tsx && git commit -m "feat: 添加首页路由"
```

---

## Task 8: 开发 IP 信息解析工具

**Files:**
- Create: `src/tools/net/ipinfo/index.tsx`

- [ ] **Step 1: 创建 IPInfoTool 组件**

功能需求：
- IP 地址输入框，支持验证
- IP 类型判断（公网 A/B/C 类、私有 10.x.x.x、172.16-31.x.x、192.168.x.x、组播 224-239.x.x、保留）
- 进制转换展示（二进制、十六进制）
- 位运算分解展示（32 位整数、二进制分组）

```tsx
import { useState } from 'react';
import { useI18n } from '../../../i18n';
import { Globe, Copy, Check, AlertCircle } from 'lucide-react';

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
  const { t } = useI18n();
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
```

- [ ] **Step 2: 在 tools.tsx 中注册工具**

添加 ipinfo 到 TOOLS 数组，group: ToolGroup.NET

- [ ] **Step 3: 提交**

```bash
git add src/tools/net/ipinfo/index.tsx src/constants/tools.tsx && git commit -m "feat: 添加 IP 信息解析工具"
```

---

## Task 9: 更新 SEO 元数据

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: 更新 Helmet 中的 SEO 信息**

添加针对首页的 meta description 和 keywords。

- [ ] **Step 2: 提交**

```bash
git add src/App.tsx && git commit -m "chore: 更新 SEO 元数据"
```

---

## 实施顺序检查清单

- [ ] Task 1: 创建目录结构并迁移工具
- [ ] Task 2: 更新类型定义 - 添加 ToolGroup
- [ ] Task 3: 更新 constants/tools.tsx
- [ ] Task 4: 更新 i18n 翻译
- [ ] Task 5: 更新 Sidebar 组件支持分组
- [ ] Task 6: 创建首页 HomePage 组件
- [ ] Task 7: 更新 App.tsx 添加首页路由
- [ ] Task 8: 开发 IP 信息解析工具
- [ ] Task 9: 更新 SEO 元数据

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-22-tool-refactor.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
