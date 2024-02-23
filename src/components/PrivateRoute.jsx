import {Navigate,useLocation} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"


const PrivateRoute = ({children, auth = null}) => {
    /* 
    * On recuperer user qui se trouve dans notre state 
    * du reducer grace au destructuring
    */
    const [{user, isLogged}, dispatch] = useContext(StoreContext);
    const [isLoading, setisLoading] = useState(true)
    //useLocation() cherche l'histoire de navigation d'utilisateur, et pathname c'est lien url après /
    const location = useLocation().pathname;
    // On recupere les variable qui permette de savoir si l'utilisateur est connecter et/ou admin
    const {admin} = user;
    
    useEffect(() => {
        // on verrifie que l'utilisateur n'est pas deja connecter
        if(!isLogged){
          // on recupere le token dans le localStorage
          const jwtToken = window.localStorage.getItem("jwtToken")
          // Si on a un token
          if (jwtToken) {
            // on met le token 
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
            // on verrifie le token puis on sauvegarde les donner dans le reducer
            axios.get(`${BASE_URL}/relogged`)
            .then(res => {
              dispatch({type:"LOGIN", payload:res.data.result})
              dispatch({type:"GET_CART_ITEMS", payload:res.data.cart})
              dispatch({type:"PRODUCTLIST", payload:res.data.products})
            })
            .catch(e => console.log(e))
          } else { setisLoading(false) }
        }
    },[])
  
    // permet de bloquer le chargement des composent si l'utilisateur n'est pas logged ou que le route est securiser
    useEffect(() => { if (user.id || !auth) setisLoading(false) },[user, location])
    // On verrifie si a route est reserver au admin 
    const isLimitedToAdmin = auth === "admin";
    // On verrifie si a route est reserver au utilisateur connecter
    const isLimitedToConnected = auth === "user";
    // si il n'y a pas de restriction sur cette route
    const isPublic = auth === null
  
    /* 
    * Si la route est reserver aux admin et qu'il est connecter en tant qu'admin
    * OU
    * Si la route est reserver aux utilisateur et qu'il est connecter
    */
  const isUserAuthorized = isPublic || (isLimitedToAdmin && admin) || (isLimitedToConnected && isLogged);
  
  if(isLoading) return <p>Loading</p>
  
  return isUserAuthorized ? children : <Navigate to="/login" />;
}


export default PrivateRoute