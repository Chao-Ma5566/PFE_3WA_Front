import { NavLink } from "react-router-dom"
import { StoreContext } from "../tools/context.js"
import {useState, useContext} from "react"
import admin from "../assert/icon/adminIcon/user-plus.svg"
import profil from "../assert/icon/userIcon/users.svg"
import logo from "../assert/img/logoblack.svg"
import cart from "../assert/icon/userIcon/shopping-cart.svg"

const Logged = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [profilOpen, setProfilopen] = useState(false)
    
    const openProfil = () =>{
        setProfilopen(!profilOpen)
    }
    return(
        <div className="flex flex-row items-center ">
            {state.user.admin && 
                <NavLink to="/Admin" title="Admin Page">
                    <img className="hover:bg-green-500 rounded-full p-2" src={admin} alt="AdminPage logo" />
                </NavLink>}
            <div>
                <img className="hover:bg-green-500 rounded-full p-2" src={profil} alt="Profil Icon" onClick={openProfil}/>
                {profilOpen &&
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right text-center rounded-md bg-neutral-50 py-2 shadow-lg border-0">
                        <NavLink className='block mb-2  text-sm' to={`/profil/${state.user.id}`}  onClick={openProfil}>
                            <p className="hover:bg-green-500 hover:text-neutral-50 rounded inline py-1 px-3">
                               Votre Profil
                           </p>
                        </NavLink>
                        <NavLink to="/logout" className="flex justify-center"><button className="text-sm block"  onClick={openProfil}>Déconnexion</button></NavLink>
                    </div>
                }
            </div>
            <NavLink className="flex flex-row items-center relative mr-2" to={`/cart`}>
                <img className="hover:bg-green-500 rounded-full p-2 relative" src={cart} alt="Cart Icon" />
                <p className={state.cartSum === 0 ? "hidden" : "rounded-full bg-yellow text-neutral-50 text-xs px-1 translate-y-2 -translate-x-4" }>{state.cartSum}</p>
            </NavLink>
        </div>  
    )
}

export default Logged


