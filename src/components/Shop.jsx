import {BASE_IMG, BASE_URL} from "../tools/constante.js"
import {useContext, useEffect, useState} from 'react'

import { NavLink } from "react-router-dom"
import ProductCard from "./ProductCard.jsx"
import SearchBar from "./SearchBar.jsx";
import { StoreContext } from "../tools/context.js"
import axios from 'axios'

const Shop = () =>{
    const [productList, setProductList] = useState([])
    const [state, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(!state.isLogged){
            setIsLoading(true)
            axios.get(`${BASE_URL}/products`)
            .then(function(response) {
                setProductList(response.data.data.result);
            })
            .catch(function(error) {
                console.log(error);
            })
            .then(
                setIsLoading(false)
            )
        }else{
            setIsLoading(true)
            axios.get(`${BASE_URL}/relogged`)
                .then(function(res) {
                    setProductList(res.data.products);
                    dispatch({type:"LOGIN", payload:res.data.result})
                    dispatch({type:"GET_CART_ITEMS", payload:res.data.cart})   
                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(
                setIsLoading(false))
        }
    }, [])

    const fetchProducts = (filters = {}) => {
        setIsLoading(true);
        let query = `${BASE_URL}/products`;
        let params = [];
        
        if (filters.query) params.push(`name=${filters.query}`);
        if (filters.collection) params.push(`collection=eq.${filters.collection}`);
        if (filters.minPrice) params.push(`price=gt.${filters.minPrice}`);
        if (filters.maxPrice) params.push(`price=lt.${filters.maxPrice}`);

        if (params.length > 0) {
            query += `?${params.join('&')}`;
        }

        axios.get(query)
            .then((response) => {
                setProductList(response.data.data.result);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const handleSearch = (filters) => {
        fetchProducts(filters);
    };
    
    if(isLoading){
        return <div>Loading...</div>
    }
    
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {
                productList.length > 0 ?
            
            <div className="w-full pt-4 max-w-screen overflow-hidden h-full px-4 grid grid-cols-1 lg:grid-cols-4 gap-2 overscroll-auto md:grid-cols-2 min-h-screen">
                {productList.map((product,i)=>{
                return <ProductCard 
                        data={product}
                        key={i}
                        index={i}
                        />
                })}
            </div>:
            <div className="items-center justify-center min-h-screen text-center text-4xl mt-24">Pas de produit adapté à vos critères.</div>
            } 
        </div>   
    )
}

export default Shop