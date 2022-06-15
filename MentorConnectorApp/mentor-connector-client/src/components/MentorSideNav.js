import React from 'react';
import { NavLink } from 'react-router-dom';

function MentorSideNav() {
    return (
        <div className="row g-0">
            <div className="col-12 side-nav-img"></div>
            <div className="col-12">
                <div className="row g-0">
                    <NavLink to="/mentor" className="col-12 navigation-menu px-5 py-4">
                        Home
                    </NavLink>
                    <NavLink to="/mentor/mentee" className="col-12 navigation-menu px-5 py-4">
                        Mentee List
                    </NavLink>
                    <NavLink to="/mentor/chat" className="col-12 navigation-menu px-5 py-4">
                        Guide
                    </NavLink>
                    <NavLink to="/mentor/feedback" className="col-12 navigation-menu px-5 py-4">
                        Feedback
                    </NavLink>
                    <NavLink to="/mentor/details" className="col-12 navigation-menu px-5 py-4">
                        Profile
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default MentorSideNav;