import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

const Logout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    auth.handleLogout();

    // Show the popup message
    setShowPopup(true);

    // Hide the popup after 3 seconds and navigate to home
    setTimeout(() => {
      setShowPopup(false);
      navigate("/", { state: { message: "You have been logged out!" } });
    }, 3000);
  };

  return (
    <>
      {showPopup && (
        <div className="logout-popup">
          <p>You have been logged out successfully!</p>
        </div>
      )}
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
