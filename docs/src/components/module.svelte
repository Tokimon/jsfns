<script context="module" lang="ts">
	import type { ModuleKind } from 'src/types';
	import CallSignature from './call-signature.svelte';

  function getDefaultSignatures(children: ModuleKind['children']) {
    for (const child of children)
      if (child.kindString === 'Function' && child.name === 'default')
        return child.signatures || []

    return [];
  }
</script>

<script lang="ts">
  export let module: ModuleKind;

  $: defaultSignatures = getDefaultSignatures(module.children);
</script>

<style>
  h1 {
    margin: 0;
    padding: 0 15px;
    line-height: 50px;
    background: #394957;
  }

  h1 b {
    color: gray;
  }

  .content {
    background: #232f39;
    border: transparent 3px solid;
    background-clip: content-box;
  }

  .module {
    padding-top: var(--header-hight);
  }

  .module:target .content {
    /* background: #232f39; */
    border-color: #aaa;
  }

  .signatures {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>

<section class="module" id={module.name}>
  <div class="content">
    <h1><b>#</b> {module.name}</h1>

    <div class="signatures">
      {#each defaultSignatures as signature}
        <CallSignature name={module.name} signature={signature} />
      {/each}
    </div>
  </div>
</section>