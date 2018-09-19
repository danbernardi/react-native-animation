import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import AppWrapper from '../../containers/AppWrapper';
import LottieView from 'lottie-react-native';

class LottieAnimationExample extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.animation.play();
  }

  render() {
    return (
      <AppWrapper>
        <View style={ { flex: 1, backgroundColor: 'salmon', alignItems: 'center' } }>
          <LottieView
            ref={ el => { this.animation = el; } }
            source={ require('./animation-w360-h360.json') }
            style={ { flex: 1 } }
          />
        </View>
      </AppWrapper>
    );
  }
}

export default LottieAnimationExample;
