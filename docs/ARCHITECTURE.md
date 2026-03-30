# 架构设计文档

## 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                        App Shell                          │
│  ┌──────────────┐  ┌─────────────────────────────────┐ │
│  │  侧边导航栏   │  │         主内容区域              │ │
│  │              │  │                                 │ │
│  │ - 文本处理   │  │    ┌─────────────────────┐    │ │
│  │   - 正则测试 │  │    │  当前工具组件        │    │ │
│  │   - JSON...  │  │    │                     │    │ │
│  │              │  │    └─────────────────────┘    │ │
│  │ - 数据转换   │  │                                 │ │
│  │ - 颜色工具   │  │                                 │ │
│  └──────────────┘  └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## 目录结构

```
src/
├── components/              # 公共组件
│   ├── Sidebar.tsx         # 侧边导航
│   ├── ToolCard.tsx        # 工具卡片
│   └── Header.tsx          # 顶部导航
├── tools/                   # 各工具实现
│   ├── RegexTool/          # 正则测试工具
│   │   ├── index.tsx
│   │   └── components/
│   ├── JsonFormatter/       # JSON 格式化工具
│   │   └── index.tsx
│   ├── Base64Tool/          # Base64 编解码
│   │   └── index.tsx
│   └── index.ts            # 工具导出入口
├── types/                   # 类型定义
│   ├── tool.ts             # 工具元数据类型
│   └── index.ts
├── constants/               # 常量配置
│   ├── tools.ts            # 工具列表配置
│   └── index.ts
├── hooks/                   # 自定义 Hooks
│   └── useToolRouter.ts    # 工具路由 Hook
├── App.tsx                  # 主应用组件
└── main.tsx                 # 入口文件
```

## 工具注册机制

每个工具需要定义元数据：

```typescript
// src/types/tool.ts
export interface ToolMeta {
  id: string;              // 唯一标识
  name: string;            // 显示名称
  category: ToolCategory;  // 分类
  description: string;     // 描述
  icon: React.ReactNode;   // 图标
  component: React.ComponentType;  // 组件
  defaultPath: string;     // 默认路径
}

export enum ToolCategory {
  TEXT = 'text',
  DATA = 'data',
  COLOR = 'color',
  WEB = 'web',
  OTHER = 'other'
}
```

注册示例：

```typescript
// src/constants/tools.ts
import { RegexTool } from '../tools/RegexTool';
import { JsonFormatter } from '../tools/JsonFormatter';

export const TOOLS: ToolMeta[] = [
  {
    id: 'regex',
    name: '正则表达式测试',
    category: ToolCategory.TEXT,
    description: '实时测试正则表达式',
    icon: <SearchIcon />,
    component: RegexTool,
    defaultPath: '/regex'
  },
  // ... 更多工具
];
```

## 路由方案

使用 HashRouter 或简单的状态管理：

```typescript
// 方案1: 简单状态（推荐，无需额外依赖）
const [currentToolId, setCurrentToolId] = useState('regex');

// 方案2: React Router
<Route path="/tool/:toolId" element={<ToolRenderer />} />
```

## 状态管理

使用 React Context 管理全局状态：

```typescript
interface AppContextType {
  currentTool: ToolMeta | null;
  setCurrentTool: (toolId: string) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextType>(...);
```

## 样式系统

- Tailwind CSS 为主
- 深色主题变量定义在 CSS 中
- 组件使用 utility classes

```css
/* src/index.css */
:root {
  --color-primary: #8b5cf6;
  --color-primary-light: #a78bfa;
  --color-bg: #0f172a;
  --color-surface: #1e293b;
}
```

## 新增工具指南

### Step 1: 创建工具目录

```
src/tools/MyNewTool/
├── index.tsx          # 主组件
└── types.ts           # 类型定义（可选）
```

### Step 2: 实现工具组件

```tsx
// src/tools/MyNewTool/index.tsx
export function MyNewTool() {
  return (
    <div className="tool-container">
      {/* 工具内容 */}
    </div>
  );
}
```

### Step 3: 注册工具

编辑 `src/constants/tools.ts`，添加新工具的元数据。

### Step 4: 更新文档

- 更新 README.md 工具列表
- 更新 CHANGELOG.md
- 添加测试用例（如需要）
