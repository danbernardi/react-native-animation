import { StyleSheet } from 'react-native';
import { pageMargins } from '../../styles/mixins';

export default StyleSheet.create({
  listContainer: {
    width: '100%',
    height: 400,
    ...pageMargins
  }
});
