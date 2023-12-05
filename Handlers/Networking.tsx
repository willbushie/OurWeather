import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    PermissionsAndroid,
    Platform,
    ToastAndroid,
    Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../app.json';



/**
 * Update all weather data
 *
 * @return array
 */
export async function Update() {
    try {
        const coordinates: Coordinates = await GetCoordinates();
        const lat = coordinates.lat;
        const long = coordinates.long;
        const init_data: InitData = await RequestAllWeatherWithCoordinates(String(lat), String(long));
        const seven_day_data = RequestSevenDayWeather(await init_data.seven_day_url);
        const forty_eight_hour_data = RequestFortyEightHourWeather(await init_data.forty_eight_hour_url);
        const grid_data = RequestGridData(await init_data.grid_data_url)
        const all_data = {
            'init_data': init_data,
            'seven_day_data': await seven_day_data,
            'forty_eight_hour_data': await forty_eight_hour_data,
            'grid_data': await grid_data
        };
        return all_data;
    }
    catch (error) {
        console.error('./Handlers/Networking.tsx:Update:', error);
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
export async function RequestAllWeatherWithCoordinates(lat, long) {
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
export async function RequestSevenDayWeather(url: string) {
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
            'all_periods': json.properties.periods,
            'paired_periods': SortDayPeriods(json.properties.periods)
        };
        return seven_day_data;
    }
    catch (error) {
        console.error('./Handlers/Networking.tsx:RequestSevenDayWeather:', error);
    }
};

/**
 * Interface Periods (used in `SortDayPeriods()`)
 */
interface Period {
    number: number,
    name: string,
    startTime: string,
    endTime: string,
    isDayTime: boolean,
    temperature: number,
    temperatureUnit: string,
    temperatureTrend: number|null,
    probabilityOfPrecipitation: {
        unitCode: string;
        value: number|null;
    };
    dewpoint: {
        unitCode: string;
        value: number|null;
    };
    relativeHumidity: {
        unitCode: string;
        value: number|null;
    };
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

/**
 * Sort all periods from seven day forecast into
 *  pairs or the same day (morning & evening)
 *
 * @param array periods
 *  All periods from the seven day forecast
 *
 * @return array
 *  [{'2023-11-16T06:00:00-08:00' : {
 *    'morning':{<PERIOD OBJECT> | null},
 *    'evening':{<PERIOD OBJECT> | null}
 *    },
 *  {},...
 *  }]
 */
function SortDayPeriods(periods: Array<Period>) {
    let sorted_periods: { [key: string]: { morning: Object | null; evening: Object | null; } }[] = [];

    for (let index = 0; index < periods.length; index++) {
        const d_one_start = periods[index].startTime.substring(8,10);
        const d_one_start_timestamp = periods[index].startTime;
        const d_two_start = (index + 1 < periods.length)? periods[index+1].startTime.substring(8,10) : '';

        /* day two is not blank, and both match */
        if (d_two_start != '' && d_one_start === d_two_start) {
            const pair_object = {'morning':periods[index],'evening':periods[index+1]};
            const obj: { [key: string]: { morning: Object; evening: Object; } } = {};
            obj[d_one_start_timestamp] = pair_object;
            sorted_periods.push(obj);
            index = index + 1;
        }
        /* day two is not blank, but they don't match */
        else if (d_two_start != '' && d_one_start != d_two_start) {
            const pair_object = {'morning':null,'evening':periods[index]};
            const obj: { [key: string]: { morning: null; evening: Object; } } = {};
            obj[d_one_start_timestamp] = pair_object;
            sorted_periods.push(obj);
        }
        /* day two is blank */
        else if (d_two_start === '') {
            const pair_object = {'morning':periods[index],'evening':null};
            const obj: { [key: string]: { morning: Object; evening: null; } } = {};
            obj[d_one_start_timestamp] = pair_object;
            sorted_periods.push(obj);
        }
    }
    return sorted_periods;
}

/**
 * Request all 48 hour weather data
 *
 * @param string url
 *
 * @return array
 */
export async function RequestFortyEightHourWeather(url: string) {
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
export async function RequestGridData(url: string) {
    try {
        const response = await fetch(
            url,
        );
        const json = await response.json();
        /* This is a dev alert - comment out for user */
        const grid_data = {
            'update_time': json.properties.updateTime,
            'max_temps': json.properties.maxTemperature,
            'min_temps': json.properties.minTemperature
        };
        return grid_data;
    }
    catch (error) {
        console.error('./Handlers/Networking.tsx:RequestGridData:', error);
    }
};

/**
 * Interface Coordinates (used in `GetCoordinates()`)
 */
interface Coordinates{
    lat: number;
    long: number;
}

/**
 * Get user coordinates for current weather API call
 *
 * @return array
 */
export async function GetCoordinates(): Promise<Coordinates> {
    const hasPermission = await hasLocationPermission();
    return new Promise((resolve, reject) => {
        if (hasPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    resolve({ lat, long });
                },
                (error) => {
                    // See error code charts below.
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        else {
            reject(new Error("Location permission not granted"));
        }
    });
}

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

/**
 * Check for user permission on IOS.
 * 
 * reference: https://github.com/Agontuk/react-native-geolocation-service/blob/master/example/src/App.tsx
 * 
 * @returns boolean
 */
const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
};