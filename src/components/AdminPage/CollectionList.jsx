import {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { StoreContext } from "../../tools/context.js"
import {BASE_URL} from "../../tools/constante.js"
import { NavLink } from "react-router-dom"


const CollectionList = (props) => {
    const [collectionList, setCollectionList] = useState([])
    // const  [state, dispatch] = React.useContext(StoreContext);
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/collection`)
            .then(function(response) {
                setCollectionList(response.data.data.result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [])
    
    return (
        <div className="container-admin">
            <div className="admin-header flex justify-between">
                <div>
                    <h2>Collection Liste</h2>
                    <p>Utiliser Ctrl+F pour chercher title/id de collection</p>
                    <p>Cliquez title pour voir la liste complète de produits dans la collection</p>
                </div>
                <div className="flex items-center">
                    <NavLink to={`/admin/addCollection`}>
                        <button 
                            className="rounded bg-primary hover:bg-gray-900 p-2">
                                Créer une nouvelle collection
                        </button>
                    </NavLink>
                </div>
            </div>
            <table className="table-fixed w-full max-h-96">
              <thead className="border-b-2 sticky top-0 bg-gray-800 ">
                <tr className="bg-gray-700">
                  <th className="py-4 text-lg">ID</th>
                  <th className="py-4 text-lg">Title</th>
                  <th className="py-4 text-lg">Modifier ou Supprimer</th>
                </tr>
              </thead>
              <tbody className="overscroll-auto overflow-y-scroll">
              {collectionList.map((collection, i) => {
                    return (
                        <tr key={i} className="my-2 hover:bg-gray-700">
                            <td className="text-center">
                                <p>{collection.id}</p>
                            </td>
                            <td>
                                <NavLink className="text-center" to={`/collection/${collection.id}`}>
                                    <p>{collection.title}</p>
                                </NavLink>
                            </td>
                            <td className="flex justify-center">
                                <NavLink to={`/admin/updateCollection/${collection.id}`}>
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

export default CollectionList