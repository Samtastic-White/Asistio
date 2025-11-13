import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function RenderItemActivacion({ item, index, x }) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const TamañoDeCirculo = SCREEN_WIDTH; // círculo base

  const circleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH, 
        index * SCREEN_WIDTH, 
        (index + 1) * SCREEN_WIDTH
      ],
      [1, 4, 6],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH, 
        index * SCREEN_WIDTH, 
        (index + 1) * SCREEN_WIDTH
      ],
      [SCREEN_HEIGHT * 0.25, 0, -SCREEN_HEIGHT * 0.25],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });

  const Imagen = item.Imagen;

  return (
    <View style={[styles.contenedor, { width: SCREEN_WIDTH }]}>
      <View style={styles.ContenedordeCirculo}>
        <AnimatedLinearGradient
          colors={item.gradientColors}
          start={item.gradientStart}
          end={item.gradientEnd}
          style={[
            { 
              width: TamañoDeCirculo, 
              height: TamañoDeCirculo, 
              borderRadius: TamañoDeCirculo / 2 
            }, 
            circleStyle
          ]} 
        />
      </View>

      <Animated.View style={imageStyle}>
        <View style={styles.ContenedordeImagen}>
          <Imagen width={SCREEN_WIDTH * 0.7} height={SCREEN_WIDTH * 0.7} />
        </View>
      </Animated.View>

      <View style={styles.ContenedordeTexto}>
        <Text style={[styles.titulo, { color: item.textColor }]}>{item.titulo}</Text>
        <Text style={[styles.descripcion, { color: item.textColor }]}>{item.descripcion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: height * 0.045,
    paddingBottom: height * 0.085,
  },
  ContenedordeCirculo: {
    ...StyleSheet.absoluteFillObject, //Es un atajo
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ContenedordeImagen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContenedordeTexto: {
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.09,
    marginTop: -height * 0.1,  
  },
  titulo: {
    fontSize: width * 0.062,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  descripcion: {
    fontSize: width * 0.0355,
    textAlign: 'left',
    lineHeight: height * 0.021,
  },
});
