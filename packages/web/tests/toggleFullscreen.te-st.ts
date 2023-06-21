import toggleFullscreen from '@js-fns/web/toggleFullscreen';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('ToggleClass');

describe('"toggleFullscreen"', () => {
  describe('Activates fullscreen', () => {
    it('For the entire document when no element is given');
    it('For the given element');
    it('With the given fullscreen options');
  });

  describe('It exits fullscreen when', () => {
    it('Requesting fullscreen on another element');
    it('Being called with the same element');
  });
});
