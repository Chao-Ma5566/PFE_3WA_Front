import axios from "axios"
import { useState, useEffect } from "react"
import {BASE_URL} from "../../tools/constante.js"
import {lengthLimit, checkVide, isPositiveInteger, isNumber} from "../../tools/inputCheck.js"
import { Navigate, useParams } from "react-router-dom"
import ConfirmationWindow from "../ConfirmationWindow.jsx"

const UpdateProduct = (props) => {
    const {productId} = useParams()
    
    const initialValue = {
        name: "", 
        description: "",
        collection_id: "",
        stock: "",
        material: "",
        price:"",
        height:"",
        width:"",
        depth:"",
        seat_height:"",
        seat_depth:"",
        id: productId,
        }
        
    const [productInfo, setProductInfo] = useState(initialValue)
    const [messageErr, setMessageErr] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSure, setIsSure] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [collectionList, setCollectionList] = useState([])
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`, { id: productId })
            .catch(err => console.log(err))
            .then(res => {
                setProductInfo(res.data.data.result[0])
                axios.get(`${BASE_URL}/admin/collection`)
                    .then(function(response) {
                        setCollectionList(response.data.data.result);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
        })
            .then(res => setIsLoading(false))
    }, [productId])
        
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(!checkVide(Object.values(productInfo))){
            setMessageErr("Champ obligatoire vide") 
            return
        }else if(!isPositiveInteger(productInfo.stock)){
            setMessageErr("Stockage doit être un numbre entier et positive.") 
            return
        }else if(!isNumber([productInfo.price, productInfo.height, productInfo.width, productInfo.depth,productInfo.seat_depth,productInfo.seat_height,productInfo.stock])){
            setMessageErr("Le prix, stockage et les dimensions ne peuvent qu'être chiffre") 
            return
        }
        axios.post(`${BASE_URL}/admin/updateProduct`, {
        name: productInfo.name, 
        description: productInfo.description,
        collection_id: productInfo.collection_id,
        stock: productInfo.stock,
        material: productInfo.material,
        price:productInfo.price,
        height:productInfo.height,
        width:productInfo.width,
        depth:productInfo.depth,
        seat_height:productInfo.seat_height,
        seat_depth:productInfo.depth,
        id: productId,
        }).then(res=>{
            if(res.data.data.result.affectedRows > 0 && res.data.dataDimensions.result.affectedRows > 0){
                setMessageErr("L'information est bien enregistré.")
                return
            }
            setMessageErr(res.data.data.response)
        }).catch(err=>{
            console.log(err)
            return
        })
    }
    
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(productInfo.name, 100)){
            setMessageErr("Title est limité à 100 caractères") 
        }else if(!lengthLimit(productInfo.material)){
            setMessageErr("Matériel est limité à 255 caractères") 
            
        }else if(!lengthLimit([productInfo.price, productInfo.height, productInfo.width, productInfo.depth,productInfo.seat_depth,productInfo.seat_height,productInfo.stock],10)){
            setMessageErr("Le prix, stockage et les dimensions ne peuvent pas dépassés 10 caractère.")  
        }else if(!lengthLimit(productInfo.description, 5000)){
            setMessageErr("Chaque content est limité à 5000 caractères") 
            
        }
        let newInfo = { ...productInfo, [e.target.name]: e.target.value }
        setProductInfo(newInfo)
    }
    
    const handleCheck = () =>{
        setIsSure(!isSure)
    }
    
    const handleDelete = () => {
        axios.post(`${BASE_URL}/admin/deleteProduct`,{id:productId})
        .then(res=>{
                if(res.data.data.result.affectedRows > 0){
                    setIsDelete(true)
                }
        })
    }
    
    if(isLoading){
        <div>Loading...</div>
    }
    
    return (
        <div className="container-admin">
            {isDelete && <Navigate to="/admin/produits" replace={true} />}
            <div className="admin-header  flex justify-between">
                <div>
                    <h2>Modifier produit</h2>
                    <p>Tous les dimensions sont en centimètre. Les dimensions et le prix sont limités 2 chiffres décimals.</p>
                    {messageErr.length > 0 && <p  className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
                </div>
                <div className="flex items-center">
                    <button onClick={handleCheck}
                        className="rounded bg-primary hover:bg-gray-900 p-2">
                        Supprimer Produit
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data"
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <label htmlFor="nameUpdate">Nom du produit: </label>
                <input 
                    type="text" 
                    name="name" 
                    id="nameUpdate" 
                    value={productInfo.name} 
                    placeholder="Nom du produit" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="stockUpdate">Stockage: </label>
                <input 
                    type="number"
                    id="stockUpdate" 
                    name="stock" 
                    value={productInfo.stock} 
                    placeholder="Stockage" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="materialUpdate">Material: </label>
                <input 
                    type="text" 
                    id="materialUpdate" 
                    name="material" 
                    value={productInfo.material} 
                    placeholder="Material"
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="priceUpdate">Prix(€): </label>
                <input 
                    type="number" 
                    id="priceUpdate" 
                    name="price" 
                    value={productInfo.price} 
                    placeholder="Prix" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="collection_idUpdate">Collection: </label>
                <select name="collection_id" 
                    id="collection_idUpdate" 
                    onChange={(e)=> handleChange(e)} 
                    value={productInfo.collection_id}
                    className="text-gray-700 block"
                >
                <option value="">--Veillez choisir une collection--</option>
                    {collectionList.map((collection,i)=>{
                        return <option key={i} value={collection.id}>{collection.title}</option>
                    })}
                </select>
                <label htmlFor="hauteurUpdate">Hauteur(cm): </label>
                <input 
                    type="number" 
                    id="hauteurUpdate" 
                    name="height" 
                    value={productInfo.height} 
                    placeholder="Hauteur" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="widthUpdate">Largeur(cm): </label>
                <input 
                    type="number" 
                    id="widthUpdate" 
                    name="width" 
                    value={productInfo.width} 
                    placeholder="Largeur" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="depthUpdate">Profondeur(cm): </label>
                <input 
                    type="number" 
                    id="depthUpdate" 
                    name="depth" 
                    value={productInfo.depth} 
                    placeholder="Profondeur" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="seat_heightUpdate">Hauteur de siège(cm): </label>
                <input 
                    type="number" 
                    id="seat_heightUpdate" 
                    name="seat_height" 
                    value={productInfo.seat_height} 
                    placeholder="Hauteur de siège" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="seat_depthUpdate">Profondeur de siège(cm): </label>
                <input 
                    type="number" 
                    id="seat_depthUpdate" 
                    name="seat_depth" 
                    value={productInfo.seat_depth} 
                    placeholder="Profondeur de siège" 
                    onChange={(e)=>handleChange(e)} 
                />
                
                <label htmlFor="descriptionUpdate">Description: </label>
                <textarea 
                    name="description" 
                    id="descriptionUpdate" 
                    value={productInfo.description} 
                    placeholder="description" 
                    onChange={(e)=>handleChange(e)} 
                    rows="15" cols="33"
                />
                {messageErr.length > 0 && <p  className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
                <button type="submit"
                    className="py-2 px-4 rounded bg-gray-900 hover:bg-primary my-2"
                >
                    Valider
                </button>
            </form>
            {isSure && 
                <ConfirmationWindow isOpen={handleCheck} deleteFunction={handleDelete} name="cette product?" />
            }  
            
        </div>
    );
}

export default UpdateProduct

