import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Ilustracion1 from '../../assets/imagenes/2.1_pantalla_activacion_cuenta/Pagina 1/ilustracion_principal';
import Ilustracion2 from '../../assets/imagenes/2.1_pantalla_activacion_cuenta/Pagina 2/ilustracion_principal';
import Ilustracion3 from '../../assets/imagenes/2.1_pantalla_activacion_cuenta/Pagina 3/ilustracion_principal';

const { width, height } = Dimensions.get('window');
const INPUT_HEIGHT = 52;
const MIN_PASSWORD_LENGTH = 8;

export default function PantallaActivacionContrasena({ navigation, route }) {
  // route.params podría traer userId, token, firstAccess boolean, etc.
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // estados de validación para el borde y colores de iconos
  const passwordHasError = password.length > 0 && password.length < MIN_PASSWORD_LENGTH;
  const confirmHasError = confirm.length > 0 && confirm !== password;

  // Animación simple para introducir inputs (subir desde abajo)
  const formY = useSharedValue(40);
  const formStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withTiming(formY.value, { duration: 600, easing: Easing.out(Easing.exp) }) }],
    opacity: withTiming(formY.value === 0 ? 1 : 0.95, { duration: 600 }),
  }));
  useEffect(() => {
    formY.value = 0;
  }, []);

  // Validador local: mínimo longitud y confirmación igual
  const isValid = password.length >= MIN_PASSWORD_LENGTH && confirm === password;

  // Simula llamada al backend para activar la cuenta
  const handleActivar = async () => {
    setErrorMsg(null);
    if (!isValid) {
      setErrorMsg('Asegúrate que las contraseñas coincidan y tengan al menos 8 caracteres.');
      return;
    }
    setSubmitting(true);
    try {
      // Ejemplo: enviar password al backend. Cambiar URL por la real.
      const payload = {
        password,
        // si tienes token o userId lo añades desde route.params
        // token: route.params?.token,
      };

      // <<< REEMPLAZA ESTA URL con tu endpoint real >>>
      const res = await fetch('https://tu-backend/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Error al activar cuenta');
      }

      // éxito: navegar al dashboard o a login
      navigation.replace?.('Home') ?? navigation.navigate('Home');
    } catch (err) {
      setErrorMsg(err.message || 'Error de red');
    } finally {
      setSubmitting(false);
    }
  };

  // Input con icono a la derecha (ojo) y borde que cambia segun validacion
  const InputField = ({ placeholder, value, onChangeText, secure, showToggle, showState, setShowState, hasError }) => {
    return (
      <View style={[styles.inputWrapper, hasError ? styles.inputErrorWrapper : null]}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure && !showState}
          style={styles.input}
          autoCapitalize="none"
        />
        {showToggle ? (
          <TouchableOpacity onPress={() => setShowState(s => !s)} hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
            <Text style={[styles.iconText, hasError ? styles.iconError : null]}>
              {showState ? '👁' : '🙈'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Zona ilustrativa superior: elección dinámica de imagenes (puedes cambiar) */}
          <View style={styles.hero}>
            <Ilustracion1 width={width * 0.9} height={height * 0.35} />
          </View>

          {/* Contenido */}
          <Animated.View style={[styles.content, formStyle]}>
            <Text style={styles.title}>Ingresa tu nueva{'\n'}contraseña</Text>
            <Text style={styles.subtitle}>Debes actualizar tu contraseña para activar tu cuenta</Text>

            <InputField
              placeholder="Nueva contraseña"
              value={password}
              onChangeText={setPassword}
              secure={true}
              showToggle={true}
              showState={showPassword}
              setShowState={setShowPassword}
              hasError={passwordHasError}
            />

            <InputField
              placeholder="Confirma tu contraseña"
              value={confirm}
              onChangeText={setConfirm}
              secure={true}
              showToggle={true}
              showState={showConfirm}
              setShowState={setShowConfirm}
              hasError={confirmHasError}
            />

            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <TouchableOpacity
              disabled={!isValid || submitting}
              onPress={handleActivar}
              activeOpacity={0.9}
              style={{ width: '100%', marginTop: 18 }}
            >
              <LinearGradient
                colors={isValid ? ['#3B82F6', '#60C0C8'] : ['#DCE9FB', '#DCE9FB']}
                start={[0, 0]}
                end={[1, 0]}
                style={[styles.gradientButton, !isValid && styles.disabledButton]}
              >
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Activar cuenta</Text>}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Pie decorativo */}
          <View style={styles.footerIllustration}>
            <Ilustracion3 width={width * 0.55} height={height * 0.18} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    paddingHorizontal: width * 0.07,
    paddingTop: Platform.OS === 'ios' ? 28 : 18,
    paddingBottom: 20,
  },
  hero: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 6,
    marginBottom: 6,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: width * 0.03,
    lineHeight: 20,
  },
  inputWrapper: {
    width: '100%',
    height: INPUT_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputErrorWrapper: {
    borderColor: '#F28B82', // rojo suave en error
  },
  input: {
    flex: 1,
    fontSize: width * 0.036,
    color: '#2C2C2C',
  },
  iconText: {
    fontSize: 20,
    marginLeft: 10,
    color: '#2C2C2C',
  },
  iconError: {
    color: '#F28B82',
  },
  gradientButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    // deja el botón apagado si no válido
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  errorText: {
    color: '#F0513D',
    marginTop: 6,
    fontSize: width * 0.034,
  },
  footerIllustration: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 30,
  },
});
