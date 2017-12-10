/* @flow */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  userName: string,
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

export const UserProfile = ({ userName }: Props) => (
  <View style={styles.container}>
    <Text style={styles.textBox}>Welcome {userName}</Text>
  </View>
);

export default UserProfile;
