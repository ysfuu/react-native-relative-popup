import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { Portal } from '@gorhom/portal';

import type { PopupProps } from './types';

const DEFAULT_LAYOUT = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

const Popup = ({
  debug,

  isOpen,
  position,
  horizontalSpacing,
  verticalSpacing,
  children,

  overlay,
  onClose,
}: PopupProps) => {
  const dimensions = useWindowDimensions();
  const anchorRef = useRef<View>(null);
  const contentRef = useRef<View>(null);
  const [anchorLayout, setAnchorLayout] = useState(DEFAULT_LAYOUT);
  const [contentLayout, setContentLayout] = useState(DEFAULT_LAYOUT);
  const [computedPosition, setComputedPosition] = useState(position);

  const handleAnchorLayout = useCallback(() => {
    if (anchorRef.current) {
      anchorRef.current.measureInWindow((x, y, width, height) => {
        setAnchorLayout({
          x,
          y,
          width,
          height,
        });
      });
    }
  }, [anchorRef]);

  const handleContentLayout = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.measureInWindow((x, y, width, height) => {
        setContentLayout({
          x,
          y,
          width,
          height,
        });
      });
    }
  }, [contentRef]);

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      handleAnchorLayout();
    }
  }, [isOpen, handleAnchorLayout]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      handleContentLayout();
    }
  }, [isOpen, handleContentLayout]);

  useEffect(() => {
    let [yAxis, xAxis] = position.split('-');

    switch (yAxis) {
      case 'top':
        if (anchorLayout.y - contentLayout.height < 0) {
          yAxis = 'bottom';
        }
        break;

      case 'bottom':
        if (
          anchorLayout.y + anchorLayout.height + contentLayout.height >
          dimensions.height
        ) {
          yAxis = 'top';
        }
        break;

      default:
        break;
    }

    switch (xAxis) {
      case 'left':
        if (anchorLayout.x + contentLayout.width > dimensions.width) {
          xAxis = 'right';
        }
        break;

      case 'right':
        if (anchorLayout.x + anchorLayout.width - contentLayout.width < 0) {
          xAxis = 'left';
        }
        break;

      case 'center':
        const centerPoint =
          (anchorLayout.x + anchorLayout.width) / 2 - contentLayout.width;
        if (centerPoint + contentLayout.width / 2 > dimensions.width) {
          xAxis = 'right';
        }
        if (centerPoint - contentLayout.width / 2 < 0) {
          xAxis = 'left';
        }
        break;

      default:
        break;
    }

    setComputedPosition(`${yAxis}-${xAxis}`);
  }, [position, anchorLayout, contentLayout, dimensions]);

  const computedStyle = useMemo(() => {
    const [yAxis, xAxis] = computedPosition.split('-');

    let top = 0;
    let left = 0;

    switch (yAxis) {
      case 'top':
        top = anchorLayout.y - contentLayout.height - verticalSpacing;
        break;

      case 'bottom':
        top = anchorLayout.y + anchorLayout.height + verticalSpacing;
        break;

      default:
        break;
    }

    switch (xAxis) {
      case 'left':
        left = anchorLayout.x + horizontalSpacing;
        break;

      case 'right':
        left =
          anchorLayout.x +
          anchorLayout.width -
          contentLayout.width -
          horizontalSpacing;
        break;

      case 'center':
        left =
          (anchorLayout.x + anchorLayout.width) / 2 - contentLayout.width / 2;
        break;

      default:
        break;
    }

    return {
      top,
      left,
      opacity: top === 0 && left === 0 ? 0 : 1,
    };
  }, [
    computedPosition,
    anchorLayout,
    contentLayout,
    horizontalSpacing,
    verticalSpacing,
  ]);

  return (
    <>
      <View
        ref={anchorRef}
        style={[styles.anchor, debug && styles.anchorDebug]}
        pointerEvents="none"
      />
      <Portal>
        {isOpen && (
          <>
            {overlay && (
              <Pressable
                style={[styles.overlay, debug && styles.overlayDebug]}
                onPress={onClose}
              />
            )}
            <View
              ref={contentRef}
              onLayout={handleContentLayout}
              style={[
                styles.content,
                debug && styles.contentDebug,
                computedStyle,
              ]}
            >
              {typeof children === 'function'
                ? children({
                    position,
                    computedPosition,
                    computedStyle,
                    horizontalSpacing,
                    verticalSpacing,
                  })
                : children}
            </View>
          </>
        )}
      </Portal>
    </>
  );
};

Popup.defaultProps = {
  debug: false,
  isOpen: false,
  position: 'bottom-right',
  horizontalSpacing: 0,
  verticalSpacing: 0,
  children: null,
  overlay: true,
  onClose: () => null,
};

const styles = StyleSheet.create({
  anchor: {
    ...StyleSheet.absoluteFillObject,
  },
  anchorDebug: {
    backgroundColor: 'rgba(255, 0, 0, .5)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayDebug: {
    backgroundColor: 'rgba(0, 0, 255, .5)',
  },
  content: {
    position: 'absolute',
  },
  contentDebug: {
    backgroundColor: 'rgba(0, 255, 0, .5)',
  },
});

export default Popup;
