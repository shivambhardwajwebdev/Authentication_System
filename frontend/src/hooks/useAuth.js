import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login,register,logout,getMe } from "../services/auth.api";
export const useAuth=()=>{
    const context = useContext(AuthContext)
    const {user,setUser,loading, setLoading}=context
    const handleLogin = async({email,password})=>{
        setLoading(true)
        try{
            const data = await login({email,password})
            setUser(data.user)
        }catch(err){
            console.error("login failed in hook",err);
            throw err;
        }finally{
            setLoading(false)
        }
    }
    const handleRegister = async ({username,email,mobileNo,password})=>{
        setLoading(true)
        try{
            const data = await register({username,email,mobileNo,password})
            setUser(data.user)

        }catch(err){throw err}
        finally{
            setLoading(false)
        }
    }
    const handlelogout = async () =>{
        setLoading(true)
        try{
            const data = await logout()
            setUser(null)
        }catch(err){
            throw err
        }finally{
            setLoading(false)
        }
    }
    return {user,loading,handleLogin,handleRegister,handlelogout}
}
