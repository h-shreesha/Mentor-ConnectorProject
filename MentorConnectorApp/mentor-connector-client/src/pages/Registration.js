import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';

function Registration() {

    const [autoGenOtp, setAutoGenOtp] = useState(Math.floor(1000 + Math.random() * 9999));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [type, setType] = useState("0");
    const [otp, setOtp] = useState("");

    var isValid = true;
    const [alertMsg, setAlertMsg] = useState("");

    const makeValidation = () => {
        if (name === "") {
            isValid = false;
            setAlertMsg("Name is required");
        }
        else if (!/.+@.+\.[A-Za-z]+$/.test(email)) {
            isValid = false;
            setAlertMsg("Invalid Email Address");
        }
        else if (phone.length < 10) {
            isValid = false;
            setAlertMsg("Invalid Phone Number");
        }
        else if (parseInt(otp) !== parseInt(autoGenOtp)) {
            isValid = false;
            setAlertMsg("Enter Valid OTP");
        }
        else if (password === "") {
            isValid = false;
            setAlertMsg("Password is required");
        }
        else if (password !== cpassword) {
            isValid = false;
            setAlertMsg("Password not Matching");
        }
        else {
            isValid = true;
        }
    }

    const createAccount = () => {
        makeValidation();
        if (isValid) {
            Axios.post('http://127.0.0.1:3001/register', {
                name: name,
                email: email,
                phone: phone,
                password: password,
                type: type,
            }).then((response) => {
                alert("Your Details are sent to Admin for Verify, Check your Email for Update");
            });
        }
    }

    const sendOTP = () => {
        if (phone === "") {
            setAlertMsg("Invalid Phone Number");
        }
        else {
            var My_otp = Math.floor(1000 + Math.random() * 9999)
            setAutoGenOtp(My_otp);
            console.log(My_otp)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="d-flex justify-content-center my-5">
                    <div className="card w-50">
                        <div className="card-header bg-danger">
                            <h5 className="text-light">Create New Account</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {alertMsg ? <div className="col-12"><div className="alert alert-danger alert-msg-cst" role="alert">
                                    {alertMsg}
                                </div> </div> : ''}
                                <div className="col-12">
                                    <label className="mb-2">Full Name</label>
                                    <input type="text" className="form-control mb-3" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label className="mb-2">Email Address</label>
                                    <input type="email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-9">
                                    <label className="mb-2">Contact Number</label>
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="col-3 text-center mt-auto">
                                    <button type="button" className="btn btn-warning" onClick={sendOTP}>Send OTP</button>
                                </div>
                                <div className="col-12">
                                    <label className="mb-2">OTP</label>
                                    <input type="number" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Pasword</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Conform Pasword</label>
                                    <input type="password" className="form-control" value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label className="mb-2">Account Type</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                                        <option value="0">Mentor Account</option>
                                        <option value="1">Mentee Account</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-danger" onClick={createAccount}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration;