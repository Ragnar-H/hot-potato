/* @flow */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView';
import Dropzone from './components/Dropzone';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type State = {
  droppedInZone: boolean,
};

export default class App extends React.Component {
  state: State;
  state = {
    droppedInZone: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Dropzone />
        <DraggableView>
          <Potato />
        </DraggableView>
      </View>
    );
  }
}
