import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFoods } from "../../store/foodReducer"
import { useParams } from "react-router"
import Button from "../Button"
import { FoodsTypesList } from "../FoodsTypeList"
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

  return(
    <div className="foodList">
      <h2 className="tittleList">Estos son tus alimentos</h2>
      <div className="foodList-list">
        {
          foods.map(({foodName, _id, types}) => {
            return (
              <div key={_id} className="foodsCard">
                <a href={`/foodsedit/${_id}`}>
                  <Button>Editar</Button>
                </a>
                <span>
                  <strong>Nombre:</strong> {foodName}
                </span>
                <FoodsTypesList types={types} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
