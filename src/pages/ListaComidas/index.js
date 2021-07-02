import React from 'react'
import Header from '../../components/Header'
import { FoodsList } from '../../components/FoodsList'


export default function ListaComidas(){

  return(
    <>
      <Header/>
      <main>
        <FoodsList/>
      </main>
    </>
  )
}