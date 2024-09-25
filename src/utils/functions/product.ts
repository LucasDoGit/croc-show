

export function priceToBrl(price: string | number){
    return price.toLocaleString("pt-BR", {
        style: 'currency',
        currency: 'BRL'
    })
}

interface createdProps {
    seconds: number,
    nanoseconds: number
}

export function convertDateFirebase(created: createdProps) {
    const date = new Date(created.seconds * 1000 + created.nanoseconds / 1000000);
    return date.toISOString();
};