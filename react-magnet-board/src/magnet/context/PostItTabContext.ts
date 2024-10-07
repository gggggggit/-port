import { createContext } from 'react';

import { DEFAULT_TAB_MAX_WIDTH } from '@components/magnet/constants';
import type { IBound } from '@components/magnet/types';

interface IContext {
  isEditingGlobal: boolean;
  syncIsEditingId: string;
  overlapPostItId: string;
  dragTargetId: string;
  mouseDownItem: IBound;
  tabWidth: number;
  setIsEditingGlobal: (isEditing:boolean) => void;
  setDragTargetId: (dragTargetId: string) => void;
  setMouseDownItem: (mouseDownItem: IBound) => void;
  setOverlapPostItId: (postItId: string) => void;
  setSyncIsEditingId: (syncIsEditingId: string) => void;
}

export const PostItTabContext = createContext<IContext>({
  isEditingGlobal: false,
  syncIsEditingId: '',
  overlapPostItId: '',
  dragTargetId: '',
  mouseDownItem: {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  },
  tabWidth: DEFAULT_TAB_MAX_WIDTH,
  setIsEditingGlobal: (_isEditing:boolean) => undefined,
  setDragTargetId: (_dragTargetId: string) => undefined,
  setMouseDownItem: (_mouseDownItem: IBound) => undefined,
  setOverlapPostItId: (_postItId: string) => undefined,
  setSyncIsEditingId: (_syncIsEditingId: string) => undefined,
});
