import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import AppWrapper from '../../containers/AppWrapper';
import LottieView from 'lottie-react-native';

class LottieAnimationExample extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppWrapper>
        <View style={ { flex: 1, backgroundColor: '#05D962', alignItems: 'center' } }>
          <LottieView
            ref={ el => { this.animation = el; } }
            source={ require('./body_movin.json') }
            style={ { flex: 1 } }
          />

          <TouchableHighlight
            underlayColor="rgba(255, 255, 255, 0.9)"
            style={ {
              marginTop: 40,
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: 'white'
            } } onPress={ () => this.animation.play() }>
            <Text style={ { color: '#05D962', fontWeight: 'bold' } }>Start animation</Text>
          </TouchableHighlight>
        </View>
      </AppWrapper>
    );
  }
}

export default LottieAnimationExample;
