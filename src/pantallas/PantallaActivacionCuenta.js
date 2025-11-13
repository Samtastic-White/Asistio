import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import data from '../data/dataActivacion';
import RenderItemActivacion from '../componentes/2.1_pantalla_activacion_cuenta/RenderItemActivacion';
import PaginacionActivacion from '../componentes/2.1_pantalla_activacion_cuenta/PaginacionActivacion';
import BotonSiguienteActivacion from '../componentes/2.1_pantalla_activacion_cuenta/BotonSiguienteActivacion';

const { width, height } = Dimensions.get('window');

export default function PantallaActivacionCuenta({ navigation }) {
  const flatListRef = useAnimatedRef();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: (event) => {
      const idx = Math.round(event.contentOffset.x / event.layoutMeasurement.width);
      flatListIndex.value = idx;
    },
  });

  const onDone = () => {
    /*navigation.replace?.('PantallaActivacionContraseña') ??*/ navigation.navigate('PantallaActivacionContraseña');
  };

  return (
    <View style={styles.contenedor}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <RenderItemActivacion item={item} index={index} x={x} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      />

      <View style={styles.footer}>
        <PaginacionActivacion data={data} x={x} />
        <BotonSiguienteActivacion 
          flatListRef={flatListRef} 
          flatListIndex={flatListIndex} 
          dataLength={data.length} 
          onDone={onDone} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { 
    flex: 1, 
    backgroundColor: '#3B82F6' 
  },

  footer: {
    position: 'absolute',
    bottom: height * 0.1,
    left: width * 0.07,
    right: width * 0.07,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});