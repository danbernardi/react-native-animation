import { StyleSheet } from 'react-native';
import { pageMargins } from '../../styles/mixins';

const link = {
  fontSize: 21,
  paddingTop: 20,
  paddingBottom: 20,
  paddingRight: 20,
  paddingLeft: 20,
  color: '#333'
};

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 20,
    backgroundColor: 'transparent',
    ...pageMargins
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  menu: {
    ...link,
    marginRight: -20
  },

  config: {
    ...link,
    marginLeft: -20
  }
});
