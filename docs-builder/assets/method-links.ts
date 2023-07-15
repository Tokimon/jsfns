import findById from '@jsfns/web/findById';
import { findByQuery } from '@jsfns/web/findByQuery';

export function initMethodLinks() {
  findByQuery('p code').forEach((elm) => {
    const name = elm.innerText;
    if (findById(name)) elm.innerHTML = `<a href="#${name}">${name}</a>`;
  });
}
