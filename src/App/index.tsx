import React from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import Routes from "./Routes";
import store from "../redux/stores";

import "antd/dist/antd.css";

export const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

//export default withAuthContext(App);
export default App;
