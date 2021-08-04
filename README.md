# react-native-relative-popup

A popup component that sticks to an element and stays on top of everything.

- Span a popup to the app root using the amazing library [@gorhom/portal](https://github.com/gorhom/react-native-portal)
- Popup position will be relative to its parent component's bounds and will try to stay in the viewport
- Fully customizable content
- Built with Typescript

![Relative Popup Demo](./assets/demo.gif)

## Usage

```sh
yarn add react-native-relative-popup
```

### PopupProvider

Wrap your app with PopupProvider

```jsx
import { PopupProvider } from 'react-native-relative-popup';

export default () => (
  <PopupProvider>
    {/* Rest of your app */}
    {/* Popups will be teleported to here */}
  </PopupProvider>
);
```

### Popup

Create a popup

```jsx
import Popup from 'react-native-relative-popup';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <Text>Button</Text>

      <Popup isOpen={open} onClose={() => setOpen(false)}>
        <Text>Popup Content</Text>
      </Popup>
    </TouchableOpacity>
  );
};
```

| Prop | Type | Mandatory | Default Value | Description |
|-|-|-|-|-|
| isOpen | boolean | Yes | false | Should be popup shown? |
| children | node or func | Yes | null | Popup content. Can be a function which has popup position parameters |
| position | 'top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center' | No | 'bottom-right' | Position of the popup |
| horizontalSpacing | number | No | 0 | Horizontal spacing of the popup from the relative element |
| verticalSpacing | number | No | 0 | Vertical spacing of the popup from the relative element |
| onClose | function | No | null | A callback that fired when user presses outside of the popup |


#### Usage

```jsx
import React, { useState } from 'react';
import Popup from 'react-native-relative-popup';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <Text>Button</Text>

      <Popup isOpen={open} onClose={() => setOpen(false)}>
        <Text>Popup Content</Text>
      </Popup>
    </TouchableOpacity>
  );
};
```

<h2 id="built-with">Built With ❤️</h2>

- [@gorhom/portal](https://github.com/gorhom/react-native-portal)
- [@react-native-community/bob](https://github.com/react-native-community/bob)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT