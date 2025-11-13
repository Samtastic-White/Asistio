// Componente Aura con múltiples gradientes superpuestos
import React from 'react';
import Svg, { Rect, RadialGradient, Stop, Defs, G } from 'react-native-svg';

export default function AuraSuave(props) {
  return (
    <Svg width={props.width} height={props.height} viewBox="0 0 746 598">
      <Defs>
        <RadialGradient id="grad1" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#764BA2" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#764BA2" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="grad2" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#8A5CB5" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#8A5CB5" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="grad3" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#9D71D3" stopOpacity="0.1" />
          <Stop offset="100%" stopColor="#9D71D3" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      
      <G>
        <Rect x="50" y="0" width="646" height="548" rx="120" fill="url(#grad1)" />
        <Rect x="50" y="30" width="646" height="488" rx="110" fill="url(#grad2)" />
        <Rect x="50" y="60" width="646" height="428" rx="100" fill="url(#grad3)" />
      </G>
    </Svg>
  );
}