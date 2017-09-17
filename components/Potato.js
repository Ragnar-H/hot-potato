import React from 'react';
import { AppRegistry, View, Image, StyleSheet } from 'react-native';


export default class Potato extends React.Component {
  
  render() {
    const {top, left } = this.props;
    return (<Image source={require('../images/potato.jpeg')} />)
  }
}

