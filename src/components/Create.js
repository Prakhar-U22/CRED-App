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
      const response = await fetch("https://cred-backend.onrender.com/create", {
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
        }, 1000); // Wait for 1 second before navigating to /allpost
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
    <div className='container my-5'>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <h4 className='text-white'>Enter Data here<hr /></h4>
        
      </div>
      <form onSubmit={handleOnClick} className='bg-white p-4 rounded shadow'>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}
