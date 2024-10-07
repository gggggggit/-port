import { type FC, type MouseEvent as RMouseEvent, useContext, useEffect, useRef, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import IconCommon from '@components/IconCommon';
import MagnetPostItTabTooltip from '@components/magnet/MagnetPostItTabTooltip';
import {
  styleTabItem,
  styleTabItemBorder,
  styleTabItemClose,
  styleTabItemContainer,
  styleTabItemLabel,
} from '@components/magnet/MagnetPostItTabs/styles.css';
import { HEADER_CONTAINER_PREFIX_ID, TAB_CONTAINER_PREFIX_ID, numberInRange } from '@components/magnet/constants';
import { POSTIT_PREFIX_ID } from '@components/magnet/constants';
import { PostItTabContext } from '@components/magnet/context/PostItTabContext';
import type { IBound, IMagnetBoardMargin, IPostIt, ITabItem } from '@components/magnet/types';
import { globalTheme } from '@styles/contract.css';

interface IRectItem {
  id: string;
  clientRect: DOMRect;
}

interface IProps {
  active: boolean;
  boardMargin: IMagnetBoardMargin;
  items: ITabItem[];
  postIt: IPostIt;
  onChangeTabId: (id: string) => void;
  onChangeIsEditing: (isEditing: boolean) => void;
  onUpdateActivePostItId: (id: string) => void;
  onUpdateTabItems: (items: ITabItem[]) => void;
  onDivideTabItem: (id: string, clientY: number, mouseY: number) => void;
  onRemoveTabItem: (id: string) => void;
  onUpdatePostItBound: (bound: IBound) => void;
  onMouseMoveUpdateOverlap: (id: string, clientX: number, clientY: number) => void;
}

const MOVE_DIVIDE_SAFE_AREA = 30;

const MagnetPostItTabs: FC<IProps> = ({
  active,
  boardMargin,
  items,
  postIt,
  onChangeIsEditing,
  onChangeTabId,
  onUpdateActivePostItId,
  onUpdateTabItems,
  onDivideTabItem,
  onRemoveTabItem,
  onUpdatePostItBound,
  onMouseMoveUpdateOverlap,
}) => {
  const { id: postItId, activeTabId } = postIt;
  const {
    mouseDownItem,
    setMouseDownItem,
    dragTargetId,
    setDragTargetId,
    setSyncIsEditingId,
    overlapPostItId,
    tabWidth,
    setIsEditingGlobal,
  } = useContext(PostItTabContext);
  const [isAfterDivide, setIsAfterDivide] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseDownYRef = useRef(0);
  const dividePostItBound = useRef<IBound>();
  const [hoverTab, setHoverTab] = useState<ITabItem | undefined>();

  useEffect(() => {
    const onBlur = () => {
      setHoverTab(undefined);
    };
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  useEffect(() => {
    if (dragTargetId === '' || dragTargetId !== activeTabId || postItId !== activeTabId) {
      return;
    }
    const onMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      setAdjustCurrentTabLeft();
      if (isAfterDivide) {
        setIsAfterDivide(false);
        const bound = dividePostItBound.current;
        if (!bound) {
          return;
        }
        onUpdatePostItBound(bound);
      } else {
        updateLeftTabItems();
      }
      setIsEditingGlobal(false);
      setSyncIsEditingId('');
      onChangeIsEditing(false);
      setDragTargetId('');
    };
    const onMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      if (onMoveCurrentElementAfterDivide(e.clientX, e.clientY)) {
        return;
      }
      if (onUpdateDivide(e.clientY)) {
        return;
      }
      const movementX = e.movementX;
      if (!isHorizontalMove(movementX)) {
        return;
      }
      updateTargetElementLeft(movementX);
      setMoveTabItem(movementX);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [postIt, overlapPostItId, dragTargetId, isAfterDivide]);

  const isHorizontalMove = (movementX: number) => {
    const targetElement = document.getElementById(dragTargetId);
    const containerElement = containerRef.current;
    if (!containerElement || !targetElement) {
      return false;
    }
    const { left, right } = targetElement.getBoundingClientRect();
    const { left: min, right: max } = containerElement.getBoundingClientRect();
    if ((movementX < 0 && left <= min) || (movementX > 0 && right >= max)) {
      return false;
    }
    return true;
  };

  const onUpdateDivide = (clientY: number) => {
    const targetElement = document.getElementById(HEADER_CONTAINER_PREFIX_ID + postIt.id);
    if (!targetElement) {
      return false;
    }
    const { top, bottom } = targetElement.getBoundingClientRect();
    if (top - MOVE_DIVIDE_SAFE_AREA > clientY || bottom + MOVE_DIVIDE_SAFE_AREA < clientY) {
      setIsAfterDivide(true);
      onDivideTabItem(dragTargetId, clientY, mouseDownYRef.current);
      return true;
    }
    return false;
  };

  const onMoveCurrentElementAfterDivide = (clientX: number, clientY: number) => {
    const postItElement = document.getElementById(POSTIT_PREFIX_ID + postItId);
    if (!postItElement) {
      return false;
    }
    if (!isAfterDivide) {
      return false;
    }
    const { left: downX, top: downY } = mouseDownItem;
    const { left: LEFT_MARGIN, top: TOP_MARGIN } = boardMargin;
    const calcLeft = numberInRange(clientX - LEFT_MARGIN + downX, 0, window.innerWidth - LEFT_MARGIN + downX);
    const calcTop = numberInRange(clientY - TOP_MARGIN + downY, 0, window.innerHeight - TOP_MARGIN + downY);
    postItElement.style.cssText += `inset: ${calcTop}px 0 0 ${calcLeft}px`;
    dividePostItBound.current = {
      top: calcTop,
      left: calcLeft,
      height: postIt.height,
      width: postIt.width,
    };
    onMouseMoveUpdateOverlap(postIt.id, clientX, clientY);
    return true;
  };

  const setMouseDownItems = (event: RMouseEvent) => {
    mouseDownYRef.current = event.clientY;
    const postItElement = document.getElementById(POSTIT_PREFIX_ID + postItId);
    if (!postItElement) {
      return;
    }
    setHoverTab(undefined);
    const { left, top, width, height } = postItElement.getBoundingClientRect();
    setMouseDownItem({
      left: left - event.clientX,
      top: top - event.clientY,
      width,
      height,
    });
  };

  const handleMouseDown = (event: RMouseEvent, tabId: string) => {
    event.stopPropagation();
    // mouse 우클릭으로 선택안되도록 설정, 우클릭을 하게 되면 mouseUp 이벤트를 타지 않음.
    // https://stackoverflow.com/questions/2405771/is-right-click-a-javascript-event
    if (event.button === 2) {
      return;
    }
    onUpdateActivePostItId(tabId);
    if (items.length === 1) {
      return;
    }
    if (postIt.id !== tabId) {
      setSyncIsEditingId(tabId);
    } else {
      onChangeIsEditing(true);
    }
    setIsEditingGlobal(true);
    onChangeTabId(tabId);
    setDragTargetId(tabId);
    setMouseDownItems(event);
  };

  const updateLeftTabItems = () => {
    const newTabItems: ITabItem[] = [];
    getCurrentRectItems()
      .sort((a, b) => a.clientRect.left - b.clientRect.left)
      .forEach((rectItem) => {
        const newItem = items.find((item) => item.id === rectItem.id);
        if (!newItem) {
          return;
        }
        const currentElement = document.getElementById(rectItem.id);
        if (!currentElement) {
          return;
        }
        newTabItems.push({
          ...newItem,
          width: rectItem.clientRect.width,
          left: parseInt(currentElement.style.left, 10),
        });
      });
    onUpdateTabItems(newTabItems);
  };

  const setAdjustCurrentTabLeft = () => {
    const elements = containerRef.current?.children;
    if (!elements) {
      return;
    }
    getCurrentRectItems()
      .sort((a, b) => a.clientRect.left - b.clientRect.left)
      .forEach((rectItem, index) => {
        const currentElement = document.getElementById(rectItem.id);
        if (!currentElement) {
          return;
        }
        (currentElement as HTMLDivElement).style.left = `${rectItem.clientRect.width * index}px`;
      });
  };

  const getCurrentRectItems = () => {
    const containerElement = containerRef.current;
    if (!containerElement) {
      return [];
    }
    const items: IRectItem[] = [];
    const elements = containerElement.children;
    for (let i = 0; i < elements.length; i++) {
      const clientRect = elements[i].getBoundingClientRect();
      items.push({ id: elements[i].id, clientRect });
    }
    return [...items] || [];
  };

  const updateTargetElementLeft = (movementX: number) => {
    const targetElement = document.getElementById(dragTargetId);
    if (!targetElement) {
      return;
    }
    const currentLeft = parseInt(targetElement.style.left, 10);
    const targetLeft = currentLeft + movementX;
    targetElement.style.left = `${targetLeft}px`;
  };

  const setMoveTabItem = (movementX: number) => {
    const sortedRectItems = getCurrentRectItems().sort((a, b) => a.clientRect.left - b.clientRect.left);
    const targetRectItem = sortedRectItems.find((item) => item.id === dragTargetId);
    const targetId = targetRectItem?.id || '';
    const targetIndex = sortedRectItems.findIndex((item) => item.id === targetId);
    const targetElement = document.getElementById(targetId);
    if (!targetRectItem || !targetElement) {
      return;
    }
    const targetLeft = parseInt(targetElement.style.left, 10);
    const targetRight = targetLeft + parseInt(targetElement.style.width, 10);

    const getUpdatedItem = (index: number) => {
      const toBeUpdatedElement = document.getElementById(sortedRectItems[index].id);
      if (!toBeUpdatedElement) {
        return;
      }
      const left = parseInt(toBeUpdatedElement.style.left, 10);
      const width = parseInt(toBeUpdatedElement.style.width, 10);
      const centerPosition = left + width / 2;
      return { toBeUpdatedElement, width, centerPosition };
    };

    const isLeft = movementX < 0;
    const isRight = movementX > 0;

    if (isLeft) {
      for (let i = 0; i < targetIndex; i++) {
        const item = getUpdatedItem(i);
        if (!item) {
          return;
        }
        const { width, centerPosition } = item;
        if (centerPosition >= targetLeft) {
          item.toBeUpdatedElement.style.left = `${(i + 1) * width}px`;
          // 빠르게 탭 이동시 위치 업데이트 안되는 문제 해결하기 위하여 추가한 코드
          for (let j = targetIndex + 1; j < sortedRectItems.length; j++) {
            const toBeUpdatedItem = getUpdatedItem(j);
            if (!toBeUpdatedItem) {
              return;
            }
            toBeUpdatedItem.toBeUpdatedElement.style.left = `${j * width}px`;
          }
        }
      }
    } else if (isRight) {
      for (let i = targetIndex + 1; i < sortedRectItems.length; i++) {
        const item = getUpdatedItem(i);
        if (!item) {
          return;
        }
        const { width, centerPosition } = item;
        if (centerPosition <= targetRight) {
          item.toBeUpdatedElement.style.left = `${(i - 1) * width}px`;
          // 빠르게 탭 이동시 위치 업데이트 안되는 문제 해결하기 위하여 추가한 코드
          for (let j = targetIndex - 1; j > 0; j--) {
            const toBeUpdatedItem = getUpdatedItem(j);
            if (!toBeUpdatedItem) {
              return;
            }
            toBeUpdatedItem.toBeUpdatedElement.style.left = `${j * width}px`;
          }
        }
      }
    }
  };

  const handleRemoveTab = (id: string) => {
    onRemoveTabItem(id);
    setHoverTab(undefined);
  };
  const mouseEnterEvent = (item: ITabItem) => {
    if (!dragTargetId) {
      setHoverTab(item);
    }
  };
  const mouseLeaveEvent = () => {
    setHoverTab(undefined);
  };
  return (
    <>
      <div className={styleTabItemContainer} id={TAB_CONTAINER_PREFIX_ID + postItId} ref={containerRef}>
        {items.map((item) => {
          const activeTab = postItId === item.id;
          const uniqueId = postItId === activeTabId ? item.id : uuidv4();
          return (
            <div
              className={styleTabItem({ activeTab, active, activeTabAndPostIt: activeTab && active })}
              onMouseEnter={() => mouseEnterEvent(item)}
              onMouseLeave={mouseLeaveEvent}
              id={uniqueId}
              key={uniqueId}
              style={{
                maxWidth: `${tabWidth}px`,
                width: `${item.width}px`,
                top: 2,
                position: 'absolute',
                left: `${item.left}px`,
              }}
              onMouseDown={(event) => handleMouseDown(event, item.id)}
            >
              <span
                className={styleTabItemLabel}
                style={{
                  maxWidth: tabWidth - 20,
                }}
              >
                {item.label}
              </span>
              <button
                className={styleTabItemClose}
                onClick={() => handleRemoveTab(item.id)}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <IconCommon fillColor={globalTheme.postIt.close} size={8} type="close" />
              </button>

              {!activeTab && <div className={styleTabItemBorder} />}
            </div>
          );
        })}
      </div>
      {hoverTab && (
        <MagnetPostItTabTooltip
          title={hoverTab.label || ''}
          left={hoverTab.left}
          isShow={!!hoverTab}
          desc={hoverTab.desc || null}
        />
      )}
    </>
  );
};

export default MagnetPostItTabs;
