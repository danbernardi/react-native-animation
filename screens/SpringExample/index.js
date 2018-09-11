import React, { Component } from 'react';
import { number } from 'prop-types';
import {
  View, Text, Animated, TouchableHighlight, Dimensions
} from 'react-native';
import styles from './styles';

class SpringExample extends Component {
  constructor(props) {
    super(props);

    this.boxCount = 30;
    this.boxes = {};

    let i;
    for (i = 0; i < this.boxCount; i++) {
      this.boxes[`box${i}Position`] = new Animated.Value(Dimensions.get('window').height * -1);
    }

    this.state = { ...this.boxes };

    this.triggerAnimation = this.triggerAnimation.bind(this);

    this.inSpringConfig = {
      stiffness: 120,
      damping: 17,
      velocity: 1000,
      useNativeDriver: true
    };

    this.outSpringConfig = {
      stiffness: 150,
      damping: 16,
      useNativeDriver: true
    };
  }

  triggerAnimation() {
    Animated.sequence([
      Animated.stagger(40, Object.keys(this.boxes).reverse().map((box) => (
        Animated.spring(this.state[box], { toValue: 0, ...this.inSpringConfig })
      ))),

      Animated.stagger(25, Object.keys(this.boxes).map((box) => (
        Animated.spring(this.state[box], { toValue: Dimensions.get('window').height * -1, ...this.outSpringConfig })
      )))
    ]).start();
  }

  render() {
    return (
      <View style={ { flex: 1, width: this.props.windowWidth, backgroundColor: '#6cd4ff' } }>
        <View style={ {
          flex: 5, backgroundColor: '#94dfff', alignItems: 'center', justifyContent: 'center'
        } }
        >
          <View style={ styles.animationContainer }>
            { Object.keys(this.boxes).map((box, index) => (
              <Animated.View
                key={ index }
                style={ { transform: [{ translateY: this.state[box] }] } }
              >
                <View style={ styles.box } />
              </Animated.View>
            )) }
          </View>
        </View>

        <View style={ {
          flex: 1, alignItems: 'center', justifyContent: 'center', height: 100
        } }
        >
          <TouchableHighlight style={ styles.btn } onPress={ this.triggerAnimation } underlayColor="#326174">
            <Text style={ { color: 'white', fontWeight: 'bold', fontSize: 20 } }>Trigger animation</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

SpringExample.propTypes = {
  windowWidth: number
};

export default SpringExample;
