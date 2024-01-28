import { useEffect, useState } from "react";
import "./SignUp.css";
import { supabase } from "../supabase/supabaseClient";
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

  const handleOnFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      if (error) {
        alert(error);
      }
      if (data) {
        alert("Check your email inbox and verify :)");
      }
    } catch (error) {
      console.log(error);
    }
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
