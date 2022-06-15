import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import MenteeSideNav from '../../components/MenteeSideNav';
import MenteeInfo from './MenteeInfo';
import MentorSearch from './MentorSearch';
import MentorList from './MentorList';
import Feedback from './Feedback';
import MenteeChat from './MenteeChat';

function Mentee() {
    return (
        <div className="row g-0">
            <div className="col-2 vh-100 side-navigation">
                <MenteeSideNav />
            </div>
            <div className="col-10 vh-100 main-container">
                <div className="row g-0">
                    <div className="col-12">
                        <HomeNavbar />
                    </div>
                    <div className="col-12">
                        <Routes>
                            <Route path="/" element={<MentorSearch />} />
                            <Route path="/mentor" element={<MentorList />} />
                            <Route path="/feedback" element={<Feedback />} />
                            <Route path="/chat" element={<MenteeChat />} />
                            <Route path="/details" element={<MenteeInfo />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mentee;