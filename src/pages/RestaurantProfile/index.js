import React, { useEffect } from 'react'
import  Header  from '../../components/Header'
import RestaurantForm from '../../components/RestaurantForm'
import { useParams } from 'react-router'
import { getRestaurantPublic } from '../../store/restaurantReducer'
import { useDispatch } from 'react-redux'


export default function RestaurantProfile(){

  const { restaurantId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRestaurantPublic(restaurantId))
  },[dispatch, restaurantId])

  return(
    <>
      <Header/>
      <main>
        <RestaurantForm />
      </main>
    </>
  )
}