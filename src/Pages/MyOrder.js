import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/MyOrder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('email')
                })
            });
            if (response.ok) {
                const data = await response.json();
                setOrderData(data.orderData || []);
            } else {
                console.error("Failed to fetch order data");
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                {orderData.map((ordersOnDate, index) => (
                    <div key={index} className='row'>
                        <div className='col-12'>
                            <h3>{ordersOnDate[0].order_date}</h3>
                        </div>
                        {ordersOnDate.map((order, orderIndex) => (
                            <div key={orderIndex} className='col-12 col-md-6 col-lg-3'>
                                <div className="card mt-3" style={{ width: "16rem" }}>
                                    <img src={order.image} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{order.name}</h5>
                                        <p className="card-text">Price: ₹{order.price}</p>
                                        <p className="card-text">Quantity: {order.quantity}</p>
                                        <p className="card-text">Size: {order.size}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
