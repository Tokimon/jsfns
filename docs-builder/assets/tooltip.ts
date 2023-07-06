import { addClass } from '@jsfns/web/addClass';
import { attr } from '@jsfns/web/attr';
import { css } from '@jsfns/web/css';
import { findById } from '@jsfns/web/findById';
import { findByQuery } from '@jsfns/web/findByQuery';
import { hasClass } from '@jsfns/web/hasClass';
import { innerSize } from '@jsfns/web/innerSize';
import { on } from '@jsfns/web/on';
import { outerSize } from '@jsfns/web/outerSize';
import { position } from '@jsfns/web/position';
import { removeClass } from '@jsfns/web/removeClass';
import viewport from '@jsfns/web/viewport';

function positionTooltip(elm: HTMLElement, tooltip: HTMLElement) {
  const vp = viewport();
  if (!vp) return;

  const vpSize = innerSize(vp);
  const { top, bottom, left } = position(elm);
  const elmWidth = outerSize(elm).width;
  const tpSize = outerSize(tooltip);

  let tooltipTop = bottom + 10;
  let tooltipLeft = Math.round(left + elmWidth / 2 - tpSize.width / 2);

  if (bottom + tpSize.height - vp.scrollTop > vpSize.height) {
    tooltipTop = top - tpSize.height - 10;
  }

  const tooltipMaxRight = tooltipLeft + tpSize.width + 15;
  if (tooltipMaxRight > vpSize.width) tooltipLeft -= tooltipMaxRight - vpSize.width;

  css(tooltip, { left: tooltipLeft, top: tooltipTop, maxWidth: vpSize.width - 30 });
}

export function initTooltips() {
  findByQuery('.module .hljs-title.class_').forEach((element) => {
    if (!element) return;
    if (hasClass(element.previousElementSibling, 'hljs-keyword')) return;
    attr(element, 'data-custom-type', element.innerHTML.trim());
  });

  on(
    'mouseenter',
    (e) => {
      const elm = e.currentTarget as HTMLElement;
      if (!elm) return;

      const tooltip = findById('Tooltip-' + elm.dataset.customType?.trim());

      if (tooltip) {
        addClass(tooltip, 'show');
        positionTooltip(elm, tooltip);
      }
    },
    { delegate: '[data-custom-type]', capture: true }
  );

  on(
    'mouseleave',
    (e) => {
      const elm = e.currentTarget as HTMLElement;
      if (!elm) return;

      const tooltip = findById('Tooltip-' + elm.dataset.customType?.trim());

      if (tooltip) removeClass(tooltip, 'show');
    },
    { delegate: '[data-custom-type]', capture: true }
  );
}
