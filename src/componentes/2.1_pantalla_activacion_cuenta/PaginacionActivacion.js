import React from 'react';
import { View, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function PaginacionActivacion({ data, x }) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  return (
    <View style={styles.contenedor}>
      {data.map((_, i) => {
        const style = useAnimatedStyle(() => {
          const scale = interpolate(
            x.value, 
            [
              (i - 1) * SCREEN_WIDTH, // Posición inicial
              i * SCREEN_WIDTH,       // Posición actual 
              (i + 1) * SCREEN_WIDTH  // Posición final
            ], 
            [1, 1.6, 1], 
            Extrapolation.CLAMP);
          const opacity = interpolate(
            x.value, 
            [
              (i - 1) * SCREEN_WIDTH, 
              i * SCREEN_WIDTH, 
              (i + 1) * SCREEN_WIDTH
            ], 
            [0.6, 1, 0.6], 
            Extrapolation.CLAMP);
          return {
            transform: [{ scale }],
            opacity,
          };
        });

        return (
          <Animated.View key={i.toString()} style={[styles.Punto, style]} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    gap: width * 0.024,   //agrega espacio entre elemento
    alignItems: 'center',
  },
  Punto: {
    width: width * 0.019,
    height: width * 0.019,
    borderRadius: width * 0.019 / 2,
    backgroundColor: '#fff',
    marginHorizontal: width * 0.015,
  },
});
