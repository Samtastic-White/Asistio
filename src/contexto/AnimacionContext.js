import React, { createContext, useContext, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';

const AnimacionContext = createContext(null); //Crea un espacio donde se guardan datos para que las pantallas usen

export function AnimacionProvider({ children }) {
  // empieza fuera de pantalla (negativo)
  const posicionTitulo = useSharedValue(-100);
  // Referencia para controlar si es la primera carga
  const esPrimeraCarga = useRef(true); //useRef guarda el dato para evitar que el componente se vuelva a renderizar cuando el valor cambia

  return (
    <AnimacionContext.Provider value={{ posicionTitulo, esPrimeraCarga }}>
      {children}
    </AnimacionContext.Provider>
  );
}

export function useAnimacion() {
  const ctx = useContext(AnimacionContext);
  if (!ctx) {
    console.error('useAnimacion debe usarse dentro de AnimacionProvider');
    throw new Error('Error de contexto'); // ← Texto MÁS CORTO
  }
  return ctx;
}