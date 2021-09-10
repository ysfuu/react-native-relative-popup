import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Popup, {
  PopupProvider,
  PopupProps,
  PopupChildrenProps,
} from 'react-native-relative-popup';

type ButtonWithTooltip = {
  label: string;
  position: PopupProps['position'];
};

const ButtonWithTooltip = ({
  label,
  position: givenPosition,
}: ButtonWithTooltip) => {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
      <Text style={styles.buttonText}>{label}</Text>

      <Popup
        isOpen={open}
        position={givenPosition}
        verticalSpacing={4}
        safeAreaInsets={insets}
        onClose={() => setOpen(false)}
      >
        {({ position, computedPosition }: PopupChildrenProps) => (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>Given position: {position}</Text>
            <Text style={styles.tooltipText}>
              Computed position: {computedPosition}
            </Text>
          </View>
        )}
      </Popup>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PopupProvider>
        <SafeAreaView style={styles.app}>
          <View style={[styles.row, styles.flexStart]}>
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
          </View>
          <View style={[styles.row, styles.center]}>
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
          </View>
          <View style={[styles.row, styles.flexEnd]}>
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
            <ButtonWithTooltip position="bottom-center" label="Press Me" />
          </View>
        </SafeAreaView>
      </PopupProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0052cc',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  tooltip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#344563',
    borderRadius: 4,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
});
