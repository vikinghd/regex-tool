import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useI18n } from '../../../../i18n';

const SAMPLE_MARKDOWN = {
  'zh-CN': `# 标题一

## 标题二

### 标题三

这是一段普通文本，包含 **粗体** 和 *斜体*，以及 ~~删除线~~。

## 列表

### 无序列表
- 项目一
- 项目二
- 项目三

### 有序列表
1. 第一项
2. 第二项
3. 第三项

## 链接和图片

[访问 GitHub](https://github.com)

## 代码

\`行内代码\`

\`\`\`javascript
function hello() {
  console.log('Hello World!');
}
\`\`\`

## 表格

| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25 | 北京 |
| 李四 | 30 | 上海 |

## 引用

> 这是一段引用文本
> 可以有多行

## 分隔线

---

以上是 Markdown 示例！
`,
  'en-US': `# Heading One

## Heading Two

### Heading Three

This is a paragraph with **bold** and *italic*, and ~~strikethrough~~.

## Lists

### Unordered List
- Item one
- Item two
- Item three

### Ordered List
1. First item
2. Second item
3. Third item

## Links and Images

[Visit GitHub](https://github.com)

## Code

\`inline code\`

\`\`\`javascript
function hello() {
  console.log('Hello World!');
}
\`\`\`

## Table

| Name | Age | City |
|------|-----|------|
| John | 25 | Beijing |
| Jane | 30 | Shanghai |

## Blockquote

> This is a blockquote
> that can span multiple lines

## Horizontal Rule

---

That's the Markdown sample!
`
};

export function MarkdownTool() {
  const [input, setInput] = useState('');
  const { t, language } = useI18n();

  const loadSample = () => {
    setInput(SAMPLE_MARKDOWN[language] || SAMPLE_MARKDOWN['en-US']);
  };

  const clear = () => {
    setInput('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-bg-surface)] rounded-xl shadow-xl border border-[var(--color-border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('markdown.title')}</h2>
          <div className="flex gap-2">
            <button
              onClick={loadSample}
              className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm"
            >
              {t('markdown.sample')}
            </button>
            <button
              onClick={clear}
              className="px-4 py-2 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] rounded-lg hover:bg-[var(--color-bg-elevated)] transition-colors text-sm"
            >
              {t('markdown.clear')}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm text-[var(--color-text-secondary)]">{t('markdown.input')}</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'zh-CN' ? '在此输入 Markdown...' : 'Enter Markdown here...'}
              className="w-full h-96 px-3 py-2 bg-[var(--color-bg-muted)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none placeholder-[var(--color-text-muted)]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-[var(--color-text-secondary)]">{t('markdown.preview')}</label>
            <div className="w-full h-96 px-4 py-3 bg-[var(--color-bg-muted)] border border-[var(--color-border)] rounded-lg overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ ...props }) => <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mt-4 mb-2" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-4 mb-2" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-lg font-medium text-[var(--color-text-primary)] mt-3 mb-1" {...props} />,
                    p: ({ ...props }) => <p className="text-[var(--color-text-primary)] mb-2" {...props} />,
                    a: ({ ...props }) => <a className="text-[var(--color-accent)] hover:text-[var(--color-accent)] underline" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc list-inside text-[var(--color-text-primary)] mb-2" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal list-inside text-[var(--color-text-primary)] mb-2" {...props} />,
                    li: ({ ...props }) => <li className="mb-1" {...props} />,
                    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-[var(--color-accent)] pl-4 my-4 text-[var(--color-text-secondary)] italic" {...props} />,
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <div className="my-4">
                          <pre className="bg-[var(--color-bg-surface)] rounded-lg p-4 overflow-x-auto">
                            <code className={className} {...props}>{children}</code>
                          </pre>
                        </div>
                      ) : (
                        <code className="bg-[var(--color-bg-elevated)] text-[var(--color-accent)] px-1.5 py-0.5 rounded text-sm" {...props}>{children}</code>
                      );
                    },
                    table: ({ ...props }) => (
                      <div className="my-4 overflow-x-auto">
                        <table className="w-full text-[var(--color-text-primary)]" {...props} />
                      </div>
                    ),
                    thead: ({ ...props }) => <thead className="bg-[var(--color-bg-surface)]" {...props} />,
                    th: ({ ...props }) => <th className="px-4 py-2 text-left font-semibold border border-[var(--color-border)]" {...props} />,
                    td: ({ ...props }) => <td className="px-4 py-2 border border-[var(--color-border)]" {...props} />,
                    hr: ({ ...props }) => <hr className="my-6 border-[var(--color-border)]" {...props} />,
                    strong: ({ ...props }) => <strong className="font-semibold text-[var(--color-text-primary)]" {...props} />,
                    em: ({ ...props }) => <em className="italic text-[var(--color-text-primary)]" {...props} />,
                    del: ({ ...props }) => <del className="line-through text-[var(--color-text-muted)]" {...props} />,
                  }}
                >
                  {input || (language === 'zh-CN' ? '预览将显示在这里...' : 'Preview will appear here...')}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
