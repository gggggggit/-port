export const MAGNET_RANGE = 20;
export const numberInRange = (num: number, min?: number, max?: number) => {
  const MIN = typeof min === 'number' ? min : num;
  const MAX = typeof max === 'number' ? max : num;
  return Math.min(Math.max(num, MIN), MAX);
};

export const POSTIT_PREFIX_ID = 'postit-';
export const HEADER_CONTAINER_PREFIX_ID = 'postit-header-container-';
export const TAB_CONTAINER_PREFIX_ID = 'tab-container-';
export const DEFAULT_TAB_MAX_WIDTH = 180;
export const TAB_MIN_WIDTH = 58;

export const RESIZE_DIRECTION_LIST = ['N', 'S', 'E', 'W', 'NW', 'SE'] as const;

export const DEFAULT_BOARD_THEME = {
  magnetBoard: {
    background: 'white',
  },
  postIt: {
    header: '#F1F3F4',
    headerActive: '#E6E6E7',
    tabActiveFont: '#5F6368',
    close: '#666A6D',
    tabHover: 'rgba(0,0, 0, 0.05)',
    closeHover: 'rgb(0, 0, 0, 0.1)',
    content: 'white',
    activeBorder: '#8CB9F3',
    border: '#CACDD1',
    shadow: 'rgba(0,0,0,0.3)',
  },
};
