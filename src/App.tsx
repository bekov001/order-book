import React, {useEffect, useState} from 'react';
import OrderFlow from "./components/OrderFlow";
import {getData} from "./random-data";
import {IOrder} from "./types";





const App = () => {
    const [orders, setOrders] = useState<IOrder[]>([])
    useEffect(() => {
        setInterval(() => setOrders(getData()), 1000);
    }, [])
    return (
        <div>
            <OrderFlow orders={orders} token1={"GRIMACE"} token2={"USDT"} lastPrice={'30'} markPrice={'30'}></OrderFlow>
        </div>
    );
};

export default App;