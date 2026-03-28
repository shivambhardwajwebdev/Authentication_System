import React, { useContext } from 'react';
import { AuthContext } from "../auth.context";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import "./auth.form.scss"
function Home() {
  const { user, loading } = useContext(AuthContext);
  const {handlelogout} = useAuth();
  const navigate = useNavigate()

  if (loading) {
    return <h1>Loading...</h1>;
  }
 const userLogout = async(e)=>{
  e.preventDefault();
  try{
    await handlelogout()
    
  }catch(err){
    throw err
  }
 }
  return (
    <>
      <div className='heading' >Home Page</div>

      {user ? (
        <div className='Profile'>
          <h2>Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobileNo}</p>
          <button className='button' onClick={userLogout}>Logout</button>
        </div>
      ) : (
        <h2>No user logged in</h2>
      )}
    </>
  );
}

export default Home;