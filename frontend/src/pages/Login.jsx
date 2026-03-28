import React from 'react'
import "./auth.form.scss"
import { useState , useContext } from 'react'
import { useNavigate } from 'react-router'//self-navigate after login
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AuthContext } from '../auth.context'
import { Navigate } from 'react-router'

function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const {loading,handleLogin} = useAuth()
    const { user } = useContext(AuthContext);
    if(user){
        return <Navigate to="/" replace />
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await handleLogin({email,password});
            navigate('/');
        }catch(err){
            alert("Login failed! Please check your credentials")
        }
    }
    if(loading){
        return <main><h1>Authentication Please wait</h1></main>
    }
  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id='email'placeholder='Enter email addresss' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id='password'placeholder='Enter Password' />
                </div>
                <button className='button primary-button'>Login</button>
            </form>
            <p>Don't have an account ?<Link to ={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login