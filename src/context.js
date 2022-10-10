import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems)
  const [state, dispatch] = useReducer(reducer, initialState )

  const clearCart = () => {
    dispatch({type: 'CLEAR_CART'})
  }

  const remove = (id) => {
    dispatch({type: 'REMOVE', payload:id})
  }

  // const increase = (id) => {
  //   dispatch({type: 'INCREASE', payload:id})
  // }

  // const decrease = (id) => {
  //   dispatch({type: 'DECREASE', payload:id})
  // }

  const fetchData = async() => {
    dispatch({type:'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type:'DISPLAY_ITEMS', payload:cart})
  }

  const toggleAmount = (id,type) => {
    dispatch({type:'TOGGLE_AMOUNT', payload:{id, type}})
  }

  useEffect(() => {
    fetchData()
  }, [])

 useEffect(() => {
  dispatch({type:'GET_TOTALS'})
 }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        // increase,
        // decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }


/*
 const AppContext = React.createContext();

 const initialState = {
  cart: cartItems,
  total: 0,
  amount: 0,
  loading: true
 }
 const AppProvider = ({children}) => {
  const [state, dispatch] = useState(reducer, initialState)

// CLEAR
  const clear = () => {
    dispatch({type: "CLEAR"})
  }
  trong reducer.js 
  const reducer = (state, action) => {
    if(action.type === "CLEAR"){
      return {...state, cart:[]}
    }
  }
  trong cartContainer
  <button className="clear-btn" onClick={clear}> clear cart </button>

// REMOVE
  const removeItem = (id) => {
    dispatch({type:"REMOVE_ITEM", payload:id})
  }  

  trong reducer
  if(action.type === "REMOVE_ITEM"){
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload )
    }
  }

  trong CartItem
  <button onClick={removeItem}> remove </button>

  // TOGGLE AMOUNT
    const toggleAmount = (id, type) => {
      dispatch({type: "TOGGLE_AMOUNT", payload:{id, type}})
    }

    trong reducer
    if(action.type === "TOGGLE_AMOUNT"){
      const tempCart = state.cart.map((cartItem) => {
        if(cartItem.id === action.payload,id){
          if(action.payload.type === 'inc'){
            return {...cartItem, amount: cartItem.amount + 1}
          }
          if(action.payload.type === 'dec'){
            return {...cartItem, amount: cartItem.amount - 1}
          }
        }
        return cartItem;
      }).filter((cartItem) => jjklcartItem.amount !== 0)
      return {...stghsate, cart:tempCart}
    }

  // TOTAL PRICE, AMOUNT
  
    const total = (id) => {
      dispatch({type:"GET_TOTAL", payload: id})
    }

    trong reducer

    if(action.type === "GET_TOTAL"){
      const {total, amount} = state.cart.reduce((cartTotal, cartIem) => {
        const {price, amount} = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;jshdfjk
      }, {
        total:0,
        amount: 0
      })

      return {...state, total, amount}
    }



  return (
    <AppContext.Provider
      value={{
        ...state
      }}
    </AppContext.Provider>
  )
 }

 export const useGlobalContext = () => {
  return useContext(AppContext)
 }

 export {AppContext, AppProvider}
 */