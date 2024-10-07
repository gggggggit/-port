import {keyframes, style} from '@vanilla-extract/css';
import {globalTheme} from "@styles/contract.css";

const show = keyframes({
  '0%': { opacity: 0 },
  '80%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const styleMagnetPostItTabTooltip = style({
  backgroundColor: globalTheme.postIt.headerActive,
  top: 30,
  zIndex: 1000,
  padding: '10px 18px',
  borderRadius: 8,
  fontSize: 12,
  boxShadow: '0 0 4px 2px rgba(0,0,0,.2)',
})
export const styleMagnetPostItTabTooltipWrap = style({
  transition: "all ease .2s",
  display:"grid",
  position: "absolute",
  animationName: show,
  animationDuration: '0.8s',
  animationTimingFunction: 'ease',
  animationIterationCount: '1',
  top:30,
})
export const styleMagnetPostItTabTooltipTitle = style({
  fontWeight: 700,
})
export const styleMagnetPostItTabTooltipDesc = style({
  marginTop: 4
})