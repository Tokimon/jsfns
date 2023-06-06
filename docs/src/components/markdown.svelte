<script context="module" lang="ts">
  import prepareMarkdown from '../utils/prepareMarkdown';
  const marked = prepareMarkdown();
</script>

<script lang="ts">
  export let text = '';
</script>

{@html marked(text, { mangle: false, headerIds: false })}