


/**
 * Request all weather data using device coordinates
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