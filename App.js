/* @flow */
import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
//$FlowFixMe this is being ignored right now
import { Notifications } from 'expo';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView';
import Dropzone from './components/Dropzone';
import UserProfile from './components/UserProfile';

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
  userName: ?string,
};

export default class App extends React.Component<void, void, State> {
  state: State;
  _notificationSubscription: () => void;
  state = {
    droppedInZone: false,
    notification: null,
    userName: null,
  };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );

    this.loadUser().then(userName => {
      if (!userName) {
        this.registerUser();
      }
    });
  }

  registerUser = async () => {
    const resp = await registerForPushNotificationsAsync();

    const data: User = await resp.json();

    await this.storeUser(data);
    this.setState({ userName: data.player_name });
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
        this.setState({ userName: user });
        return user;
      }
      return null;
    } catch (error) {
      console.warn(error); //eslint-disable-line
      return null;
    }
  };

  deleteUser = async () => {
    try {
      await AsyncStorage.removeItem(STORE_USER_KEY);
      this.setState({ userName: null });
    } catch (error) {
      console.warn(error); //eslint-disable-line
    }
  };

  _handleNotification = notification => {
    console.log('Got notification >>>>>>>>>>>> ', notification); //eslint-disable-line
    this.setState({ notification });
  };

  render() {
    const { userName } = this.state;
    return (
      <View style={styles.container}>
        <Dropzone />
        <DraggableView>
          <Potato />
        </DraggableView>
        {userName && (
          <UserProfile userName={userName} handleOnPress={this.deleteUser} />
        )}
      </View>
    );
  }
}
