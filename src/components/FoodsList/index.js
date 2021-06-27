import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFoods } from "../../store/foodReducer"
import { useParams } from "react-router"


export function FoodsList(){
  const dispatch = useDispatch()
  const { restaurantId } = useParams()
  const userKind = localStorage.getItem("userKind")

  useEffect(() => {
    userKind === "restaurant" && dispatch(getFoods(restaurantId))
  },[dispatch, userKind, restaurantId])

  const { foods, loading, error } = useSelector(
    ({ foodReducer}) => ({
      foods: foodReducer.foods,
      loading: foodReducer.loading,
      error: foodReducer.error,
    })
  )
  if (loading) return <p>Cargando Alimentos disponibles...</p>
  if (error) return <p>Algo salió mal</p>

  return(
    <div>
      <h2>Estos son tus alimentos</h2>
      {foods && foods.length > 0 &&
        foods.map(({foodName, foodLabel, foodPrice, _id}) => {
          return (
            <div>
              <span>
                <strong>Nombre:</strong> {foodName}
              </span>
              <br />
              <span>
                <strong>Tipo:</strong> {foodLabel}
              </span>
              <br />
              <span>
                <strong>Precio:</strong> {foodPrice}
              </span>
              <button>Editar</button>
            </div>
          )
        })
      }
    </div>
  )
}