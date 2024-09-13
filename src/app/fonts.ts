import { Roboto, Roboto_Slab, Bebas_Neue } from 'next/font/google'

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const robotoSlab = Roboto_Slab({
    subsets: ['latin'],
    weight: ['300', '400', "600", "700"]
})


export const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap'
})