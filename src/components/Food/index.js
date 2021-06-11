import { useEffect } from "react";
import Button from '../Button/index'
import { Row, Col } from 'react-bootstrap'
import './styles.css'


export default function Food({
  data: { id, foodName, types, quantity, selectedType},
  onDelete,
  onUpdate}){
    const foodPrice = selectedType
    ? types.find(({foodLabel}) => foodLabel === selectedType).foodPrice
    : 0;

    useEffect(() => {
      if (quantity < 1){
        onDelete(id)
      }
    }, [quantity, onDelete, id, onUpdate])

    return (
      <div className='foodRender'>
        <Row className='d-flex mt-2'>
          <Col className='text-center'>
            <label>
              <span className='fontWeigth'>Alimento: {foodName}</span><br/>
            </label>
          </Col>
          <Col className='text-center'>
            <label className='fontWeigth'>Tipo:
              <select
                onChange={(e) => {
                  const { value } = e.target

                  onUpdate('selectedType', value)
                } }
              >
                <option>Seleccione tipo</option>
                {types.map((type) => (
                  <option key={type.foodLabel} value={type.foodLabel}>
                    {type.foodLabel}
                  </option>
                ))}
              </select>
            </label>
          </Col>
        </Row>

        <div>
          <Row className='d-flex mb-2'>
            <Col className='text-center cantidad' md={2}>
              <span className='fontWeigth'>Cantidad: {quantity}</span>
            </Col>
            <Col className='text-center'>
              <Button
                type='button'
                handleClick={() => {
                  onUpdate('quantity', quantity + 1)
                }}
              >
                Agregar cantidad
              </Button>
            </Col>
            <Col className='text-center'>
              <Button
                type='button'
                handleClick={() => {
                  onUpdate('quantity', quantity - 1)
                }}
              >
                Quitar cantidad
              </Button>
            </Col>
            <Col className='text-center'>
              <Button
                type='button'
                handleClick={() => onDelete(id)}
              >
                Eliminar producto
              </Button>
            </Col>
          </Row>
        </div>

        <Row className='mb-1'>
          <Col>
            <span className='price'>Precio: {foodPrice * quantity}</span>
          </Col>
        </Row>
      </div>
    )
  }