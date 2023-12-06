# Testing

Testing is an essential part of writing clean, maintainable, and fixable code. This document covers what kind of testing is done and what the test cases should and shouldn't return. 

Great official documentation regarding testing in React Native found [here](https://reactnative.dev/docs/testing-overview).

## JestJS Testing

[Jest](https://jestjs.io/) is used for writing and conducting the tests for this codebase. A Getting Started Guide can be found [here](https://jestjs.io/docs/getting-started).

# Individual Testing Suites

All files listed here have tests. The `.test` files associate with them are listed here as well. 

## [`App.tsx`](../App.tsx) | [`App.test.tsx`](../Tests/App.test.tsx)

| Component/Function | Test |
|--|--|
| App | ❌ |

## [`HomePage.tsx`](../Components/HomePage.tsx) | []()

| Component/Function | Test |
|--|--|
| HomePage | ❌ |
| CurrentWeather | ❌ |
| FortyEightHourForecast | ❌ |
| FortyEightHourSingleHour | ❌ |
| SevenDayForecast | ❌ |
| SevenDayForecastSingleDay | ❌ |
| Radar | ❌ |
| ExtraInfo | ❌ |
| ExtraInfoHumidity | ❌ |
| ExtraInfoWind | ❌ |
| ExtraInfoUVIndex | ❌ |
| ExtraInfoAQI | ❌ |
| ExtraInfoPollen | ❌ |
| ConvertCelsiusToFahrenheit | ❌ |

## [`Networking.tsx`](../Handlers/Networking.tsx) | []()

| Function | Test |
|--|--|
| Update | ❌ |
| RequestAllWeatherWithCoordinates | ❌ |
| RequestSevenDayWeather | ❌ |
| SortDayPeriods | ❌ |
| RequestFortyEightHourWeather | ❌ |
| RequestGridData | ❌ |
| GetCoordinates | ❌ |
| hasLocationPermission | ❌ |
| hasPermissionIOS | ❌ |

## [`Permissions.tsx`](../Handlers/Permissions.tsx) | []()

| Function | Test |
|--|--|
| RequestFineLocation | ❌ |

## [`Time.tsx`](../Handlers/Time.tsx) | [`Time.test.ts`](../Tests/Time.test.ts)

| Function | Test |
|--|--|
| ConvertTimeWithOffset | ✔️ |
| ReadableISO | ✔️ |
| TwentyFourHourConversion | ✔️ |
| GetCurrentDeviceTime | ❌ |
| DST | ✔️ |
| DSTRules | ✔️ |
| DayOfTheWeek | ✔️ |
| LeapYear | ✔️ |
