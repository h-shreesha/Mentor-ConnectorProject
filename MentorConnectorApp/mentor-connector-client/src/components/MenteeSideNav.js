import React from 'react';
import { NavLink } from 'react-router-dom';

function MenteeSideNav() {
    return (
        <div className="row g-0">
            <div className="col-12 side-nav-img"></div>
            <div className="col-12">
                <div className="row g-0">
                    <NavLink to="/mentee" className="col-12 navigation-menu px-5 py-4">
                        Mentor Search
                    </NavLink>
                    <NavLink to="/mentee/mentor" className="col-12 navigation-menu px-5 py-4">
                        Mentor List
                    </NavLink>
                    <NavLink to="/mentee/chat" className="col-12 navigation-menu px-5 py-4">
                        Ask doubt
                    </NavLink>
                    <NavLink to="/mentee/feedback" className="col-12 navigation-menu px-5 py-4">
                        Send Feedback
                    </NavLink>
                    <NavLink to="/mentee/details" className="col-12 navigation-menu px-5 py-4">
                        Profile
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default MenteeSideNav;