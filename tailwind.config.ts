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
        adicional: "url('/public/bg-header.png')"
      },
      backgroundColor: {
        primary: '#AED2D8', // Color Principal
        secondary: '#6E8898', // Color Secundario
        highlight: '#FFA500', // Color de Destacado
        gray: '#D2D2D2' // Color Gris
      },
      textColor: {
        primary: '#333333', // Color de Texto Principal
        secondary: '#666666', // Color de Texto Secundario // Color de Texto Secundario
        gray: '#D2D2D2', // Color Gris
        warning: '#FFA500' // Color de Advertencia
      },
      borderColor: {
        primary: '#AED2D8', // Color de Borde Principal
        secondary: '#6E8898', // Color de Borde Secundario
        accent: '#FFA500', // Color de Borde de Acento
        gray: '#D2D2D2' // Color de Borde Gris
      }
    }
  },
  plugins: []
}
export default config
