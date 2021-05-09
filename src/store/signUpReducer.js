const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_EMAIL = 'CHANGE_EMAIL'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
const CHANGE_PASSWORD_CONFIRM = 'CHANGE_PASSWORD_CONFIRM'
const CHANGE_DIRECTION = 'CHANGE_DIRECTION'
const CHANGE_PHONE = 'CHANGE_PHONE'
const CHANGE_USERTYPE = 'CHANGE_USERTYPE'
const CHANGE_ERROR = 'CHANGE_ERROR'


export function changeName(value){
  return {
    type: CHANGE_NAME,
    payload: value,
  }
}

export function changeEmail(value){
  return {
    type: CHANGE_EMAIL,
    payload: value,
  }
}

export function changePassword(value){
  return {
    type: CHANGE_PASSWORD,
    payload: value,
  }
}

export function changePasswordConfirm(value){
  return {
    type: CHANGE_PASSWORD_CONFIRM,
    payload: value,
  }
}

export function changeDirection(value){
  return {
    type: CHANGE_DIRECTION,
    payload: value,
  }
}

export function changePhone(value){
  return {
    type: CHANGE_PHONE,
    payload: value,
  }
}

export function changeUserType(value){
  return {
    type: CHANGE_USERTYPE,
    payload: value,
  }
}

export function changeError(value){
  return {
    type: CHANGE_ERROR,
    payload: value,
  }
}

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  direction: '',
  phone: '',
  userType: '',
  error: '',
}

export function signUpReducer (state = initialState, action){
  switch(action.type){
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      }
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      }
    case CHANGE_PASSWORD_CONFIRM:
      return {
        ...state,
        passwordConfirm: action.payload,
      }
    case CHANGE_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      }
    case CHANGE_PHONE:
      return {
        ...state,
        phone: action.payload,
      }
    case CHANGE_USERTYPE:
      return {
        ...state,
        userType: action.payload,
      }
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}