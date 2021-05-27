import axios from "axios";
import { history } from "../utils/history";

const CHANGE_NAME = "CHANGE_NAME";
const CHANGE_DIRECTION = "CHANGE_DIRECTION";
const CHANGE_PHONE = "CHANGE_PHONE";
const CHANGE_FOODCATEGORY = "CHANGE_FOODCATEGORY";
const CHANGE_FOODNAME = "CHANGE_FOODNAME";
const CHANGE_FOODLABEL = "CHANGE_FOODLABEL";
const CHANGE_FOODPRICE = "CHANGE_FOODPRICE";
const CHANGE_ERROR = "CHANGE_ERROR";
const RESTAURANTS_LOADING = "RESTAURANTS_LOADING";
const RESTAURANTS_SUCCESS = "RESTAURANTS_SUCCESS";
const RESTAURANT_SUCCESS = "RESTAURANT_SUCCESS";
export const RESTAURANTS_ERROR = "RESTAURANTS_ERROR";
const RESTAURANTS_FINISHED = "RESTAURANTS_FINISHED";
export const SAVE_RESTAURANT = "SAVE_RESTAURANT";

export function getRestaurant() {
  return async function (dispatch) {
    dispatch({ type: RESTAURANTS_LOADING });
    dispatch({ type: RESTAURANTS_ERROR });
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/restaurants/restaurant",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: RESTAURANT_SUCCESS, payload: data });
      dispatch({ type: CHANGE_NAME, payload: data.name });
      dispatch({ type: CHANGE_DIRECTION, payload: data.direction });
      dispatch({ type: CHANGE_PHONE, payload: data.phone });
    } catch (error) {
      dispatch({ type: RESTAURANTS_ERROR, payload: error });
      if (
        error.response !== undefined &&
        error.response.request.status === 401
      ) {
        localStorage.removeItem("token");
        alert("Su sesión expiró, ingrese nuevamente.");
        history.push("/landingpage");
      }
    } finally {
      dispatch({ type: RESTAURANTS_FINISHED });
    }
  };
}

export function getRestaurantPublic(restaurantId) {
  return async function (dispatch) {
    dispatch({ type: RESTAURANTS_LOADING });
    dispatch({ type: RESTAURANTS_ERROR });
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/restaurants/restaurant/${restaurantId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: RESTAURANT_SUCCESS, payload: data.restaurant });
      dispatch({ type: CHANGE_NAME, payload: data.restaurant.name });
      dispatch({ type: CHANGE_DIRECTION, payload: data.restaurant.direction });
      dispatch({ type: CHANGE_PHONE, payload: data.restaurant.phone });
    } catch (error) {
      dispatch({ type: RESTAURANTS_ERROR, payload: error });
      if (
        error.response !== undefined &&
        error.response.request.status === 401
      ) {
        localStorage.removeItem("token");
        alert("Su sesión expiró, ingrese nuevamente.");
        history.push("/landingpage");
      }
    } finally {
      dispatch({ type: RESTAURANTS_FINISHED });
    }
  };
}

export function getRestaurants() {
  return async function (dispatch) {
    dispatch({ type: RESTAURANTS_LOADING });
    dispatch({ type: RESTAURANTS_ERROR, payload: "" });
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios({
        method: "GET",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/restaurants",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: RESTAURANTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: RESTAURANTS_ERROR, payload: error });
      if (
        error.response !== undefined &&
        error.response.request.status === 401
      ) {
        localStorage.removeItem("token");
        alert("Su sesión expiró, ingrese nuevamente.");
        history.push("/signin");
      }
    } finally {
      dispatch({ type: RESTAURANTS_FINISHED });
    }
  };
}

export function changeName(value) {
  return {
    type: CHANGE_NAME,
    payload: value,
  };
}

export function changeDirection(value) {
  return {
    type: CHANGE_DIRECTION,
    payload: value,
  };
}

export function changePhone(value) {
  return {
    type: CHANGE_PHONE,
    payload: value,
  };
}

export function changeFoodCategory(value) {
  return {
    type: CHANGE_FOODCATEGORY,
    payload: value,
  };
}

export function changeFoodName(value) {
  return {
    type: CHANGE_FOODNAME,
    payload: value,
  };
}

export function changeFoodLabel(value) {
  return {
    type: CHANGE_FOODLABEL,
    payload: value,
  };
}

export function changeFoodPrice(value) {
  return {
    type: CHANGE_FOODPRICE,
    payload: value,
  };
}

export function changeError(value) {
  return {
    type: CHANGE_ERROR,
    payload: value,
  };
}

const initialState = {
  name: "",
  direction: "",
  phone: "",
  foodCategory: "",
  foodName: "",
  foodLabel: "",
  foodPrice: "",
  error: "",
  loading: false,
  restaurant: {},
  restaurants: [],
};

export function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      };
    case CHANGE_PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case CHANGE_FOODCATEGORY:
      return {
        ...state,
        foodCategory: action.payload,
      };
    case CHANGE_FOODNAME:
      return {
        ...state,
        foodName: action.payload,
      };
    case CHANGE_FOODLABEL:
      return {
        ...state,
        foodLabel: action.payload,
      };
    case CHANGE_FOODPRICE:
      return {
        ...state,
        foodPrice: action.payload,
      };
    case RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurant: action.payload,
      };
    case RESTAURANTS_SUCCESS:
      return {
        ...state,
        restaurants: action.payload,
      };
    case CHANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RESTAURANTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case RESTAURANTS_FINISHED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
