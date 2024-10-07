import { createThemeContract } from '@vanilla-extract/css';

export const globalTheme = createThemeContract({
  magnetBoard: {
    background: null,
  },
  postIt: {
    header: null,
    headerActive: null,
    tabActiveFont: null,
    close: null,
    tabHover: null,
    closeHover: null,
    content: null,
    activeBorder: null,
    border: null,
    shadow: null,
  },
});
