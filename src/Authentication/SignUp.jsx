import { useEffect, useState } from "react";
import "./SignUp.css";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h1 className="heading">Register</h1>
      <form onSubmit={handleOnFormSubmit} className="signup-form">
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => {
            handleOnChange(e);
          }}
        />
        <div className="btn-submit">
          <button className="form-submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
