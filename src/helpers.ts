import {IOrder} from "./types";


export const addTotalSums = (orders: number[][]): number[][] => {
    const totalSums: number[] = [];

    return orders.map((order: number[], idx) => {
        const size: number = order[1];
        if (typeof order[2] !== 'undefined') {
            return order;
        } else {
            const updatedLevel = [ ...order ];
            const totalSum: number = idx === 0 ? size : size + totalSums[idx - 1];
            updatedLevel[2] = totalSum;
            totalSums.push(totalSum);
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



export const group = (orders: number[][]) => {
    let newArray: {[key: number]: number}= {}
    orders.forEach((elem) => {
        if (newArray[elem[0]]){
            newArray[elem[0]] += elem[1]
        } else {
            newArray[elem[0]] = elem[1]
        }
    })

    return Object.entries(newArray).map((elem) => {
        return [Number(elem[0]), elem[1]]
    })
}


