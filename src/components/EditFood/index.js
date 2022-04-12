import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getFood } from "../../store/foodReducer"
import FormInputs from "../formInputs"



export default function EditFood(){
  const dispatch = useDispatch()
  const { _id } = useParams()

  useEffect(() => {
    dispatch(getFood(_id))
  },[dispatch, _id])

  const { food } = useSelector(({ foodReducer }) => ({
    food: foodReducer.food.food,
  }))
  console.log(food)

  return(
    <div>
      <h1>Edit food in process</h1>
    </div>
  )
}

