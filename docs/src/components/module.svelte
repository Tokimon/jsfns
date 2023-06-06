<script context="module" lang="ts">
	import type { FunctionKind, ModuleKind } from 'src/types';
	import { typeReferences } from '../stores/typeReferences';
	import CallSignature from './call-signature.svelte';

  function getFunctions(module: ModuleKind): FunctionKind[] {
    let methodFunc: FunctionKind | undefined;
    const other: FunctionKind[] = []

    for (const child of module.children) {
      if (child.kindString !== 'Function') continue;

      if (child.name === 'default') {
        if (!methodFunc) methodFunc = child
      } else if (child.name === module.name) {
        methodFunc = child
      } else {
        other.push(child)
      }
    }

    return methodFunc ? [methodFunc].concat(other) : other;
  }

  function getTypeReferences(module: ModuleKind) {
    for (const child of module.children) {
      if (child.kindString === 'Namespace') {
        for (const type of child.children)
          if (type.kindString === 'Type alias')
            typeReferences.add(type);

      } else if(child.kindString === 'Type alias') {
        typeReferences.add(child);
      }
    }
  }
</script>

<script lang="ts">
  export let module: ModuleKind;

  $: functions = getFunctions(module);
  $: { getTypeReferences(module); }
</script>

<style>
  h1 {
    margin: 0;
    padding: 0 15px;
    line-height: 50px;
    background: #394957;
    font-size: 30px;
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
      {#each functions as func}
        {#each func.signatures as signature}
          <CallSignature name={func.name === 'default' ? module.name : func.name} {signature} />
        {/each}
      {/each}
    </div>
  </div>
</section>