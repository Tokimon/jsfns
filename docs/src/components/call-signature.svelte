<script context="module" lang="ts">
  import type { CallSignatureKind, DocType } from 'src/types';
  import Markdown from "./markdown.svelte";

  function typeString(type: DocType): string {
    switch(type.type) {
      case 'intrinsic': return type.name;
      case 'tuple': return `[${type.elements?.map(typeString).join(', ')}]`;
      case 'array': return type.elementType.name + '[]';
      case 'reference': return type.name;
      default: return type.type;
    }
  }

  function params(parameters: CallSignatureKind['parameters']) {
    return (parameters?.map(({name, flags, type, defaultValue}) => {
      const optional = flags.isOptional ? '?' : '';
      const defVal = defaultValue ? ' = ' + defaultValue : '';

      return `${name}${optional}: ${typeString(type)}${defVal}`
    }) || []).join(', ');
  }
</script>

<script lang="ts">
  export let name: string;
  export let signature: CallSignatureKind;
  const { comment, type } = signature;

  $: examples = comment?.tags?.filter(({tag}) => tag === 'example') || [];
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }

  .returns {
    color: gray;
  }
  
  .returns span {
    color: #a2a2a2;
  }

  summary {
    font-size: 12px;
    cursor: pointer;
    color: gray;
  }

  details[open] summary {
    margin-bottom: 5px;
  }
</style>

<div class="call-signature">
  <!-- <Highlight language={highlightTSLang} code={`${name}(${params(signature.parameters)})`} /> -->
  <Markdown text={`\`\`\`ts
${name}(${params(signature.parameters)})
  \`\`\``} />

  {#if examples.length || comment}
    <div class="content">
      {#if comment}
        <div class="description">
          <Markdown text={comment.text || comment.shortText} />

          {#if comment.returns}
            <p class="returns"><string class="hljs-keyword">@returns</string> <span>[{type.name}]</span> {comment.returns}</p>
          {/if}
        </div>
      {/if}
      
      
      {#if examples.length}
      <details open>
        <summary>Examples</summary>
        {#each examples as example}
        <Markdown text={example.text} />
        <!-- {@html marked(example.text, { mangle: false, headerIds: false })} -->
        {/each}
      </details>
      {/if}
    </div>
  {/if}
</div>