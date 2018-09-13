import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated, PanResponder } from 'react-native';
import styles from './styles';
import { range } from 'lodash';
import AppWrapper from '../../containers/AppWrapper';
import Page from './Page';

class Swipeable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0),
      scrollEnabled: false,
      currentXPosition: 0
    };

    this.windowWidth = Dimensions.get('window').width;
    this.colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#40798C',
      '#7AC74F',
      '#ffe66d'
    ];

    this.routes = range(5).map((item, index) => (
      <Page
        key={ item }
        index={ item }
        color={ this.colors[index] }
      />
    ));

    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        // clearTimeout(this.timeout);
        // this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
        if (gestureState.x0 < 25 || gestureState.x0 > this.windowWidth - 25) {
          this.scrollView.scrollTo({ x: gestureState.x0, y: 0, animated: false });
        }
      },

      onPanResponderMove: Animated.event([
        null, { dx: 0, dy: 0 }
      ]),

      onPanResponderRelease: (e, gestureState) => {
        // this.state.pan.flattenOffset();
        // let newYValue = null;
      }
    });
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.scrollView.scrollTo({ x: this.windowWidth * (this.routes.length - 1), y: 0, animated: true })
    // }, 1000);
  }

  scrollHandler (evt) {
    const { currentXPosition } = this.state;
    const mouseX = evt.nativeEvent.locationX;

    if (mouseX < 25 || mouseX > (this.windowWidth - 25)) {
      let newXPosition = currentXPosition;

      if (currentXPosition > 0 && mouseX < 25) {
        newXPosition = currentXPosition - this.windowWidth;
      }

      if ((currentXPosition < this.windowWidth * (this.routes.length - 1)) &&
           mouseX > (this.windowWidth - 25)) {
        newXPosition = currentXPosition + this.windowWidth;
      }
      
      this.scrollView.scrollTo({ x: newXPosition, y: 0, animated: true });
      this.setState({ currentXPosition: newXPosition });
    }
  }

  render () {
    return (
      <AppWrapper>
        <Animated.View
          style={ styles.container }
          // { ...this._panResponder.panHandlers }
        >
          <ScrollView
            style={ { flex: 1, width: this.windowWidth } }
            horizontal={ true }
            pagingEnabled={ true }
            scrollEnabled={ false }
            onTouchStart={ this.scrollHandler }
            directionalLockEnabled={ true }
            removeClippedSubviews={ true }
            ref={ el => { this.scrollView = el; } }
          >
            { this.routes.map(component => React.cloneElement(component, {
              windowWidth: this.windowWidth
            }))
            }
          </ScrollView>
        </Animated.View>
      </AppWrapper>
    );
  }
}

export default Swipeable;
