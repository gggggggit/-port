import { globalTheme } from '@components/magnet/styles/contract.css';
import { style } from '@vanilla-extract/css';

export const styleMagnetBoardContainer = style({
  // minWidth: 1000,
  overflow: 'auto',
  // minHeight: 800,
  width: '100%',
  height: '100%',
});

export const styleMagnetBoard = style({
  position: 'relative',
  // inset: '80px 0 0 200px',
  backgroundColor: globalTheme.magnetBoard.background,
  minWidth: '100%',
  minHeight: '100%',
  overflow: 'hidden',
});
