import Axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Forgotpassword() {

    const [email, setEmail] = useState("");

    const getPassword = () => {
        if (email === "") {
            alert("Invalid Email Address");
        }
        else {
            Axios.post('http://127.0.0.1:3001/getpassword', {
                email: email,
            }).then((response) => {
                alert(response.data);
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-center align-items-center flex-column my-5">
                    <h2>Find your account</h2>
                    <p>Enter your Email Address that is Linked to your Account</p>
                    <input type="email" className="form-control w-25 my-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="button" className="btn btn-primary btn-sm" onClick={getPassword}>Submit</button>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword;