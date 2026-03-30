# 搜索引擎提交指南

本文档说明如何将 DevTools Box 提交给各大搜索引擎。

## 已准备的文件

- `public/robots.txt` - 搜索引擎爬虫规则
- `public/sitemap.xml` - 网站地图
- `index.html` - SEO meta 标签（Open Graph、Twitter Card 等）

## 搜索引擎提交步骤

### 1. Google Search Console

**网址：** https://search.google.com/search-console

**提交步骤：**
1. 登录 Google Search Console
2. 点击 "添加属性"
3. 输入网址：`https://www.vikinghd.me/`
4. 选择验证方式（推荐使用 HTML 文件上传或 DNS 验证）
5. 验证通过后，提交 sitemap：
   - 侧边栏 → 站点地图
   - 输入：`https://www.vikinghd.me/sitemap.xml`
   - 点击提交

**URL 检查工具：**
- 使用 "URL 检查" 工具请求索引首页
- 可以逐个提交重要页面

---

### 2. 百度搜索资源平台

**网址：** https://ziyuan.baidu.com/

**提交步骤：**
1. 登录百度搜索资源平台
2. 用户中心 → 站点管理 → 添加站点
3. 输入网址：`https://www.vikinghd.me/`
4. 完成验证（推荐使用文件验证）
5. 提交 sitemap：
   - 数据引入 → Sitemap
   - 添加 Sitemap：`https://www.vikinghd.me/sitemap.xml`

**普通收录：**
- 数据引入 → 普通收录
- 可以手动提交重要 URL

---

### 3. Bing Webmaster Tools

**网址：** https://www.bing.com/webmasters

**提交步骤：**
1. 登录 Bing Webmaster Tools
2. 点击 "添加站点"
3. 输入网址：`https://www.vikinghd.me/`
4. 验证网站所有权
5. 提交 sitemap：
   - 侧边栏 → Sitemaps
   - 提交 sitemap URL

**自动导入：**
- Bing 可以从 Google Search Console 自动导入数据

---

### 4. 搜狗站长平台

**网址：** https://zhanzhang.sogou.com/

**提交步骤：**
1. 登录搜狗站长平台
2. 添加站点 → 输入网址
3. 验证网站
4. 提交 sitemap

---

### 5. 360 搜索站长平台

**网址：** https://zhanzhang.so.com/

**提交步骤：**
1. 登录 360 站长平台
2. 添加网站
3. 验证所有权
4. 提交 sitemap

---

## 后续优化建议

### 内容优化
- 添加工具使用说明文档
- 添加常见问题 (FAQ)
- 为每个工具编写详细使用教程

### 技术优化
- 添加结构化数据 (Schema.org)
- 优化页面加载速度
- 添加 PWA 支持（可选）

### 外链建设
- 在技术社区分享（GitHub、V2EX、掘金等）
- 提交到导航网站
- 与类似工具网站交换友链

---

## 验证文件

如果搜索引擎需要验证文件，可以将文件放置在 `public/` 目录下。

例如 Google 的验证文件 `googlea1b2c3d4e5f6.html`：
```bash
# 放入 public/ 目录
public/googlea1b2c3d4e5f6.html
```

---

## 监控指标

提交后定期检查：
- Google Search Console：索引覆盖率、搜索关键词、点击量
- 百度搜索资源平台：索引量、关键词排名
- 网站访问统计（可添加 Google Analytics 或百度统计）
