import React, { Component } from 'react';
import { View, Text, Animated, TouchableHighlight } from 'react-native';

class AnimationTest extends Component {
  constructor (props) {
    super(props);

    this.boxCount = 20;
    this.boxes = {};

    let i;
    for (i = 0; i < this.boxCount; i++) {
      this.boxes[`box${i}Position`] = new Animated.Value(-510);
    }

    this.state = { ...this.boxes }

    this.triggerAnimation = this.triggerAnimation.bind(this);
    
    this.inSpringConfig = {
      stiffness: 150,
      damping: 17,
      velocity: 1000,
      useNativeDriver: true
    };

    this.outSpringConfig = {
      stiffness: 150,
      damping: 16,
      useNativeDriver: true
    };

    this.styles = {
      animationContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row'
      },

      box: {
        width: 40,
        height: 40,
        backgroundColor: 'salmon',
        marginTop: 25,
        marginBottom: 25,
        marginRight: 25,
        marginLeft: 25
      },
    
      btn: {
        backgroundColor: 'teal',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 50
      }
    }
  }

  triggerAnimation () {
    Animated.sequence([
      Animated.stagger(100, Object.keys(this.boxes).reverse().map((box, index) => (
        Animated.spring(this.state[box], { toValue: 0, ...this.inSpringConfig })
      ))),

      Animated.stagger(100, Object.keys(this.boxes).map((box, index) => (
        Animated.spring(this.state[box], { toValue: -510, ...this.outSpringConfig })
      )))
    ]).start();
  }

  render () {
    return (
      <View style={ { flex: 1 } }>
        <View style={ { flex: 3, backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center' } }>
          <View style={ this.styles.animationContainer }>
            { Object.keys(this.boxes).map((box, index) => (
              <Animated.View
                key={ index }
                style={ { ...this.styles.box, transform: [{ translateY: this.state[box] }] } }
              />
            )) }
          </View>
        </View>

        <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center', height: 100 } }>
          <TouchableHighlight style={ this.styles.btn } onPress={ this.triggerAnimation }>
            <Text style={ { color: 'white', fontWeight: 'bold', fontSize: 20 } }>Trigger animation</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default AnimationTest;
