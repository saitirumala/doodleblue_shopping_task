import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import CheckoutPage from "./Components/CheckoutPage";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Cart" component={Cart} />
          <Route path="/ProductDetails" component={ProductDetails} />
          <Route path="/CheckoutPage" component={CheckoutPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
