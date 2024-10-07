import { useEffect, useState } from 'react';

import type { IPosition, IPostIt } from '@components/magnet/types';

export default function useBoardSize(
  postItList: IPostIt[],
  boardContainer: HTMLDivElement | null,
  scrollPosition: IPosition,
) {
  const [_, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  const { x: scrollLeft, y: scrollTop } = scrollPosition;
  const boardWidth = boardContainer?.clientWidth || 0;
  const boardHeight = boardContainer?.clientHeight || 0;
  let maxWidth = boardWidth + scrollLeft;
  let maxHeight = boardHeight + scrollTop;

  postItList.forEach((post) => {
    if (maxWidth < post.width + post.left) {
      maxWidth = Math.max(post.width + post.left, boardWidth + scrollLeft);
    }

    if (maxHeight < post.height + post.top) {
      maxHeight = Math.max(post.height + post.top, boardHeight + scrollTop);
    }
  });

  return {
    width: maxWidth,
    height: maxHeight,
  };
}
