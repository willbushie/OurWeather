/**
 * Ask user for location access upon opening the application
 */
import React,{useEffect} from 'react';

import { PermissionsAndroid, View, Text} from 'react-native';

export async function RequestFineLocation() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'WeatherApp',
        'message': 'WeatherApp needs to access your location to automatically lookup weather at your current location.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location access granted')
      /* This is a dev alert - commented out for user */
      //alert('Location access granted');
    }
    else {
      console.log('Location access denied')
      /* This is a dev alert - commented out for user */
      //alert('Location access denied');
    }
  }
  catch (err) {
    console.warn(err)
  }
}