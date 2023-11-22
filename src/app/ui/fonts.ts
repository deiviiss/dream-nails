import { Arapey, Josefin_Sans } from 'next/font/google'

export const josefin = Josefin_Sans({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap'
})

export const arapey = Arapey({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-arapey',
  display: 'swap'
})
