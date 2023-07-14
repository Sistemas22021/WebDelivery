export default (status: number) => {
    switch (status) {
        case 404:
            return `La orden no se encuentra, ya fue atendida`;
        case 422:
            return `No se pudo actualizar la orden, los datos estan corruptos`;
        case 500:
            return `No se pudo actualizar la orden`;
        default: return ''
    }
}
