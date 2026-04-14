import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

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

  // Check role
  if (payload.role !== "admin") {

    navigate("/dashboard");
    return;

  }

  // Call admin API
  axios.get(
    "http://localhost:5000/admin",
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

    <h2>Admin Dashboard</h2>

    <p>{message}</p>

    <p>Logged in as: {userEmail}</p>

    <h3>Admin Controls</h3>

    <button>
      Manage Users
    </button>

    <button>
      View Reports
    </button>

    <br /><br />

    <button onClick={handleLogout}>
      Logout
    </button>

  </div>

);

}

export default AdminDashboard;