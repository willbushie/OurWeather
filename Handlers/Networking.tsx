import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';



/**
 * Update all weather data
 *
 * @return array
 */
export async function Update() {}

/**
 * Request all weather data using device coordinates
 *
 * @param string lat
 * @param string long
 *
 * @return array
 */
export async function RequestAllWeatherWithCoordinates(lat: string = '39.7456', long: string = '-97.0892') {
  const url = 'https://api.weather.gov/points/' + lat + ',' + long;

  try {
    const response = await fetch(
      url,
    );
    const json = await response.json();
    /* This is a dev alert - comment out for user */
    alert(json.geometry.coordinates);
  }
  catch (error) {
    console.error(error);
  }
};

/**
 * Get user coordinates for current weather API call
 *
 *
 */
export async function GetCoordinates() {
  const hasPermission = await hasLocationPermission();
  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        lat = position.coords.latitude;
        long = position.coords.longitude;
        alert('lat: ' + lat + ',' + ' long: ' + long);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
};

/**
 * Check if user has granted location permission
 *
 * reference: https://github.com/Agontuk/react-native-geolocation-service/blob/master/example/src/App.tsx
 *
 * @return boolean
 */
const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  }
  else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};