import hljs from 'highlight.js';
import { marked } from 'marked';
import { type SynchronousOptions, markedHighlight } from 'marked-highlight';

const ho: SynchronousOptions = {
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';

    let html = hljs.highlight(code, { language }).value;
    if (html.includes('?:')) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      html = html.replaceAll(/(?<!\>)\b(\w+)(?!<\/[^>]+>)\?:/g, (_, name) => `<span class="hljs-attr">${name}</span>?:`);
    }

    return html;
  },
};

marked.use(markedHighlight(ho));

const opts = { mangle: false, headerIds: false, gfm: true, breaks: true };

export const markdown = (md: string) => md && marked(md, opts);

export const TSCodeMarkdown = (code: string) => code && markdown(`\`\`\`ts\n${code}\n\`\`\``);
