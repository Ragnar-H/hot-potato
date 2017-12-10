/* @flow */
import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView';
import Dropzone from './components/Dropzone';

import registerForPushNotificationsAsync from './api/RegisterForPushNotificationsAsync';

const STORE_USER_KEY = '@HotPotato:user_name';

type User = {
  device_id: string,
  player_name: string,
};

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
    const user = this.loadUser();
    if (!user) {
      this.registerUser();
    }

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  registerUser = () => {
    registerForPushNotificationsAsync().then(resp => {
      resp.json().then(data => {
        this.storeUser(data);
      });
    });
  };

  storeUser = async (user: User) => {
    try {
      await AsyncStorage.setItem(STORE_USER_KEY, user.player_name);
    } catch (error) {
      console.warn(error); //eslint-disable-line
    }
  };

  loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem(STORE_USER_KEY);
      if (user !== null) {
        // We have data!!
        return user;
      }
      return null;
    } catch (error) {
      console.warn(error); //eslint-disable-line
    }
  };

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
