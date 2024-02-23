import {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { StoreContext } from "../../tools/context.js"
import {BASE_URL} from "../../tools/constante.js"
import { NavLink } from "react-router-dom"


const UserList = (props) => {
    const [userList, setUserList] = useState([])
    // const  [state, dispatch] = React.useContext(StoreContext);
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/users`)
            .then(function(response) {
                setUserList(response.data.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [])
    
    return (
        <div className="container-admin">
            <div className="admin-header">
                <h2>User Liste</h2>
                <p>Utiliser Ctrl+F pour chercher nom/ prénom/ email d'utilisateur</p>
                <p>Cliquez nom/ prénom pour voir l'info complèt</p>
            </div>
            <table className="table-fixed w-full max-h-96">
              <thead className="border-b-2 sticky top-0 bg-gray-800 ">
                <tr className="bg-gray-700">
                  <th className="py-4 text-lg">Nom</th>
                  <th className="py-4 text-lg">Prénom</th>
                  <th className="py-4 text-lg">Email</th>
                  <th className="py-4 text-lg">Modifier ou Supprimer</th>
                </tr>
              </thead>
              <tbody className="overscroll-auto overflow-y-scroll">
              {userList.map((user, i) => {
                    return (
                        <tr key={i} className="my-2 hover:bg-gray-700">
                            <td>
                                <NavLink  className="text-center" to={`/profil/${user.id}`}>
                                    <p>{user.last_name}</p>
                                </NavLink>
                            </td>
                            <td>
                                <NavLink className="text-center" to={`/profil/${user.id}`}>
                                    <p>{user.first_name}</p>
                                </NavLink>
                            </td>
                            <td  className="text-center">
                                <p>{user.email}</p>
                            </td>
                            <td className="flex justify-center">
                                <NavLink to={`/updateProfil/${user.id}`}>
                                    <button className="p-2 rounded bg-gray-900 hover:bg-primary">Modifier</button>
                                </NavLink>
                            </td>
                        </tr>
                    )
                })}
              </tbody>
            </table>
        </div>
    );
}

export default UserList