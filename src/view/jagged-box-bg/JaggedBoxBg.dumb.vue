<template xmlns:v-on="http://www.w3.org/1999/xhtml">

    <svg height="100%" width="100%">
        <defs>
            <filter xmlns="http://www.w3.org/2000/svg" id="bg-rect-filter" width="200%" height="200%">

                <feTurbulence in="SourceGraphic"result="TURBULENCE_10" baseFrequency="0.01" numOctaves="10" seed="5"/>
                <feDisplacementMap in="SourceGraphic" in2="TURBULENCE_10" result="TURBULENCE_20" scale="10"/>
                <!--<feGaussianBlur in="TURBULENCE_20" result="TURBULENCE_30" stdDeviation="1" />-->

                <feMorphology operator="dilate" radius="10" in="TURBULENCE_20" result="BORDER_10" />
                <feComponentTransfer in="BORDER_10" result="BORDER_20">
                    <feFuncR type="linear" slope="2"/>
                    <feFuncG type="linear" slope="2"/>
                    <feFuncB type="linear" slope="2"/>
                </feComponentTransfer>

                <feMerge>
                    <feMergeNode in="BORDER_20"/>
                    <feMergeNode in="TURBULENCE_20"/>
                </feMerge>

            </filter>
        </defs>
        <rect class="bg-rect-filtered" x="0" y="0" width="100%" height="100%" fill="#393b3f" filter="url(#bg-rect-filter)" />
    </svg>

</template>
