import { style } from '@vanilla-extract/css';

export const styleIconEmpty = style({
  fontSize: '14px',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});
export const styleIconEmptyContentWrapper = style({ textAlign: 'center' });
export const styleIconEmptySimpleEllipse = style({ fill: '#fff', fillOpacity: 0.08 });
export const styleIconEmptyImageG = style({ stroke: '#5F6368' });
export const styleIconEmptyImageSimplePath = style({
  fill: '#5F6368',
  stroke: '#5F6368',
});
