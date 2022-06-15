import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const adminLogin = () => {
        if (username === "admin" && password === "123456") {
            navigate("/admin/home");
        }
        else {
            alert("Invalid Login Credentials");
        }
    }

    return (
        <div className="container vh-100">
            <div className="d-flex justify-content-center">
                <div class="card w-25 my-5">
                    <div class="card-header">
                        <h5>Admin Login</h5>
                    </div>
                    <div class="card-body">
                        <input type="text" placeholder="Username" className="form-control mb-3" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" className="btn btn-primary" onClick={adminLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;