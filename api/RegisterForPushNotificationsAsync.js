/* @flow */
//$FlowFixMe: cant find expo in flow
import { Permissions, Notifications } from 'expo';
import superheroes from 'superheroes';
import { API_URL } from './api';

const PUSH_ENDPOINT = `${API_URL}/register`;

export type User = {
  id: string,
  push_token: string,
  username: string,
};

const registerForPushNotificationsAsync = async (): Promise<User> => {
  const { existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  // if (finalStatus !== 'granted') {
  //   return;
  // }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  const playerName = superheroes.random();

  const user = {
    username: playerName,
    push_token: token,
  };

  // POST the token to our backend so we can use it to send pushes from there
  const resp = await fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await resp.json();

  const userWithId = { ...user, id: data.id };
  return userWithId;
};

export default registerForPushNotificationsAsync;
