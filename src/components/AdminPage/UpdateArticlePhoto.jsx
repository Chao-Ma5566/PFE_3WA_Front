import axios from "axios"
import { useEffect, useState } from "react"
import {BASE_URL, BASE_IMG} from "../../tools/constante.js"
import { useParams,Navigate } from "react-router-dom"
import {lengthLimit, checkVide} from "../../tools/inputCheck.js"

const UpdateArticlePhoto = (props) => {
    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [messageErr, setMessageErr] = useState("")
    const [isChangePage, setIsChangePage] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getArticleById`, { id: articleId })
            .catch(err => console.log(err))
            .then(res => {
                setArticleInfo(res.data.data.result[0])
                })
            .then(res => setIsLoading(false))
    }, [articleId])
    
const handleSubmit = (e) => {
        e.preventDefault()
        if(messageErr.length > 0){
            return
        }
        const dataFile = new FormData();
        const files = {...e.target.img.files};

        if(!checkVide(articleInfo.caption)){
            setMessageErr("Champ obligatoire vide") 
            return
        }
        if(files[0]===undefined){
            setMessageErr("Une photo obligatoire")
            return
        }
        dataFile.append('files', files[0], files[0].name)
        dataFile.append('caption', articleInfo.caption)
        dataFile.append('id', articleId)
        
        axios.post(`${BASE_URL}/admin/updateArticlePhoto`, dataFile)
        .then(res=>{
            if(res.data.data.result.affectedRows > 0){
                setIsChangePage(true)
                return
            }
            if(res.data && res.data.data && res.data.data.response) alert(res.data.data.response)
            if(res.data.msg) alert(res.data.msg)
            setMessageErr(res.data.data.response)
        }).catch(err=>{
            console.log(err)
            return
        })
    }
    
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(articleInfo.caption, 100)){
            setMessageErr("Caption est limité à 100 caractères") 
        }
        let newInfo = { ...articleInfo, [e.target.name]: e.target.value }
        setArticleInfo(newInfo)
    }
    
    if(isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <div className="container-admin">
            {isChangePage && <Navigate to={`/article/${articleId}`} replace={true} />}
            <div className="admin-header">
                <div>
                    <h2>Modifier Cover d'article</h2>
                    <p>meilleur proportion de photo est 3:4</p>
                    {messageErr.length > 0 && <p  className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
                </div>   
            </div>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p className="text-xl">Title: {articleInfo.title}</p>
                <img src={`${BASE_IMG}/${articleInfo.url}`} alt={articleInfo.caption} />
                <label htmlFor="imgUpdate">Cover image: </label>
                <div className="form-item">
                    <input type='file' name='img' id="imgUpdate" 
                    className="file:bg-gray-500 hover:file:bg-gray-700 py-2 px-4 file:rounded focus:outline-none focus:shadow-outline text-gray-100"
                    />
                </div>
                <label htmlFor="captionUpdate">Caption: </label>
                <input 
                    type="text" 
                    id="captionUpdate" 
                    name="caption" 
                    value={articleInfo.caption} 
                    placeholder="caption" 
                    onChange={(e)=>handleChange(e)} 
                />
                <button type="submit" 
                    className="py-2 px-4 rounded bg-gray-900 hover:bg-primary my-2"
                >
                Valider
                </button>
                
            </form>
        </div>  
        )
}

export default UpdateArticlePhoto