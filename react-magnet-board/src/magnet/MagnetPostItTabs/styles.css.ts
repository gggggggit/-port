import { globalTheme } from '@styles/contract.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const styleTabItemContainer = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  fontSize: '11px',
  width: '100%',
  overflow: 'hidden',
  height: 30,
  boxSizing: 'border-box',
});

const commonActiveTab = {
  backgroundColor: globalTheme.postIt.content,
  zIndex: 10,
  border: `1px solid ${globalTheme.postIt.border}`,
  borderBottom: 'none',
  borderRadius: '8px 8px 0 0',
};
export const styleTabItem = recipe({
  base: {
    padding: '6px 8px',
    cursor: 'grab',
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxSizing: 'border-box',
  },
  variants: {
    active: {
      true: {
        backgroundColor: globalTheme.postIt.headerActive,
      },
      false: {
        backgroundColor: globalTheme.postIt.header,
      },
    },
    activeTab: {
      true: {
        ...commonActiveTab,
      },
      false: {
        ':hover': {
          ...commonActiveTab,
          backgroundColor: globalTheme.postIt.tabHover,
          border: 'none',
        },
      },
    },
    activeTabAndPostIt: {
      true: {
        opacity: 1,
        color: globalTheme.postIt.tabActiveFont,
        ...commonActiveTab,
      },
    },
  },
});

export const styleTabItemLabel = style({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
});

export const styleTabItemClose = style({
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: 'transparent',
  minWidth: '16px',
  height: '16px',
  padding: 0,

  ':hover': {
    backgroundColor: globalTheme.postIt.closeHover,
  },
});

export const styleTabItemBorder = style({
  height: '50%',
  width: 1,
  backgroundColor: globalTheme.postIt.border,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  right: -1,
  zIndex: 1,
});
