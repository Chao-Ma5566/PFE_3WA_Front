import axios from "axios"
import { useEffect, useState } from "react"
import {BASE_URL, BASE_IMG} from "../../tools/constante.js"
import { useParams,Navigate } from "react-router-dom"
import {lengthLimit, checkVide} from "../../tools/inputCheck.js"

const UpdateProductPhoto = (props) => {
    const { productId } = useParams();
    const [productInfo, setProductInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [messageErr, setMessageErr] = useState("")
    const [isChangePage, setIsChangePage] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getProductById`, { id: productId })
            .catch(err => console.log(err))
            .then(res => {
                setProductInfo(res.data.data.result[0])
        })
            .then(res => setIsLoading(false))
    }, [productId])
    
const handleSubmit = (e) => {
        e.preventDefault()
        if(messageErr.length > 0){
            return
        }else if(!checkVide(productInfo.caption)){
            setMessageErr("Champ obligatoire vide") 
            return
        }
        
        const dataFile = new FormData();
        const files = {...e.target.img.files};
        console.log(files)

        if(files[0]===undefined){
            setMessageErr("Une photo obligatoire")
            return
        }
        
        dataFile.append('files', files[0], files[0].name)
        dataFile.append('caption', productInfo.caption)
        dataFile.append('id', productId)
        
        axios.post(`${BASE_URL}/admin/updateProductPhoto`, dataFile)
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
        if(!lengthLimit(productInfo.caption, 100)){
            setMessageErr("Caption est limité à 100 caractères") 
        }
        let newInfo = { ...productInfo, [e.target.name]: e.target.value }
        setProductInfo(newInfo)
    }
    
    if(isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <div className="container-admin">
            {isChangePage && <Navigate to={`/product/${productId}`} replace={true} />}
            <div className="admin-header">
                <div>
                    <h2>Modifier Photo de Produit</h2>
                    <p>meilleur proportion de photo est 3:4</p>
                    {messageErr.length > 0 && <p  className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
                </div>   
            </div>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data"
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <p className="text-xl mb-4">Nom de Produit: {productInfo.name}</p>
                <img src={`${BASE_IMG}/${productInfo.url}`} alt={productInfo.caption} />
                <label htmlFor="imgProductUpdate">Cover image: </label>
                <div className="form-item">
                    <input type='file' name='img' id="imgProductUpdate"  
                    className="file:bg-gray-500 hover:file:bg-gray-700 py-2 px-4 file:rounded focus:outline-none focus:shadow-outline text-gray-100"
                    />
                </div>
                <label htmlFor="captionProductUpdate">Caption: </label>
                <input 
                    type="text" 
                    name="caption" 
                    id="captionProductUpdate" 
                    value={productInfo.caption} 
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

export default UpdateProductPhoto