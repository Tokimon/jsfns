import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

// import 'highlight.js/styles/github-dark.css';

marked.use(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			return hljs.highlight(code, { language }).value;
		}
	})
);

export const markdown = (md: string) => md && marked(md, { mangle: false, headerIds: false });

export const TSCodeMarkdown = (code: string) => code && markdown(`\`\`\`ts\n${code}\n\`\`\``);
