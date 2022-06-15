import React, { useState } from 'react';
import Axios from 'axios';

function MentorInfo() {

    const [age, setAge] = useState("");
    const [Company, setCompany] = useState("Infosys");

    let isValid = true;

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [certFile, setCertFile] = useState();
    const [certFileName, setCertFileName] = useState("");

    const makeValidation = () => {
        setSuccessMsg("");
        if (age === "") {
            isValid = false;
            setErrorMsg("Age is required");
        }
        else if (certFileName === "") {
            isValid = false;
            setErrorMsg("Upload Certificate");
        }
        else {
            isValid = true;
            setErrorMsg("");
        }
    }

    const savecertFile = (e) => {
        setCertFile(e.target.files[0]);
        setCertFileName(e.target.files[0].name);
    };

    const saveMentorInfo = () => {
        makeValidation();
        if (isValid) {
            const formData = new FormData();
            formData.append("user", sessionStorage.getItem("ID"));
            formData.append("age", age);
            formData.append("Company", Company);
            formData.append("certFile", certFile);
            formData.append("certFileName", certFileName);

            Axios.post('http://127.0.0.1:3001/savementorinfo', formData
            ).then((response) => {
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
                            <label className="mb-2">Company</label>
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setCompany(e.target.value)}>
                                <option value="Infosys">Infosys</option>
                                <option value="Tcs">Tcs</option>
                                <option value="Visionet">Visionet</option>
                                <option value="Mphasis">Mphasis</option>
                                <option value="SLK">SLK</option>
                                <option value="Evry">Evry</option>
                                <option value="Robosoft">Robosoft</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="mb-2">Upload Certificate</label>
                            <input type="file" accept=".pdf" className="form-control" onChange={savecertFile} />
                        </div>
                        <div className="col-12">
                            <button type="button" className="card-btn" onClick={saveMentorInfo}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MentorInfo;