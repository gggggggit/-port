import type { MouseEvent as ReactMouseEvent } from 'react';

import { numberInRange } from '@components/magnet/constants';
import { findMagnet } from '@components/magnet/libs/magnet';
import type { IBound, IPosition, IPostIt, TDirection } from '@components/magnet/types';

const POST_IT_MIN_SIZE = { w: 350, h: 200 };

function addEventListener(
  postItElement: HTMLDivElement | null,
  postIt: IPostIt,
  postItList: IPostIt[],
  direction: TDirection,
  downPosition: IPosition,
  onUpdatePostItBound: (bound: IBound) => void,
  onUpdateTabWidth: (bound: IBound) => void,
  setIsEditingGlobal: (isEditingGlobal: boolean) => void,
) {
  let { left: resultLeft, top: resultTop, width: resultWidth, height: resultHeight } = postIt;

  const _findMagnet = (calcLeft: number, calcTop: number, calcWidth: number, calcHeight: number) => {
    return findMagnet(
      postItList,
      {
        ...postIt,
        left: calcLeft,
        top: calcTop,
        width: calcWidth,
        height: calcHeight,
      },
      { x: 0, y: 0 },
    );
  };
  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    const { x: downX, y: downY } = downPosition;
    const distanceX = e.clientX - downX;
    const distanceY = e.clientY - downY;
    if (!postItElement) {
      return;
    }
    const { left, top, width, height } = postIt;
    let calcLeft = left;
    let calcTop = top;
    let calcWidth = width;
    let calcHeight = height;

    if (direction.includes('W')) {
      calcLeft = numberInRange(calcLeft + distanceX, 0, width + left - POST_IT_MIN_SIZE.w);
      calcWidth = numberInRange(calcWidth - distanceX, POST_IT_MIN_SIZE.w, width + left);
      const magnet = _findMagnet(calcLeft, calcTop, calcWidth, calcHeight);
      if (magnet.left) {
        calcWidth = Math.max(left - magnet.left + width, POST_IT_MIN_SIZE.w);
        calcLeft = magnet.left;
      }
      // if (magnet.left && width + left < magnet.left) {
      //   calcWidth = Math.max(left - magnet.left + width, POST_IT_MIN_SIZE.w);
      //   calcLeft = magnet.left;
      // }
    }

    if (direction.includes('E')) {
      calcWidth = Math.max(calcWidth + distanceX, POST_IT_MIN_SIZE.w);
      const magnet = _findMagnet(calcLeft, calcTop, calcWidth, calcHeight);
      if (magnet.right) {
        calcWidth = magnet.right - left;
      }
    }

    if (direction.includes('S')) {
      calcHeight = Math.max(calcHeight + distanceY, POST_IT_MIN_SIZE.h);
      const magnet = _findMagnet(calcLeft, calcTop, calcWidth, calcHeight);
      if (magnet.bottom) {
        calcHeight = magnet.bottom - top;
      }
    }

    if (direction.includes('N')) {
      calcTop = numberInRange(calcTop + distanceY, 0, height + top - POST_IT_MIN_SIZE.h);
      calcHeight = numberInRange(calcHeight - distanceY, POST_IT_MIN_SIZE.h, height + top);
      const magnet = _findMagnet(calcLeft, calcTop, calcWidth, calcHeight);
      if (magnet.top) {
        calcTop = magnet.top;
        calcHeight = Math.max(top - magnet.top + height, POST_IT_MIN_SIZE.h);
      }
      // if (magnet.top && height + top < magnet.top) {
      //   calcHeight = top - magnet.top + height;
      //   calcTop = magnet.top;
      // }
    }
    const style = `inset: ${calcTop}px 0 0 ${calcLeft}px; width: ${calcWidth}px; height: ${calcHeight}px;`;
    postItElement.style.cssText += style;
    resultWidth = calcWidth;
    resultHeight = calcHeight;
    resultTop = calcTop;
    resultLeft = calcLeft;

    onUpdateTabWidth({
      left: resultLeft,
      top: resultTop,
      width: resultWidth,
      height: resultHeight,
    });
  };
  const handleMouseUp = (e: MouseEvent) => {
    e.stopPropagation();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    onUpdatePostItBound({ left: resultLeft, top: resultTop, height: resultHeight, width: resultWidth });
    setIsEditingGlobal(false);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
}

export const makeMouseDownInPostItResize =
  (
    postItElement: HTMLDivElement | null,
    postIt: IPostIt,
    postItList: IPostIt[],
    onUpdatePostItBound: (bound: IBound) => void,
    onUpdateTabWidth: (bound: IBound) => void,
    setIsEditingGlobal: (isEditingGlobal: boolean) => void,
  ) =>
  (direction: TDirection) =>
  (e: ReactMouseEvent) => {
    if (e.button === 2) {
      return;
    }
    const { clientX, clientY } = e.nativeEvent;
    const downPosition = { x: clientX, y: clientY };
    setIsEditingGlobal(true);
    addEventListener(postItElement, postIt, postItList, direction, downPosition, onUpdatePostItBound, onUpdateTabWidth, setIsEditingGlobal);
  };
