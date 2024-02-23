import {BASE_URL, BASE_IMG} from "../tools/constante.js"
import {useContext,useState} from 'react'
import { NavLink, Navigate } from "react-router-dom"
import { StoreContext } from "../tools/context.js"
import axios from "axios"

const ProductCard = ({data, index})=>{
    const [quantity, setQuantity] = useState(0)
    const [state, dispatch] = useContext(StoreContext);
    const [isChange, setIsChange] = useState(false)
    
    const handleChange = (e) =>{
        if(e.target.value > data.stock || e.target.value < 0){
            return
        }
        setQuantity(Number(e.target.value))
    }
    
    const incre = () =>{
        //check quantity in his chart
        if(quantity >= data.stock){
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
        
        if(!state.isLogged){
            setIsChange(true)
            return
        }else if(quantity === 0){
            return
        }
        
        const productIndex = state.cartItems.findIndex(product=>
            product.id === data.id
        )
        if(productIndex === -1){
            let newProductList = state.cartItems
            const newData = {
                id: data.id, 
                url: data.url, 
                stock: data.stock, 
                name: data.name,
                price: data.price,
                quantity: quantity,
                caption:data.caption
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
            product_id: data.id,
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
    
    return (
        <div className="rounded overflow-hidden">
        {isChange && <Navigate to="/login" replace={true} />}
            <div>
                <NavLink className="text-center" to={`/product/${data.id}`}>
                    <img className="object-contain w-full h-full" 
                        src={`${BASE_IMG}/${data.url}`} alt={data.caption} />
                </NavLink>
            </div>
            <div className="bg-gray-100 p-2">
                <h5>
                    {data.name}
                </h5>
                <div>
                    <div className="flex flex-cols justify-between">
                        <div>
                            <button className="w-10 h-8" onClick={decre}>-</button>
                            <input type="number" value={quantity} className="w-16 h-8" onChange={handleChange}/>
                            <button className="w-10 h-8" onClick={incre}>+</button>
                            
                        </div>
                        <button onClick={()=>{addCart()}}>Ajouter</button>
                    </div>
                    <div>
                        <p>En stock: {data.stock}</p>
                        <h5>Prix: {data.price}€</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard