/* @flow */
export const API_URL = 'https://d540ae49.ngrok.io';

export const tossPotato = async () =>
  await fetch(`${API_URL}/potato`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
