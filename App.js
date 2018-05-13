/* @flow */
import React from 'react';
import { AsyncStorage, Text, StyleSheet, View } from 'react-native';
//$FlowFixMe this is being ignored right now
import { Notifications } from 'expo';
import firebase from 'firebase';

import Potato from './components/Potato';
import DraggableView from './components/DraggableView';
import Dropzone from './components/Dropzone';
import UserProfile from './components/UserProfile';

import registerForPushNotificationsAsync from './api/RegisterForPushNotificationsAsync';
import type { User } from './api/registerForPushNotificationsAsync';
import { firebaseConfig } from './firebaseConfig';

const STORE_USER_KEY = '@HotPotato:user_name';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa500',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Holder = {
  username: string,
  id: string,
};
type TPotato = {
  holder: Holder,
  explosion: string,
};
type State = {|
  droppedInZone: boolean,
  notification: ?string,
  user: ?User,
  potato: ?TPotato,
|};

export default class App extends React.Component<{}, State> {
  state: State;
  _notificationSubscription: () => void;
  state = {
    droppedInZone: false,
    notification: null,
    user: null,
    potato: null,
  };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    this.setupFirebase();
    this._subscribeToPotato();
    // this.tossPotato();
    this.loadUser().then(username => {
      if (!username) {
        this.registerUser();
      }
    });
  }

  setupFirebase = () => firebase.initializeApp(firebaseConfig);

  // tossPotato = async (userId: string = 'raggi-dev', msg: string = 'hello') => {
  //   firebase
  //     .database()
  //     .ref('users/' + userId)
  //     .set({
  //       message: msg,
  //     });
  // };

  registerUser = async () => {
    const user = await registerForPushNotificationsAsync();

    await this.storeUser(user);
    this.setState({ user });
  };

  storeUser = async (user: User) => {
    try {
      await AsyncStorage.setItem(STORE_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.warn(error); //eslint-disable-line
    }
  };

  loadUser = async () => {
    try {
      const userStringified = await AsyncStorage.getItem(STORE_USER_KEY);
      if (userStringified !== null) {
        const user = JSON.parse(userStringified);
        this.setState({ user });
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
      this.setState({ user: null });
    } catch (error) {
      console.warn(error); //eslint-disable-line
    }
  };

  _handleNotification = notification => {
    console.log('Got notification >>>>>>>>>>>> ', notification); //eslint-disable-line
    this.setState({ notification });
  };

  _subscribeToPotato = () => {
    firebase
      .database()
      .ref('potato')
      .on('value', snapshot => {
        const potato = snapshot.val();
        if (potato) {
          const potatoId = Object.keys(potato)[0];
          const peeledPotato = potato[potatoId];
          this.setState({ potato: peeledPotato });
        }
      });
  };

  render() {
    const { user, potato } = this.state;
    let holder = null;
    if (potato) {
      holder = potato.holder;
    }
    const holdsPotato = holder && user && holder.id === user.id;
    return (
      <View style={styles.container}>
        <Dropzone />
        <DraggableView>{holdsPotato && <Potato />}</DraggableView>
        {!holdsPotato && holder && <Text>{`${holder.username} has it`}</Text>}
        {user && (
          <UserProfile
            username={user.username}
            handleOnPress={this.deleteUser}
          />
        )}
      </View>
    );
  }
}
