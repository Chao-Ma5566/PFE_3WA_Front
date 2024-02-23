import {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { StoreContext } from "../tools/context.js"
import {BASE_URL, BASE_IMG} from "../tools/constante.js"
import { NavLink } from "react-router-dom"
import CartCard from "./CartCard.jsx"
import CartCardMoblie from "./CartCardMoblie.jsx"

const Cart = () => {
    const [state, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(true)
    const [viewWidth, setViewWidth] = useState(window.innerWidth)
    
    useEffect( () => {
            setIsLoading(false)
    }, []);
    
    useEffect(() => {
        if (!isLoading) {
            let checkQuantity = false
            let newList = state.cartItems.map(item => {
                if (item.quantity > item.stock) {
                    checkQuantity = true
                    axios.post(`${BASE_URL}/addCart`,{
                        user_id: state.user.id, 
                        product_id: item.id,
                        cart_id: state.user.cart_id, 
                        quantity: item.stock-item.quantity
                    })
                    return { ...item, quantity: item.stock }
                } else {
                    return item
                }
            })
            if (checkQuantity) {
                dispatch({ type: "GET_CART_ITEMS", payload: newList });
            }
        }
    }, [state.cartItems, dispatch, isLoading]);
    
    useEffect(()=>{
        const changeWidth = () => {
            setViewWidth(window.innerWidth)
        }
        
        window.addEventListener("resize", changeWidth)
        
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [viewWidth])
    
    const getCartSum =  () => {
        let sum = 0
        state.cartItems.forEach(item=>{
            sum += item.quantity*item.price
        })
        return sum.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
    }
    
    
    if(isLoading){
        // return <div>{!state.is Logged && <Navigate to="/login" replace={true} />}Loading...</div>
        return <div>Loading</div>
    }
    
    if(state.cartItems.length === 0){
        return (
            <div className="text-center flex flex-col items-center pt-36 h-full w-full mb-96">
                <h1>Vous n'avez pas encore de produit dans votre panier.</h1>
                <NavLink className="text-center mb-12" to={`/shop`}>
                    <p className="bg-primary py-4 px-6 rounded mt-6">Visitez notre E-Commerce</p>
                </NavLink>
            </div>    
        )
    }
    
    return (
        <section>
        {viewWidth >= 768 ? (
        <div className="px-4 min-h-full w-full mt-20">
            <div className="border-b-2 border-gray-100 mb-4 py-8">
                <h2>Votre Panier: </h2>
            </div>
            <table className="table-fixed w-full text-sx max-h-96 md:text-base">
              <thead className="">
                <tr className="bg-neutral-100 rounded overflow-hidden">
                  <th className="py-4 text-lg">Photo</th>
                  <th className="py-4 text-lg">Nom du produit</th>
                  <th className="py-4 text-lg">Quantité</th>
                  <th className="py-4 text-lg">Prix</th>
                  <th className="py-4 text-lg">Supprimer</th>
                </tr>
              </thead>
              <tbody className="overscroll-auto overflow-y-scroll">
              {state.cartItems.map((product, i) => {
                    return (
                        <CartCard product={product} index={i} key={i}/>
                )})}
              </tbody>
              <tfoot className="bottom-0 py-8 rounded overflow-hidden">
                <tr className="bg-gray-100 rounded overflow-hidden py-2">
                    <td className="rounded overflow-hidden" ></td>
                    <td ></td>
                    <td className="text-center">Total:</td>
                    <td className="text-center">{getCartSum()}</td>
                    <td className="text-center py-2 px-2 rounded bg-primary text-gray-100 my-2 hover:bg-gray-800">Commander</td>
                </tr>
            </tfoot>
            </table>
        </div>
        ):(
            <div className="px-4 min-h-full w-full mt-12">
                <div className="border-b-2 border-gray-100 mb-4 py-8">
                    <h2>Votre Panier: </h2>
                </div>
                <div className="flex flex-col gap-y-2">
                     {state.cartItems.map((product, i) => {
                        return (
                            <CartCardMoblie product={product} index={i} key={i}/>
                    )})}
                </div>
                <div className="w-full flex justify-around items-center">
                    <p className="text-lg">Total:<span className="ml-4">{getCartSum()}</span></p>
                    <button className="text-center py-2 px-2 rounded bg-primary text-gray-100 my-2 hover:bg-gray-800">Commander</button>
                </div>
            </div>
        )}
        </section>
    )   
}    

export default Cart