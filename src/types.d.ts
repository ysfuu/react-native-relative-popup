import type { ReactChildren } from 'react';

export type EdgeInsetsType = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type PositionType =
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export type ComputedStyleType = {
  top: number;
  left: number;
  opacity: number;
};

export type PopupProps = {
  debug?: boolean;

  isOpen: boolean;
  position: PositionType;
  horizontalSpacing: number;
  verticalSpacing: number;
  safeAreaInsets: EdgeInsetsType;
  children: ReactChildren | any;

  overlay?: boolean;
  onClose: Function | any;
};

export type PopupChildrenProps = {
  position: PositionType;
  computedPosition: PositionType;
  computedStyle: ComputedStyleType;
  horizontalSpacing: number;
  verticalSpacing: number;
};
