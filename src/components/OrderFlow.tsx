import React, {FC, useEffect, useState} from 'react';
import {PropsWithChildren} from 'react';
import './order-flow.css';
import {IOrder} from "../types";
import {addDepths, addTotalSums, getMaxTotalSum, group} from "../helpers";
interface OrderFlowProps extends PropsWithChildren {
    orders: IOrder[],
    token1: string,
    token2: string,
    lastPrice: string,
    markPrice: string
}


function separate(orders: IOrder[]){
    let asks: number[][] = [];
    let bids: number[][] = [];
    orders.forEach((elem) => {
        if (elem.sell){
            asks.push([parseFloat(elem.price), parseFloat(elem.amount)])
        } else {
            bids.push([parseFloat(elem.price), parseFloat(elem.amount)])
        }

    })

    return [asks, bids];
}




const OrderFlow: FC<OrderFlowProps> = ({orders, token1, token2, lastPrice, markPrice}: OrderFlowProps) => {
    const [linkActive, setLinkActive] = useState(1);
    const [viewType, setViewType] = useState(1);
    const [selectStepShow, setSelectStepShow] = useState(false);
    const handleSelectStepToggle = () => setSelectStepShow(!selectStepShow);
    const [orderAsks, setOrderAsks] = useState<number[][]>([]);
    const [orderBids, setOrderBids] = useState<number[][]>([]);
    // const {tokenMarkPrice, tokenIndexPrice, flagStateLong, depth, setStepVal, stepVal} = props;
    const tokenName = "BTC";

    useEffect(() => {
        let [asks, bids] = separate(orders);
        asks = group(asks)
        // console.log("a", asks)
        asks = asks.sort((a: number[], b: number[]) => a[0] - b[0])


        asks = addTotalSums(asks)
        asks = addDepths(asks, getMaxTotalSum(asks)).reverse()
        setOrderAsks(asks);

        bids = group(bids)
        // console.log("a", asks)
        bids = bids.sort((a: number[], b: number[]) => a[0] - b[0]).reverse()


        bids = addTotalSums(bids)
        bids = addDepths(bids, getMaxTotalSum(bids))
        setOrderBids(bids);
        // console.log(asks)
    }, [orders])
    return (
        <div className="token_orders">
            <div className="token_orders_title">
                <div className="token_orders_title_btns">
                    <div onClick={()=>{setLinkActive(1)}} className={linkActive == 1 ? "token_orders_title_btn token_orders_title_btn_active" : "token_orders_title_btn"}>
                        Книга ордеров
                    </div>
                    {/*<div onClick={()=>{setLinkActive(2)}} className={linkActive == 2 ? "token_orders_title_btn token_orders_title_btn_active" : "token_orders_title_btn"}>*/}
                    {/*    Сделки*/}
                    {/*</div>*/}
                </div>

            </div>
            <div className="token_orders_view_types">
                {/*<div className="token_orders_view_count_w">*/}
                {/*    <div onClick={handleSelectStepToggle} className="token_orders_view_count border_gradient">*/}
                {/*        <span>{stepVal}</span>*/}
                {/*        <img src="img/select2.svg" alt=""/>*/}
                {/*    </div>*/}
                {/*    <div onClick={handleSelectStepToggle} className={selectStepShow ? "token_orders_view_count_list " : "token_orders_view_count_list hidden"}>*/}
                {/*        <div className="token_orders_view_count_list_item" onClick={() => setStepVal("1")}>*/}
                {/*            1*/}
                {/*        </div>*/}
                {/*        <div className="token_orders_view_count_list_item" onClick={() => setStepVal("10")}>*/}
                {/*            10*/}
                {/*        </div>*/}
                {/*        <div className="token_orders_view_count_list_item" onClick={() => setStepVal("50")} >*/}
                {/*            50*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="token_orders_sell">
                <div className="token_orders_sell_title">
                    <div className="token_orders_sell_title_price">
                        Цена({token2})
                    </div>
                    <div className="token_orders_sell_title_quantity">
                        Размер({token1})
                    </div>
                    <div className="token_orders_sell_title_total">
                        Сумма({token2})
                    </div>
                </div>
                <div className="token_orders_sell_main">
                    { orderAsks.map((order) => <div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 1) ' + (100 - order[3]) + '%, rgba(69,41,44, 1) 1%)'}} className="row">
                        <div className="token_orders_sell_price">
                            {order[0]}
                        </ div>

                        <div className="token_orders_sell_quantity">
                            {order[1]}
                        </div>
                        <div className="token_orders_sell_total">
                            {order[2]}
                        </div>
                    </div>
                    )
                    }



                </div>
            </div>
            <div className="token_orders_price">
                <div className="token_orders_price_actual">


                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <span className='buy_price'>{lastPrice}</span>
                        <img src="img/order_up.svg" alt=""/>
                    </div>
                </div>
                <div className="token_orders_price_for_sell">
                    <img src="img/order_flag.svg" alt=""/>
                    <span>{markPrice}</span>
                </div>
            </div>
            <div className="token_orders_buy_main">



                {/*/!* <div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 7%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28,493.60*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
                { orderBids.map((order) => <div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) ' + (100 - order[3]) + '%, rgba(30,63,50, 1) 1%)'}} className="row">
                        <div className="token_orders_buy_price">
                            {order[0]}
                        </ div>

                        <div className="token_orders_buy_quantity">
                            {order[1]}
                        </div>
                        <div className="token_orders_buy_total">
                            {order[2]}
                        </div>
                    </div>
                )
                }
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 64%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 53%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 45%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 67%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 31%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 47%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div style={{background: 'linear-gradient(90deg, rgba(28,30,34, 0.01) 21%, rgba(30,63,50, 1) 1%)'}} className="row">*/}
            {/*    <div className="token_orders_buy_price">*/}
            {/*        28*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_quantity">*/}
            {/*        0.355*/}
            {/*    </div>*/}
            {/*    <div className="token_orders_buy_total">*/}
            {/*        7.815*/}
            {/*    </div>*/}
            {/*</div>*/}

                </div>
        </div>
    );
};

export default OrderFlow;