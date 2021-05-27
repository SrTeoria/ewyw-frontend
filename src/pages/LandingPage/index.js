import Header from "../../components/Header";
import "./styles.css";
import welcomeFoto from "./pensativos1.jpg";
import foodFoto from "./alimentos1.jpg";
import classificationFoto from "./tipos.png";
import RestaurantForm from "../../components/RestaurantForm";

export function LandingPage() {
  return (
    <div className="LandingPage">
      <Header />
      <RestaurantForm />
      {/* <div className="backgroundImage">
        <div className="welcome">
          <img src={welcomeFoto} alt="foto bienvenida" />
          <div className="text">
            <h1 className="tittle">Bienvenidos a ewyw</h1>
            <p>
              Hola te ha pasado que hay dias en los que no sabes que comer,
              quieres algo diferente y no quieres limitarte a los menùs que te
              ofrecen los diferentes restaurantes, pues te tengo buenas
              noticias, con ewyw buscamos que tu escojas los ingredientes de tus
              comidas, que no tengas que limitarte a los menús que te ofrecen
              los restaurantes, si no que ellos se adapten a tus necesidades.
            </p>
          </div>
        </div>
        <div className="welcome">
          <img src={classificationFoto} alt="foto bienvenida" />
          <div className="text">
            <h2 className="tittle">Clasificacion de alimentos</h2>
            <p>
              Clasificamos los alimentos en 4 tipos: proteinas, carbohidratos,
              vegetales y bebidas. Por lo tanto, podras escoger/diseñar tus
              comida basados en estos tipos.
            </p>
          </div>
        </div>
        <div className="welcome">
          <img src={foodFoto} alt="foto bienvenida" />
          <div className="text">
            <h2 className="tittle">Alimentos</h2>
            <p>
              La variedad de los alimentos dependera de la oferta de cada
              restaurante, por lo que tendras diferentes opciones con uno de
              ellos
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
