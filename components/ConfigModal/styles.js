import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative'
  },
  close: {
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 3
  },
  closeIcon: {
    color: 'white',
    width: 20,
    height: 20,
    fontSize: 20
  },
  content: {
    paddingTop: 65
  },
  title: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },
  text: {
    fontSize: 16
  }
});
