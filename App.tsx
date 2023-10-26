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



function App(): JSX.Element {
  return (
    <ScrollView style={{marginTop: '15%'}}>
      <View style={styles.container}>
        <Text style={[styles.curr_glance_data, {fontSize: 50}]}>80 °F</Text>
        <Text style={styles.curr_glance_data}>85° / 65° Feels like 81°</Text>
        <Text style={styles.curr_glance_data}>New York City</Text>
      </View>
      <View style={styles.container}>
        <Text>48 Hour Forecast Section</Text>
      </View>
      <View style={styles.container}>
        <Text>7 Day Forecast Section</Text>
      </View>
      <View style={styles.container}>
        <Text>Radar Section</Text>
      </View>
      <View style={styles.container}>
        <Text>Extra Info Section</Text>
      </View>
    </ScrollView>
  );
}

/* All styling */
const styles = StyleSheet.create({
  /* all container styling */
  container: {
    display: 'flex',
    margin: 10,
    padding: 3,
    textAlign: 'center',
    backgroundColor: 'rgba(223, 223, 223, 1)',
    width: '95%',
    borderRadius: 10,
  },
  /* styling for at a glance data */
  curr_glance_data: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
  },
  row: {},
  column: {},
});

export default App;