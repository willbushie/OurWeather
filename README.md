# React Native Weather Application

A simple and quick Weather Application created with React Native.

## Inspiration

I haven't found a weather application that I like. One that's fast, doesn't contain ads, and is no-nonsense. I wanted to challenge myself to create a weather application that doesn't have ads, doesn't have news stories or any other nonsense, and is completely self sufficient and free to use (and operate). 

My focus isn't creating an income source, it's creating a simple weather application that I would enjoy using. My only goal is a great user experience (spending as little money as possible on development, and having zero operating costs).

## Project Goals

The goal is to create a quick, easy to use React Native Android Application.

- [x] Setup React, Node.js, & JDK.
- [x] Setup Android Studio for Emulator & external device testing.
- [ ] Setup a simple home page layout for displaying current and forecasted weather information.
- [x] Separate code files and document extensively as if other developers were working on this project.
- [ ] Maintain helpful and extensive documentation as though other developers were working on this project.
- [x] Obtain a devices current location (longitude & latitude), for fetching from weather API.
- [x] Fetch weather data from the NOAA API and display it to the user.
- [ ] Allow the user to save multiple locations to check weather in more than just the current location.
- [ ] Give the user a few settings to customize their application experience (refresh period, etc).
- [ ] Make the application look nice, utilize photos, backdrops, and light/dark themes.
- [ ] Create a simple home screen widget that will update once every hour.
- [ ] Release application on the Google Play Store.

# How To Run

If local development is desired, please refer to [this](./Docs/Setup.md) document for more details.

## Project Dependencies

Here is a list of packages and resources that are needed for the codebase to function. If following the above guide, the process is relatively straight forward. 

- [React Native](https://reactnative.dev/) ([Docs](https://reactnative.dev/docs/getting-started))
- Node.js ([Docs](https://nodejs.org/en/docs) | [Download](https://nodejs.org/en/download))
- Java Development
  Kit ([JDK11 Download](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html))
- Android Studio ([Download](https://developer.android.com/studio))
- react-native-geolocation-service ([GitHub](https://github.com/Agontuk/react-native-geolocation-service) | [npm](https://www.npmjs.com/package/react-native-geolocation-service))

## APIs

This is a list of all APIs used for this project. Similar to dependencies, without these APIs, this application would not function.

- [NOAA API | Overview](https://www.weather.gov/documentation/services-web-api#/default/radar_servers)

# Takeaways

Here are the things I learned and took away from this project.

## Steps & Time To Complete

Here are the steps I took to accomplish this project.

| Description | Total Time | Explanation |
|--|--|--|
| Setup README & Git | 10 min | Format README and setup Git repos (local & remote). |
| Documentation | 50 min | Further documentation for the project and codebase. |
| Setup development environment | 2 hrs | Download all dependencies & setup Android Studio. Had some issues getting device emulation to work correctly. |
| Simple home page layout | 5 hrs 55 min | Setup a basic home page layout to have an avenue for fetching and displaying data to the user. |
| Obtain location data from device | 4 hrs 50 min | Research & obtain location permissions from user device for precise current location weather. | 
| API Data | 8 hrs 20 min | Fetch forecast data from NOAA API and output to application. |
| Timestamp Handling | 5 hr 30 min | Custom ISO8601 timestamp conversion. |
| Data Cleaning & Formatting | 1 hr 30 min | Cleaning and formatting useful data obtained from the API. |

~~**Total project time (including coding & research):**~~
**Current Project Total: 29 hrs 20 min**

## What I Learned

A list of things that I learned during this project.

- How to setup a React Native project (for Android development specifically).
- Creating and using custom components in React Native.
- Horizontal scroll with `<ScrollView>`.

## Resources

This list has become very long. To view the list and what resources were helpful, they can be found [here](./Docs/Resources.md).

## Contact

If you'd like to contact me, you can reach me at my email [here](mailto:willbushie@gmail.com).