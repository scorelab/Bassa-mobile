import { StyleSheet } from 'react-native';

export const theme = {
  PRIMARY_COLOR: '#51b355',
  SECONDARY_COLOR: '#002F46',
  HINT_COLOR: '#00AEFF',
  TAB_ICON_COLOR: '#0076FF',
  PRIMARY_STATUS_BAR_COLOR: '#275b38',

  TEXT_COLOR_INVERT: '#FFF',
  ERROR_TEXT_COLOR: '#cc0000',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultPadding: {
    padding: 15,
  },
});

