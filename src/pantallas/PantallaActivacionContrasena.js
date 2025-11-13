import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  withDelay 
} from 'react-native-reanimated';

import IlustracionSeguridad from '../../assets/imagenes/2.2_pantalla_activacion_contraseña/ilustracion_seguridad';

import InputPassword from '../componentes/Inputs/InputPassword';
import useInput from '../hooks/Inputs/useInput';

const { width, height } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity); //Crea una versión animada del componente TouchableOpacity, es para aplicar animaciones a los botones

export default function PantallaActivacionContraseña({ navigation }) {
  const password = useInput('password', '');        //Instancia el hook
  const confirmPassword = useInput('password', '');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  /* Estado para controlar la visibilidad del teclado */
  const [tecladoVisible, setTecladoVisible] = useState(false);

  /* Variables animadas */
  const desplazamientoContenedor = useSharedValue(0);
  /* Controla cuánto se desplaza el contenedor cuando aparece el teclado */

  const formOpacity = useSharedValue(0);
  const botonOpacity = useSharedValue(0.5);
  const ilustracionScale = useSharedValue(0.8);
  const ilustracionOpacity = useSharedValue(0);

  /* Verifica si el formulario es válido */
  const formularioEsValido = password.esValido && confirmPassword.esValido && password.valor === confirmPassword.valor;

  useEffect(() => {
    /* Keyboard.addListener suscribe una función al evento 'keyboardDidShow' */
    const mostrarTeclado = Keyboard.addListener('keyboardDidShow', (e) => {
      setTecladoVisible(true);
      const alturaTeclado = e.endCoordinates.height; //Obtiene la altura del teclado desde el evento
      desplazamientoContenedor.value = withTiming(-alturaTeclado * 0.3, { 
        duration: 300,
        easing: Easing.out(Easing.ease)
      });
    });

    const ocultarTeclado = Keyboard.addListener('keyboardDidHide', () => {
      setTecladoVisible(false);
      desplazamientoContenedor.value = withTiming(0, { 
        duration: 300,
        easing: Easing.out(Easing.ease)
      });
    });

    return () => {
      /* Remueve los listeners para evitar fugas de memoria */
      mostrarTeclado.remove();
      ocultarTeclado.remove();
    };
  }, []);

  /* Animaciones de entrada */
  useEffect(() => {
    ilustracionOpacity.value = withDelay(300, withTiming(1, { 
      duration: 800,
      easing: Easing.out(Easing.ease)
    }));

    ilustracionScale.value = withDelay(300, withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease)
    }));

    formOpacity.value = withDelay(500, withTiming(1, { 
      duration: 600, 
      easing: Easing.out(Easing.exp) 
    }));

    // Actualizar opacidad del botón basado en la validación
    botonOpacity.value = withDelay(500, withTiming(formularioEsValido ? 1 : 0.5, { duration: 300 }));
  }, []);

  useEffect(() => {
    botonOpacity.value = withTiming(formularioEsValido ? 1 : 0.5, { duration: 250 });
  }, [formularioEsValido]);

  const handleActivacion = () => {
    if (!formularioEsValido) return;
    
    setCargando(true);
    formOpacity.value = withTiming(0, { duration: 300 });

    console.log('Activando contraseña:', {
      password: password.valor,
      confirmPassword: confirmPassword.valor
    });

    // Simular proceso de activación
    setTimeout(() => {
      setCargando(false);
      navigation.replace("PantallaLogin"); // O la pantalla que corresponda
    }, 2000);
  };

  const handleVolver = () => {
    formOpacity.value = withTiming(0, { duration: 300 });
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  /* estilos animados */
  const estiloContenedorPrincipal = useAnimatedStyle(() => ({
    flex: 1,
    transform: [
      { translateY: desplazamientoContenedor.value }
    ],
  }));

  const estiloForm = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  const estiloBoton = useAnimatedStyle(() => ({
    opacity: botonOpacity.value,
  }));

  const estiloIlustracion = useAnimatedStyle(() => ({
    opacity: ilustracionOpacity.value,
    transform: [
      { scale: ilustracionScale.value },
      { 
        translateY: tecladoVisible
          ? withTiming(-height * 0, { duration: 100 })
          : withTiming(0, { duration: 100 })
      },
    ]
  }));

  return (
    <Animated.View style={[estiloContenedorPrincipal]}>
      <LinearGradient
        colors={['#53BAC3', '#2563EB']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          paddingBottom: 20,
          justifyContent: 'center'
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.contenedor}>

          {/* Ilustración de seguridad */}
          <Animated.View style={[estilos.ilustracionContainer, estiloIlustracion]}>
            <IlustracionSeguridad
              height={width * 0.5}
              aspectRatio={1}
            />
          </Animated.View>

          {/* Título */}
          <View style={estilos.tituloContainer}>
            <Text style={estilos.titulo}>Activa tu <Text style={estilos.tituloResaltado}>Contraseña</Text></Text>
          </View>

          <Text style={estilos.subtitulo}>
            Crea una contraseña segura para {"\n"} proteger tu entidad
          </Text>

          {/* Formulario */}
          <Animated.View style={[estilos.formulario, estiloForm]}>

            {/* INPUT NUEVA CONTRASEÑA */}
            <View style={estilos.inputContainer}>
              <Text style={estilos.label}>Nueva Contraseña</Text>
              <InputPassword
                {...password.props}
                showPassword={mostrarPassword}
                onTogglePassword={() => setMostrarPassword(!mostrarPassword)}
                placeholder="Ingresa tu nueva contraseña"
              />
            </View>

            {/* INPUT CONFIRMAR CONTRASEÑA */}
            <View style={estilos.inputContainer}>
              <Text style={estilos.label}>Confirmar Contraseña</Text>
              <InputPassword
                {...confirmPassword.props}
                showPassword={mostrarConfirmPassword}
                onTogglePassword={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}
                placeholder="Confirma tu contraseña"
              />
            </View>

            {/* Mensaje de error si las contraseñas no coinciden */}
            {password.valor && confirmPassword.valor && password.valor !== confirmPassword.valor && (
              <Text style={estilos.errorText}>Las contraseñas no coinciden</Text>
            )}

            {/* Requisitos de contraseña */}
            <View style={estilos.requisitosContainer}>
              <Text style={estilos.requisitosTitulo}>Tu contraseña debe contener:</Text>
              <Text style={[estilos.requisito, password.valor.length >= 6 && estilos.requisitoCumplido]}>
                • Mínimo 6 caracteres
              </Text>
              <Text style={[estilos.requisito, /[A-Z]/.test(password.valor) && estilos.requisitoCumplido]}>
                • Al menos una mayúscula
              </Text>
              <Text style={[estilos.requisito, /[0-9]/.test(password.valor) && estilos.requisitoCumplido]}>
                • Al menos un número
              </Text>
              <Text style={[estilos.requisito, /[!@#$%^&*]/.test(password.valor) && estilos.requisitoCumplido]}>
                • Al menos un carácter especial
              </Text>
            </View>
            
            {/* BOTÓN ACTIVAR - CORREGIDO */}
            <AnimatedTouchable
              onPress={handleActivacion}
              disabled={!formularioEsValido || cargando}
              style={[
                estilos.boton,
                estiloBoton,
                { 
                  backgroundColor: formularioEsValido && !cargando ? '#4A90E2' : '#DCE9FB',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },
              ]}
              activeOpacity={0.85}
            >
              {cargando ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={[
                  estilos.textoBoton, 
                  { color: formularioEsValido ? '#FFFFFF' : '#8AA7D9' }
                ]}>
                  Activar Contraseña
                </Text>
              )}
            </AnimatedTouchable>

            {/* BOTÓN VOLVER */}
            <TouchableOpacity
              onPress={handleVolver}
              style={estilos.botonVolver}
            >
              <Text style={estilos.textoBotonVolver}>Volver al login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },

  ilustracionContainer: {
    marginBottom: height * 0.02,
    alignItems: 'center',
  },

  tituloContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },

  titulo: {
    fontSize: width * 0.08,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: width * 0.09,
  },

  tituloResaltado: {
    color: '#E8F4FF',
  },

  subtitulo: {
    fontSize: width * 0.045,
    fontWeight: '300',
    color: '#E8F4FF',
    textAlign: 'center',
    marginBottom: height * 0.04,
    lineHeight: width * 0.06,
  },

  formulario: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: width * 0.06,
    // sombra (iOS)
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    // elevación android
    elevation: 8,
  },

  inputContainer: {
    marginBottom: height * 0.025,
  },

  label: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  errorText: {
    color: '#EF4444',
    fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },

  requisitosContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: height * 0.03,
  },

  requisitosTitulo: {
    fontSize: width * 0.035,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },

  requisito: {
    fontSize: width * 0.032,
    color: '#9CA3AF',
    marginBottom: 4,
  },

  requisitoCumplido: {
    color: '#10B981',
    fontWeight: '500',
  },

  boton: {
    borderRadius: 12,
    paddingVertical: height * 0.02,
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.02,
    // sombra (iOS)
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    // elevación android
    elevation: 3,
  },

  textoBoton: {
    fontSize: width * 0.045,
    fontWeight: '600',
  },

  botonVolver: {
    paddingVertical: height * 0.015,
    alignItems: 'center',
  },

  textoBotonVolver: {
    color: '#2563EB',
    fontSize: width * 0.04,
    fontWeight: '500',
  },
});