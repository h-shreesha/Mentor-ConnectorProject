import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Feedback() {

    const [mentorList, setMentorList] = useState([]);
    const [mentor, setMentor] = useState("");
    const [message, setMessage] = useState("");

    const [rate, setRate] = useState("1");

    const getMyRequets = () => {
        Axios.post("http://127.0.0.1:3001/getmentorlist", {
            mentee: sessionStorage.getItem("ID"),
        }).then((response) => {
            setMentorList(response.data)
        });
    }

    useEffect(() => {
        getMyRequets();
    }, []);

    let isValid = true;

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const makeValidation = () => {
        setSuccessMsg("");
        if (mentor === "") {
            isValid = false;
            setErrorMsg("Select Mentor");
        }
        else if (message === "") {
            isValid = false;
            setErrorMsg("Message is required");
        }
        else {
            isValid = true;
            setErrorMsg("");
        }
    }

    const saveFeedback = () => {
        makeValidation();
        if (isValid) {
            Axios.post('http://127.0.0.1:3001/addfeedback', {
                mentee: sessionStorage.getItem("ID"),
                mentor: mentor,
                message: message,
                rating: rate
            }).then((response) => {
                setSuccessMsg("Uploaded Successfully");
            });
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card w-75 m-5">
                <div className="card-body">
                    <div className="row g-4">
                        <div className="col-12">
                            <h4 className="card-title-md">Send Feedback</h4>
                        </div>
                        {
                            errorMsg ? <div className="col-12">
                                <div class="alert alert-danger alert-msg-cst" role="alert">
                                    {errorMsg}
                                </div>
                            </div> : ''
                        }

                        {
                            successMsg ? <div className="col-12">
                                <div class="alert alert-success alert-msg-cst" role="alert">
                                    {successMsg}
                                </div>
                            </div> : ''
                        }
                        <div className="col-6">
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setMentor(e.target.value)}>
                                <option value="" selected>Select Mentor</option>
                                {
                                    mentorList.map((data, key) => {
                                        return (
                                            <option value={data.mentor_info._id}>{data.mentor_info.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-6 text-center">
                            <span className="rating-star me-2" onClick={() => setRate(1)}>1</span>
                            <span className="rating-star mx-2" onClick={() => setRate(2)}>2</span>
                            <span className="rating-star mx-2" onClick={() => setRate(3)}>3</span>
                            <span className="rating-star mx-2" onClick={() => setRate(4)}>4</span>
                            <span className="rating-star ms-2" onClick={() => setRate(5)}>5</span>
                        </div>
                        <div className="col-12">
                            <textarea className="form-control" rows="6" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message"></textarea>
                        </div>
                        <div className="col-12">
                            <button type="button" className="card-btn" onClick={saveFeedback}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;