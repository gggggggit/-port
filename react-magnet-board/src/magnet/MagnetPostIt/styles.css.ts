import { globalTheme } from '@styles/contract.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const stylePostIt = recipe({
  base: {
    position: 'absolute',
    width: '300px',
    height: '200px',
    border: `1px solid ${globalTheme.postIt.border}`,
    display: 'flex',
    flexFlow: 'column',
    borderRadius: 4,
  },
  variants: {
    active: {
      true: {
        borderColor: globalTheme.postIt.activeBorder,
        boxShadow: `${globalTheme.postIt.shadow} 1px 1px 5px`,
      },
    },
    activeTab: {
      true: {
        visibility: 'visible',
        opacity: 1,
      },
      false: {
        visibility: 'hidden',
        opacity: 0,
      },
    },
    overlap: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

export const stylePostItHeaderContainer = recipe({
  base: {
    width: '100%',
    backgroundColor: globalTheme.postIt.header,
    cursor: 'move',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    display: 'flex',
    padding: '0',
    flexDirection: 'column',
    borderRadius: '3px 3px 0 0',
  },
  variants: {
    active: {
      true: {
        backgroundColor: globalTheme.postIt.headerActive,
      },
    },
  },
});

export const stylePostItHeaderContent = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  variants: {
    overlap: {
      true: {
        background: 'rgba(30, 122, 163, 0.2)',
      },
    },
  },
});

export const stylePostItHeader = recipe({
  variants: {
    active: {
      true: {
        background: globalTheme.postIt.headerActive,
        borderBottom: `1px solid ${globalTheme.postIt.header}`,
      },
      false: {
        background: globalTheme.postIt.header,
        borderBottom: `1px solid ${globalTheme.postIt.headerActive}`,
      },
    },
  },
});

export const styleTabWrapper = style({
  display: 'flex',
  alignItems: 'center',
  paddingRight: 4,
});

export const stylePostItContent = style({
  backgroundColor: globalTheme.postIt.content,
  overflow: 'hidden',
  padding: 10,
  height: '100%',
  position: 'relative',
  borderRadius: '0 0 4px 4px',
  display: 'block',
});

export const stylePostItHeaderMenuItem = style({
  backgroundColor: 'transparent',
  width: '16px',
  height: '16px',
  padding: 0,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 11,
  borderRadius: '50%',

  ':hover': {
    background: globalTheme.postIt.closeHover,
  },
});

export const stylePostItResizeButton = recipe({
  base: {
    position: 'absolute',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    zIndex: 9999,
  },
  variants: {
    direction: {
      NW: {
        top: -5,
        left: -5,
        width: 20,
        height: 20,
        cursor: 'nw-resize',
      },
      SE: {
        bottom: -5,
        right: -5,
        width: 20,
        height: 20,
        cursor: 'se-resize',
      },
      E: {
        top: 0,
        right: -5,
        width: 10,
        height: '100%',
        cursor: 'col-resize',
      },
      W: {
        top: 0,
        left: -5,
        width: 10,
        height: '100%',
        cursor: 'col-resize',
      },
      N: {
        top: -5,
        width: '100%',
        height: 10,
        cursor: 'row-resize',
      },
      S: {
        bottom: -5,
        width: '100%',
        height: 10,
        cursor: 'row-resize',
      },
    },
  },
});
