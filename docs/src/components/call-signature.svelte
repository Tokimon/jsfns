<script context="module" lang="ts">
  import type { CallSignatureKind } from 'src/types';
  import { buildComment } from "../utils/buildComment";
  import { buildFunction } from '../utils/buildFunction';
  import { TSCode } from '../utils/ts-code';
  import { createTypeString } from "../utils/typeString";
  import References from './References.svelte';
  import Markdown from "./markdown.svelte";
</script>

<script lang="ts">
  export let name: string;
  export let signature: CallSignatureKind;
  const { comment } = signature;

  const typeReferences: string[] = [];
  const typeToString = createTypeString(name, typeReferences);

  $: examples = comment?.tags?.filter(({tag}) => tag === 'example') || [];
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .definition {
    font-size: 20px;
  }

  .description {
    font-size: 18px;
    color: #aaa;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>

<div class="call-signature">
  <div class="definition">
    <Markdown text={TSCode(buildFunction(typeToString, name, signature))} />
  </div>

  {#if examples.length || comment || typeReferences.length}
    <div class="content">
      {#if comment}
        <div class="description">
          <Markdown text={buildComment(comment)} />
        </div>
      {/if}
      
      {#if examples.length}
        <details>
          <summary>Examples</summary>
          {#each examples as example}
            <Markdown text={example.text} />
          {/each}
        </details>
      {/if}

      {#if typeReferences.length}
        <References types={typeReferences} />
      {/if}
    </div>
  {/if}
</div>