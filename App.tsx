import React from 'react';
import { HomePage } from './Components/HomePage.tsx';
import { Update } from './Handlers/Networking.tsx';
import { RequestFineLocation } from './Handlers/Permissions.tsx';



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

export default App;