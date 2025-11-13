module.exports = function(api) {
  api.cache(true); //Hace que Babel cachee (recuerde) la configuración para mejor performance
  return {
    presets: ['babel-preset-expo'], //Usa la configuración predefinida de Expo
    plugins: [
      'react-native-reanimated/plugin', //Plugin ESPECIAL para las animaciones
    ],
  };
};