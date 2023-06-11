import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

const opts = { mangle: false, headerIds: false, gfm: true, breaks: true };

export const markdown = (md: string) => md && marked(md, opts);

export const TSCodeMarkdown = (code: string) => code && markdown(`\`\`\`ts\n${code}\n\`\`\``);
