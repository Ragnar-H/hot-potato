import React from 'react';

import { Animated, PanResponder } from 'react-native';
import { tossPotato } from '../api/api';

export default class DraggableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
    };
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x, // x,y are Animated.Value
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropZone(gesture)) {
          tossPotato();
        }
        Animated.spring(
          this.state.pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 } }
        ).start();
      },
    });
  }

  isDropZone = gesture => {
    const dropY = 0;
    const dropHeight = 100;
    return gesture.moveY > dropY && gesture.moveY < dropY + dropHeight;
  };

  render() {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.state.pan.getLayout()}>
        {this.props.children}
      </Animated.View>
    );
  }
}
