import { Platform } from 'react-native';

const theme = {
  roundness: 3,
  colors: {
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',

    textPrimary: '#24292e',
    textSecondary: '#586069',
    
    primary: '#0366d6',
    error: '#d73a4a',
    divider: '#d1d5da',
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;