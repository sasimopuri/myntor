import "./SignUp.css";
const SignUp = () => {
  return (
    <div className="form-container">
      <h1 className="heading">Register</h1>
      <form action="" className="signup-form">
        <label htmlFor="first_name">First Name :</label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Last Name :</label>
        <input type="text" name="last_name" id="last_name" />
        <label htmlFor="password">Password :</label>
        <input type="text" name="password" id="password" />
        <div className="btn-submit">
          <div className="form-submit">Submit</div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
