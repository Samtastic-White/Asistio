import React from 'react';
import Svg, { Path, G, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

export default function Ovalocontenedor(props) {
  return (
    <Svg
      width={202}
      height={100}
      viewBox="0 0 202 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width="202" height="100" rx="50" fill="url(#paint0_linear_73_613)"/>
      <Defs>
        <LinearGradient id="paint0_linear_73_613" x1="18.5" y1="50" x2="124.5" y2="92" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#667EEA"/>
          <Stop offset="1" stopColor="#764BA2"/>
        </LinearGradient>
      </Defs>
    </Svg>
  )}