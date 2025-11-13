import 'react-native-get-random-values'; //Permite usar Math.random() seguro
import 'react-native-gesture-handler'; //Maneja gestos (toques, deslizes)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //Contenedor de navegación
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //Creador de pantallas
import { AnimacionProvider } from './src/contexto/AnimacionContext';  //Estado global para animaciones

import PantallaBienvenida from './src/pantallas/PantallaBienvenida';
import PantallaLogin from './src/pantallas/PantallaLogin';
import PantallaActivacionCuenta from './src/pantallas/PantallaActivacionCuenta';
import PantallaActivacionContraseña from './src/pantallas/PantallaActivacionContrasena';

const Stack = createNativeStackNavigator(); //Crea el navegador de pantallas

export default function App() {
  return (
    <AnimacionProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            detachPreviousScreen: true,
          }}
        >
          <Stack.Screen 
            name="PantallaBienvenida"
            component={PantallaBienvenida}
            options={{
              animation: 'none',
              detachPreviousScreen: false,
            }}
          />
          <Stack.Screen 
            name="PantallaLogin" 
            component={PantallaLogin}
            options={{
              animation: 'none',
              detachPreviousScreen: false,
            }}
          />
          <Stack.Screen 
            name="PantallaActivacionCuenta" 
            component={PantallaActivacionCuenta}
            options={{ 
              animation: 'none',
              detachPreviousScreen: false,
            }}
          />
          <Stack.Screen 
            name="PantallaActivacionContraseña" 
            component={PantallaActivacionContraseña}
            options={{ 
              animation: 'none',
              detachPreviousScreen: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AnimacionProvider>
  );
}