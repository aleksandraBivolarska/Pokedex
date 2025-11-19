/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#5631E8';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#0E0940',
    background: '#EDF6FF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E0E0E0',
    searchBackground: '#FFFFFF',
    inputBackground: '#FFFFFF',
    placeholder: '#999999',
    error: '#FF6B6B',
    success: '#4CAF50',
    cardImageBackground: '#F6F6FF',
    idText: '#FFFFFF',
    tabBarActive: '#5631E8',
    tabBarInactive: '#666666',
    tabBarBackground: '#FFFFFF',
  },
  dark: {
    text: '#EDF6FF',
    background: '#0E0940',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    card: '#1A1A2E',
    border: '#333356',
    searchBackground: '#1A1A2E',
    inputBackground: '#1A1A2E',
    placeholder: '#888888',
    error: '#FF5252',
    success: '#66BB6A',
    cardImageBackground: '#151525',
    idText: '#000000',
    tabBarActive: '#5631E8',
    tabBarInactive: '#888888',
    tabBarBackground: '#000000',
  },
};

export const fonts = {
  regular: "Rubik-Regular",
  bold: "Rubik-Bold",
  italic: "Rubik-Italic",
  medium: "Rubik-Medium",
};