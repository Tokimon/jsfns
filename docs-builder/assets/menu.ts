import { addClass } from '@jsfns/web/addClass';
import { findById } from '@jsfns/web/findById';
import { findOneByQuery } from '@jsfns/web/findByQuery';
import { on } from '@jsfns/web/on';
import { removeClass } from '@jsfns/web/removeClass';
import { toggleClass } from '@jsfns/web/toggleClass';

function onHashChange() {
  const moduleName = location.hash.slice(1);
  const current = findOneByQuery('.menu-list-item.current');

  if (moduleName) {
    const menuItem = findById('Menu-' + moduleName);

    if (menuItem === current) return;

    addClass(menuItem, 'current');
  }

  removeClass(current, 'current');
}

export function initMenu() {
  on('click', () => toggleClass(findById('Menu'), 'open'), { delegate: '.menu-trigger' });
  on(window, 'hashchange', onHashChange);
  onHashChange();
}
