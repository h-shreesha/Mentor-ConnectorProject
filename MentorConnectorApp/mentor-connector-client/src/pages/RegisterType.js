import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RegisterType() {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row g-4 my-5">
                    <div className="col-12 title-sm text-center">
                        <h3>Choose Account Type</h3>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <Link to="/mentorregister" className="btn btn-primary me-1">Mentor</Link>
                        <Link to="/menteeregister" className="btn btn-primary ms-1">Mentee</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterType;