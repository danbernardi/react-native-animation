import { StyleSheet } from 'react-native';
import { pageMargins } from '../../styles/mixins';

export default StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 20,
    ...pageMargins
  },

  menu: {
    fontSize: 21,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginRight: -20
  }
});
