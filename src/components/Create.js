import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const handleOnClick = async (e) => {
    e.preventDefault();
    try {
      const addUser = { name, email, age };
      const response = await fetch("http://localhost:5000/create", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (json.success) {
        console.log(json);
        setError("");
        setSuccess("User Successfully added.");
        setName("");
        setEmail("");
        setAge("");
        setTimeout(() => {
          navigate('/allpost');
        }, 1000); // Wait for 1 seconds before navigating to home
      } else {
        console.log(json);
        setError("Failed to add user. Please try again later.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Failed to add user", error);
      setError("Failed to add user. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className='container m-5 bg-white p-4 rounded'>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center align-items-center">
        <h4>Enter Data here<hr/></h4>
      </div>
      <form className='container' onSubmit={handleOnClick}>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">Name</label>
          <input
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
