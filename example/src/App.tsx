import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Popup, { PopupProvider } from 'react-native-relative-popup';

export default function App() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <PopupProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text>Button</Text>

          <Popup isOpen={open} onClose={() => setOpen(false)}>
            <Text>Popup Content</Text>
          </Popup>
        </TouchableOpacity>
      </View>
    </PopupProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
