import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  BackHandler,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';

import { useAnimacion } from '../contexto/AnimacionContext';

import Aura from '../../assets/imagenes/2_pantalla_login/aura';
import Circulocontenedor from '../../assets/imagenes/2_pantalla_login/circulo_contenedor';
import Circulohorizontal from '../../assets/imagenes/2_pantalla_login/circulo_horizontal';
import Circulospequeños from '../../assets/imagenes/2_pantalla_login/Circulos_pequeños';
import Ovalocontenedor from '../../assets/imagenes/2_pantalla_login/ovalo_contenedor';
import Ovalospequeños from '../../assets/imagenes/2_pantalla_login/ovalos_pequeños';
import Elipse from '../../assets/imagenes/2_pantalla_login/elipse';

import InputCorreo from '../componentes/Inputs/InputCorreo';
import InputPassword from '../componentes/Inputs/InputPassword';
import useInput from '../hooks/Inputs/useInput';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const { width, height } = Dimensions.get('window');

const TITULO_TOP_BIENVENIDA = -height * 0.05;

export default function PantallaLogin({ navigation }) {
  const { posicionTitulo } = useAnimacion();
  const titleWrapperStatic = { position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' };

  /* estado de form con los hooks */
  const correo = useInput('email', '');
  const password = useInput('password', '');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  /* Estado para controlar la visibilidad del teclado */
  const [tecladoVisible, setTecladoVisible] = useState(false);
  //const ScrollViewRef = useRef(null);

  /* Variable animada para controlar el movimiento del contenedor principal */
  const desplazamientoContenedor = useSharedValue(0);

  /* Verifica si el formulario es válido*/
  const formularioEsValido = correo.esValido && password.esValido;



  /* DEJAR LA POSICION DEL TITULO COMO ESTA EN LA OTRA PANTALLA*/
  const formOpacity = useSharedValue(0);
  const botonOpacity = useSharedValue(formularioEsValido ? 1 : 0.5);

  /*Animaciones del circulo arriba*/
  const auraOpacity = useSharedValue(0);
  const auraScale = useSharedValue(0.5);
  //Primero el circulo contenedor
  const CirculoContenedorRotacion = useSharedValue(0);
  const CirculoContenedorEntradaY = useSharedValue(-height * 0.5); // Empieza arriba de la pantalla
  const CirculoContenedorOpacidad = useSharedValue(0);

  const CirculoHorizontalPosicion = useSharedValue(0);
  const CirculoHorizontalOpacidad = useSharedValue(0);
  const CirculoHorizontalRotacion = useSharedValue(0);

  const puntoA_x = -width * 0.23;
  const puntoA_y = -height * 0.34;
  const puntoB_x = width * 0.2;
  const puntoB_y = -height * 0.34;

  const CirculosPequeñosOpacidad = useSharedValue(0);
  const CirculosPequeñosPosicion = useSharedValue(0);
  const CirculosPequeñosEntradaY = useSharedValue(-height * 0.15);

  const puntoInicial = -height * 0.38;
  const puntoFinal = -height * 0.46;

  const OvalocontenedorEntradaX = useSharedValue(width * 2);
  const OvalocontenedorOpacidad = useSharedValue(0);
  
  const OvalospequeñosEntradaX = useSharedValue(width * 2);
  const OvalospequeñosOpacidad = useSharedValue(0);

  const ElipseEntradaX = useSharedValue(width * 2);
  const ElipseOpacidad = useSharedValue(0);

  useEffect(() => {
    /* Keyboard.addListener suscribe una función al evento 'keyboardDidShow' */
    const mostrarTeclado = Keyboard.addListener('keyboardDidShow', (e) => {
      setTecladoVisible(true);
      const alturaTeclado = e.endCoordinates.height;
      desplazamientoContenedor.value = withTiming(-alturaTeclado * 0.5, { 
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
/*      setTimeout(() => {
        ScrollViewRef.current?.scrollTo({ y: 0, Animated: true });
      }, 100); */
    });

    return () => {
      mostrarTeclado.remove();
      ocultarTeclado.remove();
    };
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      animarSalidaHaciaBienvenida();
      return true; // Prevenir el comportamiento por defecto
    });

    return () => backHandler.remove();
  }, []);

  /* entradas (pantalla aparece) */
  useEffect(() => {
  // 1. Entrada desde arriba con opacidad
    auraOpacity.value = withDelay(400, withTiming(1, { 
      duration: 1500,
      easing: Easing.out(Easing.ease) 
    }));

    auraScale.value = withDelay(400, withTiming(1, {
      duration: 1800,
      easing: Easing.out(Easing.ease)
    }));
  
    CirculoContenedorEntradaY.value = withDelay(100, withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    }));
    
    CirculoContenedorOpacidad.value = withDelay(100, withTiming(1, {
      duration: 600,
    }));

    // 2. Rotación infinita suave
    CirculoContenedorRotacion.value = withDelay(900, 
      withRepeat(
        withTiming(-40, {
          duration: 3800,
          easing: Easing.linear,
        }),
        -1, // Repetir infinitamente
        true // para que vaya y vuelva
      )
    );

    CirculoHorizontalOpacidad.value = withDelay(900, withTiming(1, { duration: 600 }));

    CirculoHorizontalPosicion.value = withDelay(900,
      withRepeat(
        withTiming(1, { // 1 = puntoB
        duration: 3800,
        easing: Easing.inOut(Easing.ease),
        }),
        -1, // Infinito
        true // Ida y vuelta
      )
    );

    CirculoHorizontalRotacion.value = withDelay(900, 
      withRepeat(
        withTiming(-90, {
          duration: 3800,
          easing: Easing.linear,
        }),
        -1, // Repetir infinitamente
        true // para que vaya y vuelva
      )
    );

    CirculosPequeñosPosicion.value = withDelay(900,
      withRepeat(
        withTiming(1, { // 1 = puntoB
        duration: 3800,
        easing: Easing.inOut(Easing.ease),
        }),
        -1, // Infinito
        true // Ida y vuelta
      )
    );
    
    CirculosPequeñosOpacidad.value = withDelay(900, withTiming(1, { duration: 600 }));

    CirculosPequeñosEntradaY.value = withDelay(1000, withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.ease) }));

    OvalocontenedorEntradaX.value = withDelay(1000, withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.cubic)
    }));

    OvalocontenedorOpacidad.value = withDelay(1000, withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.ease)
    }));

    OvalospequeñosEntradaX.value = withDelay(1000, withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic)
    }));

    OvalospequeñosOpacidad.value = withDelay(1000, withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.ease)
    }));

    ElipseEntradaX.value = withDelay(1000, withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.cubic)
    }));

    ElipseOpacidad.value = withDelay(1000, withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.ease)
    }));

    /*Animacion del formulario*/
    formOpacity.value = withDelay(300, withTiming(1, { duration: 600, easing: Easing.out(Easing.exp) }));

  }, []);

  /* Función para animar salida hacia Bienvenida */
  const animarSalidaHaciaBienvenida = () => {
    // Animación de salida del formulario
    formOpacity.value = withTiming(0, { duration: 300 });
    CirculoContenedorOpacidad.value = withTiming(0, {duration: 300});
    auraOpacity.value = withTiming(0, { duration: 400 });
    CirculoHorizontalOpacidad.value = withTiming(0, {duration: 300});
    botonOpacity.value = withTiming(0, {duration: 300});
    CirculosPequeñosPosicion.value = withTiming(200,{ duration: 300 });
    OvalocontenedorEntradaX.value = withTiming(width * 2, {duration: 400, easing: Easing.in(Easing.cubic)});
    OvalospequeñosEntradaX.value = withTiming(width * 2, {duration: 500, easing: Easing.in(Easing.cubic)});
    ElipseEntradaX.value = withTiming(width * 2, {duration: 600, easing: Easing.in(Easing.cubic)});
    
    // Mover el título de vuelta a su posición en Bienvenida
    posicionTitulo.value = withTiming(TITULO_TOP_BIENVENIDA, { 
      duration: 600, 
      easing: Easing.inOut(Easing.ease) 
    });

    // Navegar después de la animación
    setTimeout(() => {
      navigation.navigate('PantallaBienvenida');
    }, 600);
  };

  const handleLogin = () => {
    if (!formularioEsValido) return;
    
    formOpacity.value = withTiming(0, { duration: 300 });

    console.log('Login con:', {
      email: correo.valor,
      password: password.valor
    });

    setTimeout(() => {
      navigation.replace("PantallaActivacionCuenta");
    }, 350);
  };

  /* estilos animados */
  const estiloTitulo = useAnimatedStyle(() => ({
    transform: [
      { translateY: posicionTitulo.value },
      { translateY: tecladoVisible
        ? withTiming(-height * 0, { duration: 100 })
        : withTiming(0, { duration:100 })
      }
    ],
  }));

  const estiloForm = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
  }));

  const estiloBoton = useAnimatedStyle(() => ({
    opacity: botonOpacity.value,
  }));

  const estiloAura = useAnimatedStyle(() => ({
    opacity: auraOpacity.value,
    transform: [
      { scale: auraScale.value },
      { translateY: tecladoVisible
        ? withTiming(-height * 0, { duration: 100 })
        : withTiming(0, { duration: 100 })
      },
    ]
  }));

  const estiloCirculoContenedorCompleto = useAnimatedStyle(() => ({
    opacity: CirculoContenedorOpacidad.value,
    transform: [
      { translateY: CirculoContenedorEntradaY.value },
      { rotate: `${CirculoContenedorRotacion.value}deg` },
      { 
        translateY: tecladoVisible 
          ? withTiming(-height * 0, { duration: 100 })
          : withTiming(0, { duration: 100 })
      },
    ],
  }));

  const estiloCirculoHorizontal = useAnimatedStyle(() => {
    const x = interpolate(
      CirculoHorizontalPosicion.value,
      [0, 1],
      [puntoA_x, puntoB_x] // de puntoA a puntoB en X
    );
  
    const y = interpolate(
      CirculoHorizontalPosicion.value,
      [0, 1],
      [puntoA_y, puntoB_y] // de puntoA a puntoB en Y
    );

    return {
      opacity: CirculoHorizontalOpacidad.value,
      transform: [
        { translateX: x }, 
        { translateY: y },
        { rotate: `${CirculoHorizontalRotacion.value}deg` },
        { 
          translateY: tecladoVisible 
            ? withTiming(-height * 0, { duration: 100 })
            : withTiming(0, { duration: 100 })
        },
      ],
    };
  });

  const estiloContenedorPrincipal = useAnimatedStyle(() => ({
    flex: 1,
    transform: [
      { translateY: desplazamientoContenedor.value }
    ],
  }));

  const estiloCirculosPequeños = useAnimatedStyle(() => {

    const y = interpolate(
      CirculosPequeñosPosicion.value,
      [0,1],
      [puntoInicial, puntoFinal]
    )

  const opacity = interpolate(
    CirculosPequeñosPosicion.value,
    [0, 1],
    [1, 0]
  );

  return {
    opacity: opacity,
    transform: [
      { translateY: CirculosPequeñosEntradaY.value + y },
      { 
        translateY: tecladoVisible 
          ? withTiming(-height * 0, { duration: 100 })
          : withTiming(0, { duration: 100 })
      }
    ],
  };
});

  const estiloOvaloContenedor = useAnimatedStyle(() => ({
    opacity: OvalocontenedorOpacidad.value,
    transform: [
      { translateX: OvalocontenedorEntradaX.value},
    ],
  }));

  const estiloOvalosPequeños = useAnimatedStyle(() => ({
    opacity: OvalospequeñosOpacidad.value,
    transform: [
      { translateX: OvalospequeñosEntradaX.value},
    ]
  }));

  const estiloElipse = useAnimatedStyle (() => ({
    opacity: ElipseOpacidad.value,
    transform: [
      { translateX: ElipseEntradaX.value},
    ]
  }));

  useEffect(() => {
    botonOpacity.value = withTiming(formularioEsValido ? 1 : 0.5, { duration: 250 });
  }, [formularioEsValido]);

  return (
    <Animated.View style={[estiloContenedorPrincipal]}>
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
          <Animated.View style={[estilos.auraContainer, estiloAura]}>
            <Aura
              width={width * 1.8}
              height={height * 0.8}
            />
          </Animated.View>

          <Animated.View style={[estilos.Circulo_contenedor, estiloCirculoContenedorCompleto]}>
            <Circulocontenedor
              height={width * 1.08} 
              aspectRatio={1}
            />
          </Animated.View>

          <Animated.View style={[ estilos.CirculoHorizontal , estiloCirculoHorizontal ]}>
            <Circulohorizontal
              width={width * 0.8}
              aspectRatio={1}
              />
          </Animated.View>

          <Animated.View style={[estilos.CirculosPequeños, estiloCirculosPequeños]}>
            <Circulospequeños
              height={width * 0.1}
              aspectRatio={1}
            />
          </Animated.View>

          <Animated.View style={[titleWrapperStatic, estiloTitulo]}>
            <Text style={estilos.titulo}>Bienvenido a <Text style={estilos.tituloResaltado}>Asistio</Text></Text>
          </Animated.View>

          <Text style={estilos.subtitulo}>
            Ingresa tus credenciales {"\n"} para continuar
          </Text>

          <Animated.View style={[estilos.formulario, estiloForm]}>
            {/* INPUT EMAIL */}
            <InputCorreo
                {...correo.props}
            />
            
            {/* INPUT PASSWORD */}
            <InputPassword
              {...password.props}
              showPassword={mostrarPassword}
              onTogglePassword={() => setMostrarPassword(!mostrarPassword)}
            />

            {/* BOTÓN RECUPERAR CONTRASEÑA Y LOGIN */}
            <TouchableOpacity
              onPress={() => {/* recuperar contraseña */}} 
              style={{ alignSelf: 'flex-end', marginTop: 8 }}
            >
              <Text style={estilos.recuperar}>Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            
            {/* BOTÓN LOGIN - CORREGIDO */}
            <AnimatedTouchable
              onPress={handleLogin}
              disabled={!formularioEsValido}
              style={[
                estilos.boton,
                estiloBoton,
                { backgroundColor: formularioEsValido ? '#4A90E2' : '#DCE9FB' },
              ]}
              activeOpacity={0.85}
            >
              <Text style={[
                estilos.textoBoton, 
                { color: formularioEsValido ? '#FFFFFF' : '#8AA7D9' }
              ]}>
                Iniciar sesión
              </Text>
            </AnimatedTouchable>
          </Animated.View>

          <Animated.View style={[estilos.OvaloContenedor, estiloOvaloContenedor]}>
            <Ovalocontenedor
              height={width * 0.55}
              aspectRatio={1}
            />
          </Animated.View>

          <Animated.View style={[estilos.OvalosPequeños, estiloOvalosPequeños]}>
            <Ovalospequeños
              height={width * 0.7}
              aspectRatio={1}
            />
          </Animated.View>
          <Animated.View style={[estilos.Elipse, estiloElipse]}>
            <Elipse
              height={width * 0.084}
              aspectRatio={1}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}


