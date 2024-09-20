

export function priceToBrl(price: string | number){
    return price.toLocaleString("pt-BR", {
        style: 'currency',
        currency: 'BRL'
    })
}