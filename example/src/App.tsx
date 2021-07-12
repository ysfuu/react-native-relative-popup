import * as React from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Popup, { PopupProvider } from 'react-native-relative-popup';

export default function App() {
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);

  return (
    <PopupProvider>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.popupContainer}
          onPress={() => setPopupOpen(true)}
        >
          <Popup isOpen={popupOpen} onClose={() => setPopupOpen(false)}>
            <View style={styles.popup} />
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
  popupContainer: {
    width: 100,
    height: 100,
    marginVertical: 20,
    backgroundColor: 'red',
  },
  popup: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
  },
});
