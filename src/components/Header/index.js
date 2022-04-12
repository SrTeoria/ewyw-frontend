import axios from "axios"
import { useHistory } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import logo from "./logo.png"
import "./styles.css"
import { useEffect, useState } from "react"
import { Modal, Button, Form, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { getClient } from "../../store/clientReducer"

function Header() {
  const token = localStorage.getItem("token")
  const userKind = localStorage.getItem("userKind")

  const [show, setShow] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    userKind === "client" && dispatch(getClient())
  }, [dispatch, userKind])

  const { client } = useSelector(({ clientReducer }) => ({
    client: clientReducer.client,
  }));

  const [name, setName] = useState(client.name)
  const [direction, setDirection] = useState(client.direction)
  const [phone, setPhone] = useState(client.phone)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios({
        method: "PUT",
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: "/clients/clientprofile",
        data: {
          name,
          direction,
          phone,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShow(false)
      dispatch(getClient())
    } catch (error) {
      console.log(error)
    }
  }

  function handleClick() {
    dispatch({ type: "USER_LOGOUT" })
    localStorage.clear()
    history.push("/signin")
  }

  function handleClose() {
    setShow(false)
    setName(client.name)
    setDirection(client.direction)
    setPhone(client.phone)
  }

  return (
    <>
      <nav>
        <div className="header">
          <div className="positionLogo">
            <img className="logo" src={logo} alt="logoEwyw" />
          </div>
          <div className="positionButtons">
            <a className="headerButtons" href="/">
              Inicio
            </a>
            {!token && (
              <a className="headerButtons" href="/signup">
                Registrarse
              </a>
            )}
            {!token && (
              <a className="headerButtons" href="/signin">
                Iniciar sesión
              </a>
            )}
            {token && userKind === "client" && (
              <a className="headerButtons" href="/restaurantslist">
                Lista de restaurantes
              </a>
            )}
            {token && userKind === "client" && (
              <button
                className="headerButtons"
                onClick={(e) => {
                  setShow(true)
                  setName(client.name)
                  setDirection(client.direction)
                  setPhone(client.phone)
                }}
              >
                Mi perfil
              </button>
            )}
            {token && userKind === "restaurant" && (
              <a className="headerButtons" href="/restaurantprofile">
                Mi perfil
              </a>
            )}
            {token && (
              <button
                className="headerButtons"
                type="button"
                onClick={handleClick}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Mi perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" as={Row} controlId="formPlaintextName">
            <Form.Label column sm="3">
              Nombre
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} controlId="formPlaintextDirection">
            <Form.Label column sm="3">
              Dirección
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                onChange={(e) => setDirection(e.target.value)}
                value={direction}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3" as={Row} controlId="formPlaintextPhone">
            <Form.Label column sm="3">
              Telefono
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
              />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
