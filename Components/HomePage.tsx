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
import {
  ConvertTimeWithOffset,
  ReadableISO,
  GetCurrentDeviceTime,
} from '../Handlers/Time.tsx';



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
      <SevenDayForecast seven_day_data={seven_day_data}/>
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
        {ConvertCelsiusToFahrenheit(max_temp)}° / {ConvertCelsiusToFahrenheit(min_temp)}°
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
  const start_time = period.startTime;
  const day_time = period.isDayTime;
  const temp = period.temperature;
  const temp_unit = period.temperatureUnit;
  const precip_percent = period.probabilityOfPrecipitation.value;
  const icon_url = period.icon;
  const short_forecast = period.shortForecast;

  /* make time conversions if necessary to display relative to user's time */
  const device_time = GetCurrentDeviceTime();
  const start_time_data = ReadableISO(start_time);
  const device_offset = device_time.device.offset;
  let hour_str = '';
  if (start_time_data.offset != device_offset) {
    const converted_timestamp = ConvertTimeWithOffset(start_time,device_offset);
    const converted_time_data = ReadableISO(converted_timestamp);
    hour_str = converted_time_data.twelve_hour + ' ' + converted_time_data.day_night;
  }
  else {
    hour_str = start_time_data.twelve_hour + ' ' + start_time_data.day_night;
  }

  return (
    <View style={styles.hour_container}>
      <Text>{hour_str}</Text>
      <Text>{temp}°</Text>
      <Text></Text>
      <Text>{precip_percent}%</Text>
    </View>
  );
};

/* 7 Day Forecast - Home Page Component */
const SevenDayForecast = ({seven_day_data}) => {
  const all_pairs = seven_day_data.paired_periods;
  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      {all_pairs.map((pair, index) => (
        <SevenDayForecastSingleDay key={index} period={pair}/>
      ))}
    </View>
  );
};

/* 7 Day Forecast - Single Day Forecast */
const SevenDayForecastSingleDay = ({period}) => {
  const timestamp = Object.keys(period)[0];
  /* pass to Time.tsx and get the day of the week */
  const day_of_week = timestamp.substring(8,10);

  /* setting morning variables */
  let m_name = '-';
  let m_day_time = '-';
  let m_temp = '-';
  let m_temp_unit = '-';
  let m_precip_percent = '-';
  let m_wind_speed = '-';
  let m_wind_direction = '-';
  let m_icon_url = '-';
  let m_short_forecast = '-';
  let m_detailed_forecast = '-';

  /* setting evening variables */
  let e_name = '-';
  let e_day_time = '-';
  let e_temp = '-';
  let e_temp_unit = '-';
  let e_precip_percent = '-';
  let e_wind_speed = '-';
  let e_wind_direction = '-';
  let e_icon_url = '-';
  let e_short_forecast = '-';
  let e_detailed_forecast = '-';

  /* update morning variables */
  if (period[timestamp].morning != null) {
    m_name = period[timestamp].morning.name;
    m_day_time = period[timestamp].morning.isDayTime;
    m_temp = period[timestamp].morning.temperature;
    m_temp_unit = period[timestamp].morning.temperatureUnit;
    m_precip_percent = period[timestamp].morning.probabilityOfPrecipitation.value;
    m_wind_speed = period[timestamp].morning.windSpeed;
    m_wind_direction = period[timestamp].morning.windDirection;
    m_icon_url = period[timestamp].morning.icon;
    m_short_forecast = period[timestamp].morning.shortForecast;
    m_detailed_forecast = period[timestamp].morning.detailedForecast;
  }

  /* update evening variables */
  if (period[timestamp].evening != null) {
    e_name = period[timestamp].evening.name;
    e_day_time = period[timestamp].evening.isDayTime;
    e_temp = period[timestamp].evening.temperature;
    e_temp_unit = period[timestamp].evening.temperatureUnit;
    e_precip_percent = period[timestamp].evening.probabilityOfPrecipitation.value;
    e_wind_speed = period[timestamp].evening.windSpeed;
    e_wind_direction = period[timestamp].evening.windDirection;
    e_icon_url = period[timestamp].evening.icon;
    e_short_forecast = period[timestamp].evening.shortForecast;
    e_detailed_forecast = period[timestamp].evening.detailedForecast;
  }

  /* calculate the day precipitation percentage */
  let day_precip_percent;
  if (m_precip_percent === '-') {
    day_precip_percent = e_precip_percent;
  }
  else if (e_precip_percent === '-') {
    day_precip_percent = m_precip_percent;
  }
  else {
    const m_weight = 0.5;
    const e_weight = 0.5;
    const m_percent = Number(m_precip_percent);
    const e_percent = Number(e_precip_percent);

    day_precip_percent = (m_percent * m_weight) + (e_percent * e_weight);
  }

  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <Text>{day_of_week}</Text>
      <Text style={[styles.seven_day_precip]}>{(day_precip_percent === null)? 0 :day_precip_percent}%</Text>
      <Text style={[styles.seven_day_m_temp]}>{(m_temp === '-')? '-' : m_temp + '°'}</Text>
      <Text style={[styles.seven_day_e_temp]}>{(e_temp === '-')? '-' : e_temp + '°'}</Text>
    </View>
  );
};

/* Current Radar - Home Page Component */
const Radar = () => {};

/* Extra Current Info - Home Page Component */
const ExtraInfo = ({}) => {
  return (
    <View>
      <ExtraInfoHumidity />
      <ExtraInfoWind />
    </View>
  );
};

/* Extra Current Info - Humidity */
const ExtraInfoHumidity = ({}) => {};

/* Extra Current Info - Wind */
const ExtraInfoWind = ({}) => {};

/* Extra Current Info - UV Index */
const ExtraInfoUVIndex = ({}) => {};

/* Extra Current Info - Air Quality Index */
const ExtraInfoAQI = ({}) => {};

/* Extra Current Info - Pollen */
const ExtraInfoPollen = ({}) => {};

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
  /* Seven day precipitation percentage */
  seven_day_precip: {
    position: 'absolute',
    left: '25%',
  },
  /* Seven day morning temperature */
  seven_day_m_temp: {
    position: 'absolute',
    left: '75%',
  },
  /* Seven day evening temperature */
  seven_day_e_temp: {
    position: 'absolute',
    left: '85%',
  },
});