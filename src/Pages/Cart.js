import React from 'react'
import deleteIcon from '../Assets/trash-solid.svg'
import { useDispatchCart, useCart } from '../Components/CartContext';
function Cart() {
    let dispatch = useDispatchCart();
    let data = useCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3 text-white'>Your Cart Is Empty!</div>
            </div>
        )

    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("email");
        const response = await fetch("http://localhost:5000/api/OrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                Order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log('order response:', response)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
            alert('Order placed successfully!');
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.quantity}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td className='d-flex justify-content-center align-items-center'><button type="button" className="btn p-0 ">
                                    <img src={deleteIcon} alt="delete icon" style={{ width: "20px", height: "30px" }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                </button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>

                <div>
                    <button className='btn bg-black text-white mt-2' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>

    )
}

export default Cart
