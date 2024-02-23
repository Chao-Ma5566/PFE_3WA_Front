import {useState,useContext, useEffect} from "react"
import axios from "axios"
import { StoreContext } from "../tools/context.js"
import { NavLink, Navigate } from "react-router-dom"
    
   

const Logout = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [isChangePage, setIsChangePage] = useState(false)
    
    const handleLogout = () =>{
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({ type: "LOGOUT" })
        window.setTimeout(()=>{
           setIsChangePage(true) 
        }, 3000)
    }
    
    useEffect(handleLogout, [])
    
    return(
        <div>
            {isChangePage && <Navigate to="/" replace={true} />}
            <p>Vous avez réussi. Retourne vers le Home Page dans 2 seconds</p>
            <NavLink to="/">
                    Vous pouvez cliquer ici pour retourner tout de suite.
            </NavLink>
        </div>  
    )
}

export default Logout


