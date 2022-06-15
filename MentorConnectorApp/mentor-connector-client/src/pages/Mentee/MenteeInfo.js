import React, { useState } from 'react';
import Axios from 'axios';

function MenteeInfo() {

    const [age, setAge] = useState("");
    const [classField, setClassField] = useState("1");

    let isValid = true;

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const makeValidation = () => {
        setSuccessMsg("");
        if (age === "") {
            isValid = false;
            setErrorMsg("Age is required");
        }
        else {
            isValid = true;
            setErrorMsg("");
        }
    }

    const saveMenteeInfo = () => {
        makeValidation();
        if (isValid) {
            Axios.post('http://127.0.0.1:3001/savementeeinfo', {
                user: sessionStorage.getItem("ID"),
                age: age,
                classField: classField,
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
                            <h4 className="card-title-md">Upload Details</h4>
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
                            <label className="mb-2">Age</label>
                            <input type="number" min="1" max="100" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <label className="mb-2">Class</label>
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setClassField(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                {/* <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option> */}
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="button" className="card-btn" onClick={saveMenteeInfo}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenteeInfo;