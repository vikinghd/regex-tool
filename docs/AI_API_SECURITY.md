# AI API 安全配置指南

## 🔐 安全最佳实践

### 当前实现（前端模式）

当前的 AI 正则表达式生成器采用**前端直接调用 API** 的模式，API Key 仅保存在用户浏览器的 localStorage 中。

**优点：**
- 简单易用，无需后端服务
- API Key 完全由用户控制，不经过第三方服务器
- 成本由用户直接承担

**安全风险：**
- API Key 存在浏览器中，有被 XSS 攻击窃取的风险
- 无法在服务器端进行速率限制和成本控制
- 无法隐藏 API Key 的存在（虽然 Key 本身是加密存储的）

---

## 🛡️ 推荐方案：后端代理模式

为了更高的安全性，建议部署一个后端代理服务。以下是一个简单的 Node.js 代理示例：

### 1. 创建代理服务器

```javascript
// server.js
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3001;

// 速率限制：每个 IP 每分钟最多 10 次请求
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests, please try again later.'
});

// CORS 配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.vikinghd.me');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 代理 Deepseek API
app.use('/api/deepseek', limiter, (req, res, next) => {
  // 验证请求来源（可选）
  const origin = req.headers.origin;
  if (origin !== 'https://www.vikinghd.me') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}, createProxyMiddleware({
  target: 'https://api.deepseek.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api/deepseek': '/v1/chat/completions'
  },
  onProxyReq: (proxyReq) => {
    // 在代理请求中注入 API Key（从环境变量读取）
    proxyReq.setHeader('Authorization', `Bearer ${process.env.DEEPSEEK_API_KEY}`);
  },
  onProxyRes: (proxyRes) => {
    // 移除可能包含敏感信息的响应头
    proxyRes.removeHeader('x-ratelimit-limit');
    proxyRes.removeHeader('x-ratelimit-remaining');
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
```

### 2. 部署到 Vercel (Serverless Functions)

创建 `api/proxy.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGIN = 'https://www.vikinghd.me';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 验证来源
  if (req.headers.origin !== ALLOWED_ORIGIN) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // 只允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 构建请求到 Deepseek
    const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: req.body.messages,
        temperature: 0.3,
      }),
    });

    const data = await deepseekResponse.json();
    res.status(deepseekResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
```

### 3. 配置环境变量

在 Vercel 项目设置中添加：
```
DEEPSEEK_API_KEY=sk-your-actual-api-key-here
```

### 4. 更新前端配置

在工具的 API 配置中，将 API URL 改为：
```
https://your-domain.vercel.app/api/proxy
```

API Key 字段可以留空（不再需要）。

---

## 🔒 其他安全建议

### 1. API Key 管理

- **不要提交 API Key 到代码仓库**
- 使用环境变量或密钥管理服务
- 定期轮换 API Key
- 在 Deepseek 控制台设置使用限额和告警

### 2. 成本控制

- 设置月度预算限制
- 监控 API 使用量
- 考虑实施用户认证（如果是开放给公众使用）

### 3. Deepseek 控制台配置

1. 登录 https://platform.deepseek.com/
2. 进入 "API Keys" 页面
3. 创建新的 API Key（专门用于此项目）
4. 进入 "Billing" 设置支出告警
5. 进入 "Usage" 监控使用情况

---

## 📋 快速检查清单

- [ ] API Key 未提交到 Git
- [ ] 使用环境变量存储密钥
- [ ] 设置了速率限制
- [ ] 配置了 CORS 限制
- [ ] 设置了预算告警
- [ ] 定期监控使用量
- [ ] 考虑部署后端代理

---

## 🆘 应急响应

如果 API Key 泄露：

1. **立即**在 Deepseek 控制台撤销该 Key
2. 检查使用记录，确认是否有未授权使用
3. 生成新的 Key
4. 更新代理服务器配置
5. 分析泄露原因，修复安全漏洞
