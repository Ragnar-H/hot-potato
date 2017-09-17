import React from 'react';
import {Animated,  StyleSheet, Text, View, PanResponder } from 'react-native';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView'

export default class App extends React.Component {

  state={
    x: 50,
    y: 25
  }
  render() {
    return (
      <View style={styles.container}>
        <DraggableView>
        <Potato/>
        </DraggableView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa500',
  },
});
