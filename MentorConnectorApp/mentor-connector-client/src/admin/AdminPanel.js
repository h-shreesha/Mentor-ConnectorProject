import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import User from './User';

function AdminPanel() {
    return (
        <>
            <HomeNavbar />
            <Routes>
                <Route path="/" element={<User />} />
                {/* <Route path="/products" element={<ManageProduct />} />
                <Route path="/feedbacks" element={<AdminFeedback />} />
                <Route path="/staffs" element={<ManageStaff />} /> */}
            </Routes>
        </>
    );
}

export default AdminPanel;