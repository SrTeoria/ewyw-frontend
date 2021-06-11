import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { history } from "./utils/history";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RestaurantProfile from "./pages/RestaurantProfile";
import { LandingPage } from "./pages/LandingPage";
import ListaRestaurantes from "./pages/ListaRestaurantes";

function PrivateRoute({ children, ...rest }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={() => {
        return token ? children : <Redirect to="/signin" />;
      }}
    />
  );
}

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/landingpage">
          <LandingPage />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <PrivateRoute exact path="/restaurantprofile/:restaurantId">
          <RestaurantProfile />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurantslist">
          <ListaRestaurantes />
        </PrivateRoute>
        <PrivateRoute exact path="/restaurantprofile">
          <RestaurantProfile />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
