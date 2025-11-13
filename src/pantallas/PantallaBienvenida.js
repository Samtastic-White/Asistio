import React, { useEffect }from 'react';

import { Text, TouchableOpacity, StyleSheet, Dimensions, View, BackHandler } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { useAnimacion } from '../contexto/AnimacionContext';

import IlustracionCelular from '../../assets/imagenes/1_pantalla_bienvenida/ilustracion_celular';
import IconoCalendario from '../../assets/imagenes/1_pantalla_bienvenida/icono_calendario';
import IconoCheck from '../../assets/imagenes/1_pantalla_bienvenida/icono_check';
import IconoUsuario from '../../assets/imagenes/1_pantalla_bienvenida/icono_usuario';

const { width, height } = Dimensions.get('window');

const TITULO_TOP_BIENVENIDA = height * 0.12;
const TITULO_TOP_LOGIN = height * 0.315;     // cuánto baja para la pantalla login

export default function PantallaBienvenida({ navigation }) {

  const { posicionTitulo, esPrimeraCarga } = useAnimacion();
  /* Los valores animadoss DEBEN declararse */
  const ilustracionY = useSharedValue(height);
  const iconoIzqX = useSharedValue(-width);
  const iconoDerX = useSharedValue(width);
  const opacidad = useSharedValue(0);

  const ejecutarAnimacionesEntrada = () => {
    posicionTitulo.value = -100;
    ilustracionY.value = height;
    iconoIzqX.value = -width;
    iconoDerX.value = width;
    opacidad.value = 0;

    // Si es la primera carga, empezar desde arriba
    if (esPrimeraCarga.current) {
      esPrimeraCarga.current = false;
    }

    setTimeout(() => {
      posicionTitulo.value = withTiming(TITULO_TOP_BIENVENIDA, { duration: 900, easing: Easing.out(Easing.exp) });

      ilustracionY.value = withTiming(0, { duration: 900, easing: Easing.out(Easing.exp) });

      iconoIzqX.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });

      iconoDerX.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });

      opacidad.value = withTiming(1, { duration: 700 });
      }, 400);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ejecutarAnimacionesEntrada();
    });

    return unsubscribe;
  }, [navigation]);

  /* Efecto inicial (solo primera vez) */
  useEffect(() => {
    ejecutarAnimacionesEntrada();
  }, []);

  /* Manejar el botón de retroceso físico (Android) */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Salir de la app cuando esté en la pantalla de bienvenida
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  /* Animaciones de salida */
  const animarSalida = () => {
    // Primero ocultar contenido
    opacidad.value = withTiming(0, { duration: 300 });

    // Guardar posición del título globalmente
    //const distanciaHaciaLogin = TITULO_TOP_LOGIN - TITULO_TOP_BIENVENIDA;
    posicionTitulo.value = withTiming(TITULO_TOP_LOGIN, { 
      duration: 800, 
      easing: Easing.inOut(Easing.ease) 
    });;

    // animaciones de salida del resto
    ilustracionY.value = withTiming(-height, { duration: 600, easing: Easing.in(Easing.exp) });
    iconoIzqX.value = withTiming(-width, { duration: 500, easing: Easing.in(Easing.exp) });
    iconoDerX.value = withTiming(width, { duration: 500, easing: Easing.in(Easing.exp) });

    // Retrasamos la desaparición del contenido para que el título no parpadee
    //setTimeout(() => { opacidad.value = withTiming(0, { duration: 400 }); }, 120);

    // Navegar después de la animación
    setTimeout(() => navigation.navigate('PantallaLogin'), 800);
  };

  /* Estilos animados */
  const estiloTitulo = useAnimatedStyle(() => ({
    transform: [{ translateY: posicionTitulo.value }]
  }));

  const estiloIlustracion = useAnimatedStyle(() => ({
    transform: [{ translateY: ilustracionY.value }],
  }));

  const estiloIconoIzq = useAnimatedStyle(() => ({
    transform: [{ translateX: iconoIzqX.value }],
  }));

  const estiloIconoDer = useAnimatedStyle(() => ({
    transform: [{ translateX: iconoDerX.value }],
  }));

  const estiloOpacidad = useAnimatedStyle(() => ({
    opacity: opacidad.value
  }));

  const titleWrapperStatic = { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' };

  return (
    <Animated.View style={estilos.contenedor}>
      {/* Íconos decorativos */}
      <Animated.View style={[estilos.decoraciones, estiloIconoIzq]}>
        <IconoCheck style={estilos.iconoSuperiorIzquierda}
        width={width * 0.18} 
        height={width * 0.18} 
        aspectRatio= {1}
        />

        <IconoCalendario style={estilos.iconoInferiorIzquierda}
        width={width * 0.18}
        height={width * 0.18}
        aspectRatio= {1}
        />

      </Animated.View>

      <Animated.View style={[estilos.decoraciones, estiloIconoDer]}>

        <IconoUsuario style={estilos.iconoSuperiorDerecha}
        width={width * 0.18}
        height={width * 0.18}
        aspectRatio= {1}
        />

      </Animated.View>

      {/* el titulo esta fuera del flujo, absolute + transform basado en posicionTitulo */}
      <Animated.View style={[titleWrapperStatic, estiloTitulo]}>
        <Text style={estilos.titulo}>Bienvenido a <Text style={estilos.tituloResaltado}>Asistio</Text></Text>
      </Animated.View>

      {/* Contenido principal */}
      <Animated.View style={[estilos.contenido, estiloOpacidad]}> 
        <Text style={estilos.subtitulo}>
          Controla y registra la asistencia en tu institución fácilmente.
        </Text>

        <Animated.View style={[estilos.contenedorImagen, estiloIlustracion]}>
          <IlustracionCelular height={height * 0.25} aspectRatio={1} />
        </Animated.View>

        <Text style={estilos.textoInferior}>
          Gestiona clases, registra usuarios,{"\n"}crea eventos y más... todo desde tu móvil.
        </Text>

        <TouchableOpacity style={estilos.boton} onPress={animarSalida}>
          <Text style={estilos.textoBoton}>Iniciar sesión</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.08,
  },

  /* Decoraciones */
  decoraciones: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  iconoSuperiorIzquierda: {
    position: 'absolute',
    top: height * 0.29,
    left: width * 0.05,
  },
  iconoSuperiorDerecha: {
    position: 'absolute',
    top: height * 0.29,
    right: width * 0.05,
  },
  iconoInferiorIzquierda: {
    position: 'absolute',
    bottom: height * 0.44,
    left: width * 0.05,
  },

  /* Contenido */
  contenido: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  tituloResaltado: {
    color: '#2563EB',
  },
  subtitulo: {
    fontSize: width * 0.04,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: height * 0.05,

  },
  contenedorImagen: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.03,
    marginBottom: height * 0.07,
  },
  textoInferior: {
    fontSize: width * 0.035,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: height * 0.04,
    paddingHorizontal: width * 0.05,
    lineHeight: 22,
  },
  boton: {
    borderWidth: 1,
    borderColor: '#DADDE1',
    borderRadius: 12,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.2,
    width: width * 0.8,
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    shadowColor: '#000000ff',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginTop: height * 0.05,
  },
  textoBoton: {
    color: '#ffffffff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
});
