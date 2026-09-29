/* Drill-scene drawing. Fills #dworld. Edit the markup below. */
document.getElementById("dworld").innerHTML = `
            <defs>
              <linearGradient id="dgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E8FC7"/><stop offset=".6" stop-color="#8AC4E2"/><stop offset="1" stop-color="#CBE6F2"/></linearGradient>
              <linearGradient id="dgSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#79CBE4"/><stop offset=".3" stop-color="#2A88AE"/><stop offset="1" stop-color="#0B3A55"/></linearGradient>
              <linearGradient id="dgR1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEDCAF"/><stop offset="1" stop-color="#CDB583"/></linearGradient>
              <linearGradient id="dgR2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C4A87C"/><stop offset="1" stop-color="#B0925F"/></linearGradient>
              <linearGradient id="dgR3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A98C60"/><stop offset="1" stop-color="#94794F"/></linearGradient>
              <linearGradient id="dgR4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#87704F"/><stop offset="1" stop-color="#5C4A39"/></linearGradient>
              <linearGradient id="dgGas" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EAF7E6"/><stop offset="1" stop-color="#BDE4E4"/></linearGradient>
              <linearGradient id="dgOil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A5A22"/><stop offset=".5" stop-color="#6A4116"/><stop offset="1" stop-color="#3F240C"/></linearGradient>
              <linearGradient id="dgWall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6E8190"/><stop offset=".35" stop-color="#EAF1F5"/><stop offset="1" stop-color="#41525E"/></linearGradient>
              <linearGradient id="dgOilCol" gradientUnits="userSpaceOnUse" x1="0" y1="132" x2="0" y2="380"><stop offset="0" stop-color="#F0B85E"/><stop offset=".35" stop-color="#C98A3C"/><stop offset="1" stop-color="#4A2A0E"/></linearGradient>
              <linearGradient id="dgTankOil" gradientUnits="userSpaceOnUse" x1="0" y1="62" x2="0" y2="112"><stop offset="0" stop-color="#C98A3C"/><stop offset="1" stop-color="#5A3410"/></linearGradient>
              <linearGradient id="dgTankGas" gradientUnits="userSpaceOnUse" x1="0" y1="70" x2="0" y2="112"><stop offset="0" stop-color="#EAF9F6"/><stop offset="1" stop-color="#8FCEDD"/></linearGradient>
              <radialGradient id="dgGlow"><stop offset="0" stop-color="#FFE49B" stop-opacity=".9"/><stop offset="1" stop-color="#FFD86B" stop-opacity="0"/></radialGradient>
              <clipPath id="dgResClip"><path d="M190 545 L190 470 C190 446 245 438 320 438 C395 438 450 446 450 470 L450 545 Z"/></clipPath>
              <clipPath id="dgOilTankClip"><rect x="380" y="64" width="24" height="46" rx="4"/></clipPath>
              <clipPath id="dgGasTankClip"><rect x="412" y="72" width="24" height="38" rx="4"/></clipPath>
              <clipPath id="dgColClip"><rect id="dgColRect" x="315" y="132" width="10" height="0"/></clipPath>
              <clipPath id="dgCargoClip"><rect x="6" y="3" width="136" height="15" rx="3"/></clipPath>
              <clipPath id="dgShipHullClip"><path d="M0 0 L4 26 L162 26 C180 22 193 10 198 0 Z"/></clipPath>
              <linearGradient id="dgWaveA" gradientUnits="userSpaceOnUse" x1="0" y1="170" x2="0" y2="300"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".4"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
              <linearGradient id="dgWaveB" gradientUnits="userSpaceOnUse" x1="0" y1="170" x2="0" y2="320"><stop offset="0" stop-color="#7FD3F0" stop-opacity=".55"/><stop offset="1" stop-color="#7FD3F0" stop-opacity="0"/></linearGradient>
              <linearGradient id="dgRay" gradientUnits="userSpaceOnUse" x1="0" y1="170" x2="0" y2="360"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".5"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
              <linearGradient id="dgDeckShadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#062A40" stop-opacity=".55"/><stop offset="1" stop-color="#062A40" stop-opacity="0"/></linearGradient>
              <linearGradient id="dgTankInner" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#062A40" stop-opacity=".4"/><stop offset=".25" stop-color="#062A40" stop-opacity="0"/><stop offset=".75" stop-color="#062A40" stop-opacity="0"/><stop offset="1" stop-color="#062A40" stop-opacity=".45"/></linearGradient>
              <linearGradient id="dgDeckG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DA0AD"/><stop offset="1" stop-color="#4E5C66"/></linearGradient>
              <linearGradient id="dgDerrickG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F0705A"/><stop offset=".5" stop-color="#E0553F"/><stop offset="1" stop-color="#A83424"/></linearGradient>
              <linearGradient id="dgRefFade" gradientUnits="userSpaceOnUse" x1="0" y1="170" x2="0" y2="300"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></linearGradient>
              <mask id="dgRefMask"><rect x="120" y="170" width="400" height="130" fill="url(#dgRefFade)"/></mask>
              <radialGradient id="dgBubble"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".95"/><stop offset=".55" stop-color="#EAF9F6" stop-opacity=".5"/><stop offset="1" stop-color="#BDE4E4" stop-opacity="0"/></radialGradient>
              <linearGradient id="dgSlug" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0B85E"/><stop offset="1" stop-color="#8A5A22"/></linearGradient>
              <radialGradient id="dgSunHalo"><stop offset="0" stop-color="#FFF6D2" stop-opacity=".85"/><stop offset=".6" stop-color="#FFF1BE" stop-opacity=".25"/><stop offset="1" stop-color="#FFF1BE" stop-opacity="0"/></radialGradient>
              <linearGradient id="dgDeepFog" gradientUnits="userSpaceOnUse" x1="0" y1="400" x2="0" y2="560"><stop offset="0" stop-color="#062A40" stop-opacity="0"/><stop offset="1" stop-color="#062A40" stop-opacity=".45"/></linearGradient>
              <linearGradient id="dgHazeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset=".5" stop-color="#FFFFFF" stop-opacity=".55"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
              <pattern id="dgCausticP" width="220" height="120" patternUnits="userSpaceOnUse">
                <g fill="none" stroke="#BEE7F5" stroke-width="1.8" stroke-linecap="round" opacity=".5">
                  <path d="M-30 30 q 34 -20 68 0 t 68 0 t 68 0"/>
                  <path d="M0 68 q 34 -18 68 0 t 68 0 t 68 0"/>
                  <path d="M-60 106 q 34 -18 68 0 t 68 0 t 68 0"/>
                </g>
              </pattern>
            </defs>

            <g id="dsky">
              <rect x="-6000" y="-260" width="12000" height="430" fill="url(#dgSky)"/>
              <circle cx="566" cy="50" r="80" fill="url(#dgSunHalo)"/>
              <circle cx="566" cy="50" r="30" fill="#FFE38A"/>
              <g class="dcloud" fill="#FFFFFF" opacity=".92">
                <ellipse cx="150" cy="62" rx="44" ry="16"/>
                <circle cx="124" cy="58" r="14"/><circle cx="172" cy="60" r="16"/>
              </g>
              <g class="dcloud" fill="#FFFFFF" opacity=".8" style="animation-duration:60s">
                <ellipse cx="420" cy="96" rx="34" ry="12"/>
                <circle cx="402" cy="93" r="11"/><circle cx="438" cy="94" r="12"/>
              </g>
              <g class="dcloud" fill="#FFFFFF" opacity=".7" style="animation-duration:74s;animation-delay:-8s">
                <ellipse cx="640" cy="72" rx="30" ry="11"/>
                <circle cx="624" cy="69" r="10"/><circle cx="658" cy="70" r="11"/>
              </g>
              <g stroke="#12324A" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".5">
                <path d="M208 74 q 7 -7 14 0 q 7 -7 14 0"/>
                <path d="M252 60 q 5 -5 10 0 q 5 -5 10 0"/>
              </g>
            </g>

            <g id="dsea">
              <rect x="-6000" y="170" width="12000" height="190" fill="url(#dgSea)"/>
              <rect x="-6000" y="170" width="12000" height="30" fill="#FFFFFF" opacity=".16"/>
              <g id="dcaustics" opacity=".5"><rect x="-6000" y="176" width="12000" height="150" fill="url(#dgCausticP)"/></g>
              <g class="dray" fill="url(#dgRay)" opacity=".4">
                <path d="M150 172 L216 172 L344 360 L216 360 Z"/>
                <path d="M414 172 L462 172 L556 360 L462 360 Z" opacity=".7"/>
                <path d="M486 172 L520 172 L596 360 L520 360 Z" opacity=".5"/>
              </g>
              <path id="dwaveA" fill="url(#dgWaveA)" d=""/>
              <path id="dwaveB" fill="url(#dgWaveB)" d=""/>
              <path id="dwave1" fill="none" stroke="#0A3F5E" stroke-width="3.4" opacity=".5" d=""/>
              <path id="dwave2" fill="none" stroke="#FFFFFF" stroke-width="2.4" opacity=".5" d=""/>
              <g fill="#EAF9FF" opacity=".6">
                <circle class="dglint" cx="212" cy="196" r="2"/><circle class="dglint" cx="356" cy="212" r="2.4" style="animation-delay:.6s"/>
                <circle class="dglint" cx="512" cy="188" r="2" style="animation-delay:1.1s"/><circle class="dglint" cx="132" cy="228" r="2.2" style="animation-delay:1.6s"/>
                <circle class="dglint" cx="452" cy="240" r="2" style="animation-delay:.3s"/><circle class="dglint" cx="268" cy="258" r="2.2" style="animation-delay:.9s"/>
              </g>
              <g fill="#CFEFF9" opacity=".5">
                <circle class="dsnow" cx="180" cy="250" r="1.6"/><circle class="dsnow" cx="248" cy="300" r="1.4" style="animation-delay:-2s"/>
                <circle class="dsnow" cx="360" cy="270" r="1.8" style="animation-delay:-4s"/><circle class="dsnow" cx="416" cy="322" r="1.5" style="animation-delay:-1s"/>
                <circle class="dsnow" cx="300" cy="330" r="1.3" style="animation-delay:-3s"/><circle class="dsnow" cx="120" cy="300" r="1.5" style="animation-delay:-5s"/>
              </g>
            </g>

            <g id="dreflect" opacity=".35" mask="url(#dgRefMask)">
              <g transform="translate(0 340) scale(1 -1)">
                <path d="M304 112 L316 26 M336 112 L324 26" stroke="#0E2A3E" stroke-width="5" fill="none"/>
                <path d="M306 92 L330 72 M330 92 L308 72" stroke="#0E2A3E" stroke-width="3" fill="none"/>
                <rect x="190" y="112" width="240" height="14" rx="5" fill="#0E2A3E"/>
                <path d="M214 126 L206 358 M426 126 L434 358" stroke="#0E2A3E" stroke-width="7" fill="none"/>
                <rect x="378" y="62" width="28" height="50" rx="5" fill="#0E2A3E"/>
                <rect x="410" y="70" width="28" height="42" rx="5" fill="#0E2A3E"/>
              </g>
              <path d="M320 172 L320 260" stroke="#FFD86B" stroke-width="4" opacity=".25" stroke-linecap="round"/>
            </g>
            <g id="dfish">
              <g transform="translate(150 250) scale(.22)"><g class="dfish1" style="transform-box:fill-box"><path d="M0 0 C14 -9 30 -9 40 0 C30 9 14 9 0 0 Z" fill="#0B3A55"/><path d="M2 0 L-11 -8 L-8 0 L-11 8 Z" fill="#0B3A55"/><circle cx="30" cy="-2" r="1.8" fill="#EAF6FB" opacity=".85"/></g></g>
              <g transform="translate(430 306) scale(.18)"><g class="dfish2" style="transform-box:fill-box"><path d="M0 0 C9 -6 19 -6 25 0 C19 6 9 6 0 0 Z" fill="#0B3A55"/><path d="M1 0 L-7 -6 L-5 0 L-7 6 Z" fill="#0B3A55"/><circle cx="18" cy="-1.4" r="1.2" fill="#EAF6FB" opacity=".8"/></g></g>
              <g transform="translate(300 218) scale(.2)"><g class="dfish3" style="transform-box:fill-box"><path d="M0 0 C11 -7 24 -7 32 0 C24 7 11 7 0 0 Z" fill="#0B3A55"/><path d="M2 0 L-9 -7 L-6 0 L-9 7 Z" fill="#0B3A55"/><circle cx="24" cy="-1.6" r="1.5" fill="#EAF6FB" opacity=".85"/></g></g>
            </g>

            <g id="dground">
              <rect x="-6000" y="358" width="12000" height="34" fill="url(#dgR1)"/>
              <rect x="-6000" y="392" width="12000" height="44" fill="url(#dgR2)"/>
              <rect x="-6000" y="436" width="12000" height="42" fill="url(#dgR3)"/>
              <rect x="-6000" y="478" width="12000" height="182" fill="url(#dgR4)"/>
              <g fill="#FFFFFF" opacity=".16">
                <ellipse cx="236" cy="372" rx="9" ry="3.4"/><ellipse cx="404" cy="378" rx="7" ry="2.8"/>
                <ellipse cx="520" cy="370" rx="10" ry="3.6"/><ellipse cx="120" cy="404" rx="9" ry="3.2"/>
                <ellipse cx="470" cy="418" rx="8" ry="3"/>
              </g>
              <rect x="-6000" y="400" width="12000" height="162" fill="url(#dgDeepFog)"/>
            </g>

            <g id="dres">
              <path id="dresGlow" d="M150 560 C150 430 240 400 320 400 C400 400 490 430 490 560 Z" fill="url(#dgGlow)" opacity="0"/>
              <path d="M190 545 L190 470 C190 446 245 438 320 438 C395 438 450 446 450 470 L450 545 Z" fill="#120C07"/>
              <g clip-path="url(#dgResClip)">
                <rect x="180" y="438" width="280" height="34" fill="url(#dgGas)"/>
                <g fill="#FFFFFF" opacity=".75">
                  <circle cx="252" cy="456" r="5"/><circle cx="300" cy="470" r="4"/><circle cx="372" cy="460" r="5.5"/><circle cx="410" cy="474" r="3.6"/>
                </g>
                <rect x="180" y="472" width="280" height="80" fill="url(#dgOil)"/>
                <path d="M180 474 q 30 -6 60 0 t 60 0 t 60 0 t 60 0 L 480 490 L 180 490 Z" fill="#C98A3C" opacity=".55"/>
              </g>
              <path d="M190 468 C190 446 245 438 320 438 C395 438 450 446 450 468" fill="none" stroke="#F0D9A8" stroke-width="3.4" opacity=".45"/>
              <text id="dgasLbl" data-i="dg_lbl_gas" opacity="0" x="268" y="466" text-anchor="end" fill="#EAF7E6" style="font-family:var(--font);font-weight:800;font-size:17px;letter-spacing:1px;stroke:rgba(6,42,64,.5);stroke-width:4;paint-order:stroke">GAS</text>
              <g id="doilLbl" opacity="0">
                <path d="M244 500 C244 500 236 510 236 515 a 8 8 0 0 0 16 0 C252 510 244 500 244 500 Z" fill="#F5C274"/>
                <text data-i="dg_lbl_oil" x="268" y="524" text-anchor="end" fill="#FFE1A8" style="font-family:var(--font);font-weight:800;font-size:18px;letter-spacing:1px;stroke:rgba(6,42,64,.5);stroke-width:4;paint-order:stroke">OIL</text>
              </g>
            </g>

            <g id="dwell">
              <line x1="320" y1="360" x2="320" y2="470" stroke="#2C2117" stroke-width="16" stroke-linecap="round"/>
              <line x1="320" y1="360" x2="320" y2="470" stroke="#0F0B07" stroke-width="9" stroke-linecap="round"/>
              <g>
                <path d="M302 366 L338 366 L332 348 L308 348 Z" fill="#E9B32B" stroke="#8A6208" stroke-width="2"/>
                <rect x="313" y="338" width="14" height="12" rx="3" fill="#F2C230" stroke="#8A6208" stroke-width="2"/>
              </g>
            </g>

            <g id="drig">
              <path d="M214 126 L206 358 M426 126 L434 358" stroke="#5B6B78" stroke-width="7" stroke-linecap="round" fill="none"/>
              <path d="M214 220 L426 220 M214 300 L426 300" stroke="#F4B000" stroke-width="4" fill="none"/>
              <path d="M214 220 L426 300 M426 220 L214 300" stroke="#D89A16" stroke-width="2.6" fill="none"/>
              <rect x="190" y="126" width="240" height="18" fill="url(#dgDeckShadow)" opacity=".5"/>
              <rect x="190" y="112" width="240" height="14" rx="5" fill="url(#dgDeckG)" stroke="#12324A" stroke-width="2.5"/>
              <rect x="193" y="115" width="234" height="4" rx="2" fill="#AFC3CF"/>
              <path d="M192 106 L428 106" stroke="#DCE8EF" stroke-width="2" opacity=".8"/>
              <ellipse id="drotary" cx="320" cy="116" rx="9" ry="2.6" fill="none" stroke="#FFD86B" stroke-width="2.4" stroke-dasharray="3 5"/>
              <g stroke="#DCE8EF" stroke-width="1.6" opacity=".7">
                <line x1="206" y1="106" x2="206" y2="114"/><line x1="242" y1="106" x2="242" y2="114"/>
                <line x1="278" y1="106" x2="278" y2="114"/><line x1="356" y1="106" x2="356" y2="114"/>
                <line x1="392" y1="106" x2="392" y2="114"/><line x1="424" y1="106" x2="424" y2="114"/>
              </g>
              <path d="M304 112 L316 26 M336 112 L324 26" stroke="url(#dgDerrickG)" stroke-width="5" stroke-linecap="round" fill="none"/>
              <path d="M308 92 L332 92 M310 72 L330 72 M312 54 L328 54 M314 38 L326 38" stroke="#C0432F" stroke-width="2.6"/>
              <path d="M306 92 L330 72 M330 92 L308 72 M309 72 L327 54 M327 72 L311 54 M313 54 L325 38 M325 54 L315 38" stroke="#C0432F" stroke-width="2" opacity=".9"/>
              <rect x="311" y="22" width="18" height="8" rx="2" fill="#B03B28"/>
              <rect id="dblockG" x="314" y="42" width="12" height="10" rx="2" fill="#F4B000" stroke="#12324A" stroke-width="1.6"/>
              <circle cx="320" cy="18" r="3.4" fill="#FF6B6B" class="dblink"/>
              <g>
                <rect x="246" y="96" width="22" height="16" rx="4" fill="#5B6B78" stroke="#12324A" stroke-width="2"/>
                <circle id="dflywheel" cx="257" cy="96" r="9" fill="#F4B000" stroke="#12324A" stroke-width="2.4"/>
                <path d="M257 89 L257 103 M250 96 L264 96" stroke="#8A6208" stroke-width="2"/>
              </g>
              <g>
                <circle cx="220" cy="112" r="10" fill="#2F7D5A" stroke="#12324A" stroke-width="2"/>
                <circle cx="220" cy="112" r="6.5" fill="none" stroke="#EAF6FB" stroke-width="1.6" opacity=".9"/>
                <text x="220" y="116" text-anchor="middle" fill="#FFFFFF" style="font-family:var(--font);font-weight:800;font-size:9px">H</text>
              </g>
              <g>
                <rect x="378" y="62" width="28" height="50" rx="5" fill="#E9EEF2" stroke="#12324A" stroke-width="2.2"/>
                <rect x="378" y="62" width="28" height="8" rx="4" fill="#FF7A1A"/>
                <g clip-path="url(#dgOilTankClip)">
                  <rect id="doilFill" x="380" y="110" width="24" height="0" fill="url(#dgTankOil)"/>
                  <path id="doilWave" d="" fill="#C98A3C" opacity=".95"/>
                  <rect x="380" y="64" width="24" height="46" fill="url(#dgTankInner)"/>
                  <g stroke="#FFFFFF" stroke-width="1.2" opacity=".5"><line x1="396" y1="70" x2="402" y2="70"/><line x1="396" y1="82" x2="402" y2="82"/><line x1="396" y1="94" x2="402" y2="94"/></g>
                  <rect x="380" y="64" width="7" height="46" rx="3" fill="#FFFFFF" opacity=".3"/>
                </g>
                <ellipse id="doilGlow" cx="392" cy="88" rx="32" ry="34" fill="url(#dgGlow)" opacity="0"/>
              </g>
              <g>
                <rect x="410" y="70" width="28" height="42" rx="5" fill="#E9EEF2" stroke="#12324A" stroke-width="2.2"/>
                <rect x="410" y="70" width="28" height="7" rx="3.5" fill="#1BA9B5"/>
                <g clip-path="url(#dgGasTankClip)">
                  <rect id="dgasFill" x="412" y="110" width="24" height="0" fill="url(#dgTankGas)"/>
                  <path id="dgasWave" d="" fill="#CFEFF9" opacity=".9"/>
                  <rect x="412" y="72" width="24" height="38" fill="url(#dgTankInner)"/>
                  <g stroke="#FFFFFF" stroke-width="1.2" opacity=".45"><line x1="428" y1="80" x2="434" y2="80"/><line x1="428" y1="92" x2="434" y2="92"/></g>
                  <rect x="412" y="72" width="6" height="38" rx="3" fill="#FFFFFF" opacity=".3"/>
                </g>
                <ellipse id="dgasGlow" cx="424" cy="92" rx="32" ry="32" fill="url(#dgGlow)" opacity="0"/>
              </g>
              <g>
                <rect x="422" y="96" width="14" height="16" rx="3" fill="#5B6B78" stroke="#12324A" stroke-width="1.8"/>
                <path d="M430 96 L472 70" stroke="#F4B000" stroke-width="5" stroke-linecap="round"/>
                <path d="M470 70 L470 84" stroke="#39454E" stroke-width="2.4"/>
                <path d="M465 84 L475 84 L470 92 Z" fill="#39454E"/>
              </g>
              <path d="M320 124 L320 116 L392 116 L392 112" fill="none" stroke="#8A9AA3" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M320 121 L391 121" fill="none" stroke="#EAF1F5" stroke-width="1.6" opacity=".6"/>
              <path d="M392 112 L424 112" fill="none" stroke="#8A9AA3" stroke-width="5" stroke-linecap="round"/>
              <circle cx="356" cy="116" r="4" fill="none" stroke="#E8641A" stroke-width="2.4"/>
              <circle cx="392" cy="108" r="4" fill="none" stroke="#E8641A" stroke-width="2.4"/>
            </g>

            <g id="driser">
              <line x1="320" y1="132" x2="320" y2="360" stroke="#0E1A22" stroke-width="14" stroke-linecap="round"/>
              <line x1="310.5" y1="132" x2="310.5" y2="360" stroke="url(#dgWall)" stroke-width="5" stroke-linecap="round"/>
              <line x1="329.5" y1="132" x2="329.5" y2="360" stroke="url(#dgWall)" stroke-width="5" stroke-linecap="round"/>
              <line x1="332" y1="136" x2="332" y2="356" stroke="#EAF1F5" stroke-width="1.4" opacity=".4"/>
              <g stroke="#8DA0AD" stroke-width="2.4" opacity=".95">
                <line x1="306" y1="190" x2="334" y2="190"/>
                <line x1="306" y1="258" x2="334" y2="258"/>
                <line x1="306" y1="326" x2="334" y2="326"/>
              </g>
            </g>

            <g id="dstring">
              <line id="dstringLine" x1="320" y1="52" x2="320" y2="140" stroke="#5C707D" stroke-width="8" stroke-linecap="round"/>
              <line id="dstringT" x1="320" y1="52" x2="320" y2="140" stroke="#EAF1F5" stroke-width="2" opacity=".45" stroke-dasharray="3 26"/>
              <g id="dbit" transform="translate(320 140)">
                <g id="dbitSpin">
                  <rect x="-4.2" y="-10" width="8.4" height="12" rx="1.4" fill="#9AADB8" stroke="#12324A" stroke-width="1.2"/>
                  <rect x="-6" y="0" width="12" height="3.4" rx="1" fill="#5C707D" stroke="#12324A" stroke-width="1"/>
                  <path d="M-10 3.2 H10 L8 12 H-8 Z" fill="#D5DEE4" stroke="#12324A" stroke-width="1.3" stroke-linejoin="round"/>
                  <path d="M-7 5.5 H7" stroke="#8FA3AE" stroke-width="1.2"/>
                  <g fill="#6E8190" stroke="#12324A" stroke-width="1.15">
                    <ellipse cx="-5.2" cy="14.2" rx="3.3" ry="4.4"/>
                    <ellipse cx="0" cy="15.2" rx="3.4" ry="4.6"/>
                    <ellipse cx="5.2" cy="14.2" rx="3.3" ry="4.4"/>
                  </g>
                  <g fill="#F4F7F8" stroke="#12324A" stroke-width=".7" stroke-linejoin="round">
                    <path d="M-7.4 16.2 L-5.6 21.4 L-3.8 16.2 Z"/>
                    <path d="M-1.6 17.2 L0 22.6 L1.6 17.2 Z"/>
                    <path d="M3.8 16.2 L5.6 21.4 L7.4 16.2 Z"/>
                  </g>
                  <g fill="#E8641A" stroke="#12324A" stroke-width=".6">
                    <circle cx="-5.2" cy="13.2" r="1.15"/>
                    <circle cx="0" cy="14.2" r="1.15"/>
                    <circle cx="5.2" cy="13.2" r="1.15"/>
                    <circle cx="-5.2" cy="16.4" r=".9"/>
                    <circle cx="0" cy="17.4" r=".9"/>
                    <circle cx="5.2" cy="16.4" r=".9"/>
                  </g>
                </g>
                <ellipse id="dbitGlow" cx="0" cy="20" rx="16" ry="8" fill="url(#dgGlow)" opacity="0"/>
              </g>
            </g>

            <g id="dlife">
              <g transform="translate(310 200)">
                <g class="dl-drift dl-anim" style="--dur:30s">
                  <g class="dlife" data-ia="dl_plankton" tabindex="0" role="button">
                    <g class="dbody">
                      <ellipse cx="52" cy="16" rx="62" ry="26" fill="transparent"/>
                      <g fill="#8FE7B0" opacity=".9">
                        <circle cx="0" cy="10" r="2"/><circle cx="14" cy="2" r="1.6"/><circle cx="26" cy="14" r="2.2"/><circle cx="40" cy="4" r="1.7"/>
                        <circle cx="54" cy="12" r="2"/><circle cx="68" cy="2" r="1.5"/><circle cx="82" cy="14" r="2.1"/><circle cx="96" cy="6" r="1.6"/>
                        <circle cx="20" cy="26" r="1.8"/><circle cx="48" cy="28" r="1.9"/><circle cx="76" cy="26" r="1.7"/><circle cx="104" cy="20" r="1.8"/>
                        <circle cx="34" cy="-4" r="1.4"/><circle cx="62" cy="-4" r="1.5"/><circle cx="90" cy="0" r="1.3"/>
                      </g>
                      <g fill="none" stroke="#B9F2C6" stroke-width="1.2" opacity=".8">
                        <circle cx="26" cy="14" r="4"/><circle cx="54" cy="12" r="3.6"/><circle cx="82" cy="14" r="4"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(160 348)">
                <g class="dlife" data-ia="dl_algae" tabindex="0" role="button">
                  <g class="dbody">
                    <g class="dl-sway dl-anim" style="--dur:6.4s">
                      <path d="M2 0 C10 -8 2 -16 10 -24 C18 -32 8 -40 14 -50 C22 -40 28 -34 20 -24 C14 -14 22 -8 16 0 Z" fill="#2F7D5A" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                      <path d="M20 0 C26 -10 20 -18 26 -28 C32 -36 26 -44 30 -52 C38 -42 42 -34 34 -24 C28 -14 36 -8 30 0 Z" fill="#4FAE86" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                      <path d="M8 0 C6 -10 2 -16 4 -24 C10 -18 14 -10 14 0 Z" fill="#3E9B63" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                    </g>
                    <ellipse cx="16" cy="1" rx="24" ry="4" fill="#C9A46A" stroke="#B0925F" stroke-width="1.2"/>
                  </g>
                </g>
              </g>
              <g transform="translate(200 262)">
                <g class="dl-swim dl-anim" style="--dx:230px;--dur:38s">
                  <g class="dl-bob dl-anim" style="--dur:6.5s">
                    <g class="dlife" data-ia="dl_whaleshark" tabindex="0" role="button">
                      <g class="dbody">
                        <path d="M26 -8 C14 -12 4 -22 -2 -34 C-6 -41 -13 -46 -18 -42 C-23 -38 -17 -26 -11 -16 C-5 -6 -2 -1 -2 6 C-2 12 -6 20 -11 30 C-16 39 -19 46 -15 49 C-11 52 -5 46 -1 38 C5 26 14 15 26 10 C30 8 30 -4 26 -8 Z" fill="#4E7385" stroke="#12324A" stroke-width="2.3" stroke-linejoin="round"/>
                        <path d="M96 -24 C92 -40 84 -54 70 -62 C66 -65 61 -63 62 -58 C66 -48 66 -38 60 -28 C70 -32 86 -30 96 -24 Z" fill="#4E7385" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                        <path d="M44 -26 C42 -34 38 -40 33 -44 C31 -46 28 -44 29 -41 C32 -35 33 -30 32 -25 Z" fill="#4E7385" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                        <path d="M96 16 C90 32 80 50 70 60 C67 64 61 62 62 56 C66 42 70 28 72 18 Z" fill="#4E7385" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                        <path d="M56 20 C54 28 50 36 46 40 C44 42 41 41 42 38 C45 31 47 25 47 19 Z" fill="#4E7385" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                        <path d="M20 -6 C28 -22 46 -32 70 -32 C94 -32 118 -26 136 -16 C148 -9 154 -1 152 7 C148 16 126 24 92 24 C58 24 32 16 22 6 C17 1 16 -2 20 -6 Z" fill="#567D90" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <path d="M20 2 C32 12 50 16 72 16 C96 16 116 12 128 4 C136 0 144 2 148 8 C150 14 144 20 132 24 C110 29 70 30 46 24 C30 19 18 10 20 2 Z" fill="#E3EDF1"/>
                        <g stroke="#B8CBD4" stroke-width="1.3" fill="none" opacity=".9"><path d="M44 10 C70 6 104 5 132 4"/><path d="M42 18 C70 14 106 12 136 9"/><path d="M46 26 C72 23 106 21 130 18" opacity=".6"/></g>
                        <g stroke="#6E93A5" stroke-width="1.5" fill="none" opacity=".75"><path d="M42 -24 C38 -12 38 0 42 10"/><path d="M62 -29 C58 -14 58 2 62 13"/><path d="M86 -30 C82 -14 82 2 86 14"/><path d="M110 -26 C106 -12 106 2 110 14"/><path d="M132 -18 C128 -8 128 2 130 10"/></g>
                        <g fill="#F2F8FA" opacity=".95"><circle cx="38" cy="-12" r="2.4"/><circle cx="52" cy="-22" r="2"/><circle cx="68" cy="-12" r="2.6"/><circle cx="80" cy="-24" r="1.9"/><circle cx="96" cy="-14" r="2.5"/><circle cx="110" cy="-24" r="2"/><circle cx="124" cy="-14" r="2.2"/><circle cx="126" cy="-16" r="1.7"/><circle cx="142" cy="-8" r="1.6"/><circle cx="58" cy="-3" r="2.1"/><circle cx="74" cy="-3" r="2.2"/><circle cx="90" cy="-4" r="2.4"/><circle cx="106" cy="-4" r="2.1"/><circle cx="120" cy="-3" r="2"/><circle cx="46" cy="-3" r="1.9"/><circle cx="134" cy="-4" r="1.7"/></g>
                        <path d="M134 2 C142 10 149 10 152 4" fill="none" stroke="#12324A" stroke-width="2.2" stroke-linecap="round"/>
                        <circle cx="139" cy="-9" r="2.6" fill="#12324A"/><circle cx="139.8" cy="-9.8" r=".9" fill="#fff"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(430 262)">
                <g class="dl-swim dl-anim" style="--dx:96px;--dur:24s">
                  <g class="dl-bob dl-anim" style="--dur:4.8s">
                    <g class="dlife" data-ia="dl_hammerhead" tabindex="0" role="button">
                      <g class="dbody">
                        <g transform="scale(.58)">
                        <path d="M26 4 C14 -2 6 -12 0 -26 C-4 -36 -12 -42 -17 -38 C-22 -34 -17 -24 -11 -14 C-5 -4 -2 1 -2 7 C-2 13 -6 19 -12 30 C-18 41 -20 50 -15 53 C-10 56 -4 50 1 39 C7 26 16 15 26 11 C29 9 29 6 26 4 Z" fill="#5B8AA3" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                        <path d="M58 -30 C54 -45 48 -57 42 -63 C39 -66 35 -64 36 -60 C40 -49 40 -40 38 -30 Z" fill="#5B8AA3" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M72 42 C68 54 62 66 56 72 C53 75 49 73 50 68 C54 58 56 50 56 42 Z" fill="#5B8AA3" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M22 -8 C34 -30 52 -44 78 -44 C100 -44 114 -41 121 -34 C127 -27 129 -16 127 -4 C124 12 112 32 94 42 C72 52 44 50 32 38 C22 28 18 8 22 -8 Z" fill="#5B8AA3" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <path d="M22 2 C38 14 56 18 72 16 C88 14 100 6 108 -4 C114 -12 120 -14 124 -8 C127 -2 126 4 124 10 C120 26 108 38 88 44 C66 50 44 48 33 38 C24 29 20 12 22 2 Z" fill="#C7DAE1"/>
                        <path d="M102 -36 C98 -58 90 -78 78 -88 C74 -91 70 -89 71 -84 C74 -68 72 -52 64 -38 C74 -42 90 -43 102 -36 Z" fill="#5B8AA3" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                        <path d="M118 16 C108 30 98 48 90 64 C87 70 79 68 80 61 C83 46 88 32 92 22 Z" fill="#5B8AA3" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                        <path d="M92 -42 L164 -44 C175 -45 184 -36 184 -24 C184 -12 176 -3 165 -4 L94 -2 C89 -2 86 -5 86 -10 L86 -34 C86 -39 89 -42 92 -42 Z" fill="#C7DAE1" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <path d="M78 2 C76 5 76 8 78 11 M83 1 C81 4 81 7 83 10 M88 0 C86 3 86 6 88 9" fill="none" stroke="#38607C" stroke-width="1.8" stroke-linecap="round"/>
                        <circle cx="105" cy="-24" r="12" fill="#EAF6FB" stroke="#12324A" stroke-width="2.4"/><ellipse cx="105" cy="-23" rx="7" ry="7.5" fill="#16334C"/><circle cx="102" cy="-26" r="2.4" fill="#fff"/>
                        <circle cx="162" cy="-26" r="12" fill="#EAF6FB" stroke="#12324A" stroke-width="2.4"/><ellipse cx="162" cy="-25" rx="7" ry="7.5" fill="#16334C"/><circle cx="159" cy="-28" r="2.4" fill="#fff"/>
                        <path d="M96 2 C104 14 116 12 124 0" fill="none" stroke="#16334C" stroke-width="2.6" stroke-linecap="round"/>
                        <path d="M99.5 7.6 L101.2 12.2 L102.9 7.6 Z M103.8 9.5 L105.5 14.1 L107.2 9.5 Z M108.3 9.9 L110 14.5 L111.7 9.9 Z M112.8 8.7 L114.5 13.3 L116.2 8.7 Z M116.9 6.1 L118.8 10.7 L120.5 6.1 Z" fill="#FFFEF7" stroke="#12324A" stroke-width=".9" stroke-linejoin="round"/>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(200 328)">
                <g class="dl-swim dl-anim" style="--dx:96px;--dur:27s">
                  <g class="dl-bob dl-anim" style="--dur:5s">
                    <g class="dlife" data-ia="dl_ray" tabindex="0" role="button">
                      <g class="dbody">
                        <path d="M-4 0 L-46 12" fill="none" stroke="#7C8896" stroke-width="3" stroke-linecap="round"/>
                        <path d="M-4 0 L-40 18" fill="none" stroke="#7C8896" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
                        <path d="M-6 -2 C-2 -18 22 -28 50 -22 C66 -18 74 -8 68 0 C60 10 40 16 18 12 C4 9 -7 5 -6 -2 Z" fill="#8A97A3" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <path d="M0 -4 C6 -12 26 -18 48 -16 C28 -12 10 -8 4 -2 Z" fill="#B7C3CC" opacity=".7"/>
                        <path d="M30 6 C38 10 48 9 54 4 M26 12 C34 15 44 14 50 10" fill="none" stroke="#5A6673" stroke-width="1.5" opacity=".8"/>
                        <circle cx="58" cy="-12" r="2.4" fill="#12324A"/><circle cx="63" cy="-6" r="2" fill="#12324A"/>
                        <circle cx="58.7" cy="-12.7" r=".8" fill="#fff"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(410 338)">
                <g class="dl-swim dl-anim" style="--dx:120px;--dur:21s">
                  <g class="dl-bob dl-anim" style="--dur:3.2s">
                    <g class="dlife" data-ia="dl_seasnake" tabindex="0" role="button">
                      <g class="dbody">
                        <path d="M-2 4 C12 -10 26 12 40 0 C54 -12 68 10 82 0 C96 -10 110 8 124 -2" fill="none" stroke="#D9B96A" stroke-width="9" stroke-linecap="round"/>
                        <path d="M-2 4 C12 -10 26 12 40 0 C54 -12 68 10 82 0 C96 -10 110 8 124 -2" fill="none" stroke="#12324A" stroke-width="9" stroke-linecap="round" stroke-dasharray="6 15" opacity=".85"/>
                        <path d="M-2 4 C12 -10 26 12 40 0 C54 -12 68 10 82 0 C96 -10 110 8 124 -2" fill="none" stroke="#F0D9A8" stroke-width="2" stroke-linecap="round" opacity=".45"/>
                        <path d="M-2 4 L-16 10 L-8 0 Z" fill="#D9B96A" stroke="#12324A" stroke-width="1.4" stroke-linejoin="round"/>
                        <ellipse cx="130" cy="-4" rx="9" ry="6.4" fill="#D9B96A" stroke="#12324A" stroke-width="1.8"/>
                        <circle cx="133" cy="-6" r="1.8" fill="#12324A"/><circle cx="133.6" cy="-6.6" r=".7" fill="#fff"/>
                        <path d="M137 -1 C139 1 138 2 136 2" fill="none" stroke="#12324A" stroke-width="1.4" stroke-linecap="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(250 344)">
                <g class="dlife" data-ia="dl_sponge" tabindex="0" role="button">
                  <g class="dbody">
                    <g class="dl-sway dl-anim" style="--dur:7.2s">
                      <path d="M-20 10 C-24 0 -22 -10 -15 -16 C-10 -20 -6 -19 -4 -13 C-2 -6 -6 2 -8 10 Z" fill="#E8A87C" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                      <path d="M-6 10 C-8 -2 -6 -14 0 -20 C5 -25 10 -24 12 -18 C14 -10 10 0 8 10 Z" fill="#F2BE96" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                      <path d="M8 10 C8 2 12 -6 18 -10 C23 -13 27 -11 27 -6 C27 0 24 6 22 10 Z" fill="#E8A87C" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                      <ellipse cx="-12" cy="-15" rx="4" ry="2" fill="#B96A45" stroke="#12324A" stroke-width="1.2"/>
                      <ellipse cx="4" cy="-19" rx="4" ry="2" fill="#B96A45" stroke="#12324A" stroke-width="1.2"/>
                      <ellipse cx="21" cy="-9" rx="3.4" ry="1.8" fill="#B96A45" stroke="#12324A" stroke-width="1.2"/>
                    </g>
                    <ellipse cx="2" cy="12" rx="30" ry="5" fill="#C9A46A" stroke="#B0925F" stroke-width="1.2"/>
                  </g>
                </g>
              </g>
              <g transform="translate(260 290)">
                <g class="dl-swim dl-anim" style="--dx:110px;--dur:27s">
                  <g class="dl-bob dl-anim" style="--dur:4.6s">
                    <g class="dlife" data-ia="dl_turtle" tabindex="0" role="button">
                      <g class="dbody">
                        <path d="M24 -16 C12 -28 0 -26 5 -18 C8 -13 16 -12 24 -16 Z" fill="#4FAE86" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M24 10 C14 22 3 20 7 12 C10 8 17 7 24 10 Z" fill="#4FAE86" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M4 0 L-6 2 L2 5 Z" fill="#4FAE86" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <ellipse cx="74" cy="0" rx="11" ry="8" fill="#5BB98A" stroke="#12324A" stroke-width="2.2"/>
                        <path d="M14 -18 C0 -22 -10 -12 -3 -4 C-10 4 -2 15 14 12 C32 16 52 12 62 4 C70 -2 66 -14 52 -18 C36 -22 22 -22 14 -18 Z" fill="#2F7D5A" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <path d="M13 -12 C26 -20 46 -18 58 -10 M11 -3 H58 M15 6 C30 11 48 10 58 3" fill="none" stroke="#1E5B41" stroke-width="2"/>
                        <circle cx="77" cy="-2" r="2.2" fill="#12324A"/><circle cx="77.7" cy="-2.8" r=".8" fill="#fff"/>
                        <path d="M80 3 C84 4 86 3 86 1" fill="none" stroke="#12324A" stroke-width="1.4" stroke-linecap="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(260 206)">
                <g class="dl-swim dl-anim" style="--dx:170px;--dur:23s">
                  <g class="dl-bob dl-anim" style="--dur:3.8s">
                    <g class="dlife" data-ia="dl_dolphin" tabindex="0" role="button">
                      <g class="dbody">
                        <path d="M34 -16 C40 -28 50 -28 50 -15 Z" fill="#4AA0C4" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M4 2 C-6 -8 -16 -8 -12 0 C-16 8 -6 8 0 4 Z" fill="#4AA0C4" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M4 2 C10 -14 34 -24 56 -18 C68 -15 76 -8 78 -2 C80 4 74 8 64 7 C44 5 20 10 10 8 C4 7 2 5 4 2 Z" fill="#63B9DC" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <path d="M22 4 C34 8 52 6 66 2 C56 10 34 12 24 8 Z" fill="#BFE9F0" opacity=".85"/>
                        <path d="M18 6 C16 12 25 14 31 10 C27 8 22 6 18 6 Z" fill="#4AA0C4" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                        <circle cx="62" cy="-4" r="2.6" fill="#12324A"/><circle cx="62.8" cy="-5" r=".9" fill="#fff"/>
                        <path d="M70 0 C74 1 76 0 77 -2" fill="none" stroke="#12324A" stroke-width="1.6" stroke-linecap="round"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(255 317)">
                <g class="dl-swim dl-anim" style="--dx:120px;--dur:26s">
                  <g class="dl-bob dl-anim" style="--dur:4.2s">
                    <g class="dlife" data-ia="dl_hamour" tabindex="0" role="button">
                      <g class="dbody">
                        <path d="M28 -20 L32 -30 L40 -22 L46 -32 L54 -22 L62 -30 L66 -19" fill="#8A5A38" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M12 0 L-4 -12 L0 0 L-4 12 Z" fill="#8A5A38" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                        <path d="M52 10 C50 20 62 22 66 14 C60 14 56 10 52 10 Z" fill="#8A5A38" stroke="#12324A" stroke-width="1.8" stroke-linejoin="round"/>
                        <path d="M10 0 C16 -18 40 -26 60 -20 C74 -16 84 -8 86 0 C88 8 78 16 60 18 C36 22 14 14 10 0 Z" fill="#A9714B" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                        <g fill="#7C4E2E" opacity=".8"><circle cx="34" cy="-6" r="2.4"/><circle cx="46" cy="2" r="2"/><circle cx="30" cy="8" r="1.8"/><circle cx="58" cy="-8" r="2.2"/><circle cx="54" cy="10" r="1.8"/><circle cx="70" cy="4" r="1.8"/></g>
                        <path d="M74 6 C80 8 84 6 85 3" fill="none" stroke="#12324A" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="70" cy="-6" r="4" fill="#fff" stroke="#12324A" stroke-width="1.6"/><circle cx="71" cy="-6" r="2" fill="#12324A"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(445 318)">
                <g class="dl-drift dl-anim" style="--dur:10s">
                  <g class="dlife" data-ia="dl_butterfly" tabindex="0" role="button">
                    <g class="dbody">
                      <path d="M36 -30 C40 -46 50 -56 62 -56 C70 -56 76 -50 75 -42 C74 -35 70 -30 66 -26 Z" fill="#FFC234" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                      <path d="M38 -32 C42 -46 51 -54 62 -54 C69 -54 73 -49 72 -43" fill="none" stroke="#FDF6E8" stroke-width="2.6" stroke-linecap="round"/>
                      <path d="M38 26 C42 42 52 52 64 52 C72 52 78 46 77 38 C76 31 72 26 68 22 Z" fill="#FFC234" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                      <path d="M40 29 C44 42 53 50 64 50 C71 50 75 45 74 39" fill="none" stroke="#FDF6E8" stroke-width="2.6" stroke-linecap="round"/>
                      <path d="M14 -18 C4 -24 -6 -26 -12 -22 C-16 -19 -16 -13 -13 -8 C-10 -4 -10 4 -13 8 C-16 13 -16 19 -12 22 C-6 26 4 24 14 18 C9 10 7 5 7 0 C7 -5 9 -11 14 -18 Z" fill="#FFC234" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                      <path d="M12 0 C12 -20 28 -34 48 -34 C66 -34 80 -20 80 0 C80 20 66 34 48 34 C28 34 12 20 12 0 Z" fill="#F7FBFD" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M26 -33 C30 -12 30 12 26 33 L34 33 C38 12 38 -12 34 -33 Z" fill="#FFC234" stroke="#2B2B33" stroke-width="1.2" stroke-linejoin="round"/>
                      <path d="M44 -33 C48 -12 48 12 44 33 L52 33 C56 12 56 -12 52 -33 Z" fill="#FFC234" stroke="#2B2B33" stroke-width="1.2" stroke-linejoin="round"/>
                      <ellipse cx="21" cy="-19" rx="5.5" ry="6.5" fill="#2B2B33"/>
                      <ellipse cx="21" cy="19" rx="4.5" ry="5.5" fill="#2B2B33"/>
                      <path d="M58 -32 C61 -14 61 14 58 32" fill="none" stroke="#2B2B33" stroke-width="2.4"/>
                      <path d="M68 -31 C71 -14 71 14 68 31 L74 30 C77 14 77 -14 74 -30 Z" fill="#2B2B33"/>
                      <circle cx="63" cy="-12" r="5.4" fill="#F7FBFD" stroke="#2B2B33" stroke-width="1.2"/><circle cx="64" cy="-12" r="3" fill="#2B2B33"/>
                      <path d="M78 -6 C90 -9 102 -7 110 -1 C113 1 113 4 109 5 C100 7 88 7 80 5 Z" fill="#FDF6E8" stroke="#2B2B33" stroke-width="1.4" stroke-linejoin="round"/>
                      <path d="M80 -6 C90 -8 101 -6 109 -1" fill="none" stroke="#F5B32C" stroke-width="3" stroke-linecap="round"/>
                      <path d="M110 2 C112 2 112 3 110 3" fill="none" stroke="#2B2B33" stroke-width="1.4" stroke-linecap="round"/>
                      <path d="M58 14 C64 18 69 24 70 29 C71 32 68 33 65 31 C60 27 55 21 52 16 Z" fill="#FFC234" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(445 294)">
                <g class="dl-drift dl-anim" style="--dur:12s">
                  <g class="dlife" data-ia="dl_angelfish" tabindex="0" role="button">
                    <g class="dbody">
                      <path d="M64 -34 C58 -48 46 -58 30 -60 C20 -61 8 -56 0 -46 C-4 -41 -6 -36 -8 -32 C0 -34 12 -30 24 -30 C40 -30 56 -33 64 -34 Z" fill="#3040A0" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M62 34 C56 48 44 58 28 60 C18 61 6 56 -2 46 C-6 41 -8 36 -10 32 C-2 34 10 30 22 30 C38 30 54 33 62 34 Z" fill="#3040A0" stroke="#12324A" stroke-width="2.2" stroke-linejoin="round"/>
                      <path d="M14 -18 C4 -24 -6 -26 -12 -22 C-16 -19 -16 -13 -14 -8 C-13 -3 -13 3 -14 8 C-16 13 -16 19 -12 22 C-6 26 4 24 14 18 C9 10 7 5 7 0 C7 -5 9 -11 14 -18 Z" fill="#FFC234" stroke="#12324A" stroke-width="2" stroke-linejoin="round"/>
                      <path d="M4 0 C6 -22 24 -40 48 -40 C66 -40 80 -26 82 -4 C84 18 68 36 46 38 C26 40 8 24 4 0 Z" fill="#3040A0" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                      <path d="M48 -40 C54 -24 56 -10 56 0 C56 10 54 24 48 38 L62 34 C66 20 68 -20 62 -36 Z" fill="#FFC234"/>
                      <path d="M58 -34 C68 -26 76 -16 80 -2 C82 14 74 28 60 35 C68 22 72 8 70 -6 C68 -20 64 -28 58 -34 Z" fill="#232F73"/>
                      <circle cx="70" cy="-6" r="4.6" fill="#EAF6FB" stroke="#12324A" stroke-width="1.4"/><circle cx="70.8" cy="-6" r="2.4" fill="#12324A"/>
                      <path d="M56 12 C64 16 70 22 72 28 C73 31 70 32 67 30 C61 26 56 20 52 14 Z" fill="#FFC234" stroke="#12324A" stroke-width="1.5" stroke-linejoin="round"/>
                      <path d="M80 2 C83 3 84 5 82 6" fill="none" stroke="#12324A" stroke-width="1.5" stroke-linecap="round"/>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(420 344)">
                <g class="dlife" data-ia="dl_oyster" tabindex="0" role="button">
                  <g class="dbody">
                    <path d="M-24 0 C-24 12 -8 20 10 18 C22 17 28 12 26 6 C24 2 16 4 10 6 C-4 10 -16 6 -24 0 Z" fill="#C9B8A3" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                    <path d="M-24 0 C-22 -12 -4 -18 12 -14 C20 -12 26 -8 26 -2 C18 4 2 6 -10 4 C-16 3 -21 2 -24 0 Z" fill="#DCCDB6" stroke="#12324A" stroke-width="2.4" stroke-linejoin="round"/>
                    <path d="M-16 -5 q 9 -4 18 -2 M-12 4 q 11 4 22 1" fill="none" stroke="#B0A08B" stroke-width="1.4" stroke-linecap="round"/>
                    <circle cx="-1" cy="0" r="7" fill="#F6F9FB" stroke="#9FB6C0" stroke-width="1.8"/>
                    <circle cx="-3" cy="-2.6" r="2.1" fill="#fff"/>
                    <g class="dglint" fill="#FFF6D2"><circle cx="15" cy="-8" r="1.6"/><circle cx="-15" cy="11" r="1.4" style="animation-delay:.8s"/></g>
                  </g>
                </g>
              </g>
              <g transform="translate(180 232)">
                <g class="dl-drift dl-anim" style="--dur:14s">
                  <g class="dlife" data-ia="dl_seabream" tabindex="0" role="button">
                    <g class="dbody">
                      <g transform="translate(-6 18) scale(.72)">
                        <path d="M0 0 C6 -8 18 -8 24 0 C18 8 6 8 0 0 Z" fill="#DCE9EF" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M1 0 L-6 -6 L-4 0 L-6 6 Z" fill="#C3D6DF" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M9 -7 L9 7 M15 -6 L15 6" stroke="#12324A" stroke-width="2.2"/>
                        <circle cx="20" cy="-1.6" r="1.2" fill="#12324A"/>
                      </g>
                      <g transform="translate(18 12) scale(.82)">
                        <path d="M0 0 C6 -8 18 -8 24 0 C18 8 6 8 0 0 Z" fill="#DCE9EF" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M1 0 L-6 -6 L-4 0 L-6 6 Z" fill="#C3D6DF" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M9 -7 L9 7 M15 -6 L15 6" stroke="#12324A" stroke-width="2.2"/>
                        <circle cx="20" cy="-1.6" r="1.2" fill="#12324A"/>
                      </g>
                      <g>
                        <path d="M0 0 C6 -8 18 -8 24 0 C18 8 6 8 0 0 Z" fill="#DCE9EF" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M1 0 L-6 -6 L-4 0 L-6 6 Z" fill="#C3D6DF" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                        <path d="M9 -7 L9 7 M15 -6 L15 6" stroke="#12324A" stroke-width="2.2"/>
                        <circle cx="20" cy="-1.6" r="1.2" fill="#12324A"/>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(190 347)">
                <g class="dl-crawl dl-anim" style="--dur:3.4s">
                  <g class="dlife" data-ia="dl_brittlestar" tabindex="0" role="button">
                    <g class="dbody">
                      <g fill="none" stroke="#12324A" stroke-width="5.4" stroke-linecap="round">
                        <path d="M0 0 C-3 -8 -1 -15 -7 -21"/>
                        <path d="M0 0 C7 -6 13 -7 20 -13"/>
                        <path d="M0 0 C9 3 17 4 25 2"/>
                        <path d="M0 0 C7 8 10 12 8 20"/>
                        <path d="M0 0 C-9 4 -16 3 -22 -3"/>
                      </g>
                      <g fill="none" stroke="#E8B48C" stroke-width="3" stroke-linecap="round">
                        <path d="M0 0 C-3 -8 -1 -15 -7 -21"/>
                        <path d="M0 0 C7 -6 13 -7 20 -13"/>
                        <path d="M0 0 C9 3 17 4 25 2"/>
                        <path d="M0 0 C7 8 10 12 8 20"/>
                        <path d="M0 0 C-9 4 -16 3 -22 -3"/>
                      </g>
                      <circle cx="0" cy="0" r="4.6" fill="#F2BE96" stroke="#12324A" stroke-width="1.8"/>
                      <circle cx="-1.4" cy="-1" r="1" fill="#12324A"/><circle cx="1.6" cy="-1" r="1" fill="#12324A"/>
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(330 345)">
                <g class="dlife" data-ia="dl_coral" tabindex="0" role="button">
                  <g class="dbody">
                    <g class="dl-sway dl-anim" style="--dur:6.6s">
                      <path d="M-2 0 C-4 -8 -10 -12 -18 -16 C-10 -16 -4 -12 -1 -6 C0 -14 4 -20 12 -26 C10 -16 6 -10 4 0 Z" fill="#E08A6E" stroke="#12324A" stroke-width="1.7" stroke-linejoin="round"/>
                      <path d="M6 0 C8 -8 14 -14 24 -18 C18 -10 13 -5 11 0 Z" fill="#E8A87C" stroke="#12324A" stroke-width="1.6" stroke-linejoin="round"/>
                      <path d="M-10 0 C-14 -6 -20 -8 -28 -9 C-22 -3 -17 0 -13 1 Z" fill="#D97757" stroke="#12324A" stroke-width="1.5" stroke-linejoin="round"/>
                    </g>
                    <g fill="#F2BE96" stroke="#12324A" stroke-width="1.1">
                      <circle cx="-18" cy="-17" r="2.4"/><circle cx="11" cy="-26" r="2.4"/><circle cx="25" cy="-18" r="2.1"/><circle cx="-28" cy="-9" r="2"/>
                    </g>
                    <ellipse cx="-2" cy="2" rx="30" ry="5" fill="#C9A46A" stroke="#B0925F" stroke-width="1.2"/>
                  </g>
                </g>
              </g>
            </g>

            <g id="driseroil">
              <g clip-path="url(#dgColClip)">
                <rect id="doilCol" x="315" y="360" width="10" height="0" fill="url(#dgOilCol)"/>
                <line class="dstreak" x1="317.5" y1="132" x2="317.5" y2="360" stroke="#FFE9A8" stroke-width="1.6" opacity=".25" stroke-dasharray="20 46"/>
                <line class="dstreak" x1="322" y1="132" x2="322" y2="360" stroke="#FFE9A8" stroke-width="1.2" opacity=".15" stroke-dasharray="14 52" style="animation-delay:.4s"/>
              </g>
              <g id="dslugs"></g>
              <g id="dgbubbles"></g>
              <path id="doilHead" d="" fill="#C98A3C" opacity="0"/>
              <ellipse id="doilHeadGlow" cx="0" cy="0" rx="22" ry="10" fill="url(#dgGlow)" opacity="0"/>
              <ellipse id="dripple" class="drip off" cx="320" cy="170" rx="18" ry="6" fill="none" stroke="#DFF6FA" stroke-width="2.6" opacity="0"/>
            </g>

            <g id="drefinery" opacity=".95" transform="translate(670 0)">
              <path d="M 530 176 L 530 165 L 960 160 L 960 176 Z" fill="#E3C28B" stroke="#C9A469" stroke-width="2"/>
              <path d="M 530 165 L 960 160" stroke="#F0D9A8" stroke-width="2.4" opacity=".8"/>
              <g stroke="#12324A">
                <rect x="534" y="152" width="12" height="12" rx="3" fill="#5B6B78" stroke-width="1.6"/>
                <path d="M 541 152 L 561 138" stroke="#F4B000" stroke-width="3.2" stroke-linecap="round" fill="none"/>
                <path d="M 559 138 L 559 146" stroke="#39454E" stroke-width="1.6"/>
                <path d="M 556 146 L 562 146 L 559 151 Z" fill="#39454E" stroke="none"/>
              </g>
              <g stroke-linecap="round">
                <path d="M 540 158 L 662 156" stroke="#8A9AA3" stroke-width="3.2"/>
                <path d="M 540 154 L 662 152" stroke="#E8641A" stroke-width="1.8" opacity=".9"/>
                <path d="M 540 161 L 662 159" stroke="#1BA9B5" stroke-width="1.8" opacity=".85"/>
                <g fill="#8DA0AD" stroke="#12324A" stroke-width="1">
                  <rect x="548" y="152" width="3" height="12" rx="1"/><rect x="576" y="152" width="3" height="12" rx="1"/>
                  <rect x="604" y="151" width="3" height="12" rx="1"/><rect x="632" y="151" width="3" height="12" rx="1"/>
                  <rect x="656" y="150" width="3" height="12" rx="1"/>
                </g>
              </g>
              <g stroke="#12324A">
                <path d="M 556 164 L 556 142 Q 570 134 584 142 L 584 164 Z" fill="#C7DDE6" stroke-width="1.8"/>
                <rect x="561" y="146" width="6" height="12" rx="1.6" fill="#E8641A" opacity=".9"/>
                <rect x="572" y="146" width="6" height="12" rx="1.6" fill="#FFD86B" opacity=".95"/>
                <rect x="588" y="96" width="7" height="68" fill="#E9EEF2" stroke-width="1.8"/>
                <rect x="588" y="106" width="7" height="5" fill="#E8641A"/>
                <rect x="588" y="122" width="7" height="5" fill="#E8641A"/>
                <rect x="588" y="138" width="7" height="5" fill="#E8641A"/>
                <ellipse cx="591.5" cy="96" rx="3.5" ry="1.4" fill="#C2D4DD" stroke-width="1.4"/>
              </g>
              <g class="dsteam" fill="#FFFFFF"><circle cx="591.5" cy="90" r="3"/><circle cx="591.5" cy="90" r="2.2"/><circle cx="591.5" cy="90" r="1.7"/></g>
              <g stroke="#12324A" stroke-width="1.8">
                <rect x="602" y="126" width="12" height="38" rx="6" fill="#E9EEF2"/>
                <rect x="602" y="134" width="12" height="4" fill="#1BA9B5" opacity=".85"/>
                <rect x="618" y="132" width="10" height="32" rx="5" fill="#DCEAF0"/>
                <rect x="618" y="140" width="10" height="3.4" fill="#E8641A" opacity=".85"/>
              </g>
              <g stroke="#12324A">
                <g stroke-width="1.8">
                  <path d="M 636 164 L 636 106 Q 636 98 646 98 Q 656 98 656 106 L 656 164 Z" fill="#DCEAF0"/>
                  <rect x="636" y="104" width="20" height="6" fill="#E8641A" opacity=".9"/>
                  <path d="M 636 122 h 20 M 636 140 h 20 M 636 156 h 20" stroke="#9FB6C0" stroke-width="1.4"/>
                  <rect x="630" y="128" width="32" height="3.4" rx="1.7" fill="#8DA0AD"/>
                  <rect x="630" y="150" width="32" height="3.4" rx="1.7" fill="#8DA0AD"/>
                  <circle class="dblink" cx="646" cy="93" r="2.4" fill="#FF6B6B" stroke="none"/>
                </g>
                <g stroke-width="1.6">
                  <path d="M 664 164 L 664 122 Q 664 114 671 114 Q 678 114 678 122 L 678 164 Z" fill="#E9EEF2"/>
                  <rect x="664" y="119" width="14" height="4.6" fill="#1BA9B5" opacity=".9"/>
                  <path d="M 664 134 h 14 M 664 148 h 14" stroke="#9FB6C0" stroke-width="1.2"/>
                  <circle class="dblink" cx="671" cy="110" r="2" fill="#FF6B6B" stroke="none"/>
                </g>
                <g stroke-width="1.6">
                  <path d="M 686 164 L 686 132 Q 686 126 692 126 Q 698 126 698 132 L 698 164 Z" fill="#DCEAF0"/>
                  <rect x="686" y="130" width="12" height="4" fill="#E8641A" opacity=".85"/>
                  <path d="M 686 142 h 12 M 686 154 h 12" stroke="#9FB6C0" stroke-width="1.2"/>
                </g>
                <path d="M 656 136 L 664 136" stroke="#8DA0AD" stroke-width="3.4"/>
                <path d="M 678 144 L 686 144" stroke="#8DA0AD" stroke-width="3.4"/>
              </g>
              <g stroke="#12324A" stroke-width="1.8">
                <path d="M 706 164 C 706 146 718 138 718 122 C 718 110 714 104 714 100 L 730 100 C 730 104 726 110 726 122 C 726 138 738 146 738 164 Z" fill="#D5E2E8"/>
                <ellipse cx="722" cy="100" rx="8" ry="2.4" fill="#B8CBD4" stroke-width="1.4"/>
              </g>
              <g class="dsteam" fill="#FFFFFF"><circle cx="722" cy="94" r="3"/><circle cx="722" cy="94" r="2.2"/><circle cx="722" cy="94" r="1.7"/></g>
              <g stroke="#12324A" stroke-width="1.6">
                <path d="M 746 164 C 746 150 754 144 754 132 C 754 124 751 120 751 117 L 763 117 C 763 120 760 124 760 132 C 760 144 768 150 768 164 Z" fill="#E2ECF1"/>
                <ellipse cx="757" cy="117" rx="6" ry="1.8" fill="#C2D4DD" stroke-width="1.2"/>
              </g>
              <g stroke="#39454E" fill="none">
                <path d="M 780 164 L 786 82 M 808 164 L 802 82" stroke-width="2.6"/>
                <path d="M 782 148 L 806 132 M 782 118 L 806 102" stroke-width="1.6" opacity=".8"/>
                <path d="M 794 88 L 794 74" stroke="#5B6B78" stroke-width="3.4"/>
                <ellipse cx="794" cy="74" rx="2.6" ry="1.2" fill="#8DA0AD" stroke="none"/>
              </g>
              <circle cx="794" cy="68" r="7" fill="#FFD86B" opacity=".35"/>
              <circle class="dblink" cx="794" cy="94" r="2.2" fill="#FF6B6B" stroke="none"/>
              <g class="dsteam" fill="#FFFFFF"><circle cx="794" cy="66" r="2.6"/><circle cx="794" cy="66" r="2"/></g>
              <g stroke="#12324A">
                <g stroke-width="1.6">
                  <rect x="824" y="138" width="24" height="26" rx="3" fill="#DCEAF0"/>
                  <ellipse cx="836" cy="138" rx="12" ry="3" fill="#C2D4DD"/>
                  <rect x="824" y="146" width="24" height="3.4" fill="#1BA9B5" opacity=".85"/>
                  <rect x="854" y="142" width="22" height="22" rx="3" fill="#E9EEF2"/>
                  <ellipse cx="865" cy="142" rx="11" ry="2.8" fill="#C2D4DD"/>
                  <rect x="854" y="149" width="22" height="3.2" fill="#E8641A" opacity=".8"/>
                  <rect x="882" y="146" width="20" height="18" rx="3" fill="#DCEAF0"/>
                  <ellipse cx="892" cy="146" rx="10" ry="2.6" fill="#C2D4DD"/>
                  <rect x="882" y="152" width="20" height="3" fill="#1BA9B5" opacity=".85"/>
                </g>
                <path d="M 824 164 h 78" stroke="#9FB6C0" stroke-width="2"/>
              </g>
              <g stroke="#12324A" stroke-width="1.6">
                <path d="M 912 160 L 917 148 M 932 160 L 927 148" fill="none" stroke-width="2"/>
                <circle cx="922" cy="140" r="12" fill="#E9EEF2"/>
                <ellipse cx="922" cy="140" rx="12" ry="3.4" fill="none" opacity=".55"/>
                <circle cx="918" cy="136" r="3" fill="#FFFFFF" opacity=".75" stroke="none"/>
                <path d="M 940 162 L 944 152 M 958 162 L 954 152" fill="none" stroke-width="1.8"/>
                <circle cx="949" cy="146" r="9" fill="#DCEAF0"/>
                <circle cx="945" cy="142" r="2.2" fill="#FFFFFF" opacity=".7" stroke="none"/>
              </g>
              <rect x="530" y="118" width="440" height="58" fill="url(#dgHazeG)" opacity=".5"/>
              <g id="drefLabel" opacity="0">
                <path d="M 692 84 L 650 102 M 712 84 L 760 112" stroke="rgba(18,50,74,.45)" stroke-width="1.6" stroke-dasharray="4 6" fill="none"/>
                <text x="702" y="80" text-anchor="middle" fill="#0B3A55" style="font-family:var(--font);font-weight:800;font-size:16px;letter-spacing:2px;stroke:#FFFFFF;stroke-width:4;paint-order:stroke" data-i="dg_lbl_ref">REFINERY</text>
              </g>
            </g>

            <g id="dship" opacity="0" transform="translate(820 176)">
              <g id="dshipBob">
                <path d="M0 0 L4 26 L162 26 C180 22 193 10 198 0 Z" fill="#F4F8FA" stroke="#12324A" stroke-width="2"/>
                <g clip-path="url(#dgShipHullClip)">
                  <rect x="0" y="2" width="200" height="14" fill="#2A7FB4"/>
                  <rect x="0" y="16" width="200" height="4" fill="#FFFFFF" opacity=".85"/>
                  <rect x="0" y="20" width="200" height="10" fill="#C0503F"/>
                  <rect id="dcargo" x="8" y="24" width="184" height="0" fill="url(#dgTankOil)" opacity=".94"/>
                  <path id="dcargoWave" d="" fill="#C98A3C" opacity=".9"/>
                </g>
                <path d="M0 0 L198 0 L198 3 L0 3 Z" fill="#D8E3EA"/>
                <g>
                  <path d="M76 0 a 14 9 0 0 1 28 0 Z" fill="#C7D6DF" stroke="#93A7B3" stroke-width="1.4"/>
                  <path d="M116 0 a 14 9 0 0 1 28 0 Z" fill="#C7D6DF" stroke="#93A7B3" stroke-width="1.4"/>
                  <path d="M156 0 a 14 9 0 0 1 28 0 Z" fill="#C7D6DF" stroke="#93A7B3" stroke-width="1.4"/>
                </g>
                <g fill="#FFD86B" stroke="#B4790C" stroke-width=".7">
                  <circle class="dcargolamp" cx="90" cy="-4" r="2" opacity="0"/>
                  <circle class="dcargolamp" cx="130" cy="-4" r="2" opacity="0"/>
                  <circle class="dcargolamp" cx="170" cy="-4" r="2" opacity="0"/>
                </g>
                <g>
                  <rect x="68" y="-12" width="7" height="12" fill="#A9BAC4" stroke="#7B8E9A" stroke-width="1.2"/>
                  <rect x="65" y="-14" width="13" height="3" rx="1" fill="#8FA3AE"/>
                  <circle cx="61" cy="-5" r="3" fill="none" stroke="#E8641A" stroke-width="1.6"/>
                  <circle cx="82" cy="-5" r="3" fill="none" stroke="#E8641A" stroke-width="1.6"/>
                </g>
                <g>
                  <rect x="14" y="-22" width="34" height="22" rx="2" fill="#F7FAFC" stroke="#B7CBD6" stroke-width="1.4"/>
                  <g fill="#5FB7D9">
                    <rect x="18" y="-18" width="6" height="4" rx="1"/><rect x="29" y="-18" width="6" height="4" rx="1"/><rect x="40" y="-18" width="6" height="4" rx="1"/>
                    <rect x="18" y="-11" width="6" height="4" rx="1"/><rect x="29" y="-11" width="6" height="4" rx="1"/><rect x="40" y="-11" width="6" height="4" rx="1"/>
                  </g>
                  <rect x="8" y="-36" width="44" height="14" rx="2" fill="#17415C"/>
                  <rect x="8" y="-32" width="44" height="5" fill="#FFC83D"/>
                  <rect x="4" y="-40" width="52" height="5" rx="2" fill="#FFFFFF" stroke="#B7CBD6" stroke-width="1.2"/>
                  <rect x="7" y="-39" width="46" height="3" fill="#3E8FC7"/>
                  <path d="M30 -40 L30 -54" stroke="#8A9AA3" stroke-width="2" stroke-linecap="round"/>
                  <rect id="dradar" x="22" y="-57" width="16" height="3" rx="1.5" fill="#E8641A"/>
                  <circle class="dblink" cx="30" cy="-61" r="2" fill="#FF6B6B"/>
                  <rect x="56" y="-28" width="12" height="28" rx="2" fill="#17415C"/>
                  <rect x="56" y="-23" width="12" height="4" fill="#FFC83D"/>
                  <g class="dsmoke" fill="#FFFFFF">
                    <circle cx="62" cy="-32" r="4.4" opacity="0"/>
                    <circle cx="62" cy="-32" r="3.4" opacity="0"/>
                    <circle cx="62" cy="-32" r="2.6" opacity="0"/>
                  </g>
                </g>
                <text id="dshipTxt" x="104" y="19" text-anchor="middle" fill="#FFFFFF" style="font-family:var(--font);font-weight:800;font-size:13px;letter-spacing:3px">NOC</text>
                <g id="dbow" opacity="0">
                  <path d="M200 8 L220 15 L201 17 Z" fill="#FFFFFF" opacity=".55"/>
                  <path d="M197 1 L215 -3 L199 -6 Z" fill="#FFFFFF" opacity=".35"/>
                </g>
              </g>
              <g id="dwake" opacity="0">
                <path d="M-4 10 L-96 24 L-96 2 L-4 17 Z" fill="#FFFFFF" opacity=".5"/>
                <path d="M2 20 L-84 30" stroke="#FFFFFF" stroke-width="3" opacity=".4" stroke-linecap="round"/>
              </g>
            </g>

            <g id="dhose" opacity="0">
              <path id="dhosePath" d="M 398 120 Q 458 152 509 164" fill="none" stroke="#5C707D" stroke-width="7" stroke-linecap="round"/>
              <path id="dhoseFlow" d="M 398 120 Q 458 152 509 164" fill="none" stroke="#E9A13B" stroke-width="3" stroke-linecap="round" stroke-dasharray="10 16"/>
            </g>

            <g id="dheli" transform="translate(220 107) scale(.9)">
              <ellipse id="dheliBlur" cx="0" cy="-13.8" rx="20" ry="1.3" fill="#39454E" opacity=".15"/>
              <g id="dheliBody">
                <path d="M13.2 -4.6 L27 -4 L27 -1 L13.2 -1 Z" fill="#F4F8FA" stroke="#12324A" stroke-width=".9" stroke-linejoin="round"/>
                <path d="M24.4 -11.9 L29 -11.9 L27.7 -2 L23.8 -2 Z" fill="#E8641A" stroke="#12324A" stroke-width=".9" stroke-linejoin="round"/>
                <path d="M-15.2 -1 C-15.2 -7.3 -9.2 -9.9 -2 -9.9 L4 -9.9 C9.9 -9.9 13.9 -6.9 15.2 -1.7 C15.5 -.3 14.2 1.3 12.2 1.3 L-12.5 1.3 C-14.2 1.3 -15.2 .3 -15.2 -1 Z" fill="#F4F8FA" stroke="#12324A" stroke-width=".9" stroke-linejoin="round"/>
                <path d="M-13.2 -6.9 C-9.9 -8.9 -4.6 -8.9 -1.3 -8.2 L-1.3 -3 L-13.2 -3 Z" fill="#5FB7D9" stroke="#12324A" stroke-width=".7" stroke-linejoin="round"/>
                <path d="M-12.5 -7.9 C-9.9 -9.2 -5.9 -9.2 -3.3 -8.9" fill="none" stroke="#FFFFFF" stroke-width=".8" opacity=".8" stroke-linecap="round"/>
                <path d="M-13.9 -.3 L13.2 -.3" stroke="#E8641A" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M-9.2 1.3 L-9.2 4.3 M6.6 1.3 L6.6 4.3" stroke="#39454E" stroke-width="1"/>
                <path d="M-13.2 4.3 L11.2 4.3" stroke="#39454E" stroke-width="1.5" stroke-linecap="round"/>
                <rect x="-1.3" y="-13.9" width="2.3" height="4.6" rx=".7" fill="#39454E"/>
                <circle cx="28.4" cy="-6.6" r="2.6" fill="none" stroke="#39454E" stroke-width=".8"/>
                <circle cx="26.4" cy="-2.3" r="1.1" fill="#FF6B6B" class="dblink"/>
                <text id="dheliTxt" x="-1.3" y="-2.6" text-anchor="middle" fill="#0B3A55" style="font-family:var(--font);font-weight:800;font-size:4.4px;letter-spacing:.3px">NOC</text>
              </g>
              <g id="dheliRotor">
                <rect x="-20.5" y="-14.6" width="41" height="1.6" rx=".8" fill="#39454E"/>
                <rect x="-19.8" y="-14.6" width="39.6" height="1.6" rx=".8" fill="#5A6673" opacity=".7" transform="rotate(8 0 -13.8)"/>
                <rect x="-19.8" y="-14.6" width="39.6" height="1.6" rx=".8" fill="#5A6673" opacity=".7" transform="rotate(-8 0 -13.8)"/>
              </g>
            </g>

            <g id="ddepthTag" opacity="0">
              <rect x="0" y="-10" width="56" height="19" rx="9.5" fill="#0B3A55" stroke="#FFC83D" stroke-width="1.6" opacity=".95"/>
              <text id="ddepthTagTxt" x="28" y="4" text-anchor="middle" fill="#EAF6FB" style="font-family:var(--font);font-weight:800;font-size:11px">0 m</text>
            </g>

            <g id="dglabels" aria-hidden="true">
              <text class="dlbl" data-i="dg_lbl_sea" x="470" y="268" text-anchor="end">SEA</text>
              <text class="dlbl" data-i="dg_lbl_seabed" x="470" y="352" text-anchor="end">SEABED</text>
              <text class="dlbl" data-i="dg_lbl_rock" x="470" y="428" text-anchor="end">ROCK</text>
            </g>

            <g id="dfx"></g>
`;
