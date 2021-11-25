import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
