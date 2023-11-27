# Resources

This document contains resources that were helpful during development. Some of the sources listed may no longer be available, apologies if that is the case.

Each link will contain a short description on the contents and where it was helpful. This document is constantly changing and will likely never be "complete."

## Environment Setup

Setting up the development environment for a React Native application can be confusing and difficult. These are helpful resources which walk through how to setup the development environment and other helpful tips. Also see [this document](Setup.md).

[Setting up the development environment](https://reactnative.dev/docs/environment-setup?guide=native)

This guide is very helpful and referenced in the Setup document (found [here](Setup.md)).

## NOAA API

These are links that pertain to the NOAA API. This API is completely free to use for any purpose. 

[NOAA API Overview](https://www.weather.gov/documentation/services-web-api#/default/radar_servers)

This is an overview page of the NOAA API. *"All of the information presented via the API is intended to be open data, free to use for any purpose."* This page is helpful in understanding the API and how to make calls to it. The documentation is not the greatest, though, so keep that in mind. 

## Android Location Permissions

Asking the user for permissions can be confusing. This was a tough concept at first and a lot of time was spent trying to get this working. 

[Asking for permissions at runtime (Stackoverflow)](https://stackoverflow.com/questions/45822318/how-do-i-request-permission-for-android-device-location-in-react-native-at-run-t)

Asking for permissions at application runtime is not always best practice. It is usually encouraged to ask for permissions for a specific feature of an application. However, sometimes it is necessary to ask for permissions at runtime, this Stackoverflow question covers how to do that. 

[PermissionsAndroid | React Native Docs](https://reactnative.dev/docs/permissionsandroid#permissions-that-require-prompting-the-user)

`PermissionsAndroid` is how React Native interacts with Android specific permissions. This is the documentation for this feature.

[Request Location Permissions | Android Dev Docs](https://developer.android.com/develop/sensors-and-location/location/permissions)

This is the official Android documentation regarding requesting location permissions. This is not super helpful for React Native applications, but may still be referenced. 

[Asking user for permissions (Android) guide](https://dev.to/gautham495/asking-for-permissions-in-react-native-c87)

This guide covers how to ask a user for permissions (Android). It is very helpful and discusses well what to do and why it is needed.

## Geolocation

Geolocation is an important aspect of any app that requires real-time-access to location data. These sources cover how to use 3rd party repositories to access and interact with device (Android) location information. 

[react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service)

This is a repository often recommended for React Native Geolocation. It offers capabilities for both Android and IOS devices. [Here](https://www.npmjs.com/package/react-native-geolocation-service) is the npmjs page, which covers installation, compatibility, setup, and usage. 

[Obtain Lat & Long (StackOverflow)](https://stackoverflow.com/questions/66245245/how-store-latitude-and-longitude-from-navigator-geolocation-getcurrentposition)

Although the `navigator.geolocation.GetCurrentPosition()` code is not used in the codebase, this Stackoverflow question sheds some light on how to obtain that information with [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service).

## Asynchronous Programming

Asynchronous programming can be confusing and in full stack applications, it is a must. These resources explain the basics, along with more detailed items on using and thinking about asynchronous programming. 

[Typescript `async/await`](https://blog.logrocket.com/async-await-in-typescript/)

This article explains asynchronous programming in typescript a bit more, and covers specifics like promises, async/await, try/catch, and other helpful asynchronous things.

## Date And Time Handling

Since this application is small, it was decided to make a custom time handler. This file (found [here](../Handlers/Time.tsx)) can handle [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) timestamps and convert them into usable data for other functions and components. Here are a few resources that were helpful while building out this capability.

[Timestamp Converter](https://www.timestamp-converter.com/)

This timestamp converter was very useful for quick testing and checking against other kinds of timestamps.

[Calculate Day of The Week](https://artofmemory.com/blog/how-to-calculate-the-day-of-the-week/)

For some date calculations, the day of the week is needed. This was a helpful guide on one of the ways to calculate the day of the week. The exact method this guide used, was not incorporated into the code. 

[Gauss's Algorithm](https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week#Gauss's_algorithm)

This algorithm for determining the day of the week for any date on the Gregorian calendar was used in the [`Time.tsx`](../Handlers/Time.tsx) time handling file. 

[DST Rules - NIST](https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst)

This article talks about the rules around DST, when it starts and when it ends. This was helpful for determining when DST is being observed or not. 

[MDM Docs - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

This documentation refers to the JavaScript `Date` object. This was helpful for obtaining the current device time and comparing it against the current UTC time. This documentation was discovered from [this Stackoverflow question](https://stackoverflow.com/questions/37271356/how-to-get-the-current-date-in-reactnative).

## Frontend UI & UX

This section lists resources which were used to help further understand certain UI items and UX flow. 

[Expanding a Component (Stackoverflow)](https://stackoverflow.com/questions/72471761/how-to-create-expandable-view-for-product-details-in-react-native)

For the seven day forecast, there is glanceable information. However, it would be helpful to get more detailed forecast information. To do this, an expanded view was needed. This Stackoverflow question and answer covers one method of attempting to accomplish that. 

[Component State](https://reactnative.dev/docs/intro-react#state)

This React Native document (specifically where it refers to State) was very helpful in understanding how components have "memory" and how you use that memory and change it to suit the desired functionality.
