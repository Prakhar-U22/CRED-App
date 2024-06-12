import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(""); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Fetched user data", result);
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      setError("Failed to fetch user data");
    }
  };

  // useEffect(() => {
    getSingleUserData();
  // }, []); 

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, age }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Updated user", result);
        setSuccess("User updated successfully");
      } else {
        setError("Failed to update user");
      }
    } catch (error) {
      setError("Failed to update user");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 2000);
  };

  return (
    <div className='container m-5 bg-white p-4 rounded'>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center align-items-center">
        <h4>Edit Data here<hr/></h4>
        
      </div>
      <form className='container' onSubmit={handleEdit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">Name</label>
          <input
            placeholder="Enter your name"
            type="text"
            className="form-control"
            id="exampleInputName1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAge1" className="form-label">Age</label>
          <input
            placeholder="Enter your age"
            type="number"
            className="form-control"
            id="exampleInputAge1"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
