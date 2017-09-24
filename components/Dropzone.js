import React from 'react';

import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4d00ff',
    height: 100,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default class Dropzone extends React.Component {
  render() {
    return <View style={styles.container} />;
  }
}
