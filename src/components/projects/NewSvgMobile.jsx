import {forwardRef} from "react";
import withNamespaces from "../article/Article";

export const NewSvgMobile = forwardRef(({active,changeActive,mode, alt, ethnica, ecology, scalability},ref) => {
  return (
    <>
        <svg
        id='mobile'
        ref={ref}
        alt={alt}
        width="375" height="784" viewBox="0 0 375 784" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M34.9998 221L270 308M34.9998 221L-81.2327 583.558L90.5458 569.776M34.9998 221L-185.454 -4.5625L131.5 128M34.9998 221L131.5 128M34.9998 221L131.5 381M270 308L627.83 532.474L380.131 699.021M270 308L380.131 699.021M270 308L131.5 381M270 308L599.611 192.594L131.5 128M380.131 699.021L90.5458 569.776M380.131 699.021L131.5 381M90.5458 569.776L131.5 381" stroke="#6CCCE1" strokeDasharray="10 10"/>
<path d="M258 -83.5L129.5 131.5M258 -83.5L269.5 310L129.5 131.5M258 -83.5L481.5 163M129.5 131.5L-51 131.5M129.5 131.5L129.5 386.5L-51 486" stroke="#2E3237" strokeOpacity="0.7"/>
<path d="M258 -83.5L129.5 131.5M258 -83.5L269.5 310L129.5 131.5M258 -83.5L481.5 163M129.5 131.5L-51 131.5M129.5 131.5L129.5 386.5L-51 486" stroke="url(#paint0_linear)"/>
<path d="M258 -83.5L129.5 131.5M258 -83.5L269.5 310L129.5 131.5M258 -83.5L481.5 163M129.5 131.5L-51 131.5M129.5 131.5L129.5 386.5L-51 486" stroke="url(#paint1_linear)"/>
<circle cx="343.727" cy="12.7274" r="8.72736" fill="#C1E8F0"/>
<circle cx="343.727" cy="12.7274" r="8.72736" fill="url(#paint2_linear)"/>
<circle cx="383.325" cy="752.339" r="8.72736" fill="#CFAE6F"/>
<circle cx="354.364" cy="360.364" r="4.36368" fill="#C1E8F0"/>
<circle cx="19.3637" cy="132.364" r="4.36368" fill="#C1E8F0"/>
<circle cx="89.3637" cy="569.364" r="4.36368" fill="#CFAE6F"/>
<circle cx="356.364" cy="160.364" r="4.36368" fill="#C1E8F0"/>
<circle cx="265.364" cy="145.364" r="4.36368" fill="#C1E8F0"/>
<circle cx="50.3637" cy="431.364" r="4.36368" fill="#C1E8F0"/>
<circle cx="129.364" cy="256.364" r="4.36368" fill="#C1E8F0"/>
  <g className="svgDigitalMovable" id="svg_digital_puls_wrapper" onClick={changeActive}>
    <circle id="svg_digital_puls"
            onClick={changeActive}
            className={`pulsation${'digital'===active?' pulsation_hide':''}`}
            cx="125" cy="145" r="35" fill="#C08718" fillOpacity="0.4"/>
    <circle id="svg_digital"
            onClick={changeActive}
            className={`clickForShowProject${'digital'===active?' activ_point':''}`}
            cx="125" cy="145" r="20" fill="#C08718"/>
    <text
              fill="#2E3237"
              className={`point_text${'digital'===active?' active_text':''}`}
              fontSize="24"
              fontWeight="700"
              fontFamily="Bebas Neue"
              x="165"
              y="155"
            >
                {ethnica}
            </text>
  </g>
        <g className="svgDigitalMovable" id="svg_energy_puls_wrapper" onClick={changeActive}>

        <circle id="svg_energy_puls"
                onClick={changeActive}
                cx="124" cy="360"
                className={`pulsation${'energy'===active?' pulsation_hide':''}`}
                r="35" fill="#C08718" fillOpacity="0.4"/>
        <circle id="svg_energy"
                onClick={changeActive}
                className={`clickForShowProject${'energy'===active?' activ_point':''}`}
                cx="124" cy="360" r="20" fill="#C08718"/>
        <text
              fill="#2E3237"
              className={`point_text${'energy'===active?' active_text':''}`}
              fontSize="24"
              fontWeight="700"
              fontFamily="Bebas Neue"
              x="160"
              y="370"
            >
              {ecology}
            </text>

        </g>
        <g id="svgDigitalMovable" id="svg_food_puls_wrapper" onClick={changeActive}  >


                <circle id="svg_food_puls"
                        onClick={changeActive}
                        cx="35" cy="220"
                        className={`pulsation${'food'===active?' pulsation_hide':''}`}
                        r="35" fill="#C08718" fillOpacity="0.4"/>
                    <circle id="svg_food"
                            onClick={changeActive}
                            className={`clickForShowProject${'food'===active?' activ_point':''}`}
                            cx="35" cy="220" r="20" fill="#C08718"/>
                    <text
                            fill="#2E3237"
                            className={`point_text${'food'===active?' active_text':''}`}
                            fontSize="24"
                            fontWeight="700"
                            fontFamily="Bebas Neue"
                            x="70"
                            y="232"
                            >
                            {scalability}

                            </text>
            </g>
    <defs>
<linearGradient id="paint0_linear" x1="215.25" y1="-83.5" x2="215.25" y2="486" gradientUnits="userSpaceOnUse">
<stop stopColor="white"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="-8.49999" y1="466" x2="118" y2="327.5" gradientUnits="userSpaceOnUse">
<stop stopColor="white"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="356.5" y1="-13.5" x2="343.727" y2="21.4547" gradientUnits="userSpaceOnUse">
<stop stopColor="white"/>
<stop offset="1" stopColor="white" stopOpacity="0"/>
</linearGradient>
</defs>
</svg>
    </>
  );
});

