import axios from "axios"
import { useState } from "react"
import {BASE_URL} from "../tools/constante.js"
import {lengthLimit, checkVide} from "../tools/inputCheck.js"
import { NavLink, Navigate } from "react-router-dom"

const Register = (props) => {
    const initialValue = { nom: "", prenom: "", email: "", password: "", birthday: "2010-06-22" }
    const [userInfo, setUserInfo] = useState(initialValue)
    const [messageErr, setMessageErr] = useState("")
    const [isChangePage, setIsChangePage] = useState(false)
    const [isFocused, setIsFocused] = useState(false);
    // const [isShowPassWord, setIsShowPassWord] = useState(false)
    
    const lower = new RegExp('(?=.*[a-z])')
    const upper = new RegExp('(?=.*[A-Z])')
    const number = new RegExp('(?=.*[0-9])')
    const special = new RegExp('(?=.*[@#$%^&+=!])')
    const length = new RegExp('(?=.{8,})')
    
    let nowDate = new Date().toISOString().split('T')[0]

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!checkVide(userInfo)){
            setMessageErr("Champ obligatoire vide") 
            return
        }else if(nowDate < userInfo.birthday){
            setMessageErr("Date dépassé le limite") 
            return
        }else if(messageErr.length > 0){
            return
        }
        
        axios.post(`${BASE_URL}/addUser`, {
            last_name: userInfo.nom.trim(),
            first_name: userInfo.prenom.trim(),
            email: userInfo.email.toLowerCase(),
            password: userInfo.password,
            birthday: userInfo.birthday
        }).then(res=>{
            if(res.data.data.response.affectedRows > 0){
                setIsChangePage(true)
                }
            setMessageErr(res.data.data.response)
            if(res.data.data.response){
                return
            }
        }).catch(err=>{
            console.log(err)
            return
        })
        setUserInfo(initialValue)
    }
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(e.target.value)){
            setMessageErr("tous les infos sont limit à 250 caractaires") 
        }
        let newInfo = { ...userInfo, [e.target.name]: e.target.value }
        setUserInfo(newInfo)
    }

    return (
        <div className="min-h-screen bg-gradient-to-t from-green-500 to-yellow flex flex-col justify-between gap-2 lg:items-center lg:pt-20">
            {isChangePage && <Navigate to="/login" replace={true} />}
            
            <form className="p-8 mt-12 bg-neutral-50 shadow m-4 rounded-lg lg:m-0 lg:w-3/5" onSubmit={handleSubmit}>
            <h5 className="text-xl mb-10 lg:text-3xl">Inscription</h5>
                <label htmlFor="nomRegister">Nom: </label>
                <input type="text" id="nomRegister" name="nom" value={userInfo.nom} placeholder="nom" onChange={(e)=>handleChange(e)} />
                <label htmlFor="prenomRegister">Prénom: </label>
                <input type="text" id="prenomRegister" name="prenom" value={userInfo.prenom} placeholder="prenom" onChange={(e)=>handleChange(e)} />
                <label htmlFor="emailRegister">Email: </label>
                <input type="email" id="emailRegister" name="email" value={userInfo.email} placeholder="email" onChange={(e)=>handleChange(e)} />
                <label htmlFor="passwordRegister">Password: </label>
                <input 
                    type="password"
                    id="passwordRegister" 
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)} 
                    name="password" value={userInfo.password} 
                    placeholder="password" 
                    onChange={(e)=>handleChange(e)} 
                />
                {isFocused && (
                <div className="m-2">
                    <h5 className="text-lg">Le mot de passe doit comporter :</h5>
                    <ul>
                        <li className={length.test(userInfo.password) ? "valided" : "" }>
                            au moins 8 caractères
                        </li>
                        <li className={upper.test(userInfo.password) ? "valided" : "" }>
                            au moins une lettre majuscule
                        </li>
                        <li className={lower.test(userInfo.password) ? "valided" : "" }>
                            au moins une lettre minuscule
                        </li>
                        <li className={special.test(userInfo.password) ? "valided" : "" }>
                            au moins un caractère special
                        </li>
                        <li className={number.test(userInfo.password) ? "valided" : "" }>
                            au moins un chiffre
                        </li>
                    </ul>
                </div>
                )}
                <label htmlFor="birthdayRegister">Votre date de naissance: </label>
                <input type="date" id="birthdayRegister" name="birthday" value={userInfo.birthday} onChange={(e)=>handleChange(e)} max={nowDate}/>
                <button type="submit" className="bg-green-500 px-4 py-2 rounded text-white mt-4">Valider</button>
                {messageErr.length > 0 && <p className="mt-2 bg-primary rounded px-4 py-1">{messageErr}</p>}
            </form>
            <div className="p-8 bg-neutral-50 shadow mx-4 mb-4 rounded-lg lg:m-0 lg:w-3/5 lg:my-4">
                <h5 className="text-xl mb-10">Déjà Client?</h5>
                <NavLink to="/login" className="bg-green-500 px-4 py-2 rounded text-white hover:bg-gray-700" title="Loggin">
                    Me Connecter
                </NavLink>
            </div>
        </div>
    );
}

export default Register
