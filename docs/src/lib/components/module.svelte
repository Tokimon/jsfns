<script context="module" lang="ts">
	import { type Kind_Function, type Kind_Module, Kind } from '$lib/types';
	import { typeReferences } from '$lib/stores/typeReferences';
	import CallSignature from './call-signature.svelte';

  function getFunctions(module: Kind_Module): Kind_Function[] {
    let methodFunc: Kind_Function | undefined;
    const other: Kind_Function[] = []

    for (const child of module.children) {
      if (child.kind !== Kind.Function) continue;

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

  function getTypeReferences(module: Kind_Module) {
    for (const child of module.children) {
      if (child.kind === Kind.TypeAlias) typeReferences.add(child);
    }
  }
</script>

<script lang="ts">
  export let module: Kind_Module;

  $: functions = getFunctions(module);
  $: { getTypeReferences(module); }
</script>

<style>
  .module {
    padding-top: var(--header-hight);
  }

  .content {
    background: #232f39;
    border-radius: 5px;
    margin-top: 15px;
    box-shadow: rgba(0,0,0,0.5) 0 0 5px 0;
    transition: box-shadow 1s;
  }

  .content:hover {
    box-shadow: cornflowerblue 0 0 5px 0;
    transition: box-shadow 0.2s;
  }

  .module:target .content,
  .module:target .content:hover {
    box-shadow: cornflowerblue 0 0 5px 3px;
  }

  .content h1 {
    margin: 0;
    padding: 0 15px;
    line-height: 50px;
    background: #394957;
    font-size: 18px;
    font-weight: 400;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .content h1 a {
    color: currentColor;
    text-decoration: none;
  }

  .content h1 a:hover b,
  .content h1 a:focus b {
    color: currentColor;
  }

  .content h1 b {
    color: gray;
    transition: color 0.2s;
  }

  .signatures {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  @container (min-width: 600px) {
    .content h1 {
      font-size: 25px;
    }
  }
</style>

<section class="module" id={module.name}>
  <div class="content">
    <h1><a href={'#' + module.name}><b>#</b> {module.name}</a></h1>

    <div class="signatures">
      {#each functions as func}
        {#each func.signatures as signature}
          <CallSignature name={func.name === 'default' ? module.name : func.name} {signature} />
        {/each}
      {/each}
    </div>
  </div>
</section>