import React, {useEffect, useState} from 'react';
import OrderFlow from "./components/OrderFlow";
import {getData} from "./random-data";
import {IOrder} from "./types";


function test(price: number){
    alert(price)
}


const App = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    useEffect(() => {
        setInterval(() => setOrders(getData()), 1000);
    }, [])
    return (
        <div>
            <OrderFlow orders={orders} token1={"GRIMACE"} token2={"USDT"} lastPrice={'30'} markPrice={'30'} address={"0x77"} depth='1' amountDepth='0.1'  turnoverDepth='0.1' callback={test}></OrderFlow>
        </div>
    );
};

export default App;