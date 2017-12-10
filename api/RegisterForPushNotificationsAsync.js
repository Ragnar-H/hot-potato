import { Permissions, Notifications } from 'expo';
import superheroes from 'superheroes';
const PUSH_ENDPOINT =
  'https://mp1i7cg03f.execute-api.eu-west-1.amazonaws.com/dev/register';
// const PUSH_ENDPOINT = 'https://69b8ad8d.ngrok.io/register';

registerForPushNotificationsAsync = async () => {
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
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  const playerName = superheroes.random();
  // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: playerName,
      device_id: token,
    }),
  });
};

export default registerForPushNotificationsAsync;
