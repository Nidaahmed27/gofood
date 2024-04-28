import React from 'react'

function Card(props) {
    let options = props.options;
    const priceOptions = Object.keys(options);
    return (
        <div>
            <div className="card" style={{ "width": "18rem" }}>
                <img className="card-img-top" src={props.image} alt="food_image" style={{ height: "180px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                    <div className='container w-100'>
                        <select className='m-2  h-100 bd-success rounded'>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i = 1} value={i + 1}>{i + 1}</option>
                                )
                            })}

                        </select>
                        <select className='m-2  h-100 '>
                            {priceOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}

                        </select>
                        <div className="d-inline h-100 fs-5">
                            Total Price
                        </div>
                    </div>
                    <hr />
                    <div>
                        <button className="btn bg-black text-white mx-1" to="/">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
