import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [userdetails, setuserdetails] = useState({ email: "", password: "" })
    let navigate = useNavigate()
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ email: userdetails.email, password: userdetails.password }));
        const response = await fetch("http://localhost:5000/api/loginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: userdetails.email, password: userdetails.password })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("*please provide proper details")
        }
        if (json.success) {
            localStorage.setItem("authToken", json.authToken)
            navigate("/");
        }
    }

    const onChangeDetails = (event) => {
        setuserdetails({ ...userdetails, [event.target.name]: event.target.value });

    }

    return (
        <>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={userdetails.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeDetails} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={userdetails.password} id="exampleInputPassword1" onChange={onChangeDetails} />
                    </div>

                    <button type="submit" className="btn btn-success mx-2">Submit</button>
                    <Link to="/createUser" className="btn btn-danger">New User</Link>
                </form>
            </div>
        </>
    )
}

export default Login
