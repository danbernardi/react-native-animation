import React from 'react';
import { View } from 'react-native';
import { Dimensions } from 'react-native';

const colorStyles = (diameter, color) => ({
  backgroundColor: color,
  width: diameter,
  height: diameter,
  borderRadius: diameter / 2,
  position: 'absolute',
  left: '50%',
  top: '50%'
});

function ColorScape () {
  return (
    <View
      style={ {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'white'
      } }
    >
    <View style={ colorStyles(40, '#4c669f') }>
      <View style={ colorStyles(30, '#3b5998') }>
        <View style={ colorStyles(20, '#192f6a') }>
        </View>
      </View>
    </View>
  </View>
  );
};

export default ColorScape;
