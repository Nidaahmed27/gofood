import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useCart } from './CartContext';
import Modal from '../Model';
import Cart from '../Pages/Cart';
function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2">
                    <li className="nav-item active">
                        <Link className="nav-link active fs-5" to="/">Home </Link>
                    </li>
                    {localStorage.getItem("authToken") ?
                        <li className="nav-item active">
                            <Link className="nav-link active fs-5" to="/MyOrder">My Orders </Link>
                        </li>
                        : ""
                    }
                </ul>
                {!localStorage.getItem("authToken") ?
                    <div className='d-flex '>
                        <Link className="btn bg-black text-white mx-1" to="/login">Login</Link>
                        <Link className="btn bg-black text-white mx-1" to="/createUser">Signup</Link>
                    </div>
                    : <div>
                        <div className="btn bg-black text-white mx-2" onClick={() => { setCartView(true) }}>
                            My Cart
                            <span className="badge bg-white text-black mx-2 ">{data.length}</span>
                        </div>
                        {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                        <div className="btn bg-black text-white mx-2" onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                }
            </div>
        </nav>

    )
}

export default Navbar
