/* @flow */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView';
import Dropzone from './components/Dropzone';

import registerForPushNotificationsAsync from './api/RegisterForPushNotificationsAsync';

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
  notification: ?string,
};

export default class App extends React.Component {
  state: State;
  _notificationSubscription: () => void;
  state = {
    droppedInZone: false,
    notification: null,
  };

  componentWillMount() {
    registerForPushNotificationsAsync().then(resp => {
      //FixMe: store and show the player name
      console.log(resp); // eslint-disable-line
    });

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification });
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
