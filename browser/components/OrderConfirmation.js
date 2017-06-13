import React, { Component } from 'react';
import OrderHistory from './OrderHistory';

export default function({mostRecentOrder}){
    return(
        <div>
            <h1>Congrats you submitted an Order!</h1>
            <OrderHistory cartHistory={mostRecentOrder} />
        </div>
    )
}