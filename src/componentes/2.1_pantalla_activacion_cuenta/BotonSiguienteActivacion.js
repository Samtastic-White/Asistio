import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotonSiguienteActivacion({ flatListRef, flatListIndex, dataLength, onDone }) {
  const handlePress = () => {
    const next = flatListIndex.value + 1;
    if (next < dataLength) {
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
    } else {
      onDone?.();
    }
  };

  const isLast = flatListIndex.value === dataLength - 1;

  return (
    <TouchableOpacity style={[styles.boton, isLast ? styles.botonPrimario : styles.botonSecundario]} onPress={handlePress} activeOpacity={0.85}>
      <Text style={[styles.texto, isLast ? styles.textoPrimario : styles.textoSecundario]}>{isLast ? 'Activar cuenta' : 'Siguiente'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPrimario: {
    backgroundColor: '#ffffff',
  },
  botonSecundario: {
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  texto: {
    fontWeight: '700',
  },
  textoPrimario: {
    color: '#1E40AF',
  },
  textoSecundario: {
    color: '#fff',
  },
});
