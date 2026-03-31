# DevTools Box - 开发者在线工具箱

一个简洁、美观、实用的开发者在线工具集合，无需安装，即用即走。

## 功能特性

- 🎨 深色主题，护眼舒适
- 📱 响应式设计，支持移动端
- ⚡ 纯前端实现，无需后端
- 🚀 快速加载，即用即走

## 工具列表

### 文本处理
- ✅ 正则表达式测试
- ⏳ JSON 格式化/验证
- ⏳ Base64 编解码
- ⏳ URL 编解码
- ⏳ 文本对比（Diff）

### 数据转换
- ⏳ 时间戳转换
- ⏳ Cron 表达式验证
- ⏳ JWT 解码
- ⏳ JSON ↔ YAML 转换

### 颜色工具
- ⏳ 颜色转换（HEX/RGB/HSL）
- ⏳ 颜色调色板

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 部署

本项目使用 Vercel 自动部署，推送到 GitHub 即可自动构建。

## 项目结构

```
├── docs/                    # 文档目录
│   ├── CHANGELOG.md        # 变更记录
│   ├── TESTCASES.md        # 测试用例
│   └── AI_ENHANCEMENT.md   # AI 增强功能规划
├── src/
│   ├── components/          # 公共组件
│   ├── tools/              # 各工具实现
│   ├── types.ts            # 类型定义
│   └── constants.ts        # 常量配置
└── package.json
```

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router（路由）
- Lucide React（图标）

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingTool`)
3. 提交更改 (`git commit -m 'Add: 新增某某工具'`)
4. 推送到分支 (`git push origin feature/AmazingTool`)
5. 开启 Pull Request

Online version: www.vikinghd.me

## 许可证

MIT License
