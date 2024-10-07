import { numberInRange } from '@components/magnet/constants';
import { findMagnet } from '@components/magnet/libs/magnet';
import type { IBound, IPosition, IPostIt } from '@components/magnet/types';

import { IMagnetBoardMargin } from '../types';

function addEventListener(
  boardMargin: IMagnetBoardMargin,
  postItElement: HTMLDivElement | null,
  postIt: IPostIt,
  postItList: IPostIt[],
  scrollPosition: IPosition,
  downPosition: IPosition,
  onChangeIsEditing: (isEditing: boolean) => void,
  onUpdatePostItBound: (bound: IBound) => void,
  onMouseMoveUpdateOverlap: (id: string, clientX: number, clientY: number) => void,
  setIsEditingGlobal: (isEditingGlobal: boolean) => void,
) {
  let left = postIt.left;
  let top = postIt.top;
  const { width, height } = postIt;

  const handleMouseMove = (e: MouseEvent) => {
    const windowScroll = {x: window.scrollX, y: window.scrollY}
    e.stopPropagation();
    const { x: downX, y: downY } = downPosition;
    const { left: LEFT_MARGIN, top: TOP_MARGIN } = boardMargin;
    if (!postItElement) {
      return;
    }
    const calcLeft = numberInRange(
      e.clientX - LEFT_MARGIN - downX,
      -scrollPosition.x - windowScroll.x,
      window.innerWidth - downX - LEFT_MARGIN,
    );
    const calcTop = numberInRange(
      e.clientY - TOP_MARGIN - downY,
      -scrollPosition.y - windowScroll.y,
      window.innerHeight - downY - TOP_MARGIN,
    );
    const magnet = findMagnet(postItList, { ...postIt, left: calcLeft, top: calcTop, width, height }, scrollPosition);
    left =
      (magnet.left !== undefined ? magnet.left : magnet.right !== undefined ? magnet.right - width : calcLeft) +
      scrollPosition.x + windowScroll.x;
    top =
      (magnet.top !== undefined ? magnet.top : magnet.bottom !== undefined ? magnet.bottom - height : calcTop) +
      scrollPosition.y + windowScroll.y;
    postItElement.style.cssText += `inset: ${top}px 0 0 ${left}px`;
    onMouseMoveUpdateOverlap(postIt.id, e.clientX, e.clientY);
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.stopPropagation();
    onChangeIsEditing(false);
    setIsEditingGlobal(false);
    onUpdatePostItBound({ left, top, width, height });
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
}

export const makeMouseDownEventInPostItMove =
  (
    boardMargin: IMagnetBoardMargin,
    postItElement: HTMLDivElement | null,
    postIt: IPostIt,
    postItList: IPostIt[],
    scrollPosition: IPosition,
    onChangeIsEditing: (isEditing: boolean) => void,
    onUpdatePostItBound: (bound: IBound) => void,
    onMouseMoveUpdateOverlap: (id: string, clientX: number, clientY: number) => void,
    setIsEditingGlobal: (isEditingGlobal: boolean) => void,
  ) =>
  (e: React.MouseEvent) => {
    if (e.button === 2) {
      return;
    }
    const { offsetX, offsetY } = e.nativeEvent;
    const downPosition = {
      //x 에서 더해지는 10은 header의 padding으로 확인되었지만
      //y 에서 더해지는 2는 아직 정확한 원인은 파악하지 못했습니다.
      x: Math.max(offsetX, 0),
      y: Math.max(offsetY, 0),
    };
    onChangeIsEditing(true);
    setIsEditingGlobal(true);
    addEventListener(
      boardMargin,
      postItElement,
      postIt,
      postItList,
      scrollPosition,
      downPosition,
      onChangeIsEditing,
      onUpdatePostItBound,
      onMouseMoveUpdateOverlap,
      setIsEditingGlobal
    );
  };
