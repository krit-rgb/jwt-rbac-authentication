import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

     <Routes>

  <Route path="/" element={<Login />} />

  <Route path="/login" element={<Login />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute role="user">
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

</Routes>
    </BrowserRouter>

  );

}

export default App;