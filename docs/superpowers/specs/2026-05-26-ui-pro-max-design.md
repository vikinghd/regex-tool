# DevTools Box - UI Pro Max 重构设计规范

**版本**: 1.0
**日期**: 2026-05-26
**状态**: 已批准

---

## 1. 概述与目标

将 DevTools Box 从深色主题重构为**鲜艳明亮的彩虹渐变风格**，打造前卫独特、与众不同的开发者工具站体验。保持现有功能结构不变，专注于视觉和交互的全面升级。

---

## 2. 设计语言

### 2.1 色彩系统

#### 背景色
| Token | 色值 | 用途 |
|-------|------|------|
| `--color-bg-base` | `#FAFAFA` | 页面背景 |
| `--color-bg-surface` | `#FFFFFF` | 卡片/组件背景 |
| `--color-bg-elevated` | `#F3F4F6` | 悬停/次级背景 |

#### 文字色
| Token | 色值 | 用途 |
|-------|------|------|
| `--color-text-primary` | `#1A1A2E` | 主标题、重要文字 |
| `--color-text-secondary` | `#6B7280` | 描述文字、次要信息 |
| `--color-text-muted` | `#9CA3AF` | 占位符、禁用态 |

#### 边框与分割
| Token | 色值 | 用途 |
|-------|------|------|
| `--color-border` | `#E5E7EB` | 默认边框 |
| `--color-border-strong` | `#D1D5DB` | 强调边框 |

#### 语义色
| Token | 色值 | 用途 |
|-------|------|------|
| `--color-success` | `#10B981` | 成功状态 |
| `--color-error` | `#EF4444` | 错误状态 |
| `--color-warning` | `#F59E0B` | 警告状态 |

#### 工具卡片渐变色分配
每个工具使用主渐变色的不同片段：

| 工具 | 渐变方向 | 起始色 | 终止色 |
|------|----------|--------|--------|
| Regex Tester | 135deg | `#FF6B6B` | `#FFE66D` |
| JSON Formatter | 135deg | `#FFE66D` | `#4ECDC4` |
| Base64 Encoder | 135deg | `#4ECDC4` | `#45B7D1` |
| Timestamp Converter | 135deg | `#45B7D1` | `#7B68EE` |
| URL Encoder | 135deg | `#7B68EE` | `#FF6B6B` |
| Hash Generator | 135deg | `#FF6B6B` | `#FF8C42` |
| Markdown Preview | 135deg | `#FF8C42` | `#FFD93D` |
| UUID Generator | 135deg | `#6BCB77` | `#4D96FF` |
| Password Generator | 135deg | `#4D96FF` | `#845EC2` |
| Color Converter | 135deg | `#845EC2` | `#FF6B6B` |
| Regex Generator | 135deg | `#FF9FF3` | `#FEC260` |
| IP Info | 135deg | `#00D9FF` | `#0092FF` |

**主渐变定义 (CSS):**
```css
--gradient-primary: linear-gradient(135deg, #FF6B6B, #FFE66D, #4ECDC4, #45B7D1, #7B68EE);
```

### 2.2 字体

| 用途 | 字体 | 备选 |
|------|------|------|
| 主字体 | `Inter, -apple-system, BlinkMacSystemFont, sans-serif` | 系统无衬线字体 |
| 代码字体 | `'JetBrains Mono', 'Fira Code', monospace` | 等宽字体 |

**字号系统:**
| 元素 | 字号 | 字重 |
|------|------|------|
| H1 (首页标题) | 2.5rem (40px) | 700 |
| H2 (分类标题) | 1.5rem (24px) | 600 |
| H3 (工具标题) | 1.125rem (18px) | 600 |
| Body | 1rem (16px) | 400 |
| Small | 0.875rem (14px) | 400 |
| Caption | 0.75rem (12px) | 400 |

### 2.3 间距

基于 4px 网格系统：
| Token | 值 |
|-------|-----|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |

### 2.4 圆角

| 元素 | 圆角 |
|------|------|
| 按钮 | 12px |
| 卡片 | 16px |
| 输入框 | 10px |
| 标签/徽章 | 9999px (全圆角) |

