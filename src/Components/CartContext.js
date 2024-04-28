import React, { useContext, createContext, useReducer } from 'react'
const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, image: action.image, quantity: action.quantity, size: action.size }]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.quantity, parseInt(action.quantity), action.price + food.price)
                    arr[index] = { ...food, quantity: parseInt(action.quantity) + parseInt(food.quantity), price: action.price + food.price }
                }
                return arr
            })
            return arr
        case "DROP":
            let emptyArray = []
            return emptyArray
        default:
            console.log("Error in reducer")

    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (

        <cartStateContext.Provider value={state}>
            <cartDispatchContext.Provider value={dispatch}>
                {children}
            </cartDispatchContext.Provider>
        </cartStateContext.Provider>

    )
}

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);