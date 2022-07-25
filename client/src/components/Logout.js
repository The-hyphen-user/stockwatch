import React from "react";
import { useNavigate } from "react-router-dom";

// export const Logout = () => {
//   let navigate = useNavigate();

//   const logout = () => {
//     //if headers have token named token, delete it
//     if (localStorage.getItem("token")) {
//       localStorage.removeItem("token");
//     }
//     navigate("/");
//   };
//   return (
//     <div>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

//export default Logout;

const Logout = () => {
  
  let navigate = useNavigate();

  const logout = () => {
    //if headers have token named token, delete it
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    navigate("/");
  };
  return (
    <div>
      <button onClick={logout} className='btn'>Logout</button>
    </div>
  )
}

export default Logout