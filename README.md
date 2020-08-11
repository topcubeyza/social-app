# Bemagine

_A mobile application built with React Native for iOS and Android._

Bemagine is a fictitious social network where users can share their recreational projects, such as making a wooden table, gardening, etc.
In reality, the only purpose is to demonstrate the developer's abilities as a React Native Developer.

Current Features
-----
- Signing up and signing in securely with email and password
- Signing up and signing in with Google account
- Resetting / changing password
- Deleting account
- Editing profile
- Localization. Currently supported languages are Turkish and English
- Theming: using the app in dark mode or light mode

_** Please note that the app is currently being developed and there will be new features._


Tools & Technologies Used
-----
The application is being developed with __React Native 0.61__. Some of the significant libraries/tools currently used are as follows:

- __Firebase__ `8.2.0`  
  [react-native-firebase](https://github.com/invertase/react-native-firebase)  
  Used for authentication. The services of Firebase used include but not limited to signing up, signing in, resetting password, verifying email.
  
- __Google Signin__ `4.0.3`  
  [react-native-community/google-signin](https://github.com/react-native-community/google-signin)  
  Used together with Firebase to allow the user to sign in with Google account.

- __React Navigation__ `3.11.0`  
  [react-navigation](https://github.com/react-navigation/react-navigation)  
  Used for managing the navigation within the app, obviously.

- __Redux / React Redux__ `4.0.4 / 6.0.1`  
  [redux](https://github.com/reduxjs/redux) -
  [react-redux](https://github.com/reduxjs/react-redux)  
  Used for managing the application's globally shared data.   
  Redux store holds some of the data fetched from the APIs as well as the localization and theming state of the app.

- __Redux Saga__ `1.0.5`  
  [redux-saga](https://github.com/redux-saga/redux-saga)  
  Used together with Redux to make asynchronous operations easier to manage.  
  Most of the complicated and multi-step asynchronious fetching operations in the app are handled beautifully by sagas.

- __Redux Persist__ `5.10.0`  
  [redux-persist](https://github.com/rt2zz/redux-persist)  
  Used for persisting data in Redux Store between reloads.

- __I18n for React Native__ `2.0.15`  
  [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n | width=50)  
  Used for managing localization.

  
Folder Structure
-----

Here is an explanation of the folder structure so that you can easily navigate the code.
The folder structure is a combination of the classical approach that categorizes files by their type and the modular approach that categorizes files by module.
As an example to modular approach, an authorization module folder would include any file that has anything to do with authorization, including views, utils, redux files.

#### App Folder
The app folder is actually the source folder where the developer's code lives.  

<img src="https://github.com/topcubeyza/social-app/blob/master/GithubReadmeImages/AppFolder.png?raw=true" width="150"/>  

- Assets: Images, fonts, animations and svg files.
- Components: React components used globally in the app and their styles.
- Config: Global config files.
- Fixtures: Dummy api data.
- Helpers: Files that have helper methods used globally in the app.
- Localization: This is the localization module. I18n configuration, translations, redux files, and any other file that is related to localization are located in this folder.  

  ![alt text](https://github.com/topcubeyza/social-app/blob/master/GithubReadmeImages/LocalizationFolder.png?raw=true)  

- Modules: UI Modules. Each UI Module has the same subfolder structure as shown in the image.  

  ![alt text](https://github.com/topcubeyza/social-app/blob/master/GithubReadmeImages/ModulesFolder.png?raw=true)  

- Navigation: React-Navigation-related files.
- Redux: Global Redux files, configuration files...
- Sagas: Global Saga files, configuration files...
- Services: Files that have methods to send requests to API
- StylingConstants: Fonts, Metrics, and SVG components
- Theming: This is the theming module. Configuration, colors, images, redux files, and any other file that is related to theming are located in this folder.  

  ![alt text](https://github.com/topcubeyza/social-app/blob/master/GithubReadmeImages/ThemingFolder.png?raw=true)  

Next Steps
-----

- Making the app available on TestFlight
- Developing a backend application to allow users to add content, follow other users, etc.
- Deploying the backend application
- Developing the user interface for the rest of the application.

Contact Me
-----

If you have any suggestion or criticism, I would be happy to learn how can I do better.
If you have any question or want to develop a feature similar to the ones in this app, I would be happy to share what I know.
