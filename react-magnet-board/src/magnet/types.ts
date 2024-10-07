import { RESIZE_DIRECTION_LIST } from '@components/magnet/constants';
import {ReactNode} from "react";

export type TDirection = (typeof RESIZE_DIRECTION_LIST)[number];

export interface IMagentContentProps {
  postItId: string;
}

export interface ITabItem {
  id: string;
  value: string;
  label: string;
  left: number;
  width: number;
  desc?: ReactNode;
}

export interface IPostIt {
  id: string;
  title: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  order: number;

  // tab
  activeTabId: string;
  tabLeft: number;
  tabWidth: number;

  //  optional
  disabled?: boolean;
  disabledMessage?: string;
}

export interface IMagnetBorder {
  left: number | undefined;
  right: number | undefined;
  top: number | undefined;
  bottom: number | undefined;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface IBound {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface IMagnetBoardMargin {
  top: number;
  left: number;
}

export interface IThemeMagnetBoard {
  magnetBoard?: {
    background?: string;
  };
}

export interface IThemePostIt {
  postIt?: {
    header?: string;
    headerActive?: string;
    tabActiveFont?: string;
    close?: string;
    tabHover?: string;
    closeHover?: string;
    content?: string;
    activeBorder?: string;
    border?: string;
    shadow?: string;
  };
}

export interface ITheme extends IThemeMagnetBoard, IThemePostIt {}
