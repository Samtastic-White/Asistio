import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import IconoCorreo from "../../../assets/imagenes/2_pantalla_login/icono_correo";

const { width } = Dimensions.get('window');

export default function InputCorreo({
  value,                // Valor actual del input
  onChangeText,         // Función cuando cambia el texto
  onBlur,               // Función cuando pierde el foco
  touched = false,      // Si ya fue interactuado
  error = null,         // Mensaje de error
  estilo,              // Estilos adicionales
  ...props
}) {
  
  // Función para determinar el estado
  const getEstado = () => {
    if (!touched) return 'neutral';        // No se ha interactuado
    if (error) return 'error';             // Hay error
    if (value && !error) return 'valido';  // Todo está bien
    return 'neutral';
  };

  const estado = getEstado();

  const colores = {
    neutral: { icono: '#2C2C2C', borde: '#E5E7EB' },
    error: { icono: '#EF4444', borde: '#EF4444' },
    valido: { icono: '#4A90E2', borde: '#4A90E2' }
  };

  return (
    <View style={[estilos.contenedor, { borderColor: colores[estado].borde }, estilos]}>
      {/* Input de texto */}
      <TextInput 
        style={estilos.textoInput}
        placeholder="Correo institucional"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />

      {/* Icono del correo */}
      <View style={estilos.contenedorIcono}>
        <IconoCorreo color={colores[estado].icono} />
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginVertical: 6,
  },
  contenedorIcono: {
    paddingLeft: 8,
  },
  textoInput: {
    flex: 1,
    fontSize: width * 0.035,
    color: '#111827',
  },
});