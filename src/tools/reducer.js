const reducer = (state, action) => {
    switch (action.type) {
        case "MENU_BURGER":

            return {
                ...state,
                menuBurgerOpen: !state.menuBurgerOpen
            }
        case "LOGIN":

            return {
                ...state,
                user: action.payload,
                isLogged: true
            }
        case "LOGOUT":

            return {
                ...state,
                user: {},
                isLogged: false,
                products:[],
                cartItems: [],
                cartSum: 0
            }

        case "PRODUCTLIST":

            return {
                ...state,
                products: action.payload,
            }
        
        case "GET_CART_ITEMS":
            let sum = 0 
            state.cartItems.forEach(item => {
                sum += Number(item.quantity)
            })
            return {
                ...state,
                cartItems: action.payload,
                cartSum: sum,
            }
            
        default:
            return state
    }
}

export { reducer }
