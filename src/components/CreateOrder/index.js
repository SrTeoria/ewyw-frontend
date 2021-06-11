import Button from "../Button/index"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getClient } from "../../store/clientReducer"
import Select from "../SelectInputs"
import Food from "../Food"
import { Row, Col} from 'react-bootstrap'
import './styles.css'

export default function CreateOrder({ foods }) {

  const userKind = localStorage.getItem("userKind")
  const dispatch = useDispatch()

  useEffect(() => {
    userKind === "client" && dispatch(getClient())
  }, [dispatch, userKind])

  const { client } = useSelector(({ clientReducer }) => ({
    client: clientReducer.client,
  }));

  const [createOrder, setCreateOrder] = useState(false)
  const [selectFood, setSelectFood] = useState("")
  const [products, setProducts] = useState([])
  const [selectCategory, setSelectCategory] = useState("")
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const totalPrice =
    !!products &&
    products.length > 0 &&
    products
      .map(
        (product) =>
          product.selectedType &&
          product.types.find((el) => el.foodLabel === product.selectedType)
            .foodPrice * product.quantity)
      .reduce(reducer)


  function handlePayment(){

    const handler = window.ePayco.checkout.configure({
      key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
      test: true
    })

    const dataPayment = {
      external: 'false',
      autoclick: 'false',

      tax: '0',
      tax_base: '0',
      amount: totalPrice,
      name: 'Product1',
      description: 'Almuerzo a domicilio',
      currency: 'cop',

      country: 'CO',
      lang: 'en',

      invoice: '123456',
      extra1: 'extra1',

      // response:

      name_billing: client.name,
      address_billing: client.direction,
      type_doc_billing: 'CC',
      number_doc_billing: '',
      mobilephone_billing: client.phone,

      methodsDisable: ["CASH", "SP", "PSE", "DP"],
    }
    handler.open(dataPayment)
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const data = {
            products,
          }
          console.log(data.products)
        }}
      >
        <Row className='d-flex'>
          <Col className='text-center'>
            <Button
              type="button"
              handleClick={() => setCreateOrder(!createOrder)}
            >
              Crear pedido
            </Button>
          </Col>
        </Row>
        <div>
          {createOrder === true && (
            <>
              <Row className='mt-3'>
                <Col>
                  <Select
                    id="selectFood"
                    label="Tipo de alimento"
                    type="foodName"
                    onChange={(e) => {
                      setSelectCategory(e.target.value)
                      setSelectFood(null)
                    }}
                    options={[
                      { _id: "Proteina", foodName: "Proteina" },
                      { _id: "Carbohidrato", foodName: "Carbohidrato" },
                      { _id: "Vegetales", foodName: "Vegetales" },
                      { _id: "Bebidas", foodName: "Bebidas" },
                    ]}
                  />
                </Col>
                <Col>
                  <label>
                      Seleccione alimento
                      <select onChange={(e) => setSelectFood(e.target.value)}>
                        <option value="">Seleccione alimento</option>
                        {foods
                          .filter(
                            ({ foodCategory }) => foodCategory === selectCategory
                          )
                          .map(({ foodName }) => (
                            <option key={foodName} value={foodName}>
                              {foodName}
                            </option>
                          ))}
                      </select>
                    </label>
                </Col>
              </Row>

              <Row className='d-flex mt-2 mb-3'>
                <Col className='text-center'>
                  <Button
                    type="button"
                    handleClick={() =>
                      setProducts((products) => {
                        const product = foods.find(
                          ({ foodName }) => foodName === selectFood
                        )
                        return [
                          ...products,
                          { ...product, quantity: 1, id: new Date().getTime() },
                        ]
                      })
                    }
                    disabled={!selectFood}
                  >
                    Añadir alimento
                  </Button>
                </Col>
              </Row>
              {products.map((data, index) => (
                <Food
                  key={index}
                  data={data}
                  onDelete={(productIdToDelete) => {
                    setProducts((products) =>
                      products.filter(({ id }) => id !== productIdToDelete)
                    );
                  }}
                  onUpdate={(field, value) => {
                    setProducts((products) => {
                      const newProducts = products.map((product) => {
                        const newProduct = { ...product }

                        if (newProduct.id === data.id) {
                          newProduct[field] = value
                        }

                        return newProduct
                      })

                      return newProducts
                    })
                  }}
                />
              ))}
              <Row className='d-flex'>
                <Col className='costoTotal'>
                 <div>Costo total: {totalPrice ? totalPrice : 0}</div>
                </Col>
                <Col className='text-start'>
                  <Button type="submit">Enviar pedido</Button>
                </Col>
              </Row>
              <p className="tittleProfile"><b>Confirmar pedido</b></p>
              <Row className='d-flex'>
                <Col className='costoTotal'>
                  <Button type="button">Cancelar pedido</Button>
                </Col>
                <Col className='text-start'>
                  <Button type="button" handleClick={handlePayment}>Pagar pedido</Button>
                </Col>
              </Row>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
