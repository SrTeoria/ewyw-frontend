import axios from 'axios'
import { CHANGE_FOODLABEL, CHANGE_FOODNAME, CHANGE_FOODPRICE } from './restaurantReducer'

const FOODS_LOADING = 'FOODS_LOADING'
const FOODS_SUCCESS = 'FOODS_SUCCESS'
const FOODS_ERROR = 'FOODS_ERROR'
const FOODS_FINISH = 'FOODS_FINISH'
const FOOD_SUCCESS = 'FOOD_SUCCESS'

export function getFoods(restaurantId){
  return async function(dispatch){
    dispatch({ type: FOODS_LOADING })
    try {
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/foods/${restaurantId}`
      })
      dispatch({ type: FOODS_SUCCESS, payload: data})
    } catch(error){
      dispatch({ type: FOODS_ERROR, payload: error})
    } finally{
      dispatch({ type: FOODS_FINISH })
    }
  }
}

export function getFood(foodId){
  return async function(dispatch){
    dispatch({ type: FOODS_LOADING })
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/foods/getFood/${foodId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      dispatch({ type: FOOD_SUCCESS, payload: data})
      dispatch({ type: CHANGE_FOODNAME, payload: data.foodName})
      dispatch({ type: CHANGE_FOODLABEL, payload: data.foodLabel})
      dispatch({ type: CHANGE_FOODPRICE, payload: data.foodPrice})
      console.log(data)
    } catch(error){
      dispatch({ type: FOODS_ERROR, payload: error})
    } finally {
      dispatch({ type: FOODS_FINISH})
    }
  }
}


const initialState = {
  foods: [],
  food: {},
  loading: false,
  error: null,
}

export function foodReducer(state = initialState, action){
  switch(action.type){
    case FOODS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
      }
    case FOOD_SUCCESS:
      return {
        ...state,
        food: action.payload,
      }
    case FOODS_ERROR:
      return {
        ...state,
        foods: action.payload,
      }
    case FOODS_FINISH:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

