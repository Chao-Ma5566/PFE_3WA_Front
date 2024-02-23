import {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { StoreContext } from "../../tools/context.js"
import {BASE_URL, BASE_IMG} from "../../tools/constante.js"
import { NavLink } from "react-router-dom"


const CollectionList = (props) => {
    const [productList, setProductList] = useState([])
    // const  [state, dispatch] = React.useContext(StoreContext);
    useEffect(() => {
        axios.get(`${BASE_URL}/products`)
            .then(function(response) {
                setProductList(response.data.data.result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [])
    
    return (
        <div className="container-admin">
            <div className="admin-header flex justify-between">
                <div>
                    <h2>Liste de Produits</h2>
                    <p>Utiliser Ctrl+F pour chercher nom de produit</p>
                    <p>Cliquez Nom de Produits pour voir l'info complète de produit</p>
                </div>
                <div className="flex items-center">
                    <NavLink to={`/admin/addProduct`}>
                        <button 
                            className="rounded bg-primary hover:bg-gray-900 p-2">
                                Créer un nouveau produit
                        </button>
                    </NavLink>
                </div>
            </div>
            <table className="table-fixed w-full max-h-96">
              <thead className="border-b-2 sticky top-0 bg-gray-800 ">
                <tr className="bg-gray-700">
                  <th className="py-4 text-lg">Photo</th>
                  <th className="py-4 text-lg">Nom du Produit</th>
                  <th className="py-4 text-lg">Prix</th>
                  <th className="py-4 text-lg">Stockage</th>
                  <th className="py-4 text-lg">Modifier ou Supprimer</th>
                  <th className="py-4 text-lg">Modifier Photo</th>
                </tr>
              </thead>
              <tbody className="overscroll-auto overflow-y-scroll">
              {productList.map((product, i) => {
                    return (
                        <tr key={i} className="my-2 hover:bg-gray-700">
                            <td>
                                <div className="w-full h-24 overflow-hidden flex justify-center">
                                    <img className="object-contain w-full h-full" 
                                        src={`${BASE_IMG}/${product.url}`} alt={product.caption} />
                                </div>
                            </td>
                            <td>
                                <NavLink className="text-center" to={`/product/${product.id}`}>
                                    <p>{product.name}</p>
                                </NavLink>
                            </td>
                            <td className="text-center">
                                <p>{product.price} €</p>
                            </td>
                            <td className="text-center">
                                <p>{product.stock}</p>
                            </td>
                            <td>
                                <NavLink  className="flex justify-center" to={`/admin/updateProduct/${product.id}`}>
                                    <button className="p-2 rounded bg-gray-900 hover:bg-primary">Modifier</button>
                                </NavLink>
                            </td>
                            <td >
                                <NavLink className="flex justify-center" to={`/admin/updateProductPhoto/${product.id}`}>
                                    <button className="p-2 rounded bg-gray-900 hover:bg-primary">Modifier Photo</button>
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