import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");


  useEffect(() => {

  const token = localStorage.getItem("token");

  if (!token) {

    navigate("/login");
    return;

  }

  // Decode token
  const payload = JSON.parse(
    atob(token.split(".")[1])
  );

  // Allow ONLY user role
  if (payload.role !== "user") {

    navigate("/admin-dashboard");
    return;

  }

  // Call user dashboard API
  axios.get(
    "http://localhost:5000/dashboard",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  .then((response) => {

    setMessage(response.data.message);
    setUserEmail(response.data.user.email);

  })

  .catch(() => {

    localStorage.removeItem("token");
    navigate("/login");

  });

}, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };



  return (

  <div>

    <h2>User Dashboard</h2>

    <p>{message}</p>

    <p>Logged in as: {userEmail}</p>

    <h3>User Features</h3>

    <button>
      View Profile
    </button>

    <button>
      Update Settings
    </button>

    <br /><br />

    <button onClick={handleLogout}>
      Logout
    </button>

  </div>

);

}

export default Dashboard;