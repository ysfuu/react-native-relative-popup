import type { ReactChildren } from 'react';

export type PopupProps = {
  debug?: boolean;

  isOpen: boolean;
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
  horizontalSpacing?: number;
  verticalSpacing?: number;
  children: ReactChildren;

  overlay?: boolean;
  onClose?: Function;
} & BottomSheetAnimationConfigs;
