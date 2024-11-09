import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
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
        primary: '#D18E8F',

        tertiary: '#AB5C72',
        cuartiary: '#FCC4C4',
        white: '#F3F3F3'
      },
      textColor: {
        primary: '#D18E8F',
        secondary: '#8FC9B9',
        tertiary: '#AB5C72',
        cuartiary: '#FCC4C4',
        white: '#F3F3F3'
      },
      borderColor: {
        primary: '#D18E8F',
        secondary: '#8FC9B9',
        tertiary: '#AB5C72',
        cuartiary: '#FCC4C4',
        white: '#F3F3F3'
      },
      outlineColor: {
        primary: '#D18E8F',
        secondary: '#8FC9B9',
        tertiary: '#AB5C72',
        cuartiary: '#FCC4C4',
        white: '#F3F3F3'
      },
      ringColor: {
        primary: '#D18E8F',
        secondary: '#8FC9B9',
        tertiary: '#AB5C72',
        cuartiary: '#FCC4C4',
        white: '#F3F3F3'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
export default config
