import React from "react"

const StoreContext = React.createContext([])

const initialState = {
    user: {},
    isLogged: false,
    products:[],
    cartItems: [],
    cartSum:0,
    menuBurgerOpen: false
}

export {StoreContext, initialState}