const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: width * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
  },

  auraContainer: {
    position: 'absolute',
    top: -height * 0.28,
    alignSelf: 'center',
    opacity: 0.7,
  },


  contenedorCirculo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',        // Centra horizontalmente
    justifyContent: 'flex-start', // Alinea en la parte superior
  },

  CirculoHorizontal: {
    position: 'absolute',
    width: width * 0.1,
    height: width * 0.1,

  },

  CirculosPequeños: {
    position: 'absolute',
    //width: width * 0.15,
    //height: width * 0.15,
    left: width * 0.2,
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

  decoraciones: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  Circulo_contenedor: {
    position: 'absolute',
    top: -height * 0.24,
    alignSelf: 'center',
  },

  subtitulo: {
    fontSize: width * 0.04,
    fontWeight: '300',
    color: '#666666',
    textAlign: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.09,
  },

  formulario: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  recuperar: {
    color: '#2563EB',
    fontSize: width * 0.034,
    marginTop: height * 0.02
  },

  boton: {
    marginTop: height * 0.05,
    borderRadius: 12,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    width: '100%',
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

  OvaloContenedor: {
    position: 'absolute',
    bottom: height * 0,
    right: -width * 0.15,
  },

  OvalosPequeños: {
    position: 'absolute',
    bottom: -height * 0.031,
    right: -width * 0.4,
  },

  Elipse: {
    position: 'absolute',
    bottom: height * 0.1333,
    right: width * 0.25,
  },
});
