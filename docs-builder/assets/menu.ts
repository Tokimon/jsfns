import fuzzySearch from '@jsfns/core/fuzzySearch';
import { addClass } from '@jsfns/web/addClass';
import { css } from '@jsfns/web/css';
import { findById } from '@jsfns/web/findById';
import { findByQuery, findOneByQuery } from '@jsfns/web/findByQuery';
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

function initSearch() {
  const SearchField = findById<HTMLInputElement>('Menu-Search');
  if (!SearchField) return;

  const menuItems = findByQuery('#Menu .menu-list-item');

  on(SearchField, 'input', () => {
    const searchWord = SearchField.value;

    menuItems.forEach((itm) => {
      const isMatch = fuzzySearch(itm.id.slice(5), searchWord);
      css(itm, 'display', !isMatch ? 'none' : null);
    });
  });
}

function initCurrentChange() {
  const Menu = findById('Menu');
  const closeMenu = () => toggleClass(Menu, 'open', false);

  on('click', () => toggleClass(Menu, 'open'), { delegate: '.menu-trigger' });
  on('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.className !== 'menu-trigger' && !target.closest('#Menu')) closeMenu();
  });

  on('keyup', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  on(window, 'hashchange', onHashChange);
  onHashChange();
}

export function initMenu() {
  initCurrentChange();
  initSearch();
}
