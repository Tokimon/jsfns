<script context="module" lang="ts">
  import type { Kind_Signature } from '$lib/types';
  import { buildSummary } from "$lib/utils/buildSummary";
  import { buildFunction } from '$lib/utils/buildFunction';
  import { buildTypeAlias } from "$lib/utils/buildTypeAlias";
  import { TSCode } from '$lib/utils/ts-code';
  import { createTypeString } from "$lib/utils/typeString";
  import { onMount } from 'svelte';
  import { createFloatingActions } from "svelte-floating-ui";
  import { flip, offset, shift } from "svelte-floating-ui/dom";
  import { typeReferences, type StoreDictionary } from "../stores/typeReferences";
  import Markdown from "./markdown.svelte";
</script>

<script lang="ts">
  export let name: string;
  export let signature: Kind_Signature;
  const { comment } = signature;

  let references: StoreDictionary = {};
  let expressions = new Map<string, string>();
  let expressionsMarkdown = '';
  let hoveredType = '';

  const typeNames: string[] = [];
  const typeString = createTypeString(name, typeNames);

  let definitionElement: HTMLDivElement | undefined;

  const [ floatingRef, floatingContent ] = createFloatingActions({
    strategy: "absolute",
    placement: "top",
    middleware: [
      offset(6),
      flip(),
      shift(),
    ]
  });

  const typeEnter = (e: MouseEvent) => {
    const target = (e.currentTarget as HTMLElement);
    const typeName = target.dataset.type;

    if (typeName) {
      floatingRef(target);
      hoveredType = typeName;
    }
  };
  
  const typeLeave = () => { hoveredType = ''; };

  const buildExpression = (typeName: string) => buildTypeAlias(typeName, references[typeName])

  $: examples = comment?.blockTags?.filter(({tag}) => tag === '@example').map(({ content }) => buildSummary(content)) || [];

  $: {
    expressions.clear();
    
    setTimeout(() => {
      for (const typeName of typeNames) {
        const expression = buildExpression(typeName);
        if (expression) expressions.set(typeName, expression);
      }
  
      if (expressions.size) expressionsMarkdown = TSCode([...expressions.values()].join('\n\n'));
    })
  }

  onMount(() => {
    // TODO can this be done simpler with $typeReferences?
    const unsubscribe = typeReferences.subscribe(value => { references = value; });

    const classTypeNodes = definitionElement?.querySelectorAll<HTMLElement>('.definition .hljs-title.class_');

    classTypeNodes?.forEach((node) => {
      const typeName = node.innerText;
      if (!references[typeName]) return;

      node.dataset.type = typeName;
      node.addEventListener('mouseenter', typeEnter);
      node.addEventListener('mouseleave', typeLeave);
    });

    return () => {
      unsubscribe();

      classTypeNodes?.forEach((node) => {
        node.removeEventListener('mouseenter', typeEnter);
        node.removeEventListener('mouseleave', typeLeave);
      });
    }
  })
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
  }
  
  .definition {
    font-size: 14px;
  }

  :global(.definition .hljs-title.class_[data-type]) {
    cursor: default;
  }

  .description {
    font-size: 18px;
    color: #aaa;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tooltip {
    border-radius: 5px;
    box-shadow: #1a1f23 0 4px 8px -2px;
    overflow: hidden;
    border: 1px solid #333;
    z-index: 9;
  }

  @container (min-width: 750px) {
    .definition {
      font-size: 20px;
    }
  }
</style>

<div class="call-signature">
  <div class="definition" bind:this={definitionElement}>
    <Markdown text={TSCode(buildFunction(typeString, name, signature))} />
  </div>

  {#if examples.length || comment || typeNames.length}
    <div class="content">
      {#if comment}
        <div class="description">
          <Markdown text={buildSummary(comment?.summary)} />
        </div>
      {/if}
      
      {#if examples.length}
        <details>
          <summary>Examples</summary>
          {#each examples as example}
            <Markdown text={example} />
          {/each}
        </details>
      {/if}

      {#if expressionsMarkdown}
        <details>
          <summary>Types</summary>
          <Markdown text={expressionsMarkdown} />
        </details>
      {/if}

    </div>
  {/if}

  {#if hoveredType}
    <div class="tooltip" use:floatingContent>
      <Markdown text={TSCode(buildExpression(hoveredType))} />
    </div>
  {/if}
</div>