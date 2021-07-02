import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurantReducer";
import Button from "../Button";
import "./styles.css";

export default function RestaurantsList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const { loading, restaurants, error } = useSelector(
    ({ restaurantReducer }) => ({
      loading: restaurantReducer.loading,
      restaurants: restaurantReducer.restaurants,
      error: restaurantReducer.error,
    })
  )

  if (loading) return <p>Cargando restaurantes disponibles...</p>
  if (error) return <p>Algo salió mal</p>

  return (
    <div className="restaurantList">
      <h2 className="tittleList">Escoge el restaurante que prefieras</h2>
      {restaurants &&
        restaurants.length > 0 &&
        restaurants.map(({ name, direction, phone, _id }) => {
          return (
            <div key={_id} className="restaurantsCard">
              <span>
                <strong>Nombre:</strong> {name}
              </span>
              <br />
              <span>
                <strong>Direccion:</strong> {direction}
              </span>
              <br />
              <span>
                <strong>Telefono:</strong> {phone}
              </span>
              <br />
              <a href={`/restaurantprofile/${_id}`}>
                <Button type="button">Ir a perfil</Button>
              </a>
            </div>
          );
        })}
    </div>
  );
}
