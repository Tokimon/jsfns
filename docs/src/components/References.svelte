<script lang="ts">
	import { createTypeString } from "../utils/typeString";
  import { typeReferences, type StoreDictionary } from "../stores/typeReferences";
	import Markdown from "./markdown.svelte";

  export let types: string[] = [];

  let references: StoreDictionary;
	typeReferences.subscribe(value => { references = value; });

  let markdown = '';

  $: {
    const expressions = types.map((typeName) => {
      const kind = references[typeName];
      if (!kind) return '';
      return `type ${typeName} = ${createTypeString(typeName)(kind.type)};`;
    }).filter((s) => !!s);

    if (expressions.length)
      markdown = `\`\`\`ts\n${expressions.join('\n\n')}\n\`\`\``;
  }
</script>

{#if markdown}
  <details open>
    <summary>Types</summary>
    <Markdown text={markdown} />
  </details>
{/if}
