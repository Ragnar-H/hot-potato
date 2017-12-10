/* @flow */
import React from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

type Props = {
  userName: string,
  handleOnPress: () => Promise<*>,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: '#9cd5e0',
    width: '100%',
    bottom: 7,
    alignItems: 'center',
  },
  textBox: {
    fontSize: 18,
    padding: 15,
  },
});

const UserProfile = ({ userName, handleOnPress }: Props) => (
  <TouchableHighlight onPress={handleOnPress} style={styles.container}>
    <Text style={styles.textBox}>Welcome {userName}</Text>
  </TouchableHighlight>
);

export default UserProfile;
