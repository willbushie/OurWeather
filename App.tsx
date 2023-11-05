import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RequestFineLocation } from './Handlers/Permissions.tsx';
import { Update } from './Handlers/Networking.tsx';



/* Home Page Component */
const HomePage = () => {
  return (
    <ScrollView style={{marginTop: '15%'}}>
      <CurrentWeather />
      <FortyEightHourForecast />
    </ScrollView>
  );
};

/* Current Weather Data - Home Page Component */
const CurrentWeather = () => {
  const dummy_data = {
    'curr_temp':'80 °F',
    'day_high':'85°',
    'day_low':'65°',
    'feels_like':'81°',
    'location':'New York City'
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.curr_glance_data, {fontSize: 50}]}>{dummy_data['curr_temp']}</Text>
      <Text style={styles.curr_glance_data}>{dummy_data['day_high']} / {dummy_data['day_low']} Feels like {dummy_data['feels_like']}</Text>
      <Text style={styles.curr_glance_data}>{dummy_data['location']}</Text>
    </View>
  );
};

/* 48 Hour Forecast - Home Page Component */
const FortyEightHourForecast = () => {
  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <ScrollView horizontal={true}>
        <FortyEightHourSingleHour time='4PM' temp='87°' picture='Clear' precipitation='0%'/>
        <FortyEightHourSingleHour time='5PM' temp='87°' picture='Clear' precipitation='0%'/>
        <FortyEightHourSingleHour time='6PM' temp='87°' picture='Clear' precipitation='0%'/>
        <FortyEightHourSingleHour time='7PM' temp='87°' picture='Clear' precipitation='0%'/>
        <FortyEightHourSingleHour time='8PM' temp='87°' picture='Clear' precipitation='0%'/>
        <FortyEightHourSingleHour time='9PM' temp='87°' picture='Clear' precipitation='0%'/>
        <FortyEightHourSingleHour time='10PM' temp='87°' picture='Clear' precipitation='15%'/>
        <FortyEightHourSingleHour time='11PM' temp='87°' picture='Clear' precipitation='40%'/>
        <FortyEightHourSingleHour time='12AM' temp='87°' picture='Clear' precipitation='50%'/>
        <FortyEightHourSingleHour time='1AM' temp='87°' picture='Clear' precipitation='20%'/>
        <FortyEightHourSingleHour time='2AM' temp='87°' picture='Clear' precipitation='10%'/>
      </ScrollView>
    </View>
  );
};

/* Props for 48 Hour Forecast - Single Hour Component */
type FortyEightHourSingleHourProps = {
  time: string;
  temp: string;
  /* vvv this is only a string for the time being vvv */
  picture: string;
  precipitation: string;
};

/* 48 Hour Forecast - Single Hour Component */
const FortyEightHourSingleHour = (props: FortyEightHourSingleHourProps) => {
  return (
    <View style={styles.hour_container}>
      <Text>{props.time}</Text>
      <Text>{props.temp}</Text>
      <Text>{props.picture}</Text>
      <Text>{props.precipitation}</Text>
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


/* Application returned */
function App(): JSX.Element {
  /* Request location permission at application runtime */
  async: RequestFineLocation();

  /* Test Getting all update info */
  async: Update();

  return (
    <HomePage></HomePage>
  );
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

export default App;