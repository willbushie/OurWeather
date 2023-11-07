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
export async function Update() {
  try {
    const coordinates = GetCoordinates();
    lat = await coordinates.lat;
    long = await coordinates.long;
    const init_data = await RequestAllWeatherWithCoordinates(lat, long);
    const seven_day_data = RequestSevenDayWeather(await init_data.seven_day_url);
    const forty_eight_hour_data = RequestFortyEightHourWeather(await init_data.forty_eight_hour_url);
    const grid_data = RequestGridData(await init_data.grid_data_url)
    const all_data = {
      'init_data': init_data,
      'seven_day_data': await seven_day_data,
      'forty_eight_hour_data': await forty_eight_hour_data,
      'grid_data': await grid_data
    };
    //console.log('./Handlers/Networking.tsx:Update:', all_data);
    return all_data;
  }
  catch (error) {
    console.error('./Handlers/Networking.tsx:Update:', error.message);
  }
};

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
    const init_data = {
      'grid_id': json.properties.gridId,
      'grid_x': json.properties.gridX,
      'grid_y': json.properties.gridY,
      'seven_day_url': json.properties.forecast,
      'forty_eight_hour_url': json.properties.forecastHourly,
      'grid_data_url': json.properties.forecastGridData,
      'city_name': json.properties.relativeLocation.properties.city,
      'state_name': json.properties.relativeLocation.properties.state,
      'timezone': json.properties.timeZone
    };
    return init_data;
  }
  catch (error) {
    console.error('./Handlers/Networking.tsx:RequestAllWeatherWithCoordinates:', error);
  }
};

/**
 * Request all 7 day weather data
 *
 * @param string url
 *
 * @return array
 */
export async function RequestSevenDayWeather(url) {
  try {
    const response = await fetch(
      url,
    );
    const json = await response.json();
    /* This is a dev alert - comment out for user */
    const seven_day_data = {
      'updated': json.properties.updated,
      'generated_at': json.properties.generatedAt,
      'update_time': json.properties.updateTime,
      'elevation_val': json.properties.elevation.value,
      'all_periods': json.properties.periods
    };
    return seven_day_data;
  }
  catch (error) {
    console.error('./Handlers/Networking.tsx:RequestSevenDayWeather:', error);
  }
};

/**
 * Request all 48 hour weather data
 *
 * @param string url
 *
 * @return array
 */
export async function RequestFortyEightHourWeather(url) {
  try {
    const response = await fetch(
      url,
    );
    const json = await response.json();
    /* This is a dev alert - comment out for user */
    const forty_eight_hour_data = {
      'updated': json.properties.updated,
      'generated_at': json.properties.generatedAt,
      'update_time': json.properties.updateTime,
      'elevation_val': json.properties.elevation.value,
      'all_periods': json.properties.periods
    };
    return forty_eight_hour_data;
  }
  catch (error) {
    console.error('./Handlers/Networking.tsx:RequestFortyEightHourWeather:', error);
  }
};

/**
 * Request further grid data
 *
 * @param string url
 *
 * @return array
 */
export async function RequestGridData(url) {
  try {
    const response = await fetch(
      url,
    );
    const json = await response.json();
    /* This is a dev alert - comment out for user */
    const grid_data = {
      'update_time': json.properties.updateTime,
      'max_temps': json.properties.maxTemperature,
      'min_temps': json.properties.minTemperatures
    };
    return grid_data;
  }
  catch (error) {
    console.error('./Handlers/Networking.tsx:RequestGridData:', error);
  }
};

/**
 * Get user coordinates for current weather API call
 *
 * @return array
 */
export async function GetCoordinates() {
  const hasPermission = await hasLocationPermission();
  if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('./Handlers/Networking.tsx:GetCoordinates:', position);
        lat = position.coords.latitude;
        long = position.coords.longitude;
        return {'lat':lat, 'long':long};
      },
      (error) => {
        // See error code charts below.
        console.log('./Handlers/Networking.tsx:GetCoordinates:', error.code, error.message);
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