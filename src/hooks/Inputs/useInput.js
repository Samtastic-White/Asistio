import { useState } from "react";

export default function useInput (tipo, valorInicial = '') {
  const [valor, setValor] = useState (valorInicial);
  const [touched, setTouched] = useState (false);

  const validaciones = {
    email: (valor) => {
      if (!valor.trim()) //.trim ELIMINA los espacios, saltos de linea, tabulaciones etc.
        return 'El correo es requerido';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        return 'Correo electrónico inválido';
      }
      return null;
    },

    password: (valor) => {
      if (!valor.trim()) return'La contraseña es requerida';
      if (valor.length < 6) return 'Minimo 6 Caracteres';
      return null;
    },

    texto: (valor) => {
      if (!valor.trim()) return 'Este campo es requerido';
      return null;
    },
  };

  const error = touched ? validaciones[tipo]?.(valor) || null : null;
  const esValido = touched && !error && valor.trim().length > 0;

  return {
    valor,
    touched,
    error,
    esValido,
    cambiarValor: setValor,
    marcarComoTouched: () => setTouched(true),

    props: {
      value: valor,
      onChangeText: setValor,
      onBlur: () => setTouched(true),
      touched,
      error,
      esValido,
    }
  };
}