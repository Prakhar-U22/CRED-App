import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Read() {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      let response = await fetch('https://cred-backend.onrender.com', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json();
      if (response.ok) {
        setData(jsonData);
      } else {
        console.error("Failed to fetch data", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`https://cred-backend.onrender.com/${_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove the deleted item from state
        setData(data.filter(item => item._id !== _id));
      } else {
        console.error("Failed to delete data", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete data", error);
    }
  }

  return (
    <div className="container m-5">
      <div className="row">
        {data.map((ele) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-3" key={ele._id}>
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary"><b>Email</b> - {ele.email}</h6>
                <h6 className="card-subtitle mb-2 text-body-secondary"><b>Age</b> - {ele.age}</h6>
                <p className="card-text">Card's content.</p>
                <Link to="#" className="card-link" onClick={() => handleDelete(ele._id)}>Delete</Link>
                <Link to={`/${ele._id}`} className="card-link">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
