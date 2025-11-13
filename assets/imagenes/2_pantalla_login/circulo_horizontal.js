import React from 'react';
import Svg, { Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Circulohorizontal(props) {
  return (
    <Svg
      width={64}
      height={65}
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Sombra simulada */}
      <Path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M52.5 17.5C60.5 28 63 43 52 51.5C40 61 22 59 12 47C3 35 6 18 18 9C28 1 42 6 50 16.5" 
        fill="rgba(0,0,0,0.1)"
        fillOpacity="0.3"
      />
      
      {/* Círculo principal */}
      <G>
        <Path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M50.4081 15.3936C58.8904 26.2921 61.604 42.2737 50.7056 50.7561C38.3116 60.4024 20.3867 58.6614 10.7403 46.2674C1.36249 34.2184 5.15172 17.0856 17.2007 7.70778C27.7052 -0.467916 42.2324 4.88918 50.4081 15.3936Z" 
          fill="url(#paint0_linear_33_504)" 
          fillOpacity="0.5"
        />
      </G>
      <Defs>
        <LinearGradient 
          id="paint0_linear_33_504" 
          x1="50.9079" 
          y1="16.0359" 
          x2="11.2402" 
          y2="46.9096" 
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#667EEA"/>
          <Stop offset="1" stopColor="#764BA2"/>
        </LinearGradient>
      </Defs>
    </Svg>
  );
}