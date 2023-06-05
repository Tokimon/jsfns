<script context="module" lang="ts">
  import hljs from 'highlight.js';
  import { marked } from 'marked';
  import { markedHighlight } from "marked-highlight";
  
  import "highlight.js/styles/github-dark.css";

  marked.use(markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  }));
</script>

<script lang="ts">
  export let text = '';
</script>

{@html marked(text, { mangle: false, headerIds: false })}