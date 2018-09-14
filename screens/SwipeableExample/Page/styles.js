import { StyleSheet } from 'react-native';
import { pageMargins } from '../../../styles/mixins';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },

  scrollContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 40,
    ...pageMargins
  },

  listContainer: {
    width: '100%',
    flex: 1,
    marginBottom: 40
  },

  scrollIndicator: {
    color: 'white',
    fontSize: 50,
    marginBottom: 20
  },

  list: {
    flex: 1,
    height: '100%',
    paddingTop: 40,
    paddingBottom: 40
  }
});
