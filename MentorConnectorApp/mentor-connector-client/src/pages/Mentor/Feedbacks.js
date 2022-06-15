import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Feedbacks() {

    const [fedList, setFedList] = useState([]);

    const getMyFeedback = () => {
        Axios.post("http://127.0.0.1:3001/getfeedback", {
            mentor: sessionStorage.getItem("ID"),
        }).then((response) => {
            setFedList(response.data)
        });
    }

    useEffect(() => {
        getMyFeedback();
    }, []);

    return (
        <div className="row g-3 row-cols-3 m-3">
            {
                fedList.map((data, key) => {
                    return (
                        <div className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5>{data.mentee_info.name}</h5>
                                    <p>{data.mentee_info.email}</p>
                                    <p>{data.message}</p>
                                </div>
                                <div className="card-footer text-end">
                                    <i>
                                        {Array.from({ length: data.rating }, (_, i) =>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill text-warning me-1" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>)
                                        }
                                        {data.rating}
                                    </i>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Feedbacks;