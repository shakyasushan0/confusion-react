import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navbar dark color='info'>
          <div className='container'>
            <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}
export default App;
