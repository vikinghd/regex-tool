# AI 增强功能规划

本文档规划如何利用 AI 技术提升用户体验和效率。

---

## 一、正则表达式工具 AI 增强

### 1.1 自然语言生成正则
**功能描述**: 用户用自然语言描述需求，AI 生成正则表达式

**示例**:
> 用户: "匹配邮箱地址"
> AI: 生成 `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`

> 用户: "匹配中国大陆手机号，1开头，第二位3-9，共11位"
> AI: 生成 `1[3-9]\d{9}`

**实现方案**:
- 调用 Claude API / OpenAI API
- Prompt 工程: 正则表达式专家角色
- 返回格式: JSON 包含 pattern、flags、解释

---

### 1.2 正则表达式解释
**功能描述**: 输入一个正则，AI 解释每一部分的含义

**示例**:
> 正则: `^1[3-9]\d{9}$`
> AI 解释:
> - `^` - 字符串开始
> - `1` - 匹配数字 1
> - `[3-9]` - 匹配 3-9 中的任意数字
> - `\d{9}` - 匹配 9 个数字
> - `$` - 字符串结束

---

### 1.3 正则表达式优化建议
**功能描述**: AI 分析用户写的正则，给出优化建议

**示例**:
> 用户正则: `[0-9]`
> AI 建议: 可以简化为 `\d`

> 用户正则: `.*`
> AI 警告: 贪婪匹配可能导致性能问题，建议更精确

---

### 1.4 测试用例自动生成
**功能描述**: 根据正则，AI 自动生成匹配和不匹配的测试用例

**示例**:
> 正则: `\d{4}-\d{2}-\d{2}`
> AI 生成:
> ✅ 匹配: "2024-01-15", "2024-12-31"
> ❌ 不匹配: "2024/01/15", "24-01-15"

---

## 二、JSON 工具 AI 增强

### 2.1 JSON 自然语言查询
**功能描述**: 用自然语言描述，AI 生成 JMESPath / JSONPath 查询

**示例**:
> JSON: `{"users": [{"name": "Alice", "age": 25}, {"name": "Bob", "age": 30}]}`
> 用户: "找出所有年龄大于28的用户名字"
> AI: 生成 `users[?age > 28].name`

---

### 2.2 JSON Schema 生成
**功能描述**: 从 JSON 数据自动生成 JSON Schema

**示例**:
> JSON: `{"name": "test", "count": 123}`
> AI 生成:
```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "count": {"type": "number"}
  }
}
```

---

### 2.3 JSON 模拟数据生成
**功能描述**: 描述数据结构，AI 生成模拟 JSON 数据

**示例**:
> 用户: "生成5个用户数据，包含name、email、age字段"
> AI: 生成真实的模拟数据

---

## 三、通用 AI 增强功能

### 3.1 工具智能推荐
**功能描述**: 根据用户当前操作，AI 推荐可能需要的其他工具

**示例**:
> 用户正在处理 JWT → 推荐: Base64 解码、时间戳转换
> 用户正在处理 JSON → 推荐: JSON Schema、JSON ↔ YAML

---

### 3.2 命令行命令生成
**功能描述**: 描述需求，AI 生成对应的 shell 命令、curl 命令等

**示例**:
> 用户: "用 curl 发送 POST 请求到 https://api.example.com，数据是 JSON"
> AI: `curl -X POST -H "Content-Type: application/json" -d '{"key":"val"}' https://api.example.com`

---

### 3.3 代码片段生成
**功能描述**: 生成各种语言的代码片段

**示例**:
> 用户: "用 JavaScript 验证邮箱"
> AI: 生成完整代码

---

## 四、技术实现方案

### 4.1 架构设计

```
┌─────────────────┐
│   前端 UI       │
└────────┬────────┘
         │
┌────────▼────────┐
│ AI Provider     │  ← 可插拔
│  - Claude API   │
│  - OpenAI API   │
│  - 本地模型     │
└────────┬────────┘
         │
┌────────▼────────┐
│  Prompt 模板库  │
└─────────────────┘
```

### 4.2 Prompt 模板示例

```typescript
// 正则生成 Prompt
const REGEX_GENERATE_PROMPT = `
你是一个正则表达式专家。请根据用户的自然语言描述生成 JavaScript 正则表达式。

要求:
1. 只返回 JSON 格式，不要其他文字
2. JSON 格式: { "pattern": "正则表达式", "flags": "修饰符", "explanation": "简要解释" }

用户描述: {{user_input}}
`;
```

### 4.3 API 集成

使用 Claude API (推荐) 或 OpenAI API:

```typescript
// 调用 AI 接口
async function callAI(prompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  // ...
}
```

### 4.4 本地模型选项 (可选)

对于不想用云端 API 的用户，可以集成:
- WebLLM (浏览器本地运行 LLM)
- Transformers.js

---

## 五、优先级 roadmap

### Phase 1 (MVP) - 高优先级
- [ ] 1.1 自然语言生成正则
- [ ] 1.2 正则表达式解释
- [ ] 2.2 JSON Schema 生成

### Phase 2 - 中优先级
- [ ] 1.3 正则优化建议
- [ ] 1.4 测试用例生成
- [ ] 2.1 JSON 自然语言查询

### Phase 3 - 低优先级
- [ ] 3.1 工具智能推荐
- [ ] 3.2 命令行生成
- [ ] 3.3 代码片段生成
- [ ] 本地模型支持

---

## 六、隐私与安全考虑

1. **可选功能**: AI 功能默认为关闭，用户主动开启
2. **数据透明**: 明确告知用户哪些数据会发送到 AI 服务
3. **配置灵活**: 允许用户配置自己的 API Key
4. **本地优先**: 提供本地模型选项，不上传数据
