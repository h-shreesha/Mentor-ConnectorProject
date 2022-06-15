import React, { useState } from "react";
import Axios from "axios";

function MentorSearch() {
  const [Company, setCompany] = useState("Infosys");
  const [mentorSearchList, setMentorSearchList] = useState([]);

  const searchMentor = () => {
    Axios.post("http://127.0.0.1:3001/searchmentor", {
      Company: Company,
    }).then((response) => {
      setMentorSearchList(response.data);
      console.log(response.data);
    });
  };

  const doRequest = (mentor) => {
    Axios.post("http://127.0.0.1:3001/dorequest", {
      mentor: mentor,
      mentee: sessionStorage.getItem("ID"),
      status: 0,
    }).then((response) => {
      alert("Request Sent");
    });
  };

  // const getRating = (mentor) => {
  //     Axios.post('http://127.0.0.1:3001/getrating', {
  //         mentor: mentor,
  //     }).then((response) => { console.log(response.data[0].n); return response.data[0].n }
  //     );
  // }

  return (
    <div className="row g-5 p-5">
      <div className="col-9">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="Infosys">Infosys</option>
          <option value="Tcs">Tcs</option>
          <option value="Visionet">Visionet</option>
          <option value="Mphasis">Mphasis</option>
          <option value="SLK">SLK</option>
          <option value="Evry">Evry</option>
          <option value="Robosoft">Robosoft</option>
        </select>
      </div>
      <div className="col-3">
        <input
          type="button"
          value="Search"
          className="form-control"
          onClick={searchMentor}
        />
      </div>
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mentorSearchList.map((data, key) => {
              return (
                <tr>
                  <td>{key + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.gender}</td>
                  <td>{data.age}</td>
                  <td>
                    <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-star-fill text-warning me-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      {data.rating}
                    </i>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => doRequest(data._id)}
                    >
                      Request
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MentorSearch;
