import axios from "axios"
import { useState, useEffect } from "react"
import {BASE_URL} from "../../tools/constante.js"
import {lengthLimit, checkVide, isNumber, isPositiveInteger} from "../../tools/inputCheck.js"
import { Navigate } from "react-router-dom"

const AddProduct = (props) => {
    
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
        }
    const [productInfo, setProductInfo] = useState(initialValue)
    const [messageErr, setMessageErr] = useState("")
    const [isChangePage, setIsChangePage] = useState(false)
    const [collectionList, setCollectionList] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/admin/collection`)
            .then(function(response) {
                setCollectionList(response.data.data.result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        const dataFile = new FormData();
        const files = {...e.target.img.files};

        if(!checkVide(productInfo)){
            setMessageErr("Champ obligatoire vide") 
            return
        }
        else if(files[0]===undefined){
            setMessageErr("Une photo obligatoire")
            return
        }else if(!isPositiveInteger(productInfo.stock)){
            setMessageErr("Stockage doit être un numbre entier.") 
            return
        }else if(!isNumber([productInfo.price, productInfo.height, productInfo.width, productInfo.depth,productInfo.seat_depth,productInfo.seat_height,productInfo.stock])){
            setMessageErr("Le prix, stockage et les dimensions ne peuvent qu'être chiffre")  
            return
        }
        else if(messageErr.length > 0){
            return
        }
        
        dataFile.append('files', files[0], files[0].name)
        dataFile.append('name', productInfo.name)
        dataFile.append('description', productInfo.description)
        dataFile.append('collection_id', productInfo.collection_id)
        dataFile.append('stock', productInfo.stock)
        dataFile.append('material', productInfo.material)
        dataFile.append('price', productInfo.price)
        dataFile.append('height', productInfo.height)
        dataFile.append('width', productInfo.width)
        dataFile.append('depth', productInfo.depth)
        dataFile.append('seat_height', productInfo.seat_height)
        dataFile.append('seat_depth', productInfo.seat_depth)
        
        
        axios.post(`${BASE_URL}/admin/addProduct`, dataFile)
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
        setProductInfo(initialValue)
    }
    
    const handleChange = (e) => {
        setMessageErr("")
        if(!lengthLimit(productInfo.name, 100)){
            setMessageErr("Nom de produit est limité à 100 caractères") 
            
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
    
    return (
        <div className="container-admin">
            {isChangePage && <Navigate to="/admin/produits" replace={true} />}
            <div className="admin-header">
                <div>
                    <h2>Créer un nouveau produit</h2>
                    <p>meilleur proportion de photo est 3:4, tous les dimensions sont en centimètre. Les dimensions et le prix sont limités 2 chiffres décimals.</p>
                    {messageErr.length > 0 && <p  className="rounded py-2 px-4 bg-primary">{messageErr}</p>}
                </div>   
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data"
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <label htmlFor="name">Nom du produit: </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={productInfo.name} 
                    placeholder="Nom du produit" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="stock">Stockage: </label>
                <input 
                    type="number" 
                    id="stock" 
                    name="stock" 
                    value={productInfo.stock} 
                    placeholder="Stockage" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="material">Materiel: </label>
                <input 
                    type="text" 
                    id="material" 
                    name="material" 
                    value={productInfo.material} 
                    placeholder="Materiel"
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="price">Prix(€): </label>
                <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={productInfo.price} 
                    placeholder="Prix" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="collection_id">Collection: </label>
                <select name="collection_id" 
                    id="collection_id" 
                    onChange={(e)=> handleChange(e)} 
                    value={productInfo.collection_id}
                    className="text-gray-700 block"
                >
                <option value="">--Veillez choisir une collection--</option>
                    {collectionList.map((collection,i)=>{
                        return <option key={i} value={collection.id}>{collection.title}</option>
                    })}
                </select>
                <label htmlFor="hauteur">Hauteur(cm): </label>
                <input 
                    type="number" 
                    name="height" 
                    id="hauteur" 
                    value={productInfo.height} 
                    placeholder="Hauteur" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="width">Largeur(cm): </label>
                <input 
                    type="number" 
                    id="width" 
                    name="width" 
                    value={productInfo.width} 
                    placeholder="Largeur" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="depth">Profondeur(cm): </label>
                <input 
                    type="number" 
                    id="depth" 
                    name="depth" 
                    value={productInfo.depth} 
                    placeholder="Profondeur" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="seat_height">Hauteur de siège(cm): </label>
                <input 
                    type="number" 
                    id="seat_height" 
                    name="seat_height" 
                    value={productInfo.seat_height} 
                    placeholder="Hauteur de siège" 
                    onChange={(e)=>handleChange(e)} 
                />
                <label htmlFor="seat_depth">Profondeur de siège(cm): </label>
                <input 
                    type="number" 
                    id="seat_depth" 
                    name="seat_depth" 
                    value={productInfo.seat_depth} 
                    placeholder="Profondeur de siège" 
                    onChange={(e)=>handleChange(e)} 
                />
                
                <label htmlFor="descriptionProduct">Description: </label>
                <textarea 
                    name="description" 
                    id="descriptionProduct"
                    value={productInfo.description} 
                    placeholder="description" 
                    onChange={(e)=>handleChange(e)} 
                    rows="15" cols="33"
                />
                <label htmlFor="imgProduct">Produit image: </label>
                <div className="form-item">
                    <input type='file' name='img' id="imgProduct" 
                         className="file:bg-gray-500 hover:file:bg-gray-700 py-2 px-4 file:rounded focus:outline-none focus:shadow-outline text-gray-100"
                    />
                </div>
                <button type="submit"
                    className="py-2 px-4 rounded bg-gray-900 hover:bg-primary my-2"
                >
                    Valider
                </button>
            </form>
        </div>
    );
}

export default AddProduct

