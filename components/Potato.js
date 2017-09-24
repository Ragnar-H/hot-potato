import React from 'react';
import { Image } from 'react-native';

export default class Potato extends React.Component {
  render() {
    return <Image source={require('../images/potato.jpeg')} />;
  }
}
