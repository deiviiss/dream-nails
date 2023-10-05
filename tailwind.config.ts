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
        'legal-gradient': 'linear-gradient(to top, #FFFFFF 70%,#35748C 100%)',
        'body-gradient': 'linear-gradient(to top, #FFFFFF 60%,#FBE1D9 100%)',
        'primary-gradient': 'linear-gradient(to top, #35748C 75%,#FBE1D9 100%)',
        'secondary-gradient': 'linear-gradient(to top, #ECBEAD 30%, #FBE1D9 70%, #FFFFFF 100%)'
      },
      backgroundColor: {
        primary: '#35748C', // Color Principal
        secondary: '#ECBEAD', // Color Secundario
        tertiary: '#FBE1D9', // Color de Destacado
        gray: '#FCC4C4', // Color Gris
        white: '#F3F3F3'
      },
      textColor: {
        primary: '#35748C', // Color de Texto Principal
        secondary: '#ECBEAD', // Color de Texto Secundario
        tertiary: '#FBE1D9', // Color Gris
        gray: '#FCC4C4', // Color Gris
        white: '#F3F3F3'
      },
      borderColor: {
        primary: '#35748C', // Color de Texto Principal
        secondary: '#ECBEAD', // Color de Texto Secundario
        tertiary: '#FBE1D9', // Color Gris
        gray: '#FCC4C4', // Color Gris
        white: '#F3F3F3'
      }
    }
  },
  plugins: []
}
export default config
