import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFoods } from "../../store/foodReducer"
import { useParams } from "react-router"
import "./styles.css"


export function FoodsList(){
  const dispatch = useDispatch()
  const { restaurantId } = useParams()

  useEffect(() => {
    dispatch(getFoods(restaurantId))
  },[dispatch, restaurantId])

  const { foods, loading, error } = useSelector(
    ({ foodReducer}) => ({
      foods: foodReducer.foods,
      loading: foodReducer.loading,
      error: foodReducer.error,
    })
  )
  if (loading) return <p>Cargando Alimentos disponibles...</p>
  if (error) return <p>Algo salió mal</p>
  console.log({foods})

  return(
    <div className="foodList">
      <h2 className="tittleList">Estos son tus alimentos</h2>
      {foods && foods.length > 0 &&
        foods.map(({foodName, foodLabel, foodPrice, _id}) => {
          return (
            <div key={_id} className="foodsCard">
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