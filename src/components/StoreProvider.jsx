import { useReducer } from "react"
import { reducer } from "../tools/reducer.js"
import { initialState, StoreContext } from "../tools/context.js"

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

            return (
                <StoreContext.Provider value={[state, dispatch]}>
                    {children}
                </StoreContext.Provider>
            )
}

export default StoreProvider