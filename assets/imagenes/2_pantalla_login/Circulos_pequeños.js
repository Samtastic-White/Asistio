import React from 'react';
import Svg, { Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function Circulospequeños(props) {
  return (
    <Svg
      width={37}
      height={40}
      viewBox="0 0 37 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Primer círculo */}
      <G>
        <Path 
          d="M12.5 29C14.1 31 14.6 34 12.5 35.5C10 37.5 7 37 5 34.5C3 32 4 29 6 27C8 25 11 26 12.5 29Z" 
          fill="rgba(0,0,0,0.1)"
          fillOpacity="0.3"
        />
        <Path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12.1276 28.8535C13.846 31.0614 14.3957 34.2991 12.1878 36.0175C9.67693 37.9718 6.04554 37.6191 4.0913 35.1082C2.19145 32.6672 2.95911 29.1963 5.4001 27.2964C7.52819 25.6401 10.4712 26.7254 12.1276 28.8535Z" 
          fill="url(#paint0_linear_33_514)" 
          fillOpacity="0.5"
        />
      </G>

      {/* Segundo círculo */}
      <G>
        <Path 
          d="M12.5 29C14.1 31 14.6 34 12.5 35.5C10 37.5 7 37 5 34.5C3 32 4 29 6 27C8 25 11 26 12.5 29Z" 
          fill="rgba(0,0,0,0.1)"
          fillOpacity="0.3"
        />
        <Path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M33.1276 17.8535C34.846 20.0614 35.3957 23.2991 33.1878 25.0175C30.6769 26.9718 27.0455 26.6191 25.0913 24.1082C23.1915 21.6672 23.9591 18.1963 26.4001 16.2964C28.5282 14.6401 31.4712 15.7254 33.1276 17.8535Z" 
          fill="url(#paint1_linear_33_514)" 
          fillOpacity="0.5"
        />
      </G>

      {/* Tercer círculo */}
      <G>
        <Path 
          d="M12.5 29C14.1 31 14.6 34 12.5 35.5C10 37.5 7 37 5 34.5C3 32 4 29 6 27C8 25 11 26 12.5 29Z" 
          fill="rgba(0,0,0,0.1)"
          fillOpacity="0.3"
        />
        
        <Path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M16.1276 4.85349C17.846 7.0614 18.3957 10.2991 16.1878 12.0175C13.6769 13.9718 10.0455 13.6191 8.0913 11.1082C6.19145 8.66718 6.95911 5.19627 9.4001 3.29643C11.5282 1.64012 14.4712 2.72541 16.1276 4.85349Z" 
          fill="url(#paint2_linear_33_514)" 
          fillOpacity="0.5"
        />
      </G>

      <Defs>
        <LinearGradient 
          id="paint0_linear_33_514" 
          x1="12.2288" 
          y1="28.9836" 
          x2="4.19256" 
          y2="35.2383" 
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#667EEA"/>
          <Stop offset="1" stopColor="#764BA2"/>
        </LinearGradient>

        <LinearGradient 
          id="paint1_linear_33_514" 
          x1="33.2288" 
          y1="17.9836" 
          x2="25.1926" 
          y2="24.2383" 
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#667EEA"/>
          <Stop offset="1" stopColor="#764BA2"/>
        </LinearGradient>

        <LinearGradient 
          id="paint2_linear_33_514" 
          x1="16.2288" 
          y1="4.98361" 
          x2="8.19256" 
          y2="11.2383" 
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#667EEA"/>
          <Stop offset="1" stopColor="#764BA2"/>
        </LinearGradient>
      </Defs>
    </Svg>
  );
}