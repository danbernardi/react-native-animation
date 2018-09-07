import React, { Component } from 'react';
import { View, Text, PanResponder, Animated } from 'react-native';
import Item from './Item';
import { range } from 'lodash';
import styles from './styles';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];

  _arr.splice(from, 1);
  _arr.splice(to, 0, val);

  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

class ListItems extends Component {
  constructor (props) {
    super(props);

    this.items = [
      'Item',
      'Item',
      'Item',
      'Item',
      'Item'
    ];

    this.itemHeight = 65;

    this.state = {
      originalPosOfLastPressed: 0,
      order: range(this.items.length),
    }

    this.handleItemMove = this.handleItemMove.bind(this);
    this.handleItemPress = this.handleItemPress.bind(this);
  }

  handleItemPress = (posIndex) => {
    this.setState({
      originalPosOfLastPressed: this.state.order.indexOf(posIndex)
    });
  };

  handleItemMove = (event, gestureState) => {
    const { order, originalPosOfLastPressed } = this.state;

    const mouseY = gestureState.dy + (originalPosOfLastPressed * this.itemHeight);
    const currentRow = clamp(Math.round(mouseY / this.itemHeight), 0, this.items.length);
    console.log('order: ' + order);

    if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
      console.log('mouseY: ' + mouseY);
      console.log('currentRow: ' + currentRow);
      console.log('originalPostOfLastPressed: ' + originalPosOfLastPressed);
      console.log('-------');
      let newOrder = order.slice();
      newOrder = reinsert(newOrder, order.indexOf(originalPosOfLastPressed), currentRow);
      this.setState({ order: newOrder });
    }
  };

  render () {
    const { order } = this.state;
    const { enableScroll, disableScroll } = this.props;

    return (
      <View style={ { flex: 1, width: this.props.windowWidth, backgroundColor: '#6cd4ff', alignItems: 'center', justifyContent: 'center' } }>

        <View style={ styles.listContainer }>
          { this.items.map((item, index) => (
            <Item
              order={ order }
              enableScroll={ enableScroll }
              disableScroll={ disableScroll }
              key={ index }
              index={ index }
              itemHeight={ this.itemHeight }
              handleItemMove={ this.handleItemMove }
              handleItemPress={ this.handleItemPress }
            ><Text>{ `${item} ${order.indexOf(index) + 1} | ${index}` }</Text></Item>
          )) }
        </View>
      </View>
    );
  }
}

export default ListItems;
