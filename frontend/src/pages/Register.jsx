import React ,{useState} from 'react'
import "./auth.form.scss"
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AuthContext } from '../auth.context'
import { Navigate } from 'react-router'
import { useContext } from 'react'
function Register() {
    const navigate=useNavigate()
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [mobileNo, setmobileNo] = useState(null)
    const [password, setpassword] = useState("")
    const {loading,handleRegister}=useAuth()
    const {user} = useContext(AuthContext)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await handleRegister({username,email,mobileNo,password})
        navigate("/")
    }
    if(user){
        return <Navigate to="/" replace />
    }
        if(loading){
        return <main><h1>Authenticating please wait! ...</h1></main>
    }
   return (
     <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                    onChange={(e)=>{setusername(e.target.value)}}
                    type="text"  id='username' placeholder='Enter Username'/>
                    
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                     onChange={(e)=>{setemail(e.target.value)}}
                    type="email"  id='email' placeholder='Enter email address'/>
                    
                </div> 
               <div className="input-group">
                <label htmlFor="mobileNo">Mobile Number</label>
                <input
                type="tel"
                id="mobileNo"
                placeholder="Enter Mobile No"
                onChange={(e) => setmobileNo(e.target.value)}
                />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                     onChange={(e)=>{setpassword(e.target.value)}}
                    type="password"  id='password' placeholder='Enter Password'/>
                </div>
                <button className="button primary-button">Register</button>
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
     </main>
   )
 
}

export default Register