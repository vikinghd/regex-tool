# 变更记录

## [Unreleased]

## [0.15.0] - 2026-04-07

### Added
- 新增 AI 正则表达式生成器
  - 支持用自然语言描述需求，AI 自动生成正则表达式
  - 集成 Deepseek API
  - API Key 安全存储在浏览器本地 (localStorage)
  - 提供 API 配置界面 (可自定义 API URL 和 Key)
  - 内置常用示例快捷按钮
  - 一键复制生成的正则
  - 一键跳转到正则测试工具进行测试
  - 完整国际化支持 (中文/英文)
- 安全最佳实践说明
- 版本号更新至 0.15.0

## [0.14.0] - 2026-04-07

### Added
- 新增颜色转换工具
  - 支持 HEX、RGB、HSL 三种格式互转
  - 支持 Alpha 透明度通道
  - 实时颜色预览
  - 随机颜色生成
  - 格式互换功能
  - 一键复制功能
  - 完整国际化支持 (中文/英文)
- 版本号更新至 0.14.0

## [0.13.0] - 2026-04-07

### Changed
- SEO 优化：所有工具 URL 改为更具描述性的格式
  - /regex → /regex-tester
  - /json → /json-formatter
  - /base64 → /base64-encoder-decoder
  - /timestamp → /timestamp-converter
  - /url → /url-encoder-decoder
  - /hash → /hash-generator
  - /markdown → /markdown-preview
  - /uuid → /uuid-generator
  - /password → /password-generator
- 添加 Vercel 重定向规则 (301 永久重定向)
- 更新 sitemap.xml 使用新 URL 格式
- 版本号更新至 0.13.0

## [0.12.0] - 2026-04-06

### Added
- 新增密码生成器工具
  - 可调节密码长度 (4-64位)
  - 支持大写字母、小写字母、数字、特殊符号
  - 可排除相似字符 (0, O, 1, l, I)
  - 密码强度实时评估 (弱/一般/良好/强/非常强)
  - 使用加密安全的随机数生成
  - 一键复制功能
  - 完整国际化支持 (中文/英文)
- 版本号更新至 0.12.0

## [0.11.0] - 2026-04-06

### Added
- 新增 UUID 生成器工具
  - 支持 UUID v4 (随机)、v1 (时间戳)、Nil (全零)
  - 支持批量生成 (最多100个)
  - 支持大写/小写切换
  - 支持含连字符/无连字符切换
  - 一键复制单个或全部结果
  - 完整国际化支持 (中文/英文)
- 版本号更新至 0.11.0

## [0.10.0] - 2026-04-06

### Added
- 新增 Markdown 预览工具
  - 支持 GFM (GitHub Flavored Markdown)
  - 双栏布局：左侧输入，右侧预览
  - 示例按钮快速加载演示内容
  - 完整的样式支持（标题、列表、代码、表格、引用等）
  - 深色主题适配
  - 完整国际化支持 (中文/英文)
- 安装 react-markdown 和 remark-gfm 依赖
- 版本号更新至 0.10.0

## [0.9.0] - 2026-04-06

### Added
- 新增哈希生成工具 (Hash Generator)
  - 支持 MD5、SHA-1、SHA-256、SHA-384、SHA-512 算法
  - 支持大写/小写输出切换
  - 一键复制哈希值
  - 完整国际化支持 (中文/英文)
- 版本号更新至 0.9.0

## [0.8.0] - 2026-03-31

### Changed
- 所有工具组件完整支持国际化 (i18n)
  - RegexTool - 正则表达式测试工具
  - JsonFormatter - JSON 格式化工具
  - Base64Tool - Base64 编解码工具
  - TimestampTool - 时间戳转换工具
  - UrlTool - URL 编解码工具
- 语言切换为英文时所有界面文本正确显示
- 版本号更新至 0.8.0

## [0.7.0] - 2026-03-31

### Changed
- 改进语言切换器为下拉菜单
- 显示当前语言（中文/English）
- 版本号更新至 0.7.0

## [0.6.0] - 2026-03-31

### Added
- 添加多语言支持 (i18n)
  - 中文 (zh-CN) 和英文 (en-US)
  - 语言切换按钮
  - 语言选择保存在 localStorage
- 添加 GitHub 链接到侧边栏
- 添加 LanguageProvider 和 useI18n Hook
- 所有界面文本支持国际化

### Changed
- 版本号更新至 0.6.0
- 侧边栏底部添加语言切换和 GitHub 链接
- 简化头部，版本号移至侧边栏

## [0.5.0] - 2026-03-30

### Added
- 集成 react-helmet-async - 动态 meta 标签管理
- 每个工具独立的标题和描述
- 添加 Schema.org 结构化数据 (WebApplication)
- 改用 BrowserRouter 替代 HashRouter
  - URL 从 /#/regex 改为 /regex
  - 对 SEO 更友好
- 更新 Vercel 配置，添加重定向规则
- 更新 sitemap.xml 使用正常 URL 格式

### Changed
- 版本号更新至 0.5.0

## [0.4.0] - 2026-03-30

### Added
- 新增 SEO 相关文件
  - robots.txt - 搜索引擎爬虫规则
  - sitemap.xml - 网站地图
  - docs/SEO.md - 搜索引擎提交指南
- 新增 SEO meta 标签
  - 关键词 meta 标签
  - Open Graph (Facebook) 标签
  - Twitter Card 标签
  - canonical URL
- 扩展页面描述和关键词

## [0.3.0] - 2026-03-30

### Added
- 集成 React Router (HashRouter)
- 每个工具独立 URL (/#/regex, /#/json 等)
- 新增时间戳转换工具
  - Unix 时间戳 ↔ 日期时间互转
  - 多种时间格式展示 (ISO/UTC/本地)
  - "当前时间"快捷按钮
- 新增 URL 编解码工具
  - URL 编码和解码
  - 编码说明文档
- 更新网站标题为 DevTools Box
- 添加网站 favicon

### Changed
- 侧边栏和主内容区对齐优化
- 移除 pushState，改用 HashRouter 管理路由
- 版本号更新至 0.3.0

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
