// Simple React Native specific changes

////////import '../I18n/I18n';

let AppConfig = {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  darkMode: true
};

export const toggleDarkMode = () => {
  AppConfig.darkMode = !AppConfig.darkMode
}

export default AppConfig
