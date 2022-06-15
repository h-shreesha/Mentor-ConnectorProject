import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeNavbar() {

    const navigate = useNavigate();

    const doLogout = () => {
        if (window.confirm("Are you sure want to Logout?") === true) {
            navigate("/");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="navbar-brand ms-5">Mentor Connector</div>
                <button type="button" className="btn btn-light me-5" onClick={doLogout}>Logout</button>
            </div>
        </nav >
    );
}

export default HomeNavbar;