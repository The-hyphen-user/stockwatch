import React from 'react'
import { useNavigate } from "react-router-dom";

export const Logout = () => {

    
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token')
    navigate("/login", { replace: true });
    }
  return (
    <div>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
