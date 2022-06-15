import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function User() {

    const [mentorList, setMentorList] = useState([]);
    const [menteeList, setMenteeList] = useState([]);

    useEffect(() => {
        getAllMentor()
    }, []);

    useEffect(() => {
        getAllMentee()
    }, []);

    const getAllMentor = () => {
        Axios.get("http://127.0.0.1:3001/allmentor")
            .then((response) => {
                setMentorList(response.data)
            });
    }

    const changeMentorStatus = (id, status) => {
        Axios.post("http://127.0.0.1:3001/changementorstatus", {
            id: id,
            status: status,
        }).then((response) => {
            getAllMentor()
        });
    }

    const getAllMentee = () => {
        Axios.get("http://127.0.0.1:3001/allmentee")
            .then((response) => {
                setMenteeList(response.data)
            });
    }

    const changeMenteeStatus = (id, status) => {
        Axios.post("http://127.0.0.1:3001/changementeestatus", {
            id: id,
            status: status,
        }).then((response) => {
            getAllMentee()
        });
    }

    return (
        <div className="container">
            <h3 className="my-5">Mentor List</h3>
            <table className="table table-striped mb-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th>Company</th>
                        <th>Aadhar Card</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        mentorList.map((data, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.age}</td>
                                    <td>{data.skill}</td>
                                    <td><a href={"http://127.0.0.1:3001/cards/" + data.aadhar_card} className="links">Download</a></td>
                                    <td>
                                        {
                                            data.status ? <button type="button" className="btn btn-warning" onClick={() => changeMentorStatus(data._id, "0")}>Deactivate</button> : <button type="button" className="btn btn-success" onClick={() => changeMentorStatus(data._id, "1")}>Activate</button>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <h3 className="mb-5">Mentee List</h3>
            <table className="table table-striped mb-5">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th>Semester</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        menteeList.map((data, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                    <td>{data.age}</td>
                                    <td>{data.class}</td>
                                    <td>
                                        {
                                            data.status ? <button type="button" className="btn btn-warning" onClick={() => changeMenteeStatus(data._id, "0")}>Deactivate</button> : <button type="button" className="btn btn-success" onClick={() => changeMenteeStatus(data._id, "1")}>Activate</button>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default User;