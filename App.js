import React from 'react';
import { StyleSheet, View } from 'react-native';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DraggableView>
          <Potato />
        </DraggableView>
      </View>
    );
  }
}
