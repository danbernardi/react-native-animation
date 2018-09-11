import React from 'react';
import { number } from 'prop-types';
import { View, Text } from 'react-native';
import { pageMargins } from '../../styles/mixins';

function Home(props) {
  return (
    <View style={ {
      ...pageMargins,
      flex: 1,
      width: props.windowWidth,
      backgroundColor: '#5d576b',
      alignItems: 'center',
      justifyContent: 'center'
    } }
    >
      <Text style={ { textAlign: 'center', fontSize: 25, color: '#fff' } }>Swipe right and left to navigate between pages</Text>
    </View>
  );
}

Home.propTypes = {
  windowWidth: number
};

export default Home;
