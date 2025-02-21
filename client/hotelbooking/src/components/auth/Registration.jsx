import { useState } from "react";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import "../../Registration.css"

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Registration error: ${error.message}`);
    }
    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="registration-page"> {/* Add a unique class here */}
      <div className="registration-card">
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        {successMessage && (
          <p className="alert alert-success">{successMessage}</p>
        )}
        <h2>Create an Account</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={registration.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={registration.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={registration.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={registration.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-register">
              Register
            </button>
          </div>
          <div className="mt-3 text-center">
            <span>
              Already have an account?{" "}
              <Link className="text-primary fw-bold" to="/login">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
