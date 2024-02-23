import axios from "axios"
import {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom";
import {BASE_URL} from "../tools/constante.js"
import { NavLink, Navigate } from "react-router-dom"
import ConfirmationWindow from "./ConfirmationWindow.jsx"
import {StoreContext} from "../tools/context.js"

const Profil = (props) => {
    const { userId } = useParams();
    const [state, dispatch] = useContext(StoreContext);
    const [userInfo, setUserInfo] = useState(null)
    const [isSure, setIsSure] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getUserById`, { id: userId })
            .catch(err => console.log(err))
            .then(res => setUserInfo(res.data.data[0]))
            .then(res => setIsLoading(false))
    }, [userId])
    
    const reformeDate = (data) =>{
        const date = new Date(data);
        const formattedDate = date.toLocaleDateString("fr-CA");
        return formattedDate
    }
    const handleDelete = () =>{
        axios.post(`${BASE_URL}/admin/deleteUser`,{id:userId})
        .then(res=>{
                if(res.data.data.affectedRows > 0){
                    setIsDelete(true)
                }
            })
    }
    
    const handleCheck = () =>{
        setIsSure(!isSure)
    }
    
    if(isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-t from-green-500 to-yellow px-4 pt-20">
            {isDelete && 
                <Navigate to={state.user.admin ? "/admin/users" : "/logout"} replace={true} /> 
            }
            <div className="p-8 max-h-screen bg-neutral-50 rounded-lg shadow lg:w-2/5 lg:mx-auto">
                <h2 className="mb-12">User Information</h2>
                <div className="flex justify-between mb-8 md:flex-col">
                    <NavLink className="bg-green-500 px-4 py-1 rounded text-white hover:bg-green-800 md:w-32 md:text-center md:mb-4" to={`/updateProfil/${userId}`}>
                        Modifier Info
                    </NavLink>
                    <NavLink className="bg-green-500 px-4 py-1 rounded text-white hover:bg-green-800 md:w-52 md:text-center" to={`/updatePassword/${userId}`}>
                        Modifier Mots de Passe
                    </NavLink>
                </div>
                <h3 className="mb-2">Nom: {userInfo.last_name}</h3>
                <h3 className="mb-2">Prénom: {userInfo.first_name}</h3>
                <p className="mb-2">User ID: {userInfo.id}</p>
                <p className="mb-2">Email: {userInfo.email}</p>
                <p className="mb-2">Date de naissance: {reformeDate(userInfo.birthday)}</p>
                <p className="mb-2">Date d'inscription: {reformeDate(userInfo.registration_date)}</p>
                <p className="mb-8">Dernière connexion: {reformeDate(userInfo.last_connection)}</p>
                <button className="mb-8 py-1 px-4" onClick={handleCheck}>Supprimer le compte</button>
                {isSure && 
                    <ConfirmationWindow isOpen={handleCheck} deleteFunction={handleDelete} name="ce compte?" />
                }
            </div>
        </div>  
        )
}

export default Profil