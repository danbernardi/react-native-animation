import { StyleSheet } from 'react-native';

const blockDimensions = {
  width: 100,
  height: 100,
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0.4,
  alignItems: 'center',
  justifyContent: 'center'
}

export default StyleSheet.create({
  blockFront: {
    ...blockDimensions,
    backgroundColor: 'blue'
  },

  blockBack: {
    ...blockDimensions,
    backgroundColor: 'red',
    transform: [
      { rotateY: '0deg' },
      { rotateX: '180deg' },
    ]
  },

  blockSide1: {
    ...blockDimensions,
    backgroundColor: 'green',
    transform: [
      { rotateY: '0deg' },
      { rotateX: '90deg' },
    ]
  },

  blockSide2: {
    ...blockDimensions,
    backgroundColor: 'yellow',
    transform: [
      { rotateY: '0deg' },
      { rotateX: '-90deg' },
    ]
  },

  blockTop: {
    ...blockDimensions,
    backgroundColor: 'orange',
    transform: [
      { rotateY: '-90deg' },
      { rotateX: '0deg' },
    ]
  },

  blockBottom: {
    ...blockDimensions,
    backgroundColor: 'pink',
    transform: [
      { rotateY: '90deg' },
      { rotateX: '0deg' },
    ]
  }
});
