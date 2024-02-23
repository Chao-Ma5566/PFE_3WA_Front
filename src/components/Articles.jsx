import { useEffect,useState } from 'react'
import axios from 'axios'
import {BASE_URL, BASE_IMG} from "../tools/constante.js"
import { NavLink } from "react-router-dom"
import twitter from "../assert/icon/userIcon/twitter.svg"
import instagram from "../assert/icon/userIcon/instagram.svg"
import TrackVisibility from 'react-on-screen'

const Articles = (props) => {
    const [articleList, setArticleList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
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
        return <div className='h-screen flex justify-center items-center text-xl'>Loading....</div>
    }
    return (
        <section className="bg-gradient-to-r from-green-500 to-green-800 pt-24 px-4 pb-4 text-neutral-50">
            <div className='flex flex-col justify-center w-full text-center'>
                <h2 className="mb-16">- Nos Actualités -</h2>
                <p className="mb-2">Suivez-nous:</p>
                <div className="flex flex-row justify-center mb-8">
                    <a target="_blank" rel="noreferrer" className="cursor-pointer mr-8 hover:bg-yellow rounded-full w-12 h-12 flex justify-center items-center" href="https://twitter.com/?lang=fr" title="Notre Twitter" >
                        <img src={twitter} className="h-10 p-2" alt="Notre Twitter" />
                    </a>
                    <a target="_blank" rel="noreferrer" className="cursor-pointer hover:bg-yellow rounded-full w-12 h-12 flex justify-center items-center" href="https://www.instagram.com/" title="Notre Instagram" >
                        <img src={instagram} className="h-10 p-2" alt="Notre Instagram" />
                    </a>
                </div>
            </div>
            <div className="article_container">
                {articleList.map((article, i) => {
                    return (
                        <article key={i} className="article_card">
                            <div>
                                <div>
                                    <NavLink to={`/article/${article.id}`}>
                                        <img src={`${BASE_IMG}/${article.url}`} alt={article.caption} />
                                    </NavLink>
                                </div>
                            </div>
                            <div className=''>
                                <NavLink to={`/article/${article.id}`}>
                                    <h5>{article.title}</h5> 
                                </NavLink>
                            </div>
                        </article>
                        )
                    })} 
                </div>
        </section>
    );
    
}

export default Articles