import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import { useContext, useState } from 'react'
import { NavLink, Navigate } from "react-router-dom"
import { StoreContext } from "../tools/context.js"
import axios from "axios"

const CartCardMoblie = ({ product, index }) => {
    
    const [state, dispatch] = useContext(StoreContext);

    const incre = (index) =>{
        //check quantity in his chart
        if(product.quantity >= product.stock){
            return
        }
        let newList = state.cartItems
        newList[index].quantity = newList[index].quantity + 1
        console.log(newList)
        dispatch({ type: "GET_CART_ITEMS", payload: newList});
        axios.post(`${BASE_URL}/addCart`,{
            user_id: state.user.id, 
            product_id: product.id,
            cart_id: state.user.cart_id, 
            quantity: 1
        })
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    
    const deleteProduct = ()=>{
        let newList = state.cartItems
        newList = newList.filter(item=>item.id !==product.id)
        dispatch({ type: "GET_CART_ITEMS", payload: newList});
            axios.post(`${BASE_URL}/deleteProductCart`,{
            cart_id: state.user.cart_id, 
            product_id: product.id,
        })
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
    }
    const decre = (index) =>{
        //if quantity === 0
        if(product.quantity ===1 ){
            deleteProduct()
        }else{
            let newList = state.cartItems
            newList[index].quantity = newList[index].quantity - 1
            console.log(newList)
            dispatch({ type: "GET_CART_ITEMS", payload: newList});
            axios.post(`${BASE_URL}/addCart`,{
                user_id: state.user.id, 
                product_id: product.id,
                cart_id: state.user.cart_id, 
                quantity: -1
            })
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }    
    }


    return (
        <div className="rounded overflow-hidden">
           <div>
                <NavLink className="text-center w-auto" to={`/product/${product.id}`}>
                    <img className="object-contain w-full h-full" 
                     src={`${BASE_IMG}/${product.url}`} alt={product.caption} />
                </NavLink>
            </div>
            <div className="bg-gray-100 p-2">
                 <NavLink className="text-lg text-center w-auto" to={`/product/${product.id}`}>
                     <p>{product.name}</p>
                 </NavLink>
                 <div className="flex flex-cols mt-4 justify-between items-center">
                    <div >
                         <button className="inline-block py-2 px-4 rounded bg-gray-900 hover:bg-primary text-gray-100" onClick={()=>decre(index)}>-</button>
                         <p className="inline-block m-2">{product.quantity}</p>
                         <button className="inline-block py-2 px-4 rounded bg-gray-900 hover:bg-primary text-gray-100" onClick={()=>incre(index)}>+</button>
                    </div>
                    <div  className="">
                        <p>Prix: {(product.quantity*product.price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                    </div>
                    <div className="">
                        <span>Supprimer: </span>
                        <button onClick={deleteProduct} className="py-2 px-4 rounded bg-gray-900 hover:bg-primary">X</button>
                    </div>
                 </div>
            </div>
            
        </div>
    )
}

export default CartCardMoblie
