import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/bootstrap.min.css";
import "./assets/css/now-ui-kit.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
