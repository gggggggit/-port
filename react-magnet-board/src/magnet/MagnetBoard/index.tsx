import { type FC, type MouseEvent, useEffect, useRef, useState } from 'react';

import { styleMagnetBoard, styleMagnetBoardContainer } from '@components/magnet/MagnetBoard/styles.css';
import MagnetPostIt from '@components/magnet/MagnetPostIt';
import { DEFAULT_BOARD_THEME, DEFAULT_TAB_MAX_WIDTH, POSTIT_PREFIX_ID } from '@components/magnet/constants';
import { PostItTabContext } from '@components/magnet/context/PostItTabContext';
import useBoardSize from '@components/magnet/hooks/useBoardSize';
import useScroll from '@components/magnet/hooks/useScroll';
import { globalTheme } from '@components/magnet/styles/contract.css';
import type { IMagnetBoardMargin, IPostIt, ITheme } from '@components/magnet/types';
import { isElementContainMousePos } from '@libs/element';
import { setElementVars } from '@vanilla-extract/dynamic';

export interface IMagnetBoardProps {
  theme?: ITheme;
  tabWidth?: number;
  postItTypeItems: Record<string, FC<any>>;
  postItList: IPostIt[];
  onChangePostItList: (postItList: IPostIt[]) => void;
}

const MagnetBoard: FC<IMagnetBoardProps> = ({
  tabWidth = DEFAULT_TAB_MAX_WIDTH,
  theme,
  postItTypeItems,
  postItList,
  onChangePostItList,
}) => {
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollPosition } = useScroll(boardContainerRef);
  const [activePostItId, setActivePostItId] = useState(() =>
    postItList.length > 0 ? postItList[postItList.length - 1].id : '',
  );
  const { width, height } = useBoardSize(postItList, boardContainerRef.current, scrollPosition);
  const boardMarginRef = useRef<IMagnetBoardMargin>({
    left: 0,
    top: 0,
  });
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);

  // tab에서 사용하는 State
  const [syncIsEditingId, setSyncIsEditingId] = useState<string>('');
  const [overlapPostItId, setOverlapPostItId] = useState('');
  const [dragTargetId, setDragTargetId] = useState('');
  const [mouseDownItem, setMouseDownItem] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const element = boardContainerRef.current;
    if (!element) {
      return;
    }
    const setMargin = () => {
      const { left, top } = element.getBoundingClientRect();
      boardMarginRef.current = {
        left,
        top,
      };
    };
    setMargin();
  }, []);

  useEffect(() => {
    const element = boardContainerRef.current;
    if (!element) {
      return;
    }
    if (!theme) {
      setElementVars(element, globalTheme, DEFAULT_BOARD_THEME);
      return;
    }
    setElementVars(element, globalTheme, {
      magnetBoard: {
        ...DEFAULT_BOARD_THEME.magnetBoard,
        ...theme.magnetBoard,
      },
      postIt: {
        ...DEFAULT_BOARD_THEME.postIt,
        ...theme.postIt,
      },
    });
  }, [theme]);

  const handleBackgroundClick = (e: MouseEvent) => {
    e.stopPropagation();
    // postIt이 display none 되면서 onClick e.stopPropagation이 작동하지 않아 추가 처리함.
    let isBackgroundClick = true;
    for (let i = 0; i < postItList.length; i++) {
      const postItElement = document.getElementById(POSTIT_PREFIX_ID + postItList[i].id);
      if (isElementContainMousePos(e.clientX, e.clientY, postItElement)) {
        isBackgroundClick = false;
        break;
      }
    }
    if (isBackgroundClick) {
      setActivePostItId('');
    }
  };

  const postItTabContextValue = {
    isEditingGlobal,
    syncIsEditingId,
    overlapPostItId,
    dragTargetId,
    mouseDownItem,
    tabWidth,
    setIsEditingGlobal,
    setDragTargetId,
    setMouseDownItem,
    setOverlapPostItId,
    setSyncIsEditingId,
  };

  return (
    <div className={styleMagnetBoardContainer} ref={boardContainerRef} onClick={handleBackgroundClick}>
      <div className={styleMagnetBoard} style={{ width: `${width}px`, height: `${height}px` }}>
        <PostItTabContext.Provider value={postItTabContextValue}>
          {postItList.map((postIt) => (
            <MagnetPostIt
              activePostItId={activePostItId}
              boardMargin={boardMarginRef.current}
              key={postIt.id}
              postIt={postIt}
              postItList={postItList}
              postItTypeItems={postItTypeItems}
              scrollPosition={scrollPosition}
              setActivePostItId={setActivePostItId}
              onChangePostItList={onChangePostItList}
            />
          ))}
        </PostItTabContext.Provider>
      </div>
    </div>
  );
};

export default MagnetBoard;
