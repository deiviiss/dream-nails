import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/hero.jpg')",
        'legal-gradient': 'linear-gradient(to top, #FFFFFF 70%,#FCC4C4 100%)',
        'body-gradient': 'linear-gradient(to top, #FFFFFF 70%,#D18E8F 100%)',
        'form-gradient': 'linear-gradient(to top, #FFFFFF 55%,#D18E8F 100%)',
        'primary-gradient': 'linear-gradient(to top,#8FC9B9 1%, #D18E8F 100%)',
        'secondary-gradient': 'linear-gradient(to top, #ECBEAD 30%, #D18E8F 70%, #FFFFFF 100%)'
      },
      backgroundColor: {
        primary: '#D18E8F', // Color de Texto Principal
        secondary: '#8FC9B9', // Color de Texto Secundario
        tertiary: '#AB5C72', // Color de Destacado
        cuartiary: '#FCC4C4', // Color Gris
        white: '#F3F3F3'
      },
      textColor: {
        primary: '#D18E8F', // Color de Texto Principal
        secondary: '#8FC9B9', // Color de Texto Secundario
        tertiary: '#AB5C72', // Color de Destacado
        cuartiary: '#FCC4C4', // Color Gris
        white: '#F3F3F3'
      },
      borderColor: {
        primary: '#D18E8F', // Color de Texto Principal
        secondary: '#8FC9B9', // Color de Texto Secundario
        tertiary: '#AB5C72', // Color de Destacado
        cuartiary: '#FCC4C4', // Color Gris
        white: '#F3F3F3'
      }
    }
  },
  plugins: []
}
export default config
