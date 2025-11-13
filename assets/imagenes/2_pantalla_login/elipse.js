import React from 'react';
import Svg, { Path, Rect, Circle, Polygon, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Elipse(props) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx="11.5" cy="11.5" r="11.5" fill="#764BA2"/>
    </Svg>
  )}