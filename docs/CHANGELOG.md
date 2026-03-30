# 变更记录

## [Unreleased]

## [0.2.0] - 2026-03-30

### Added
- 新增项目文档结构（README、CHANGELOG、TESTCASES、AI_ENHANCEMENT、ARCHITECTURE）
- 新增侧边导航架构（Sidebar 组件）
- 新增 JSON 格式化工具
- 新增 Base64 编解码工具
- 新增工具分类和占位工具展示
- 新增响应式移动端支持
- 新增路由状态管理
- 新增图标库（lucide-react）

### Changed
- 重构项目结构，工具独立目录
- 正则工具优化，示例和说明移至底部
- 更新 package.json 到 0.2.0
- 工具配置统一管理

### Tech Stack
- 新增: react-router-dom（预留）
- 新增: lucide-react

## [0.1.1] - 2026-03-30

### Changed
- UI 配色升级为深色主题（紫罗兰渐变）
- 优化匹配高亮显示效果
- 调整卡片样式为毛玻璃效果

### Fixed
- 修复常用正则示例（移除 ^$ 锚点，添加 g 标志）

## [0.1.0] - 2026-03-29

### Added
- 初始版本发布
- 正则表达式测试工具核心功能
  - 正则表达式输入和修饰符选择
  - 测试文本输入和实时匹配
  - 匹配结果高亮显示
  - 详细匹配信息展示
- 12个常用正则表达式示例
- 修饰符说明文档
- Vercel 部署配置
- Tailwind CSS 样式
- TypeScript 类型定义

### Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
