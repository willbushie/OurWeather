import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { HomePage } from './Components/HomePage.tsx';
import { Update } from './Handlers/Networking.tsx';
import { RequestFineLocation } from './Handlers/Permissions.tsx';



/* Application returned */
function App(): JSX.Element {
  const [response, setResponse] = useState<any>(null);

  /* Request location permission at application runtime */
  async: RequestFineLocation();

  useEffect(() => {
    const fetchData = async () => {
      /* Request all updated information and load the page */
      const result = await Update();
      setResponse(result);
    };
    fetchData();
  }, []);

  return (
    <View>
      {response ? <HomePage update_data={response} /> : <View><Text>Loading...</Text></View>}
    </View>
    //<HomePage></HomePage>
  );
}

export default App;