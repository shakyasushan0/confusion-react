import React from "react";
import "./App.css";
import Main from "./components/mainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigStore } from "./redux/configStore";
const store = ConfigStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
