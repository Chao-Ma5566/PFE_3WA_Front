import {useState,useContext} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import { StoreContext } from "../tools/context.js"
import {lengthLimit, checkVide} from "../tools/inputCheck.js"
import { NavLink, Navigate } from "react-router-dom"
    
   

const Login = () => {
    const [state, dispatch] = useContext(StoreContext);
    const initialState = {email:'',password:''}
    const [info, setInfo] = useState(initialState)
    const [messageErr, setMessageErr] = useState("")
    
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(e.target.value)){
            setMessageErr("tous les infos sont limit à 250 caractaires") 
            return
        }
        const {name,value} = e.target
        setInfo({...info, [name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if(!checkVide(info)){
            setMessageErr("Champ obligatoire vide") 
            return
        }
        axios.post(`${BASE_URL}/login`,{password:info.password, email:info.email})
            .then(res => {
                if(res.data.response.response) {
                    console.log(res)
                    dispatch({ type: "LOGIN", payload: res.data.response.response})
                    dispatch({type:"GET_CART_ITEMS", payload:res.data.cart})
                    dispatch({type:"PRODUCTLIST", payload:res.data.products})
                    localStorage.setItem('jwtToken', res.data.response.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                    setInfo(initialState)
                }
            })
            .catch(err => {
                if(err.response.status === 500){
                    console.clear()
                }
                setMessageErr(err.response.data.response.response)
                console.log(err)
            })
    }
    return(
        <div className="h-screen bg-gradient-to-t from-green-500 to-yellow flex bg-contain flex-col justify-between gap-2 lg:flex-row lg:items-center lg:justify-between">
        {state.isLogged ? 
            (state.user.admin ? 
               <Navigate to="/admin" replace={true} /> 
             : <Navigate to="/" replace={true} />)
        : null}
            
            <form className="p-8 mt-12 flex-1 bg-neutral-50 shadow m-4 rounded-lg lg:w-48 lg:h-80 lg:mt-0" onSubmit={submit}>
                <h5 className="text-xl mb-10">Déjà client?</h5>
                <input className="mb-2 max-w-64" type='text' name='email' value={info.email} onChange={handleChange} placeholder='email' />
                <input className="mb-8 max-w-64" type='password' name='password' value={info.password} onChange={handleChange} placeholder='password' />
                <button className="bg-green-500 px-4 py-2 rounded text-white" type="submit">Me Connecter</button>
                {(messageErr && messageErr.length > 0) && <p className="mt-2 bg-primary rounded px-4 py-1">{messageErr}</p>}
            
            </form>
            <div className="p-8 flex-1 bg-neutral-50 shadow mx-4 mb-4 rounded-lg lg:w-48 lg:h-80">
                <h5 className="text-xl mb-10">Nouveau client?</h5>
                <p className="mb-12">Créez un compte pour suivre et gérer vos commandes, retrouver toutes vos informations personnelles et vos articles favoris.</p>
                <NavLink className="bg-green-500 px-4 py-2 rounded text-white hover:bg-gray-700" to="/register">
                     S'enregistrer
                </NavLink>
            </div>    
        </div>
    )
}

export default Login