### 2.5 阴影

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12);
--shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.12);
```

### 2.6 动效

| 动效类型 | 时长 | 缓动函数 |
|----------|------|----------|
| 快速过渡 | 150ms | `ease-out` |
| 基础过渡 | 200ms | `ease-out` |
| 页面过渡 | 300ms | `ease-in-out` |
| 悬停上浮 | 200ms | `ease-out` |

**动效实现:**
- 页面切换: opacity 0→1, 200ms ease-out
- 卡片悬停: translateY(-4px) + shadow-md → shadow-hover
- 按钮悬停: scale(1.02)
- 侧边栏移动端: translateX(-100%) → translateX(0)

---

## 3. 布局与结构

### 3.1 首页布局

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo          [语言切换]  [GitHub]                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Hero 区域:                                                  │
│  "Developer & Network Tools"                                │
│  副标题 + 渐变装饰线                                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  开发者工具 (渐变橙色边框标题)                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │ Regex│ │ JSON │ │Base64│ │时间戳 │ │ URL  │             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│                                                             │
│  网络工具 (渐变蓝色边框标题)                                  │
│  ┌──────┐                                                   │
│  │ IP   │                                                   │
│  └──────┘                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 工具页布局

```
┌─────────────────────────────────────────────────────────────┐
│ ┌────────┐                                                 │
│ │ Sidebar│  Header: [工具名称]  [描述]                      │
│ │        ├─────────────────────────────────────────────────┤
│ │ Logo   │                                                 │
│ │        │                                                 │
│ │ Tools  │  工具内容区域                                     │
│ │ List   │                                                 │
│ │        │                                                 │
│ │        │                                                 │
│ │ [Lang] │                                                 │
│ │ [Git]  │                                                 │
│ └────────┘                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|----------|
| Mobile | < 640px | 单列，侧边栏隐藏，汉堡菜单 |
| Tablet | 640px - 1024px | 双列网格，侧边栏可折叠 |
| Desktop | > 1024px | 完整侧边栏 + 内容区 |

---

## 4. 组件规范

### 4.1 工具卡片 (HomePage)

```tsx
// 结构
<div className="card">
  <span className="card-icon">{tool.icon}</span>
  <h3 className="card-title">{toolName}</h3>
  <p className="card-desc">{description}</p>
</div>

// 样式
.card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  border-left: 4px solid [tool-gradient-start];
  padding: 20px;
  cursor: pointer;
  transition: all 200ms ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
```

### 4.2 侧边栏 (Sidebar)

**桌面端:**
- 固定宽度 256px (w-64)
- 白色背景，左侧细边框分隔
- Logo 区域 + 工具列表 + 底部操作区

**移动端:**
- 汉堡菜单按钮 fixed 在左上角
- 侧边栏从左侧滑入，overlay 遮罩
- 点击外部或关闭按钮收起

### 4.3 按钮

```tsx
// 主按钮 - 渐变背景
<button className="btn-primary">
  Submit
</button>

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 150ms ease-out;
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}

// 次按钮 - 白底边框
<button className="btn-secondary">
  Cancel
</button>

.btn-secondary {
  background: white;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  border-radius: 12px;
  padding: 12px 24px;
}
```

### 4.4 输入框

```tsx
<input className="input" />

.input {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: border-color 150ms ease-out;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.2);
}
```

### 4.5 代码块

```tsx
<code className="code-block" />

.code-block {
  background: #F3F4F6;
  border-radius: 8px;
  padding: 2px 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875em;
}
```

---

## 5. 页面结构详情

### 5.1 首页 (HomePage)

- Hero 区域: 渐变装饰线 + 标题
- 工具网格: 按分组展示，响应式列数
- 分类标题: 每个工具有独特的渐变左边框

### 5.2 工具页 (AppContent)

- Sticky Header: 白色背景模糊效果，显示工具名和描述
- 工具组件区域: 根据不同工具显示对应功能
- 统一卡片样式: 白色背景 + 阴影

### 5.3 侧边栏导航

- Logo 区域
- 可折叠的工具分组
- 当前工具高亮 (渐变背景)
- 底部: 语言切换 + GitHub 链接 + 版本号

---

## 6. i18n 适配

保持现有中英文切换功能，所有新 UI 文本需同时提供两种语言版本。

---

## 7. 实现优先级

### Phase 1: 基础重构
1. 全局 CSS 变量更新为新色彩系统
2. 字体配置更新
3. 主页布局和工具卡片重构
4. 侧边栏重构

### Phase 2: 工具页优化
5. 工具页 header 样式调整
6. 各工具组件样式统一
7. 输入框/按钮等基础组件样式更新

### Phase 3: 动效与细节
8. 页面过渡动画
9. 卡片悬停动效
10. 移动端侧边栏动画
11. 最终细节调优

---

## 8. 技术约束

- 保持 React 18 + TypeScript + Vite + Tailwind CSS 技术栈
- 保持 react-router-dom 路由结构
- 保持 i18n 多语言支持
- 保持现有 SEO 元数据优化
- 保持 Vercel 部署配置

---

## 9. 验收标准

- [ ] 首页显示彩虹渐变风格的工具卡片
- [ ] 侧边栏在桌面端和移动端都正常工作
- [ ] 工具页内容正常显示，样式协调
- [ ] 语言切换功能正常
- [ ] 移动端响应式布局正常
- [ ] 无控制台错误
- [ ] 页面加载性能良好