import React from 'react'
import axios from 'axios'
import Button from '../Button'
import Select from '../SelectInputs'
import FormInputs from '../formInputs'
import { changeDirection, changeEmail, changeError, changeName, changePassword, changePasswordConfirm, changePhone, changeUserType } from '../../store/signUpReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './styles.css'


export default function SignUpForm(){

  const dispatch = useDispatch()

  const history = useHistory()

  const {
    name,
    email,
    password,
    passwordConfirm,
    direction,
    phone,
    userType,
    error} = useSelector(({ signUpReducer }) => ({
    name: signUpReducer.name,
    email: signUpReducer.email,
    password: signUpReducer.password,
    passwordConfirm: signUpReducer.passwordConfirm,
    direction: signUpReducer.direction,
    phone: signUpReducer.phone,
    userType: signUpReducer.userType,
    error: signUpReducer.error,
    }))

    async function handleSubmit(e){
      e.preventDefault()
      if( password !== passwordConfirm){
        dispatch(changeError('Las contraseñas no coinciden'))
      } else if (!userType){
        dispatch(changeError('Seleccione un tipo de usuario'))
      } else {
        try {
          const { data } = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/users/signup',
            data: {
              name,
              password,
              email,
              userType,
              direction,
              phone,
            },
          })

          localStorage.setItem('token', data.token)
          localStorage.setItem('userKind', data.userKind)
          if(data.userKind === 'restaurant'){
            history.push('/restaurantprofile')
          } else {
            history.push('/restaurantslist')
          }

        } catch(error){
          dispatch(changeError(error.message))
        }
      }
    }

  return(
    <div className='backgroundImage'>
      <form className='signup' onSubmit={handleSubmit}>
        <div className='inputsSignUp'>
          <FormInputs
            id='name'
            type='text'
            name='name'
            onChange={ e => dispatch(changeName(e.target.value))}
            value={name}
          >
            Nombre
          </FormInputs>
          <FormInputs
            id='email'
            type='email'
            name='email'
            onChange={ e => dispatch(changeEmail(e.target.value))}
            value={email}
          >
            Email
          </FormInputs>
          <FormInputs
            id='password'
            type='password'
            name='password'
            onChange={ e => dispatch(changePassword(e.target.value))}
            value={password}
          >
            Contraseña
          </FormInputs>
          <FormInputs
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            onChange={ e => dispatch(changePasswordConfirm(e.target.value))}
            value={passwordConfirm}
          >
            Confirmar Contraseña
          </FormInputs>
          <FormInputs
            id='direction'
            type='text'
            name='direction'
            onChange={ e => dispatch(changeDirection(e.target.value))}
            value={direction}
          >
            Dirección
          </FormInputs>
          <FormInputs
            id='phone'
            type='number'
            name='phone'
            onChange={ e => dispatch(changePhone(e.target.value))}
            value={phone}
          >
            Celular
          </FormInputs>
          <Select
            id='selectRole'
            name='userType'
            label='Escoge tu rol'
            type='name'
            options={[
              {_id:'client', name:'Cliente'},
              {_id:'restaurant', name:'Restaurante'}
            ]}
            onChange={(e) => dispatch(changeUserType(e.target.value))}
          />
          {error && <p> {error} </p>}
          <Button
            type='submit'
          >
            Completar registro
          </Button>
        </div>
      </form>
    </div>
  )
}