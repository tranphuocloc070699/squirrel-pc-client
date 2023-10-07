// eslint-disable-next-line no-undef
/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  
mode: 'jit',
content: [
  // Example content paths...
  './public/**/*.html',
  './src/**/*.{js,jsx,ts,tsx,vue}',

],
    theme: {
    extend: {
      colors:{
        primary:'#087285',
        gray_5d5:'#5d5c61',
        green_379:'#379683',
        blue_739:'#7395ae',
        blue_557:'#557A95',
        beige_b1a:'#b1a296',
        df:'#DFDFDF',
        bg_primary:'#f5f5f7'
      },
      width:{
      }
    }
  },
  plugins: [
   
]
}




