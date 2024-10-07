import { type FC, type MouseEvent, useContext, useRef } from 'react';

import IconCommon from '@components/IconCommon';
import IconEmpty from '@components/IconEmpty';
import {
  stylePostIt,
  stylePostItContent,
  stylePostItHeaderContainer,
  stylePostItHeaderContent,
  stylePostItHeaderMenuItem,
  stylePostItResizeButton,
  styleTabWrapper,
} from '@components/magnet/MagnetPostIt/styles.css';
import MagnetPostItTabs from '@components/magnet/MagnetPostItTabs';
import { HEADER_CONTAINER_PREFIX_ID, POSTIT_PREFIX_ID, RESIZE_DIRECTION_LIST } from '@components/magnet/constants';
import { PostItTabContext } from '@components/magnet/context/PostItTabContext';
import usePostIt from '@components/magnet/hooks/usePostIt';
import usePostItTab from '@components/magnet/hooks/usePostItTab';
import { makeMouseDownEventInPostItMove } from '@components/magnet/libs/postItMoveEvent';
import { makeMouseDownInPostItResize } from '@components/magnet/libs/postItResizeEvent';
import type { IMagnetBoardMargin, IPosition, IPostIt } from '@components/magnet/types';
import { globalTheme } from '@styles/contract.css';

interface IProps {
  activePostItId: string;
  boardMargin: IMagnetBoardMargin;
  postItTypeItems: Record<string, FC<any>>;
  postIt: IPostIt;
  postItList: IPostIt[];
  scrollPosition: IPosition;
  onChangePostItList: (postItList: IPostIt[]) => void;
  setActivePostItId: (id: string) => void;
}

const MagnetPostIt: FC<IProps> = ({
  activePostItId,
  boardMargin,
  postItTypeItems,
  postIt,
  postItList,
  scrollPosition,
  onChangePostItList,
  setActivePostItId,
}) => {
  const { isEditingGlobal, setIsEditingGlobal } = useContext(PostItTabContext);
  const { onDeleteItem, onUpdateActiveId, onUpdatePostItBound } = usePostIt(
    postIt,
    postItList,
    onChangePostItList,
    setActivePostItId,
  );
  const active = postIt.id === activePostItId;
  const {
    tabItems,
    isCurrentOverlap,
    isTargetOverlap,
    onChangeTabId,
    onChangeIsEditing,
    onUpdateActivePostItId,
    onUpdateTabItems,
    onRemoveTabItem,
    onDivideTabItem,
    onMouseMoveUpdateOverlap,
    onUpdateTabWidth,
  } = usePostItTab(activePostItId, active, postIt, postItList, setActivePostItId, onChangePostItList);
  const postItRef = useRef<HTMLDivElement>(null);
  const postItElement = postItRef.current;

  const handleMouseDownInPostItMove = makeMouseDownEventInPostItMove(
    boardMargin,
    postItElement,
    postIt,
    postItList,
    scrollPosition,
    onChangeIsEditing,
    onUpdatePostItBound,
    onMouseMoveUpdateOverlap,
    setIsEditingGlobal,
  );
  const handleMouseDownInPostItResize = makeMouseDownInPostItResize(
    postItElement,
    postIt,
    postItList,
    onUpdatePostItBound,
    onUpdateTabWidth,
    setIsEditingGlobal,
  );

  const handleClosePostIt = (e: MouseEvent) => {
    e.stopPropagation();
    onDeleteItem(postIt);
  };
  const handleUpdateActive = (e: MouseEvent) => {
    e.stopPropagation();
    if (!active) {
      onUpdateActiveId(postIt.id);
    }
  };

  const Component = postItTypeItems[postIt.type];
  const isActiveTab = postIt.activeTabId === postIt.id;
  const userSelect = !isEditingGlobal ? 'auto' : 'none';

  return (
    <div
      className={stylePostIt({ active, activeTab: isActiveTab, overlap: isCurrentOverlap })}
      hidden={!isActiveTab}
      id={POSTIT_PREFIX_ID + postIt.id}
      ref={postItRef}
      style={{
        inset: `${postIt.top}px 0 0 ${postIt.left}px`,
        width: postIt.width,
        height: postIt.height,
        zIndex: postIt.order + 11,
        userSelect,
        WebkitUserSelect: userSelect,
      }}
      onClick={(e: MouseEvent) => e.stopPropagation()}
      onMouseDown={handleUpdateActive}
    >
      <div
        className={stylePostItHeaderContainer({ active })}
        id={HEADER_CONTAINER_PREFIX_ID + postIt.id}
        onMouseDown={handleMouseDownInPostItMove}
      >
        <div className={stylePostItHeaderContent({ overlap: isTargetOverlap })}>
          <div className={styleTabWrapper}>
            {isActiveTab && (
              <MagnetPostItTabs
                active={active}
                boardMargin={boardMargin}
                items={tabItems}
                postIt={postIt}
                onUpdateActivePostItId={onUpdateActivePostItId}
                onChangeIsEditing={onChangeIsEditing}
                onChangeTabId={onChangeTabId}
                onDivideTabItem={onDivideTabItem}
                onMouseMoveUpdateOverlap={onMouseMoveUpdateOverlap}
                onRemoveTabItem={onRemoveTabItem}
                onUpdatePostItBound={onUpdatePostItBound}
                onUpdateTabItems={onUpdateTabItems}
              />
            )}
            <button
              className={stylePostItHeaderMenuItem}
              onClick={handleClosePostIt}
              onMouseDown={(e: MouseEvent) => e.stopPropagation()}
            >
              <IconCommon fillColor={globalTheme.postIt.close} size={8} type="close" />
            </button>
          </div>
        </div>
      </div>

      <div className={stylePostItContent}>
        {postIt.disabled ? <IconEmpty description={postIt.disabledMessage} /> : <Component postItId={postIt.id} />}
      </div>

      {RESIZE_DIRECTION_LIST.map((direction) => (
        <div
          className={stylePostItResizeButton({ direction })}
          key={direction}
          onMouseDown={handleMouseDownInPostItResize(direction)}
        />
      ))}
    </div>
  );
};

export default MagnetPostIt;
