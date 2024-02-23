import {useContext, useState} from 'react'
import logo from "../../assert/img/logowhite.svg"
import { NavLink } from "react-router-dom"
import { StoreContext } from "../../tools/context.js"
import users from "../../assert/icon/adminIcon/users.svg"
import collection from "../../assert/icon/adminIcon/collections.svg"
import produits from "../../assert/icon/adminIcon/shopping-bag.svg"
import commandes from "../../assert/icon/adminIcon/truck.svg"
import promos from "../../assert/icon/adminIcon/gift.svg"
import articles from "../../assert/icon/adminIcon/newspaper.svg"
import roles from "../../assert/icon/adminIcon/user-plus.svg"
import shop from "../../assert/icon/adminIcon/shop.svg"

const AdminSidebar = (props) => {
  const [state, dispatch] = useContext(StoreContext);
  const [activeIcon, setActiveIcon] = useState("")
  const routeList = ["Users", "Collection", "Produits", "Commandes", "Promos", "Articles", "Roles"];

  // Créer un objet qui mappe les noms des éléments de la liste aux chemins d'accès des images correspondantes
  const imagePaths = {
    Users: users,
    Collection: collection,
    Produits: produits,
    Commandes: commandes,
    Promos: promos,
    Articles: articles,
    Roles: roles
  };

  const changeActive = (name)=>{
    setActiveIcon(name)
  }
  
  return (
    <nav className="flex flex-col justify-between max-h-screen h-screen items-center py-4 w-32 bg-gray-900 text-gray-700">
      <div>
        <NavLink className="flex flex-col flex-auto items-center" to={`/admin`}>
          <img className="fill-gray-500 h-10" src={logo} alt="Logo Three Body" />
        </NavLink>
      </div>
      {routeList.map((item, i) => {
        return (
          <div key={i} className={`p-2 w-24 my-1 mx-3 rounded-xl
              ${activeIcon===item ? "bg-primary" : "bg-gray-500"}`}>
            <NavLink 
              className="flex flex-col flex-auto items-center" 
              to={`/admin/${item.toLowerCase()}`}
              onClick={()=>changeActive(item)}  
            >
                <img src={imagePaths[item]} alt={item} />
                {item}
            </NavLink>
          </div>
        );
      })}
      <div className="p-2 w-24 my-1 mx-3 rounded-xl bg-gray-500">
        <NavLink className="flex flex-col items-center" to={`/`}>
            <img className="fill-current" src={shop} alt="retour au shop" />
            Boutique
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminSidebar;