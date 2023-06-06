<script lang="ts">
	import { onMount } from "svelte";
	import { typeReferences, type StoreDictionary } from "../stores/typeReferences";
	import { TSCode } from "../utils/ts-code";
	import { createTypeString } from "../utils/typeString";
	import Markdown from "./markdown.svelte";

  export let types: string[] = [];

  let references: StoreDictionary = {};
  let markdown = '';

  $: {
    const expressions = types.map((typeName) => {
      const kind = references[typeName];
      if (!kind) return '';
      return `type ${typeName} = ${createTypeString(typeName)(kind.type)};`;
    }).filter((s) => !!s);

    if (expressions.length) markdown = TSCode(expressions.join('\n\n'));
  }

  onMount(() => typeReferences.subscribe(value => { references = value; }))
</script>

{#if markdown}
  <details>
    <summary>Types</summary>
    <Markdown text={markdown} />
  </details>
{/if}
