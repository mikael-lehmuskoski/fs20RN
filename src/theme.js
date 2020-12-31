import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#616161',
    textTertiary: '#FFFFFF',
    primary: '#F5F5F5',
    secondary: '#22cbff',
    tertiary: '#FF5722',
    AppBarTab: "#24292e",
    errors: {
      primary: '#cb0000',
      secondary: '#FFA48E'
    }
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;