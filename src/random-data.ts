import {IOrder} from "./types";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}



export function getData(){
    let data: IOrder[] = [];


    for (let i = 0, j = 50; i < j; i += 1) {
        let buy: boolean = Math.random() < 0.5;
        data.push({
            id: '12',
            addr: '12',
            amount: getRandomInt(100).toString() + 1,
            blockedCosts: '0.006',
            buy: buy,
            orderID: '12',
            price: (!buy? getRandomInt(10) + 29:  getRandomInt(10) + 19).toString() ,
            sell: !buy,
            status: 'pending',
            orderBlocked: false,
            time: 'string',
            token1: 'grimace',
            token2: 'wwdoge',
            type: 'limit'
        })
    }
    return data;
}
