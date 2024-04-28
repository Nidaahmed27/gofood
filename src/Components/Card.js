import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './CartContext';

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");

    const priceRef = useRef()
    // console.log(dispatch);
    // console.log(data);



    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.filteritems._id) {
                food = item;

                break;
            }
        }


        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.filteritems._id, price: finalPrice, quantity: quantity })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.filteritems._id, name: props.filteritems.name, price: finalPrice, image: props.filteritems.image, quantity: quantity, size: size });
                // console.log(data);
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.filteritems._id, name: props.filteritems.name, price: finalPrice, image: props.filteritems.image, quantity: quantity, size: size });

    };

    let finalPrice = quantity * parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, []);

    return (
        <div>
            <div className="card" style={{ "width": "18rem" }}>
                <img className="card-img-top" src={props.filteritems.image} alt="food_image" style={{ height: "180px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.filteritems.name}</h5>
                    <p className="card-text">{props.filteritems.description}</p>
                    <div className='container w-100'>
                        <select className='m-2  h-100 bd-success rounded' onChange={(e) => setQuantity(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i = 1} value={i + 1}>{i + 1}</option>
                                )
                            })}

                        </select>
                        <select className='m-2  h-100 ' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}

                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div>
                        <div className="btn bg-black text-white mx-1" to="/" onClick={handleAddToCart} >Add To Cart</div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Card
