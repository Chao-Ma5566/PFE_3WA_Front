import axios from "axios"
import {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom";
import {BASE_URL, BASE_IMG} from "../tools/constante.js"
import { NavLink, Navigate } from "react-router-dom"
import { StoreContext } from "../tools/context.js"

const Product = (props) => {
    const { productId } = useParams();
    const [state, dispatch] = useContext(StoreContext);
    const [productInfo, setProductInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [quantity, setQuantity] = useState(0)
    
    useEffect(() => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/getProductById`, { id: productId })
            .catch(err => console.log(err))
            .then(res => {
                setProductInfo(res.data.data.result[0])
        })
            .then(res => setIsLoading(false))
    }, [productId])
    
    const handleChange = (e) =>{
        if(e.target.value > productInfo.stock || e.target.value < 0){
            return
        }
        setQuantity(Number(e.target.value))
    }
    
    const incre = () =>{
        //check quantity in his chart
        if(quantity >= productInfo.stock){
            return
        }
        setQuantity(quantity+1)
    }
    const decre = () =>{
        if(quantity > 0){
            setQuantity(quantity-1)
        }
    }
    const addCart = () =>{
        if(quantity === 0){
            return
        }
        
        const productIndex = state.cartItems.findIndex(e=>e.id === Number(productId))
        if(productIndex === -1){
            let newProductList = state.cartItems
            const newData = {
                id: Number(productId), 
                url: productInfo.url, 
                stock: productInfo.stock, 
                name: productInfo.name,
                price: productInfo.price,
                quantity: quantity,
                caption:productInfo.caption
            }
            newProductList.push(newData)
            dispatch({type:"GET_CART_ITEMS", payload: newProductList})
        }else{
            let newProductList = state.cartItems
            newProductList[productIndex].quantity += quantity
            dispatch({type:"GET_CART_ITEMS", payload: newProductList})
        }
        
        axios.post(`${BASE_URL}/addCart`,{
            user_id: state.user.id, 
            product_id: Number(productId),
            quantity: quantity,
            cart_id: state.user.cart_id
        })
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        setQuantity(0)
    }
    
    if(isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <div className='md:max-w-[48rem] md:m-auto'>
            <div>
                <img src={`${BASE_IMG}/${productInfo.url}`} alt={productInfo.caption} />
            </div>
            <div className="px-4 py-2 md:-translate-y-52">
                <div className='mb-4 flex justify-between items-center'>
                    <h2 >{productInfo.name}</h2>
                    <h3>{productInfo.price} euros</h3>
                </div>
                <div className="flex flex-col my-4 ">
                    <div className="mb-4">
                        <button className="w-10 h-8 mr-2" onClick={decre}>-</button>
                        <input type="number" value={quantity} className="w-16 h-8 mr-2" onChange={handleChange}/>
                        <button className="w-10 h-8 " onClick={incre}>+</button> 
                        <span className="ml-2 text-xl">En stock: {productInfo.stock}</span>
                    </div>
                    <button className="w-24 bg-primary px-4 py-2" onClick={()=>{addCart()}}>Ajouter</button>
                </div>
                <div>
                    <p className="mb-4 md:mt-12"><span className="text-lg text-green-500">Matériel: </span>{productInfo.material}</p>
                    <p className="mb-4"><span className="text-lg text-green-500">Description: </span>{productInfo.description}</p>
                    <div className="max-w-96">
                        <table className="table-fixed border-collapse border border-gray-500 w-full">
                            <caption className='bg-neutral-50 border border-collapse border-gray-500 text-lg caption-top text-center w-full text-green-500'>
                                Dimension
                            </caption>
                            <tbody>
                                <tr>
                                  <td className='border border-gray-500'>Hauteur(cm): </td>
                                  <td className='border border-gray-500'>{productInfo.height}</td>
                                </tr>
                                <tr>
                                  <td className='border border-gray-500'>Largeur(cm): </td>
                                  <td className='border border-gray-500'>{productInfo.width}</td>
                                </tr>
                                <tr>
                                  <td className='border border-gray-500'>Profonteur(cm):</td>
                                  <td className='border border-gray-500'>{productInfo.depth}</td>
                                </tr>
                                <tr>
                                  <td className='border border-gray-500'>Hauteur de siège(cm):</td>
                                  <td className='border border-gray-500'>{productInfo.seat_height}</td>
                                </tr>
                                <tr>
                                  <td className='border border-gray-500'>Profonteur de siège(cm):</td>
                                  <td className='border border-gray-500'>{productInfo.seat_depth}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="my-4 md:my-0 md:mt-4"><span className="text-lg text-green-500">Garanti: </span>5 ans.</p>
                </div>
            </div>  
        </div>  
        )
}

export default Product