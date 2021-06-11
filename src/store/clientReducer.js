import axios from 'axios'
//import { history } from '../utils/history'
const CLIENT_LOADING = 'CLIENT_LOADING'
const CLIENT_ERROR = 'CLIENT_ERROR'
const CLIENT_LOADED = 'CLIENT_LOADED'
const CLIENT_FINISHED = 'CLIENT_FINISHED'

export function getClient(){
  return async function(dispatch){
    dispatch({ type: CLIENT_LOADING})
    dispatch({ type: CLIENT_ERROR, payload: ''})
    try {
      const token = localStorage.getItem('token')

      const {data} = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/clients/client',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      dispatch({ type: CLIENT_LOADED, payload: data.client})
    } catch (error){
        dispatch({ type: CLIENT_ERROR, payload: error.message })
        /*if(error.response !== undefined && error.message.request.status && error.message.request.status === 401){
          localStorage.removeItem('token')
          alert('Su sesión expiró, ingrese nuevamente')
          history.pushState('/landingpage')
        }*/
    } finally {
        dispatch({ type: CLIENT_FINISHED })
    }
  }
}


const initialState = {
  client: {},
}

export function clientReducer(state = initialState, action){
  switch(action.type){
    case CLIENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case CLIENT_LOADED:
      return {
        ...state,
        client: action.payload,
      }
    case CLIENT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CLIENT_FINISHED:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}