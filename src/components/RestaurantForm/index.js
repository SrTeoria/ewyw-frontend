import axios from "axios"
import Button from "../Button"
import Select from "../SelectInputs"
import FormInputs from "../formInputs"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  changeError,
  changeFoodCategory,
  getRestaurant,
} from "../../store/restaurantReducer"
import { getFoods } from "../../store/foodReducer"
import CreateFood from "../CreateFood"
import CreateOrder from "../CreateOrder"
import { useParams } from "react-router"
import "./styles.css"

export default function RestaurantForm() {

  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const userKind = localStorage.getItem("userKind")

  const [name, setName] = useState()
  const [direction, setDirection] = useState()
  const [phone, setPhone] = useState()

  useEffect(() => {
    userKind === "client" && dispatch(getFoods(restaurantId))
    userKind === "restaurant" && dispatch(getRestaurant())
  }, [dispatch, restaurantId, userKind])

  const {
    foodLabel,
    foodName,
    foodCategory,
    foodPrice,
    foods,
    restaurant,
    restaurantName,
    restaurantDirection,
    restaurantPhone
  } = useSelector(({ restaurantReducer, foodReducer, signUpReducer }) => ({

    foodName: restaurantReducer.foodName,
    foodLabel: restaurantReducer.foodLabel,
    foodCategory: restaurantReducer.foodCategory,
    foodPrice: restaurantReducer.foodPrice,
    foods: foodReducer.foods,
    restaurant: restaurantReducer.restaurant,
    restaurantName: signUpReducer.name,
    restaurantDirection: signUpReducer.direction,
    restaurantPhone: signUpReducer.phone
  }));

  console.log(restaurant)

  const [edit, setEdit] = useState(false)
  const [createFood, setCreateFood] = useState(false)


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "POST",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/foods/createFood",
        data: {
          foodCategory,
          foodName,
          types: {
            foodLabel,
            foodPrice,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      dispatch(changeError(error.message))
    }
  }

  async function saveChanges(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token")
      await axios({
        method: "PUT",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/restaurants/restaurantprofile",
        data: {
          name,
          direction,
          phone,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEdit(false)
      dispatch(getRestaurant())
    } catch (error) {
      dispatch(changeError(error.message))
    }
  }

  return (
    <div className="backgroundImage">
      <div>
        <form className="restaurantProfile">
          <h2 className="tittleProfile">Perfil</h2>
          <div className="inputsProfile">
            {edit === true && !!restaurant ? (
              <>
                <FormInputs
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                >
                  Nombre
                </FormInputs>
                <FormInputs
                  id="direction"
                  type="text"
                  name="direction"
                  onChange={(e) => setDirection(e.target.value)}
                  value={direction}
                >
                  Dirección
                </FormInputs>
                <FormInputs
                  id="phone"
                  type="number"
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                >
                  Celular
                </FormInputs>
              </>
            ) :
            // (
            //   <>
            //     <label>
            //       <span className="dateProfile">Nombre:</span> {restaurant && restaurant.name}
            //     </label>
            //     <label>
            //       <span className="dateProfile">Direccion:</span> {restaurant && restaurant.direction}
            //     </label>
            //     <label>
            //       <span className="dateProfile">Celular:</span> {restaurant && restaurant.phone}
            //     </label>
            //   </>
            // )
            restaurant === null ? (
              <>
                <label>
                  <span className="dateProfile">Nombre:</span> {restaurantName && restaurantName}
                </label>
                <label>
                  <span className="dateProfile">Direccion:</span> {restaurantDirection && restaurantDirection}
                </label>
                <label>
                  <span className="dateProfile">Celular:</span> {restaurantPhone && restaurantPhone}
                </label>
              </>
            ) : (
              <>
                <label>
                  <span className="dateProfile">Nombre:</span> {restaurant && restaurant.name}
                </label>
                <label>
                  <span className="dateProfile">Direccion:</span> {restaurant && restaurant.direction}
                </label>
                <label>
                  <span className="dateProfile">Celular:</span> {restaurant && restaurant.phone}
                </label>
              </>
            )
            }
          </div>
          {edit === false && restaurant &&  userKind === "restaurant" && (
            <>
              <Button
                className="buttonRestaurantProfile"
                type="button"
                handleClick={() => {
                  setName(restaurant.name)
                  setDirection(restaurant.direction)
                  setPhone(restaurant.phone)
                  setEdit(true)
                }}
              >
                Editar perfil
              </Button>
              <a href={`/foodslist/${restaurant._id}`}>
                <Button
                  className="buttonRestaurantProfile"
                  type="button"
                >
                  Editar mis comidas
                </Button>
              </a>
            </>
          )}
          {edit === true && restaurant && (
            <>
              <Button type="button" handleClick={saveChanges}>
                Guardar cambios
              </Button>
              <Button
                type="button"
                handleClick={() => {
                  setEdit(false)
                  setName(restaurant.name)
                  setDirection(restaurant.direction)
                  setPhone(restaurant.phone)
                }}
              >
                Cancelar
              </Button>
            </>
          )}
        </form>
      </div>

      {userKind === "restaurant" && (
        <div>
          <form className="restaurantProfile" onSubmit={handleSubmit}>
            <h2 className="tittleProfile">Crear Producto</h2>
            <div className="inputsProfile">
              <Button
                className="buttonCreateProduct"
                type="button"
                handleClick={() => setCreateFood(!createFood)}
              >
                Crear producto
              </Button>
              {createFood === true && (
                <>
                  <Select
                    id="selectFood"
                    label="Seleccionar Alimento"
                    type="foodName"
                    onChange={(e) =>
                      dispatch(changeFoodCategory(e.target.value))
                    }
                    options={[
                      { _id: "Proteina", foodName: "Proteina" },
                      { _id: "Carbohidrato", foodName: "Carbohidrato" },
                      { _id: "Vegetales", foodName: "Vegetales" },
                      { _id: "Bebidas", foodName: "Bebidas" },
                    ]}
                  />
                  {foodCategory === "Proteina" && <CreateFood />}
                  {foodCategory === "Carbohidrato" && <CreateFood />}
                  {foodCategory === "Vegetales" && <CreateFood />}
                  {foodCategory === "Bebidas" && <CreateFood />}
                </>
              )}
            </div>
          </form>
        </div>
      )}

      {userKind === "client" && (
        <div className="createOrder">
          <h2 className="tittleProfile">Realiza tu pedido</h2>
          <div className="inputsCreateOrder">
            <div>
              <CreateOrder foods={foods} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
