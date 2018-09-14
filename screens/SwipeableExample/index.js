import React, { Component } from 'react';
import { ScrollView, Dimensions, Animated } from 'react-native';
import styles from './styles';
import { range } from 'lodash';
import AppWrapper from '../../containers/AppWrapper';
import Page from './Page';

class Swipeable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      currentXPosition: 0,
      backgroundColorProgress: new Animated.Value(0)
    };

    this.windowWidth = Dimensions.get('window').width;

    // Generate arbitrary number of page components
    this.routes = range(5).map((item) => (
      <Page key={ item } index={ item } />
    ));

    // Background colors for each page
    this.colors = [
      'rgba(255, 107, 107, 1)', // #ff6b6b
      'rgba(078, 205, 196, 1)', // #4ecdc4
      'rgba(064, 121, 140, 1)', // #40798C
      'rgba(122, 199, 079, 1)', // #7AC74F
      'rgba(255, 230, 109, 1)' // #ffe66d
    ];

    this.scrollHandler = this.scrollHandler.bind(this);
  }

  scrollHandler (evt) {
    const { currentXPosition } = this.state;
    const mouseX = evt.nativeEvent.pageX;

    if (mouseX < 25 || mouseX > (this.windowWidth - 25)) {
      let newXPosition = currentXPosition;

      if (currentXPosition > 0 && mouseX < 25) {
        newXPosition = currentXPosition - this.windowWidth;
      }

      if ((currentXPosition < this.windowWidth * (this.routes.length - 1)) &&
           mouseX > (this.windowWidth - 25)) {
        newXPosition = currentXPosition + this.windowWidth;
      }

      // Trigger scroll to next page
      this.scrollView.scrollTo({ x: newXPosition, y: 0, animated: true });

      // Trigger background color animation
      Animated.timing(this.state.backgroundColorProgress, {
        duration: 400,
        toValue: newXPosition
      }).start();

      this.setState({ currentXPosition: newXPosition });
    }
  }

  render () {
    // Map scroll width to background color state
    const backgroundColor = this.state.backgroundColorProgress.interpolate({
      inputRange: this.routes.map((route, index) => index * this.windowWidth),
      outputRange: this.colors
    });

    return (
      <AppWrapper>
        <Animated.View style={ [styles.container, { backgroundColor }] }>
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
