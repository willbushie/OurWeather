# Our Weather

Our Weather is a free, quick, and simple to use mobile weather application. 

**Project Status: In Development**

## Inspiration

Weather apps are very prevalent throughout app stores. Some are better than others, but many have terrible user experience, whether that be from ads, slow loading or a poor layout. This weather app aims to be different. 

Knowledge about the weather should be easily accessible for everyone, hence the name, "Our Weather." This weather app will not contain ads, and will never cost money to use. 

The goal of this project is to build the best weather app that is completely free for the user, and costs little to nothing to run and operate. To accomplish this, the app has some limitations. See the below section, Limitations, for more information. 

## Limitations

To achieve the goal of little to no operating cost and keeping the application ad free and free for the user, the application has some limitations. This section lists those limitations and why they exist.

# How To Run

To develop locally, please refer to [this](./Docs/Setup.md) document for more details.

## Project Dependencies

Here is a list of packages and resources that are needed for the codebase to function. If following the above guide, the process is relatively straight forward. 

- [React Native](https://reactnative.dev/) ([Docs](https://reactnative.dev/docs/getting-started))
- Node.js ([Docs](https://nodejs.org/en/docs) | [Download](https://nodejs.org/en/download))
- Java Development Kit ([JDK11 Download](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html))
- Android Studio ([Download](https://developer.android.com/studio))
- react-native-geolocation-service ([GitHub](https://github.com/Agontuk/react-native-geolocation-service) | [npm](https://www.npmjs.com/package/react-native-geolocation-service))

## Testing

Testing is an essential part of developing software. All documentation regarding testing can be found [here](Docs/Testing.md).

## APIs

These are the APIs used for this project. Similar with other dependencies, without these APIs, this project would not be possible. 

[NOAA API | Overview](https://www.weather.gov/documentation/services-web-api#/default/radar_servers)

The National Oceanic and Atmospheric Administration is completely free to use, for any purpose, in the United States. *"All of the information presented via the API is intended to be open data, free to use for any purpose."* All weather information is obtained from this API.

# Takeaways

Here are the things I learned and took away from this project.

## Project Goals

The goal is to create a quick, easy to use React Native Android Application.

### Application Goals

- [x] Fetch weather data from the NOAA API and display it to the user.
- [x] Obtain a devices current location (longitude & latitude), for fetching from the NOAA API.
- [ ] Setup a simple "home page" for displaying current location weather data.
- [ ] Allow saving of multiple locations.
- [ ] Custom Geolocation API.
- [ ] Local storage of weather data (for immediate updates).
- [ ] User settings and customization.
- [ ] Nice looking application, with images, backdrops, animations, light/dark themes, etc.
- [ ] Create a simple Android widget that dynamically updates.
- [ ] Release application on the Google Play Store.

### Learning/Self Goals

- [x] Setup React, Node.js, & JDK.
- [x] Setup Android Studio for testing with the emulator.
- [x] Separate code files and document extensively as if other developers were working on this project.
- [ ] Create and run simple tests on code to ensure functionality is as expected.
- [ ] Write Unit, E2E, and Integration tests.
- [ ] Maintain helpful and extensive documentation.

## Steps & Time To Complete

Here are the steps I took to accomplish this project.

| Description | Total Time | Explanation |
|--|--|--|
| README & Git Setup | 10 min | Format README and setup Git repos (local & remote). |
| Development Environment Setup | 2 hrs | Download all dependencies and setup Android Studio. Had some issues getting device emulation to work correctly. |
| Documentation | 1 hr 40 min | Any and all project documentation. |
| Cleaning & Formatting Code | 35 min | Cleaning and correctly formatting previously written code. |
| Frontend - Home Page | 13 hrs 20 min | Frontend home page for showing current/selected location weather information. |
| Device Location Data | 4 hrs 50 min | Research and obtain location permissions from user device for precise current location weather. |
| API Data | 8 hrs 20 min | Fetch forecast data from NOAA API and output to application. |
| Time Handling | 12 hr 10 min | Handling device and API timestamps for easier formatting throughout that application. |
| Data Cleaning & Formatting | 1 hr 30 min | Cleaning and formatting useful data obtained from the API. |
| Testing | 4 hr 20 min | Writing and conducting Unit, E2E, and Integration tests. |

**Current Project Total: 50 hrs 15 min**

## What I Learned

A list of things that I learned during this project.

## Resources

This list has become very long. To view the list and what resources were helpful, they can be found [here](./Docs/Resources.md).

## Contact

To contact me, I can reached [here](mailto:willbushie@gmail.com).
