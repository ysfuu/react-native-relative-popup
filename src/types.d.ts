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
  /**
   * Advanced: If you need to change the portal used to render the popup
   * component, you can specify a portal name to both this component and an
   * @gorhom/portal `PortalHost`. For example, if you need to use a popup within a
   * react-native `Modal` component, the modal will probably cover your popup
   * content. To solve this, you can place a named `PortalHost` inside the
   * `Modal` and pass `portalName` with the same value to `Popup`.
   */
  portalName?: string;
  onClose: Function | any;
  /**
   * Advanced: The amount of time to delay before checking the layout of floating
   * components. If you find the popup content is jumping around the screen
   * after opening, you can try changing this number to delay the request to
   * measure the layout of the menu and trigger elements.
   */
  timeoutLength?: number;
};

export type PopupChildrenProps = {
  position: PositionType;
  computedPosition: PositionType;
  computedStyle: ComputedStyleType;
  horizontalSpacing: number;
  verticalSpacing: number;
};
