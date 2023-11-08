import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



/* Props for HomePage component */
type HomePageProps = {
  update_data: array;
};

/* Home Page Component */
export const HomePage = (props) => {
  const init_data = props.update_data.init_data;
  const seven_day_data = props.update_data.seven_day_data;
  const forty_eight_hour_data = props.update_data.forty_eight_hour_data;
  const grid_data = props.update_data.grid_data;

  return (
    <ScrollView style={{marginTop: '15%'}}>
      <CurrentWeather
        city={init_data.city_name}
        state={init_data.state_name}
        hour_period={forty_eight_hour_data.all_periods[0]}
        max_temps={grid_data.max_temps}
        min_temps={grid_data.min_temps}
      />
      <FortyEightHourForecast forty_eight_hour_data={forty_eight_hour_data} />
    </ScrollView>
  );
};

/* Props for Current Weather Component */
type CurrentWeatherProps = {
  city: string;
  state: string;
  hour_period: array;
  max_temps: array;
  min_temps: array;
};

/* Current Weather Data - Home Page Component */
const CurrentWeather = (props) => {
  const start_time = props.hour_period.startTime;
  const end_time = props.hour_period.endTime;
  const curr_temp = props.hour_period.temperature;
  const curr_temp_unit = props.hour_period.temperatureUnit;
  const day_time = props.hour_period.isDayTime;
  const precip_percent = props.hour_period.probabilityOfPrecipitation.value;
  const wind_speed = props.hour_period.windSpeed;
  const wind_direction = props.hour_period.windDirection;
  const icon_url = props.hour_period.icon;
  const short_forecast = props.hour_period.short_forecast;
  const max_temp = props.max_temps.values[0].value;
  const max_temp_unit = props.max_temps.uom[props.max_temps.uom.length - 1];
  const min_temp = props.min_temps.values[0].value;
  const min_temp_unit = props.min_temps.uom[props.min_temps.uom.length - 1];

  return (
    <View style={styles.container}>
      <Text style={[styles.curr_glance_data, {fontSize: 50}]}>{curr_temp} °{curr_temp_unit}</Text>
      <Text style={styles.curr_glance_data}>
        {ConvertCelsiusToFahrenheit(max_temp)} / {ConvertCelsiusToFahrenheit(min_temp)}
      </Text>
      <Text style={styles.curr_glance_data}>{props.city}, {props.state}</Text>
    </View>
  );
};

/* 48 Hour Forecast - Home Page Component */
const FortyEightHourForecast = ({forty_eight_hour_data}) => {
  const all_periods = forty_eight_hour_data.all_periods;
  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <ScrollView horizontal={true}>
        {all_periods.slice(0,48).map((period) => (
          <FortyEightHourSingleHour key={period.number} period={period}/>
        ))}
      </ScrollView>
    </View>
  );
};

/* 48 Hour Forecast - Single Hour Component */
const FortyEightHourSingleHour = ({period}) => {
  // this time should be converted to an actual time
  const start_time = ConvertISOTime(period.startTime);
  const day_time = period.isDayTime;
  const temp = period.temperature;
  const temp_unit = period.temperatureUnit;
  const precip_percent = period.probabilityOfPrecipitation.value;
  const icon_url = period.icon;
  const short_forecast = period.shortForecast;

  return (
    <View style={styles.hour_container}>
      <Text>{start_time}</Text>
      <Text>{temp}</Text>
      <Text></Text>
      <Text>{precip_percent}%</Text>
    </View>
  );
};

/* 7 Day Forecast - Home Page Component */
const SevenDayForecast = () => {};

/* 7 Day Forecast - Single Day Forecast */
const SevenDayForecastSingleDay = () => {};

/* Current Radar - Home Page Component */
const Radar = () => {};

/* Extra Current Info - Home Page Component */
const ExtraInfo = () => {};

/**
 * Convert Celsius to Fahrenheit
 *
 * @param int temp
 *
 * @return int
 */
function ConvertCelsiusToFahrenheit(temp) {
    return (temp * 1.8) + 32;
}

/**
 * Convert ISO8601 to Hour
 *
 * @param string time
 *  example input: '2023-11-07T21:00:00-06:00'
 *
 * @return string
 *  expected output: '9PM'
 */
function ConvertISOTime(time: string) {
    return '0AM';
}

/* All styling */
const styles = StyleSheet.create({
  /* parent container styling */
  container: {
    display: 'flex',
    margin: 10,
    padding: 3,
    textAlign: 'center',
    backgroundColor: 'rgba(223, 223, 223, 1)',
    width: '95%',
    borderRadius: 10,
  },
  /* styling for at a glance data container */
  curr_glance_data: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
  },
  /* 48 hour single hour container */
  hour_container: {
    justifyContent: 'space-between',
    width: 50,
    height: 100,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});