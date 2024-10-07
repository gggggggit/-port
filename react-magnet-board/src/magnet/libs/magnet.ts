import { MAGNET_RANGE } from '@components/magnet/constants';
import type { IPosition, IPostIt } from '@components/magnet/types';

const isClosed = (standard: number, target: number) => {
  return standard - target > 0 && standard - target < MAGNET_RANGE;
};
const isCloseInner = (standard: number, target: number) => {
  return standard - target > -MAGNET_RANGE && standard - target < MAGNET_RANGE;
};

export const findMagnet = (postItList: IPostIt[], postIt: IPostIt, scrollPosition: IPosition) => {
  let magnetLeft: number | undefined;
  let magnetRight: number | undefined;
  let magnetTop: number | undefined;
  let magnetBottom: number | undefined;
  if (postIt) {
    const postItRight = postIt.left + postIt.width;
    const postItLeft = postIt.left;
    const postItTop = postIt.top;
    const postItBottom = postIt.top + postIt.height;
    postItList
      .filter((item) => {
        if (postIt.activeTabId === item.activeTabId) {
          return false;
        }
        const targetRight = item.left + item.width - scrollPosition.x;
        const targetLeft = item.left - scrollPosition.x;
        const targetTop = item.top - scrollPosition.y;
        const targetBottom = item.top + item.height - scrollPosition.y;
        // targetLeft <= postItLeft - MAGNET_RANGE && targetRight >= postItLeft - MAGNET_RANGE;
        // targetLeft <= postItRight + MAGNET_RANGE && targetRight >= postItRight + MAGNET_RANGE;
        const horizonMatch =
          (targetLeft - MAGNET_RANGE <= postItLeft && targetRight + MAGNET_RANGE >= postItLeft) ||
          (targetLeft - MAGNET_RANGE <= postItRight && targetRight + MAGNET_RANGE >= postItRight) ||
          (targetLeft - MAGNET_RANGE >= postItLeft && targetRight + MAGNET_RANGE <= postItRight);
        const verticalMatch =
          (targetTop - MAGNET_RANGE <= postItTop && targetBottom + MAGNET_RANGE >= postItTop) ||
          (targetTop - MAGNET_RANGE <= postItBottom && targetBottom + MAGNET_RANGE >= postItBottom) ||
          (targetTop - MAGNET_RANGE >= postItTop && targetBottom + MAGNET_RANGE <= postItBottom);
        return horizonMatch && verticalMatch;
      })
      .forEach((item) => {
        const targetRight = item.left + item.width - scrollPosition.x;
        const targetLeft = item.left - scrollPosition.x;
        const targetTop = item.top - scrollPosition.y;
        const targetBottom = item.top + item.height - scrollPosition.y;
        if (item.id === postIt.id) {
          return;
        }
        // check Left
        if (isCloseInner(postItLeft, targetLeft)) {
          magnetLeft = targetLeft;
        }
        if (isClosed(postItLeft, targetRight) && (magnetLeft ? magnetLeft > targetRight : true)) {
          magnetLeft = targetRight;
        }
        // check right
        if (isCloseInner(postItRight, targetRight)) {
          magnetRight = targetRight;
        }
        if (isClosed(targetLeft, postItRight) && (magnetRight ? magnetRight > targetLeft : true)) {
          magnetRight = targetLeft;
        }
        // check top
        if (isCloseInner(postItTop, targetTop)) {
          magnetTop = targetTop;
        }
        if (isClosed(postItTop, targetBottom) && (magnetTop ? magnetTop > targetBottom : true)) {
          magnetTop = targetBottom;
        }
        // check Bottom
        if (isCloseInner(postItBottom, targetBottom)) {
          magnetBottom = targetBottom;
        }
        if (isClosed(targetTop, postItBottom) && (magnetBottom ? magnetBottom > targetTop : true)) {
          magnetBottom = targetTop;
        }
      });
  }
  return { left: magnetLeft, right: magnetRight, top: magnetTop, bottom: magnetBottom };
};
