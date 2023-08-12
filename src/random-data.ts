import {IOrder} from "./types";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}



export function getData(){
    let data: IOrder[] = [];


    for (let i = 0, j = 100; i < j; i += 1) {
        let buy: boolean = Math.random() < 0.5;
        data.push({
            id: '12',
            addr: '0x01',
            amount: (getRandomInt(10) + 1).toString(),
            blockedCosts: '0.006',
            buy: buy,
            orderID: '12',
            price: (!buy? getRandomInt(1000) / 100 + 31:  29 - getRandomInt(1000) / 100).toString() ,
            sell: !buy,
            status: 'pending',
            orderBlocked: false,
            time: 'string',
            token1: 'grimace',
            token2: 'wwdoge',
            type: 'limit'
        })


    }

    data.push({
        id: '12',
        addr: '0x77',
        amount: getRandomInt(100).toString() + 1,
        blockedCosts: '0.006',
        buy: false,
        orderID: '12',
        price: '35' ,
        sell: true,
        status: 'pending',
        orderBlocked: false,
        time: 'string',
        token1: 'grimace',
        token2: 'wwdoge',
        type: 'limit'
    })


    data.push({
        id: '12',
        addr: '0x77',
        amount: getRandomInt(100).toString() + 1,
        blockedCosts: '0.006',
        buy: false,
        orderID: '12',
        price: '33' ,
        sell: true,
        status: 'pending',
        orderBlocked: false,
        time: 'string',
        token1: 'grimace',
        token2: 'wwdoge',
        type: 'limit'
    })


    data.push({
        id: '12',
        addr: '0x77',
        amount: getRandomInt(100).toString() + 1,
        blockedCosts: '0.006',
        buy: true,
        orderID: '12',
        price: '27' ,
        sell: false,
        status: 'pending',
        orderBlocked: false,
        time: 'string',
        token1: 'grimace',
        token2: 'wwdoge',
        type: 'limit'
    })

    return data;
}
