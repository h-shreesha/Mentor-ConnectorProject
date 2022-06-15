import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import MentorSideNav from '../../components/MentorSideNav';
import Feedbacks from './Feedbacks';
import MenteeList from './MenteeList';
import MenteeRequests from './MenteeRequests';
import MentorChat from './MentorChat';
import MentorInfo from './MentorInfo';

function Mentor() {
    return (
        <div className="row g-0">
            <div className="col-2 vh-100 side-navigation">
                <MentorSideNav />
            </div>
            <div className="col-10 vh-100 main-container">
                <div className="row g-0">
                    <div className="col-12">
                        <HomeNavbar />
                    </div>
                    <div className="col-12">
                        <Routes>
                            <Route path="/" element={<MenteeRequests />} />
                            <Route path="/mentee" element={<MenteeList />} />
                            <Route path="/chat" element={<MentorChat />} />
                            <Route path="/feedback" element={<Feedbacks />} />
                            <Route path="/details" element={<MentorInfo />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mentor;