import React from "react";
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import IconoOjo from "../../../assets/imagenes/2_pantalla_login/icono_ojo";
import IconoOjoCerrado from "../../../assets/imagenes/2_pantalla_login/icono_ojo_cerrado";

const { width } = Dimensions.get('window');

export default function InputPassword({
  value,                //value - Valor actual del input
  onChangeText,         //onChangeText - Función cuando cambia el texto
  onBlur,               //onBlur - Función cuando pierde el foco
  touched = false,      //touched - Si ya fue interactuado
  error = null,         //error - Mensaje de error
  showPassword = false, //showPassword - Si la contraseña es visible
  onTogglePassword,     //onTogglePassword - Función para mostrar/ocultar contraseña
  estilo,                
  ...props
}) {

  const getEstado = () => {
    if (!touched) return 'neutral';
    if (error) return 'error';
    if (value && !error) return 'valido';
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
      <TextInput 
        style={estilos.textInput}
        placeholder= "Contraseña"
        placeholderTextColor= "#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />

      <TouchableOpacity
        style={estilos.botonOjo}
        onPress={onTogglePassword}
        activeOpacity={0.7}
      >
        {showPassword ? (
          <IconoOjoCerrado color={colores[estado].icono}/>
        ) : (
          <IconoOjo color={colores[estado].icono}/>
        )}
      </TouchableOpacity>
    </View>
  )
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

  textInput: {
    flex: 1,
    fontSize: width * 0.035,
    color: '#111827',
  },

  botonOjo: {
    paddingLeft: 8,
    paddingVertical: 4,
  }
})