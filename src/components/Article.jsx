import axios from "axios"
import {useContext, useEffect, useState} from "react"
import {StoreContext} from "../tools/context.js"
import {BASE_URL, BASE_IMG} from "../tools/constante.js"
import { NavLink,useParams } from "react-router-dom"

const Article = (props) => {
    const { articleId } = useParams();
    const [state, dispatch] = useContext(StoreContext);
    const [articleInfo, setArticleInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getArticleById`, { id: articleId })
            .catch(err => console.log(err))
            .then(res => {
                setArticleInfo(res.data.data.result[0])
                })
            .then(res => setIsLoading(false))
    }, [articleId])
    
    if(isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <article className='flex flex-col items-center'>
            <img src={`${BASE_IMG}/${articleInfo.url}`} className='max-w-[48rem]' alt={articleInfo.caption} />
            <div className='px-12 w-full max-w-[48rem]'>
                <h2>{articleInfo.title}</h2>
                {state.user.admin &&
                <div className='mt-12 flex flex-row justify-between mb-8'>
                    <NavLink className=" bg-green-500 hover:bg-yellow text-md md:text-lg py-1 px-4 rounded-lg text-light text-white mt-4" to={`/admin/updateArticle/${articleId}`}>
                        Modifier article
                    </NavLink>
                    <NavLink className=" bg-green-500 hover:bg-yellow text-md md:text-lg py-1 px-4 rounded-lg text-light text-white mt-4" to={`/admin/updateArticlePhoto/${articleId}`}>
                        Modifier Photo
                    </NavLink>
                </div>
                }
            </div>
            <p className='text-left px-16 mb-4'>{articleInfo.content}</p>
        </article>  
        )
}

export default Article