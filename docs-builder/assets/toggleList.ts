import { findOneByQuery } from '@jsfns/web/findByQuery';
import { on } from '@jsfns/web/on';
import { toggleClass } from '@jsfns/web/toggleClass';

export function toggleList(listSelector: string, triggerSelector: string) {
  const List = findOneByQuery(listSelector);
  if (!List) return;

  const close = () => toggleClass(List, 'open', false);

  on('click', () => toggleClass(List, 'open'), { delegate: triggerSelector });

  // Closing the menu
  on('click', close, { when: (e) => (e.target as HTMLElement)?.matches(`:not(${triggerSelector}):not(${listSelector} *)`) });
  on('keyup', close, { when: (e) => e.key === 'Escape' });
}
