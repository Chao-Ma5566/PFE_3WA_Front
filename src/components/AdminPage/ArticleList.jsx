import { useEffect,useState } from 'react'
import axios from 'axios'
import {BASE_URL, BASE_IMG} from "../../tools/constante.js"
import { NavLink } from "react-router-dom"


const ArticleList = (props) => {
    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    // const  [state, dispatch] = React.useContext(StoreContext);
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${BASE_URL}/admin/articles`)
            .then(function(response) {
                setArticleList(response.data.data.result);
            })
            .catch(function(error) {
                console.log(error);
            })
            .then(res => setIsLoading(false))
    }, [])
    
    
    if(isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <div className="container-admin">
            <div className="admin-header flex justify-between">
                <div>
                    <h2>Liste d'Articles</h2>
                    <p>Utiliser Ctrl+F pour chercher title d'utilisateur, meilleur proportion de photo est 3:4</p>
                    <p>Cliquez nom/ prénom pour voir l'info complèt</p>
                </div>
                <div className="flex items-center">
                    <NavLink to={`/admin/addArticle`}>
                        <button 
                            className="rounded bg-primary hover:bg-gray-900 p-2">
                                Créer un nouvel article
                        </button>
                    </NavLink>
                </div>    
            </div>
            <table className="table-fixed w-full max-h-96">
              <thead className="border-b-2 sticky top-0 bg-gray-800 ">
                <tr className="bg-gray-700">
                  <th className="py-4 text-lg">Cover</th>
                  <th className="py-4 text-lg">Title</th>
                  <th className="py-4 text-lg">Modifier Article</th>
                  <th className="py-4 text-lg">Modifier Cover</th>
                </tr>
              </thead>
              <tbody className="overscroll-auto overflow-y-scroll">
              {articleList.map((article, i) => {
                    return (
                        <tr key={i} className="my-2 hover:bg-gray-700">
                            <td>
                                <div className="w-full h-24 overflow-hidden flex justify-center">
                                    <img className="object-contain w-full h-full" 
                                        src={`${BASE_IMG}/${article.url}`} alt={article.caption} />
                                </div>
                            </td>
                            <td>
                                <NavLink className="text-center" to={`/article/${article.id}`}>
                                    <p>{article.title}</p> 
                                </NavLink>
                            </td>
                            <td>
                                <NavLink  className="flex justify-center" to={`/admin/updateArticle/${article.id}`}>
                                    <button className="p-2 rounded bg-gray-900 hover:bg-primary">Modifier</button>
                                </NavLink>
                            </td>
                            <td >
                                <NavLink className="flex justify-center" to={`/admin/updateArticlePhoto/${article.id}`}>
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

export default ArticleList