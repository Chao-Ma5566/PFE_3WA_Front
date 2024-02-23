import axios from "axios"
import { useState } from "react"
import {BASE_URL} from "../../tools/constante.js"
import {lengthLimit, checkVide} from "../../tools/inputCheck.js"
import { Navigate } from "react-router-dom"

const AddArticle = (props) => {
    
    const initialValue = { title: "", content: ""}
    const [articleInfo, setArticleInfo] = useState(initialValue)
    const [messageErr, setMessageErr] = useState("")
    const [isChangePage, setIsChangePage] = useState(false)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const dataFile = new FormData();
        const files = {...e.target.img.files};

        if(!checkVide(articleInfo)){
            setMessageErr("Champ obligatoire vide") 
            return
        }
        else if(files[0]===undefined){
            setMessageErr("Une photo obligatoire")
            return
        }
        dataFile.append('files', files[0], files[0].name)
        dataFile.append('title', articleInfo.title)
        dataFile.append('content', articleInfo.content)
        
        axios.post(`${BASE_URL}/admin/addArticle`, dataFile)
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
        setArticleInfo(initialValue)
    }
    
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(articleInfo.title, 100)){
            setMessageErr("Title est limité à 100 caractaires") 
            return
        }else if(!lengthLimit(articleInfo.content, 5000)){
            setMessageErr("Chaque content est limité à 5000 caractaires") 
            return
        }
        let newInfo = { ...articleInfo, [e.target.name]: e.target.value }
        setArticleInfo(newInfo)
    }

    return (
        <div className="container-admin">
            {isChangePage && <Navigate to="/admin/articles" replace={true} />}
            <div className="admin-header">
                <div>
                    <h2>Créer une nouvelle article</h2>
                    <p>meilleur proportion de photo est 3:4</p>
                    {messageErr.length > 0 && <p  className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
                </div>   
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data"
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <label htmlFor="title">Title: </label>
                <input 
                    type="text" 
                    name="title"  
                    id="title" 
                    value={articleInfo.title} 
                    placeholder="title" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="content">Content: </label>
                <textarea 
                    name="content" 
                    id="content" 
                    value={articleInfo.content} 
                    placeholder="content" 
                    onChange={(e)=>handleChange(e)} 
                    rows="15" cols="33"
                />
                <label htmlFor="img">Cover image: </label>
                <div className="form-item">
                    <input type='file' name='img' id="img"
                        className="file:bg-gray-500 hover:file:bg-gray-700 py-2 px-4 file:rounded focus:outline-none focus:shadow-outline text-gray-100"
                    />
                </div>
                <button type="submit"
                    className="py-2 px-4 rounded bg-gray-900 hover:bg-primary my-2"
                >
                    Valider
                </button>
                {messageErr.length > 0 && <p>{messageErr}</p>}
            </form>
        </div>
    );
}

export default AddArticle

