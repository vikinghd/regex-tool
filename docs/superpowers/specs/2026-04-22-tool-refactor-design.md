# 工具网站重构设计

**日期：** 2026-04-22
**状态：** 已批准

---

## 1. 目标

将现有工具网站重构为两个主要类别：开发者工具和网络工具。保留单目录结构，按子类别分组组织工具。同时在首页增加分类导航，让用户可以直观看到所有功能并快速访问。

---

## 2. 目录结构

```
src/tools/
├── dev/                    # 开发者工具
│   ├── convert/            # 颜色转换
│   ├── encode/            # Base64、Hash、URL编码
│   ├── format/            # JSON、Markdown、时间戳
│   ├── security/          # 密码生成
│   ├── regex/             # 正则工具、正则生成
│   └── id/                # UUID生成
└── net/                   # 网络工具
    └── ipinfo/            # IP地址信息解析（第一期）
```

### 现有工具重新分类

| 工具 | 新路径 |
|------|--------|
| ColorTool | `src/tools/dev/convert/ColorTool` |
| Base64Tool | `src/tools/dev/encode/Base64Tool` |
| HashTool | `src/tools/dev/encode/HashTool` |
| UrlTool | `src/tools/dev/encode/UrlTool` |
| JsonFormatter | `src/tools/dev/format/JsonFormatter` |
| MarkdownTool | `src/tools/dev/format/MarkdownTool` |
| TimestampTool | `src/tools/dev/format/TimestampTool` |
| PasswordTool | `src/tools/dev/security/PasswordTool` |
| RegexTool | `src/tools/dev/regex/RegexTool` |
| RegexGenTool | `src/tools/dev/regex/RegexGenTool` |
| UuidTool | `src/tools/dev/id/UuidTool` |

---

## 3. 首页导航

### 布局：分类卡片网格

```
┌─────────────────────────────────────────┐
│        Developer & Network Tools         │
│                                          │
│  ┌──────────── 开发者工具 ────────────┐ │
│  │  [🎨 颜色] [🔐 Base64] [📝 JSON]   │ │
│  │  [🔒 哈希] [⏰ 时间戳] [🎭 密码]   │ │
│  │  [🔍 正则] [📋 UUID]               │ │
│  └──────────────────────────────────────┘ │
│                                          │
│  ┌──────────── 网络工具 ──────────────┐ │
│  │  [🌐 IP信息]                        │ │
│  └──────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 设计细节

- 每个分类一个卡片，卡片内工具用图标 + 名称网格展示
- 点击工具图标进入对应工具页
- 分类卡片可折叠/展开
- 保持现有视觉风格一致

---

## 4. 侧边栏调整

侧边栏分组展示，支持展开/折叠子分类：

```
▼ 开发者工具
    convert  format  encode  security  regex  id
▼ 网络工具
    ipinfo
```

---

## 5. 第一期网络工具：IP 信息解析

### 路径
`src/tools/net/ipinfo/`

### 功能范围
- IP 地址输入与验证
- IP 类型判断（公网/私有A/B/C/组播/保留）
- 进制转换展示（二进制、十六进制）
- 位运算分解展示

### 暂不包含（后续迭代）
- 子网掩码计算、VLSM 划分子网
- IP 比对/冲突检测

---

## 6. 实施顺序

1. 创建新的目录结构（`dev/` 和 `net/` 子目录）
2. 迁移现有工具到新目录结构
3. 更新路由配置
4. 调整侧边栏组件支持分类分组
5. 实现首页分类导航
6. 开发 IP 信息解析工具
7. 更新 SEO 元数据（URL、描述等）
