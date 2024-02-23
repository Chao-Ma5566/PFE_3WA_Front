import axios from "axios"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import {BASE_URL} from "../tools/constante.js"
import { NavLink } from "react-router-dom"
import {lengthLimit, checkVide} from "../tools/inputCheck.js"

const UpdatePassword = (props) => {
    const { userId } = useParams();
    const [userInfo, setUserInfo] = useState({oldPassword:"", newPassword:"", id: Number(userId)})
    const [messageErr, setMessageErr] = useState("")
    const lower = new RegExp('(?=.*[a-z])')
    const upper = new RegExp('(?=.*[A-Z])')
    const number = new RegExp('(?=.*[0-9])')
    const special = new RegExp('(?=.*[@#$%^&+=!])')
    const length = new RegExp('(?=.{8,})')
    const [isFocused, setIsFocused] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(messageErr.length > 0){
            return
        }else if(!checkVide([userInfo.newPassword, userInfo.oldPassword])){
            setMessageErr("Champ obligatoire vide") 
            return
        }
        
        axios.post(`${BASE_URL}/updatePassword`, userInfo)
        .then(res=>{
            setMessageErr(res.data.data.response)
        }).catch(err=>{
            console.log(err)
            return
        })
    }
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(e.target.value)){
            setMessageErr("tous les infos sont limit à 250 caractaires") 
        }
        let newInfo = { ...userInfo, [e.target.name]: e.target.value }
        setUserInfo(newInfo)
    }
    
    console.log(userInfo)
    return (
        <div className="h-screen bg-gradient-to-t from-green-500 to-yellow  pb-24 px-4 pt-36">
            <form onSubmit={handleSubmit} className="p-8 max-h-screen bg-neutral-50 rounded-lg shadow lg:w-2/5 lg:mx-auto">
                <h2 className="text-xl mb-10 lg:text-3xl">Modifier Mots de Passe</h2>
                <label htmlFor="oldPassword">Votre mots de passe actuel: </label>
                <input className="mt-2 mb-8" id="oldPassword" type="password" name="oldPassword" value={userInfo.oldPassword} onChange={(e)=>handleChange(e)} />
                <label htmlFor="newPassword" >Votre nouveau mots de passe :</label>
                <input
                    className="mt-2"
                    id="newPassword" 
                    type="password" 
                    name="newPassword" 
                    value={userInfo.newPassword} 
                    onChange={(e)=>handleChange(e)} 
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                />
                {isFocused && (
                <div className="m-2">
                <h5 className="text-lg">Le mot de passe doit comporter :</h5>
                    <ul>
                        <li className={length.test(userInfo.newPassword) ? "valided" : "" }>
                            au moins 8 caractères
                        </li>
                        <li className={upper.test(userInfo.newPassword) ? "valided" : "" }>
                            au moins une lettre majuscule
                        </li>
                        <li className={lower.test(userInfo.newPassword) ? "valided" : "" }>
                            au moins une lettre minuscule
                        </li>
                        <li className={special.test(userInfo.newPassword) ? "valided" : "" }>
                            au moins un caractère special
                        </li>
                        <li className={number.test(userInfo.newPassword) ? "valided" : "" }>
                            au moins un chiffre
                        </li>
                    </ul>
                </div>
                )}
                <button className="bg-green-500 px-4 py-2 rounded text-white mt-8" type="submit">Valider</button>
                {messageErr.length > 0 && <p className="mt-2 bg-primary rounded px-4 py-1">{messageErr}</p>}
            </form>
        </div>  
        )
}

export default UpdatePassword