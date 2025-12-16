import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = async(e)=>{
    e.preventDefault()
   let res = await axios.post(
  "http://localhost:3000/api/auth/logout",
  {}, 
  { withCredentials: true }
);
    console.log(res.data)
    if(res.data.success){
     navigate("/");
  window.location.reload();
    }
  }
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 25px",
        background: "#1e1e1e",
        color: "white",
        alignItems: "center",
      }}
    >
      <h2 style={{ margin: 0 }}>Parking App</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div onClick={handleLogout}
          style={{ color: "white", textDecoration: "none", fontSize: "18px", background:"red", padding:"4px 9px 4px 9px", borderRadius:"4px", cursor:"pointer"}}
        >
          Logout
        </div>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          Home
        </Link>

        <Link
          to="/parkingInform"
          style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
        >
          Parking Info
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
