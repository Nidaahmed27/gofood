import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [userdetails, setuserdetails] = useState({ name: "", email: "", password: "", location: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ name: userdetails.name, email: userdetails.email, password: userdetails.password, location: userdetails.location }));
        const response = await fetch("http://localhost:5000/api/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name: userdetails.name, email: userdetails.email, password: userdetails.password, location: userdetails.location })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("*please provide proper details")
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={userdetails.name} onChange={onChangeDetails} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={userdetails.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeDetails} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={userdetails.password} id="exampleInputPassword1" onChange={onChangeDetails} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address</label>
                        <input type="text" className="form-control" name="location" value={userdetails.location} onChange={onChangeDetails} />

                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className="btn btn-danger">already a user</Link>
                </form>
            </div>
        </>
    );
}

export default Signup;
