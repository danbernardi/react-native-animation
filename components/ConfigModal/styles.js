import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  close: {
    position: 'absolute',
    top: 60,
    right: 0,
    zIndex: 3
  },

  closeIcon: {
    color: 'white',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    fontSize: 20
  },

  content: {
    width: '100%'
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
