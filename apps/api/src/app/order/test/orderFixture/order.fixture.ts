import { ReceivedOrderDto } from "../../dto/received-order.dto";

export function IncomingOrderFixture(): ReceivedOrderDto {
    return {
        client_name: 'Walter White',
        client_id: '29660012',
        address: '308 Negra Arroyo LN Alburquerque, NM 87140',
        email: 'walterWhite@bad.com',
        order_bill: 130,
        dishes: [
            {
                dish_id: "1",
                count: 1
            },
            {
                dish_id: "2",
                count: 2
            }
        ]

    }
}

export function IncomingOrderFixtureFailed(): ReceivedOrderDto {
    return {
        client_name: 'Walter White',
        client_id: '29660012',
        address: '308 Negra Arroyo LN Alburquerque, NM 87140',
        email: 'walterWhite@bad.com',
        order_bill: 50,
        dishes: [
            {
                dish_id: "1",
                count: 1
            },
            {
                dish_id: "2",
                count: 2
            }
        ]

    }
}
export function IncomingOrderFixtureNotFound(): ReceivedOrderDto {
    return {
        client_name: 'Walter White',
        client_id: '29660012',
        address: '308 Negra Arroyo LN Alburquerque, NM 87140',
        email: 'walterWhite@bad.com',
        order_bill: 50,
        dishes: [
            {
                dish_id: "1asdnasldfjnasl",
                count: 1
            },
            {
                dish_id: "22",
                count: 2
            }
        ]

    }
}