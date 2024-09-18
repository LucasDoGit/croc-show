import { Roboto, Roboto_Slab, Bebas_Neue, Inter } from 'next/font/google'

export const fontInterSans = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

export const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap'
});

export const robotoSlab = Roboto_Slab({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700'],
    variable: '--font-roboto-slab',
    display: 'swap'
})


export const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
    display: 'swap'
})