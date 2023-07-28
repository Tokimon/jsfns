import { toggleList } from './toggleList';

export function initVersions() {
  toggleList('.page-version .version-list', '.page-version .current-version');
}
