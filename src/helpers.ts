import {IOrder} from "./types";


export const addTotalSums = (orders: number[][], turnoverDepth: number): number[][] => {
    const totalSums: number[] = [];
    const n = decimalCount(turnoverDepth)
    return orders.map((order: number[], idx) => {
        const size: number = order[1];
        if (typeof order[2] !== 'undefined') {
            return order;
        } else {
            const updatedLevel = [ ...order ];
            const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
            updatedLevel[2] = (volume(totalSum * updatedLevel[0], n));
            totalSums.push((totalSum));
            return updatedLevel;
        }
    });
};

export const addDepths = (orders: number[][], maxTotal: number): number[][] => {
    return orders.map(order => {
        if (typeof order[3] !== 'undefined') {
            return order;
        } else {
            const calculatedTotal: number = order[2];
            const depth = (calculatedTotal / maxTotal) * 100;
            const updatedOrder = [ ...order ];
            updatedOrder[3] = depth;
            return updatedOrder;
        }
    });
};

export const getMaxTotalSum = (orders: number[][]): number => {
    const totalSums: number[] = orders.map(order => order[2]);
    return Math.max.apply(Math, totalSums);
}

function decimalCount (number: number) {
    // Convert to String
    const numberAsString = number.toString();
    // String Contains Decimal
    if (numberAsString.includes('.')) {
      return numberAsString.split('.')[1].length;
    }
    // String Does Not Contain Decimal
    return -number;
  }

function dec(x: number, y: number){
    let number = Math.trunc(x*Math.pow(10, y))/Math.pow(10, y)
    if (y < 0){
        number = Math.floor(x/ (y * -1) ) * (y * -1);
    }

    return number;

}

function volume(data: number, amountDepth: number){
    // const n = decimalCount(depth)
    let num = Math.trunc(data / amountDepth * -1)
    if (amountDepth > 0){
        // console.log(data, amountDepth)
        num = ((Math.trunc(data*Math.pow(10, amountDepth))/Math.pow(10, amountDepth)))
        // console.log(num, amountDepth)
    }
    return num
}

export const group = (orders: number[][], depth: number, amountDepth: number) => {
    let newArray: {[key: number]: number}= {}
 
    // const lines = 7;
    const n = decimalCount(depth)
    const amountN = decimalCount((amountDepth))

    orders.forEach((elem) => {
        // console.log()
        if (newArray[dec(elem[0], n)]){
            newArray[dec(elem[0], n)] = volume(elem[1] + newArray[dec(elem[0], n)], amountN)
        } else {
            newArray[dec(elem[0], n)] = volume(elem[1], amountN)
        }
    })

    return Object.entries(newArray).map((elem) => {
        return [Number(elem[0]), ((elem[1]))]
    })
}


